#!/usr/bin/env node
/**
 * capture.mjs — أداة التحقق البصري متعدد المقاسات (بلا اعتماديات خارجية)
 *
 * تقود Brave/Chromium بلا واجهة عبر Chrome DevTools Protocol، وتلتقط لقطة PNG
 * لكل (سيناريو × مقاس شاشة) بعد تنفيذ خطوات حقيقية على الصفحة (نقرات ومفاتيح
 * ودوال التطبيق نفسها)، ثم تُشغّل «فحوصاً» عددية تكشف الاقتطاع والتجاوز.
 *
 * الاستخدام:
 *   node tools/visual/capture.mjs                     كل السيناريوهات وكل المقاسات
 *   node tools/visual/capture.mjs --scenario=p6-d3    سيناريو واحد فقط
 *   node tools/visual/capture.mjs --only=1352x672     مقاس واحد فقط
 *   node tools/visual/capture.mjs --no-shots          قياس فقط دون لقطات
 *   node tools/visual/capture.mjs --list              عرض المتاح
 *
 * المخرجات: tools/visual/out/<scenario>__<W>x<H>.png
 * ملاحظة: لا يكتب أي شيء خارج مجلد المشروع (بروفايل المتصفح في .tools/).
 */

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..');
const OUT_DIR = join(HERE, 'out');
// بروفايل معزول لكل تشغيل: يمنع تعارض الأقفال ويضمن حالة بداية نظيفة (لا استئناف محفوظ).
const PROFILE_DIR = join(ROOT, '.tools', `brave-profile-${process.pid}`);
const BRAVE_BIN = process.env.BRAVE_BIN || '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';

let LIVE_CHILD = null;
const killLiveChild = () => {
  if (!LIVE_CHILD) return;
  try { LIVE_CHILD.kill('SIGKILL'); } catch {}
  LIVE_CHILD = null;
};
process.on('exit', killLiveChild);
process.on('SIGINT', () => { killLiveChild(); process.exit(130); });
process.on('uncaughtException', err => { console.error('خطأ غير متوقع:', err); killLiveChild(); process.exit(3); });

const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const hit = argv.find(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const eq = hit.indexOf('=');
  return eq === -1 ? true : hit.slice(eq + 1);
};

// ─── طبقة CDP ────────────────────────────────────────────────
class CDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.nextId = 0;
    this.pending = new Map();
    this.handlers = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((res, rej) => {
      this.ws.addEventListener('open', res, { once: true });
      this.ws.addEventListener('error', () => rej(new Error('تعذّر الاتصال بنقطة CDP')), { once: true });
    });
    this.ws.addEventListener('message', ev => this._dispatch(ev.data));
    return this;
  }

  _dispatch(raw) {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    if (msg.id && this.pending.has(msg.id)) {
      const slot = this.pending.get(msg.id);
      this.pending.delete(msg.id);
      clearTimeout(slot.timer);
      msg.error ? slot.reject(new Error(msg.error.message)) : slot.resolve(msg.result);
      return;
    }
    if (msg.method && this.handlers.has(msg.method)) {
      for (const fn of [...this.handlers.get(msg.method)]) fn(msg.params, msg.sessionId);
    }
  }

  on(method, fn) {
    if (!this.handlers.has(method)) this.handlers.set(method, []);
    this.handlers.get(method).push(fn);
  }

  send(method, params = {}, sessionId = null, timeout = 25000) {
    const id = ++this.nextId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`مهلة CDP: ${method}`));
      }, timeout);
      this.pending.set(id, { resolve, reject, timer });
      const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
      this.ws.send(JSON.stringify(payload));
    });
  }

  waitFor(method, predicate = () => true, timeout = 25000) {
    return new Promise((resolve, reject) => {
      const handler = (params) => {
        if (!predicate(params)) return;
        clearTimeout(timer);
        const arr = this.handlers.get(method) || [];
        const i = arr.indexOf(handler);
        if (i !== -1) arr.splice(i, 1);
        resolve(params);
      };
      const timer = setTimeout(() => {
        const arr = this.handlers.get(method) || [];
        const i = arr.indexOf(handler);
        if (i !== -1) arr.splice(i, 1);
        reject(new Error(`مهلة انتظار الحدث: ${method}`));
      }, timeout);
      this.on(method, handler);
    });
  }

  close() { try { this.ws?.close(); } catch {} }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// مفاتيح حقيقية تُرسل عبر خط الإدخال في المتصفح (لا استدعاء دوال مباشر).
const KEYMAP = {
  Space:      { code: 'Space',      key: ' ',     vk: 32, text: ' ' },
  Enter:      { code: 'Enter',      key: 'Enter', vk: 13, text: '\r' },
  ArrowLeft:  { code: 'ArrowLeft',  key: 'ArrowLeft',  vk: 37 },
  ArrowRight: { code: 'ArrowRight', key: 'ArrowRight', vk: 39 },
};

async function pressKey(cdp, session, name) {
  const k = KEYMAP[name];
  if (!k) throw new Error(`مفتاح غير معروف: ${name}`);
  const base = { code: k.code, key: k.key, windowsVirtualKeyCode: k.vk, nativeVirtualKeyCode: k.vk };
  await cdp.send('Input.dispatchKeyEvent',
    k.text ? { ...base, type: 'keyDown', text: k.text, unmodifiedText: k.text } : { ...base, type: 'rawKeyDown' },
    session);
  await cdp.send('Input.dispatchKeyEvent', { ...base, type: 'keyUp' }, session);
}

// ننتظر إطارَي رسم لتستقر انتقالات CSS قبل القياس أو اللقطة.
const settleFrames = (cdp, session) => cdp.send('Runtime.evaluate', {
  expression: 'new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))',
  awaitPromise: true,
}, session);

// يبني تعبيراً ينفّذ نقرة حقيقية على عنصر حقيقي (مسار المعلم نفسه)، ويفشل بوضوح إن غاب.
function clickExpression(step) {
  if (step.click) {
    return `(() => {
      const sel = ${JSON.stringify(step.click)};
      const el = document.querySelector(sel);
      if (!el) throw new Error('لم يُعثر على العنصر: ' + sel);
      if (el.disabled) throw new Error('العنصر معطّل: ' + sel);
      if (getComputedStyle(el).display === 'none' || getComputedStyle(el).visibility === 'hidden') throw new Error('العنصر غير مرئي: ' + sel);
      el.click();
      return (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 45);
    })()`;
  }
  const { sel, text } = step.clickText;
  return `(() => {
    const els = [...document.querySelectorAll(${JSON.stringify(sel)})];
    const el = els.find(e => (e.textContent || '').includes(${JSON.stringify(text)}));
    if (!el) throw new Error('لم يُعثر على عنصر «' + ${JSON.stringify(text)} + '» ضمن ' + ${JSON.stringify(sel)});
    el.click();
    return (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 45);
  })()`;
}

// ─── إطلاق المتصفح ───────────────────────────────────────────
function launchBrowser() {
  return new Promise((resolve, reject) => {
    if (!existsSync(BRAVE_BIN)) {
      reject(new Error(`لم يُعثر على المتصفح: ${BRAVE_BIN}\nعيّن مساره عبر BRAVE_BIN=...`));
      return;
    }
    rmSync(PROFILE_DIR, { recursive: true, force: true });
    mkdirSync(PROFILE_DIR, { recursive: true });
    rmSync(join(ROOT, '.tools', 'brave-profile'), { recursive: true, force: true });

    const child = spawn(BRAVE_BIN, [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-crash-reporter',
      '--disable-breakpad',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-sync',
      '--disable-extensions',
      '--disable-background-networking',
      '--allow-file-access-from-files',
      '--autoplay-policy=no-user-gesture-required',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--user-data-dir=${PROFILE_DIR}`,
      '--remote-debugging-port=0',
      'about:blank',
    ], { stdio: ['ignore', 'pipe', 'pipe'] });

    let buf = '';
    const timer = setTimeout(() => {
      cleanup();
      child.kill('SIGKILL');
      reject(new Error('لم يُعلن المتصفح عن منفذ التنقيح خلال 30 ثانية'));
    }, 30000);

    const onData = chunk => {
      buf += chunk.toString();
      const m = /DevTools listening on (ws:\/\/\S+)/.exec(buf);
      if (m) { cleanup(); resolve({ child, wsUrl: m[1] }); }
    };
    const cleanup = () => { clearTimeout(timer); child.stdout.off('data', onData); child.stderr.off('data', onData); };

    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    LIVE_CHILD = child;
    child.on('error', err => { cleanup(); killLiveChild(); reject(err); });
    child.on('exit', code => { cleanup(); if (code !== null) reject(new Error(`خرج المتصفح برمز ${code}`)); });
  });
}

// ─── تشغيل سيناريو على مقاس واحد ─────────────────────────────
async function runOne(cdp, session, scenario, viewport, opts) {
  const width = viewport.w, height = viewport.h;
  const [file, query] = String(scenario.url).split('?');
  const url = pathToFileURL(join(ROOT, file)).href + (query ? '?' + query : '');

  await cdp.send('Emulation.setDeviceMetricsOverride',
    { width, height, deviceScaleFactor: opts.scale, mobile: false }, session);

  const evaluate = (expression, extra = {}) => cdp.send('Runtime.evaluate',
    { expression, returnByValue: true, awaitPromise: true, userGesture: true, ...extra }, session);

  // جاهزية التطبيق: البيانات والمحرّك محمّلان فعلاً
  const READY_EXPR = `(document.readyState === 'complete')
    && (typeof LESSON !== 'undefined')
    && (typeof goToPhase === 'function')`;

  const navigateAndWait = async () => {
    const loaded = cdp.waitFor('Page.loadEventFired', () => true, 30000).catch(() => null);
    await cdp.send('Page.navigate', { url }, session);
    await loaded;
    for (let i = 0; i < 60; i++) {
      const r = await evaluate(READY_EXPR);
      if (r.result?.value === true) return true;
      await sleep(150);
    }
    return false;
  };

  if (!(await navigateAndWait())) {
    const diag = await evaluate(`({ href: location.href, title: document.title, ready: document.readyState,
      hasLesson: typeof LESSON, hasGoToPhase: typeof goToPhase, hasApp: typeof STATE,
      scripts: [...document.scripts].map(s => s.getAttribute('src')).filter(Boolean).slice(0, 8),
      bodyLen: document.body ? document.body.innerHTML.length : -1 })`).catch(() => null);
    throw new Error('لم يكتمل تحميل التطبيق — ' + JSON.stringify(diag?.result?.value ?? {}));
  }

  // ─── حالة نظيفة لكل قياس ───
  // تقدّم الدرس يُحفظ في localStorage، فبقاؤه يفتح «هل تستكمل الحصة؟» ويُلوّث
  // لقطات المقاسات التالية. نُفرّغ التخزين؛ وإن كان فيه شيء نُعيد التحميل.
  const dirty = await evaluate(`(() => { let n = 0; try { n = (localStorage.length || 0) + (sessionStorage.length || 0); } catch (e) {} try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} return n; })()`);
  const dirtyCount = Number(dirty.result?.value) || 0;
  if (dirtyCount > 0 && !(await navigateAndWait())) {
    throw new Error('تعذّر إعادة تحميل الصفحة بعد تفريغ التقدّم المحفوظ');
  }

  await sleep(opts.settle);

  const steps = [];
  for (const rawStep of scenario.steps || []) {
    const step = typeof rawStep === 'string' ? { eval: rawStep } : rawStep;
    try {
      if (step.key) {
        await pressKey(cdp, session, step.key);
        steps.push({ expr: `key:${step.key}`, value: 'ok' });
      } else {
        const expr = (step.click || step.clickText) ? clickExpression(step) : step.eval;
        const r = await cdp.send('Runtime.evaluate',
          { expression: expr, returnByValue: true, awaitPromise: true, userGesture: true }, session);
        if (r.exceptionDetails) {
          steps.push({ expr, error: r.exceptionDetails.exception?.description || 'خطأ تنفيذ' });
        } else {
          steps.push({ expr, value: r.result?.value });
        }
      }
    } catch (err) {
      steps.push({ expr: step.eval || step.click || step.clickText?.text || JSON.stringify(step), error: err.message });
    }
    await settleFrames(cdp, session);
    if (step.settle) await sleep(step.settle);
  }

  if (scenario.settleMs) await sleep(scenario.settleMs);

  // ─── الفحوص العددية ───
  const checks = [];
  for (const check of scenario.checks || []) {
    try {
      const r = await cdp.send('Runtime.evaluate',
        { expression: check.js, returnByValue: true, awaitPromise: true }, session);
      if (r.exceptionDetails) {
        checks.push({ name: check.name, pass: false, warn: false, detail: r.exceptionDetails.exception?.description || 'خطأ' });
      } else {
        const v = r.result?.value;
        checks.push(v && typeof v === 'object'
          ? { name: check.name, pass: !!v.pass, warn: !!v.warn, detail: v.detail ?? '' }
          : { name: check.name, pass: !!v, warn: false, detail: '' });
      }
    } catch (err) {
      checks.push({ name: check.name, pass: false, warn: false, detail: err.message });
    }
  }

  // فحص مدمج: أي طبقة تحجب الشاشة تُبطل اللقطة كلها (نافذة استكمال، شاشة انتباه، لوحة مساعدة).
  if (opts.blockers.length) {
    const r = await evaluate(`(() => {
      const hits = [];
      for (const sel of ${JSON.stringify(opts.blockers)}) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const cs = getComputedStyle(el), b = el.getBoundingClientRect();
        if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) < 0.1) continue;
        if (b.width > 40 && b.height > 40) hits.push(sel);
      }
      return { pass: hits.length === 0, detail: hits.join(', ') };
    })()`);
    const v = r.result?.value;
    checks.unshift(v && typeof v === 'object'
      ? { name: 'بيئة نظيفة: لا طبقة تحجب الشاشة', pass: !!v.pass, warn: false, detail: v.detail ?? '' }
      : { name: 'بيئة نظيفة: لا طبقة تحجب الشاشة', pass: true, warn: false, detail: '' });
  }

  let probeValue = null;
  if (opts.probe) {
    const r = await cdp.send('Runtime.evaluate',
      { expression: opts.probe, returnByValue: true, awaitPromise: true }, session);
    probeValue = r.exceptionDetails ? { error: r.exceptionDetails.exception?.description } : r.result?.value;
  }

  let shot = null;
  if (!opts.noShots) {
    const r = await cdp.send('Page.captureScreenshot',
      { format: 'png', fromSurface: true, captureBeyondViewport: false }, session);
    mkdirSync(OUT_DIR, { recursive: true });
    const suffix = opts.scale !== 1 ? `@${opts.scale}x` : '';
    shot = join(OUT_DIR, `${scenario.name}__${width}x${height}${suffix}.png`);
    writeFileSync(shot, Buffer.from(r.data, 'base64'));
  }

  return { width, height, steps, checks, shot, probeValue };
}

// ─── البرنامج الرئيسي ────────────────────────────────────────
async function main() {
  const config = JSON.parse(readFileSync(join(HERE, 'scenarios.json'), 'utf8'));

  if (flag('list')) {
    console.log('السيناريوهات:');
    for (const s of config.scenarios) console.log(`  ${s.name.padEnd(24)} ${s.title || ''}`);
    console.log('\nالمقاسات:');
    for (const v of config.viewports) console.log(`  ${v.w}x${v.h}${v.label ? '  ' + v.label : ''}`);
    return;
  }

  const only = flag('only');
  const wantScenario = flag('scenario');
  const opts = {
    scale: Number(flag('scale', 1)) || 1,
    settle: Number(flag('settle', 350)) || 350,
    noShots: !!flag('no-shots'),
    probe: typeof flag('probe') === 'string' ? flag('probe') : null,
    blockers: Array.isArray(config.blockers) && config.blockers.length
      ? config.blockers
      : ['.resume-overlay', '#attention-overlay.active', '.help-panel.active', '.teacher-help-panel.active'],
  };

  // سيناريوهات إعادة إنتاج العلل لا تُشغَّل في المصفوفة الافتراضية (تفشل عمداً).
  const scenarios = config.scenarios.filter(s =>
    wantScenario ? s.name === wantScenario : !s.skipByDefault);
  if (!scenarios.length) throw new Error(`لا سيناريو بهذا الاسم: ${wantScenario}`);

  const viewports = config.viewports.filter(v =>
    !only || `${v.w}x${v.h}` === only || String(v.w) === String(only));
  if (!viewports.length) throw new Error(`لا مقاس بهذا الوصف: ${only}`);

  const { child, wsUrl } = await launchBrowser();
  const cdp = await new CDP(wsUrl).connect();
  let failures = 0;

  try {
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);

    for (const scenario of scenarios) {
      console.log(`\n▶ ${scenario.name} — ${scenario.title || ''}`);
      for (const viewport of viewports) {
        const label = `${viewport.w}x${viewport.h}`;
        try {
          const res = await runOne(cdp, sessionId, scenario, viewport, opts);
          const bad = res.checks.filter(c => !c.pass && !c.warn);
          const warns = res.checks.filter(c => !c.pass && c.warn);
          failures += bad.length;
          const stepErr = res.steps.filter(s => s.error);
          const status = bad.length === 0 && stepErr.length === 0 ? (warns.length ? '⚠' : '✔') : '✖';
          console.log(`  ${status} ${label.padEnd(10)} فحوص: ${res.checks.length - bad.length - warns.length}/${res.checks.length}` +
            (warns.length ? ` (تنبيهات: ${warns.length})` : '') +
            (res.shot ? `  → ${res.shot.replace(ROOT + '/', '')}` : ''));
          for (const c of bad) console.log(`      ✖ ${c.name}${c.detail ? ' — ' + c.detail : ''}`);
          for (const c of warns) console.log(`      ⚠ ${c.name}${c.detail ? ' — ' + c.detail : ''}`);
          for (const s of stepErr) console.log(`      ⚠ خطوة فشلت: ${s.expr.slice(0, 70)} — ${s.error.split('\n')[0]}`);
          if (res.probeValue !== null && res.probeValue !== undefined) {
            console.log(`      🔍 probe: ${typeof res.probeValue === 'string' ? res.probeValue : JSON.stringify(res.probeValue)}`);
          }
        } catch (err) {
          failures++;
          console.log(`  ✖ ${label.padEnd(10)} ${err.message}`);
        }
      }
    }
  } finally {
    cdp.close();
    killLiveChild();
    await sleep(400);
    try { rmSync(PROFILE_DIR, { recursive: true, force: true }); } catch {}
  }

  console.log(failures === 0 ? '\nالنتيجة: كل الفحوص ناجحة.' : `\nالنتيجة: ${failures} فحصاً فاشلاً.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(err => { console.error('فشل التشغيل:', err.message); process.exit(2); });

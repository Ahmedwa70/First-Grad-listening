/* fusaha-identity.js — هوية فُصَحَاء وحقوق الملكية.
 *
 * يعمل في كل صفحات الدرس. يضيف:
 *   - شريط هوية (شعار + اسم المنصة + الموقع) يظهر فقط عندما يُفتح الدرس
 *     خارج منصة فُصَحَاء. داخل المنصة تضع المنصة هويتها فوق الإطار، فإظهار
 *     هوية ثانية هنا تكرار بصري.
 *   - إشعار حقوق ثابت في أسفل الصفحة.
 *
 * لا يعتمد على أي ملف آخر ولا يعدّل منطق الدرس.
 */
(function () {
  "use strict";

  var SITE = "www.fusaha.com";
  var NAME = "فُصَحَاء";
  var RIGHTS = "© " + NAME + " — جميع الحقوق محفوظة. يُمنع النسخ أو إعادة النشر.";

  // داخل إطار = داخل المنصة. تعذّر القراءة بسبب سياسة المصدر يعني إطارًا أيضًا.
  function isEmbedded() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function injectStyles() {
    var css = [
      // أسفل الشاشة بعيدًا عن رأس الدرس وعن أزرار التنقّل السفلية، فلا
      // يغطّي عنوانًا ولا زرًا في أي من صفحات الحزمة. حبّة بيضاء مقروءة
      // في الوضعين الفاتح والداكن معًا.
      ".fusaha-identity{position:fixed;inset-inline-start:12px;inset-block-end:96px;z-index:9999;",
      "display:flex;align-items:center;gap:9px;padding:7px 12px;border-radius:999px;",
      "background:rgba(255,255,255,.92);box-shadow:0 2px 10px rgba(0,0,0,.14);",
      "font-family:inherit;pointer-events:none;user-select:none}",
      ".fusaha-identity img{height:26px;width:auto;display:block;flex:0 0 auto}",
      ".fusaha-identity b{display:block;font-size:13px;font-weight:700;color:#205870;line-height:1.25}",
      ".fusaha-identity span{display:block;font-size:10.5px;color:#205870;opacity:.72;line-height:1.25;direction:ltr}",
      // في وسط الأسفل: ركنا الشاشة مشغولان بزرّي التقدم والتراجع.
      // خلفية خفيفة تضمن القراءة فوق أي لون.
      ".fusaha-rights{position:fixed;inset-inline-start:50%;transform:translateX(50%);",
      "inset-block-end:4px;z-index:10000;white-space:nowrap;",
      "padding:2px 8px;border-radius:999px;background:rgba(255,255,255,.72);",
      "font-size:10px;color:#205870;opacity:.85;pointer-events:none;user-select:none;font-family:inherit}",
      "@media print{.fusaha-identity,.fusaha-rights{display:none}}",
    ].join("");
    var style = document.createElement("style");
    style.setAttribute("data-fusaha", "identity");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function identityBar() {
    var box = document.createElement("div");
    box.className = "fusaha-identity";
    box.setAttribute("aria-label", NAME);

    var logo = document.createElement("img");
    logo.src = "assets/fusaha-logo.png";
    logo.alt = "";
    logo.onerror = function () {
      logo.remove();
    };

    var text = document.createElement("div");
    var name = document.createElement("b");
    name.textContent = NAME;
    var site = document.createElement("span");
    site.textContent = SITE;
    text.appendChild(name);
    text.appendChild(document.createElement("br"));
    text.appendChild(site);

    box.appendChild(logo);
    box.appendChild(text);
    return box;
  }

  function rightsNote() {
    var note = document.createElement("div");
    note.className = "fusaha-rights";
    note.textContent = RIGHTS;
    return note;
  }

  function mount() {
    injectStyles();
    if (!isEmbedded()) document.body.appendChild(identityBar());
    document.body.appendChild(rightsNote());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

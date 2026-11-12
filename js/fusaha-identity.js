/* fusaha-identity.js — تنسيق هوية فُصَحَاء وإشعار الحقوق.
 *
 * العلامة نفسها مكتوبة في HTML داخل الأشرطة القائمة (شريط المعلم في
 * lecture.html، والشريط العلوي في index.html)، لا كطبقة عائمة فوق الدرس:
 * طبقة عائمة تغطّي المحتوى وتشتّت المتعلّم، وهي أول ما يُحذف عند النسخ.
 * هنا تُضاف الأنماط فقط، ويُضاف إشعار الحقوق في أسفل الصفحة.
 *
 * لا يعتمد على أي ملف آخر ولا يعدّل منطق الدرس.
 */
(function () {
  "use strict";

  var RIGHTS = "© فُصَحَاء — جميع الحقوق محفوظة. يُمنع النسخ أو إعادة النشر.";

  function injectStyles() {
    var css = [
      // شريط الدرس: الشعار بحجم شارة المرحلة (P1) وبمحاذاتها.
      ".hud-phase{display:flex;align-items:center;gap:8px}",
      // الشعار مرسوم بأزرق داكن فلا يُقرأ على الشريط الداكن، وهو الوضع
      // الافتراضي هنا. يُقلب أبيض فيه، ويعود إلى لونه في الوضع الفاتح،
      // فيظهر في الحالتين دون نسخة ثانية من الملف.
      ".fusaha-hud-logo{height:28px;width:auto;display:block;flex:0 0 auto;",
      "opacity:1;user-select:none;-webkit-user-drag:none;filter:brightness(0) invert(1)}",
      '[data-theme="light"] .fusaha-hud-logo{filter:none;opacity:.95}',

      // الصفحة الرئيسية: الشعار ثمّ الاسم، بترتيب المنصّة.
      ".fusaha-brand{display:inline-flex;align-items:center;gap:8px;margin:0}",
      ".fusaha-brand-logo{height:26px;width:auto;display:block;flex:0 0 auto;user-select:none}",
      ".fusaha-brand-name{font-weight:700;letter-spacing:0}",

      // إشعار الحقوق: وسط الأسفل، فركنا الشاشة لزرّي التقدّم والتراجع.
      ".fusaha-rights{position:fixed;inset-inline-start:50%;transform:translateX(50%);",
      "inset-block-end:4px;z-index:10000;white-space:nowrap;padding:2px 8px;border-radius:999px;",
      "background:rgba(255,255,255,.72);font-size:10px;color:#205870;opacity:.85;",
      "pointer-events:none;user-select:none;font-family:inherit}",
      "@media print{.fusaha-rights{display:none}}",
    ].join("");
    var style = document.createElement("style");
    style.setAttribute("data-fusaha", "identity");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function mount() {
    injectStyles();
    var note = document.createElement("div");
    note.className = "fusaha-rights";
    note.textContent = RIGHTS;
    document.body.appendChild(note);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

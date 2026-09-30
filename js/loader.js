/*
 * loader.js — Phase 3: Dynamic Lesson Loading.
 * يقرأ معرف الدرس من ?lesson=XX (افتراضي '01') ويحمّل سكربت بيانات الدرس
 * js/lesson-XX.js تزامنياً (document.write أثناء تحليل الـ HTML) قبل سلسلة
 * engine → activities → app.js حتى يكون LESSON معرّفاً قبل app.js.
 */
(function (d) {
  var m = /[?&]lesson=(\d{2})/.exec(d.location.search);
  var id = m ? (Number(m[1]) >= 1 ? m[1] : '01') : '01';
  d.write('<script src="js/lesson-' + id + '.js"></scr' + 'ipt>');
})(document);
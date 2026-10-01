#!/bin/bash
# ══════════════════════════════════════════════════════════════
# تشغيل لوحة التحكم — يُستدعى من داخل حزمة التطبيق.
#
# مجلد المشروع يُشتق من موقع التطبيق نفسه، فلا مسار مكتوب بداخله:
# انقل المشروع أو انسخه على جهاز آخر، ويظل يعمل.
#
# الخادم مقيّد بـ 127.0.0.1 — لا يُرى على الشبكة، ولا يخرج المشروع
# من جهازك.
# ══════════════════════════════════════════════════════════════
set -u

PORT=8765

APP_BUNDLE="$(cd "$(dirname "$0")/../.." && pwd)"   # …/لوحة التحكم.app
PROJECT="$(dirname "$APP_BUNDLE")"                   # …/MVP
# اسم صفحة اللوحة: index.html هو الحالي (وهو صفحة GitHub Pages
# الرئيسية)، وdashboard.html اسم سابق يُقبل أيضاً فلا ينكسر
# المشغّل إن فُتح به مجلد بنسخة قديمة.
if   [ -f "$PROJECT/index.html" ];     then PAGE="index.html"
elif [ -f "$PROJECT/dashboard.html" ]; then PAGE="dashboard.html"
else PAGE=""
fi
URL="http://localhost:$PORT/$PAGE"

if [ -z "$PAGE" ]; then
  echo "لم يُعثر على صفحة لوحة التحكم بجوار التطبيق.
ضع هذا التطبيق داخل مجلد المشروع، بجانب lecture.html."
  exit 0
fi

# خادم يعمل أصلاً على هذا المنفذ؟ نكتفي به.
if curl -s -m 1 -o /dev/null "http://127.0.0.1:$PORT/$PAGE"; then
  echo "OK $URL"
  exit 0
fi

if command -v python3 >/dev/null 2>&1; then
  RUNNER=python3
elif command -v ruby >/dev/null 2>&1; then
  RUNNER=ruby
else
  echo "لا يوجد على هذا الجهاز ما يشغّل خادماً محلياً.
الدروس تعمل بالنقر المزدوج كالمعتاد، ولوحة التحكم تعمل بوضع التنزيل."
  exit 0
fi

cd "$PROJECT" || { echo "تعذّر الدخول إلى مجلد المشروع."; exit 0; }

if [ "$RUNNER" = "python3" ]; then
  nohup python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
else
  nohup ruby -run -e httpd . -p "$PORT" -b 127.0.0.1 >/dev/null 2>&1 &
fi

# ننتظر استجابته — عشر ثوانٍ على الأكثر.
for _ in $(seq 1 40); do
  if curl -s -m 1 -o /dev/null "http://127.0.0.1:$PORT/$PAGE"; then
    echo "OK $URL"
    exit 0
  fi
  sleep 0.25
done

echo "بدأ الخادم لكنه لم يستجب خلال عشر ثوانٍ.
جرّب إغلاق التطبيق وفتحه من جديد."

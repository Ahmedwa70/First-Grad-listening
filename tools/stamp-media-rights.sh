#!/usr/bin/env bash
# يطبع حقوق فُصَحَاء داخل وسوم كل ملف صوت وفيديو في الدرس.
#
# الوسوم تبقى داخل الملف نفسه حتى لو رُفع في مكان آخر، فهي دليل ملكية تقني.
# لا تُعاد الترميز: النسخ بلا فقد جودة ولا تغيير في الحجم تقريبًا، وثوانٍ لكل ملف.
#
#   bash tools/stamp-media-rights.sh
#
# يتطلب ffmpeg:  macOS → brew install ffmpeg

set -euo pipefail
cd "$(dirname "$0")/.."

ARTIST="فُصَحَاء"
COPYRIGHT="© فُصَحَاء — جميع الحقوق محفوظة"
COMMENT="فُصَحَاء — www.fusaha.com — يُمنع النسخ أو إعادة النشر دون إذن كتابي."

command -v ffmpeg >/dev/null || { echo "ffmpeg غير مثبّت. على macOS: brew install ffmpeg"; exit 1; }

stamped=0
while IFS= read -r -d '' file; do
  tmp="${file}.stamping"
  if ffmpeg -nostdin -loglevel error -y -i "$file" \
      -map 0 -c copy -movflags use_metadata_tags \
      -metadata artist="$ARTIST" \
      -metadata copyright="$COPYRIGHT" \
      -metadata comment="$COMMENT" \
      -metadata publisher="$ARTIST" \
      -f "${file##*.}" "$tmp" 2>/dev/null; then
    mv -f "$tmp" "$file"
    stamped=$((stamped + 1))
    echo "✓ $file"
  else
    rm -f "$tmp"
    echo "✗ تعذّر: $file"
  fi
done < <(find assets -type f \( -name '*.mp4' -o -name '*.mp3' -o -name '*.m4a' -o -name '*.wav' -o -name '*.webm' \) -print0)

echo
echo "تم ختم $stamped ملفًا."

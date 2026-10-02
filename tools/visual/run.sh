#!/bin/sh
# run.sh — تشغيل أداة التحقق البصري بالمحرّك المرفق (لا يلزم node على PATH).
#
#   tools/visual/run.sh                    كل السيناريوهات وكل المقاسات
#   tools/visual/run.sh --scenario=p6-d3-shin-seen --only=1352x672
#   tools/visual/run.sh --list
#
# يمكن تعيين مسار node آخر عبر:  NODE_BIN=/path/to/node tools/visual/run.sh
set -eu

DIR=$(cd "$(dirname "$0")" && pwd)
NODE_BIN="${NODE_BIN:-/Users/new_era/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/node/bin/node}"

if [ ! -x "$NODE_BIN" ]; then
  NODE_BIN=$(command -v node || true)
fi
if [ -z "${NODE_BIN:-}" ] || [ ! -x "$NODE_BIN" ]; then
  echo "لم يُعثر على node. عيّن المسار عبر NODE_BIN=/path/to/node" >&2
  exit 2
fi

exec "$NODE_BIN" "$DIR/capture.mjs" "$@"

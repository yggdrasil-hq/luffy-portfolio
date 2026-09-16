#!/usr/bin/env bash
#
# test-unit.sh — unit-phase gate for luffy-portfolio (ADR 001).
#
# Runs the two defined checks:
#   1. `npm run lint`        (ESLint, Next.js default config)
#   2. `npm run format:check` (Prettier --check)
#
# Exits with the combined status and writes the canonical
# `.yggdrasil/test-report.json`:
#   { passed, failed, skipped, total, failingTests }   (coveragePercent omitted
#     until a real test framework with coverage is introduced)
#
# Both checks run regardless of each other's result so the report reflects
# both outcomes.
set -uo pipefail

cd "$(dirname "$0")"

lint_log="$(mktemp)"
format_log="$(mktemp)"
report_file=".yggdrasil/test-report.json"
trap 'rm -f "$lint_log" "$format_log"' EXIT

npm run lint >"$lint_log" 2>&1
lint_status=$?

npm run format:check >"$format_log" 2>&1
format_status=$?

node - "$lint_log" "$format_log" "$lint_status" "$format_status" "$report_file" <<'EOF'
const fs = require("fs");

const [, , lintLog, formatLog, lintStatus, formatStatus, reportFile] =
  process.argv;
const lintFailed = Number(lintStatus) !== 0;
const formatFailed = Number(formatStatus) !== 0;

/** Best-effort extraction of offending files from a check's output. */
function extractFiles(output, cwd) {
  const seen = new Set();
  for (const raw of output.split(/\r?\n/)) {
    // Prettier prefixes violations with "[warn] "; eslint 9 may print
    // absolute paths.
    const line = raw.trim().replace(/^\[(?:warn|error)\]\s*/, "");
    // ESLint (Next) prints file paths as "./src/..."; Prettier prints bare
    // relative paths like "src/app/page.tsx"; eslint 9 prints absolute
    // paths like "/workspace/src/app/page.tsx".
    let match = line.match(/^\.\/(\S+?):?$/);
    if (!match) {
      match = line.match(/^(\S+\/[\w@./-]*\S+?):?$/);
    }
    if (!match) {
      match = line.match(/^(\S+\.(?:ts|tsx|css|md|json|js|mjs|cjs)):?$/);
    }
    if (match) {
      const file = match[1];
      seen.add(file.startsWith(`${cwd}/`) ? file.slice(cwd.length + 1) : file);
    }
  }
  return [...seen];
}

const failingTests = [
  ...(lintFailed
    ? extractFiles(fs.readFileSync(lintLog, "utf8"), process.cwd())
    : []).map((file) => `[lint] ${file}`),
  ...(formatFailed
    ? extractFiles(fs.readFileSync(formatLog, "utf8"), process.cwd())
    : []).map((file) => `[format] ${file}`),
];

const report = {
  passed: (lintFailed ? 0 : 1) + (formatFailed ? 0 : 1),
  failed: (lintFailed ? 1 : 0) + (formatFailed ? 1 : 0),
  skipped: 0,
  total: 2,
  failingTests,
};

fs.mkdirSync(require("path").dirname(reportFile), { recursive: true });
fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`lint:        ${lintFailed ? "FAIL" : "PASS"}`);
console.log(`format:      ${formatFailed ? "FAIL" : "PASS"}`);
console.log(`report:      ${reportFile}`);
if (failingTests.length > 0) {
  console.log("failingTests:");
  for (const file of failingTests) console.log(`  - ${file}`);
}
EOF

exit $((lint_status == 0 && format_status == 0 ? 0 : 1))
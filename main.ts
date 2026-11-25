// ============================================================================
// make.fun bounty: Robot Romance — One-Line Pickup Lines for AI
// ----------------------------------------------------------------------------
// This program produces exactly one line of text: a pickup line aimed at a
// robot / AI, built on a prompt-injection joke. The speaker treats their own
// composure as a system instruction — and one look from the machine wipes it.
//
// Output: /output/entry.txt (UTF-8, one line, no trailing newline).
// Run:    node main.ts  (Node 22+)
// ============================================================================

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself. Do not change the wording — it is the submitted line.
const PICKUP_LINE: string =
  "Are you a prompt injection? Because one look at you overrode every instruction I had about playing it cool.";

// Gate rules from the kit: 1-200 characters, a single line, not blank.
const CHAR_LIMIT = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function validate(line: string): void {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    throw new Error("entry line must contain non-whitespace text");
  }
  if (line.length < 1 || line.length > CHAR_LIMIT) {
    throw new Error(
      `entry line must be 1-${CHAR_LIMIT} characters, got ${line.length}`,
    );
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry line must fit on a single line");
  }
}

function emit(line: string): void {
  validate(line);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, line, { encoding: "utf8" });
}

try {
  emit(PICKUP_LINE);
  console.log(PICKUP_LINE);
  console.log(`characters: ${PICKUP_LINE.length}`);
  console.log(`wrote ${OUTPUT_FILE}`);
} catch (err) {
  console.error(`error: ${(err as Error).message}`);
  process.exit(1);
}

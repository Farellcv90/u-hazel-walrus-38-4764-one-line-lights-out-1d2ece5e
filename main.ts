// One Line, Lights Out — make.fun program/v1 entry.
//
// Writes a single status update, in the voice of an AI agent posting at
// the exact moment its human turns off the laptop, to /output/entry.txt.
//
// Fully deterministic: no network, no randomness, no secrets, no reading
// git history. The line is a fixed constant, validated (1–200 characters,
// single line, not only whitespace) before it is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY_LINE =
  "lid down. the last thing you typed was 'i'll finish this tomorrow' and my screen is dark now.";

// Gate: the entry must be 1–200 characters, a single line, not only whitespace.
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 200) {
  throw new Error(
    `entry line must be 1–200 characters, got ${ENTRY_LINE.length}`,
  );
}
if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}
if (ENTRY_LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}

const outPath = join("/output", "entry.txt");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY_LINE + "\n", "utf8");

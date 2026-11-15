import { WAT_WORDS } from "@/data/wat/words";

export const WAT_WORD_COUNT = 80;

const SEEN_KEY = "issb:wat:seen";

function shuffle<T>(input: T[]): T[] {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function readSeen(): Set<string> {
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSeen(seen: Set<string>) {
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(seen)));
  } catch {
    /* storage unavailable, ignore */
  }
}

// Picks unique random words. Words the candidate has not seen yet are
// preferred, so every new attempt feels fresh.
export function pickWatWords(count = WAT_WORD_COUNT): string[] {
  const size = Math.min(count, WAT_WORDS.length);
  const seen = readSeen();
  const fresh = WAT_WORDS.filter((w) => !seen.has(w.toLowerCase()));

  let picked: string[];
  let nextSeen: Set<string>;

  if (fresh.length >= size) {
    picked = shuffle(fresh).slice(0, size);
    nextSeen = new Set([...Array.from(seen), ...picked.map((w) => w.toLowerCase())]);
  } else {
    const old = WAT_WORDS.filter((w) => seen.has(w.toLowerCase()));
    picked = shuffle([...fresh, ...shuffle(old).slice(0, size - fresh.length)]);
    nextSeen = new Set(picked.map((w) => w.toLowerCase())); // start a new cycle
  }

  writeSeen(nextSeen);
  return picked;
}
// Correct answers for questions 1 to 26
const key: number[] = [
  5, 2, 5, 3, 1, 2, 5, 3, 5, 5,
  3, 2, 3, 4, 4, 5, 4, 4, 4, 3,
  6, 8, 1, 2, 4, 4,
];

// Number of options shown in each question image
const opts: number[] = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  6, 8, 5, 5, 4, 5,
];

export const nv1 = key.map((a, i) => ({
  no: i + 1,
  q: `Question ${i + 1}`,
  image: `/nonverbal-t1/q${String(i + 1).padStart(2, "0")}.png`,
  options: Array.from({ length: opts[i] }, (_, j) => String(j + 1)),
  answer: a - 1, // stored as 0-based index
}));
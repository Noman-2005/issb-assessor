export type NonVerbalQuestion = {
  no: number;
  image: string;
  answer: number;
};

const answerKey = [
  5, 1, 7, 4, 3, 1, 6, 1, 8,
  4, 5, 6, 2, 1, 2, 4, 6, 7,
  3, 8, 8, 7, 6, 3, 7, 2, 7,
  5, 6, 5, 4, 8, 5, 1, 3, 2,
];

export const nonVerbalQuestions: NonVerbalQuestion[] =
  answerKey.map((answer, index) => ({
    no: index + 1,
    image: `/nonverbal-t2/q${String(index + 1).padStart(2, "0")}.webp`,
    answer,
  }));
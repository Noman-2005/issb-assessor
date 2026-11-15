export type NonVerbalQuestion = {
  no: number;
  image: string;
  answer: number; // 1-based option number
  width: number;
  height: number;
  // Clickable row of options drawn on top of the image (percentages)
  strip?: {
    left: number;
    top: number;
    width: number;
    height: number;
    count: number;
  };
    // Individually clickable areas, in option order (percentages)
  zones?: { left: number; top: number; width: number; height: number }[];
};

const answerKey = [
  5, 1, 7, 4, 3, 1, 6, 1, 8,
  4, 5, 6, 2, 1, 2, 4, 6, 7,
  3, 8, 8, 7, 6, 3, 7, 2, 7,
  5, 6, 5, 4, 8, 5, 1, 3, 2,
  // Q37 - Q49
  2, 4, 1, 3, 1, 2, 1, 5, 3, 2, 3, 2, 1,
  // Q50 (Set B)
  2,
];

// Option-row position for Q37 - Q49 (5 options each, measured from the images)
const strips: Record<
  number,
  { w: number; h: number; left: number; top: number; width: number; height: number }
> = {
  37: { w: 1007, h: 707, left: 12.91, top: 55.59, width: 74.58, height: 28.29 },
  38: { w: 990, h: 716, left: 12.02, top: 55.45, width: 75.76, height: 27.93 },
  39: { w: 1002, h: 712, left: 12.28, top: 55.34, width: 75.45, height: 28.23 },
  40: { w: 999, h: 699, left: 11.51, top: 54.22, width: 76.78, height: 29.04 },
  41: { w: 997, h: 711, left: 12.54, top: 55.7, width: 75.23, height: 27.99 },
  42: { w: 1013, h: 713, left: 11.75, top: 53.3, width: 76.21, height: 28.61 },
  43: { w: 996, h: 711, left: 12.15, top: 55.13, width: 75.3, height: 27.99 },
  44: { w: 1004, h: 708, left: 12.35, top: 55.79, width: 74.7, height: 28.11 },
  45: { w: 1011, h: 707, left: 12.66, top: 55.87, width: 74.28, height: 28.15 },
  46: { w: 997, h: 715, left: 12.34, top: 55.66, width: 75.33, height: 27.83 },
  47: { w: 1000, h: 707, left: 12.6, top: 55.45, width: 75.0, height: 28.43 },
  48: { w: 995, h: 707, left: 11.86, top: 56.01, width: 75.38, height: 28.29 },
  49: { w: 1003, h: 709, left: 12.46, top: 55.43, width: 74.68, height: 28.21 },
};

export const nonVerbalQuestions: NonVerbalQuestion[] = answerKey.map(
  (answer, index) => {
    const no = index + 1;
    const image = `/nonverbal-t2/q${String(no).padStart(2, "0")}.webp`;

    const s = strips[no];
    if (s) {
      return {
        no,
        image,
        answer,
        width: s.w,
        height: s.h,
        strip: { left: s.left, top: s.top, width: s.width, height: s.height, count: 5 },
      };
    }

        if (no === 50) {
      return {
        no,
        image,
        answer, // 2 = Set B
        width: 882,
        height: 691,
        zones: [
          // Option 1: Set A capsule
          { left: 3.06, top: 21.42, width: 12.59, height: 7.67 },
          // Option 2: Set B capsule
          { left: 3.06, top: 47.03, width: 12.59, height: 7.67 },
        ],
      };
    }

    // Q1 - Q36 (original layout, 8 options)
    return { no, image, answer, width: 1024, height: 1448 };
  }
);
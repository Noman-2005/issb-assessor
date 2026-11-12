import type { Question } from "./mt1";

export const mt2: Question[] = [
  {
    q: "Complete the series 0.5, 0.55, 0.65, 0.8,....?",
    options: ["0.7", "0.9", "0.95", "1"],
    answer: 3,
    explanation: "The difference between consecutive terms increases by 0.05 each time: +0.05, +0.10, +0.15, +0.20. Adding 0.20 to 0.8 gives 1."
  },
  {
    q: "AZ, BY, CX,?",
    options: ["EF", "GH", "IJ", "DW"],
    answer: 3,
    explanation: "Each pair matches a letter from the start of the alphabet with its counterpart from the end (1st & 26th, 2nd & 25th, 3rd & 24th). Following this pattern, the 4th letter D pairs with the 23rd letter W."
  },
  {
    q: "275, 7Y7, 14X9, 23W11, 34V13, ?",
    options: ["27U24", "47U15", "45U15", "47V14"],
    answer: 1,
    explanation: "(Note: 275 is a typo for 2Z5.) The first numbers add consecutive odd numbers (+5, +7, +9, +11, +13 = 47), the letters move backward by one (Z → Y → X → W → V → U), and the last numbers increase by 2 (13 + 2 = 15)."
  },
  {
    q: "Fear is to Coward as Brave is to",
    options: ["Soldier", "Hero", "Bravery", "Fearless"],
    answer: 1,
    explanation: "This analogy pairs a quality or emotion with the person defined by it. Just as someone ruled by fear is a coward, someone defined by being brave is a hero."
  },
  {
    q: "GEB=PRQ, BDA=?",
    options: ["OVQ", "KQP", "KUP", "IZNA"],
    answer: 1,
    explanation: "Each letter in GEB shifts forward by +9, +13, and +15 positions respectively to form PRQ. Applying the same shifts to BDA (B+9=K, D+13=Q, A+15=P) gives KQP."
  },
  {
    q: "Arrange the given words Alphabetical Order and choose the one that comes first.",
    options: ["Intellect", "Intend", "Intelligent", "Integument"],
    answer: 3,
    explanation: "All four words start with 'Inte-', so we compare the fifth letter: 'g' in Integument comes before 'l' in Intellect/Intelligent and 'n' in Intend."
  },
  {
    q: "TKRHOGANAU (Name of district), first letter is –",
    options: ["N", "A", "T", "G"],
    answer: 2,
    explanation: "Rearranging the jumbled letters TKRHOGANAU forms THAKURGAON, a district in Bangladesh. The first letter of this district's name is T."
  },
  {
    q: "All your basket eggs don’t in one put. Choose the 2nd word:",
    options: ["Put", "Basket", "One", "Eggs"],
    answer: 0,
    explanation: "Rearranging the words into the proper proverb gives: \"Don't put all your eggs in one basket.\" The second word in this sentence is Put."
  },
  {
    q: "London is the capital of United Kingdom.",
    options: ["True", "False", "None"],
    answer: 0,
    explanation: "London is the official capital city of the United Kingdom, making the statement factually True."
  },
  {
    q: "Supply the single letter which when prefixed to each of the following word makes a new word. (leat lind low reak)",
    options: ["C", "F", "B", "M"],
    answer: 2,
    explanation: "Adding the letter B to the beginning of each fragment forms four valid English words: Bleat, Blind, Blow, and Break."
  },
  {
    q: "Find the odd-",
    options: ["Commodore", "Major", "Colonel", "General"],
    answer: 0,
    explanation: "Major, Colonel, and General are all commissioned officer ranks in the Army. Commodore is the odd one out because it is a Naval rank."
  },
  {
    q: "The sum of ages of family members (both children and parents) is 360 years. The total ages of children and parents are in the ratio 2:1 and the ages of wife and husband are in the ratio 5:7.What will be the age of husband?",
    options: ["60", "75", "77", "70"],
    answer: 3,
    explanation: "Since children and parents are in a 2:1 ratio of 360, the parents' combined age is (1/3) × 360 = 120. Dividing 120 in a 5:7 ratio gives the husband's age as (7/12) × 120 = 70."
  },
  {
    q: "If, Apple is to 4, then Watermelon is to?",
    options: ["1", "2", "3", "4"],
    answer: 2,
    explanation: "Apple has 5 letters, and the word \"FIVE\" has 4 letters. Similarly, Watermelon has 10 letters, and the word \"TEN\" has 3 letters."
  },
  {
    q: "If A+B means A is the Brother of B; A-B means A is the sister of B and A×B means A is the father of B. Which of the following means that C is the son of M?",
    options: ["M-N×C+F", "F-C+M×N", "N+M-F×C", "M×N-C+F"],
    answer: 3,
    explanation: "In M×N-C+F, M is the father of N, N is the sister of C, and C is the brother of F. Since C is male (brother) and shares the same father as N, C is the son of M."
  },
  {
    q: "In a certain code, MONKEY is written as XDJMNL. How is TIGER written in that code?",
    options: ["QDFHS", "SDFHS", "SHFDQ", "UJHFS"],
    answer: 0,
    explanation: "Reverse the word TIGER to get REGIT, then shift each letter backward by 1 position in the alphabet (R→Q, E→D, G→F, I→H, T→S) to get QDFHS."
  },
  {
    q: "Rahul put his timepiece on the table in such a way that at 6 P.M. hour hand points to North. In which direction the minute hand will point at 9.15 P.M.?",
    options: ["South-East", "South", "North", "West"],
    answer: 3,
    explanation: "Normally, the hour hand points South at 6:00 PM, meaning the clock is rotated 180° if it points North. Consequently, at 9:15 PM, the minute hand points West instead of its usual East direction."
  },
  {
    q: "What is the synonym of IGNORANCE?",
    options: ["Insolent", "Seizure", "Oblivion", "Unlawful"],
    answer: 2,
    explanation: "Ignorance refers to a lack of knowledge or awareness. Among the choices, Oblivion (the state of being unaware or unconscious of what is happening) is the closest synonym."
  },
  {
    q: "If 1st October is Sunday, then 1st November will be?",
    options: ["Wednesday", "Friday", "Sunday", "Monday"],
    answer: 0,
    explanation: "October has 31 days, which equals 4 full weeks + 3 extra days. Adding 3 days to Sunday lands on Wednesday."
  },
  {
    q: "Arrange the words given below in a meaningful sequence. 1. Police 2. Punishment 3. Crime 4. Judge 5. Judgment",
    options: ["3, 1, 2, 4, 5", "1, 2, 4, 3, 5", "5, 4, 3, 2, 1", "3, 1, 4, 5, 2"],
    answer: 3,
    explanation: "In a logical legal sequence, a Crime (3) happens first, followed by Police (1) intervention, a trial before a Judge (4), a Judgment (5), and finally Punishment (2)."
  },
  {
    q: "A man can row 40 kmph in still water and the river is running at 10 kmph. If the man takes 1 hour to row to a place and back, how far is the place?",
    options: ["18.57 km", "18.75 km", "51.87 km", "51.78 km"],
    answer: 1,
    explanation: "Downstream speed is 40 + 10 = 50 km/h and upstream speed is 40 - 10 = 30 km/h. Solving d/50 + d/30 = 1 hour gives a one-way distance d = 18.75 km."
  },
  {
    q: "The doctor who specializes in the treatment of nervous system.",
    options: ["Oculist", "Optician", "Obstetrician", "Neurologist"],
    answer: 3,
    explanation: "A Neurologist is a medical specialist who diagnoses and treats disorders of the brain, spinal cord, and nervous system."
  },
  {
    q: "If 84 × 13 = 8, 37 × 13 = 6, 26 × 11 = 6, Then 56 × 22 =?",
    options: ["36", "39", "7", "11"],
    answer: 2,
    explanation: "The operation subtracts the sum of the second number's digits from the sum of the first number's digits. Thus, (5 + 6) - (2 + 2) = 11 - 4 = 7."
  },
  {
    q: "One rabbit saw 6 elephants while going towards River. Every elephant saw 2 monkeys are going towards river. Every monkey holds one tortoise in their hands. How many animals are going towards the river?",
    options: ["14", "11", "8", "5"],
    answer: 3,
    explanation: "Only the 1 rabbit, the 2 monkeys (seen by each elephant, not 6 × 2), and the 2 tortoises they hold are going toward the river (1 + 2 + 2 = 5), as the elephants' direction isn't mentioned."
  },
  {
    q: "Find the correctly spelt word.",
    options: ["Moustach", "Moustcahe", "Moustache", "Muostache"],
    answer: 2,
    explanation: "Moustache is the standard British and Commonwealth English spelling for hair grown on the upper lip."
  },
  {
    q: "Complete analogous pair; Fear : Threat :: Anger : ?",
    options: ["Compulsion", "Panic", "Provocation", "Force"],
    answer: 2,
    explanation: "This analogy connects an emotion to the external trigger that causes it. Just as a threat triggers fear, a provocation triggers anger."
  },
  {
    q: "Complete the series 1,4,27,16,?,36,343",
    options: ["50", "78", "125", "132"],
    answer: 2,
    explanation: "The series alternates between cubes and squares of consecutive natural numbers: 1³, 2², 3³, 4², 5³, 6², 7³. The missing 5th term is 5³ = 125."
  },
  {
    q: "DKY, FJW, HIU, JHS, ?",
    options: ["KGR", "LFQ", "KFR", "LGQ"],
    answer: 3,
    explanation: "In each term, the first letter moves forward by +2 (J → L), the second moves backward by -1 (H → G), and the third moves backward by -2 (S → Q)."
  },
  {
    q: "P3C, R5F, T8I, V12L, ?",
    options: ["Y17O", "X17M", "X17O", "X16O"],
    answer: 2,
    explanation: "The first letter jumps +2 (V → X), the middle number increases by +2, +3, +4, +5 (12 + 5 = 17), and the last letter jumps +3 (L → O)."
  },
  {
    q: "Absent is to Present as Culpable is to",
    options: ["Innocent", "Blameless", "Pure", "Sinless"],
    answer: 0,
    explanation: "Absent and Present are direct opposites. Similarly, the direct antonym of Culpable (guilty or deserving blame) is Innocent."
  },
  {
    q: "LOVE=MNPA, HATE=?",
    options: ["IZNB", "IZAN", "IZCN", "IZNA"],
    answer: 3,
    explanation: "Comparing LOVE to MNPA gives positional shifts of +1, -1, -6, and -4. Applying the exact same shifts to HATE (H+1=I, A-1=Z, T-6=N, E-4=A) yields IZNA."
  },
  {
    q: "Arrange the given words Alphabetical Order and choose the one that comes first.",
    options: ["Nature", "Native", "Narrate", "Nascent"],
    answer: 2,
    explanation: "All four words begin with 'Na-', so we look at the third letter: 'r' in Narrate comes before 's' in Nascent and 't' in Native/Nature."
  },
  {
    q: "Choose the first letter: UNT GEO (Part of body)",
    options: ["O", "G", "U", "T"],
    answer: 3,
    explanation: "Unscrambling the letters UNT GEO spells TONGUE, which is a part of the human body. Its first letter is T."
  },
  {
    q: "Cloud silver has a lining every. Choose the 2nd word:",
    options: ["Has", "Silver", "lining", "Cloud"],
    answer: 3,
    explanation: "Ordering the words into the well-known proverb gives: \"Every cloud has a silver lining.\" The second word in the sentence is Cloud."
  },
  {
    q: "Every cloud has a silver lining.",
    options: ["True", "False", "None"],
    answer: 0,
    explanation: "\"Every cloud has a silver lining\" is a grammatically correct and standard English idiom meaning every bad situation has a positive side."
  },
  {
    q: "Find the odd-",
    options: ["Helium", "Oxygen", "Sodium", "Hydrogen"],
    answer: 2,
    explanation: "Helium, Oxygen, and Hydrogen are all gases at room temperature. Sodium is the odd one out because it is a solid alkali metal."
  },
  {
    q: "How could all of your cousins have an uncle who is not your uncle?",
    options: ["Their uncle must be your uncle.", "They do not have any uncle.", "Their uncle is your father", "Not possible"],
    answer: 2,
    explanation: "Your father is the brother of your aunt or uncle, making him an uncle to all of your cousins—while to you, he is your dad, not your uncle."
  },
  {
    q: "A child that is developed or matured before time?",
    options: ["Caesarian", "Pseudonym", "Soliloquy", "Precocious"],
    answer: 3,
    explanation: "Precocious describes a child who develops physical, mental, or social abilities much earlier than is typical for their age."
  },
  {
    q: "If A is the brother of B; B is the sister of C; and C is the father of D, how D is related to A?",
    options: ["Brother", "Sister", "Nephew", "Cannot be determined"],
    answer: 3,
    explanation: "A is the brother of D's father (C), making A the uncle of D. However, because D's gender is not specified, we cannot tell if D is a nephew or a niece."
  },
  {
    q: "If in a code language, COULD is written as BNTKC and MARGIN is written as LZQFHM, how will MOULDING be written in that code?",
    options: ["CHMFINTK", "LNKTCHMF", "LNTKCHMF", "NITKHCMF"],
    answer: 2,
    explanation: "Each letter in the word is coded by moving 1 step backward in the alphabet (-1). Shifting every letter of MOULDING back by 1 produces LNTKCHMF."
  },
  {
    q: "What is the weight of adult Human Brain in Grams?",
    options: ["300-400 grams", "700-800 grams", "1100-1200 grams", "1300-1400 grams"],
    answer: 3,
    explanation: "A healthy adult human brain typically weighs between 1,300 and 1,400 grams (roughly 3 pounds)."
  },
  {
    q: "One morning after Sunrise, Kabir was standing facing a pole. The shadow of the pole fell exactly to his right. To which direction was he facing?",
    options: ["East", "West", "South", "Data is inadequate"],
    answer: 2,
    explanation: "In the morning, the sun is in the East, casting shadows toward the West. Since the shadow fell to Kabir's right (West), he must have been facing South."
  },
  {
    q: "What is the antonym of ATTACK?",
    options: ["Protect", "Ancestry", "Inflated", "Inconsequential"],
    answer: 0,
    explanation: "Attack means to take aggressive action against something, whereas to protect means to defend or keep it safe from harm."
  },
  {
    q: "Suganya went to the movies nine days ago. She goes to the movies only on Thursday. What the day week is today?",
    options: ["Friday", "Saturday", "Tuesday", "Thursday"],
    answer: 1,
    explanation: "Since Suganya only goes to the movies on Thursday, 9 days ago was a Thursday. Counting forward 9 days (1 week + 2 days) from Thursday brings us to Saturday."
  },
  {
    q: "Arrange the words given below in a meaningful sequence. 1. Family 2. Community 3. Member 4. Locality 5. Country",
    options: ["3, 1, 2, 4, 5", "3, 1, 2, 5, 4", "3, 1, 4, 2, 5", "3, 1, 4, 5, 2"],
    answer: 0,
    explanation: "Arranged in ascending order of social and geographic scale, an individual Member (3) belongs to a Family (1), which forms a Community (2), inside a Locality (4), within a Country (5)."
  },
  {
    q: "A man can row 4 kmph is still water. If the river is running at 2 kmph it takes 90 min to row to a place and back. How far is the place?",
    options: ["3.22 km", "5.22 km", "2.25 km", "2.52 km"],
    answer: 2,
    explanation: "Downstream speed is 4 + 2 = 6 km/h and upstream speed is 4 - 2 = 2 km/h. Solving d/6 + d/2 = 1.5 hours (90 min) gives d = 2.25 km."
  },
  {
    q: "Ready to believe.",
    options: ["Credulous", "Credible", "Creditable", "Incredible"],
    answer: 0,
    explanation: "Credulous means having a tendency to believe things too easily or quickly without sufficient evidence."
  },
  {
    q: "A clock is started at noon. By 10 minutes past 5, the hour hand has turned through.",
    options: ["145", "150", "155", "160"],
    answer: 2,
    explanation: "From 12:00 noon to 5:10 PM is 5 hours and 10 minutes (310 minutes). Since the hour hand moves 0.5° per minute, it turns 310 × 0.5° = 155°."
  },
  {
    q: "Find the correctly spelt word.",
    options: ["Palete", "Palet", "Palate", "Pelate"],
    answer: 2,
    explanation: "Palate is the correct spelling referring to the roof of the mouth or a person's sense of taste (not to be confused with an artist's palette or a wooden pallet)."
  },
  {
    q: "Complete analogous pair; Influenza : Virus :: Typhoid : ?",
    options: ["Bacillus", "Parasite", "Protozoa", "Bacteria"],
    answer: 3,
    explanation: "This analogy pairs an infectious disease with the type of pathogen that causes it. Influenza is caused by a virus, whereas typhoid fever is caused by bacteria (Salmonella typhi)."
  },
  {
    q: "One number-series is given in which one term is wrong. Find out the wrong term. 5, 12, 19, 33, 47, 75, 104.",
    options: ["33", "47", "75", "104"],
    answer: 3,
    explanation: "The differences between terms double in pairs: +7, +7, +14, +14, +28, +28. Following this rule, the last term should be 75 + 28 = 103, making 104 the wrong term."
  }
];
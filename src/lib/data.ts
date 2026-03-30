import { SUBJECTS } from "./constants";

export interface Question {
  id: string;
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DiagnosticResult {
  subject: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
}

export interface Topic {
  id: string;
  subject: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
  gradeLevel: string;
}

export interface Subtopic {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  type: "text" | "video" | "interactive";
  duration: string;
  xpReward: number;
  completed: boolean;
  practiceQuestions: Question[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface DailyMission {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
  type: "lesson" | "practice" | "review" | "explore";
}

// Sample diagnostic questions
export const DIAGNOSTIC_QUESTIONS: Question[] = [
  // Math Easy
  { id: "m1", subject: "math", topic: "Arithmetic", difficulty: "easy", question: "What is 15 × 12?", options: ["160", "170", "180", "190"], correctIndex: 2, explanation: "15 × 12 = 15 × 10 + 15 × 2 = 150 + 30 = 180" },
  { id: "m2", subject: "math", topic: "Fractions", difficulty: "easy", question: "What is 3/4 + 1/4?", options: ["1/2", "3/4", "1", "4/4"], correctIndex: 2, explanation: "3/4 + 1/4 = 4/4 = 1" },
  // Math Medium
  { id: "m3", subject: "math", topic: "Algebra", difficulty: "medium", question: "Solve for x: 2x + 5 = 17", options: ["x = 4", "x = 6", "x = 7", "x = 11"], correctIndex: 1, explanation: "2x + 5 = 17 → 2x = 12 → x = 6" },
  { id: "m4", subject: "math", topic: "Geometry", difficulty: "medium", question: "What is the area of a triangle with base 10 and height 6?", options: ["16", "30", "60", "80"], correctIndex: 1, explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30" },
  // Math Hard
  { id: "m5", subject: "math", topic: "Quadratics", difficulty: "hard", question: "What are the solutions to x² - 5x + 6 = 0?", options: ["x = 1, 6", "x = 2, 3", "x = -2, -3", "x = -1, 6"], correctIndex: 1, explanation: "x² - 5x + 6 = (x-2)(x-3) = 0, so x = 2 or x = 3" },
  // Science Easy
  { id: "s1", subject: "science", topic: "Biology", difficulty: "easy", question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"], correctIndex: 1, explanation: "Mitochondria generate most of the cell's ATP energy." },
  { id: "s2", subject: "science", topic: "Physics", difficulty: "easy", question: "What is the SI unit of force?", options: ["Watt", "Newton", "Joule", "Pascal"], correctIndex: 1, explanation: "The Newton (N) is the SI unit of force: 1 N = 1 kg⋅m/s²" },
  // Science Medium
  { id: "s3", subject: "science", topic: "Chemistry", difficulty: "medium", question: "What is the chemical formula for water?", options: ["H₂O₂", "HO₂", "H₂O", "OH"], correctIndex: 2, explanation: "Water is composed of 2 hydrogen atoms and 1 oxygen atom: H₂O" },
  { id: "s4", subject: "science", topic: "Physics", difficulty: "medium", question: "What is Newton's second law of motion?", options: ["F = ma", "E = mc²", "F = mv", "P = mv"], correctIndex: 0, explanation: "Newton's second law states that Force = mass × acceleration" },
  // Science Hard
  { id: "s5", subject: "science", topic: "Chemistry", difficulty: "hard", question: "What is the electron configuration of Carbon (Z=6)?", options: ["1s² 2s² 2p⁴", "1s² 2s² 2p²", "1s² 2s¹ 2p³", "1s² 2p⁴"], correctIndex: 1, explanation: "Carbon has 6 electrons: 1s² 2s² 2p²" },
  // English Easy
  { id: "e1", subject: "english", topic: "Grammar", difficulty: "easy", question: "Which is the correct sentence?", options: ["Their going home.", "They're going home.", "There going home.", "Theyre going home."], correctIndex: 1, explanation: "\"They're\" is the contraction of \"they are\"." },
  // English Medium
  { id: "e2", subject: "english", topic: "Literature", difficulty: "medium", question: "What literary device is \"The wind whispered through the trees\"?", options: ["Simile", "Metaphor", "Personification", "Alliteration"], correctIndex: 2, explanation: "Personification gives human qualities (whispering) to non-human things (wind)." },
  // History
  { id: "h1", subject: "history", topic: "World History", difficulty: "easy", question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctIndex: 2, explanation: "WWII ended in 1945 with the surrender of Japan." },
  { id: "h2", subject: "history", topic: "American History", difficulty: "medium", question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], correctIndex: 2, explanation: "George Washington served as the first President from 1789 to 1797." },
  // CS
  { id: "c1", subject: "cs", topic: "Programming", difficulty: "easy", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctIndex: 0, explanation: "HTML = HyperText Markup Language, the standard language for web pages." },
  { id: "c2", subject: "cs", topic: "Algorithms", difficulty: "medium", question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctIndex: 1, explanation: "Binary search halves the search space each step, giving O(log n) complexity." },
];

// Sample topics for the study plan
export const SAMPLE_TOPICS: Topic[] = [
  {
    id: "t1", subject: "math", title: "Algebra Foundations", description: "Master the basics of algebraic thinking", gradeLevel: "9",
    subtopics: [
      { id: "st1", title: "Variables & Expressions", lessons: [
        { id: "l1", title: "What is a Variable?", description: "Understanding variables as placeholders", content: "A **variable** is a symbol (usually a letter) that represents an unknown or changeable value.\n\n## Key Concepts\n\n- Variables act as placeholders for numbers we don't know yet\n- Common variable names: x, y, z, n\n- An **expression** combines variables, numbers, and operations\n\n## Examples\n\n- `x + 5` means \"some number plus 5\"\n- `3y` means \"3 times some number\"\n- `2x + 3` means \"double some number, then add 3\"\n\n## Why It Matters\n\nVariables let us write general rules that work for ANY number, not just specific ones. This is the foundation of all algebra!", type: "text", duration: "5 min", xpReward: 20, completed: false, practiceQuestions: [
          { id: "pq1", subject: "math", topic: "Algebra", difficulty: "easy", question: "If x = 4, what is x + 7?", options: ["10", "11", "12", "47"], correctIndex: 1, explanation: "Substitute x = 4: 4 + 7 = 11" },
          { id: "pq2", subject: "math", topic: "Algebra", difficulty: "easy", question: "Which is an algebraic expression?", options: ["5 + 3", "2x + 1", "8", "Hello"], correctIndex: 1, explanation: "2x + 1 contains a variable (x) making it algebraic" },
          { id: "pq3", subject: "math", topic: "Algebra", difficulty: "medium", question: "If y = 3, what is 2y + 5?", options: ["8", "10", "11", "13"], correctIndex: 2, explanation: "2(3) + 5 = 6 + 5 = 11" },
        ] },
        { id: "l2", title: "Evaluating Expressions", description: "Plug in values and simplify", content: "**Evaluating** an expression means substituting values for variables and calculating.\n\n## Steps\n1. Replace each variable with its given value\n2. Follow order of operations (PEMDAS)\n3. Simplify to get the answer\n\n## Examples\n\nEvaluate `3x + 2` when x = 5:\n- Replace x: 3(5) + 2\n- Multiply: 15 + 2\n- Add: **17**\n\nEvaluate `x² - 4` when x = 3:\n- Replace x: (3)² - 4\n- Square: 9 - 4\n- Subtract: **5**", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st2", title: "Solving Linear Equations", lessons: [
        { id: "l3", title: "One-Step Equations", description: "Solve equations with one operation", content: "A **one-step equation** requires just one operation to isolate the variable.\n\n## Strategy\nDo the **opposite operation** to both sides.\n\n## Examples\n\n**Addition:** x + 5 = 12 → x = 12 - 5 → x = 7\n\n**Subtraction:** x - 3 = 8 → x = 8 + 3 → x = 11\n\n**Multiplication:** 4x = 20 → x = 20 ÷ 4 → x = 5\n\n**Division:** x/3 = 6 → x = 6 × 3 → x = 18", type: "text", duration: "7 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l4", title: "Two-Step Equations", description: "Equations requiring two operations", content: "**Two-step equations** need two operations to solve.\n\n## Strategy\n1. Undo addition/subtraction first\n2. Then undo multiplication/division\n\n## Example\nSolve: 2x + 3 = 11\n1. Subtract 3: 2x = 8\n2. Divide by 2: x = 4\n\n✅ Check: 2(4) + 3 = 11 ✓", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t2", subject: "math", title: "Geometry Basics", description: "Shapes, angles, and spatial reasoning", gradeLevel: "9",
    subtopics: [
      { id: "st3", title: "Angles & Lines", lessons: [
        { id: "l5", title: "Types of Angles", description: "Acute, right, obtuse, and straight angles", content: "Angles are measured in degrees (°).\n\n## Types\n- **Acute:** Less than 90°\n- **Right:** Exactly 90°\n- **Obtuse:** Between 90° and 180°\n- **Straight:** Exactly 180°\n\n## Complementary & Supplementary\n- **Complementary:** Two angles that add to 90°\n- **Supplementary:** Two angles that add to 180°", type: "text", duration: "6 min", xpReward: 20, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t3", subject: "science", title: "Cell Biology", description: "The building blocks of life", gradeLevel: "9",
    subtopics: [
      { id: "st4", title: "Cell Structure", lessons: [
        { id: "l6", title: "Parts of a Cell", description: "Explore organelles and their functions", content: "Every living thing is made of **cells** — the basic unit of life.\n\n## Key Organelles\n\n| Organelle | Function |\n|-----------|----------|\n| **Nucleus** | Control center; contains DNA |\n| **Mitochondria** | Produces energy (ATP) |\n| **Cell Membrane** | Controls what enters/exits |\n| **Ribosomes** | Makes proteins |\n| **Endoplasmic Reticulum** | Transports materials |\n| **Golgi Apparatus** | Packages & ships proteins |\n\n## Plant vs Animal Cells\nPlant cells have a **cell wall** and **chloroplasts** that animal cells lack.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t4", subject: "english", title: "Essay Writing", description: "Craft compelling written arguments", gradeLevel: "9",
    subtopics: [
      { id: "st5", title: "Essay Structure", lessons: [
        { id: "l7", title: "The 5-Paragraph Essay", description: "Classic essay structure mastery", content: "The 5-paragraph essay is a fundamental structure.\n\n## Structure\n1. **Introduction** — Hook + thesis statement\n2. **Body 1** — First supporting point\n3. **Body 2** — Second supporting point\n4. **Body 3** — Third supporting point\n5. **Conclusion** — Restate thesis + closing thought\n\n## Tips\n- Start with a compelling hook\n- Each body paragraph needs a topic sentence\n- Use transitions between paragraphs\n- End with impact, not just a summary", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t5", subject: "cs", title: "Intro to Programming", description: "Learn computational thinking", gradeLevel: "9",
    subtopics: [
      { id: "st6", title: "Programming Basics", lessons: [
        { id: "l8", title: "What is Programming?", description: "Understanding code and logic", content: "**Programming** is giving precise instructions to a computer.\n\n## Key Concepts\n- **Algorithm:** A step-by-step procedure\n- **Variable:** A named container for data\n- **Loop:** Repeating instructions\n- **Condition:** Making decisions (if/else)\n- **Function:** Reusable blocks of code\n\n## Why Learn to Code?\n- Develop problem-solving skills\n- Automate repetitive tasks\n- Create apps, games, and websites\n- Understand how technology works", type: "text", duration: "6 min", xpReward: 20, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t6", subject: "history", title: "World Wars", description: "Understanding global conflicts of the 20th century", gradeLevel: "9",
    subtopics: [
      { id: "st7", title: "World War I", lessons: [
        { id: "l9", title: "Causes of WWI", description: "The spark that ignited the Great War", content: "World War I (1914–1918) was caused by multiple interconnected factors.\n\n## M.A.I.N. Causes\n- **Militarism:** Arms race between European powers\n- **Alliances:** Complex web of mutual defense pacts\n- **Imperialism:** Competition for colonies\n- **Nationalism:** Fierce national pride and rivalry\n\n## The Spark\nThe assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo (June 28, 1914) triggered the alliance system, pulling Europe into war.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
];

export const SAMPLE_BADGES: Badge[] = [
  { id: "b1", title: "First Steps", description: "Complete your first lesson", icon: "🎯", earned: true, earnedAt: "2024-01-15" },
  { id: "b2", title: "Streak Starter", description: "Maintain a 3-day streak", icon: "🔥", earned: true, earnedAt: "2024-01-18" },
  { id: "b3", title: "Quiz Whiz", description: "Score 100% on any practice set", icon: "⭐", earned: false },
  { id: "b4", title: "Explorer", description: "Study 5 different topics", icon: "🧭", earned: false },
  { id: "b5", title: "Night Owl", description: "Study after 10 PM", icon: "🦉", earned: true, earnedAt: "2024-01-20" },
  { id: "b6", title: "Bookworm", description: "Complete 10 lessons", icon: "📖", earned: false },
  { id: "b7", title: "Problem Solver", description: "Answer 50 practice questions", icon: "🧩", earned: false },
  { id: "b8", title: "Pathwise Legend", description: "Reach Level 8", icon: "👑", earned: false },
];

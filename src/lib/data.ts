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

// Diagnostic questions — expanded set
export const DIAGNOSTIC_QUESTIONS: Question[] = [
  // ─── MATH EASY ───
  { id: "m1", subject: "math", topic: "Arithmetic", difficulty: "easy", question: "What is 15 × 12?", options: ["160", "170", "180", "190"], correctIndex: 2, explanation: "15 × 12 = 150 + 30 = 180" },
  { id: "m2", subject: "math", topic: "Fractions", difficulty: "easy", question: "What is 3/4 + 1/4?", options: ["1/2", "3/4", "1", "4/8"], correctIndex: 2, explanation: "3/4 + 1/4 = 4/4 = 1" },
  { id: "m2b", subject: "math", topic: "Arithmetic", difficulty: "easy", question: "What is 256 ÷ 8?", options: ["28", "30", "32", "34"], correctIndex: 2, explanation: "256 ÷ 8 = 32" },
  { id: "m2c", subject: "math", topic: "Fractions", difficulty: "easy", question: "Simplify 12/16.", options: ["2/3", "3/4", "4/5", "6/8"], correctIndex: 1, explanation: "12/16 = 3/4 (divide both by 4)" },
  { id: "m2d", subject: "math", topic: "Arithmetic", difficulty: "easy", question: "What is 7² ?", options: ["42", "47", "49", "56"], correctIndex: 2, explanation: "7² = 7 × 7 = 49" },
  // ─── MATH MEDIUM ───
  { id: "m3", subject: "math", topic: "Algebra", difficulty: "medium", question: "Solve for x: 2x + 5 = 17", options: ["x = 4", "x = 6", "x = 7", "x = 11"], correctIndex: 1, explanation: "2x + 5 = 17 → 2x = 12 → x = 6" },
  { id: "m4", subject: "math", topic: "Geometry", difficulty: "medium", question: "What is the area of a triangle with base 10 and height 6?", options: ["16", "30", "60", "80"], correctIndex: 1, explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30" },
  { id: "m4b", subject: "math", topic: "Algebra", difficulty: "medium", question: "If f(x) = 3x - 7, what is f(5)?", options: ["2", "8", "15", "22"], correctIndex: 1, explanation: "f(5) = 3(5) - 7 = 15 - 7 = 8" },
  { id: "m4c", subject: "math", topic: "Geometry", difficulty: "medium", question: "A circle has radius 7. What is its circumference? (Use π ≈ 22/7)", options: ["22", "44", "49", "154"], correctIndex: 1, explanation: "C = 2πr = 2 × (22/7) × 7 = 44" },
  { id: "m4d", subject: "math", topic: "Statistics", difficulty: "medium", question: "What is the median of {3, 7, 9, 12, 15}?", options: ["7", "9", "9.2", "12"], correctIndex: 1, explanation: "The middle value in an ordered set of 5 numbers is the 3rd: 9" },
  { id: "m4e", subject: "math", topic: "Algebra", difficulty: "medium", question: "Simplify: 3(2x - 4) + 6", options: ["6x - 6", "6x + 6", "6x - 18", "6x - 12"], correctIndex: 0, explanation: "3(2x - 4) + 6 = 6x - 12 + 6 = 6x - 6" },
  // ─── MATH HARD ───
  { id: "m5", subject: "math", topic: "Quadratics", difficulty: "hard", question: "What are the solutions to x² - 5x + 6 = 0?", options: ["x = 1, 6", "x = 2, 3", "x = -2, -3", "x = -1, 6"], correctIndex: 1, explanation: "x² - 5x + 6 = (x-2)(x-3) = 0, so x = 2 or x = 3" },
  { id: "m5b", subject: "math", topic: "Quadratics", difficulty: "hard", question: "What is the discriminant of 2x² + 3x - 5 = 0?", options: ["49", "31", "-31", "9"], correctIndex: 0, explanation: "Δ = b² - 4ac = 9 - 4(2)(-5) = 9 + 40 = 49" },
  { id: "m5c", subject: "math", topic: "Trigonometry", difficulty: "hard", question: "In a right triangle, if sin(θ) = 3/5, what is cos(θ)?", options: ["3/4", "4/5", "5/3", "4/3"], correctIndex: 1, explanation: "sin²θ + cos²θ = 1 → cos²θ = 1 - 9/25 = 16/25 → cosθ = 4/5" },
  { id: "m5d", subject: "math", topic: "Calculus", difficulty: "hard", question: "What is the derivative of f(x) = x³ + 2x?", options: ["3x² + 2", "x² + 2", "3x + 2", "x³ + 2"], correctIndex: 0, explanation: "f'(x) = 3x² + 2 using the power rule" },
  { id: "m5e", subject: "math", topic: "Logarithms", difficulty: "hard", question: "Solve: log₂(32) = ?", options: ["3", "4", "5", "6"], correctIndex: 2, explanation: "2⁵ = 32, so log₂(32) = 5" },
  { id: "m5f", subject: "math", topic: "Sequences", difficulty: "hard", question: "What is the sum of the first 10 terms of the arithmetic series 2, 5, 8, 11, ...?", options: ["125", "155", "165", "185"], correctIndex: 1, explanation: "a₁=2, d=3, a₁₀=29. S = 10/2 × (2+29) = 155" },

  // ─── SCIENCE EASY ───
  { id: "s1", subject: "science", topic: "Biology", difficulty: "easy", question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"], correctIndex: 1, explanation: "Mitochondria generate most of the cell's ATP energy." },
  { id: "s2", subject: "science", topic: "Physics", difficulty: "easy", question: "What is the SI unit of force?", options: ["Watt", "Newton", "Joule", "Pascal"], correctIndex: 1, explanation: "The Newton (N) is the SI unit of force." },
  { id: "s2b", subject: "science", topic: "Biology", difficulty: "easy", question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctIndex: 2, explanation: "Plants absorb CO₂ for photosynthesis." },
  { id: "s2c", subject: "science", topic: "Physics", difficulty: "easy", question: "What is the speed of light approximately?", options: ["300 km/s", "3,000 km/s", "300,000 km/s", "3,000,000 km/s"], correctIndex: 2, explanation: "Light travels at approximately 300,000 km/s (3 × 10⁸ m/s)." },
  // ─── SCIENCE MEDIUM ───
  { id: "s3", subject: "science", topic: "Chemistry", difficulty: "medium", question: "What is the chemical formula for water?", options: ["H₂O₂", "HO₂", "H₂O", "OH"], correctIndex: 2, explanation: "Water is H₂O: 2 hydrogen atoms and 1 oxygen atom." },
  { id: "s4", subject: "science", topic: "Physics", difficulty: "medium", question: "What is Newton's second law of motion?", options: ["F = ma", "E = mc²", "F = mv", "P = mv"], correctIndex: 0, explanation: "Force = mass × acceleration" },
  { id: "s4b", subject: "science", topic: "Chemistry", difficulty: "medium", question: "How many elements are in the periodic table (approx)?", options: ["92", "108", "118", "126"], correctIndex: 2, explanation: "There are 118 confirmed elements as of 2024." },
  { id: "s4c", subject: "science", topic: "Biology", difficulty: "medium", question: "What molecule carries genetic information?", options: ["RNA", "DNA", "ATP", "Protein"], correctIndex: 1, explanation: "DNA (deoxyribonucleic acid) stores genetic information." },
  { id: "s4d", subject: "science", topic: "Physics", difficulty: "medium", question: "What is the unit of electrical resistance?", options: ["Ampere", "Volt", "Ohm", "Watt"], correctIndex: 2, explanation: "Electrical resistance is measured in Ohms (Ω)." },
  // ─── SCIENCE HARD ───
  { id: "s5", subject: "science", topic: "Chemistry", difficulty: "hard", question: "What is the electron configuration of Carbon (Z=6)?", options: ["1s² 2s² 2p⁴", "1s² 2s² 2p²", "1s² 2s¹ 2p³", "1s² 2p⁴"], correctIndex: 1, explanation: "Carbon has 6 electrons: 1s² 2s² 2p²" },
  { id: "s5b", subject: "science", topic: "Physics", difficulty: "hard", question: "A 2 kg object accelerates at 5 m/s². What net force acts on it?", options: ["2.5 N", "7 N", "10 N", "25 N"], correctIndex: 2, explanation: "F = ma = 2 × 5 = 10 N" },
  { id: "s5c", subject: "science", topic: "Chemistry", difficulty: "hard", question: "What is the pH of a solution with [H⁺] = 10⁻³ M?", options: ["1", "3", "7", "11"], correctIndex: 1, explanation: "pH = -log[H⁺] = -log(10⁻³) = 3" },
  { id: "s5d", subject: "science", topic: "Biology", difficulty: "hard", question: "During which phase of mitosis do chromosomes align at the cell's equator?", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], correctIndex: 1, explanation: "During metaphase, chromosomes line up along the metaphase plate." },
  { id: "s5e", subject: "science", topic: "Physics", difficulty: "hard", question: "What is the wavelength of a photon with energy E = hf and frequency 5×10¹⁴ Hz?", options: ["600 nm", "500 nm", "400 nm", "700 nm"], correctIndex: 0, explanation: "λ = c/f = 3×10⁸ / 5×10¹⁴ = 6×10⁻⁷ m = 600 nm" },

  // ─── ENGLISH EASY ───
  { id: "e1", subject: "english", topic: "Grammar", difficulty: "easy", question: "Which is the correct sentence?", options: ["Their going home.", "They're going home.", "There going home.", "Theyre going home."], correctIndex: 1, explanation: "\"They're\" is the contraction of \"they are\"." },
  { id: "e1b", subject: "english", topic: "Vocabulary", difficulty: "easy", question: "What does 'benevolent' mean?", options: ["Hostile", "Kind and generous", "Intelligent", "Cautious"], correctIndex: 1, explanation: "Benevolent means well-meaning and kindly." },
  { id: "e1c", subject: "english", topic: "Grammar", difficulty: "easy", question: "Which word is an adjective in: 'The tall tree swayed'?", options: ["The", "tall", "tree", "swayed"], correctIndex: 1, explanation: "'Tall' describes the noun 'tree', making it an adjective." },
  // ─── ENGLISH MEDIUM ───
  { id: "e2", subject: "english", topic: "Literature", difficulty: "medium", question: "What literary device is \"The wind whispered through the trees\"?", options: ["Simile", "Metaphor", "Personification", "Alliteration"], correctIndex: 2, explanation: "Personification gives human qualities (whispering) to non-human things." },
  { id: "e2b", subject: "english", topic: "Grammar", difficulty: "medium", question: "Identify the subordinate clause: 'I left because it was late.'", options: ["I left", "because it was late", "it was late", "I left because"], correctIndex: 1, explanation: "'Because it was late' is a dependent/subordinate clause." },
  { id: "e2c", subject: "english", topic: "Literature", difficulty: "medium", question: "What is the term for a story told from an all-knowing perspective?", options: ["First person", "Second person", "Third person limited", "Third person omniscient"], correctIndex: 3, explanation: "Omniscient narration knows all characters' thoughts and feelings." },
  // ─── ENGLISH HARD ───
  { id: "e3", subject: "english", topic: "Literature", difficulty: "hard", question: "In Shakespeare's 'Hamlet', what does 'To be or not to be' contemplate?", options: ["Marriage", "War strategy", "Existence and death", "Travel plans"], correctIndex: 2, explanation: "The soliloquy contemplates the meaning of existence and whether to endure life's suffering." },
  { id: "e3b", subject: "english", topic: "Grammar", difficulty: "hard", question: "Which sentence uses the subjunctive mood correctly?", options: ["If I was rich, I'd travel.", "If I were rich, I'd travel.", "If I am rich, I'd travel.", "If I be rich, I'd travel."], correctIndex: 1, explanation: "The subjunctive uses 'were' for hypothetical situations: 'If I were...'" },
  { id: "e3c", subject: "english", topic: "Rhetoric", difficulty: "hard", question: "What rhetorical device repeats the same word at the start of successive clauses?", options: ["Epistrophe", "Anaphora", "Chiasmus", "Antithesis"], correctIndex: 1, explanation: "Anaphora is the repetition of a word or phrase at the beginning of successive clauses." },

  // ─── HISTORY EASY ───
  { id: "h1", subject: "history", topic: "World History", difficulty: "easy", question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctIndex: 2, explanation: "WWII ended in 1945 with the surrender of Japan." },
  { id: "h1b", subject: "history", topic: "World History", difficulty: "easy", question: "Which ancient civilization built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Persians"], correctIndex: 2, explanation: "The ancient Egyptians built the famous pyramids at Giza." },
  // ─── HISTORY MEDIUM ───
  { id: "h2", subject: "history", topic: "American History", difficulty: "medium", question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], correctIndex: 2, explanation: "George Washington served as the first President from 1789 to 1797." },
  { id: "h2b", subject: "history", topic: "World History", difficulty: "medium", question: "The French Revolution began in which year?", options: ["1776", "1789", "1804", "1815"], correctIndex: 1, explanation: "The French Revolution began in 1789 with the storming of the Bastille." },
  { id: "h2c", subject: "history", topic: "World History", difficulty: "medium", question: "What was the Berlin Wall?", options: ["A Roman fortification", "A barrier dividing East and West Berlin", "A medieval castle wall", "A dam on the Spree River"], correctIndex: 1, explanation: "The Berlin Wall (1961–1989) divided East and West Berlin during the Cold War." },
  // ─── HISTORY HARD ───
  { id: "h3", subject: "history", topic: "World History", difficulty: "hard", question: "The Treaty of Westphalia (1648) is significant because it:", options: ["Ended World War I", "Established the concept of nation-state sovereignty", "Founded the United Nations", "Created the European Union"], correctIndex: 1, explanation: "The Treaty of Westphalia established the principle of state sovereignty and ended the Thirty Years' War." },
  { id: "h3b", subject: "history", topic: "American History", difficulty: "hard", question: "Which Supreme Court case established judicial review?", options: ["Roe v. Wade", "Brown v. Board", "Marbury v. Madison", "Dred Scott v. Sandford"], correctIndex: 2, explanation: "Marbury v. Madison (1803) established the power of judicial review." },

  // ─── CS EASY ───
  { id: "c1", subject: "cs", topic: "Programming", difficulty: "easy", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctIndex: 0, explanation: "HTML = HyperText Markup Language." },
  { id: "c1b", subject: "cs", topic: "Programming", difficulty: "easy", question: "Which symbol is used for comments in Python?", options: ["//", "/* */", "#", "--"], correctIndex: 2, explanation: "Python uses # for single-line comments." },
  // ─── CS MEDIUM ───
  { id: "c2", subject: "cs", topic: "Algorithms", difficulty: "medium", question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctIndex: 1, explanation: "Binary search halves the search space each step, giving O(log n)." },
  { id: "c2b", subject: "cs", topic: "Data Structures", difficulty: "medium", question: "Which data structure uses FIFO (First In, First Out)?", options: ["Stack", "Queue", "Tree", "Graph"], correctIndex: 1, explanation: "A Queue follows FIFO — elements are removed in the order they were added." },
  { id: "c2c", subject: "cs", topic: "Programming", difficulty: "medium", question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correctIndex: 1, explanation: "CSS = Cascading Style Sheets." },
  // ─── CS HARD ───
  { id: "c3", subject: "cs", topic: "Algorithms", difficulty: "hard", question: "What is the worst-case time complexity of quicksort?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], correctIndex: 2, explanation: "Quicksort's worst case is O(n²) when the pivot is consistently the smallest or largest element." },
  { id: "c3b", subject: "cs", topic: "Data Structures", difficulty: "hard", question: "In a balanced binary search tree with n nodes, what is the height?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctIndex: 1, explanation: "A balanced BST has height O(log n), ensuring efficient search operations." },
  { id: "c3c", subject: "cs", topic: "Networking", difficulty: "hard", question: "Which layer of the OSI model handles routing?", options: ["Data Link", "Transport", "Network", "Session"], correctIndex: 2, explanation: "The Network layer (Layer 3) handles routing and IP addressing." },
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

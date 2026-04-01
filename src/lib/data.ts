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
  // ═══════════════════ MATH ═══════════════════
  {
    id: "t1", subject: "math", title: "Algebra Foundations", description: "Master the basics of algebraic thinking", gradeLevel: "9",
    subtopics: [
      { id: "st1", title: "Variables & Expressions", lessons: [
        { id: "l1", title: "What is a Variable?", description: "Understanding variables as placeholders", content: "A **variable** is a symbol that represents an unknown value.\n\n## Key Concepts\n- Variables act as placeholders\n- Common names: x, y, z\n- An **expression** combines variables, numbers, and operations", type: "text", duration: "5 min", xpReward: 20, completed: false, practiceQuestions: [
          { id: "pq1", subject: "math", topic: "Algebra", difficulty: "easy", question: "If x = 4, what is x + 7?", options: ["10", "11", "12", "47"], correctIndex: 1, explanation: "4 + 7 = 11" },
          { id: "pq2", subject: "math", topic: "Algebra", difficulty: "easy", question: "Which is an algebraic expression?", options: ["5 + 3", "2x + 1", "8", "Hello"], correctIndex: 1, explanation: "2x + 1 contains a variable" },
          { id: "pq3", subject: "math", topic: "Algebra", difficulty: "medium", question: "If y = 3, what is 2y + 5?", options: ["8", "10", "11", "13"], correctIndex: 2, explanation: "2(3) + 5 = 11" },
        ] },
        { id: "l2", title: "Evaluating Expressions", description: "Plug in values and simplify", content: "**Evaluating** means substituting values for variables and calculating using PEMDAS.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st2", title: "Solving Linear Equations", lessons: [
        { id: "l3", title: "One-Step Equations", description: "Solve equations with one operation", content: "Do the **opposite operation** to both sides to isolate x.", type: "text", duration: "7 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l4", title: "Two-Step Equations", description: "Equations requiring two operations", content: "1. Undo addition/subtraction first\n2. Then undo multiplication/division", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t2", subject: "math", title: "Geometry Basics", description: "Shapes, angles, and spatial reasoning", gradeLevel: "9",
    subtopics: [
      { id: "st3", title: "Angles & Lines", lessons: [
        { id: "l5", title: "Types of Angles", description: "Acute, right, obtuse, and straight angles", content: "Angles: Acute (<90°), Right (90°), Obtuse (90–180°), Straight (180°).", type: "text", duration: "6 min", xpReward: 20, completed: false, practiceQuestions: [] },
        { id: "l5b", title: "Parallel & Perpendicular Lines", description: "Relationships between lines", content: "Parallel lines never intersect; perpendicular lines meet at 90°.", type: "text", duration: "7 min", xpReward: 20, completed: false, practiceQuestions: [] },
      ]},
      { id: "st3b", title: "Triangles & Polygons", lessons: [
        { id: "l5c", title: "Triangle Properties", description: "Angles, sides, and classifications", content: "Triangle angles always sum to 180°. Types: equilateral, isosceles, scalene.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l5d", title: "Area & Perimeter", description: "Calculate measurements of common shapes", content: "Rectangle: A = l×w. Triangle: A = ½bh. Circle: A = πr².", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-math3", subject: "math", title: "Quadratic Equations", description: "Solve and graph second-degree polynomials", gradeLevel: "10",
    subtopics: [
      { id: "st-q1", title: "Factoring", lessons: [
        { id: "l-q1", title: "Factoring Trinomials", description: "Break quadratics into two binomials", content: "Factor x² + bx + c by finding two numbers that multiply to c and add to b.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-q2", title: "Difference of Squares", description: "a² - b² = (a+b)(a-b)", content: "Recognize and factor expressions like x² - 9 = (x+3)(x-3).", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-q2", title: "The Quadratic Formula", lessons: [
        { id: "l-q3", title: "Deriving the Formula", description: "Where x = (-b ± √(b²-4ac)) / 2a comes from", content: "Complete the square on ax² + bx + c = 0 to derive the quadratic formula.", type: "text", duration: "12 min", xpReward: 35, completed: false, practiceQuestions: [] },
        { id: "l-q4", title: "The Discriminant", description: "Determine the number of solutions", content: "Δ = b²-4ac: positive → 2 real, zero → 1 real, negative → no real solutions.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-math4", subject: "math", title: "Trigonometry", description: "Sine, cosine, tangent and their applications", gradeLevel: "10",
    subtopics: [
      { id: "st-trig1", title: "Right Triangle Trig", lessons: [
        { id: "l-trig1", title: "SOH-CAH-TOA", description: "The three basic trig ratios", content: "sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-trig2", title: "Finding Missing Sides", description: "Use trig to solve for unknowns", content: "Set up the ratio, cross-multiply, and solve for the missing side length.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-trig2", title: "Unit Circle", lessons: [
        { id: "l-trig3", title: "Radians & Degrees", description: "Convert between angle units", content: "360° = 2π radians. To convert: radians = degrees × π/180.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-trig4", title: "Unit Circle Values", description: "Key angles and their coordinates", content: "Memorize sin/cos values at 0°, 30°, 45°, 60°, 90° and extend to all quadrants.", type: "text", duration: "15 min", xpReward: 35, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-math5", subject: "math", title: "Statistics & Probability", description: "Data analysis and chance", gradeLevel: "9",
    subtopics: [
      { id: "st-stat1", title: "Descriptive Statistics", lessons: [
        { id: "l-stat1", title: "Mean, Median, Mode", description: "Measures of central tendency", content: "Mean = sum/count. Median = middle value. Mode = most frequent.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-stat2", title: "Standard Deviation", description: "Measuring spread of data", content: "Standard deviation measures how spread out values are from the mean.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-stat2", title: "Probability", lessons: [
        { id: "l-stat3", title: "Basic Probability", description: "Likelihood of events occurring", content: "P(event) = favorable outcomes / total outcomes. Always between 0 and 1.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-stat4", title: "Compound Events", description: "AND, OR, and conditional probability", content: "P(A and B) = P(A) × P(B) for independent events. P(A or B) = P(A) + P(B) - P(A and B).", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-math6", subject: "math", title: "Calculus Introduction", description: "Limits, derivatives, and integrals", gradeLevel: "12",
    subtopics: [
      { id: "st-calc1", title: "Limits", lessons: [
        { id: "l-calc1", title: "What is a Limit?", description: "Understanding approaching values", content: "A limit describes the value a function approaches as x gets closer to some number.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-calc2", title: "Limit Laws", description: "Rules for evaluating limits", content: "Sum, product, and quotient rules allow breaking complex limits into simpler parts.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-calc2", title: "Derivatives", lessons: [
        { id: "l-calc3", title: "The Power Rule", description: "d/dx[xⁿ] = nxⁿ⁻¹", content: "The most fundamental differentiation rule. Example: d/dx[x³] = 3x².", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-calc4", title: "Chain Rule", description: "Differentiating composite functions", content: "d/dx[f(g(x))] = f'(g(x)) · g'(x). Peel the layers of nested functions.", type: "text", duration: "15 min", xpReward: 35, completed: false, practiceQuestions: [] },
      ]},
    ],
  },

  // ═══════════════════ SCIENCE ═══════════════════
  {
    id: "t3", subject: "science", title: "Cell Biology", description: "The building blocks of life", gradeLevel: "9",
    subtopics: [
      { id: "st4", title: "Cell Structure", lessons: [
        { id: "l6", title: "Parts of a Cell", description: "Explore organelles and their functions", content: "Key organelles: Nucleus (DNA), Mitochondria (energy), Ribosomes (proteins), Cell Membrane (barrier).", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l6b", title: "Plant vs Animal Cells", description: "Key differences between cell types", content: "Plant cells have cell walls, chloroplasts, and large vacuoles that animal cells lack.", type: "text", duration: "7 min", xpReward: 20, completed: false, practiceQuestions: [] },
      ]},
      { id: "st4b", title: "Cell Processes", lessons: [
        { id: "l6c", title: "Mitosis", description: "Cell division for growth and repair", content: "Phases: Prophase → Metaphase → Anaphase → Telophase → Cytokinesis.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l6d", title: "Cellular Respiration", description: "How cells produce energy", content: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. Glycolysis → Krebs Cycle → ETC.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-sci2", subject: "science", title: "Genetics & DNA", description: "Heredity and the blueprint of life", gradeLevel: "10",
    subtopics: [
      { id: "st-gen1", title: "DNA Structure", lessons: [
        { id: "l-gen1", title: "The Double Helix", description: "Watson, Crick, and the structure of DNA", content: "DNA is a double helix with sugar-phosphate backbone and base pairs: A-T, G-C.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-gen2", title: "DNA Replication", description: "How DNA copies itself", content: "Semi-conservative replication: helicase unwinds, DNA polymerase builds new strands.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-gen2", title: "Mendelian Genetics", lessons: [
        { id: "l-gen3", title: "Punnett Squares", description: "Predicting offspring traits", content: "Cross parental genotypes to predict probability of phenotypes in offspring.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-gen4", title: "Dominant & Recessive Traits", description: "How alleles determine phenotype", content: "Dominant alleles (A) mask recessive (a). AA and Aa show dominant phenotype.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-sci3", subject: "science", title: "Ecosystems & Ecology", description: "How organisms interact with their environment", gradeLevel: "9",
    subtopics: [
      { id: "st-eco1", title: "Food Webs", lessons: [
        { id: "l-eco1", title: "Producers & Consumers", description: "Energy flow in ecosystems", content: "Producers make food (photosynthesis). Consumers eat other organisms. Decomposers break down dead matter.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-eco2", title: "Trophic Levels", description: "Energy pyramids and efficiency", content: "Only ~10% of energy transfers between trophic levels. This limits food chain length.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-eco2", title: "Biodiversity", lessons: [
        { id: "l-eco3", title: "Why Biodiversity Matters", description: "Ecosystem resilience and services", content: "Greater biodiversity = more stable ecosystems. Provides food, medicine, clean water.", type: "text", duration: "8 min", xpReward: 20, completed: false, practiceQuestions: [] },
      ]},
    ],
  },

  // ═══════════════════ PHYSICS ═══════════════════
  {
    id: "t-phys1", subject: "physics", title: "Classical Mechanics", description: "Motion, forces, and Newton's laws", gradeLevel: "10",
    subtopics: [
      { id: "st-mech1", title: "Kinematics", lessons: [
        { id: "l-mech1", title: "Speed, Velocity & Acceleration", description: "Describing motion mathematically", content: "Speed = distance/time. Velocity includes direction. Acceleration = Δv/Δt.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-mech2", title: "Kinematic Equations", description: "The 4 equations of motion", content: "v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax, x = ½(v₀+v)t.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-mech2", title: "Newton's Laws", lessons: [
        { id: "l-mech3", title: "First & Second Laws", description: "Inertia and F = ma", content: "1st: objects stay at rest or in motion unless acted on. 2nd: F = ma.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-mech4", title: "Third Law & Free Body Diagrams", description: "Action-reaction pairs", content: "Every action has an equal and opposite reaction. Draw FBDs to analyze forces.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-phys2", subject: "physics", title: "Energy & Waves", description: "Work, energy conservation, and wave behavior", gradeLevel: "10",
    subtopics: [
      { id: "st-en1", title: "Work & Energy", lessons: [
        { id: "l-en1", title: "Kinetic & Potential Energy", description: "KE = ½mv², PE = mgh", content: "Kinetic energy is energy of motion. Potential energy is stored energy due to position.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-en2", title: "Conservation of Energy", description: "Energy cannot be created or destroyed", content: "Total energy in a closed system remains constant. KE + PE = constant.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-en2", title: "Waves", lessons: [
        { id: "l-en3", title: "Wave Properties", description: "Amplitude, frequency, wavelength", content: "v = fλ. Amplitude = max displacement. Frequency = cycles per second (Hz).", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-en4", title: "Sound & Light", description: "Mechanical vs electromagnetic waves", content: "Sound needs a medium; light doesn't. Light speed: 3×10⁸ m/s.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-phys3", subject: "physics", title: "Electricity & Magnetism", description: "Circuits, fields, and electromagnetic force", gradeLevel: "11",
    subtopics: [
      { id: "st-em1", title: "Electric Circuits", lessons: [
        { id: "l-em1", title: "Ohm's Law", description: "V = IR and circuit basics", content: "Voltage = Current × Resistance. Series: resistances add. Parallel: 1/R = 1/R₁ + 1/R₂.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-em2", title: "Power & Energy in Circuits", description: "P = IV and electrical energy", content: "Power = Current × Voltage. Energy = Power × Time. Measured in Watts and Joules.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-em2", title: "Magnetism", lessons: [
        { id: "l-em3", title: "Magnetic Fields", description: "Magnets, fields, and Earth's magnetism", content: "Magnets have N and S poles. Like poles repel, unlike attract. Earth has a magnetic field.", type: "text", duration: "8 min", xpReward: 20, completed: false, practiceQuestions: [] },
      ]},
    ],
  },

  // ═══════════════════ CHEMISTRY ═══════════════════
  {
    id: "t-chem1", subject: "chemistry", title: "Atomic Structure", description: "Atoms, elements, and the periodic table", gradeLevel: "10",
    subtopics: [
      { id: "st-atom1", title: "The Atom", lessons: [
        { id: "l-atom1", title: "Protons, Neutrons, Electrons", description: "Subatomic particles and their properties", content: "Protons (+) and neutrons (neutral) in nucleus. Electrons (-) orbit in shells.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-atom2", title: "Electron Configuration", description: "How electrons fill orbitals", content: "Fill orbitals in order: 1s, 2s, 2p, 3s, 3p, 4s, 3d... Follow the Aufbau principle.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-atom2", title: "Periodic Table", lessons: [
        { id: "l-atom3", title: "Groups & Periods", description: "Organization of elements", content: "Groups (columns) share properties. Periods (rows) show increasing atomic number.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-atom4", title: "Periodic Trends", description: "Electronegativity, atomic radius, ionization energy", content: "Electronegativity increases right and up. Atomic radius increases left and down.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-chem2", subject: "chemistry", title: "Chemical Reactions", description: "Balancing equations and reaction types", gradeLevel: "10",
    subtopics: [
      { id: "st-rxn1", title: "Balancing Equations", lessons: [
        { id: "l-rxn1", title: "Conservation of Mass", description: "Atoms in = atoms out", content: "Balance equations by adjusting coefficients so each element has equal atoms on both sides.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-rxn2", title: "Types of Reactions", description: "Synthesis, decomposition, replacement, combustion", content: "5 types: synthesis (A+B→AB), decomposition (AB→A+B), single replacement, double replacement, combustion.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-rxn2", title: "Stoichiometry", lessons: [
        { id: "l-rxn3", title: "Mole Ratios", description: "Converting between moles using balanced equations", content: "Use coefficients as mole ratios. Convert grams → moles → moles → grams.", type: "text", duration: "15 min", xpReward: 35, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-chem3", subject: "chemistry", title: "Acids, Bases & Solutions", description: "pH, titrations, and solution chemistry", gradeLevel: "11",
    subtopics: [
      { id: "st-ab1", title: "Acids & Bases", lessons: [
        { id: "l-ab1", title: "pH Scale", description: "Measuring acidity and basicity", content: "pH = -log[H⁺]. pH < 7 = acid, pH 7 = neutral, pH > 7 = base.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-ab2", title: "Neutralization Reactions", description: "Acid + Base → Salt + Water", content: "HCl + NaOH → NaCl + H₂O. Titration finds unknown concentration.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },

  // ═══════════════════ BIOLOGY ═══════════════════
  {
    id: "t-bio1", subject: "biology", title: "Human Body Systems", description: "How organ systems work together", gradeLevel: "10",
    subtopics: [
      { id: "st-body1", title: "Circulatory System", lessons: [
        { id: "l-body1", title: "The Heart", description: "Structure and function of the heart", content: "4 chambers: right/left atria and ventricles. Pumps blood through pulmonary and systemic circuits.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-body2", title: "Blood & Blood Vessels", description: "Arteries, veins, and capillaries", content: "Arteries carry blood away from heart. Veins return blood. Capillaries enable gas exchange.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-body2", title: "Nervous System", lessons: [
        { id: "l-body3", title: "Neurons & Signals", description: "How nerve impulses travel", content: "Neurons transmit electrical signals. Dendrites receive, axons transmit, synapses connect.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-body4", title: "Brain Regions", description: "Major areas and their functions", content: "Cerebrum (thinking), cerebellum (coordination), brainstem (vital functions), limbic system (emotions).", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-bio2", subject: "biology", title: "Evolution & Natural Selection", description: "How species change over time", gradeLevel: "10",
    subtopics: [
      { id: "st-evo1", title: "Natural Selection", lessons: [
        { id: "l-evo1", title: "Darwin's Theory", description: "Survival of the fittest explained", content: "Variation exists → some traits are advantageous → those organisms survive and reproduce more.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-evo2", title: "Evidence for Evolution", description: "Fossils, homology, and DNA", content: "Fossil record, homologous structures, embryology, and molecular biology all support evolution.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-evo2", title: "Speciation", lessons: [
        { id: "l-evo3", title: "How New Species Form", description: "Geographic and reproductive isolation", content: "Allopatric: geographic barrier. Sympatric: reproductive isolation without physical separation.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },

  // ═══════════════════ ENGLISH ═══════════════════
  {
    id: "t4", subject: "english", title: "Essay Writing", description: "Craft compelling written arguments", gradeLevel: "9",
    subtopics: [
      { id: "st5", title: "Essay Structure", lessons: [
        { id: "l7", title: "The 5-Paragraph Essay", description: "Classic essay structure mastery", content: "Introduction (hook + thesis) → 3 body paragraphs (topic sentence + evidence) → Conclusion.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l7b", title: "Writing Strong Thesis Statements", description: "The backbone of every essay", content: "A thesis is arguable, specific, and previews your main points. Avoid vague claims.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st5b", title: "Persuasive Writing", lessons: [
        { id: "l7c", title: "Ethos, Pathos, Logos", description: "The three modes of persuasion", content: "Ethos = credibility. Pathos = emotion. Logos = logic. Great arguments use all three.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l7d", title: "Counterarguments", description: "Addressing opposing viewpoints", content: "Acknowledge the other side, then refute it. This strengthens your argument.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-eng2", subject: "english", title: "Literary Analysis", description: "Reading critically and analyzing texts", gradeLevel: "10",
    subtopics: [
      { id: "st-lit1", title: "Literary Devices", lessons: [
        { id: "l-lit1", title: "Metaphor & Simile", description: "Comparing things for effect", content: "Simile uses 'like' or 'as'. Metaphor states one thing IS another. Both create vivid imagery.", type: "text", duration: "8 min", xpReward: 20, completed: false, practiceQuestions: [] },
        { id: "l-lit2", title: "Symbolism & Theme", description: "Deeper meanings in literature", content: "Symbols represent ideas beyond their literal meaning. Themes are the central messages.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-lit3", title: "Irony & Foreshadowing", description: "Techniques that build narrative depth", content: "Dramatic irony: audience knows what characters don't. Foreshadowing hints at future events.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-lit2", title: "Poetry Analysis", lessons: [
        { id: "l-lit4", title: "Meter & Rhyme", description: "The music of poetry", content: "Iambic pentameter: da-DUM × 5. Rhyme schemes: ABAB, AABB, ABBA. Free verse has no fixed pattern.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-lit5", title: "Analyzing a Poem", description: "Step-by-step close reading", content: "Read for meaning, identify devices, consider tone, examine structure, connect to theme.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-eng3", subject: "english", title: "Grammar Mastery", description: "Write with clarity and precision", gradeLevel: "9",
    subtopics: [
      { id: "st-gram1", title: "Sentence Structure", lessons: [
        { id: "l-gram1", title: "Simple, Compound & Complex", description: "Building better sentences", content: "Simple: one clause. Compound: two independent clauses joined by conjunction. Complex: independent + dependent clause.", type: "text", duration: "8 min", xpReward: 20, completed: false, practiceQuestions: [] },
        { id: "l-gram2", title: "Common Errors", description: "Fragments, run-ons, and comma splices", content: "Fragment: incomplete sentence. Run-on: two sentences fused. Fix with periods, semicolons, or conjunctions.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-gram2", title: "Punctuation", lessons: [
        { id: "l-gram3", title: "Semicolons & Colons", description: "Beyond commas and periods", content: "Semicolon: joins related independent clauses. Colon: introduces a list or explanation.", type: "text", duration: "7 min", xpReward: 20, completed: false, practiceQuestions: [] },
      ]},
    ],
  },

  // ═══════════════════ HISTORY ═══════════════════
  {
    id: "t6", subject: "history", title: "World Wars", description: "Understanding global conflicts of the 20th century", gradeLevel: "9",
    subtopics: [
      { id: "st7", title: "World War I", lessons: [
        { id: "l9", title: "Causes of WWI", description: "The spark that ignited the Great War", content: "M.A.I.N. causes: Militarism, Alliances, Imperialism, Nationalism. Triggered by assassination of Archduke Franz Ferdinand.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l9b", title: "Trench Warfare", description: "Life and death in the trenches", content: "Stalemate on the Western Front. Conditions were horrific: mud, disease, and constant bombardment.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st7b", title: "World War II", lessons: [
        { id: "l9c", title: "Rise of Fascism", description: "How dictators came to power", content: "Economic depression, national humiliation, and weak democracies enabled Hitler, Mussolini, and others.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l9d", title: "The Holocaust", description: "Genocide and its legacy", content: "6 million Jews and millions of others systematically murdered. Never again.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l9e", title: "D-Day & The Pacific", description: "Turning points of WWII", content: "D-Day (June 6, 1944): Allied invasion of Normandy. Pacific: island-hopping campaign to Japan.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-hist2", subject: "history", title: "Ancient Civilizations", description: "Egypt, Greece, Rome, and Mesopotamia", gradeLevel: "9",
    subtopics: [
      { id: "st-anc1", title: "Ancient Egypt", lessons: [
        { id: "l-anc1", title: "Pharaohs & Pyramids", description: "Power, religion, and monumental architecture", content: "Pharaohs were god-kings. Pyramids built as tombs. Great Pyramid of Giza: 2.3 million stone blocks.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-anc2", title: "Hieroglyphics & the Nile", description: "Writing and the river that sustained civilization", content: "Hieroglyphics decoded via Rosetta Stone. The Nile's annual floods enabled agriculture.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-anc2", title: "Ancient Greece & Rome", lessons: [
        { id: "l-anc3", title: "Greek Democracy", description: "The birth of democratic government", content: "Athens developed direct democracy (~500 BCE). Only male citizens could vote. Foundations of Western democracy.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-anc4", title: "The Roman Empire", description: "From republic to empire", content: "Rome grew from city-state to empire. Innovations: roads, aqueducts, law, concrete architecture.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-hist3", subject: "history", title: "The Cold War", description: "Superpower rivalry and its global impact", gradeLevel: "11",
    subtopics: [
      { id: "st-cw1", title: "Origins & Key Events", lessons: [
        { id: "l-cw1", title: "Iron Curtain & NATO vs Warsaw Pact", description: "The division of the world", content: "Post-WWII: US vs USSR. NATO (West) vs Warsaw Pact (East). Nuclear arms race.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-cw2", title: "Cuban Missile Crisis", description: "13 days on the brink of nuclear war", content: "October 1962: Soviet missiles in Cuba. Kennedy's naval blockade. Closest to nuclear war.", type: "text", duration: "10 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-cw3", title: "Fall of the Berlin Wall", description: "The end of the Cold War", content: "November 9, 1989: Berlin Wall falls. Soviet Union dissolves in 1991. End of bipolar world order.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },

  // ═══════════════════ COMPUTER SCIENCE ═══════════════════
  {
    id: "t5", subject: "cs", title: "Intro to Programming", description: "Learn computational thinking", gradeLevel: "9",
    subtopics: [
      { id: "st6", title: "Programming Basics", lessons: [
        { id: "l8", title: "What is Programming?", description: "Understanding code and logic", content: "Programming is giving precise instructions to a computer. Key concepts: variables, loops, conditions, functions.", type: "text", duration: "6 min", xpReward: 20, completed: false, practiceQuestions: [] },
        { id: "l8b", title: "Variables & Data Types", description: "Storing and organizing data", content: "Variables hold values. Types: string, number, boolean, array. Choose the right type for your data.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st6b", title: "Control Flow", lessons: [
        { id: "l8c", title: "If/Else Statements", description: "Making decisions in code", content: "if (condition) { doThis } else { doThat }. Enables branching logic in programs.", type: "text", duration: "8 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l8d", title: "Loops", description: "Repeating actions efficiently", content: "for loops: repeat a known number of times. while loops: repeat until condition is false.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-cs2", subject: "cs", title: "Data Structures", description: "Organizing and managing data efficiently", gradeLevel: "11",
    subtopics: [
      { id: "st-ds1", title: "Linear Structures", lessons: [
        { id: "l-ds1", title: "Arrays & Linked Lists", description: "Sequential data storage", content: "Arrays: fixed-size, O(1) access. Linked Lists: dynamic, O(1) insert/delete at head.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-ds2", title: "Stacks & Queues", description: "LIFO and FIFO data structures", content: "Stack: last in, first out (undo, recursion). Queue: first in, first out (scheduling, BFS).", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-ds2", title: "Trees & Graphs", lessons: [
        { id: "l-ds3", title: "Binary Trees", description: "Hierarchical data organization", content: "Each node has at most 2 children. BST: left < parent < right. Enables O(log n) search.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-ds4", title: "Graph Basics", description: "Nodes, edges, and traversals", content: "Graphs model relationships. BFS explores level by level. DFS goes deep first.", type: "text", duration: "15 min", xpReward: 35, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-cs3", subject: "cs", title: "Web Development", description: "Building modern websites and apps", gradeLevel: "10",
    subtopics: [
      { id: "st-web1", title: "HTML & CSS", lessons: [
        { id: "l-web1", title: "HTML Structure", description: "The skeleton of every webpage", content: "HTML uses tags: <h1>, <p>, <div>, <img>, <a>. Semantic tags improve accessibility.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
        { id: "l-web2", title: "CSS Styling", description: "Making pages beautiful", content: "Selectors, properties, values. Box model: margin, border, padding, content. Flexbox for layout.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-web2", title: "JavaScript", lessons: [
        { id: "l-web3", title: "JS Fundamentals", description: "Adding interactivity to websites", content: "Variables (let, const), functions, DOM manipulation, event listeners, async/await.", type: "text", duration: "15 min", xpReward: 35, completed: false, practiceQuestions: [] },
      ]},
    ],
  },
  {
    id: "t-cs4", subject: "cs", title: "Algorithms", description: "Problem-solving strategies in computer science", gradeLevel: "11",
    subtopics: [
      { id: "st-algo1", title: "Sorting", lessons: [
        { id: "l-algo1", title: "Bubble, Selection & Insertion Sort", description: "Simple O(n²) sorting algorithms", content: "Bubble: swap adjacent. Selection: find min. Insertion: insert into sorted portion.", type: "text", duration: "12 min", xpReward: 30, completed: false, practiceQuestions: [] },
        { id: "l-algo2", title: "Merge Sort & Quick Sort", description: "Efficient O(n log n) sorting", content: "Merge sort: divide, sort halves, merge. Quick sort: pick pivot, partition, recurse.", type: "text", duration: "15 min", xpReward: 35, completed: false, practiceQuestions: [] },
      ]},
      { id: "st-algo2", title: "Searching", lessons: [
        { id: "l-algo3", title: "Linear & Binary Search", description: "Finding elements efficiently", content: "Linear: O(n), check each element. Binary: O(log n), requires sorted array, halve each step.", type: "text", duration: "10 min", xpReward: 25, completed: false, practiceQuestions: [] },
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

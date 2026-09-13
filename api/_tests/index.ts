import oir1 from "./oir-1.js";
import oir2 from "./oir-2.js";
import oir3 from "./oir-3.js";
import oir4 from "./oir-4.js";
import oir5 from "./oir-5.js";
import oir6 from "./oir-6.js";
import oir7 from "./oir-7.js";
import oir8 from "./oir-8.js";
import oir9 from "./oir-9.js";
import oir10 from "./oir-10.js";

export type Question = {
  q: string;
  image?: string;      // optional figure, e.g. "/assets/oir/1-q12.png"
  options: string[];
  answer: number;      // index into options
  explanation?: string;
};

export type Test = {
  id: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
};

// Add each new test file here. Order = order shown to students.
const tests: Test[] = [oir1, oir2, oir3, oir4, oir5, oir6, oir7, oir8, oir9, oir10];
export default tests;

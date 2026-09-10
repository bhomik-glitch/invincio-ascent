import oir1 from "./oir-1";
import oir2 from "./oir-2";
import oir3 from "./oir-3";
import oir4 from "./oir-4";
import oir5 from "./oir-5";
import oir6 from "./oir-6";
import oir7 from "./oir-7";
import oir8 from "./oir-8";
import oir9 from "./oir-9";
import oir10 from "./oir-10";

export type Question = {
  q: string;
  image?: string;      // optional figure, e.g. "/assets/oir/1-q12.png"
  options: string[];
  answer: number;      // index into options
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

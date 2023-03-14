type TLanguage = "JavaScript" | "Java" | "Python" | "PHP" | "CSS" | "cpp" | "Vue";
export interface ISquareCodePayload {
  title: string;
  lan: TLanguage;
  content: string;
  isPwd: boolean;
  link: string;
  pwd: string;
  status: 0 | 1;
}

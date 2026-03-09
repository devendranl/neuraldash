export interface ConceptCheck {
  question: string;
  options: string[];
  answer: number;
}

export interface VideoContent {
  videoUrl: string;
  summary: string;
  conceptChecks: ConceptCheck[];
}

export interface ReadingSection {
  heading: string;
  body: string;
}

export interface ReadingContent {
  sections: ReadingSection[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizContent {
  questions: QuizQuestion[];
}

export interface CodingContent {
  starterCode: string;
  instructions: string;
  externalUrl?: string;
}

export type ModuleContent =
  | VideoContent
  | ReadingContent
  | QuizContent
  | CodingContent;

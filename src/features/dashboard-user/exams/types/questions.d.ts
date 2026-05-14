export interface IQuestion<T = Question> {
  questions: T[];
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  text: string;
}
export interface FormValues {
  examId: string;
  answers: {
    questionId: string;
    answerId: string;
  }[];
}
export interface IExamResponse<T> {
  exam: T;
}
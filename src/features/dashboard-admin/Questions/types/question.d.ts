export interface IQuestionAdmin {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: IQuestionAnswer[];
  exam: Exam;
}

export interface QuestionApiResponse<T> {
  question: T;
}

export interface IQuestionAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}
export interface Exam {
  id: string;
  title: string;
}



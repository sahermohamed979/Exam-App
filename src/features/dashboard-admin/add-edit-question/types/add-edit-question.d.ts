export interface IAnswerResponse {
  id: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IaddQuestionApiRESP <T> {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: T[];
}

export interface IExamRef {
  id: string;
  title: string;
}

export interface IQuestionResponse {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  exam: IExamRef;          
  answers: IAnswerResponse[];
}
export interface IGetQuestionByIdResponse {
  question: IQuestionResponse;
}
export interface ISubmitExam<T> {
  message: string;
  submission: Submission;
  analytics: T[];
}

export interface Submission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: Exam;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: string;
  title: string;
  duration: number;
}

export interface IAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: {
    id: string;
    text: string;
  };
  isCorrect: boolean;
  correctAnswer: {
    id: string;
    text: string;
  };
}
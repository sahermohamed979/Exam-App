 export interface BulkAddResponse {
  message: string
  questions: BulkQuestionItem[]
  count: number
}

export interface BulkQuestionItem {
  id: string
  text: string
  examId: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  answers: Answer[]
  exam: Exam
}

export interface BulkAnswer {
  id: string
  text: string
  isCorrect: boolean
}

export interface BulkExam {
  id: string
  title: string
}

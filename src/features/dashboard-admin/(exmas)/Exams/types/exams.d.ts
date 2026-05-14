export interface IExam {
  id: string
  title: string
  description: string
  image: string
  duration: number
  questionsCount: number
  diplomaId: string
  diploma: Diploma
  immutable: boolean
  createdAt: string
  updatedAt: string
}
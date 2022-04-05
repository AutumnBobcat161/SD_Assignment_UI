import { UserLikeAnswer } from "./likeTypes"

export interface Answer {
    idAnswer: number,
    idUser: number,
    idQuestion: number,
    likeCount: number,
    text: string,
    creationDate: Date
}

export interface AnswerResponse {
    answer: Answer,
    userLikeAnswers: UserLikeAnswer[]
}
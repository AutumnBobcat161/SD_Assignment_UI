import { Answer } from "./answerTypes"
import { UserLikeQuestion } from "./likeTypes"

export interface Question {
    idQuestion: number,
    idUser: number,
    likeCount: number,
    title: string,
    text: string,
    creationDate: Date | undefined
}

export interface Tag {
    idTag: number,
    name: string
}

export interface QuestionRequest {
    question: Question,
    tags: Tag[]
    
}

export interface QuestionResponse {
    question: Question,
    tags: Tag[]
    userLikeQuestions: UserLikeQuestion[]
    answers: Answer[]
}
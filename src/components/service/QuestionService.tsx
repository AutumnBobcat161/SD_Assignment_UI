import { UserLikeQuestion } from "../types/likeTypes";
import { Question, QuestionRequest, QuestionResponse, Tag } from "../types/questionTypes";

export class QuestionService {
    
    public static alreadyLikedQuestion(idQuestion: number, item: QuestionResponse ) {
        const userLoggedInId = localStorage.getItem('userId')
        let user = undefined
        if(userLoggedInId !== null)
        {
            user = item.userLikeQuestions.find(like => like.type === 1 && like.idUser === parseInt(userLoggedInId) && like.idQuestion === idQuestion);
        }        
        return user !== undefined;
    }

    public static alreadyDislikedQuestion(idQuestion: number, item: QuestionResponse) {
        const userLoggedInId = localStorage.getItem('userId')
        let user = undefined
        if(userLoggedInId !== null)
        {
            user = item.userLikeQuestions.find(like => like.type === 0 && like.idUser === parseInt(userLoggedInId) && like.idQuestion === idQuestion);
        }
        return user !== undefined;
    }

    public static createEmptyQuestion() {
        const question: Question = {
            idQuestion: 0,
            idUser: 0,
            likeCount: 0,
            title: '',
            text: '',
            creationDate: undefined
        }
        return question
    }

    public static createEmptyQuestionResponse() {
        const question: QuestionResponse = {
            question: this.createEmptyQuestion(),
            userLikeQuestions: [],
            tags: [],
            answers: []
        }
        return  question
    }

    public static createEmptyQuestionRequest() {
        const question: QuestionRequest = {
            question: this.createEmptyQuestion(),
            tags: [],
        }
        return  question
    }


    public static createEmptyTag() {
        const tag: Tag = {
            idTag: 0,
            name: ''
        }
        return tag
    }

    public static createEmptyUserLikeQuestion() {
        const like: UserLikeQuestion = {
            idUserLike: 0,
            idUser: 0,
            type: 0,
            idQuestion: 0
        }
        return like
    }
}
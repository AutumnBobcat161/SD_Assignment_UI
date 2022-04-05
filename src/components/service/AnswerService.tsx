import { Answer, AnswerResponse } from "../types/answerTypes";
import { UserLikeAnswer } from "../types/likeTypes";

export class AnswerService {
    
    public static alreadyLikedAnswer(answer: AnswerResponse):boolean {
        const userLoggedInId = localStorage.getItem('userId');
        let user = undefined
        if(userLoggedInId !== null)
        {
            user = answer.userLikeAnswers.find(like => like.type === 1 && like.idUser === parseInt(userLoggedInId) && like.idAnswer === answer.answer.idAnswer);
        }       
        return user !== undefined;
    }

    public static alreadyDislikedAnswer(answer: AnswerResponse):boolean {
        const userLoggedInId = localStorage.getItem('userId');
        let user = undefined
        if(userLoggedInId !== null)
        {
            user = answer.userLikeAnswers.find(like => like.type === 0 && like.idUser === parseInt(userLoggedInId) && like.idAnswer === answer.answer.idAnswer);
        }
        return user !== undefined;
    }

    public static createEmptyUserLikeAnswer() {
        const like: UserLikeAnswer = {
            idUserLike: 0,
            idUser: 0,
            type: 0,
            idAnswer: 0
        }
        return like
    }

    public static createEmptyAnswer() {
        const anwser: Answer = {
            idAnswer: 0,
            idUser: 0,
            idQuestion: 0,
            likeCount: 0,
            text: '',
            creationDate: new Date()
        }
        return anwser
    }

    public static createEmptyAnswerResponse() {
        const answer: AnswerResponse = {
            answer: this.createEmptyAnswer(),
            userLikeAnswers: []
        }
        return answer
    }
}
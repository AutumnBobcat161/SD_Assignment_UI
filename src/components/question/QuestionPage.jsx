import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';

class QuestionPage extends Component {

    emptyAnswerLike = {
        idUser: 0,
        type: 0,
        idAnswer: 0
    }

    emptyQuestionLike = {
        idUser: 0,
        type: 0,
        idQuestion: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            item: undefined,
            users: [],
        };
    }

    async componentDidMount() {
        const question = await (await fetch(`/question/${this.props.match.params.id}`)).json();
        const users = await (await fetch(`/users/all`)).json();
        this.setState({item: question, users: users});
    }

    alreadyLikedAnswer(answer) {
        const userLoggedInId = localStorage.getItem('userId');
        const user = answer.userLikeAnswers.find(like => like.type === 1 && like.idUser === parseInt(userLoggedInId) && like.idAnswer === answer.answer.idAnswer);
        return user !== undefined;
    }

    alreadyDislikedAnswer(answer) {
        const userLoggedInId = localStorage.getItem('userId');
        const user = answer.userLikeAnswers.find(like => like.type === 0 && like.idUser === parseInt(userLoggedInId) && like.idAnswer === answer.answer.idAnswer);
        return user !== undefined;
    }

    alreadyLikedQuestion(idQuestion) {
        const{item} = this.state;
        const userLoggedInId = localStorage.getItem('userId')
        const user = item.userLikeQuestions.find(like => like.type === 1 && like.idUser === parseInt(userLoggedInId) && like.idQuestion === idQuestion);
        return user !== undefined;
    }

    alreadyDislikedQuestion(idQuestion) {
        const{item} = this.state;
        const userLoggedInId = localStorage.getItem('userId')
        const user = item.userLikeQuestions.find(like => like.type === 0 && like.idUser === parseInt(userLoggedInId) && like.idQuestion === idQuestion);
        return user !== undefined;
    }

    async handleAddLikeQuestion(idQuestion, type) {
        if(!((this.alreadyLikedQuestion(idQuestion) === true && type === 1)
         || (this.alreadyDislikedQuestion(idQuestion) === true && type === 0))) {
            const userId = localStorage.getItem('userId');
            let like = this.emptyQuestionLike;
            like.idUser = parseInt(userId);
            like.idQuestion = idQuestion;
            like.type = type;
            await fetch('/userLikeQuestion/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(like),
            });
        }
        window.location.reload(false);
    }

    async handleAddLikeAnswer(answer, type) {
        if(!((this.alreadyLikedAnswer(answer) === true && type === 1)
         || (this.alreadyDislikedAnswer(answer) === true && type === 0))) {
            const userId = localStorage.getItem('userId');
            let like = this.emptyAnswerLike;
            like.idUser = parseInt(userId);
            like.idAnswer = answer.answer.idAnswer;
            like.type = type;
            await fetch('/userLikeAnswer/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(like),
            });
        }
        window.location.reload(false);
    }

    async removeAnswer(idAnswer) {
        await fetch('/answer/delete/' + idAnswer, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        window.location.reload(false);
    }

    async removeQuestion(idQuestion) {
        await fetch('/question/delete/' + idQuestion, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        this.props.history.push('/question');
    }
  
    render() {
        const {item, users} = this.state;

        const userId = localStorage.getItem('userId')
        const roleId = localStorage.getItem('idRole')

        if(item !== undefined && users !== undefined) 
        {
            const questionTagList = item.tags;

            const displayTags = questionTagList.map(tag => {
                return <b> {tag.name + ' '} </b>;
            });

            const answersList = item.answers.map(answer => {

                let answerButtons;
                if(parseInt(userId) !== answer.answer.idUser && parseInt(roleId) === 2) 
                {
                    answerButtons =  <><Button onClick={() => this.handleAddLikeAnswer(answer, 1)} 
                                    style={{marginLeft: "5px", color: "green", background: "yellow"}}
                                    disabled={this.alreadyLikedAnswer(answer)}>Like</Button>

                                    <Button onClick={() => this.handleAddLikeAnswer(answer, 0)} 
                                    style={{marginLeft: "5px", color: "red", background: "pink"}}
                                    disabled={this.alreadyDislikedAnswer(answer)}>Dislike</Button></>
                } 
                else 
                {
                    answerButtons =  <><Button color="primary" style={{marginLeft: "5px"}} tag={Link}
                    to={'/answer/create/' + answer.answer.idAnswer + '/' + item.question.idQuestion}>Edit</Button>
                    <Button onClick={() => this.removeAnswer(answer.answer.idAnswer)} color="secondary" style={{marginLeft: "5px"}}>Delete</Button></>
                }
                const user = users.find(user => user.idUser === answer.answer.idUser);
                return <tr key={answer.idAnswer}>
                <td>
                    <div style={{borderStyle: "solid", marginTop: "2px"}}>
                        <p>User: <b>{user.username}</b> <u> <b>[ {user.score} ] </b> </u></p>
                        <p>Comment: {answer.answer.text}</p>
                        <p>Likes: {answer.answer.likeCount}</p>
                        <p>
                            Date: {answer.answer.creationDate} 
                            {answerButtons}
                        </p>
                    </div>
                </td>
            </tr>
            }); 

            let addButton = <></>;
            
            if(parseInt(roleId) === 2) 
            {
                addButton =<> <div>
                                <Button color="primary" tag={Link} to={"/answer/create/new/" + item.question.idQuestion}>Add answer</Button>
                            </div></> 
            } 

            let questionButtons;
            if(parseInt(userId) !== item.question.idUser && parseInt(roleId) === 2) 
            {
                questionButtons = <><Button onClick={() => this.handleAddLikeQuestion(item.question.idQuestion, 1)} 
                                    style={{marginLeft: "5px", color: "green", background: "yellow"}}
                                    disabled={this.alreadyLikedQuestion(item.question.idQuestion)}>Like</Button>

                                    <Button onClick={() => this.handleAddLikeQuestion(item.question.idQuestion, 0)} 
                                    style={{marginLeft: "5px", color: "red", background: "pink"}}
                                    disabled={this.alreadyDislikedQuestion(item.question.idQuestion)}>Dislike</Button></>
            } 
            else 
            {
                questionButtons =  <><Button color="primary" tag={Link} to={'/question/create/' + item.question.idQuestion}>Edit</Button>{' '}
                                    <Button onClick={() => this.removeQuestion(item.question.idQuestion)} color="secondary" style={{marginLeft: "5px"}}>Delete</Button></>
            }

            const userAuthor = users.find(user => user.idUser === item.question.idUser)
            let authorInfo = <></>
            if(userAuthor !== undefined) 
            {
                authorInfo = <h3>Author: <b>{userAuthor.username}</b> <u> <b>[ {userAuthor.score} ] </b> </u></h3>
            }
            return <div>
                <AppNavbar/>
                <Container>
                    <h2>Title: {item.question.title}</h2>
                    {authorInfo}
                    <h4>Text: {item.question.text}</h4>
                    <h5>Tags: {displayTags}</h5>
                    <h5>
                        Like count: {item.question.likeCount}

                        {questionButtons}
                    </h5>
                    <h1>Comments: </h1>
                    <table>
                    <tbody>
                        {answersList}
                    </tbody>
                    </table>
                    {addButton}
                    <div>
                        <Button style={{marginTop:"10px"}} className="button-right" color="secondary" tag={Link} to="/question">Go back</Button>
                    </div>
                </Container>
            </div>
        } else {
            return <></>
        }
    }
}

export default QuestionPage;
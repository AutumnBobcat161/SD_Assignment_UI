import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';

class QuestionEdit extends Component {

    emptyItem = {
        question: {
            idQuestion: 0,
            idUser: 0,
            title: '',
            text: '',
            creationDate: new Date()
        },
        tags: '',
    };

    emptyTag = {
        name: ''
    }

    emptyQuestionRequest = {
        question: '',
        tags: []
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const question = await (await fetch(`/question/${this.props.match.params.id}`)).json();
            question.tags = ''
            this.setState({item: question});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const field = target.id;

        let item = {...this.state.item};
        if(field === 'title')
        {
            item.question.title = value;
        }
        if(field === 'text')
        {
            item.question.text = value;
        }
        if(field === 'tags')
        {
            item.tags = value;
        }

        this.setState({item: item});
    }

async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    let questionRequest = this.emptyQuestionRequest;
    questionRequest.question = item.question;
    questionRequest.question.creationDate = new Date();
    const idRole = localStorage.getItem('idRole')
    const idUser = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    if(parseInt(idRole) === 2) 
    {
        questionRequest.question.idUser = parseInt(idUser)
    }
    else
    {
        questionRequest.question.text =  questionRequest.question.text + " [edited by moderator " + username  + "]"; 
    }
    questionRequest.tags = [];
    if(item.tags !== undefined && item.tags !== '') {
        questionRequest.tags = item.tags.split(',').map(tag => {
            return tag;
        })
        questionRequest.tags = questionRequest.tags.filter(tag => tag !== undefined);
    }
    await fetch('/question/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionRequest),
    });
    this.props.history.push('/question');
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.question.idQuestion ? 'Edit question' : 'Add question'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={item.question.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Text</Label>
                        <Input type="text" name="text" id="text" value={item.question.text || ''}
                               onChange={this.handleChange} autoComplete="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="taga">Tags (values separated by one single comma)</Label>
                        <Input type="text" name="tags" id="tags" value={item.tags || ''}
                               onChange={this.handleChange} autoComplete="tags"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/question">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(QuestionEdit);
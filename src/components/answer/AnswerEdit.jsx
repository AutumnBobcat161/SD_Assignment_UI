import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';

class AnswerEdit extends Component {

    emptyItem = {
        answer: {
        idAnswer: 0,
        idUser: 0,
        text: '',
        creationDate: new Date()
        }
    };

    emptyUser = {
        idUser: ''
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
            const answer = await (await fetch(`/answer/${this.props.match.params.id}`)).json();
            this.setState({item: answer});
        }
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const field = target.id;

        let item = {...this.state.item};
        if(field === 'text')
        {
            item.answer.text = value;
        }

        this.setState({item: item});
    }


async handleSubmit(event) {
    event.preventDefault();
    const {item,} = this.state;
    const username = localStorage.getItem('username')
    const idUser = localStorage.getItem('userId')
    const roleId = localStorage.getItem('idRole')
    if(roleId === '2') 
    {
        item.answer.idUser = parseInt(idUser)
    } 
    else
    {
        item.answer.text = item.answer.text + " [edited by moderator " + username + "]"; 
    }
    item.answer.idQuestion = this.props.match.params.idQuestion;

    await fetch('/answer/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item.answer),
    });
    this.props.history.push('/question/' + this.props.match.params.idQuestion);
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.answer.idAnswer ? 'Edit answer' : 'Add answer'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="text">Text</Label>
                        <Input type="text" name="text" id="text" value={item.answer.text || ''}
                               onChange={this.handleChange} autoComplete="text"/>
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

export default withRouter(AnswerEdit);
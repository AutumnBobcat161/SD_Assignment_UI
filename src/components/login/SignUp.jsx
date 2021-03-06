import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';
import validator from 'validator'
import { UserService } from '../service/UserService'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: UserService.createEmptyUser(),
            detailsWrong: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const field = target.id;

        let item = {...this.state.item};
        item[field] = value
        this.setState({item});
    }

async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    if(item.password === item.confirmPassword)
    {
        let user = UserService.createEmptyUser()
        if(!validator.isEmail(item.email) || item.username === '' || item.password === '')
        {
            this.setState({ detailsWrong: true })
        }
        else 
        {
            user.username = item.username;
            user.email = item.email;
            user.password = item.password;
            await fetch('/users/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            this.props.history.push('/login');
        }
    }
}

    render() {
        const {item, detailsWrong} = this.state;
        const title = <h2>{"Create account"}</h2>;

        let wrongInfo = <></>;    
        if(detailsWrong)
        {
            wrongInfo = <h3>Invalid email, username or password!</h3>
        }

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value={item.username || ''}
                               onChange={this.handleChange} autoComplete="username"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={item.password || ''}
                               onChange={this.handleChange} autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm password</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" value={item.confirmPassword || ''}
                               onChange={this.handleChange} autoComplete="confirmPassword"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/login">Cancel</Button>
                    </FormGroup>
                </Form>
                { wrongInfo }
            </Container>
        </div>
    }
}

export default withRouter(SignUp);
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';

class Login extends Component {

    emptyLoginRequest = {
        username: '',
        password: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            loginRequest: this.emptyLoginRequest,
            users: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const users = await (await fetch(`/users/all`)).json();

        this.setState({ users: users });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const field = target.id;

        let loginRequest = {...this.state.loginRequest};
        if(field === 'username')
        {
            loginRequest.username = value;
        }
        if(field === 'password')
        {
            loginRequest.password = value;
        }

        this.setState({loginRequest});
    }


async handleSubmit(event) {
    event.preventDefault();
    const {loginRequest, users} = this.state;

    const userLoggedIn = users.find(user => user.username === loginRequest.username)
    if(userLoggedIn !== undefined && userLoggedIn.banned === true) 
    {
        this.props.history.push('/banned');
    } 
    else
    {
        const response = await fetch(('/users/login'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest),
        });
        if(response.status === 200)
        {
                localStorage.setItem('username', loginRequest.username)
                localStorage.setItem('userId', userLoggedIn.idUser)
                localStorage.setItem('idRole', userLoggedIn.idRole)
                this.props.history.push('/question');
        }
        else
        {
            this.props.history.push('/loginError');
        }
    }
}

    render() {
        const {loginRequest} = this.state;
        const title = <h2>{'Login'}</h2>;
        
        const user = localStorage.getItem('username');
        if(user === null) {
            return <div>
                <AppNavbar/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" value={loginRequest.username || ''}
                                onChange={this.handleChange} autoComplete="username"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={loginRequest.password || ''}
                                onChange={this.handleChange} autoComplete="password"/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Login</Button>{' '}
                            <Button color="primary" tag={Link} to="/signup">Sign-up</Button>{' '}
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        } 
        return <div>
            <AppNavbar/>
            <Button style={{marginTop:"10px"}} color="success" tag={Link} to="/question">Questions</Button>
        </div>
    }
}

export default withRouter(Login);
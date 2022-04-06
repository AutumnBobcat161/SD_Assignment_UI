import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';
import { UserService } from '../service/UserService'

class ClientEdit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            item: UserService.createEmptyUser()
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
    if(item.confirmPassword === item.password) 
    {
        let user = UserService.createEmptyUser();
        user.username = item.username;
        user.email = item.email;
        user.password = item.password;
        user.idRole = item.idRole
        await fetch('/users/create', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
    }
    this.props.history.push('/users');
}

    render() {
        const {item} = this.state;
        const title = <h2>{'Add Client'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Username</Label>
                        <Input type="text" name="name" id="username" value={item.username || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="idRole">Role</Label>
                        <Input type="text" name="idRole" id="idRole" value={item.idRole || 2}
                               onChange={this.handleChange} autoComplete="idRole"/>
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
                        <Button color="secondary" tag={Link} to="/users">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ClientEdit);
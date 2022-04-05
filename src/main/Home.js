import React, { Component } from 'react';
import './css/App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="primary" tag={Link} to="/login" data-testid="app-test">Login</Button>
                </Container>
            </div>
        );
    }
}

export default Home;
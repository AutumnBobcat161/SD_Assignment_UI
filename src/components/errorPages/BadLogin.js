import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container,  Button } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';;

class BadLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div>
                        <h3>Bad login</h3>
                        <h5>Could not login, check your password and try again!</h5>
                        <Button color="secondary" tag={Link} to="/login">Go back to login page</Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default BadLogin
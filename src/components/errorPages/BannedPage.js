import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container,  Button } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';

class BannedPage extends Component {

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
                        <h3>Account banned</h3>
                        <h5><b>Because of several problems related to your activity on our site, your account was banned!</b></h5>
                        <Button color="secondary" tag={Link} to="/login">Go back to login page</Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default BannedPage
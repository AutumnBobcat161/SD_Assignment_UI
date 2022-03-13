import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';
import { Link } from 'react-router-dom';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        fetch('/users/all')
            .then(response => response.json())
            .then(data => this.setState({users: data}));
    }

    async ban(idUser) {
        await fetch('/admin/ban/' + idUser, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        window.location.reload(false);
    }

    async unban(idUser) {
        await fetch('/admin/unban/' + idUser, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        window.location.reload(false);
    }

    render() {
        const {users} = this.state;

        const clientList = users.map(client => {
            return <tr key={client.idUser}>
                <td style={{whiteSpace: 'nowrap'}}>{client.username}</td>
                <td>{client.email}</td>
                <td>{client.banned.toString()}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.ban(client.idUser)}>Ban</Button>
                        <Button size="sm" color="primary" onClick={() => this.unban(client.idUser)}>Unban</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/users/new">Add Client</Button>
                    </div>
                    <h3>users</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>                            
                            <th width="20%">Banned</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                    <div>
                        <Button style={{marginTop:"10px"}} className="button-right" color="secondary" tag={Link} to="/question">Go back</Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ClientList;
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Form, Table } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';
import { Link } from 'react-router-dom';

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {questions: []};
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    showModal = () => {
    this.setState({ show: true });
    };

    hideModal = () => {
    this.setState({ show: false });
    };

    async componentDidMount() {
        const questions = await (await fetch(`/question/all`)).json();
                this.setState({questions: questions});
    }

    handleLogout() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        const { questions } = this.state;

        const user = localStorage.getItem('userId');
        const idRole = localStorage.getItem('idRole');

        const questionList = questions.map(question => {
            
            const questionTagList = question.tags;
    
            const displayTags = questionTagList.map(tag => {
                return <b> {tag.name + ' '} </b>;
            });

            return <tr key={question.question.idQuestion}>
                <td style={{whiteSpace: 'nowrap'}}>{question.question.title}</td>
                <td>{displayTags}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/question/" + question.question.idQuestion}>See question</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        let addButton = <></>;
        
        if(user !== undefined && idRole === '2') 
        {
            addButton = <><Button color="primary" tag={Link} to="/question/create/new">Add question</Button>
                        <Button className="button-right" color="success" tag={Link} to="/question/search">Search</Button></>
        } 
        else
        {
            addButton = <><Button color="primary" tag={Link} to="/users">User list</Button></>
        }

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                       <h3>Questions</h3>
                       <div className="float-right">
                           {addButton}
                            <Form onSubmit={this.handleLogout}>
                                <Button style ={{marginTop: "10px"}} color="secondary" type="submit">Logout</Button>
                            </Form>
                        </div>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="40%">Title</th>
                            <th width="40%">Tags</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {questionList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default QuestionList;
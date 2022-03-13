import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import AppNavbar from '../../main/AppNavbar';

class SearchModal extends Component {

emptyTag = {
  idTag: 0,
  name: ''
}

emptySearchRequest = {
    title: '',
    tags: []
};

emptyItem = {
  title: '',
  tags: ''
}

constructor(props) {
    super(props);
    this.state = {
        item: this.emptyItem,
        questions: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

async componentDidMount() {
  const tags = await (await fetch(`/tag/all`)).json();
  this.setState({tags: tags});
}

handleChange(event) {
    const target = event.target;
    const value = target.value;
    const field = target.id;

    let item = {...this.state.item};
    if(field === 'title')
    {
        item.title = value;
    }
    if(field === 'tags')
    {
        item.tags = value;
    }

    this.setState({item});
}

async handleSubmit(event) {
  event.preventDefault();
  const {item, tags} = this.state;
  let searchRequest = this.emptySearchRequest
  searchRequest.title = item.title
  searchRequest.tags = item.tags.split(',').map(tag => {
    return tags.find(newTag => newTag.name === tag);
  })
  searchRequest.tags = searchRequest.tags.filter(tag => tag !== undefined);
  const questions = await (await fetch('/question/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchRequest),
    })).json();
  if(questions !== undefined) 
  {
    this.setState({questions: questions});
  }
}

render() {
    const { item, questions } = this.state;

    const title = <h2>{"Filter questions"}</h2>;

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
  
    return <div>
        <AppNavbar/>
        <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" value={item.title || ''}
                           onChange={this.handleChange} autoComplete="title"/>
                </FormGroup>
                <FormGroup>
                    <Label for="tags">Tags (values separated with only single comma)</Label>
                    <Input type="text" name="tags" id="tags" value={item.tags || ''}
                           onChange={this.handleChange} autoComplete="tags"/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Search</Button>{' '}
                    <Button color="secondary" tag={Link} to="/question">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
        <Container fluid>
          <div className="float-right">
              <h3>Questions</h3>
              <div className="float-right">
                  <Form onSubmit={this.handleLogout}>
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
  }
}

export default SearchModal
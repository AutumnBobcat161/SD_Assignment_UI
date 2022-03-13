import React, { Component } from 'react';
import './css/App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from '../components/client/ClientList';
import ClientEdit from '../components/client/ClientEdit';
import Login from "../components/login/Login";
import SignUp from '../components/login/SignUp';
import QuestionList from '../components/question/QuestionList';
import QuestionPage from '../components/question/QuestionPage';
import QuestionEdit from '../components/question/QuestionEdit';
import AnswerEdit from '../components/answer/AnswerEdit';
import BannedPage from '../components/errorPages/BannedPage';
import BadLogin from '../components/errorPages/BadLogin';
import SearchModal from '../components/search/SearchModal';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/users/new' exact={true} component={ClientEdit}/>
            <Route path='/users' exact={true} component={ClientList}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/question/create/:id' component={QuestionEdit}/>
            <Route path='/answer/create/:id/:idQuestion' component={AnswerEdit}/>
            <Route path='/question/search' component={SearchModal}/>
            <Route path='/question/:id' component={QuestionPage}/>
            <Route path='/question' component={QuestionList}/>
            <Route path='/banned' component={BannedPage}/>
            <Route path='/loginError' component={BadLogin}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
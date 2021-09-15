import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApplicationInitialization from './components/views/ApplicationInitialization';
import NotFound from './components/views/NotFound';
import FrontPage from './components/views/FrontPage';
import LoginPage from './components/views/LoginPage';
import ApplicationPage1 from './components/views/ApplicationPage1';
import React from 'react';
import ApplicationPage2 from './components/views/ApplicationPage2';
import ApplicationPage3 from './components/views/ApplicationPage3';
import ApplicationPage4 from './components/views/ApplicationPage4';
import ApplicationPage5 from './components/views/ApplicationPage5';
import ApplicationPage6 from './components/views/ApplicationPage6';
import Review from './components/views/ApplicationReview';
import logo from './logoWhite.png';

class App extends React.Component{

  render(){
    return (
      <BrowserRouter>
        <nav className="indigo darken-4">
          <div className="nav-wrapper">
            <a href="https://kihsr.ac.zm" className="brand-logo center"><img src={logo} width={100} alt="logo" /></a>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path='/' component={FrontPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/initialization' component={ApplicationInitialization} />
            <Route exact path='/page/1' component={ApplicationPage1} />
            <Route exact path='/page/2' component={ApplicationPage2} />
            <Route exact path='/page/3' component={ApplicationPage3} />
            <Route exact path='/page/4' component={ApplicationPage4} />
            <Route exact path='/page/5' component={ApplicationPage5} />
            <Route exact path='/page/6' component={ApplicationPage6} />
            <Route exact path='/review' component={Review} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApplicationInitialization from './components/views/ApplicationInitialization';
import NotFound from './components/views/NotFound';
import FrontPage from './components/views/FrontPage';
import LoginPage from './components/views/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path='/' component={FrontPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/initialization' component={ApplicationInitialization} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

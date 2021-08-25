import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.js';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Personal Information</span>
            <form>
              <div className="row">
                <div className="input-field col s12">
                  <input id="first_name" type="text" className="validate" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s12">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>
            </form>
          </div>
          <div className="card-action">
            <Link className="btn" to="/">Proceed</Link>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

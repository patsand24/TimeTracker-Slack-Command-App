import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserTable from './components/UserTable';
import ClockInTable from './components/ClockInTable';
import ClockOutTable from './components/ClockOutTable';
import Nav from './components/Nav';
import { 
  BrowserRouter as Router,
  Route, 
  Link
} from 'react-router-dom';

ReactDOM.render(
<Router>
  <div>
    <Nav />
    <Route path="/users" component={UserTable} />
    <Route path="/clock-ins" component={ClockInTable} />
    <Route path="/clock-outs" component={ClockOutTable} />
  </div>
</Router>, document.getElementById('root'));

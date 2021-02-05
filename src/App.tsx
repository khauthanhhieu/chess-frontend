import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './elements/PrivateRoute';
import {
  Route, BrowserRouter as Router,
} from 'react-router-dom';

import Blog from './components/Blog'
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return (
    <div>
      <Router>
        {/* <Header /> */}
        <hr />
        <div className="main-route-place">
          <PrivateRoute exact path="/" component={Blog} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/blog" component={Blog} />
        </div>
      </Router>
      <hr />
      <footer className="footer py-3 bg-dark text-white">
        <div className="container">
          <div className="col-sm">
            <h4>Footer</h4>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

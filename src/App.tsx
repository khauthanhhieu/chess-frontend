import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import PrivateRoute from './elements/PrivateRoute';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import Header from './elements/Header';

function App() {
  return (
    <div>
      <Router>
        <div className="main-route-place">
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Dashboard>
            <PrivateRoute path='*' component={Header} />
          </Dashboard>
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover />
    </div>
  );
}

export default App;

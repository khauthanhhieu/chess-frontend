import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { Header, PrivateRoute, OnlyGuestRoute } from './elements';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

import { ToastContainer } from 'react-toastify';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/js/bootstrap.js';

function App() {
  return (
    <div>
      <Router>
        <div className="fullscreen">
          <OnlyGuestRoute path="/login" component={Login}/>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Dashboard>
            <PrivateRoute path='*' component={Header} />
          </Dashboard>
        </div>
      </Router>
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

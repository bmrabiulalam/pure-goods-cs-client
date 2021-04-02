import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Header from "./components/Header/Header";
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Orders from "./components/Orders/Orders";
import CheckOut from './components/CheckOut/CheckOut';
import Admin from './components/Admin/Admin';

export const UserContext = createContext();
export const CheckOutProductContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [checkOutProduct, setCheckOutProduct] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <CheckOutProductContext.Provider value={[checkOutProduct, setCheckOutProduct]}>
        <div className="App">
          <Router>
                <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
              <PrivateRoute path="/checkout">
                <CheckOut />
              </PrivateRoute>
              <PrivateRoute path="/admin">
                <Admin />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </div>
      </CheckOutProductContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

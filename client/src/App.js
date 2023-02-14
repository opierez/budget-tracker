import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';


function App() {

  const [user, setUser] = useState({})
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    // auto-login
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          console.log(user)
          setUser(user)
          setBudget(user.budget)
        })
      } 
    })
  }, [])

  
  const handleLoginUser = (user) => {
      console.log(user)
      setUser(user)
      setBudget(user.budget)
  }

  if(!user) return <Login handleLoginUser={handleLoginUser}/>

  return (
    <div className="container">
      <NavBar user={user} handleLoginUser={handleLoginUser}/>
      
        <Switch>

          {/* /users/new => Signup Page */}
          <Route path='/users/new'>
            <SignupForm handleLoginUser={handleLoginUser}/>
          </Route>

          {/* /login => Login Page */}
          <Route path='/login'>
            <Login handleLoginUser={handleLoginUser}/>
          </Route>

          {/* /users/:id => User Profile Page */}
          <Route path='/users/:id'>
            <ProfilePage />
          </Route>

          {/* / => Home Page, Root Route */}
          <Route exact path='/'>
            <Home budget={budget}/>
          </Route>

        </Switch>
    
    </div>
  );
}

export default App;

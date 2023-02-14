import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import NavBar from './components/NavBar';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';


function App() {
  const [budget, setBudget] = useState(0)
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState(null)
  const [categories, setCategories] = useState({})


  useEffect(() => {
    // auto-login
    fetch('/authorized_user')
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          console.log(user)
          setUser(user)
          setBudget(user.budget)
        })
      } else {
          res.json().then(data => setErrors(data.error))
      }
    })
  }, [])

  // useEffect(() => {
  //   fetch('/categories')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])

  
  const updateUser = (user) => {
      // console.log(user)
      setUser(user)
      if (user) 
        setBudget(user.budget)
  }


  if(!user) return (
   <>
  <NavBar updateUser={updateUser}/>
  <Login updateUser={updateUser}/>
  </> 
  )

  if(errors) return <h1>{errors}</h1>

  return (
    <div className="container">
      <NavBar user={user} updateUser={updateUser}/>
      
        <Switch>

          {/* /users/new => Signup Page */}
          <Route path='/users/new'>
            <SignupForm updateUser={updateUser}/>
          </Route>

          {/* /login => Login Page */}
          <Route path='/login'>
            <Login updateUser={updateUser}/>
          </Route>

          {/* /users/:id => User Profile Page */}
          <Route path='/users/:id'>
            <ProfilePage user={user}/>
          </Route>

          {/* / => Home Page, Root Route */}
          <Route exact path='/'>
            <Home user={user} budget={budget}/>
          </Route>

        </Switch>
    
    </div>
  );
}

export default App;

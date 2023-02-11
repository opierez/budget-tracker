import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Budget from './components/Budget';
import NavBar from './components/NavBar';
import Remaining from './components/Remaining'
import AmountSpent from './components/AmountSpent';
import ExpenseList from './components/ExpenseList';

function App() {
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [spent, setSpent] = useState(0);

  return (
    <div className="container">
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>

          {/* / => Home Page, Root Route */}
          <Route path="/">
            <h1 className='mt-3'>My Budget Planner</h1>
            <div className='row mt-3'>
              <div className='col-sm'>
                <Budget />
              </div>
              <div className='col-sm'>
                <Remaining />
              </div>
              <div className='col-sm'>
                <AmountSpent />
              </div>
            </div>
            <h3 className='mt-3'>Expenses</h3>
            <div className='row mt-3'>
              <div className='col-sm mb-5'>
                <ExpenseList />
              </div>
            </div>
          </Route>

        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;

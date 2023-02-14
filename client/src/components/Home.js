import React, {useState, useEffect } from "react";
import ExpenseList from "./ExpenseList";

function Home({ user, budget }) {
    // const [budget, setBudget] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [spent, setSpent] = useState(0);
    const [expenses, setExpenses] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`/expenses/${user.id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(expenses => {
                    console.log(expenses)
                    setExpenses(expenses)
              })
                } else {
                    res.json().then(data => setErrors(data.error))
                }
            })
            .finally(() => setLoading(false));
    }, [user])

    const updateExpenses = (newExpense) => {
        setExpenses([...expenses, newExpense])
    }

    return (
        <>
        <h1 className='mt-3'>My Budget Planner</h1>
            <div className='row mt-3'>
              <div className='col-sm'>
                <div className='alert alert-secondary'>
                    <span>Budget: ${budget}</span>
                </div>
              </div>
              <div className='col-sm'>
                <div className="alert alert-success">
                    <span>Remaining: $1200</span>
                </div>
              </div>
              <div className='col-sm'>
                <div className="alert alert-primary">
                    <span>Amount spent: $200</span>
                 </div>
              </div>
            </div>
            <h3 className='mt-3'>Expenses</h3>
            <div className='row mt-3'>
              <div className='col-sm mb-5'>
                <ExpenseList user={user} expenses={expenses} loading={loading} updateExpenses={updateExpenses}/>
              </div>
            </div>
            </>
    )
}

export default Home 
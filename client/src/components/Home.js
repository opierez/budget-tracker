import React, {useState, useEffect } from "react";
import ExpenseList from "./ExpenseList";

function Home({ user, budget }) {
    // const [budget, setBudget] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [spent, setSpent] = useState(0);
    const [expenses, setExpenses] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)
    const [totalExpenses, setTotalExpenses] = useState(0)

    // fetch user's expenses 
    useEffect(() => {
        setLoading(true)
        fetch(`/expenses/${user.id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(expenses => {
                    // console.log(expenses)
                    setExpenses(expenses)
                    calcAmountSpent(expenses)
                    // console.log(spent)
                    // calcAmountRemaining()
              })
                } else {
                    res.json().then(data => setErrors(data.error))
                }
            })
            .finally(() => setLoading(false))
    }, [user])

    const updateExpenses = (expense) => {
        let updatedExpenses
        const existingExpense = expenses.find(e => e.id === expense.id)
        if (existingExpense) {
          // Update the existing expense
          updatedExpenses = expenses.map(e => {
            if (e.id === expense.id) {
              return expense
            }
            return e
          });
        } else {
          // Add the new expense
          updatedExpenses = [...expenses, expense]
        }
        setExpenses(updatedExpenses)
        calcAmountSpent(updatedExpenses)
        // calcAmountRemaining()
    }
      

    const calcAmountSpent = (expenses) => {
        let total = 0
        expenses.map(expense => {
            // console.log(expense.cost)
            total += expense.cost 
            
        })
        setSpent(total)
        calcAmountRemaining(total)
    }

    const calcAmountRemaining = (spentAmount) => {
        let amountRemaining = budget - spentAmount 
        setRemaining(amountRemaining)
    }

    const updateAmountSpent = (expenseId, cost) => {
        // find the expense with the specified ID
        const expenseToUpdate = expenses.find(expense => expense.id === expenseId);
      
        // if it's NOT an existing expense being updated, run this code 
        if (!expenseToUpdate) {
            let updateSpent = spent + cost // create a new value that adds the current spent value with the new expense cost
            let updateRemaining = budget - updateSpent // create a new value that subtracts the updated spent amount from the budget
            setSpent(updateSpent) // update spent amount to the new updated spent value
            setRemaining(updateRemaining) // update remaining amount to the new remaining value

        // if it IS an existing expense being updated, run this code    
        } else {
            let value = Math.sign(cost - expenseToUpdate.cost)
            if (value === -1) {
              const costDifference = expenseToUpdate.cost - cost
              let updateSpent = spent - costDifference 
              let updateRemaining = remaining + costDifference
              setSpent(updateSpent)
              setRemaining(updateRemaining) 
            } else if (value === 1) {
              const costDifference = cost - expenseToUpdate.cost
              let updateSpent = spent + costDifference 
              let updateRemaining = remaining - costDifference
              setSpent(updateSpent)
              setRemaining(updateRemaining)
            }
        }
        
      }
      

    const handleDeletedExpense = (id) => {
        // find the deleted expense from the expenses array and set it to the deletedExpense variable
        const deletedExpense = expenses.find(expense => expense.id === id)

        if (deletedExpense) {
            // filter the expenses array for all the expenses that don't match the deleted expense id and update expense state
            const updatedExpenses = expenses.filter(expense => expense.id !== id)
            setExpenses(updatedExpenses)
            
            // subtract the deleted expense cost from the spent value and update the spent state
            const updatedSpent = spent - deletedExpense.cost
            setSpent(updatedSpent)

            // subtract the updated spent value from the budget to get the updated remaining value and update the remaining state
            const updatedRemaining = budget - updatedSpent
            setRemaining(updatedRemaining)

        }
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
                    <span>Remaining: ${remaining}</span>
                </div>
              </div>
              <div className='col-sm'>
                <div className="alert alert-primary">
                    <span>Amount spent: ${spent}</span>
                 </div>
              </div>
            </div>
            <h3 className='mt-3'>Expenses</h3>
            <div className='row mt-3'>
              <div className='col-sm mb-5'>
                <ExpenseList 
                    user={user} 
                    expenses={expenses} 
                    loading={loading} 
                    updateExpenses={updateExpenses}
                    updateAmountSpent={updateAmountSpent}
                    handleDeletedExpense={handleDeletedExpense}
                    />
              </div>
            </div>
            </>
    )
}

export default Home 
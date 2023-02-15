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
        calcAmountRemaining()
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

    // const updateAmountSpent = (expenseId, cost) => {
    //     // console.log(spent)
    //     // let newExpenseCost = newExpense.cost 
    //     let updateSpent = spent + cost 
    //     let updateRemaining = budget - updateSpent
    //     setSpent(updateSpent)
    //     setRemaining(updateRemaining)
    // }

    const updateAmountSpent = (expenseId, cost) => {
        // find the expense with the specified ID
        const expenseToUpdate = expenses.find(expense => expense.id === expenseId);
      
        if (!expenseToUpdate) {
            let updateSpent = spent + cost 
            let updateRemaining = budget - updateSpent
            setSpent(updateSpent)
            setRemaining(updateRemaining)
        } else {
            // Expense with the specified ID exists, so update its cost
            const costDifference = Math.abs(cost - expenseToUpdate.cost);
            expenseToUpdate.cost = cost;
            
            const updatedSpent = spent + costDifference;
            const updatedRemaining = budget - updatedSpent;
            
            setSpent(updatedSpent);
            setRemaining(updatedRemaining);
        }
        // // calculate the difference between the old and new expense costs
        // const costDifference = Math.abs(cost - expenseToUpdate.cost);
      
        // // update the expense with the new cost
        // expenseToUpdate.cost = cost;
      
        // // update the spent and remaining amounts
        // const updatedSpent = spent + costDifference;
        // const updatedRemaining = budget - updatedSpent;
      
        // setSpent(updatedSpent);
        // setRemaining(updatedRemaining);
      }
      

    const handleDeletedExpense = (id) => {
        // find the deleted expense from the expenses array and set it to the deletedExpense variable
        const deletedExpense = expenses.find(expense => expense.id === id)
        console.log(deletedExpense)
        console.log(deletedExpense.cost)
        console.log(deletedExpense.id)
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
        // setExpenses(expenses.filter(expense => expense.id !== id))
        
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
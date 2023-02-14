import React, { useEffect, useState } from 'react'
import ExpenseItem from './ExpenseItem'
import { AiFillPlusCircle } from 'react-icons/ai'
import AddExpenseForm from './AddExpenseForm'



function ExpenseList({ user, expenses, updateExpenses, loading }) {
    // console.log(user.id)

    // const [expenses, setExpenses] = useState([])
    // const [errors, setErrors] = useState(null)
    // const [loading, setLoading] = useState(true)

    // state for rendering the form
    const [showForm, setShowForm] = useState(false);

    // const expenses = [
    //     { id: 1213123, name: "Shopping", cost: 50, category: "Recreational spending" },
    //     { id: 1213124, name: "Holiday", cost: 300, category: "Vacation"},
    //     { id: 12131859, name: "MTA card", cost: 32, category: "Transportation"},
    //     { id: 121312993, name: "Internet", cost: 40, category: "Utilities"},
    //     { id: 1213123434, name: "Rent", cost: 1050, category: "Housing"},
    // ]

    // useEffect(() => {
    //     setLoading(true)
    //     fetch(`/expenses/${user.id}`)
    //         .then(res => {
    //             if (res.ok) {
    //                 res.json().then(expenses => {
    //                 console.log(expenses)
    //                 setExpenses(expenses)
    //           })
    //             } else {
    //                 res.json().then(data => setErrors(data.error))
    //             }
    //         })
    //         .finally(() => setLoading(false));
    // }, [user])

    // const handleExpenses = (newExpense) => {
    //    setExpenses([...expenses, newExpense])
    // }

    const handleExpenses = (newExpense) => {
        updateExpenses(newExpense)
    }

    const renderExpenses = () => {
        if (loading) {
            return <p>Loading expenses...</p>
        }

        if (expenses.length === 0) {
            return <p>No expenses added yet</p>
        }

        return expenses.map((expense) => (
            <ExpenseItem 
                key={expense.id}
                name={expense.name}
                cost={expense.cost}
                category={expense.category}
            />
        ));

    }

    return(
        <>
        <div className="d-flex justify-content-between">
            <AiFillPlusCircle size="3em" onClick={() => setShowForm(!showForm)} />
        </div>
        {showForm && <AddExpenseForm user={user} handleExpenses={handleExpenses}/>}
        <ul className='list-group mt-3'>
            {renderExpenses()}
        </ul>
        </>
    )
}

export default ExpenseList 
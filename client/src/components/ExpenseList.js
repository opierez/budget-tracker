import React, { useEffect, useState } from 'react'
import ExpenseItem from './ExpenseItem'
import { AiFillPlusCircle } from 'react-icons/ai'
import AddExpenseForm from './AddExpenseForm'



function ExpenseList({ user, expenses, updateExpenses, loading, updateAmountSpent, handleDeletedExpense }) {
    // console.log(user.id)
    // console.log(expenses.category)

    // state for rendering the form
    const [showForm, setShowForm] = useState(false);
    // state for the expense item that is being edited
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleSelectedExpense = (expense) => {
        setSelectedExpense(expense)
    }

    const handleShowForm = () => {
        setShowForm(!showForm)
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
                expense={expense}
                // id={expense.id}
                // name={expense.name}
                // cost={expense.cost}
                category={expense.category.category}
                handleDeletedExpense={handleDeletedExpense}
                handleSelectedExpense={handleSelectedExpense}
                handleShowForm={handleShowForm}

            />
        ));

    }

    return(
        <>
        <div className="d-flex justify-content-between">
            <AiFillPlusCircle size="3em" onClick={() => handleShowForm()} />
        </div>
        {showForm && <AddExpenseForm 
                        user={user} 
                        // handleExpenses={handleExpenses}
                        updateExpenses={updateExpenses} 
                        updateAmountSpent={updateAmountSpent}
                        selectedExpense={selectedExpense}
                        handleSelectedExpense={handleSelectedExpense}
                        handleShowForm={handleShowForm}
                        />}
        <ul className='list-group mt-3'>
            {renderExpenses()}
        </ul>
        </>
    )
}

export default ExpenseList 
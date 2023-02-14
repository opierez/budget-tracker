import React, { useState } from 'react'
import ExpenseItem from './ExpenseItem'
import { AiFillPlusCircle } from 'react-icons/ai'
import AddExpenseForm from './AddExpenseForm'



function ExpenseList() {
    const expenses = [
        { id: 1213123, name: "Shopping", cost: 50, category: "Recreational spending" },
        { id: 1213124, name: "Holiday", cost: 300, category: "Vacation"},
        { id: 12131859, name: "MTA card", cost: 32, category: "Transportation"},
        { id: 121312993, name: "Internet", cost: 40, category: "Utilities"},
        { id: 1213123434, name: "Rent", cost: 1050, category: "Housing"},
    ]

    // state for rendering the form
    const [showForm, setShowForm] = useState(false);

    return(
        <>
        <div className="d-flex justify-content-between">
            {/* add new expense button  */}
            <AiFillPlusCircle size="3em" onClick={() => setShowForm(!showForm)} />
        </div>
        {/* conditionally render the AddExpenseForm when user clicks on the "+" icon */}
        {showForm && <AddExpenseForm />}
        <ul className='list-group mt-3'>
            {expenses.map((expense) => (
                <ExpenseItem 
                    key={expense.id}
                    // id={expense.id}
                    name={expense.name}
                    cost={expense.cost}
                    category={expense.category}/>
            ))}
        </ul>
        </>
    )
}

export default ExpenseList 
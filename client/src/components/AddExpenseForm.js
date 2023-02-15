import React, { useState, useEffect } from "react";

function AddExpenseForm({ user, updateExpenses, updateAmountSpent, selectedExpense, handleSelectedExpense, handleShowForm }) {

    const [isEditing, setIsEditing] = useState(false)
    const [selectedExpenseId, setSelectedExpenseId] = useState(null)

    const [expenseData, setExpenseData] = useState({
        id: user.id,
        name: "",
        cost: 0,
        category: ""
    })

    const [errors, setErrors] = useState([])

    

    useEffect(() => {
        if (selectedExpense) {
          setExpenseData(selectedExpense)
          setIsEditing(true)
          setSelectedExpenseId(selectedExpense.id)
        }
      }, [selectedExpense])

    const handleChange = (e) => {
        setExpenseData({...expenseData, [e.target.name]: e.target.value})
    }
  

    const handleSubmit = (e) => {
        e.preventDefault();

        const expense = { ...expenseData}


        const method = isEditing ? "PATCH" : "POST"
        const path = isEditing ? `/expenses/${selectedExpenseId}` : '/expenses'

        fetch(path, {
            method: method, 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expense),
        })
        .then((res) => {
            if (res.ok) {
              res.json().then((expense) => {
                console.log(expense)
                updateExpenses(expense)
                updateAmountSpent(expense.id, expense.cost)
              });
            } else {
              res.json().then(json => {
                //   console.log(json.errors)
                  setErrors(json.errors)
              })
            }
          });

        setExpenseData({ id: user.id, name: "", cost: 0, category: "" })

    }

    const handleCancel = () => {
        handleSelectedExpense(null)
        setExpenseData({ id: user.id, name: "", cost: 0, category: "" })
        setIsEditing(false)
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-sm">
                    <label htmlFor="name">Expense Name:</label>
                    <input 
                        type="text" 
                        className="form-control"  
                        name="name" 
                        value={expenseData.name} 
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm">
                    <label htmlFor="cost">Cost:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="cost"
                        value={expenseData.cost} 
                        onChange={handleChange}
                        placeholder="Enter a number"
                    />
                </div>
                <div className="col-sm">
                    <label htmlFor="category">Category:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="category" 
                        value={expenseData.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={() => { handleCancel(); handleShowForm(); }}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>
        {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
        </div>
    )
}

export default AddExpenseForm
import React, { useState } from "react";

function AddExpenseForm({ user, handleExpenses }) {
    
    const [expenseData, setExpenseData] = useState({
        id: user.id,
        name: "",
        cost: 0,
        category: ""
    })

    const [errors, setErrors] = useState([])

    const handleChange = (event) => {
        setExpenseData({...expenseData, [event.target.name]: event.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add code to handle the submitted form data
        console.log(expenseData);

        const expense = { ...expenseData};

        fetch('/expenses', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expense),
        }).then((res) => {
            if (res.ok) {
              res.json().then((newExpense) => {
                console.log(newExpense)
                handleExpenses(newExpense);
              });
            } else {
              res.json().then(json => {
                  console.log(json.errors)
                  setErrors(json.errors)
              })
            }
          });
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
                </div>
            </div>
        </form>
        {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
        </div>
    )
}

export default AddExpenseForm
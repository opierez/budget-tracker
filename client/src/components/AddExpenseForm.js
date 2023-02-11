import React, { useState } from "react";

function AddExpenseForm() {
    const [expense, setExpense] = useState({
        name: "",
        cost: "",
        category: ""
    })

    const handleChange = (event) => {
        setExpense({...expense, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to handle the submitted form data
        console.log(expense);
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-sm">
                    <label for="name">Expense Name:</label>
                    <input 
                        type="text" 
                        className="form-control"  
                        name="name" 
                        value={expense.name} 
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm">
                    <label for="cost">Cost:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="cost" 
                        value={expense.cost} 
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm">
                    <label for="category">Category:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="category" 
                        value={expense.category}
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
    )
}

export default AddExpenseForm
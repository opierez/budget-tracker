import React, { useState, useEffect } from "react";

function AddExpenseForm({ user, updateExpenses, selectedExpense, handleSelectedExpense, handleShowForm }) {

    const [isEditing, setIsEditing] = useState(false)
    const [selectedExpenseId, setSelectedExpenseId] = useState(null)
    const [errors, setErrors] = useState([])
    const [categories, setCategories] = useState([])
    const [showCustomInput, setShowCustomInput] = useState(false)
    const [customCategory, setCustomCategory] = useState('')

    const [expenseForm, setExpenseForm] = useState({
        id: user.id,
        name: "",
        cost: 0,
        category: ""
    })    

   
    useEffect(() => {
        if (selectedExpense) { // if there's an expense item being edited: 
            setExpenseForm(selectedExpense) // update the expense form data with the selected expense data
            setIsEditing(true) // set isEditing state to true which will be used in the handleSubmit function to set the fetch method to PATCH  
            setSelectedExpenseId(selectedExpense.id) // set the selectedExpenseId to the id of the expense that's being edited which will be used in the handleSubmit function to set the fetch path  
        }
    }, [selectedExpense])


    // fetch all of the fixed categories to render category options to the user when adding an expense
    useEffect(() => {
        fetch('/categories')
            .then(res => res.json())
            .then(categoryData => {
                // console.log(categoryData)
                setCategories(categoryData)
            })
    }, [])

    // updates the expenseForm data with the user's input values
    const handleChange = (e) => {
        setExpenseForm({...expenseForm, [e.target.name]: e.target.value})
    }

    // handles the user's category selection
    const handleCategoryChange = (e) => {
        // console.log(e.target.value)
        const selectedCategory = e.target.value 
        if (selectedCategory === 'custom') { // if the user selects the custom category, show the custom category input field 
            setShowCustomInput(true)
        } else { 
            setShowCustomInput(false) // hide the custom input field
            setExpenseForm({...expenseForm, category: selectedCategory}) // update the expenseForm category with the non-custom category the user selected
        }
    }

    // updates the customCategory state with the user's input in the custom category field
    const handleCustomCategory = (e) => {
        // console.log(e.target.value)
        setCustomCategory(e.target.value)
    }
  
    // if the user has selected a custom category and input a custom category upon submit, customCategory will be the user's custom category value
    // if the user hasn't selected a custom category and input a custom category upon submit, customCategory will be the fixed category the user selected which is stored in the expenseForm state
    const handleSubmit = (e, customCategory) => {
        e.preventDefault();
        // debugger
        const expense = { ...expenseForm, category: customCategory || expenseForm.category}
        // debugger

        const method = isEditing ? "PATCH" : "POST" // if the user is submitting an expense that has been edited, the method will be a PATCH request, otherwise if it's a new expense, method will be a POST request 
        // debugger
        const path = isEditing ? `/expenses/${selectedExpenseId}` : '/expenses' // if the user is submitting an expense that has been edited, the path will include the existing expense's ID
        // debugger 

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
                updateExpenses(expense) //cb function to update expenses with new or existing expense data
                // checks to see if the returned expense item that was submitted was an existing item and if the item cost has changed. invoke the cb function to update the spent amount 
                // if (selectedExpense && expense.cost !== selectedExpense.cost) { 
                //     updateAmountSpent(expense.id, expense.cost)
                // }
                setExpenseForm({ id: user.id, name: "", cost: 0, category: "" }) // reset the form data to its initial state
                handleSelectedExpense(null); // cb function that resets the selectedExpense state to null, meaning the user is no longer editing an expense item
                handleShowForm() // hide the add/edit expense form after submission
              });
            } else {
              res.json().then(json => {
                //   console.log(json.errors)
                  setErrors(json.errors) 
              })
            }
          });
    }

    // handles the Cancel option in the add/edit expense form 
    const handleCancel = () => {
        handleSelectedExpense(null) // cb function that resets the selectedExpense state to null, meaning the user is no longer editing an expense item
        setExpenseForm({ id: user.id, name: "", cost: 0, category: "" }) // resets the expense form data 
        setIsEditing(false) // resets the isEditing state meaning the user is not editing an expense
    }

    return(
        <div>
        {/* on submit, check to see if showCustomInput and customCategory evaluates to true or false */}
        <form onSubmit={(e) => handleSubmit(e, showCustomInput && customCategory)}> 
            <div className="row">
                <div className="col-sm">
                    <label htmlFor="name">Expense Name:</label>
                    <input 
                        type="text" 
                        className="form-control"  
                        name="name" 
                        value={expenseForm.name} 
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm">
                    <label htmlFor="cost">Cost:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="cost"
                        value={expenseForm.cost} 
                        onChange={handleChange}
                        placeholder="Enter a number"
                    />
                </div>
                <div className="col-sm">
                    <select className="form-select" value={expenseForm.category} onChange={(e) => handleCategoryChange(e)}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.category}>
                                {category.category}
                            </option>
                        ))}
                        <option value="custom">Custom</option>
                    </select>
                </div>
                {showCustomInput && (
                    <div className="col-sm">
                        <label htmlFor="custom-category">Custom Category:</label>
                        <input 
                            type="text"
                            className="form-control" 
                            value={customCategory}
                            onChange={handleCustomCategory}
                        />
                    </div>
                )}
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
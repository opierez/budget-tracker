import React, {useState} from "react";
import { TiDelete } from 'react-icons/ti'
import { AiFillEdit } from 'react-icons/ai'

function ExpenseItem({ expense, category, handleDeletedExpense, handleSelectedExpense, handleShowForm }) {
    // console.log(typeof cost)
    // console.log(id)
    // console.log(category)
    const { id, name, cost } = expense
    
    const [errors, setErrors] = useState([])

    const handleDelete = () => {
        fetch(`/expenses/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if (res.ok) {
                handleDeletedExpense(id)
                console.log(id)
            } else {
                res.json().then(json => {
                    console.log(json.errors)
                    setErrors(json.errors)
                })
            }
        })
        
    }

    return(
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {name}
            <div>
                <span className="badge badge-primary badge-pill mr-3" style={{ color: 'black' }}>
                    ${cost}
                </span>
                <AiFillEdit size='1.2em' title='Edit' onClick={() => { handleSelectedExpense({ id, name, cost, category }); handleShowForm(); }}></AiFillEdit>
                <TiDelete size='1.5em' title='Delete' onClick={handleDelete}></TiDelete>
            </div>
            {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
        </li>
    )
}

export default ExpenseItem
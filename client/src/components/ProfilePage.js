import React, {useState, useEffect} from "react";
import '../styles/ProfilePage.css'

function ProfilePage({ user, updateUser }) {

    const { id, first_name, last_name, username, city, state, postal_code, budget } = user 

    // state checking if user is editing their profile info
    const [isEditing, setIsEditing] = useState(false)
    const [errors, setErrors] = useState([])

    // state for keeping track of user's profile info
    const [userInfo, setUserInfo] = useState({
        username: '', 
        first_name: '', 
        last_name: '', 
        city: '',
        state: '', 
        postal_code: '', 
        budget: '' 
    })

    // waits for the user prop to be passed down and then updates the userInfo state with the user's info
    useEffect(() => {
        if (user) {
            setUserInfo({
                username: user.username, 
                first_name: user.first_name, 
                last_name: user.last_name, 
                city: user.city,
                state: user.state, 
                postal_code: user.postal_code, 
                budget: user.budget 
            })
        }
    }, [user])

    // when user selects edit button, update the editing state 
    const handleEditClick = () => {
        setIsEditing(true)
    }

    // updates the user's info with their input 
    const handleChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        let name = e.target.name
        let value = e.target.value 

        setUserInfo({...userInfo, [name]: value})
    }

    // submits user's changes to their profile info 
    function handleSubmit(e) {
        e.preventDefault()
        // console.log(userInfo)
        // console.log(id)

        fetch(`/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo), 
        }).then(res => {
            if(res.ok) {
                res.json().then(updatedUser => {
                    console.log(updatedUser)
                    updateUser(updatedUser) // cb function to update user with latest changes 
                    setIsEditing(false) // user no longer editing 
                })
            } else {
                res.json().then(json => {
                    setErrors(json.errors)
                    console.log(json.errors)
                })
            }
        })
    }


    return (
      
        <div className="wrapper bg-white mt-sm-5">
            <h4 className="pb-4 border-bottom">Account settings</h4>
            {/* if the user isn't editing their profile info, display it */}
            {!isEditing ? (
                <>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="user-info"><strong>First Name:</strong> {userInfo.first_name}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="user-info"><strong>Last Name:</strong> {userInfo.last_name}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="user-info"><strong>Username:</strong> {userInfo.username}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="user-info"><strong>City:</strong> {userInfo.city}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="user-info"><strong>State:</strong> {userInfo.state}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="user-info"><strong>Postal Code:</strong> {userInfo.postal_code}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="user-info"><strong>Budget:</strong> {userInfo.budget}</div>
                        </div>
                    </div>
                    <button className="btn btn-primary edit-button" onClick={handleEditClick}>
                    Edit
                    </button>
                </>
            ) : (
                // if user is editing their profile info, show them form inputs
                <form onSubmit={handleSubmit}>
                    <div className="py-2">
                        <div className="row py-2">
                            <div className="col-md-6">
                                <label htmlFor="firstname">First Name</label>
                                <input 
                                    type="text" 
                                    name="first_name"
                                    className="bg-light form-control" 
                                    value={userInfo.first_name}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className="col-md-6 pt-md-0 pt-3">
                                <label htmlFor="lastname">Last Name</label>
                                <input 
                                    type="text"
                                    name="last_name"
                                    className="bg-light form-control" 
                                    value={userInfo.last_name}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-md-6">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    name="username"
                                    className="bg-light form-control" 
                                    value={userInfo.username}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className="col-md-6 pt-md-0 pt-3">
                                <label htmlFor="city">City</label>
                                <input 
                                    type="text" 
                                    name="city"
                                    className="bg-light form-control" 
                                    value={userInfo.city}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-md-6">
                                <label htmlFor="state">State</label>
                                <input 
                                    type="text"
                                    name="state" 
                                    className="bg-light form-control"
                                    value={userInfo.state}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className="col-md-6 pt-md-0 pt-3">
                                <label htmlFor="postal_code">Postal Code</label>
                                <input 
                                    type="text" 
                                    name="postal_code"
                                    className="bg-light form-control" 
                                    value={userInfo.postal_code}
                                    onChange={handleChange}
                                    />
                            </div>
                        <div className="row py-2">
                            <div className="col-md-6">
                                <label htmlFor="budget">Budget</label>
                                <input 
                                    type="text" 
                                    name="budget"
                                    className="bg-light form-control" 
                                    value={userInfo.budget}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        </div>
                        <div className="py-3 pb-4 border-bottom">
                            <button className="btn btn-primary" style={{marginRight: "10px"}}>Save Changes</button>
                            <button className="btn border button" style={{marginLeft: "10px"}}>Cancel</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ProfilePage 
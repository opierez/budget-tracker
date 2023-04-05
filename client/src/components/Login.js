import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/Login.css'


function Login({ updateUser, updateErrors }) {

    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    // errors from fetch request 
    const [errors, setErrors] = useState([])

    // used to redirect user to a different route after signup
    const history = useHistory()

    // deconstructs username and password to be used in form values
    const {username, password} = formData

    // updates form data with user's input 
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username,
            password
        }
       
        // if user exists and is authenticated, create user session. if user doesn't exist or isn't authenticated, render errors. 
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    history.push('/') // redirect user to home after successful login
                    updateUser(user)}) // update user state in parent component
                    updateErrors() // invokes cb function to update error state in App component to empty array (removing 'not authorized' error)
            }else {
                res.json().then(json => {
                    // console.log(json.errors)
                    setErrors(json.errors)
                })
            }
        })
       
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/kelly-sikkema-unsplash.jpg`}
                        alt="Landscape"
                        className="login-image"
                        />
                </div>
                <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                    <form onSubmit={onSubmit} className="w-50">
                    <h2 className="mb-4">Login</h2>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                        Username
                        </label>
                        <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        className="form-control"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                        Password
                        </label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        className="form-control"
                        required
                        />
                    </div>
                    {errors ? errors.map((error) => <p key={error} style={{color: 'red'}}>{error}</p>) : null}
                    <button type="submit" className="btn btn-primary">
                        Log in
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
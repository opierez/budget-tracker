import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';


function Login({ updateUser }) {
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })
    const [errors, setErrors] = useState([])
    

    const history = useHistory()

    const {username, password} = formData

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username,
            password
        }
       
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    history.push('/')
                    updateUser(user)})
            }else {
                res.json().then(json => {
                    console.log(json.errors)
                    setErrors(json.errors)
                })
            }
        })
       
    }



    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }


    return (
        <div> 
        <form onSubmit={onSubmit}>
            <label>Username</label>
            <input type='text' name='username' value={username} onChange={handleChange} />
        
            <label>Password</label>
            <input type='password' name='password' value={password} onChange={handleChange} />
        
            <input type='submit' value='Log in' />
        </form>
        {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
        </div>
    )
}

export default Login
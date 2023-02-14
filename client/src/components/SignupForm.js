import React, { useState } from "react";
import '../styles/SignupForm.css'
import { useHistory } from 'react-router-dom';

const SignupForm = ({ updateUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "", 
    last_name: "",
    city: "",
    state: "",
    postal_code: "",
    budget: 0
  });

  const [errors, setErrors] = useState([])

  const history = useHistory()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const user = { ...formData };

    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user)
          history.push('/')
          updateUser(user);
        });
      } else {
        res.json().then(json => {
            console.log(json.errors)
            setErrors(json.errors)
        })
      }
    });
  }

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
        <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
            <div className="col-sm-10">
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
            <div className="col-sm-10">
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name:</label>
            <div className="col-sm-10">
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name:</label>
            <div className="col-sm-10">
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="city" className="col-sm-2 col-form-label">City:</label>
            <div className="col-sm-10">
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="state" className="col-sm-2 col-form-label">State:</label>
            <div className="col-sm-10">
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="postal_code" className="col-sm-2 col-form-label">Zip Code:</label>
            <div className="col-sm-10">
                <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="budget" className="col-sm-2 col-form-label">Budget:</label>
            <div className="col-sm-10">
                <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                />
            </div>
        </div>
        <button type="submit">Submit</button>
    </form>
    {errors ? errors.map(error => <div key={error}>{error}</div>) : null}
    </div>
  );
};

export default SignupForm;
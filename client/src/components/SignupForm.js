import React, { useState } from "react";
import '../styles/SignupForm.css'
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {MdOutlineAutoGraph} from 'react-icons/md'
import '../styles/SignupForm.css'

const SignupForm = ({ updateUser, updateErrors }) => {
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

  // errors from fetch request 
  const [errors, setErrors] = useState([])

  // used to redirect user to a different route after signup
  const history = useHistory()

  // update form data with user's input 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // console.log('form submitted')
    // console.log(errors)

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
        //   console.log(user)
            history.push('/') // redirect user to home after successful login
            updateUser(user); // updates user state in parent component
            updateErrors() // invokes cb function to update error state in App component to empty array (removing 'not authorized' error)
        });
      } else {
        res.json().then(json => {
            // console.log(json.errors)
            setErrors(json.errors)
        })
      }
    });
  }

  return (
    <div className="container">
        <h1 className="text-center icon-text">
            Sign up for an account
            <MdOutlineAutoGraph className="icon" size={32} />
        </h1>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('username'))} // check if errors array includes an error message for the username field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('username'))} {/* render the error message for the username field */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Create Password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('password'))} // check if errors array includes an error message for the pw field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('password'))} {/* render the error message for the pw field */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control 
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('first name'))} // check if errors array includes an error message for the first name field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('first name'))} {/* render the error message for the first name field */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control 
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('last name'))} // check if errors array includes an error message for the last name field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('last name'))} {/* render the error message for the last name field */}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </div>

            <div className="col-md-6">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City:</Form.Label>
                        <Form.Control 
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('city'))} // check if errors array includes an error message for the city field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('city'))} {/* render the error message for the city field */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Label>State:</Form.Label>
                        <Form.Control 
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('state'))} // check if errors array includes an error message for the state field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('state'))} {/* render the error message for the state field */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPostalCode">
                        <Form.Label>Postal Code:</Form.Label>
                        <Form.Control 
                            type="text"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('postal code'))} // check if errors array includes an error message for the postal code field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('postal code'))} {/* render the error message for the postal code field */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicBudget">
                        <Form.Label>Budget:</Form.Label>
                        <Form.Control 
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            isInvalid={!!errors.find(error => error.toLowerCase().includes('budget'))} // check if errors array includes an error message for the budget field
                            />
                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                            {errors.find(error => error.toLowerCase().includes('budget'))} {/* render the error message for the budget field */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    </div>
  );
};

export default SignupForm;
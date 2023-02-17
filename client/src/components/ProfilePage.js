import React from "react";
import '../styles/ProfilePage.css'

function ProfilePage({ user }) {

    const { first_name, last_name, username, city, state, postal_code, budget } = user 

    return (
      
        <div className="wrapper bg-white mt-sm-5">
            <h4 className="pb-4 border-bottom">Account settings</h4>
            <div className="py-2">
                <div className="row py-2">
                    <div className="col-md-6">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="bg-light form-control" />
                    </div>
                    <div className="col-md-6 pt-md-0 pt-3">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="bg-light form-control" />
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-md-6">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="bg-light form-control"  />
                    </div>
                    <div className="col-md-6 pt-md-0 pt-3">
                        <label htmlFor="city">City</label>
                        <input type="text" className="bg-light form-control" />
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-md-6">
                        <label htmlFor="state">State</label>
                        <input type="text" className="bg-light form-control" />
                    </div>
                    <div className="col-md-6 pt-md-0 pt-3" id="lang">
                        <label htmlFor="budget">Budget</label>
                        <input type="text" className="bg-light form-control" />
                    </div>
                </div>
                <div className="py-3 pb-4 border-bottom">
                    <button className="btn btn-primary mr-3">Save Changes</button>
                    <button className="btn border button">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage 
import React from "react";


function ProfilePage({ user }) {


    return(
        <div>
            <h1>{user.first_name} {user.last_name}</h1>
        </div>
    )
}

export default ProfilePage 
import React, {useState} from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom';



function NavBar({ user, updateUser}) {

    // checks if the navigation menu bar is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // logs user out (deletes session) and updates user state to null if successful
    function handleLogoutClick() {
        fetch("/logout", { 
            method: "DELETE" 
        }).then((r) => {
          if (r.ok) {
            updateUser(null);
          }
        });
    }

    // if user clicks on one of the navigation menu options, close the navigation menu 
    function handleLinkClick() {
        setIsOpen(false);
    }

  
    return (
  
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>Home</Link>
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            {/* if there's a logged in user, render Profile and Sign out options in navigation */}
            {user && Object.keys(user).length !== 0 ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={`/users/${user.id}`} onClick={handleLinkClick}>My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/users/${user.id}/analytics`} onClick={handleLinkClick}>Category Analysis</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => { handleLinkClick(); handleLogoutClick(); }}>Sign out</Link>
                </li>
              </>
            // if there's no user logged in, render Login and Sign Up options in navigation 
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLinkClick}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users/new" onClick={handleLinkClick}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
 
    );
  }

export default NavBar
import React, {useState} from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom';



function NavBar({ user, updateUser}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleLogoutClick() {
        fetch("/logout", { 
            method: "DELETE" 
        }).then((r) => {
          if (r.ok) {
            updateUser(null);
          }
        });
    }

    if (!user || Object.keys(user).length === 0) return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        </nav> 
    )

  
    return (
  
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={`/users/${user.id}`}>My Profile</Link>
              <Link className="nav-link" to="/login" onClick={handleLogoutClick}>Sign out</Link>
            </li>
          </ul>
        </div>
      </nav>
 
    );
  }

export default NavBar
import React, {useState} from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom';



function NavBar({ user, handleLoginUser}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleLogoutClick() {
        fetch("/logout", { 
            method: "DELETE" 
        }).then((r) => {
          if (r.ok) {
            handleLoginUser(null);
          }
        });
    }
  
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
            </li>
          </ul>
        </div>
      </nav>
 
    );
  }

export default NavBar
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook,faTwitter,faYoutube} from "@fortawesome/free-brands-svg-icons"
import "../css/Navbar.css";

function Navbar() {
  return (
    <div>
        <div className="container-fluid px-5 pt-3 position-fixed" id="top-navbar">
            <div className="row">
                <div className="col-3">
                    <p id='brandname'>Majumder's</p>
                </div>
                <div className="col-9">
                    <ul className='d-flex justify-content-end' id='top-navmenu'>
                        <li>Home</li>
                        <li>Menu</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Blog</li>
                        <li><FontAwesomeIcon icon={faTwitter} color='white' /></li>
                        <li><FontAwesomeIcon icon={faFacebook} color='white'/></li>
                        <li><FontAwesomeIcon icon={faYoutube}  color='white'/></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
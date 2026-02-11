import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
             <img src={assets.logo} alt="" />
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, fugiat exercitationem architecto quos nobis, cumque necessitatibus officia maiores similique temporibus nam, enim ut sapiente recusandae molestiae quo aut magni obcaecati.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
             <h2>Company</h2>
             <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery </li>
                <li>Privacy Policy</li>
             </ul>
            </div>
            <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+2-321-4-124-21</li>
                <li>CONTACT@tomato.com</li>
            </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy; All Rights Reserved</p>
    </div>
  )
}

export default Footer
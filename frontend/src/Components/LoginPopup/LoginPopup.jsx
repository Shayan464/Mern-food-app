import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios'


const LoginPopup = ({ setShowLogin }) => {
   
  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up");
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
   
  const OnchangeHandler = (e) => {
    const {name,value} = e.target
   setData((data) => ({...data,[name]:value}))
  }
  
  const OnLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token
        setToken(response.data.token); // Update context, triggers cart fetch
        setShowLogin(false); // Close popup
      } else {
        alert(response.data.message || "Login/Register failed");
      }
    } catch (error) {
      alert("Network error. Please try again.");
      console.error(error);
    }
  }


  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={OnLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
      <div className="login-popup-inputs">
        {currState === "Login" ?<></>: <input name='name' onChange={OnchangeHandler} type="text" value={data.name} placeholder="Your Name" required />}
        <input type="email" placeholder="Your Email" name="email" onChange={OnchangeHandler} value={data.email} required />
        <input type="password" placeholder="Your Password" name="password" onChange={OnchangeHandler} value={data.password} required />
      </div>
       <button type="submit">{currState === "Sign Up"? "Create account":"Login"}</button>
       <div className="login-popup-condition">
        <input type="checkbox" required  />
        <p>By Continuing, i agree to the terms of use & privacy policy.</p>
       </div>
       {currState === "Login" ?  <p>Create a new account ? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p> 
       :  <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
      </form>
    </div>
  );
};

export default LoginPopup;

import React, { useState } from "react";
import Header from "../Components/common/Header";
import Logo from "../assets/logo.png";
import SignUpForm from "../Components/SignUpComponents/SignupForm";
import LoginForm from "../Components/SignUpComponents/LoginForm";
import './style.css'
const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="signup-page">
       
          <div className="heading">
          
          <img className='logo'src={Logo} alt=''/>
          {!flag ? <h2>Sign Up</h2> : <h2>Login</h2>}

          </div>
        <div className="signup-wrapper">
        {!flag ? <SignUpForm /> : <LoginForm />}
          {!flag ? (
            <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
              Already have an Account ?Click here to Login
            </p>
          ) : (
            <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
              Don't have an account? Click here to Signup
            </p>
          )}
        </div>
        </div>
       
    </div>
  );
};

export default SignUp;

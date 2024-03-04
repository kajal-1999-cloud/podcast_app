import React, { useState } from "react";
import Header from "../Components/common/Header";
import image1 from "../assets/img.jpg";
import SignUpForm from "../Components/SignUpComponents/SignupForm";
import LoginForm from "../Components/SignUpComponents/LoginForm";

const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="signup-page">
        <div >
          <div className="heading">
          <img className='logo'src='../assets/logo.png' alt=''/>
          {!flag ? <h1>Sign Up</h1> : <h1>Login</h1>}

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
    </div>
  );
};

export default SignUp;

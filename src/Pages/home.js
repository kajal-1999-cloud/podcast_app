import React from "react";
import Header from "../Components/common/Header";
import image from "../assets/chris-lynch-Qruwi3Ur3Ak-unsplash.jpg";
import logo from "../assets/logo.png";
import signupPage from "../Pages/SignUpPage";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function signupPage(){
    navigate('/signup')
  }

  return (
    <div className="home">
      <Header />
      <div className="">
    
        <div className="intro">
       <div>
        <img className="cover" src={image} alt="" />
       </div>
          <div className="para">
          <div className="logo-name">
            <img className="logo" src={logo} alt="" />
            <h4>HighWaves</h4>
          </div><br/>
            {/* <p>Unleash your creativity with our podcast platform! 🎙️ </p>{" "}
          <p>Create captivating podcasts and craft engaging episodes daily </p>
          <p> immerse yourself in a world of music.</p>
          <p> Explore the art of storytelling or amplify your voice </p>{" "}
          <p> dive into a seamless listening experience.</p>{" "}
          <p> Your journey starts here – where creation meets enjoyment.</p> */}
            <h5>
              Unleash Creativity with Podcast Platform!  🎙️  </h5><p>
               <br /> 
               Create captivating podcasts and craft engaging episodes daily 🎵.
            <br/>
              Explore the art of storytelling or amplify your voice
              experience 🎼
            </p> <br />
  <button onClick={()=> signupPage()} >Click here
      
     </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

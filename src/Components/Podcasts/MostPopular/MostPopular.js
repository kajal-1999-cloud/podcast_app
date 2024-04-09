import React from "react";
import Button from "../../common/Button";
import "./style.css";
import { FaGooglePlay } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
// import { GoTriangleRight } from "react-icons/go";

function MostPopular({ index, title, description, audioFile, onClick }) {


  
  return (
   <div className="mostPopular">
     <div style={{ width: "100%" }} className="popular-details">
      <div className="">
        <h3 style = {{ textAlign: "left", marginBottom: 0 }} >
           {title}
        </h3>
        <p style={{ marginLeft: "1.5rem" }} className="podcast-description ">
          {description}
        </p>
      </div>
      {/* <Button
        text={"Play"}
        onClick={() => onClick(audioFile)}
        width={"100px"}
        className='play-button'
      /> */}
      <button onClick={() => onClick(audioFile)} className="button">
        <FaPlayCircle   className="logo" style={{}} />
      </button>
    </div>
   </div>
  );
}

export default MostPopular;

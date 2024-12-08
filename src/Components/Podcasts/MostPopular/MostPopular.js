import React from "react";
import Button from "../../common/Button";
import "./style.css";
import { FaGooglePlay } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function MostPopular({ id, title, displayImage, username }) {
  return (
    <Link to={`/podcast/${id}`}>
   <div className="mostPopular">
         <div className="popular-card">
        <img className="display-popular-image" src={displayImage} alt='' />
        <p className="title-podcast">{title}</p>
      </div>
   </div>
   </Link>
  );
}
export default MostPopular;

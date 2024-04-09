import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function PodcastCard({ id, title, displayImage, username }) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="display-image-podcast" src={displayImage} alt='' />
        <p className="title-podcast">{title}</p>

      </div>
    </Link>
  );
}

export default PodcastCard;
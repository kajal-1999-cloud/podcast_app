import React from "react";
import Button from "../../common/Button";
import "./style.css";
import { GoTriangleRight } from "react-icons/go";

function EpisodeDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div style={{ width: "100%" }} className="episode-details">
      <div>
        <h1 style = {{ textAlign: "left", marginBottom: 0 }} >
          {index}. {title}
        </h1>
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
        <GoTriangleRight className="logo" style={{}} />
      </button>
    </div>
  );
}

export default EpisodeDetails;

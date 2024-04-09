import React from "react";
import Header from "../Components/common/Header";
import CreatePodcastForm from "../Components/StartAPodcast/CreateApodcastForm";
import image from "../../src/assets/signup.png";

function CreateAPodcastPage() {
  return (
    <div className="startAPodcast">
      <Header />
      
     <div className="createAPodcast">
     <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
      
     </div>
    </div>
  );
}

export default CreateAPodcastPage;
import React from "react";
import Header from "../Components/common/Header";
import CreatePodcastForm from "../Components/StartAPodcast/CreateApodcastForm";

function CreateAPodcastPage() {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  );
}

export default CreateAPodcastPage;
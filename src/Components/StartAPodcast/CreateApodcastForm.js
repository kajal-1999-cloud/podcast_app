import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/Input";
import { toast } from "react-toastify";
import Button from "../common/Button";
import FileInput from "../common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Modal } from 'antd'; // Import Ant Design Modal

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Navigate hook to redirect

  // Check if user is authenticated
  if (!auth.currentUser) {
    Modal.warning({
      title: 'Authentication Required',
      content: 'You need to be logged in to create a podcast.',
      onOk() {
        navigate("/"); // Navigate to home page after clicking OK
      }
    });
    return null; // Render nothing if not authenticated
  }

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {
        // 1. Upload files -> get downloadable links
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("Podcast Created!");
        window.location.href = "/podcasts"; 
        setLoading(false);

      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <div className="createPodcast">
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />
      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </div>
  );
}

export default CreatePodcastForm;

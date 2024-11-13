import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import Loader from "../Components/common/Loader";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import "./style.css";
import "./profile.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const { id } = useParams();
  const [users, setUsers] = useState({});
  
  const getData = async () => {
    try {
      const docRef = doc(db, "users", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsers({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("error in signup");
        toast.error("signup not possible");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  if (!users) {
    return <Loader />;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logout");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="profile">
      <Header />
      <div className="profileText">
        <h3 className="heading">USER PROFILE</h3>
        <div className="photoDiv">
          <img className="profilePhoto" src={users.profileImage} alt="img..." />
        </div>
        <div className="user">
          {users.name && (
            <h4 className="name"> USERNAME: {users.name.toUpperCase()}</h4>
          )}
          <h4> Email-ID: {users.email}</h4>
        </div>

        <button text={"logout"} onClick={handleLogout} className="btnChnge">
          <h4>Logout</h4>
        </button>
      </div>
    </div>
  );
};

export default Profile;

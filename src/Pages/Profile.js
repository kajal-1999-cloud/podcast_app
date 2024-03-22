import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/common/Header';
import Loader from '../Components/common/Loader';
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { toast } from 'react-toastify'
import "./style.css";
import "./profile.css";
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
const Profile = () => {
  // const { id } = useParams();
  // const [users, setUsers] = useState({});
    const user = useSelector((state) => state.user.user);

  //     useEffect(() => {
  //   if (id) {
  //     getData();
  //   }
  // }, [id]);

  //   const getData = async () => {
  //     try{
  //       const docRef = doc(db, "users", id);
  //       const docSnap = await getDoc(docRef);

  //       if(docSnap){
  //         console.log('Document data', docSnap.data() );
  //         setUsers({ id:id, ...docSnap.data()})
  //       }
  //     }catch(e){
  //        toast.error(e.message)
  //     }
  //   }
  // console.log("User->", users);
  
  if (!user) {
    return <Loader />;
  }

  const handleLogout=()=>{
    signOut(auth).then(()=>{
    toast.success("User Logout")
    })
    .catch((error)=>{
        toast.error(error.message)
    })
  }


  return (
    <div className='profile'>
      <Header />
      <br/>
      
      <div className="profileText">
     <h1>User Profile</h1>
        <img src={user.profileImage} alt=''/>
        <h2> {user.name}</h2>
        <h2>  {user.email}</h2>
        <br/>
        
        <button text={"logout"} onClick={handleLogout} className="btnChnge" >Logout</button>
        </div>
    
    </div>
  );
  }

export default Profile;
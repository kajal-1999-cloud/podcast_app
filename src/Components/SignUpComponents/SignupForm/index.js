
import React, { useState } from 'react';
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { auth,db,storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc,setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css'
import FileInput from '../../common/Input/FileInput';
import { upload } from '@testing-library/user-event/dist/upload';

const SignUpForm = () => {
    const [FullName, setFullName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [confPass,setConfPass]=useState('')
    const [profilePhoto,setProfilePhoto]=useState('')

    const[loading,setLoading]=useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSignUp=async()=>{
       
            setLoading(true)
            console.log("handle sign up")
      
            if (
              password == confPass &&
              password.length >= 6 &&
              FullName &&
              email && profilePhoto
            ) 
            {
            try{
              // storing photo in storage
              const profileImageRef = ref(
                storage,
                `profile/${auth.currentUser.uid}${Date.now()}`
              );
              await uploadBytes(profileImageRef, profilePhoto)
          const profileImageUrl = await getDownloadURL(profileImageRef )

              //creating user acount
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
                
              );
              const user = userCredential.user;
              //saving user details

              await setDoc(doc(db,"users",user.uid),{
                name:FullName,
                email:user.email,
                uid:user.uid,
                profileImage:profileImageUrl
              });
              //save data nd call redux
              
              dispatch(
                setUser({
                  name:FullName,
                  email:user.email,
                  uid:user.uid,
                  profileImage:profileImageUrl
                })
              )
              console.log("user", user);
              toast.success("User has been created!");
              setLoading(false);
              navigate("/Profile");
            }
            catch(e){
              console.log('error',e)
              toast.error(e.message);
              setLoading(false);
            }
          }
          else {
            if (password !== confPass) {
              toast.error(
                "Please Make Sure your password and Confirm Password matches!"
              );
            } else if (password.length < 6) {
              toast.error(
                "Please Make Sure your password is more than 6 digits long!"
              );
            }
            setLoading(false);
          }
        };
        function profileImageFunc(files){
          setProfilePhoto(files)
        }
  
  return (
    <div className='container-signup'>
    
        <div className='left'>
        <InputComponent 
        state={FullName}
        setState={setFullName}
        placeholder='Full Name'
        type="text"
        required={true}
        autocomplete="off"
        />
        <InputComponent 
        state={email}
        setState={setEmail}
        placeholder='Email'
        type="email"
        required={true}
        style={{ backgroundColor: 'transparent' }}
        autocomplete="off"
        />
        <InputComponent 
        state={password}
        setState={setPassword}
        placeholder='Password'
        type="password"
        required={true}
        autocomplete="off"
        />
        <InputComponent 
        state={confPass}
        setState={setConfPass}
        placeholder='Confirm Password'
        type="password"
        required={true}
        autocomplete="off"
        />
    <FileInput
        accept={"image/*"}
        id="upload-profile-image"
        fileHandleFnc={profileImageFunc}
        text={"Upload profile image"}
      />
        <Button text={loading ? "Loading...":"Signup"}  disabled={loading} onClick={handleSignUp}/>

        </div>

    </div>
  )
}

export default SignUpForm
import React, { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {
 
     let firstNameInputRef = useRef();
     let lastNameInputRef = useRef();
     let emailInputRef = useRef();
     let passwordInputRef = useRef();
     let ageInputRef = useRef();
     let phoneNoInputRef = useRef();
     let profilePicInputRef = useRef();
 
     let [profilePic, setProfilePic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ppBm7t18CsmDh9C2NKRdR6cql_IIteQ5ww&s");

     let userDetails = useSelector((store)=>{
        return store.userDetails;
     });

     useEffect(() => {
  if (!userDetails || !userDetails.email) return;

  firstNameInputRef.current.value = userDetails.firstName;
  lastNameInputRef.current.value = userDetails.lastName;
  emailInputRef.current.value = userDetails.email;
  ageInputRef.current.value = userDetails.age;
  phoneNoInputRef.current.value = userDetails.phoneNo;
  setProfilePic(`/${userDetails.profilePic}`);
}, [userDetails]);

 
      let onUpdateProfile = async()=>{
         let dataToSend = new FormData();
         dataToSend.append("firstName",firstNameInputRef.current.value);
         dataToSend.append("lastName",lastNameInputRef.current.value);
         dataToSend.append("email",emailInputRef.current.value);
         dataToSend.append("password",passwordInputRef.current.value);
         dataToSend.append("age",ageInputRef.current.value);
         dataToSend.append("phoneNo",phoneNoInputRef.current.value);
 
         for(let i=0; i<profilePicInputRef.current.files.length; i++){
             dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
         }
 
 
         // let myHeaders = new Headers();
         // myHeaders.append("Content-type","application/x-www-form-urlencoded")
 
         let reqOptions = {
             method:"PATCH",
             body:dataToSend,
             // headers:myHeaders
         }
 
         let JSONData = await fetch("/updateProfile",reqOptions);
         let JSOData = await JSONData.json();
         console.log(JSOData);
         alert(JSOData.msg)
     }
 
   return (
      <div className='App'>
        <TopNavigation></TopNavigation>
        <br></br>
        
       <form>
         <h2>EditProfile</h2>
         <div>
             <label>First Name</label>
             <input ref={firstNameInputRef}></input>
         </div>
         <div>
             <label>Last Name</label>
             <input ref={lastNameInputRef}></input>
         </div>
         <div>
             <label>Email Id</label>
             <input ref={emailInputRef} readOnly></input>
         </div>
         <div>
             <label>Password</label>
             <input ref={passwordInputRef}></input>
         </div>
         <div>
             <label>Age</label>
             <input ref={ageInputRef}></input>
         </div>
         <div>
             <label>Phone No</label>
             <input ref={phoneNoInputRef}></input>
         </div>
         <div>
             <label>Profile Pic</label>
             <input ref={profilePicInputRef} type="file" onChange={(e)=>{
                 console.log(e.target.files);
                 let selectedPath = URL.createObjectURL(e.target.files[0]);
                 setProfilePic(selectedPath)
             }}></input>
         </div>
         <div>
             <img src={profilePic} alt=""  className='profPic'></img>
         </div>
        
         <div className='buttonClass'>
             <button type="button" onClick={()=>{
                 onUpdateProfile();
             }}>Update Profile</button>
         </div>
 
       </form>
       
         
     </div>
   )
 }
export default EditProfile

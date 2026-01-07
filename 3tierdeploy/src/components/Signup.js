import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {
 
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let ageInputRef = useRef();
    let phoneNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let [profilePic, setProfilePic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ppBm7t18CsmDh9C2NKRdR6cql_IIteQ5ww&s");
    let onSignupByUsingJSON = async()=>{
        let dataToSendJSO = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            age: ageInputRef.current.value,
            phoneNo: phoneNoInputRef.current.value
        }

        let dataToSendJSON = JSON.stringify(dataToSendJSO);
        console.log(dataToSendJSO);
        console.log(dataToSendJSON);

        let myHeaders= new Headers();
        myHeaders.append("Content-type", "application/json")

        let reqOptions = {
            method:"POST",
            body:dataToSendJSON,
            headers:myHeaders
        }

        let JSONData = await fetch("http://localhost:3693/signup",reqOptions)
        let JSOData = await JSONData.json();
        console.log(JSOData);
    }

    let onSignupByUsingURLE = async()=>{
        let dataToSend = new URLSearchParams();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("phoneNo",phoneNoInputRef.current.value);

        let myHeaders = new Headers();
        myHeaders.append("Content-type","application/x-www-form-urlencoded")

        let reqOptions = {
            method:"POST",
            body:dataToSend,
            headers:myHeaders
        }

        let JSONData = await fetch("http://localhost:3693/signup",reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);

    }

     let onSignupByUsingFD = async()=>{
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
            method:"POST",
            body:dataToSend,
            // headers:myHeaders
        }

        let JSONData = await fetch("http://localhost:3693/signup",reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg)
    }

  return (
     <div className='App'>
      <form>
        <h2>Sign Up</h2>
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
            <input ref={emailInputRef}></input>
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
                onSignupByUsingJSON();
            }}>Signup(JSON)</button>
        </div>
        <div className='buttonClass'>
            <button type="button" onClick={()=>{
                onSignupByUsingURLE();
            }}>Signup(URLE)</button>
        </div>
        <div className='buttonClass'>
            <button type="button" onClick={()=>{
                onSignupByUsingFD();
            }}>Signup(FD)</button>
        </div>

      </form>
      <br></br>
        <br></br>
        <Link to={"/"}>Login</Link>
    </div>
  )
}
export default Signup

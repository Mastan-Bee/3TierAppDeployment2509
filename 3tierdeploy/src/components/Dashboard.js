import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Dashboard() {
 let userDetails = useSelector((store)=>{
        return store.userDetails
    });

    let onDeleteProfile = async()=>{
        let dataToSend = new FormData();
        dataToSend.append("email", userDetails.email);
        let reqOptions = {
            method:"DELETE",
            body:dataToSend
        }
        let JSONData = await fetch("/deleteProfile",reqOptions);
        let JSOData = await JSONData.json();
        alert(JSOData.msg)
    }
    console.log(userDetails)
  return (
    <div>
        <TopNavigation></TopNavigation>
      <h2><ins>Dashboard</ins></h2>

      <h3>{userDetails.firstName} {userDetails.lastName}</h3>
      <img src={`/${userDetails.profilePic}`} alt='' className='profPic'></img>
      <br></br>
      <br></br>
      <button type="button" onClick={()=>{
        onDeleteProfile();
      }}> Delete Profile </button>
    </div>
  )
}
export default Dashboard

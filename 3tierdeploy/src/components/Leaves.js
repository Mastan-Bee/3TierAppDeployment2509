import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';

function Leaves() {
 let userDetails = useSelector((store)=>{
            return store.userDetails
        });
  return (
    <div>
        <TopNavigation></TopNavigation>
      <h2><ins>Leaves</ins></h2>
      <h3>{userDetails.firstName} {userDetails.lastName}</h3>
      <h3>{userDetails.phoneNo}</h3>
      <img src={`http://localhost:3693/${userDetails.profilePic}`} alt='' className='profPic'></img>

    </div>
  )
}


export default Leaves

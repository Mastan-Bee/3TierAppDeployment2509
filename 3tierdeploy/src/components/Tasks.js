import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';

function Tasks() {
  let userDetails = useSelector((store)=>{
            return store.userDetails
        });
  return (
    <div>
        <TopNavigation></TopNavigation>
      <h2><ins>Tasks</ins></h2>
      <h3>{userDetails.firstName} {userDetails.lastName}</h3>
      <h3>{userDetails.age}</h3>
      <img src={`http://localhost:3693/${userDetails.profilePic}`} alt='' className='profPic'></img>


    </div>
  )
}

export default Tasks

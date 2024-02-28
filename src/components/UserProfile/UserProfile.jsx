import React, { useContext, useEffect } from 'react'
import style from "./UserProfile.module.css"
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../Context/UserContext';

 export default function UserProfile() {
 
let{userData}=useContext(UserContext)
let encodedToken=  localStorage.getItem('userToken');
let DecodedToken=jwtDecode(encodedToken)
  return <>
<div className='d-flex justify-content-center align-items-center mt-5 text-danger w-100' >
<h1>Hello {userData?.name}</h1>

</div>

  </>
}

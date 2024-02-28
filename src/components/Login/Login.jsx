import React, { useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {BallTriangle} from 'react-loader-spinner'
import { UserContext } from '../Context/UserContext'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'


export default function Login() {

let {setUserToken,setUserData}=useContext(UserContext);

let navigate= useNavigate();
const [errorMessage,setErrorMessage]=useState('')

const [isLoading,setIsLoading]=useState(false)


  async function LoginSubmit(requestBody){
  console.log(requestBody)
  setIsLoading(true)
  setErrorMessage("")
let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,requestBody)
.catch(err =>
  {
    setIsLoading(false)
    setErrorMessage(err.response.data.message)})
console.log(data);

//login
if(data.message=='success'){
  localStorage.setItem('userToken', data.token)
setUserToken(data.token)
setUserData(data.user)
  navigate('/')}
}


/// yup validation
const validationSchema=Yup.object({
email: Yup.string().email('email not valid').required('Required'),
password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,'invalid').required('Required'),
})



const registerForm=useFormik({
initialValues:{
  email:"",
  password:""

},
validationSchema,

onSubmit:LoginSubmit


})





  return <>
    <Helmet><title>Login page</title> </Helmet>

  <div className="w-50 mx-auto my-5">
<h3 className='mb-3'>Login Now</h3>
<form onSubmit={registerForm.handleSubmit}>





<div className="form-group">
<label htmlFor="Email" className='mb-1'>Email</label>
<input type="email" id='Email' name='email' value={registerForm.values.email}  className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}
/>
{registerForm.errors.email && registerForm.touched.email ? <div className='alert alert-danger'>{registerForm.errors.email}</div>:""}

</div>

<div className="form-group">
<label htmlFor="password" className='mb-1'>password</label>
<input type="password" id='password' name='password' value={registerForm.values.password} onChange={registerForm.handleChange} className='form-control' onBlur={registerForm.handleBlur}/>
{registerForm.errors.password && registerForm.touched.password ? <div className='alert alert-danger'>{registerForm.errors.password}</div>:""}


</div>



<div className='d-flex align-items-center gap-3'>

<button className='btn bg-main text-white mt-3 d-block ' type='submit'>
{isLoading ?
<BallTriangle
height={20}
  width={100}
  radius={5}
  color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
 />
  :"Login"}
</button>
<Link className='mt-3 btn ' to={'/register'}> If You Dont Hava an Account,You Can Register Now</Link>

</div>

</form>
{/* error message */}
{errorMessage?<div className='alert alert-danger mt-2'>{errorMessage}</div> :null}


  </div>
  
  </>
}

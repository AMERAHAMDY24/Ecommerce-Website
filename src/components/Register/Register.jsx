import React, { useState } from 'react'
import style from "./Register.module.css"
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Register() {
/* custom validation
function validate(values){
  let errors={};

    if(!values.name){
      errors.name="Required"
    }else if (values.name.length<3){
      errors.name="name is too short"
    }    if(!values.email){
      errors.email="Required"
    }

    if(!values.password){
      errors.password="Required"
    }else if(!/^[A-Z][a-z0-9]{3,7}$/.test(values.password))
  {
    errors.password="invalid password"
  }
  if(!values.rePassword){
    errors.rePassword="Required"


}else if(values.password != values.rePassword)
{
  errors.rePassword="password & rePassword should match"
}

if(!values.phone){
errors.phone="Required"
}else if (!/^01[0125][0-9]{8}$/.test(values.phone))

{
  errors.phone="phone is not valid"
}
return errors
}*/
let navigate= useNavigate();
const [errorMessage,setErrorMessage]=useState('')

const [isLoading,setIsLoading]=useState(false)


  async function callRegister(requestBody){
  console.log(requestBody)
  setIsLoading(true)
  setErrorMessage("")
let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,requestBody)
.catch(err =>
  {
    setIsLoading(false)
    setErrorMessage(err.response.data.message)})
console.log(data);

//login
if(data.message=='success'){
   navigate('/Login')}


}

/// yup validation
const validationSchema=Yup.object({
name:Yup.string().min(3,'name is too short').max(10,'name is too long').required("name is required"),
email: Yup.string().email('email not valid').required('Required'),
password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,'invalid').required('Required'),
rePassword: Yup.string().oneOf([Yup.ref('password')],'passsword & repassword should match').required('Required'),
phone: Yup.string().matches(/^01[1250][0-9]{8}$/,'invalid').required('Required')
})



const registerForm=useFormik({
initialValues:{
  name:"",
  email:"",
  password:"",
  rePassword:"",
  phone:""

},
validationSchema,

onSubmit:callRegister


})





  return <>
    <Helmet><title>Register page</title> </Helmet>

  <div className="w-50 mx-auto my-5">
<h3 className='mb-3'>Register Now</h3>
<form onSubmit={registerForm.handleSubmit}>
  <div className="form-group">
<label htmlFor="fullName" className='mb-1'>Full Name</label>
<input type="text" id='fullName' name='name' value={registerForm.values.name}  className='form-control' onChange={registerForm.handleChange}
onBlur={registerForm.handleBlur}
/>

{registerForm.errors.name  && registerForm.touched.name ? <div className='alert alert-danger'>{registerForm.errors.name}</div> :"" }
</div>



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

<div className="form-group">
<label htmlFor="repassword" className='mb-1'>rePassword</label>
<input type="password" id='repassword' name='rePassword' value={registerForm.values.rePassword} onChange={registerForm.handleChange} className='form-control' onBlur={registerForm.handleBlur}/>

{registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className='alert alert-danger'>{registerForm.errors.rePassword}</div>:""}

</div>

<div className="form-group">
<label htmlFor="phone" className='mb-1'>phone</label>
<input type="tel" id='phone' name='phone' value={registerForm.values.phone}  onChange={registerForm.handleChange} className='form-control' onBlur={registerForm.handleBlur}/>
{registerForm.errors.rePassword  && registerForm.touched.phone? <div className='alert alert-danger'>{registerForm.errors.rePassword}</div>:""}


</div>
<button   className='btn bg-main text-white mt-3 d-block ms-auto' type='submit'>
{isLoading ?<i className='fa fa-spinner fa-spin'></i>:"Register"}
</button>
</form>
{/* error message */}
{errorMessage?<div className='alert alert-danger mt-2'>{errorMessage}</div> :null}


  </div>
  
  </>
}

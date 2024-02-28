import React, { useContext } from 'react'
import style from "./CheckOut.module.css"
import { Formik, useFormik } from 'formik'
import { CartContext } from '../Cart/CartContext'
 export default function CheckOut() {

  let{OnlinePayment}=useContext(CartContext)
async function Payment(values){
console.log(values)
let {data}=await OnlinePayment(values)
console.log(data)
window.location.href=data.session.url

}
  let formik=useFormik({
    initialValues:{
      "details": "",
      "phone": "",
      "city": ""

    },
    onSubmit:Payment
  })
  return <>

<div className="container">
  <div className="row mx-auto bg-main-light p-5">
    <h2>
      Shipping Address
    </h2>
<form action="" onSubmit={formik.handleSubmit}>

    <label htmlFor="details">Details</label>
    <input type="text" id='details' value={formik.values.details} name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />

    <label htmlFor="phone">phone</label>
    <input type="tel" id='phone' value={formik.values.phone} name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
    <label htmlFor="city">city</label>
    <input type="text" id='city' value={formik.values.city} name='city' onChange={formik.handleChange} onBeforeInputCapture={formik.handleBlur} className='form-control' />
<button className='btn bg-main  w-100 mt-3 text-white' type='submit'>Pay now</button>
</form>
  </div>
</div>
  </>
}

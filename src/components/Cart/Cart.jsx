import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { Helmet } from 'react-helmet'
import { CartContext } from './CartContext'
import { BallTriangle, CirclesWithBar } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { date } from 'yup'

export default function Cart() {

  const[cart,setCart]=useState(null)

  
  let {getLoggedUserCart,removeCartItem,updateProductQuantity,clearCart}=useContext(CartContext);
 async function removeItem(id){
   let {data}=await removeCartItem(id);
   toast.success("Product deleted Successfully")

   setCart(data);
}
 async function getCart(){
 let {data}=await getLoggedUserCart()
console.log(data)
setCart(data);

}

async function  updateCount(id,count){
 let{data}=await updateProductQuantity(id,count)
 setCart(data);
 toast.success("Product Updated Successfully")



}
async function clearAllCarts(){

  let data=await clearCart();
if(data.status== 'success'){
  setCart(null)
}
}

  useEffect(()=>{
getCart()
},[])

  return <>
    <Helmet><title>Cart page</title> </Helmet>
    {cart?
<div className="w-75 mx-auto p-2 bg-main-light mt-5">
<div className='d-flex justify-content-between'>
<h3 className='p-3 mt-3'> Cart Shop</h3>  
<Link rel="stylesheet" to={'/CheckOut'} ><button className=' btn btn-primary btn-sm mt-4 px-3 me-3 text-white'>Check out</button>
</Link>
</div>

<div className=' d-flex justify-content-between mt-3 p-3'>
<h4> total price:<span className='text-main'>
   {cart.data.totalCartPrice}  </span>
</h4>
  <h3>total number of items:<span className='text-main'>{cart.numOfCartItems}</span></h3>
</div>

{cart.data.products.map((product)=>
<div className="container" key={product.product.id}>

<div className=' row '>
<div className="col-md-2 ">
<img src={product.product.imageCover} className='w-100'  alt="" />
</div>
<div className="col-md-10">

  <div className='d-flex justify-content-between align-items-center'>
<div>
  <h3 className='h6 fw-bold'>{product.product.title}</h3>
  <h6 className='fw-bold'>price : {product.price} EGP</h6>

<button onClick={()=>removeItem(product.product.id)} className='btn text-danger p-0'>  <i className="fa-solid fa-trash"></i> Remove
</button>
</div>
<div>
<button onClick={()=> updateCount(product.product.id,product.count +1)} className='btn brdr-main  p-1'>+</button>
<span className='mx-2'>{product.count}</span>
<button disabled={product.count <=1} onClick={()=> updateCount(product.product.id,product.count -1)} className='btn brdr-main  p-1'>-</button>

</div>
  </div>
</div>

</div>
<hr />
</div>
)}
<div onClick={()=>clearAllCarts()}  className='d-flex justify-content-center my-4'><button className='btn brdr-main '>Clear Your Cart</button>
</div>


</div>
:<section id='loading' className='d-flex  justify-content-center align-items-center'>
  
  
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />    </section>}

  </>
}

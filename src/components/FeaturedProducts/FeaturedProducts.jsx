 import React, { useContext } from 'react'
import style from "./FeaturedProducts.module.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../Cart/CartContext'
import toast from 'react-hot-toast'




export default function FeaturedProducts() {


  let {addToCart}=useContext(CartContext)
  
  async function addProduct(productId){
    let response=await addToCart(productId);

    if(response.data.status =='success'){
      toast(response.data.message ,{
        duration:1000,
        position:'top-center',
        icon: '👏',
        style:{
          color:"green"
        }
      })

    }else{
      toast.error("Faild to Add to cart")


    }
    console.log(response)
    }





 function getFeaturedProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}
let {isLoading,isError,data,isFetching }=useQuery('featuredProducts',getFeaturedProducts)
 console.log("isLoading",isLoading)
 console.log("isFetching",isFetching)




  return <>
  {isLoading?

<div className='w-100 py-5 d-flex justify-content-center align-items-center '>
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
</div>:


<div className="container my-5">

<div className="row ">
  {data?.data.data.map((product)=>
  <div className="col-md-3 py-3 px-2 product" key={product._id}>
    <Link to={`/ProductDetails/${product._id} `}>
<div className='rounded-3 p-3 cursor-pointer'> 
<img src={product.imageCover}className='w-100' alt="" />
<span className='text-main font-sm'>{product.category.name}</span>
<h3 className='my-2 fw-bold h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
<div className='d-flex justify-content-between mt-3'>
  <div>{product.price} EGP</div>
  <div>
  <i className="fa-solid fa-star rating-color pe-1"></i>
    {product.ratingsAverage}

  </div>
</div>
</div>
</Link>

<div className='d-flex justify-content-center'>
<button onClick={()=>addProduct(product._id)} className='btn product text-white bg-main w-75  mt-4 '> + Add</button>
<i className="fa-solid fa-heart fs-3 mt-2 product"></i>

</div>


</div>
  )}

</div>

</div>}
        </>
      
}

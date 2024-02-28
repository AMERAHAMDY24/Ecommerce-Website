import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { date } from 'yup';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import toast from 'react-hot-toast';
import { CartContext } from '../Cart/CartContext';
 

export default function ProductDetails() {

  let parameters=useParams();

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


function getProductDetails(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
  let  {isLoading,isError,data}=useQuery('productDetails',()=>getProductDetails(parameters.id))
  console.log(data?.data.data)
 let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  }
return<>
 {data?.data.data?
 <div className="container mt-4">

  <div className='row py-2' >

<div className="col-md-4">
<Slider {...settings}>
  <img src={data.data.data.images[0]} className='w-100' height={550} alt="" />
  <img src={data.data.data.images[1]} className='w-100' height={550} alt="" />
</Slider>
</div>
<div className="col-md-8 d-flex flex-column justify-content-center">
<h4>{data?.data.data.title} </h4>
<p>{data?.data.data.description}</p>

<div className='d-flex justify-content-between mt-3'>
  <div>{data?.data.data.price} EGP</div>
  <div>
  <i className="fa-solid fa-star rating-color pe-1"></i>
    {data?.data.data.ratingsAverage}

  </div>
</div>
<div className='d-flex justify-content-center mt-5'>
<button className='btn bg-main w-75' onClick={()=>addProduct(data.data.data.id)}> +Add</button>
<i className="fa-solid fa-heart fs-2 mt-2 ps-5"></i>

</div>
</div>
 </div>
 </div>

 
 
 :''}



</>

}



/* using useeffect
export default function ProductDetails() {
  let parameters=useParams();
  const[productDetails,setproductDetails]=useState(null)
  console.log(parameters)

 async function getProductDetails(id){
 let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 setproductDetails(data)

}
  useEffect(()=>{
getProductDetails(parameters.id)

  },[])
  return <>
      <h1>ProductDetails</h1>
  </>
}
*/
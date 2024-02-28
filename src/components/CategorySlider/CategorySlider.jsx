import React, { useEffect, useState } from 'react'
import style from "./CategorySlider.module.css"
import axios from 'axios'
import Slider from 'react-slick'
 

  export default function CategorySlider() {

let settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplay:500

}

   
   const [categories,setCategories]=useState([])
    async function getCategories(){
 let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories` )
 console.log(data)
 setCategories(data.data)
}
useEffect(()=>{
getCategories()
},[])
  return <>
<div className="container-fluid my-5 gx-0">

  <Slider {...settings}>
{categories.map(category =>  <div key={category._id} className="col-md-2 ">

<div className="item ">
  <img src={category.image} height={200} className='w-100'  alt="" />
  <h5>{category.name}</h5>
</div></div> )}
  </Slider>



</div>

  </>
}

import React from 'react'
import style from "./Brand.module.css"
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brand() {
  
  

 function getBrands(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
}
let {isLoading,data }=useQuery('Branda',getBrands)
 console.log("isLoading",isLoading)
 console.log(data)

  
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
      <div className="container pt-4">
<h2 className='text-center text-main fw-bold mt-4'>All Brands </h2>

    <div className="row gy-3 gx-4 " >
      {data?.data.data.map((Brand)=>
      <div className="col-md-4 product" key={data.data.data._id}>
        <img src={Brand.image} className='w-100' height={300} alt="" />
        <h4 className='text-center text-main py-4'>{Brand.name}</h4>
      </div>
      )
      
      }
    </div>
  </div>
  

    
    }
  
  
  </>
}

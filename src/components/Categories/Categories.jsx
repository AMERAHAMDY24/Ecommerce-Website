import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Categories() {
  
  

 function getCategories(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
let {isLoading,isError,data,isFetching }=useQuery('Categories',getCategories)
 console.log("isLoading",isLoading)
 console.log("isFetching",isFetching)
 console.log("data",data)
 const[searchTerm,setSearchTerm]=useState('')
 const[searchList,setSearchList]=useState([])
 console.log(data.data.data)

useEffect(()=>{
  setSearchList(data?.data.data)
  console.log(searchList)
},[])

useEffect(()=>{
  setSearchList(data?.data.data.filter(cat=>cat.name.toLowerCase().includes(searchTerm.toLowerCase())))
},[searchTerm])

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

  <div className="container mt-4">
  <div className="row gy-3 gx-4 " >
    <input onChange={(e)=>setSearchTerm(e.target.value)} type="text" className='form-control mb-5' />
    {searchList?.map((category)=>
    <div className="col-md-4 product" key={data.data.data._id}>
      <img src={category.image} className='w-100' height={350} alt="" />
      <h4 className='text-center text-main py-4'>{category.name}</h4>
    </div>
    )
    
    }
  </div>
</div>

}
  
  </>
}

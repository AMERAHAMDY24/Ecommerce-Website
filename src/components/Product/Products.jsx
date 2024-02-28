import React from 'react'
import style from "./Product.module.css"
import { Helmet } from 'react-helmet'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

 export default function Products() {
  return <>
    <Helmet><title>Product page</title> </Helmet>
<FeaturedProducts/>
  </>
}

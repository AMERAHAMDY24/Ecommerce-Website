import React, { useContext } from 'react'
import style from "./Home.module.css"
import { CounterContext } from '../Context/CounterContext'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
import { CirclesWithBar } from 'react-loader-spinner'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

 export default function Home() {
let {changeCounter}=useContext(CounterContext)

  return <>
  




  <Helmet><title>Home page</title> </Helmet>
            
<MainSlider/>
<CategorySlider/>
<FeaturedProducts/>
  </>
}

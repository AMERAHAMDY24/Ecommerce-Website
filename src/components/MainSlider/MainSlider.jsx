import React from 'react'
import style from "./MainSlider.module.css"
import Slider from 'react-slick';

import image1 from '../../assets/images/slider1.jpg'
import image2 from '../../assets/images/slider2.jpg'
import image3 from '../../assets/images/slider3.jpg'
import image4 from '../../assets/images/slider4SY.jpg'
import image5 from '../../assets/images/slider5.jpg'

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    autoplay:1000
  }
return<>

<div className="container w-50 mx-auto">
  <div className="row gx-0">
<div className="col-md-6 mt-4">
<Slider {...settings}>

<img src={image3} alt="" />
<img src={image4} alt="" />
<img src={image5} alt="" />



</Slider>
</div>
<div className="col-md-6 d-flex flex-column mt-4">
<img src={image1} className='w-100' alt="" />
<img src={image2} alt="" />


</div>


  </div>
</div>

</>
}
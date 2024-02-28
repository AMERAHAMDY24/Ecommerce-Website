import React, { useContext, useEffect } from 'react'
import style from "./Layout.module.css"

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'


export default function Layout() {
 
  return <>
<Navbar/>
<Outlet></Outlet>
<Footer/>

  </>
}

import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import { Link,NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { CounterContext } from '../Context/CounterContext'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Cart/CartContext'
export default function Navbar() {
  let {counter}= useContext(CounterContext);
  let {userToken , setUserToken}=useContext(UserContext);
let navigate=useNavigate()
  const {numberOfItems}=useContext(CartContext)
function logOut(){
    localStorage.removeItem('userToken');
    setUserToken(null );
    navigate('/Login')
}

  return <>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
  <Link className="navbar-brand" to='/'>
    <img src={logo} alt="fresh market logo" />
  </Link>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        
        {userToken !=null?<>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home"> Home   </Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Products">Products</Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Categories">Categories</Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Brands">Brands</Link>
          </li>
          
  
          </>:''
}
      </ul>



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
{userToken!==null ?<>   


  <li className='position-relative'>
          <Link className="nav-link active" aria-current="page" to="/cart">  Cart  <i className='fa fa-shopping-cart text-main fs-3'></i>
<span  className='bg-main p-1  rounded text-white top-0 end-0'>1
          </span>

           </Link>
          </li>  
          <li className="nav-item "> <Link className="nav-link active " aria-current="page" to="/Profile">My Profile</Link></li>
   
   <li className="nav-item">
  <button onClick={() => logOut()} className=" cursor-pointer btn">Logout</button>
    </li>
          </>
           :<>
          
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
          </li>
          </>}
      <li className="nav-item d-flex align-items-center">
<i className='fab fa-facebook mx-2'></i>
<i className='fab fa-twitter mx-2'></i>
<i className='fab fa-instagram mx-2'></i>
<i className='fab fa-tiktok mx-2'></i>
<i className='fab fa-youtube mx-2'></i>

</li>
 
      </ul>
    </div>
  </div>
</nav>


  </>
}

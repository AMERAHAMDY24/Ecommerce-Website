import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Product/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound/NotFound'
import Brands from './components/Brand/Brands'
import CounterContextProvider from './components/Context/CounterContext';
import Navbar from './components/Navbar/Navbar';
import UserContextProvider, { UserContext } from './components/Context/UserContext';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
 import ProductDetails from './components/ProductDetails/ProductDetails'
import { CartContext, CartContextProvider } from './components/Cart/CartContext';
import { Toaster } from 'react-hot-toast';
import UserProfile from './components/UserProfile/UserProfile';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';



//routing

let routers= createBrowserRouter([

  {path:'/',element:<Layout/>,children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'Home', element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'login', element:<Login/>},
    {path:'register', element:<Register/>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>  },
    {path:'Products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'ProductDetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>  },
    {path:'Brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'Profile', element:<ProtectedRoute><UserProfile/></ProtectedRoute>  },
    {path:'CheckOut', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},

    {path:'Categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'*', element:<NotFound/>}
]}
])
// usercontextProvider extend all app with userToken

export default function App() {

  let {setUserToken}=useContext(UserContext)

  useEffect( ()=>{
    if(localStorage.getItem('userToken')!= null){
      setUserToken(localStorage.getItem('userToken'))
    }})

  return <>

<CartContextProvider>

<CounterContextProvider>

<RouterProvider router={routers} ></RouterProvider>

</CounterContextProvider>
<Toaster/>
</CartContextProvider>


  </>
}

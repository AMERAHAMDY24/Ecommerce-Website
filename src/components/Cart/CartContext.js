import axios from "axios";
import { createContext, useState } from "react";

export let CartContext=createContext();




export  function CartContextProvider(props){
let headers={
    token:localStorage.getItem('userToken')
} 
const [numberOfItems,setNumberOfItems]=useState(0)



async function OnlinePayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/65de643abe8b52323556bc83?url=http://localhost:3000`,{
shippingAddress    },{
    headers:headers
}).then((response)=>response)
    .catch((error)=>error)
}



function addToCart(productId){
return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
    productId:productId
},{
    headers:headers
}).then((response) => {
    setNumberOfItems(response.numOfCartItems)
})
.catch((error) => error);

    }


    async function getLoggedUserCart(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        }).then((response)=>response)
        .catch((error)=>error)
        }


function removeCartItem (productId){
 return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
    headers:headers
}).then((response)=> response).catch((error)=>error)
        }

function updateProductQuantity(productId,count){
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count},{headers}
            ).then((response)=>response)
            .catch((error)=>error)
            
        }

function clearCart(){
return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
headers:headers
            }).then((response)=> response).catch((error)=>error)

        }









    return <CartContext.Provider value={{addToCart ,getLoggedUserCart,removeCartItem,updateProductQuantity,clearCart,numberOfItems,OnlinePayment}}>
{props.children}

    </CartContext.Provider>
}
import { createContext, useState } from "react";

export let CounterContext=createContext();

//react component function
//يعني اقدر ابعتله props
export default function CounterContextProvider(props){
let [counter,setCounter]=useState(0)
let [userName,setuserName]=useState('')


function changeCounter(){
setCounter(Math.random)

}
    return <CounterContext.Provider value={{counter,userName,changeCounter}} >
         {props.children}
    </CounterContext.Provider>
}
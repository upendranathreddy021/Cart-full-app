import axios from "axios"
import { useContext, useEffect, useState } from "react"
import './Home.css'
import Gc from "./Gc"
import { useNavigate } from "react-router-dom"

let Home=()=>{
    let [data,setData]=useState([])
    let contobj=useContext(Gc)
    let navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:5000/prod/get").then((res)=>{
            setData(res.data)
        })
    },[])
    let add=(item)=>{
        let obj={"pid":item._id,"uid":contobj.contr.uid,"pimg":item.pimg,"price":item.price,"desc":item.desc,"name":item.name}
        axios.post("http://localhost:5000/cart/add",obj,{"headers":{"Authorization":contobj.contr.token}}).then((res)=>{
            if(res.data=="please login") 
            {
                navigate("/login")
            }
            else{
                axios.get(`http://localhost:5000/cart/get/${contobj.contr.uid}`,{"headers":{"Authorization":contobj.contr.token}}).then((res)=>{
                    contobj.stateupdate({...contobj.contr,"carttotal":res.data.length})
                })

            }
        })
    }
    return(
        <div className="con">
            {
                data.map((item,index)=>{
                    return(
                        <div className="prod" key={index}>
                            <div className="img">
                                <img src={`http://localhost:5000/imgs/${item.pimg}`}/>
                            </div>
                            <h1>Name:{item.name}</h1>
                            <h2>Cat:{item.cat}</h2>
                            <h2>Price:{item.price}</h2>
                            <h2>desc:{item.desc}</h2>
                            <button onClick={()=>add(item)}>Addcart</button>
                        </div>
                    )


                })
                
            }

        </div>
    )
}
export default Home
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Gc from "./Gc"
import './Cart.css'

let Cart=()=>{
    let obj=useContext(Gc)
    let [cart,setCart]=useState([])
    let [err,setErr]=useState("")
    let [total,setTotal]=useState(0)
    let getcart=()=>{
        axios.get(`http://localhost:5000/cart/get/${obj.contr.uid}`,{"headers":{"Authorization":obj.contr.token}}).then((res)=>{
           
        if(res.data=="please login")
       {
           setErr(res.data)
       }
       else  if(res.data.length==0)
       {
        obj.stateupdate({...obj.contr,"carttotal":res.data.length})
           setErr("your cart is empty")
       }

       else{
           setCart(res.data)
           obj.stateupdate({...obj.contr,"carttotal":res.data.length})
           let sum=0
           for(let i=0;i<res.data.length;i++)
           {
            sum=sum+res.data[i].qty*res.data[i].price

           }
           setTotal(sum)
       }
   })
    }
    useEffect(()=>{
        getcart()
       
    },[])
 
    let dec=(id)=>{

        axios.put("http://localhost:5000/cart/dec",{"_id":id},{"headers":{"Authorization":obj.contr.token}}).then(()=>{
        getcart()
        })
    }
    let inc=(id)=>{

        axios.put("http://localhost:5000/cart/inc",{"_id":id},{"headers":{"Authorization":obj.contr.token}}).then(()=>{
        getcart()
        })
    }
    let del=(id)=>{
        axios.delete(`http://localhost:5000/cart/delete/${id}`,{"headers":{"Authorization":obj.contr.token}}).then(()=>{
            getcart()
    })

    }
    return(
        <div>
            {err!=""&&<div>{err}</div>}
            {err==""&&<div className="con">
               { cart.map((item)=>{
                    return(
                        <div className="prod">
                        <div className="img">
                            <img src={`http://localhost:5000/imgs/${item.pimg}`}/>
                        </div>
                        <h1>Name:{item.name}</h1>
                        <h2>Price:{item.price}</h2>
                        <h2>desc:{item.desc}</h2>
                        <h2>Total:{item.price*item.qty}</h2>
                        
                        <h2><button onClick={()=>dec(item._id)}>-</button>{item.qty}<button onClick={()=>inc(item._id)}>+</button></h2>
                        <button onClick={()=>del(item._id)}>delete</button>
                        
                    </div>
                        

                    )

                })
            }
            <h1>Carttotal:{total}</h1>
                </div>}

        </div>
    )

}
export default Cart
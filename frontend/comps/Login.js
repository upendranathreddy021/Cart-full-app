import axios from "axios"
import { useContext, useState } from "react"
import Gc from "./Gc"
import { useNavigate } from "react-router-dom"

let Login=()=>{
    let [data,setData]=useState({})
    let [err,setErr]=useState()
    let obj=useContext(Gc)
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let login=()=>{
        axios.post("http://localhost:5000/user/login",data).then((res)=>{
        let conobj=new Object()   
        if(res.data.token!=undefined)
            {
                conobj.islogin=true
                conobj.token=res.data.token
                conobj.uid=res.data._id
                conobj.name=res.data.name
                if(res.data.role=='admin')
                {
                    conobj.isadmin=true
                }
                else{
                    conobj.isadmin=false
                }
                axios.get(`http://localhost:5000/cart/get/${conobj.uid}`,{"headers":{"Authorization":conobj.token}}).then((res)=>{
                    conobj.carttotal=res.data.length
                    obj.stateupdate(conobj)
                    navigate("/")
                })

               
              bhn  
                
            }
            else{
                setErr(res.data)
            }
       
        })
    }
    return(
        <div className="login">
            <div>{err}</div>
         
        <input type="text" name="_id" placeholder="enter email" onChange={fun}/>
<input type="password" name="password" placeholder="enter passowrd" onChange={fun}/>
            <button onClick={login}>Login</button>


        </div>
    )
}
export default Login
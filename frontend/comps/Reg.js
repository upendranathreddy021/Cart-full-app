import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

let Reg=()=>{
    let [data,setData]=useState({})
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let reg=()=>{
        axios.post("http://localhost:5000/user/reg",data).then((res)=>{
            if(res.data=="acc created")
            {
                navigate("/login")
                setErr("")
            }
            else{
                setErr(res.data)
            }

        })
    }
    return(
        <div className="reg">
            <div style={{"color":"red"}}>{err}</div>
            <input type="email" name="_id" placeholder="enter email" onChange={fun}/>
            <input type="text" name="name" placeholder="enter name" onChange={fun}/>
            <input type="password" name="password" placeholder="enter password" onChange={fun}/>
            <input type="text" name="phno" placeholder="enter phno" onChange={fun}/>
            <button onClick={reg}>Register</button>

        </div>
    )

}
export default Reg
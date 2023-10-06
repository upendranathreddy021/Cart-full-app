import axios from "axios"
import { useContext, useState } from "react"
import Gc from "./Gc"

let Addprod=()=>{
    let [data,setData]=useState({})
    let [err,setErr]=useState("")
    let obj=useContext(Gc)

    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }
    let fun1=(e)=>{
        setData({...data,[e.target.name]:e.target.files[0]})
    }
    let add=()=>{
        let fomobj=new FormData()
        for(let k in data)
        {
            fomobj.append(k,data[k])
        }
        axios.post("http://localhost:5000/prod/add",fomobj,
        {"headers":{"Authorization":obj.contr.token,"uid":obj.contr.uid}})
        .then((res)=>{
          setErr(res.data)

        })
    }

    return(
        <div>
            <div style={{"color":"orange"}}>{err}</div>
    <input type="text" placeholder="enter prod name" name="name" onChange={fun}/>
    <input type="text" placeholder="enter prod price" name="price" onChange={fun}/>
        <input placeholder="enter desc" type="text" name="desc" onChange={fun}/>
            <input type="text" placeholder="enter cat" name="cat" onChange={fun}/>
            <input type="file" name="pimg" onChange={fun1}/> 
            <button onClick={add}>Addprod</button>
        </div>
    )
}
export default Addprod
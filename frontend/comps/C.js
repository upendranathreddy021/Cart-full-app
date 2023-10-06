import { useState } from "react";

let C=()=>{
    let [ind,setind]=useState(0)
    let arr=[]



    return(
        <div>
            <img src={arr[ind]} alt="imgarray"/>
            <button disabled={ind===arr.length} onClick={()=>setind(ind+1)}>next</button>
            <button disabled={ind===0} onClick={()=>setind(ind-1)}>prev</button>
        </div>
    )
}
export default C;
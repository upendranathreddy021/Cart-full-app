import { useContext } from 'react'
import {Link} from 'react-router-dom'
import Gc from './Gc'
import './Nav.css'
let Nav=()=>{
    let obj=useContext(Gc)
    return(<nav>
        <Link to="/">Home</Link>
        {!obj.contr.islogin&&   <Link to="/reg">Register</Link>}
      {!obj.contr.islogin&&  <Link to="/login">Login</Link>}
      {obj.contr.islogin&&obj.contr.isadmin&&   <Link to="/add">Addprod</Link>}
      {obj.contr.islogin&&  <Link to="/cart">Cart<button>{obj.contr.carttotal}</button></Link>}
      {obj.contr.islogin&&   <div>{obj.contr.name}</div>}
       
    </nav>)
}
export default Nav
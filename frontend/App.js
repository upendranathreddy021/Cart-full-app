import {BrowserRouter,Routes,Route,} from 'react-router-dom'
import Home from './comps/Home'
import Gc from './comps/Gc'
import Nav from './comps/Nav'
import Login from './comps/Login'
import Reg from './comps/Reg'
import { useState } from 'react'
import Addprod from './comps/Addprod'
import Cart from './comps/Cart'
let App=()=>{
  let [contr,setcontr]=useState({"token":"","uid":"","islogin":"","isadmin":false,"carttotal":0})
  let fun=(objs)=>{
    console.log(objs)
    setcontr({...objs})
  }
  let obj={"contr":contr,"stateupdate":fun}

return(
  <BrowserRouter>
  <Gc.Provider value={obj}>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/reg" element={<Reg/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/add" element={<Addprod/>}/>
    <Route path="/cart" element={<Cart/>}/>

  </Routes>
  </Gc.Provider>
  </BrowserRouter>
)}
export default App
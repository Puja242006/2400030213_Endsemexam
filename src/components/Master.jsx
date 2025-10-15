import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Kids from './Kids'
import Electronics from './Electronics'
import Fashion from './Fashion'



const Master = () => {
  return (
    <div>
        <Link to="/electronics">Electronics</Link>&nbsp;
        <Link to="/fashion">Fashion</Link>&nbsp;
        <Link to="/kids">Kids</Link>&nbsp;
      <Routes>
        <Route path='/electronics' element={<Electronics></Electronics>}></Route>
        <Route path='/fashion' element={<Fashion></Fashion>}></Route>
        <Route path='/kids' element={<Kids></Kids>}></Route>
      </Routes>
    </div>
  )
}

export default Master

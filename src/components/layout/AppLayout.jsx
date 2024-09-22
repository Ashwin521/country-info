import React from 'react'
import Headers from '../UI/Headers'
import { Outlet } from 'react-router-dom'
import Footers from '../UI/Footers'
const AppLayout = () => {
  return (
    <>
    
    <Headers/>
    <Outlet/>
    <Footers/>
    </>
  )
}

export default AppLayout

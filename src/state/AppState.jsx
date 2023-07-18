import React from 'react'

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EmployeeHomePage from '../pages/EmployeeHomePage';
import NewOrder from '../pages/NewOrder';


export default function AppState() {


    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeHomePage/>}/>
        <Route path="/neworder" element={<NewOrder/>}/>
      </Routes>
    </BrowserRouter>
  )
}

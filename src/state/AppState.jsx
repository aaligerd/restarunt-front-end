import React from 'react'

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EmployeeHomePage from '../pages/EmployeeHomePage';


export default function AppState() {


    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeHomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

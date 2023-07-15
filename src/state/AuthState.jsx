import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EmployeeLoging from "../pages/EmployeeLoging";
import ForgetPassword from '../pages/ForgetPassword';
import EnterOTP from '../pages/EnterOTP';
import Newpassword from '../pages/Newpassword';



export default function AuthState() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" Component={EmployeeLoging} />
          <Route path="/forgetpassword" Component={ForgetPassword} />
          <Route path="/forgetpassword/otp" Component={EnterOTP} />
          <Route path="/newpassword" Component={Newpassword} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

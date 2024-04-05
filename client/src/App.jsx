import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Product from "./pages/Product";
import CalculationPage from "./pages/Calculation";
import AdminEdit from "./pages/AdminEdit";
export default function App()
{
  return(
    <>
      
        <Routes>
          <Route index element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Product />} />
          <Route path="/calculation/:Co2/:name" element={<CalculationPage />} />
          <Route path="/admin/:token" element={<AdminEdit />} />
        </Routes>
      
    </>
  )
}

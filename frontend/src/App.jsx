import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
export default function app(){
  return(
    <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </>
  )
}
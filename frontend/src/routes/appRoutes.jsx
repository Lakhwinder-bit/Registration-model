import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Account from "../pages/account";
import Create from "../pages/creteAccount"
import Forget from "../pages/forgetPassword"
import ResetPassword from "../pages/resetPasswod";

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/create" element={<Create />} />
       <Route path="/forget" element={<Forget />} />
       {/* <Route path="/reset-password/token:" element={<ResetPassword />} /> */}
         <Route
    path="reset-password/:token"
    element={<ResetPassword />}
  />
    </Routes>
  );
}
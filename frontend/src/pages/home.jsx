import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../compontent/button";
import { Link } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
const [loadingBtn, setLoadingBtn] = useState("");
const handleLogin = () => {
  setLoadingBtn("login");

  setTimeout(() => {
    navigate("/login");
  }, 1000);
};

const handleCreateAccount = () => {
  setLoadingBtn("create");

  setTimeout(() => {
    navigate("/create");
  }, 1000);
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3">
      <div className="w-full max-w-[400px] h-[95vh] bg-gray-50 border border-gray-300 rounded-2xl p-5 overflow-hidden flex flex-col">
        {/* Image Section - 70% */}
        <div className="flex-[7]">
          <img
            src="https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Welcome"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Content Section - 30% */}
        <div className="flex-[3] flex flex-col justify-center pt-2 ">
          <h1 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Welcome to Hero
          </h1>

          <p className="text-sm sm:text-sm md:text-md  text-gray-500 mb-4 ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate!
          </p>

<Button
  text="Create Account"
   loading={loadingBtn === "create"}
  onClick={handleCreateAccount}
/>
<div className="mt-2"></div>
        <Button
  text="Already Registered? Login"
  loading={loadingBtn === "login"}
  onClick={handleLogin}
/>
        </div>

      </div>
    </div>
  );
}



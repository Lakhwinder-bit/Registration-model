import { useState } from "react";
import { Lock, User, Eye, EyeOff, Shield, Verified } from "lucide-react";
import Button from "../compontent/button";
import { Navigate, useNavigate } from "react-router-dom";
import { forget_api, login_api } from "../api/api_auth";

export default function Login() {
    const [loadingBtn, setLoadingBtn] = useState("");
    const [errors, setErrors] = useState({});
     const navigate = useNavigate();
     const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
email:""
  });


  const handelClick = ()=>{
    //  window.open("https://mail.google.com", "_blank");
     setIsVerified(true)
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          if (!formData.email.trim()) {
    setErrors({
      email: "Email is required",
    });
    return;
  }
        setLoadingBtn("Login");
const data = await forget_api(formData)

       console.log(data)

    } 
    catch (error) {

    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  } 
  finally {
  
     setLoadingBtn("");
   
  }

  
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Icon */}
     <div className="flex justify-center">
  <div
    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
      isVerified && formData.email.trim()
        ? "bg-green-100 scale-110 shadow-lg"
        : "bg-blue-50 shadow-md"
    }`}
  >
    <Verified
      size={38}
      className={`transition-all duration-500 ${
        isVerified && formData.email.trim()
          ? "text-green-600"
          : "text-blue-600"
      }`}
    />
  </div>
</div>

        {/* Heading */}
      <h1
  className={`text-4xl font-bold text-center mt-5 transition-all duration-500 ${
    isVerified && formData.email.trim()
      ? "text-green-600 scale-105"
      : "text-blue-600"
  }`}
>
  Forget Password
</h1>

<p
  className={`text-center mt-3 text-sm transition-all duration-500 ${
    isVerified && formData.email.trim()
      ? "text-green-600 font-medium"
      : "text-gray-500"
  }`}
>
  {isVerified && formData.email.trim()
    ? "We've sent a password reset link to your email."
    : "Please check your inbox and click the reset link to continue."}
</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>

            <div
  className={`mt-2 flex items-center border rounded-xl px-3 h-12 transition-all duration-300 ${
    isVerified && formData.email.trim()
      ? "border-green-300 shadow-sm"
      : "border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
  } `
  }
>
  <User
    size={18}
    className={`transition-colors duration-300 ${
      isVerified && formData.email.trim()
        ? "text-green-500"
        : "text-gray-400"
    }`}
  />

  <input
    type="text"
    name="email"
    placeholder="Enter your Email"
    value={formData.email}
    onChange={handleChange}
    className="w-full outline-none px-3 bg-transparent"
  />

</div>
  {errors.email && (
  <p className="text-red-500 text-sm mt-2">
    {errors.email}
  </p>
)}
          </div>

       

          {/* verify Button */}
        
            <div className="mt-6">
          <Button
            text={
              isVerified && formData.email.trim()
                ? "✓ Gmail Opened"
                : "Open Gmail"
            }
          onClick={handelClick}
          />
        </div>
       

          {/* Divider */}
          <div className="flex items-center gap-4 mt-5">
            <div className="flex-1 border-t"></div>
            <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Register */}
         <p className="text-center text-gray-500 mt-6">
  Don't have an account?{" "}
  <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition-colors">
    <a href="/create">Register</a>
  </span>
</p>
        </form>
      </div>
    </div>
  );
}

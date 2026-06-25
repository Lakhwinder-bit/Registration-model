import { useState } from "react";
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react";
import Button from "../compontent/button";
import { Navigate, useNavigate } from "react-router-dom";
import { login_api } from "../api/api_auth";

export default function Login() {
    const [loadingBtn, setLoadingBtn] = useState("");
     const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoadingBtn("Login");

        const data = await login_api(formData);
        
                setTimeout(() => {
   navigate("/account");
  }, 1000);
        console.log(data);


    } 
    catch (error) {
                setTimeout(() => {
   navigate("/");
  }, 1000);
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  } 
  finally {
   
    setFormData({ username: "", password: "" });
  }

  
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
            <Shield className="text-blue-600" size={38} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-600 text-center mt-5">
          Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome back! Please login to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Username */}
          <div>
            <label className="font-medium text-gray-700">Username</label>

            <div className="mt-2 flex items-center border rounded-lg px-3 h-12">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full outline-none px-3"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">Password</label>

            <div className="mt-2 flex items-center border rounded-lg px-3 h-12">
              <Lock size={18} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none px-3"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-400" />
                ) : (
                  <Eye size={20} className="text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex justify-end mt-3">
              <a href="/forget">
              <button
                type="button"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot Password?
              </button>
              </a>
            </div>
          </div>

          {/* Login Button */}
          <Button
            text="Login"
             loading={loadingBtn === "Login"}
           
          />
    

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t"></div>
            <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Register */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            <a href="/create">  Register</a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

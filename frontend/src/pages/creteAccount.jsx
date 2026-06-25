import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Briefcase,
  Lock,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../compontent/button";
import { register_api } from "../api/api_auth";
import { validateRegisterForm } from "../utils/form_validaction";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loadingBtn, setLoadingBtn] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { confirmPassword, ...userData } = formData;

    try {
      setLoadingBtn("add");

      const data = await register_api(userData);
      console.log(data);

      alert("Register Successfully");

      setFormData({
        name: "",
        username: "",
        mobile: "",
        email: "",
        designation: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoadingBtn("");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 outline-none focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-md shadow-md p-8">
        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-blue-600 p-4 rounded-full text-white">
            <UserPlus size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-blue-700">
              Create New Account
            </h1>

            <p className="text-gray-500">
              Please fill in the details to register
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="font-semibold text-gray-700">
              Registration Name
            </label>

            <div className="relative mt-2">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="font-semibold text-gray-700">
              Username
            </label>

            <div className="relative mt-2">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={inputClass}
              />
            </div>

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="font-semibold text-gray-700">
              Mobile
            </label>

            <div className="relative mt-2">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className={inputClass}
              />
            </div>

            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-gray-700">
              Email-id
            </label>

            <div className="relative mt-2">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email-id"
                className={inputClass}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="font-semibold text-gray-700">
              Designation
            </label>

            <div className="relative mt-2">
              <Briefcase
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select your designation
                </option>
                <option value="Developer">
                  Developer
                </option>
                <option value="Designer">
                  Designer
                </option>
                <option value="Manager">
                  Manager
                </option>
              </select>
            </div>

            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.designation}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-gray-700">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={inputClass}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-semibold text-gray-700">
              Confirm Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={inputClass}
              />
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            text="Create Account"
            loading={loadingBtn === "add"}
          />

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
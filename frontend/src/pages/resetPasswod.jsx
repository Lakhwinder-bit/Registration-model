import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { Lock } from "lucide-react";
import { resetPasswordApi } from "../api/api_auth";
import Button from "../compontent/button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [errors, setErrors] = useState({});
  const [loadingBtn, setLoadingBtn] = useState("");

  const [formData, setFormData] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.password ||
      !formData.confirmPassword
    ) {
      return alert(
        "Please fill all fields"
      );
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return alert(
        "Passwords do not match"
      );
    }

    try {
      setLoadingBtn("update");

      const data =
        await resetPasswordApi(
          token,
          {
            password:
              formData.password,
          }
        );

      alert(data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
       setLoadingBtn("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label>
              New Password
            </label>

            <div className="border rounded-lg flex items-center px-3 h-12 mt-2">
              <Lock size={18} />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className="w-full px-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label>
              Confirm Password
            </label>

            <div className="border rounded-lg flex items-center px-3 h-12 mt-2">
              <Lock size={18} />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                className="w-full px-3 outline-none"
              />
            </div>
          </div>
               <Button
                      text="Update Password"
                      loading={loadingBtn === "update"}
                    />

       
        </form>
      </div>
    </div>
  );
}
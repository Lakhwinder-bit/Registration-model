import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../compontent/button";
import { getMe_api } from "../api/api_auth";
import { logOut_api } from "../api/api_auth";
export default function Account() {
const navigate = useNavigate()
const [loadingBtn, setLoadingBtn] = useState("");
  const [data,setdata]=useState({})
  useEffect(()=>{
 fetchUser()
  },[])

const fetchUser = async ()=>{
  try {
    const res = await getMe_api();
    setdata(res.data)
  
  } catch (error) {
     console.error(error.response?.data);
       alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }

}
const handlelogout = async ()=>{
try {
   setLoadingBtn("logout");
   const res = await logOut_api();;
  setTimeout(() => {
    navigate("/create");
  }, 2000);
  
} catch (error) {
  console.error(error.response?.data?.message)
     alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
}
finally{

}
}

  const handleLogin = ()=>{
    setLoadingBtn("back");
  setTimeout(() => {
    navigate("/");
  }, 1000);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3">
      <div className="w-full max-w-[400px] min-h-[95vh] bg-gray-50 border border-gray-300 rounded-2xl p-5 flex flex-col ">
      
{/* Heading */}
        <div className="mb-3 mt-5">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Account Settings
          </h1>
        
        </div>
        <div className="bg-gray-200 p-3 rounded-xl pt-5">
          {/* Profile Section */}
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />

              <button className="absolute bottom-0 right-0 w-7 h-7 bg-violet-600 rounded-full flex items-center cursor-pointer justify-center text-white">
                <svg className="w-5 h-5"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z" fill="#000000"></path> </g></svg>
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 ">
              {data?.username || "Guest User"}
              </h2>
              <p className="text-lg text-gray-600">
               {data?.email || "No Email"}
              </p>
                <p className="text-lg text-gray-600">
               {data?.designation || "No designation"}
              </p>
            </div>
          </div>

      <div className="mt-5"></div>
        <Button
  text="Back To Home.."
  loading={loadingBtn === "back"}
  onClick={handleLogin}
/>
 <div className="mt-2"></div>
        <Button
  text="Logout"
  className=""
  loading={loadingBtn === "logout"}
  onClick={handlelogout}
/>
        </div>
          <div className="border-b border-dashed border-gray-400 mt-6"></div>
            <div className="h-[200px] border-b border-dashed border-gray-400"></div>

      
      
      </div>
    </div>
  );
}
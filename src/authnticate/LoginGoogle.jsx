import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../contexts/Authcontexts";
import toast from "react-hot-toast";
const LoginGoogle = () => {

      const {siginwithGoogle}=useContext(AuthContext)

      const handleGoogle=()=>{
            siginwithGoogle()
            .then(()=>{
                toast.success('successfully login ... done .....')
            })
            .catch(error=>console.log(error))
      }
  return (
    <div className="ml-5 mr-5">
      <div className="bg-purple-50">
        <div>
          <div className="">
            <div className="flex justify-center items-center py-32">
              <div onClick={handleGoogle} className="border-2 rounded-xl p-3 flex gap-5">
                  <FaGoogle className="text-red w-6 h-6"></FaGoogle>
                  <p className="">Continue with Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGoogle;

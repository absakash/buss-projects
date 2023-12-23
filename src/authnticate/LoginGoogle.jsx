import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../contexts/Authcontexts";
import toast from "react-hot-toast";
const LoginGoogle = () => {

      const {siginwithGoogle,signOutt,user}=useContext(AuthContext)

      const handleGoogle=()=>{
            siginwithGoogle()
            .then(()=>{
                toast.success('successfully login ... done .....')
            })
            .catch(error=>console.log(error))
      }
      const handleOut=()=>{
        signOutt(()=>{
          toast.success("log out done ...")
        })
        .catch(error=>console.log(error))
      }
  return (
    <div className="ml-5 mr-5">
      <div className="bg-purple-50">
        <div>
          <div className="">
            <div className="flex justify-center items-center py-32">
              <div  className="border-2 rounded-xl p-3 flex gap-5">
                  {
                    user?
                    <p onClick={handleOut}>log out</p>
                    :<>
                    <FaGoogle className="text-red w-6 h-6"></FaGoogle>
                  <p onClick={handleGoogle} className="">Continue with Google</p>
                    </>
                  }
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGoogle;

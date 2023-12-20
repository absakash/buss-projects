import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Bookings from "../bookings/Bookings";
import Home from "../home/Home";
import SelectSit from "../bookings/SelectSit";
import LoginGoogle from "../authnticate/LoginGoogle";

const router=createBrowserRouter([
      {
            path:'/',
            element:<MainLayout></MainLayout>,
            children:[
                  
                  {
                        path:'/',
                        element:<Home></Home>
                  },
                  {
                        path:'/bookings',
                        element:<Bookings></Bookings>
                  },
                  {
                        path:'/selectsit',
                        element:<SelectSit></SelectSit>
                  },
                  {
                        path:'/signin',
                        element:<LoginGoogle></LoginGoogle>
                  },
                  {
                        path:'*',
                        element:<div>not build uet</div>
                  }
            ]



      }
])

export default router;
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Bookings from "../bookings/Bookings";
import Home from "../home/Home";
import SelectSit from "../bookings/SelectSit";
import LoginGoogle from "../authnticate/LoginGoogle";
import PrivateRouter from "./PrivateRouter";
import Shedule from "../bookings/Shedule";
import PaymentSuccess from "../bookings/PaymentSuccess";
import PaymentFail from "../bookings/PaymentFail";
import SeeTicket from "../bookings/SeeTicekt";

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
                        path:'/payment/success/:tranId',
                        element:<PaymentSuccess></PaymentSuccess>
                       
                  },
                  {
                        path:'/payment/fail/:tranId',
                        element:<PaymentFail></PaymentFail>
                       
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
                        path:'/schedule',
                        element:<Shedule></Shedule>
                  },
                  {
                        path:'/seeticket',
                        element:<SeeTicket></SeeTicket>
                  },
                  {
                        path:'*',
                        element:<div>not build uet</div>
                  }
            ]



      }
])

export default router;
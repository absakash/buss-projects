import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import "react-day-picker/dist/style.css";


const Bookings = () => {
      const [fees, setFees] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selected, setSelected] = React.useState(new Date());

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  const onSubmit = (data) =>{
      console.log("total data ",data);
      console.log("total data ",data.to);
      calculateFees(data);
  }


  const calculateFees = (data) => {
      const startingLocation = data.from;
      const destinationLocation = data.to;
  
      // Add your logic to calculate fees based on locations
      // For example, you can have a predefined list of fees for different routes
      // Here, I'm using a simple example with a fixed fee for each location
      const feesMap = {
        Dhaka: 50,
        Magura: 60,
        Khulna: 70,
        Benapol: 80,
        Rajsahi: 90,
        Chittagong: 100,
        Jhinaidah: 110,
        Faridpur: 120,
      };
  
      const startingFees = feesMap[startingLocation] || 0;
      const destinationFees = feesMap[destinationLocation] || 0;
  
      // Calculate total fees
      const totalFees = startingFees + destinationFees;
      setFees(totalFees);
    };
  

  return (
    <div className="ml-5 mr-5">
      <div className="flex p-10">
        <div className="w-1/2">
          <div>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              footer={footer}
            />
          </div>
        </div>

        <div className="w-1/2 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                placeholder="enter your phone number"
                className="input input-bordered input-info w-full "
                defaultValue=""
                {...register("phone", { required: "Phone number is required" })}
              />
              <p className="text-red-600">{errors?.phone?.message}</p>
            </div>
            <div>
              <input
                placeholder="enter your name"
                className="input input-bordered input-info w-full mt-2"
                defaultValue=""
                {...register("name", { required: "Name is required" })}
              />
              <p className="text-red-600">{errors?.name?.message}</p>
            </div>
           <p className="mt-2 underline">
            starting
           </p>
            <select {...register("from")} className="input w-full mt-2 input-bordered">
              <option value="" disabled selected hidden>
                starting location
              </option>
              <option value="Dhaka">Dhaka</option>
              <option value="Magura">Magura</option>
              <option value="Khulna">Khulna</option>
              <option value="Benapol">Benapol</option>
              <option value="Rajsahi">Rajsahi</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Jhinaidah">Jhinaidah</option>
              <option value="Faridpur">Faridpur</option>
            </select>

            <p className="mt-2  underline">
            Ending
           </p>

            <select {...register("to")} className="input input-bordered w-full mt-2">
              <option value="" disabled selected hidden>
                destination location
              </option>
              <option value="Dhaka">Dhaka</option>
              <option value="Magura">Magura</option>
              <option value="Khulna">Khulna</option>
              <option value="Benapol">Benapol</option>
              <option value="Rajsahi">Rajsahi</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Jhinaidah">Jhinaidah</option>
              <option value="Faridpur">Faridpur</option>
            </select>

            <div className="flex justify-center btn btn-outline mt-5 bg-purple-300">
              <input type="submit" />
            </div>

            <p> value = {fees? fees: "no "} </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

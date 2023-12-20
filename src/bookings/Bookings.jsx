import React, { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import "react-day-picker/dist/style.css";
import { Link } from "react-router-dom";

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

  const onSubmitClick = (data) => {
   const feesMap = {
      Dhaka: 100,
      Magura: 400,
      Khulna: 70,
      Benapol: 80,
      Rajsahi: 90,
      Chittagong: 100,
      Jhinaidah: 110,
      Faridpur: 120,
    };

    let totalFees = 0;
    const startingLocation = data.from;
    const destinationLocation = data.to;
    if (startingLocation === 'Dhaka' && destinationLocation === 'Magura') {
      totalFees = 500; // Example: Special fee for Dhaka to Magura
    } else if (startingLocation === 'Dhaka' && destinationLocation === 'Khulna') {
      totalFees = 150; // Example: Special fee for Dhaka to Khulna
    } else if (startingLocation === 'Magura' && destinationLocation === 'Chittagong') {
      totalFees = 600; // Example: Special fee for Magura to Chittagong
    } else {
      // Use the default fees from the feesMap for other combinations
      const startingFees = feesMap[startingLocation];
      const destinationFees = feesMap[destinationLocation];
      totalFees = startingFees + destinationFees;

      setFees(totalFees)
      var hoccena=totalFees
    }


    const userInfo = {
      name: data.name,
      phone: data.phone,
      to: data.to,
      from: data.from,
      costs:hoccena
    };

    console.log("total data ", userInfo);


  };

  console.log("total data 1", fees);



  // const calculateFees = (data) => {
  //   const startingLocation = data.from;
  //   const destinationLocation = data.to;
  
   
  //   const feesMap = {
  //     Dhaka: 100,
  //     Magura: 400,
  //     Khulna: 70,
  //     Benapol: 80,
  //     Rajsahi: 90,
  //     Chittagong: 100,
  //     Jhinaidah: 110,
  //     Faridpur: 120,
  //   };
  
  //   if (feesMap.hasOwnProperty(startingLocation) && feesMap.hasOwnProperty(destinationLocation)) {
  //     let totalFees = 0;
  
  //     if (startingLocation === 'Dhaka' && destinationLocation === 'Magura') {
  //       totalFees = 500; // Example: Special fee for Dhaka to Magura
  //     } else if (startingLocation === 'Dhaka' && destinationLocation === 'Khulna') {
  //       totalFees = 150; // Example: Special fee for Dhaka to Khulna
  //     } else if (startingLocation === 'Magura' && destinationLocation === 'Chittagong') {
  //       totalFees = 600; // Example: Special fee for Magura to Chittagong
  //     } else {
  //       const startingFees = feesMap[startingLocation];
  //       const destinationFees = feesMap[destinationLocation];
  //       totalFees = startingFees + destinationFees;
  //     }
  
  //     setFees(totalFees);
  //   } else {
  //     console.error("Invalid locations selected");
  //     setFees(0); 
  //   }
  // };


  

  // const calculateFees = (data) => {
  //   const startingLocation = data.from;
  //   const destinationLocation = data.to;

  //   const feesMap = {
  //     Dhaka: 100,
  //     Magura: 400,
  //     Khulna: 70,
  //     Benapol: 80,
  //     Rajsahi: 90,
  //     Chittagong: 100,
  //     Jhinaidah: 110,
  //     Faridpur: 120,
  //   };

  //   const startingFees = feesMap[startingLocation] || 0;
  //   const destinationFees = feesMap[destinationLocation] || 0;
   
  //   // Calculate total fees
  //   const totalFees = startingFees + destinationFees;
  //   setFees(totalFees);
  // };



  return (        
    <div className="ml-5 mr-5"> 
      <div className="md:flex p-10 md:gap-10">
        <div className="md:w-1/2 w-full border-2 rounded-2xl shadow-lg hover:scale-105">
          <div> 
            <DayPicker 
              mode="single"
              selected={selected}
              onSelect={setSelected}
              footer={footer}
            />
          </div>
        </div>

        <div className="md:w-1/2 sm:w-full mt-5">
          <form onSubmit={handleSubmit(onSubmitClick)}>
            <div>
              <input
                placeholder="Enter your phone number"
                className="input input-bordered input-info w-full hover:scale-105"
                defaultValue=""
                {...register("phone", { required: "Phone number is required" })}
              />
              <p className="text-red-600">{errors?.phone?.message}</p>
            </div>
            <div>
              <input
                placeholder="Enter your name"
                className="input input-bordered input-info w-full mt-2 hover:scale-105"
                defaultValue=""
                {...register("name", { required: "Name is required" })}
              />
              <p className="text-red-600">{errors?.name?.message}</p>
            </div>
            <p className="mt-2 underline hover:scale-105">starting</p>
            <select
              {...register("from")}
              className="input w-full mt-2 input-bordered hover:scale-105"
            >
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
            <p className="text-red-600">{errors?.from?.message}</p>

            <p className="mt-2  underline hover:scale-105">Ending</p>

            <select
              {...register("to")}
              className="input input-bordered w-full mt-2 hover:scale-105"
            >
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
            <p className="text-red-600">{errors?.to?.message}</p>

            <input
              className="flex justify-center btn btn-outline mt-5 bg-purple-300"
              type="submit"
              value="Go for Booking"
            />

            <div className="mx-auto flex justify-center">
            <p className="text-2xl mt-5 bg-red-50 btn btn-outline"> Your ticket price = {fees ? fees : "no "} </p>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

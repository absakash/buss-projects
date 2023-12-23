import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Select from "react-select";

const Bookings = () => {
  const [fees, setFees] = useState(0);
  const {
    register,
    handleSubmit,
    setValue, // Add setValue
    formState: { errors },
  } = useForm();

  const [selected, setSelected] = React.useState(new Date());

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {selected.toLocaleDateString()}.</p>;
  }

  const onSubmitClick = (data) => {
    console.log("all data ", data);
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
    const startingLocation = data.from?.value; // Use .value to get the selected value
    const destinationLocation = data.to?.value;
    if (startingLocation === "Dhaka" && destinationLocation === "Magura") {
      totalFees = 500; // Example: Special fee for Dhaka to Magura
    } else if (
      startingLocation === "Dhaka" &&
      destinationLocation === "Khulna"
    ) {
      totalFees = 150; // Example: Special fee for Dhaka to Khulna
    } else if (
      startingLocation === "Magura" &&
      destinationLocation === "Chittagong"
    ) {
      totalFees = 600; // Example: Special fee for Magura to Chittagong
    } else {
      // Use the default fees from the feesMap for other combinations
      const startingFees = feesMap[startingLocation];
      const destinationFees = feesMap[destinationLocation];
      totalFees = startingFees + destinationFees;

      setFees(totalFees);
    }

    const userInfo = {
      name: data.name,
      phone: data.phone,
      to: destinationLocation,
      from: startingLocation,
      costs: totalFees,
      date: data.date,
    };

    console.log("total data ", userInfo);
  };

  const options = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Magura", label: "Magura" },
    { value: "Khulna", label: "Khulna" },
    { value: "Benapol", label: "Benapol" },
    { value: "Rajsahi", label: "Rajsahi" },
    { value: "Chittagong", label: "Chittagong" },
    { value: "Jhinaidah", label: "Jhinaidah" },
    { value: "Faridpur", label: "Faridpur" },
  ];

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
            <div>
              <input
                type="date"
                placeholder="Enter your name"
                className="input input-bordered input-info w-full mt-2 hover:scale-105"
                defaultValue=""
                {...register("date", { required: "date is required" })}
              />
              <p className="text-red-600">{errors?.date?.message}</p>
            </div>

            <p className="mt-2 underline hover:scale-105">Starting</p>
            {/* option realted stated from here.... */}
            <Select
              {...register("from", {
                required: "Starting location is required",
              })}
              options={options}
              isSearchable
              placeholder="Select or search for starting location"
              onChange={(selectedOption) => setValue("from", selectedOption)}
            />
            <p className="text-red-600">{errors?.from?.message}</p>

            <p className="mt-2  underline hover:scale-105">Ending</p>
            <Select
              {...register("to", { required: "Ending location is required" })}
              options={options}
              isSearchable
              placeholder="Select or search for ending location"
              onChange={(selectedOption) => setValue("to", selectedOption)}
            />
            <p className="text-red-600">{errors?.to?.message

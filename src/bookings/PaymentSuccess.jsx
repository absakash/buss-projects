/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "bootstrap";
import toast from "react-hot-toast";
const PaymentSuccess = () => {
  const { tranId } = useParams();
  const userDate = localStorage.getItem("date");
  const departureCity = localStorage.getItem("departureCity");
  const arrivalCity = localStorage.getItem("arrivalCity");
  const navigate=useNavigate()
  const {
    data: bookedData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: "booked",
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/bookinfo/${tranId}`);
      const data = await res.json();
      //   console.log('the data', data);
      return data;
    },
  });

  if (isLoading) {
    return <div>it is loading.....</div>;
  }

  const updatesit = bookedData.bookInfo.selected[0].id;
  console.log("id", updatesit);

  const handleBlocksit = async () => {
    try {
      // Fetch the current seat information
      const res = await fetch("http://localhost:4000/alldata");
      const allData = await res.json();

      // Find and update the selected seat's status to blocked or reserved
      const updatedData = allData.map((data) => {
        return {
          ...data,
          schedule: {
            ...data.schedule,
            [userDate]: data.schedule[userDate].map((train) => {
              if (
                train.departureCity === departureCity &&
                train.arrivalCity === arrivalCity
              ) {
                return {
                  ...train,
                  seats: {
                    leftColum: train.seats.leftColum.map((left) =>
                      left.id === updatesit ? { ...left, blocked: true } : left
                    ),
                    rightColum: train.seats.rightColum.map((right) =>
                      right.id === updatesit
                        ? { ...right, blocked: true }
                        : right
                    ),
                  },
                };
              }
              return train;
            }),
          },
        };
      });

      // Log the selected seat information
      const selectedSeat = updatedData
        .map((data) => data.schedule[userDate])
        .flat()
        .find((train) =>
          train.seats.leftColum.some((seat) => seat.id === updatesit)
        );

      console.log("Selected Seat:", selectedSeat);

      // Log the updated data to the console
      console.log("Updated Data:", updatedData);

      // Update the seat status on the server
      await fetch("http://localhost:4000/updateSeats", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      // Refetch data to update the state with modified finalData
      await refetch();
    } catch (error) {
      console.error("Error blocking seat:", error);
    }
  };

  const handleme = async () => {
    const needy = {
      date: userDate,
      arrive: arrivalCity,
      departure: departureCity,
      sitblocked: updatesit,
    };

    try {
      const response = await fetch("http://localhost:4000/alldata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(needy),
      });

      if (!response.ok) {
        throw new Error("Failed to update seat.");
      }

      // Handle success, if needed
      console.log("Seat updated successfully");
      toast.success('see your tickets')
      navigate('/seeticket')
    } catch (error) {
      console.error("Error updating seat:", error);
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <div className="p-10">

      <p className="text-2xl">Your payment has done Successfully </p>
      <h1> your tranjection is is- {tranId}</h1>
       
       <p>to see your ticket click below </p>
      <button className="btn btn-outline bg-purple-100" onClick={handleme}>
            See Tickets
      </button>
    </div>
  );
};

export default PaymentSuccess;

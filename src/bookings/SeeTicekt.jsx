import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../shared/Loading";

const SeeTicket = () => {
  const userDate = localStorage.getItem("date");
  const departureCity = localStorage.getItem("departureCity");
  const arrivalCity = localStorage.getItem("arrivalCity");
  const ticketholder = localStorage.getItem("ticketHolder");
  const mobile = localStorage.getItem("mobile");
  const {
    data: finalData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: "user",
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/alldata");
      const allData = await res.json();
      console.log("all datass", allData);
      return allData;
    },
  });

  // const location = useLocation();
  // const selectedTrain = location.state?.selectedTrain || null;

  // console.log("Location state:", location.state);
  // console.log("Selected Train:", selectedTrain.trainName);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [baseTicketPrice, setBaseTicketPrice] = useState(0);
  useEffect(() => {
    // Set base ticket price based on some condition
    if (finalData && finalData.length > 0) {
      const firstTrain = finalData[0].schedule[userDate]?.[0];
      if (firstTrain) {
        setBaseTicketPrice(firstTrain.ticketCost);
      }
    }
  }, [finalData, userDate]);

  const handleSeatClick = async (seat) => {
    if (seat.disabled) {
      return;
    }

    const isSelected = selectedSeats.some(
      (selectedSeat) => selectedSeat.id === seat.id
    );

    if (isSelected) {
      // Seat is already selected, remove it from the list and update disabled status
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id)
      );
      seat.disabled = false; // Set the seat as not disabled
    } else {
      // Seat is not selected, add it to the list and update disabled status
      setSelectedSeats([...selectedSeats, seat]);
      seat.disabled = true; // Set the seat as disabled
    }

    // Refetch data to update the state with modified finalData
    await refetch();
  };

  const NumberofTicket = selectedSeats.length;
  useEffect(() => {
    // Set your base ticket price here
    const totalPrice = baseTicketPrice * NumberofTicket;
    setTicketPrice(totalPrice);
  }, [NumberofTicket]);

  const handlePayment = () => {
    const payRelatedInfo = {
      numberOfSelectedTicket: NumberofTicket,
      totalPrice: ticketPrice,
      id: 11234,
      selected: selectedSeats,
    };
    console.log("fecth korbo", payRelatedInfo);

    fetch("http://localhost:4000/book", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payRelatedInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.url);
        console.log(result);
      });
  };

  console.log("sits selected : ", selectedSeats);

  console.log("base price : ", baseTicketPrice);
  console.log("numer : ", selectedSeats.length);
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDownload = () => {
      window.print();
    };
    
    
  return (
    <div>
      <div>
        {finalData?.map((data, i) => (
          <div key={i} className="mb-10">
            <div>
              {data.schedule[userDate]?.map((train, index) => {
                // setBaseTicketPrice(train.ticketCost)
                // Check if the train matches the selected departure and arrival cities
                if (
                  train.departureCity === departureCity &&
                  train.arrivalCity === arrivalCity
                ) {
                  return (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-md shadow-md rounded-xl shadow-2xl"
                    >
                      <p className="text-3xl md:text-4xl font-semibold mb-2 text-center text-red-700">
                        {train.trainName} {train.ticketCost}
                      </p>

                      <h1 className="text-center mt-5">
                        Selected Date: {userDate}
                      </h1>
                      <h1 className="text-center ">
                        ticket holeder name : {ticketholder}
                      </h1>
                      <h1 className="text-center ">phone number : {mobile}</h1>
                      <div className="flex justify-center">
                        <div className="flex gap-10 ">
                          <div className="grid grid-cols-2">
                            {train.seats.leftColum.map((left) => (
                              <div key={left.id}>
                                <div
                                  className={`border-2 p-2 rounded-xl ${
                                    left.disabled
                                      ? "bg-red-500 cursor-not-allowed"
                                      : selectedSeats.some(
                                          (selectedSeat) =>
                                            selectedSeat.id === left.id
                                        )
                                      ? "bg-green-300 cursor-not-allowed"
                                      : "bg-purple-400 cursor-pointer"
                                  }`}
                                >
                                  {left.sit}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-2">
                            {train.seats.rightColum.map((right) => (
                              <div key={right.id}>
                                <div
                                  className={`border-2 p-2 rounded-xl ${
                                    right.disabled
                                      ? "bg-red-500 cursor-not-allowed"
                                      : selectedSeats.some(
                                          (selectedSeat) =>
                                            selectedSeat.id === right.id
                                        )
                                      ? "bg-green-300 cursor-not-allowed"
                                      : "bg-purple-400 cursor-pointer"
                                  }`}
                                >
                                  {right.sit}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mx-auto flex justify-center mt-5">
                        <p
                          className="btn btn-outline bg-red-300"
                          onClick={handleDownload}
                        >
                          Download Ticket
                        </p>
                      </div>
                    </div>
                  );
                }
                return null; // If the train doesn't match the criteria, return null
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeTicket;

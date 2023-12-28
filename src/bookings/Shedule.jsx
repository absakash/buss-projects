import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Authcontexts";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/Loading";
import schimg from '../city-bus-concept-illustration_114360-11574.avif'
const Schedule = () => {
  const userDate = localStorage.getItem("date");
  const departureCity = localStorage.getItem("departureCity");
  const arrivalCity = localStorage.getItem("arrivalCity");
  const navigate = useNavigate();

  // ... (previous code)

  const handleBookSit = (selectedTrain) => {
    // You can perform any additional logic here before navigating to selectsit.jsx
    // For now, let's log the selected train data
    // console.log("Selected Train:", selectedTrain);

    // Use the navigate function to navigate to selectsit.jsx and pass selectedTrain as state
//     navigate("/selectsit", { state: { selectedTrain } });
    navigate("/selectsit",);
  };
  const {
    data: allData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: "user",
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/alldata");
      const allData = await res.json();
      console.log("all data", allData);
      return allData;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-center">Selected Date: {userDate}</h1>
      {allData.map((data, i) => (
        <div key={i} className="mb-10">
          <h3 className="text-xl font-bold mb-4">Schedule for {data.date}</h3>
          <div >
            {data.schedule[userDate]?.map((train, index) => {
              // Check if the train matches the selected departure and arrival cities
              if (
                train.departureCity === departureCity &&
                train.arrivalCity === arrivalCity
              ) {
                return (
                  <div
                    key={index}
                    className="p-5 rounded-md shadow-md rounded-xl shadow-2xl bg-purple-50 py-3"
                  >
                    <div  className="md:flex justify-around relative bg-cover" style={{backgroundImage: `url(${schimg})`}}>
                      <div className="sm:flex md:block justify-between">
                        <p className="text-2xl md:text-3xl font-semibold mb-2  text-red-700">
                          {train.trainName}
                        </p>
                        <p
                          onClick={() => handleBookSit(train)}
                          className="btn btn-outline bg-purple-50"
                        >
                          Book Ticket
                        </p>
                      </div>
                      <div>
                        <p>Departure City: {train.departureCity}</p>
                        <p>Arrival City: {train.arrivalCity}</p>
                      </div>

                      <div>
                        <p>Departure Time: {train.departureTime}</p>
                        <p>Arrival Time: {train.arrivalTime}</p>
                      </div>

                      <div>
                        <p>Available Seats: {train.availableSeats}</p>
                        <p>Ticket Cost: {train.ticketCost}</p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null; // If the train doesn't match the criteria, return null
            })}
            {data.schedule[userDate]?.length === 0 && (
              <div key="no-train-found">
                <p className="text-4xl">No train found</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;

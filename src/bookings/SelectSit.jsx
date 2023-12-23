import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SelectSit = () => {

  const location = useLocation();
  const selectedTrain = location.state?.selectedTrain || null;

  console.log('Location state:', location.state);
  console.log('Selected Train:', selectedTrain.trainName);
  const leftColum = [
    {
      id: "L1",
      sit: "A 1",
      disabled: false,
    },
    {
      id: "L2",
      sit: "A 2",
      disabled: false,
    },
    {
      id: "L3",
      sit: "C 1",
      disabled: false,
    },
    {
      id: "L4",
      sit: "C 2",
      disabled: false,
    },
   
  ];

  const rightColum = [
    {
      id: "R1",
      sit: "B 1",
      disabled: false,
    },
    {
      id: "R2",
      sit: "B 2",
      disabled: false,
    },
    {
      id: "R3",
      sit: "D 1",
      disabled: false,
    },
    {
      id: "R4",
      sit: "D 2",
      disabled: false,
    },
    // ... (other seats with disabled property)
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice,setTicketPrice]=useState(0);

  const handleSeatClick = (seat) => {
    if (seat.disabled) {
      return;
    }

    const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.id === seat.id);

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
  };

  const NumberofTicket = selectedSeats.length;
  useEffect(() => {
    const baseTicketPrice = 10; // Set your base ticket price here
    const totalPrice = baseTicketPrice * NumberofTicket;
    setTicketPrice(totalPrice);
  }, [NumberofTicket]);
  
  const handlePayment = () => {
    console.log("Pay me ", NumberofTicket);
    console.log("Total Price: ", ticketPrice);
  };


  console.log("sits selected : ",selectedSeats)

  return (
    <div className="ml-5 mr-5 my-10">
    
      <div>
        <div className="">
          <div>
            <div className="flex justify-center">
              <div className="flex gap-10 ">
                <div className="grid grid-cols-2 ">
                  {leftColum.map((left) => (
                    <div key={left.id} onClick={() => handleSeatClick(left)}>
                      <div className={`border-2 p-2 rounded-xl ${
                        left.disabled
                        ?"bg-red-500 cursor-not-allowed"
                        :selectedSeats.some((selectedSeat) => selectedSeat.id === left.id)
                        ?"bg-green-300 cursor-not-allowed"
                        : "bg-purple-400 cursor-pointer"
                  
                        }`}
                        
                      >
                        {left.sit}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 ">
                  {rightColum.map((right) => (
                    <div key={right.id} onClick={() => handleSeatClick(right)}>
                      <div
                        className={`border-2 p-2 rounded-xl ${
                          right.disabled
                            ? "bg-red-500 cursor-not-allowed"
                            : selectedSeats.some((selectedSeat) => selectedSeat.id === right.id)
                            ? "bg-green-500 cursor-not-allowed"
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
            <div>
              <div className="flex justify-center">
                {/* Display the selected seat numbers */}
                {selectedSeats.map((selectedSeat) => (
                  <div
                    key={selectedSeat.id}
                    className="border-2 p-2 rounded-xl bg-blue-500 mr-2"
                  >
                    {`Selected: ${selectedSeat.sit}`}
                  </div>
                ))}
              </div>
            </div>



           
          </div>
        </div>
        
      </div>
          <div onClick={handlePayment} className="flex justify-center btn btn-outline bg-purple-200 w-32 mx-auto mt-5">
              <p>Pay now : {ticketPrice}</p>
            </div>
    </div>
  );
};

export default SelectSit;

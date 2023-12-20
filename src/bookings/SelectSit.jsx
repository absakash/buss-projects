import React, { useState } from "react";

const SelectSit = () => {
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
    // ... (other seats with disabled property)
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
    // ... (other seats with disabled property)
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

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
                      <div
                        className={`border-2 p-2 rounded-xl ${
                          left.disabled
                            ? "bg-red-500 cursor-not-allowed"
                            : selectedSeats.some((selectedSeat) => selectedSeat.id === left.id)
                            ? "bg-gray-500 cursor-not-allowed"
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
                            ? "bg-gray-500 cursor-not-allowed"
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
    </div>
  );
};

export default SelectSit;

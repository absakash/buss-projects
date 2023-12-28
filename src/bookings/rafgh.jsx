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
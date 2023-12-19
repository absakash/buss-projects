import React from "react";

const SelectSit = () => {
  const leftColum = [
    {
      id: 1,
      sit: "A 1",
    },
    {
      id: 2,
      sit: "A 2",
    },
    {
      id: 3,
      sit: "C 1",
    },
    {
      id: 4,
      sit: "C 2",
    },
    {
      id: 5,
      sit: "E 1",
    },
    {
      id: 6,
      sit: "E 2",
    },
    {
      id: 7,
      sit: "G 1",
    },
    {
      id: 8,
      sit: "G 2",
    },
    {
      id: 9,
      sit: "I 1",
    },
    {
      id: 10,
      sit: "I 2",
    },
  ];
  const rightColum = [
    {
      id: 1,
      sit: "B 1",
    },
    {
      id: 2,
      sit: "B 2",
    },
    {
      id: 3,
      sit: "D 1",
    },
    {
      id: 4,
      sit: "D 2",
    },
    {
      id: 5,
      sit: "F 1",
    },
    {
      id: 6,
      sit: "F 2",
    },
    {
      id: 7,
      sit: "H 1",
    },
    {
      id: 8,
      sit: "H 2",
    },
    {
      id: 9,
      sit: "K 2",
    },
    {
      id: 10,
      sit: "K 2",
    },
  ];
  return (
    <div className="ml-5 mr-5 my-10">
      <div>
        <div className="">
          <div>
            <div className="flex justify-center">
              <div className="flex gap-10 ">
                <div className="grid grid-cols-2 ">
                  {leftColum.map((left) => (
                    <div left={left} key={left.id}>
                      <div className="border-2 p-2 rounded-xl bg-purple-400">
                        {left.sit}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 ">
                  {rightColum.map((right) => (
                    <div right={right} key={right.id}>
                      <div className="border-2 p-2 rounded-xl bg-purple-400">
                        {right.sit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
             
            </div>
            <div>
            <div className="flex justify-center">
                <div className="border-2 p-2 rounded-xl bg-purple-400 w-11">
                  last
                </div>
                <div className="border-2 p-2 rounded-xl bg-purple-400 w-11">
                  last
                </div>
                <div className="border-2 p-2 rounded-xl bg-purple-400 w-11">
                  last
                </div>
                <div className="border-2 p-2 rounded-xl bg-purple-400 w-11">
                  last
                </div>
                <div className="border-2 p-2 rounded-xl bg-purple-400 w-11">
                  last
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSit;

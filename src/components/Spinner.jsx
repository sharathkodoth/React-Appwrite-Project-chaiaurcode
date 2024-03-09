import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = ({ color = "white", size = 20 }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <BeatLoader color={color} size={size} />
    </div>
  );
};

export default Spinner;

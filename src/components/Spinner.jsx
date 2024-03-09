import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = ({ color = "#4F46E5", size = 15 }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <BeatLoader color={color} size={size} />
    </div>
  );
};

export default Spinner;

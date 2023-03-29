import React from "react";
import CardProps from "@/Interfaces/CardProps";

const Card = ({ category }: CardProps) => {
  return (
    <div className="flex flex-col gap-5 p-5 w-80 leaf bg-background shadow-2xl">
      <h1 className="bg-secondary p-5 text-background leaf drop-shadow-xl text-3xl font-bold mx-10 text-center">
        {category}
      </h1>
      <div className="flex flex-row justify-around">
        <button className="btn btn-green w-28 ">Edit</button>
        <button className="btn btn-red w-28">Delete</button>
      </div>
    </div>
  );
};

export default Card;

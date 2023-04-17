import React from "react";

const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div
      className={
        "bg-red-300 p-3 my-auto text-black/70 rounded-2xl text-center font-bold"
      }
    >
      {errorMessage}
    </div>
  );
};

export default Error;

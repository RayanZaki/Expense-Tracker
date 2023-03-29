import React from "react";
import ContainerProps from "@/Interfaces/ContainerProps.ts";

const Container = ({ title, children, bottom, extra }: ContainerProps) => {
  return (
    <div className="bg-primary p-2 rounded-2xl shadow">
      <div className="container-top flex flex-row justify-between ">
        <h1>{title}</h1>
        {extra}
        {/* For the extra content on the Top Left like the balance*/}
      </div>
      {children}
      {bottom}
    </div>
  );
};

export default Container;

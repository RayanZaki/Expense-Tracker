import React, { useState } from "react";
import TransactionProps from "@/Interfaces/TransactionProps";

const Transaction = ({ data, header, onClick }: TransactionProps) => {
  // Allow either header or data to be null but not both
  if (data === undefined && header === undefined) {
    console.log("Invalid Transaction");
    throw DOMException;
  }
  // If header, bg transparent else background
  const bg =
    header || false
      ? "rounded-xl flex flex-row justify-between px-4 text-2xl border-t-2 [&>*]:my-auto text-xl"
      : "rounded-xl flex flex-row justify-between px-4 text-2xl bg-background border-t-2 [&>*]:my-auto text-xl";

  // @ts-ignore
  // @ts-ignore
  return (
    // @ts-ignore
    <div
      className={bg}
      onClick={
        !(header || false)
          ? () =>
              onClick({
                _id: data!._id,
                title: data!.title,
                type: data!.type,
                amount: data!.amount,
                date: data!.date,
                category: data!.category.id,
                // category: data!.category,
              })
          : () => null
      }
    >
      <p className="p-9 max-w-[40%]">
        {!(header || false) ? data!.title : "Title"}
      </p>
      <div className="flex flex-row justify-between p-6 [&>*]:p-3 [&>*]:w-[25%] w-[60%] text-center">
        <p>
          {!(header || false) ? data!.amount : "Amount"}
          {!(header || false) && <span className="pl-2 text-sm">DZD</span>}
        </p>
        <p>{!(header || false) ? data!.date : "Date"}</p>
        <p>{!(header || false) ? data!.category.name : "Category"}</p>
        {!(header || false) && (
          <p
            className={
              data!.type === "Expense"
                ? "bg-red-500 text-white rounded-xl my-auto"
                : "bg-green-500 text-white rounded-xl my-auto"
            }
          >
            {data!.type}
          </p>
        )}
        {(header || false) && <p>Type</p>}
      </div>
    </div>
  );
};

export default Transaction;

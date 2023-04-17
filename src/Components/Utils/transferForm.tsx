import React, { ChangeEventHandler, useState } from "react";
import Router from "next/router";

const TransferForm = () => {
  let [amount, setAmount] = useState("");
  let [error, setError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  const toggleAmount: ChangeEventHandler = (event) => {
    setAmount(event.target.value);
  };
  const transfer = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/transfer", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then((res) => {
        if (res.status == 401) {
          setError(true);
          setErrorMessage("Amount Exceeds balance");
          return;
        } else if (res.status == 500) {
          setError(true);
          setErrorMessage("Server Error");
          return;
        }
        res.json().then((res) => {
          setError(false);
          Router.reload();
        });
      })
      .catch((e) => console.log(e));
  };
  return (
    <form className={"flex flex-row flex-wrap gap-3 justify-between"}>
      <label className={"my-auto font-bold text-2xl m-2"}>Amount</label>
      <input
        className={"rounded-2xl p-4 "}
        type={"number"}
        placeholder={"Amount"}
        value={amount}
        onChange={toggleAmount}
      />
      {error && (
        <div className={"bg-red-300 p-3 my-auto text-black/70 rounded-2xl"}>
          {errorMessage}
        </div>
      )}
      <button className={"btn btn-bg"} onClick={transfer}>
        Submit
      </button>
    </form>
  );
};

export default TransferForm;

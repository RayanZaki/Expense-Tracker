import React, {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { categoryContext } from "@/pages/category";
import { indexContext } from "@/pages";
import { transaction } from "@/Interfaces/TransactionProps";
import Error from "@/Components/Utils/Error";
import Router from "next/router";

const TransactionForm = ({
  currentTransaction,
  setTransaction,
  toggleTransactionModal,
}: {
  currentTransaction: string | transaction;
  setTransaction: Function;
  toggleTransactionModal: Function;
}) => {
  let [error, setError] = useState("");
  // Context for categories
  const indexCats = useContext(indexContext);
  const categoryCats = useContext(categoryContext);

  // use the Props of the caller Provider
  const categories: Array<{ _id: string; name: string }> = indexCats.provided
    ? (indexCats.props as Array<{ _id: string; name: string }>)
    : (categoryCats.props as Array<{ _id: string; name: string }>);

  let [checkSubmit, setSubmit] = useState(false);

  useEffect(() => {
    // @ts-ignore
    setTitle(currentTransaction === "" ? "" : currentTransaction.title);
    // @ts-ignore
    setDate(currentTransaction === "" ? "" : currentTransaction.date);
    // @ts-ignore
    setAmount(currentTransaction === "" ? "" : currentTransaction.amount);

    setCategory(
      // @ts-ignore
      currentTransaction === "" ? "Category" : currentTransaction.category
    );
    // @ts-ignore
    setRadio(currentTransaction === "" ? "Expense" : currentTransaction.type);
  }, [currentTransaction]);

  // submit handler
  const handleSubmit: FormEventHandler = (event) => {
    event.stopPropagation();

    if (
      title === "" ||
      amount === "" ||
      date === "" ||
      category === "Category"
    ) {
      if (category === "Category") {
        setError("Missing Category");
        setSubmit(false);
        return;
      }
      setError("Missing Fields");
      setSubmit(false);
      return;
    }
    if (amount < 0) {
      setError("Negative Amount");
      setSubmit(false);
      return;
    }
    if (currentTransaction === "") {
      const transaction = {
        title: title,
        amount: amount,
        date: date,
        category: category,
        type: radio,
      };
      fetch("http://localhost:3000/api/transaction/add", {
        method: "POST",
        body: JSON.stringify({
          transaction: transaction,
        }),
      })
        .then((res) => {
          res.json().then((res) => {
            if (res.success) {
              Router.reload();
              setSubmit(true);
            } else {
              Router.reload();
              setSubmit(false);
              setError(res.message);
            }
          });
        })
        .catch((e) => console.error("error: ", e));
    } else {
      const transaction = {
        // @ts-ignore
        _id: currentTransaction._id,
        title: title,
        amount: amount,
        date: date,
        category: category,
        type: radio,
      };
      fetch("http://localhost:3000/api/transaction/edit", {
        method: "POST",
        body: JSON.stringify({
          transaction: transaction,
        }),
      })
        .then((res) => {
          toggleTransactionModal();
          setSubmit(true);
          setTransaction("");
          Router.reload();
        })
        .catch((e) => {
          console.error("error: ", e);
          setTransaction("");
        });
    }
  };

  let [title, setTitle] = useState(
    currentTransaction === "" ? "" : currentTransaction.title
  );
  let [amount, setAmount] = useState(
    currentTransaction === "" ? "" : currentTransaction.amount
  );
  let [date, setDate] = useState(
    currentTransaction === "" ? "" : currentTransaction.date
  );
  let [category, setCategory] = useState(
    currentTransaction === "" ? "Category" : currentTransaction.category
  );
  let [radio, setRadio] = useState(
    currentTransaction === "" ? "Expense" : currentTransaction.type
  );

  // Input handlers
  const handleTitle: ChangeEventHandler = (event) => {
    // @ts-ignore
    setTitle(event.target.value);
  };

  const handleAmount: ChangeEventHandler = (event) => {
    // @ts-ignore
    setAmount(event.target.value);
  };

  const handleDate: ChangeEventHandler = (event) => {
    // @ts-ignore
    setDate(event.target.value);
  };

  const handleCategory: ChangeEventHandler = (event) => {
    // @ts-ignore
    setCategory(event.target.value);
  };

  const handleRadio: ChangeEventHandler = (event) => {
    // @ts-ignore
    setRadio(event.target.value);
  };
  return (
    <div className="p-5" onClick={(e) => e.stopPropagation()}>
      <form className="grid grid-cols-4 gap-3">
        <input
          className="in text"
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={handleTitle}
        />
        <input
          className="in"
          type="number"
          value={amount}
          placeholder="Amount"
          onChange={handleAmount}
        />
        <input
          className="in"
          type="date"
          value={date}
          placeholder="Date"
          onChange={handleDate}
        />
        <select
          className="p-3 rounded-md bg-secondary text-white"
          value={category}
          onChange={handleCategory}
        >
          <option defaultValue="Category">Category</option>
          {categories.map((cat, index) => (
            <option key={index} className="p-5" value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <p className="text-xl text-center m-auto">
          What is the type of transaction?
        </p>
        <div className="flex lg:flex-row flex-col m-auto col-span-2 w-max [&>label]:m-5">
          <label
            className={
              radio === "Expense"
                ? "btn btn-red bg-red-500 m-auto text-white"
                : "btn btn-red m-auto"
            }
          >
            <input
              className={"invisible-radio"}
              type="radio"
              name="type"
              value="Expense"
              checked={radio === "Expense"}
              onChange={handleRadio}
            />
            Expense
          </label>
          <p className="m-auto">Or</p>
          <label
            className={
              radio === "Revenue"
                ? "btn btn-green m-auto bg-green-500 text-white"
                : "btn btn-green m-auto"
            }
          >
            <input
              className={"invisible-radio"}
              type="radio"
              name="type"
              value="Revenue"
              checked={radio === "Revenue"}
              onChange={handleRadio}
            />
            Revenue
          </label>
        </div>
        <div className="my-auto flex gap-5 justify-center">
          {error !== "" && <Error errorMessage={error} />}
          <button
            type="button"
            className="rounded-2xl btn btn-bg w-[80%] "
            onClick={handleSubmit}
            onSubmit={() => null}
          >
            {currentTransaction === "" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;

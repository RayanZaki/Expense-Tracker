import React, { useRef, useState } from "react";
import CardProps from "@/Interfaces/CardProps";
import { useRouter } from "next/router";

const Card = ({ category }: CardProps) => {
  let [name, setName] = useState(category);
  let [modifying, setModifying] = useState(false);
  const modifyHandler = (event) => {
    setName(event.target.value);
  };
  const title = useRef(null);
  const router = useRouter();
  const deleteCat = (name: string) => {
    fetch("http://localhost:3000/api/category/delete", {
      method: "POST",
      body: JSON.stringify({
        category: name,
      }),
    }).catch((e) => console.log("error: ", e));
    router.reload();
  };
  const editCat = (name: string) => {
    setModifying(!modifying);
    if (!modifying) return;
    else {
      if (name == "") {
        setName(category);
        // setError(true);
      } else if (name == category) {
        return;
      } else {
        try {
          fetch(`http://localhost:3000/api/category/edit`, {
            method: "POST",
            body: JSON.stringify({
              oldName: category,
              newName: name,
            }),
          })
            .then((value) => console.log(value))
            .catch((reason) => console.log(reason));
        } catch (e) {
          console.log(e);
        }
        router.reload();
      }
    }
  };
  // @ts-ignore
  return (
    <div className="flex flex-col gap-5 p-5 w-80 leaf bg-background shadow-2xl">
      <h1 className="bg-secondary p-5 text-background leaf drop-shadow-xl text-3xl font-bold mx-10 text-center">
        <input
          ref={title}
          className={
            modifying
              ? "bg-transparent w-[100%] text-center border-2 border-blue-400 outline-blue-400 p-2"
              : "bg-transparent w-[100%] text-center "
          }
          type={"text"}
          value={name}
          disabled={!modifying}
          onChange={modifyHandler}
        />
      </h1>
      <div className="flex flex-row justify-around gap-3">
        <button
          className={
            modifying
              ? "btn btn-green w-28 text-white bg-green-500"
              : "btn btn-green w-28"
          }
          onClick={() => editCat(name)}
        >
          Edit
        </button>
        <button className="btn btn-red w-28" onClick={() => deleteCat(name)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;

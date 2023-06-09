import React, { useContext, useRef, useState } from "react";
import CardProps from "@/Interfaces/CardProps";
import { ModalContext } from "@/Components/DashBoard/DashBoard";

const Card = ({ id, cardName, onDelete, onEdit, transferFund }: CardProps) => {
  const { toggleTransferModal, receiverId } = useContext(ModalContext);
  let [name, setName] = useState(cardName);
  let [modifying, setModifying] = useState(false);
  // @ts-ignore
  const modifyHandler = (event) => {
    setName(event.target.value);
  };
  const title = useRef(null);

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
          onClick={() => {
            setModifying(!modifying);
            if (!modifying) return;
            else {
              if (name == "") {
                setName(cardName);
                // setError(true);
              } else if (name == cardName) {
                return;
              } else {
                onEdit(name, id);
              }
            }
          }}
        >
          Edit
        </button>
        <button className="btn btn-red w-28" onClick={() => onDelete(name, id)}>
          Delete
        </button>
      </div>
      {transferFund && (
        <button
          className="btn btn-yellow w-58"
          onClick={() => {
            receiverId.current = id;
            toggleTransferModal();
          }}
        >
          Transfer Funds
        </button>
      )}
    </div>
  );
};

export default Card;

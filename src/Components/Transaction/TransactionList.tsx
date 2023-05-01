import React, { MouseEventHandler, useContext, useRef, useState } from "react";
import { transaction } from "@/Interfaces/TransactionProps";
import Transaction from "@/Components/Transaction/Transaction";
import Modal from "@/Components/Utils/Modal";
import Container from "@/Components/Utils/Container";
import { NextRouter } from "next/router";
import { useCookies } from "react-cookie";
import { ModalContext } from "@/Components/DashBoard/DashBoard";

interface Prop {
  list: Array<transaction>;
  router: NextRouter;
}

const TransactionList = ({ list, router }: Prop) => {
  let [modal, setModal] = useState(false);
  // let [data, setData] = useState({});
  const [emailCookie] = useCookies(["TOKEN"]);
  const { transaction, setTransaction, toggleTransactionModal } =
    useContext(ModalContext);
  const disableModal = () => {
    setTransaction("");
    setModal(false);
  };
  const enableModal: Function = (data: {
    _id: string;
    title: string;
    amount: number;
    type: string;
    date: string;
    category: string;
  }) => {
    setTransaction(data);
    setModal(true);
  };

  const handleDelete: MouseEventHandler = (e) => {
    const accessToken = emailCookie.TOKEN;
    fetch("http://localhost:3000/api/transaction/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: transaction._id,
        type: transaction.type,
        amount: transaction.amount,
        user: accessToken,
      }),
    })
      .then((s) => {
        router.reload();
      })
      .catch((e) => console.error(e));
  };
  const handleEdit = () => {
    setModal(false);

    toggleTransactionModal();
  };
  return (
    <div className="w-[99%] m-auto">
      <Modal show={modal} onHide={disableModal}>
        <Container title={"Transaction Options"}>
          <div className={"flex flex-row  justify-around"}>
            <button className={"btn btn-green w-28"} onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-red w-28" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </Container>
      </Modal>
      <ul>
        <li>
          <Transaction header />
        </li>
        {list.map((elem, index) => (
          <li key={index}>
            <Transaction data={elem} onClick={enableModal} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TransactionList;

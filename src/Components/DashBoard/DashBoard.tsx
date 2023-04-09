import React, {
  Context,
  createContext,
  ReactComponentElement,
  useState,
} from "react";
import Modal from "@/Components/Utils/Modal";
import SideBar from "@/Components/SideBar/SideBar";
import Container from "@/Components/Utils/Container";
import TransactionForm from "@/Components/Transaction/TransactionForm";
import { bool } from "prop-types";

// Context for changing the visibility of the modal
export const ModalContext: Context<any> = createContext({
  show: bool,
  toggleModal: Function,
});

const DashBoard = ({ children }: { children: ReactComponentElement<any> }) => {
  let [show, setShow] = useState(false);

  // For now it is constant but will be queried from Db
  let userName = "RayanZak";
  const toggleModal = () => {
    setShow(!show);
  };

  const addTransactionTitle = "Add Transaction";

  return (
    <>
      <Modal show={show} onHide={toggleModal}>
        <Container title={addTransactionTitle}>
          <TransactionForm />
        </Container>
      </Modal>
      <ModalContext.Provider value={{ show, toggleModal }}>
        <SideBar userName={userName} />
        {children}
      </ModalContext.Provider>
    </>
  );
};

export default DashBoard;

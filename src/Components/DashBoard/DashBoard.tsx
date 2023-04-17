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
import TransferForm from "@/Components/Utils/transferForm";

// Context for changing the visibility of the modal
export const ModalContext: Context<any> = createContext({
  show: bool,
  toggleTransactionModal: Function,
});

const DashBoard = ({
  userName,
  children,
  subUser,
}: {
  userName: string;
  subUser: boolean;
  children: ReactComponentElement<any>;
}) => {
  let [show, setShow] = useState(false);
  let [showTransfer, setShowTransfer] = useState(false);

  const toggleTransactionModal = () => {
    setShow(!show);
  };
  const toggleTransferModal = () => {
    setShowTransfer(!showTransfer);
  };

  const addTransactionTitle = "Add Transaction";
  const addTransferTitle = "Make Transfer";

  return (
    <>
      <Modal show={show} onHide={toggleTransactionModal}>
        <Container title={addTransactionTitle}>
          <TransactionForm />
        </Container>
      </Modal>
      <Modal show={showTransfer} onHide={toggleTransferModal}>
        <Container title={addTransferTitle}>
          <TransferForm />
        </Container>
      </Modal>
      <ModalContext.Provider
        value={{
          show,
          toggleTransactionModal,
          showTransfer,
          toggleTransferModal,
        }}
      >
        <SideBar userName={userName} subUser={subUser} />
        {children}
      </ModalContext.Provider>
    </>
  );
};

export default DashBoard;

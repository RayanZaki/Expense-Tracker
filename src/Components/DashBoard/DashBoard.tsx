import React, {
  Context,
  createContext,
  ReactComponentElement,
  useRef,
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
  transferOnly,
}: {
  userName: string;
  subUser: boolean;
  transferOnly?: boolean;
  children: ReactComponentElement<any>;
}) => {
  let [show, setShow] = useState(false);
  let [showTransfer, setShowTransfer] = useState(false);
  let [transaction, setTransaction] = useState("");
  // Store the Id of the user clicked on to transfer funds to
  let receiverId = useRef("");
  const toggleTransactionModal = () => {
    if (show) setTransaction("");
    setShow(!show);
  };
  const toggleTransferModal = () => {
    setShowTransfer(!showTransfer);
  };

  const addTransactionTitle =
    transaction === "" ? "Add Transaction" : "Edit Transaction";
  const addTransferTitle = "Make Transfer";

  return (
    <>
      {!transferOnly && (
        <Modal show={show} onHide={toggleTransactionModal}>
          <Container title={addTransactionTitle}>
            {/* @ts-ignore*/}
            <TransactionForm
              currentTransaction={transaction}
              setTransaction={setTransaction}
              toggleTransactionModal={toggleTransactionModal}
            />
          </Container>
        </Modal>
      )}
      <Modal show={showTransfer} onHide={toggleTransferModal}>
        <Container title={addTransferTitle}>
          <TransferForm receiverId={receiverId.current} />
        </Container>
      </Modal>
      <ModalContext.Provider
        value={{
          show,
          toggleTransactionModal,
          transaction,
          setTransaction,
          showTransfer,
          toggleTransferModal,
          receiverId,
        }}
      >
        <SideBar userName={userName} subUser={subUser} />
        {children}
      </ModalContext.Provider>
    </>
  );
};

export default DashBoard;

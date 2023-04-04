import React, {
  Context,
  createContext,
  ReactComponentElement,
  useState,
} from "react";
import Modal from "@/Components/Utils/Modal";
import SideBar from "@/Components/SideBar/SideBar";
import Container from "@/Components/Utils/Container";
import Category from "@/pages/category";
import defaultCategories from "@/Components/DashBoard/defaultCategories";
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
  // Here we might use the default Categories
  // Then Add the user defined ones to this variable
  let categories: Array<String>;
  categories = defaultCategories;

  return (
    <>
      <Modal show={show} onHide={toggleModal}>
        <Container title={addTransactionTitle}>
          <TransactionForm categories={categories} />
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

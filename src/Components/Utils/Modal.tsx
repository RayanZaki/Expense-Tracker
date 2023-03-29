import React from "react";
import ModalProps from "@/Interfaces/ModalProps";

const Modal = ({ show, onHide, children }: ModalProps) => {
  const style = show
    ? "fixed w-[100%] h-[100%] bg-black/80 z-50"
    : "fixed hidden";

  return (
    <div className={style} onClick={onHide}>
      <div
        className="w-[75%] rounded-2xl align-center absolute top-[25%] left-[12.5%]"
        // Stop Propagation makes it so that when clicking on child modal stays open
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

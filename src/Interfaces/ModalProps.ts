import { ReactComponentElement } from "react";

export default interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: ReactComponentElement<any>;
}

import { ReactComponentElement } from "react";

export default interface ContainerProps {
  children: ReactComponentElement<any>;
  title: String;
  bottom?: ReactComponentElement<any>;
  extra?: ReactComponentElement<any>;
}

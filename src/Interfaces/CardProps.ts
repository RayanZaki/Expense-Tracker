import { MouseEventHandler } from "react";

export default interface CardProps {
  cardName: string;
  onDelete: Function;
  onEdit: Function;
}

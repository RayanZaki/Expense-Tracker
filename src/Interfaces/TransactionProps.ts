import { MouseEventHandler } from "react";

export default interface TransactionProps {
  data?: transaction;

  header?: boolean | undefined;
  onClick?: Function;
}

export interface transaction {
  _id: string;
  index: number;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "Expense" | "Revenue";
}

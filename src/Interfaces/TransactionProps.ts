export default interface TransactionProps {
  data?: transaction;

  header?: boolean | undefined;
}

export interface transaction {
  title: String;
  amount: number;
  date: string;
  category: String;
  type: "Expense" | "Revenue";
}

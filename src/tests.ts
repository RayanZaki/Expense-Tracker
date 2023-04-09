import { transaction } from "@/Interfaces/TransactionProps";

/**
 * Temporary file containing some test cases
 *
 */

export const calculateBalance = (tx: Array<transaction>) => {
  let sum = 0;
  for (let elem of tx) {
    if (elem.type == "Expense") sum -= elem.amount;
    else sum += elem.amount;
  }
  return sum;
};

export const list: Array<transaction> = [
  {
    title: "Hello Test IAM testing",
    amount: 350,
    date: "23/07/2004",
    category: "hi",
    type: "Expense",
  },
  {
    title: "Hello Test I am testing",
    amount: 200,
    date: "23/07/2004",
    type: "Revenue",
    category: "Meal",
  },
];

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
const hi: transaction = {
  title: "Hello Test IAM testing",
  amount: 200,
  date: "23/07/2004",
  type: "Revenue",
  category: "Meal",
};
export const cats = ["cat1", "cat2"];
const hi2: transaction = {
  title: "Hello Test IAM testingsssssssssssssssssssssssssssssss",
  amount: 350,
  date: "23/07/2004",
  category: cats[0],
  type: "Expense",
};
export const list = [hi, hi2, hi, hi];

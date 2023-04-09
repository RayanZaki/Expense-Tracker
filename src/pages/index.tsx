import DashBoard from "@/Components/DashBoard/DashBoard";
import Container from "@/Components/Utils/Container";
import Paging from "@/Components/Utils/Paging";
import TransactionList from "@/Components/Transaction/TransactionList";
import { calculateBalance } from "@/tests";
import { createContext } from "react";
import { transaction } from "@/Interfaces/TransactionProps";

export const indexContext = createContext({
  provided: false,
  props: {},
});
const Home = ({
  categories,
  transactions,
}: {
  categories: Array<{ _id: string; name: string }>;
  transactions: Array<transaction>;
}) => {
  const title = "Transaction List:";

  return (
    <indexContext.Provider value={{ provided: true, props: categories }}>
      <DashBoard>
        <div className="body">
          <div className="active">
            <Container
              title={title}
              extra={
                <p>
                  Balance: {calculateBalance(transactions)}
                  <span className="text-sm"> DZD</span>
                </p>
              }
              bottom={<Paging size={transactions.length} max={5} />}
            >
              <TransactionList list={transactions} />
            </Container>
          </div>
        </div>
      </DashBoard>
    </indexContext.Provider>
  );
};

export default Home;

export async function getServerSideProps() {
  const [categoriesReq, transactionsReq] = await Promise.all([
    fetch("http://localhost:3000/api/category/get").then((res) => res.json()),
    fetch("http://localhost:3000/api/transaction/get").then((res) =>
      res.json()
    ),
  ]);

  console.log();

  for (let elem of transactionsReq.transactions) {
    elem.category = categoriesReq.categories.find(
      (e: { _id: string; name: string }) => e._id === elem.category
    ).name;
  }

  return {
    props: {
      categories: categoriesReq.categories,
      transactions: transactionsReq.transactions,
    },
  };
}

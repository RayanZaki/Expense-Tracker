import DashBoard from "@/Components/DashBoard/DashBoard";
import Container from "@/Components/Utils/Container";
import Paging from "@/Components/Utils/Paging";
import TransactionList from "@/Components/Transaction/TransactionList";
import { calculateBalance, list } from "@/tests";
import { createContext } from "react";

export const indexContext = createContext({
  provided: false,
  props: {},
});
const Home = ({
  categories,
}: {
  categories: Array<{ _id: string; name: string }>;
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
                  Balance: {calculateBalance(list)}
                  <span className="text-sm"> DZD</span>
                </p>
              }
              bottom={<Paging size={list.length} max={5} />}
            >
              <TransactionList list={list} />
            </Container>
          </div>
        </div>
      </DashBoard>
    </indexContext.Provider>
  );
};

export default Home;

export async function getStaticProps() {
  const cats = await fetch("http://localhost:3000/api/category/get");
  const categories = await cats.json();
  return { props: { categories: categories.categories } };
}

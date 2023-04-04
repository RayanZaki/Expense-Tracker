import DashBoard from "@/Components/DashBoard/DashBoard";
import Container from "@/Components/Utils/Container";
import Paging from "@/Components/Utils/Paging";
import TransactionList from "@/Components/Transaction/TransactionList";
import { calculateBalance, list } from "@/tests";

const func = async () => {
  await fetch("/api/test");
};
const Home = () => {
  func();
  const title = "Transaction List:";
  return (
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
  );
};

export default Home;

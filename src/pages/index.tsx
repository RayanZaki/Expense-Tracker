import DashBoard from "@/Components/DashBoard/DashBoard";
import Container from "@/Components/Utils/Container";
import Paging from "@/Components/Utils/Paging";
import TransactionList from "@/Components/Transaction/TransactionList";
import { createContext, useEffect, useRef, useState } from "react";
import { transaction } from "@/Interfaces/TransactionProps";
import { useRouter } from "next/router";
import Router from "next/router";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export const indexContext = createContext({
  provided: false,
  props: {},
});
const Home = ({
  categories,
  transactions,
  balance,
  size,
  userName,
}: {
  categories: Array<{ _id: string; name: string }>;
  transactions: Array<transaction>;
  balance: number;
  size: number;
  userName: string;
}) => {
  const router = useRouter();

  let [transactionsList, setTransactions] = useState(transactions);
  let [currentPos, setCurrentPos] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:3000/api/transaction/get?start=${currentPos}`)
      .then((res) => {
        res.json().then((res) => {
          for (let elem of res.transactions) {
            elem.category = categories.find(
              (e: { _id: string; name: string }) => e._id === elem.category
            )!.name;
          }
          setTransactions(res.transactions);
        });
      })
      .catch((e) => console.error(e));
  }, [currentPos]);
  return (
    <indexContext.Provider value={{ provided: true, props: categories }}>
      <DashBoard userName={userName}>
        <div className="body">
          <div className="active">
            <Container
              title={"Transaction List"}
              extra={
                <p>
                  Balance: {balance}
                  <span className="text-sm"> DZD</span>
                </p>
              }
              bottom={
                <Paging
                  size={transactionsList.length}
                  max={size}
                  pos={{ pos: currentPos, setter: setCurrentPos }}
                />
              }
            >
              <TransactionList list={transactionsList} router={router} />
            </Container>
          </div>
        </div>
      </DashBoard>
    </indexContext.Provider>
  );
};

export default Home;

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) {
  const browserCookie = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  const username = browserCookie["username"];
  if (username == undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const [categoriesReq, transactionsReq, balanceReq] = await Promise.all([
    fetch("http://localhost:3000/api/category/get")
      .then((res) => res.json())
      .catch((e) => console.error(e)),
    fetch(`http://localhost:3000/api/transaction/get?start=0`)
      .then((res) => res.json())
      .catch((e) => console.error(e)),
    fetch("http://localhost:3000/api/getBalance")
      .then((res) => res.json())
      .catch((e) => console.error(e)),
  ]);

  return {
    props: {
      categories: categoriesReq.categories,
      transactions: transactionsReq.transactions,
      size: transactionsReq.size,
      balance: balanceReq.balance,
      userName: username,
    },
  };
}

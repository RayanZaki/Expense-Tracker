import DashBoard from "@/Components/DashBoard/DashBoard";
import Container from "@/Components/Utils/Container";
import Paging from "@/Components/Utils/Paging";
import TransactionList from "@/Components/Transaction/TransactionList";
import { createContext, useEffect, useState } from "react";
import { transaction } from "@/Interfaces/TransactionProps";
import { useRouter } from "next/router";
import cookie from "cookie";
import { useCookies } from "react-cookie";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getUserName,
  isSubUser,
} from "../../lib/utils/mongo/user";

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
  subUser,
}: {
  categories: Array<{ _id: string; name: string }>;
  transactions: Array<transaction>;
  balance: number;
  size: number;
  userName: string;
  subUser: boolean;
}) => {
  const router = useRouter();
  const [emailCookie] = useCookies(["TOKEN"]);
  let [transactionsList, setTransactions] = useState(transactions);
  // index of the current position / 5
  let [currentPos, setCurrentPos] = useState(0);
  useEffect(() => {
    const accessToken = emailCookie.TOKEN;
    fetch(
      `http://localhost:3000/api/transaction/get?start=${currentPos}&user=${accessToken}`
    )
      .then((res) => {
        res.json().then((res) => {
          for (let elem of res.transactions) {
            elem.category = {
              name: categories.find(
                (e: { _id: string; name: string }) => e._id === elem.category
              )!.name,
              id: elem.category,
            };
          }
          setTransactions(res.transactions);
        });
      })
      .catch((e) => console.error(e));
  }, [currentPos]);
  return (
    <indexContext.Provider value={{ provided: true, props: categories }}>
      <DashBoard userName={userName} subUser={subUser}>
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
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const browserCookie = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  const accessToken = browserCookie["TOKEN"];
  if (accessToken == undefined || accessToken == "") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const [categoriesReq, transactionsReq, balanceReq, username, subUser] =
    await Promise.all([
      fetch(`http://localhost:3000/api/category/get?user=${accessToken}`)
        .then((res) => res.json())
        .catch((e) => console.error(e)),
      fetch(
        `http://localhost:3000/api/transaction/get?start=0&user=${accessToken}`
      )
        .then((res) => res.json())
        .catch((e) => console.error(e)),
      fetch(`http://localhost:3000/api/getBalance?user=${accessToken}`)
        .then((res) => res.json())
        .catch((e) => console.error(e)),
      getUserName(accessToken),
      isSubUser(accessToken),
    ]);
  return {
    props: {
      categories: categoriesReq.categories,
      transactions: transactionsReq.transactions,
      size: transactionsReq.size,
      balance: balanceReq.balance,
      subUser: subUser,
      userName: username,
    },
  };
}

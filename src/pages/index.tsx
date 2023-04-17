import DashBoard from "@/Components/DashBoard/DashBoard";
import Container from "@/Components/Utils/Container";
import Paging from "@/Components/Utils/Paging";
import TransactionList from "@/Components/Transaction/TransactionList";
import { createContext, useEffect, useRef, useState } from "react";
import { transaction } from "@/Interfaces/TransactionProps";
import { useRouter } from "next/router";
import cookie from "cookie";
import { useCookies } from "react-cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserName, isSubUser } from "../../lib/utils/mongo/user";

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
  const [emailCookie] = useCookies(["email"]);
  let [transactionsList, setTransactions] = useState(transactions);
  // index of the current position / 5
  let [currentPos, setCurrentPos] = useState(0);
  useEffect(() => {
    const email = emailCookie.email;
    fetch(
      `http://localhost:3000/api/transaction/get?start=${currentPos}&user=${email}`
    )
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
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const browserCookie = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  const email = browserCookie["email"];
  if (email == undefined || email == "") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const [categoriesReq, transactionsReq, balanceReq, username, subUser] =
    await Promise.all([
      fetch(`http://localhost:3000/api/category/get?user=${email}`)
        .then((res) => res.json())
        .catch((e) => console.error(e)),
      fetch(`http://localhost:3000/api/transaction/get?start=0&user=${email}`)
        .then((res) => res.json())
        .catch((e) => console.error(e)),
      fetch(`http://localhost:3000/api/getBalance?user=${email}`)
        .then((res) => res.json())
        .catch((e) => console.error(e)),
      getUserName(email),
      isSubUser(email),
    ]);
  console.log(transactionsReq);
  return {
    props: {
      categories: categoriesReq.categories,
      transactions: transactionsReq.transactions,
      size: transactionsReq.size,
      balance: balanceReq.balance,
      userName: username,
      subUser: subUser,
    },
  };
}

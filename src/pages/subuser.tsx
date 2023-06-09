import React from "react";
import Container from "@/Components/Utils/Container";
import { NextApiRequest } from "next";
import cookie from "cookie";
import {
  getSubUsers,
  getUserName,
  isSubUser,
} from "../../lib/utils/mongo/user";
import Card from "@/Components/Utils/Card";
import User from "@/Interfaces/User";
import { useRouter } from "next/router";
import { getGlobalBalance } from "../../lib/utils/mongo/meta";
import DashBoard from "@/Components/DashBoard/DashBoard";

const SubUser = ({
  username,
  subUser,
  subUsers,
  globalBalance,
}: {
  username: string;
  subUser: boolean;
  subUsers: string;
  globalBalance: number;
}) => {
  let subUsersArray: Array<User> = JSON.parse(subUsers);
  const router = useRouter();
  const onDelete = (name: string, id: string) => {
    fetch("http://localhost:3000/api/subuser/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(() => router.reload())
      .catch((e) => console.log(e));
  };

  const onEdit = (username: string, id: string) => {
    fetch("http://localhost:3000/api/subuser/edit", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        NewUserName: username,
      }),
    })
      .then(() => router.reload())
      .catch((e) => console.log(e));
  };

  return (
    <>
      <DashBoard userName={username} subUser={subUser} transferOnly>
        <div className="body">
          <div className="active">
            <Container
              title={"Sub users"}
              extra={
                !subUser && (
                  <p>
                    Global Balance: {globalBalance}
                    <span className="text-sm"> DZD</span>
                  </p>
                )
              }
            >
              <div className="flex flex-row flex-wrap gap-10 m-5 justify-center">
                {subUsersArray.map((user) => (
                  <Card
                    id={user._id}
                    key={user._id}
                    cardName={user.username}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    transferFund
                  />
                ))}
              </div>
            </Container>
          </div>
        </div>
      </DashBoard>
    </>
  );
};

export default SubUser;

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const browserCookie = cookie.parse(req.headers.cookie || "");
  const accessToken = browserCookie["TOKEN"];

  const [username, subUser, subUsers, globalBalance] = await Promise.all([
    getUserName(accessToken),
    isSubUser(accessToken),
    getSubUsers(accessToken),
    getGlobalBalance(accessToken),
  ]);

  return {
    props: {
      username: username,
      subUser: subUser,
      subUsers: JSON.stringify(subUsers),
      globalBalance: globalBalance,
    },
  };
}

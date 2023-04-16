import React from "react";
import Container from "@/Components/Utils/Container";
import { NextApiRequest } from "next";
import cookie from "cookie";
import {
  getSubUsers,
  getUserName,
  isSubUser,
} from "../../lib/utils/mongo/user";
import SideBar from "@/Components/SideBar/SideBar";
import Card from "@/Components/Utils/Card";
import User from "@/Interfaces/User";
import { useRouter } from "next/router";
import { getGlobalBalance } from "../../lib/utils/mongo/meta";

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
      method: "DELETE",
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
      <SideBar userName={username} subUser={subUser} />
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
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SubUser;

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const browserCookie = cookie.parse(req.headers.cookie || "");
  const email = browserCookie["email"];

  const [username, subUser, subUsers, globalBalance] = await Promise.all([
    getUserName(email),
    isSubUser(email),
    getSubUsers(email),
    getGlobalBalance(email),
  ]);

  console.log(subUsers);
  return {
    props: {
      username: username,
      subUser: subUser,
      subUsers: JSON.stringify(subUsers),
      globalBalance: globalBalance,
    },
  };
}

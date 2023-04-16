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

const SubUser = ({
  username,
  subUser,
  subUsers,
}: {
  username: string;
  subUser: boolean;
  subUsers: string;
}) => {
  let subUsersArray: Array<User> = JSON.parse(subUsers);
  return (
    <>
      <SideBar userName={username} subUser={subUser} />
      <div className="body">
        <div className="active">
          <Container title={"Sub users"}>
            <div className="flex flex-row flex-wrap gap-10 m-5 justify-center">
              {subUsersArray.map((user) => (
                <Card key={user._id} cardName={user.username} />
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

  const [username, subUser, subUsers] = await Promise.all([
    getUserName(email),
    isSubUser(email),
    getSubUsers(email),
  ]);

  console.log(subUsers);
  return {
    props: {
      username: username,
      subUser: subUser,
      subUsers: JSON.stringify(subUsers),
    },
  };
}

import React, { ChangeEvent, createContext, useState } from "react";
import Container from "@/Components/Utils/Container";
import Card from "@/Components/Utils/Card";
import DashBoard from "@/Components/DashBoard/DashBoard";
import { useRouter } from "next/router";
import cookie from "cookie";
import { getUserName, isSubUser } from "../../lib/utils/mongo/user";
import { NextApiRequest } from "next";
import { useCookies } from "react-cookie";
export const categoryContext = createContext({
  provided: false,
  props: {},
});
const Category = ({
  categories,
  email,
  userName,
  subUser,
}: {
  categories: Array<{ _id: string; name: string }>;
  email: string;
  userName: string;
  subUser: boolean;
}) => {
  const router = useRouter();
  let [input, changeInput] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    changeInput(e.target.value);
  };

  const addCat = (input: string) => {
    fetch("http://localhost:3000/api/category/add", {
      method: "POST",
      body: JSON.stringify({
        category: input,
        user: email,
      }),
    })
      .then(() => router.reload())
      .catch((reason) => console.log(reason));
  };
  const [emailCookie] = useCookies(["email"]);

  const deleteCat = (name: string, id: string) => {
    fetch("http://localhost:3000/api/category/delete", {
      method: "DELETE",
      body: JSON.stringify({
        category: name,
        user: emailCookie.email,
      }),
    })
      .then(() => router.reload())
      .catch((e) => console.log("error: ", e));
  };

  const editCat = (cardName: string, name: string) => {
    try {
      fetch(`http://localhost:3000/api/category/edit`, {
        method: "POST",
        body: JSON.stringify({
          oldName: cardName,
          newName: name,
          user: emailCookie.email,
        }),
      })
        .then((value) => router.reload())
        .catch((reason) => console.log(reason));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <categoryContext.Provider value={{ provided: true, props: categories }}>
      <DashBoard userName={userName} subUser={subUser}>
        <div className="body">
          <div className="active">
            <Container title="Add Category: ">
              <div className="flex flex-col text-center">
                <label>
                  <input
                    className="z-1 in w-[50%] drop-shadow-xl"
                    type="text"
                    name="category"
                    placeholder="Category Name"
                    value={input}
                    onChange={(event) => handleInput(event)}
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    className="btn btn-bg w-max mb-4 mr-4 mt-2"
                    type="submit"
                    onClick={() => addCat(input)}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </Container>
            <Container title="All categories">
              <div className="flex flex-row flex-wrap gap-10 m-5 justify-center">
                {categories.map((cat) => (
                  <Card
                    key={cat._id}
                    cardName={cat.name}
                    onDelete={deleteCat}
                    onEdit={editCat}
                  />
                ))}
              </div>
            </Container>
          </div>
        </div>
      </DashBoard>
    </categoryContext.Provider>
  );
};

export default Category;

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const browserCookie = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );

  const email = browserCookie["email"];
  const [categories, username, subUser] = await Promise.all([
    fetch(`http://localhost:3000/api/category/get?user=${email}`).then((res) =>
      res.json()
    ),
    getUserName(email),
    isSubUser(email),
  ]);

  return {
    props: {
      categories: categories.categories,
      email: browserCookie["email"],
      userName: username,
      subUser: subUser,
    },
  };
}

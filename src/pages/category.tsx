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

  const [emailCookie] = useCookies(["TOKEN"]);

  const addCat = (input: string) => {
    fetch("http://localhost:3000/api/category/add", {
      method: "POST",
      body: JSON.stringify({
        category: input,
        user: emailCookie.TOKEN,
      }),
    })
      .then(() => router.reload())
      .catch((reason) => console.log(reason));
  };

  const deleteCat = (name: string, id: string) => {
    fetch("http://localhost:3000/api/category/delete", {
      method: "POST",
      body: JSON.stringify({
        category: name,
        user: emailCookie.TOKEN,
      }),
    })
      .then(() => router.reload())
      .catch((e) => console.log("error: ", e));
  };

  const editCat = (newName: string, oldName: string) => {
    try {
      fetch(`http://localhost:3000/api/category/edit`, {
        method: "POST",
        body: JSON.stringify({
          newName: newName,
          oldName: oldName,
          user: emailCookie.TOKEN,
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
                    id={cat.name}
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

  const accessToken = browserCookie["TOKEN"];
  const [categories, username, subUser] = await Promise.all([
    fetch(`http://localhost:3000/api/category/get?user=${accessToken}`).then(
      (res) => res.json()
    ),
    getUserName(accessToken),
    isSubUser(accessToken),
  ]);

  return {
    props: {
      categories: categories.categories,
      userName: username,
      subUser: subUser,
    },
  };
}

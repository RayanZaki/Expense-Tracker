import React, { ChangeEvent, createContext, useState } from "react";
import Container from "@/Components/Utils/Container";
import Card from "@/Components/Utils/Card";
import DashBoard from "@/Components/DashBoard/DashBoard";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import cookie from "cookie";
import { NextRequest } from "next/server";
export const categoryContext = createContext({
  provided: false,
  props: {},
});
const Category = ({
  categories,
  email,
  userName,
}: {
  categories: Array<{ _id: string; name: string }>;
  email: string;
  userName: string;
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
  return (
    <categoryContext.Provider value={{ provided: true, props: categories }}>
      <DashBoard userName={userName}>
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
                  <Card key={cat._id} category={cat.name} />
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

export async function getServerSideProps({ req }: { req: NextRequest }) {
  const browserCookie = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  const cats = await fetch(
    `http://localhost:3000/api/category/get?user=${browserCookie["email"]}`
  );
  const categories = await cats.json();
  console.log(categories);
  return {
    props: {
      categories: categories.categories,
      email: browserCookie["email"],
      userName: browserCookie["username"],
    },
  };
}

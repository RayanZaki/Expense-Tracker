import React, { ChangeEvent, createContext, useContext, useState } from "react";
import Container from "@/Components/Utils/Container";
import Card from "@/Components/Utils/Card";
import DashBoard from "@/Components/DashBoard/DashBoard";
import { useRouter } from "next/router";
export const categoryContext = createContext({
  provided: false,
  props: {},
});
const Category = ({
  categories,
}: {
  categories: Array<{ _id: string; name: string }>;
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
      }),
    })
      .then((value) => console.log(value))
      .catch((reason) => console.log(reason));
    router.reload();
  };
  return (
    <categoryContext.Provider value={{ provided: true, props: categories }}>
      <DashBoard>
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
                {categories.map((cat, index) => (
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

export async function getServerSideProps() {
  const cats = await fetch("http://localhost:3000/api/category/get");
  const categories = await cats.json();
  return { props: { categories: categories.categories } };
}

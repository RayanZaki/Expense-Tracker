import React from "react";
import Container from "@/Components/Utils/Container";
import Card from "@/Components/Utils/Card";
import DashBoard from "@/Components/DashBoard/DashBoard";
import defaultCategories from "@/Components/DashBoard/defaultCategories";

const Category = () => {
  return (
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
                />
              </label>
              <div className="flex justify-end">
                <button className="btn btn-bg w-max mb-4 mr-4 " type="submit">
                  Add Category
                </button>
              </div>
            </div>
          </Container>
          <Container title="All categories">
            <div className="flex flex-row flex-wrap gap-10 m-5 justify-center">
              {defaultCategories.map((cat, index) => (
                <Card key={index} category={cat} />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </DashBoard>
  );
};

export default Category;

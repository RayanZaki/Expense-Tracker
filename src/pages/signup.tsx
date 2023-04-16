import React, { ChangeEventHandler, useState } from "react";
import Link from "next/link";
import "@/../node_modules/bootstrap/dist/css/bootstrap.min.css";
import cookie from "cookie";
import { NextApiRequest } from "next";
import Router from "next/router";
import { NextApiRequestQuery } from "next/dist/server/api-utils";

const Signup = ({ subUser }: { subUser: boolean }) => {
  let [email, setEmail] = useState("");
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");

  const handleEmail: ChangeEventHandler = (event) => {
    setEmail(event.target.value);
  };

  const handleUserName: ChangeEventHandler = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword: ChangeEventHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={"pt-5"}>
      <h1 className="text-center">{subUser ? "Add Sub User" : "Sign Up"}</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="card card-body">
              <form
                id="submitForm"
                action={subUser ? "/api/subuser/add" : "/api/signup"}
                method="POST"
              >
                <div className="form-group required">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    required
                    name="username"
                    value={username}
                    onChange={handleUserName}
                  />
                </div>
                <div className="form-group required">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control text-lowercase"
                    id="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div className="form-group required">
                  <label
                    className="d-flex flex-row align-items-center"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
                <input
                  type={"radio"}
                  className={"invisible"}
                  name={"subUser"}
                  value={1}
                  checked={subUser}
                />
                <div className="form-group mt-4 mb-4"></div>
                <div className="form-group pt-1">
                  <button className="btn btn-primary btn-block" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
              {!subUser && (
                <p className="small-xl pt-3 text-center">
                  <span className="text-muted">Already a member?</span>
                  <Link href="/login">Log in</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

export function getServerSideProps({
  req,
  query,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
}) {
  const browserCookie = cookie.parse(req.headers.cookie || "");
  const email = browserCookie["email"];
  if (email != undefined && email != "") {
    const { user } = query;
    if (user == email) {
      return { props: { subUser: true } };
    }
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { subUser: false } };
}

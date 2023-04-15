import React, { ChangeEventHandler, useState } from "react";
import Link from "next/link";
import "@/../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleEmail: ChangeEventHandler = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword: ChangeEventHandler = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className={"pt-5"}>
      <h1 className="text-center">Login</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="card card-body">
              <form
                id="submitForm"
                action="/api/login"
                method="post"
                data-parsley-validate=""
                data-parsley-errors-messages-disabled="true"
              >
                <input
                  type="hidden"
                  name="_csrf"
                  value="7635eb83-1f95-4b32-8788-abec2724a9a4"
                />
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
                <div className="form-group mt-4 mb-4"></div>
                <div className="form-group pt-1">
                  <button className="btn btn-primary btn-block" type="submit">
                    Log In
                  </button>
                </div>
              </form>
              <p className="small-xl pt-3 text-center">
                <span className="text-muted">Not a member?</span>
                <Link href="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

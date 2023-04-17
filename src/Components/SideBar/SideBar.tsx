import React, { MouseEventHandler, useContext } from "react";
import { useRouter } from "next/router";
import profile from "public/png/png.png";
import Image from "next/image";
import Link from "next/link";
import { ModalContext } from "@/Components/DashBoard/DashBoard";
import Router from "next/router";
import { useCookies } from "react-cookie";
const SideBar = ({
  userName,
  subUser,
}: {
  userName: String;
  subUser: boolean;
}) => {
  let {
    show,
    toggleTransactionModal,
    showTransfer,
    toggleTransferModal,
  }: {
    show: boolean;
    toggleTransactionModal: MouseEventHandler;
    showTransfer: boolean;
    toggleTransferModal: MouseEventHandler;
  } = useContext(ModalContext);
  let route = useRouter().route;
  const [cookie] = useCookies(["email"]);
  const logout = () => {
    fetch("http://localhost:3000/api/logout")
      .then(() => Router.push("/login"))
      .catch((e) => console.log(e));
  };
  return (
    <div className="flex flex-col justify-start fixed left-0 gap-10 w-80 text-center h-[100vh] p-2">
      <div className="flex flex-col jus gap-5">
        <Image
          src={profile.src}
          className="m-auto"
          alt="damn"
          width={100}
          height={100}
        />
        <h1 className="text-5xl italic font-bold">{userName}</h1>
      </div>
      <ul className="flex flex-col justify-start gap-5 [&>*]:text-center [&>*]:m-auto">
        <Link className="z-0" href="/" draggable="false">
          <li className={route === "/" ? "btn btn-bg" : "btn"}>Overview</li>
        </Link>
        <Link className="z-0" href="/category" draggable="false">
          <li className={route === "/category" ? "btn btn-bg" : "btn"}>
            Category
          </li>
        </Link>
        {!subUser && (
          <Link className="z-0" href="/subuser" draggable="false">
            <li className={route === "/subuser" ? "btn btn-bg" : "btn"}>
              Sub Users
            </li>
          </Link>
        )}
        {route == "/" && (
          <button onClick={toggleTransactionModal}>
            <li className={show ? "btn btn-bg" : "btn bg-primary"}>
              Add Transaction
            </li>
          </button>
        )}
        {!subUser && route == "/subuser" && (
          <Link href={`/signup?user=${cookie.email}`}>
            <li className={"btn bg-primary"}>Add Sub User</li>
          </Link>
        )}
        {subUser && (
          <button onClick={toggleTransferModal}>
            <li className={showTransfer ? "btn btn-bg" : "btn bg-primary"}>
              Transfer Funds
            </li>
          </button>
        )}
      </ul>
      <button className={"btn"} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default SideBar;

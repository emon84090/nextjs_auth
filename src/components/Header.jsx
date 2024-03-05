"use client";

import React, { useState } from "react";
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = ({ data }) => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "PRIVATE", link: "/private" },
  ];
  let [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="shadow-md w-full ">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <span>Emon Sarker</span>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <Link
                href={link.link}
                className="text-gray-800 hover:text-yellow-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {data ? (
            <button
              onClick={() => router.push("/api/user/login")}
              className="btn bg-red-500 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="btn bg-yellow-500 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
            >
              Login
            </button>
          )}
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Header;

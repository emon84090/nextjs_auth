"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitFun = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;
    if (!name.value || !email.value || !password.value) {
      return alert("All field Must Required");
    }

    if (password.value.length < 5) {
      return alert("password must 5 letters");
    }
    setLoading(true);
    try {
      const information = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
      };

      const data = await fetch(
        `https://nextjs-auth-zeta-nine.vercel.app/api/user/signup`,
        config
      );

      const response = await data.json();

      if (!data.ok) {
        setLoading(false);
        return alert(response?.message);
      }
      alert("Acount Create Success");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      setLoading(false);
      alert(err?.message);
    }
  };
  return (
    <>
      <div className="signup mt-10">
        <div className="box max-w-lg w-full mx-auto shadow-lg p-5 rounded-md">
          <h2 className="text-3xl mb-8 font-semibold">Signup</h2>
          <form onSubmit={submitFun}>
            <div className="form-control ">
              <input
                className="w-full border rounded-md p-3 border-gray-800 h-11"
                type="text"
                name="name"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-control mt-5">
              <input
                className="w-full border rounded-md p-3 border-gray-800 h-11"
                type="email"
                name="email"
                id=""
                placeholder="Enter Email"
              />
            </div>
            <div className="form-control mt-5">
              <input
                className="w-full border rounded-md p-3 border-gray-800 h-11"
                type="password"
                name="password"
                id=""
                placeholder="Enter Password"
              />
            </div>
            <div className="text mt-2">
              <span>
                Already Acount?{" "}
                <Link className="ml-1 underline text-yellow-500" href="/login">
                  Login
                </Link>
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-24 disabled:bg-yellow-400 disabled:cursor-not-allowed  text-white rounded-md shadow-sm h-11 bg-yellow-500 mt-5"
            >
              {loading ? "loading..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

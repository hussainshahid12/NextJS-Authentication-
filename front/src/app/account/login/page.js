"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "@/app/redux/slice/user";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.status);

  const obj = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(obj);
  const [flage, setFlage] = useState(true);

  useEffect(() => {
    if (user.email && user.password) {
      setFlage(false);
    } else setFlage(true);
  }, [user]);

  function submitHandler(e) {
    e.preventDefault();
    // API call to sign up user
    console.log(user);
    dispatch(fetchUserLogin(user));
    // clear form
    setUser(obj);
    setFlage(true);
  }

  function AlertMessages() {
    if (userState.error) {
      return (
        <div
          className="mt-2 bg-red-100 text-red-800 text-sm rounded-lg p-4 mb-2 w-[450px] text-center"
          role="alert"
        >
          <span className="font-semibold">Error!</span> {userState.error}
        </div>
      );
    }
    if (userState.user?.isAuth) {
      setTimeout(() => {
        router.push("/");
      }, 500);

      return (
        <div
          className="mt-2 bg-green-100 text-green-800 text-sm rounded-lg p-4 mb-2 w-[450px] text-center"
          role="alert"
        >
          <span className="font-semibold">Success!</span>{" "}
          {userState.user?.message}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {isLoading === "pending" ? <Loading></Loading> : <AlertMessages />}
      <form className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={flage}
          onClick={submitHandler}
        >
          Login
        </button>

        {/* Already have an account link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            You don't have an account?{" "}
            <Link
              href="/account/signup"
              className="text-blue-500 hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
          <span>
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot Password
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;

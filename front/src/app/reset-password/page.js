"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Login = () => {
  const obj = {
    password: "",
  };
  const [user, setUser] = useState(obj);
  const [flage, setFlage] = useState(true);

  useEffect(() => {
    if (user.password.length >= 8) {
      setFlage(false);
    } else setFlage(true);
  }, [user]);

  function submitHandler(e) {
    e.preventDefault();
    // API call to sign up user
    console.log(user);
    // clear form
    setUser(obj);
    setFlage(true);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Enter New Password
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
        {user.password && user.password.length < 8 && (
          <p className="text-red-500 text-sm">
            Password must be at least 8 characters .
          </p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={flage}
          onClick={submitHandler}
        >
          Reset Password
        </button>

        {/* Already have an account link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {" "}
            <Link
              href="/account/login"
              className="text-blue-500 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

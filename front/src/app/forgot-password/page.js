"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const forgotPassword = () => {
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const obj = {
    email: "",
  };
  const [user, setUser] = useState(obj);
  const [flage, setFlage] = useState(true);

  useEffect(() => {
    let e = regex_email.test(user.email);
    if (e) {
      setFlage(false);
    } else setFlage(true);
  }, [user.email]);

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
          Request For Reset Password
        </h2>

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
        {user.email && !regex_email.test(user.email) && (
          <p className="text-red-500 text-sm">
            Please enter a valid email address.
          </p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={flage}
          onClick={submitHandler}
        >
          Request Reset Password
        </button>

        {/* Already have an account link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not a User?{" "}
            <Link
              href="/account/signup"
              className="text-blue-500 hover:text-blue-700"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default forgotPassword;

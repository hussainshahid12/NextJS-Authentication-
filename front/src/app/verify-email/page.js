"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOTP } from "@/app/redux/slice/user";
import Loading from "@/components/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.status);

  console.log("grttrer", userState.ot_verify?.isVerified, userState.isAuth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [flage, setFlage] = useState(true);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Focus next input automatically
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit != "")) {
      setFlage(false);
    } else {
      setFlage(true);
    }
  }, [otp]);

  function clickHandler() {
    let obj = {
      email: email,
      otp: otp.join(""),
    };
    console.log(obj);
    dispatch(fetchUserOTP(obj));
  }

  function AlertMessages() {
    if (userState.error && !userState.otp_verify) {
      return (
        <div
          className="mt-2 bg-red-100 text-red-800 text-sm rounded-lg p-4 mb-2 w-[450px] text-center"
          role="alert"
        >
          <span className="font-semibold">Error!</span> {userState.error}
        </div>
      );
    }
    if (userState.otp_verify?.isVerified) {
      return (
        <div
          className="mt-2 bg-green-100 text-green-800 text-sm rounded-lg p-4 mb-2 w-[450px] text-center"
          role="alert"
        >
          <span className="font-semibold">Success!</span>{" "}
          {userState.otp_verify.message}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {isLoading === "pending" ? <Loading></Loading> : <AlertMessages />}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          OTP Verification
        </h1>
        <p className="text-sm text-gray-500 mb-2 text-center ">
          {" "}
          Check your email for OTP .OTP is valid in 10 minutes
        </p>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <div className="flex space-x-2 mt-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
        </div>

        <button
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={flage}
          onClick={clickHandler}
        >
          Submit OTP
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
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChangePassword } from "@/app/redux/slice/user";
import Loading from "@/components/Loading";

export default function ChangePassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.status);

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handlePasswordChange = async () => {
    // Logic to update password

    let obj = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };
    console.log("Password updated:", obj);

    let res = await dispatch(fetchUserChangePassword(obj));

    console.log(res);
    console.log("sosqowosdo");
    if (res.meta.requestStatus == "fulfilled") {
      setTimeout(() => {
        router.push("/user/profile");
      }, 3000);
    }
  };

  function AlertMessages() {
    if (userState.error) {
      return (
        <div
          className="mt-2 bg-red-100 text-red-800 text-sm rounded-lg p-4 mb-2 w-[450px] text-center mx-auto"
          role="alert"
        >
          <span className="font-semibold">Error!</span> {userState.error}
        </div>
      );
    }
    if (userState.user?.message) {
      return (
        <div
          className="mt-2 bg-green-100 text-green-800 text-sm rounded-lg p-4 mb-2 w-[450px] text-center mx-auto"
          role="alert"
        >
          <span className="font-semibold">Success!</span>{" "}
          {userState.user?.message}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100">
          {isLoading === "pending" ? <Loading></Loading> : <AlertMessages />}
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-4">
              Change Password
            </h1>
            <div className="space-y-4">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Enter old password"
              />
            </div>

            <div className="space-y-4">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Enter new password"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Save New Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@/app/redux/slice/user";
import Loading from "@/components/Loading";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.status);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  function AlertMessages() {
    if (userState.error) {
      return (
        <div
          className="mb-6 p-4 bg-red-100 text-red-800 text-sm font-medium rounded-lg shadow-md"
          role="alert"
        >
          <strong>Error!</strong> {userState.error}
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
          {/* Conditionally render error message above profile card */}
          {userState.error && <AlertMessages />}

          {isLoading === "pending" ? <Loading /> : null}

          <div className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-4">
              User Profile
            </h1>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Name:</span>
                <p className="text-gray-600">{userState.user?.name}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p className="text-gray-600">{userState.user?.email}</p>
              </div>
              <div>
                <span className="font-medium">Role:</span>
                <p className="text-gray-600">{userState.user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

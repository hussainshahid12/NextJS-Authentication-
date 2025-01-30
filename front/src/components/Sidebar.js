// components/Sidebar.js

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogout } from "@/app/redux/slice/user";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.status);

  async function logoutHandler() {
    let res = await dispatch(fetchUserLogout());
    console.log("User logged out", res);
    if (res.payload.status === "success") {
      router.push("/account/login");
    } else {
      console.log("Failed to log out", res.payload.message);
    }
  }

  return (
    <>
      {isLoading === "pending" && <Loading></Loading>}
      <div className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-2xl font-semibold mb-8">User Dashboard</h2>
        <ul className="space-y-6">
          <li>
            <Link href="/user/change-password">
              <span className="hover:bg-gray-700 p-2 rounded-md block">
                Change Password
              </span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="hover:bg-gray-700 p-2 rounded-md block">
                Go to Home
              </span>
            </Link>
          </li>
          <li>
            <button
              className="hover:bg-gray-700 p-2 rounded-md block w-full text-left"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

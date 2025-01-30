"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";

import Cookies from "js-cookie";

const Navbar = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const Auth = Cookies.get("isAuth");
    setAuth(Auth);
  }, []);

  return (
    <>
      {auth == "null" && <Loading />}
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          {auth ? (
            <li>
              <Link
                href="/user/profile"
                className="text-white hover:text-gray-400"
              >
                Profile
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/account/login"
                  className="text-white hover:text-gray-400"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/account/signup"
                  className="text-white hover:text-gray-400"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

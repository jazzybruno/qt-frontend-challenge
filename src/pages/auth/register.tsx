import { Button } from "@mantine/core";
import illustration from "../../assets/images/Illustration.png";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api, getResError } from "@/utils/fetcher";
import { notifications } from "@mantine/notifications";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
    telephone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login", data);
    setLoading(true);
    try {
      const res = await api.post("/auth/create-user", data);
      console.log(res);
      notifications.show({
        title: "Singup Success",
        message: "Signup Success",
        color: "green",
        autoClose: 3000,
      });
      if (res.data) {
        const nextUrl ="/auth/login";
        window.location.href = nextUrl;
      }
    } catch (error) {
      console.log(getResError(error));
      const _err = getResError(error);
      notifications.show({
        title: "Signup Failed",
        message:
          _err.trim() !== "" ? _err : "The Email or password is invalid",
        color: "red",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

   if (token && user) {
    return <Navigate to="/account" />;
  }

  return (
    <main className="bg-foreground w-screen h-screen">
      <div className="h-full md:flex">
        <div className="bg-white h-full w-full max-w-full md:max-w-md p-4 sm:p-8 pt-8">
          <header className="w-fit m-auto scale-90">
            <div className="w-fit">
              <img
                src="/Logo.png"
                className="w-22 h-22 object-cover"
                alt="DMS Logo"
              />
            </div>
            <h2 className="text-center text-2xl font-semibold mt-4">SignUp</h2>
          </header>

          <div className="mt-2 scale-90">
            <form onSubmit={login}>
              {/* First Name and Last Name inputs  */}
             <div className="field flex flex-row gap-2">
             <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="text"
                  name=""
                  placeholder="FirstName Here"
                  id="email"
                />
              </div>

              <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="text"
                  name=""
                  placeholder="Last Name here"
                  id="email"
                />
              </div>
             </div>

                {/* the phonenumber and date of birth inputs  */}
             <div className="field flex flex-row gap-2">
             <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Phone Number
                </label>
                <input
                  onChange={(e) => setData({ ...data, telephone: e.target.value })}
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="text"
                  name=""
                  placeholder="Phone Number Here"
                  id="email"
                />
              </div>

              <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Date Of Birth
                </label>
                <input
                  onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm  px-9 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="date"
                  name=""
                  placeholder="Last Name here"
                  id="email"
                />
              </div>
             </div>

              {/* The email and username inputs  */}
             <div className="field flex flex-row gap-2">
             <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="text"
                  name=""
                  placeholder="Email Here"
                  id="email"
                />
              </div>

              <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Username
                </label>
                <input
                  onChange={(e) => setData({ ...data, userName: e.target.value })}
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="text"
                  name=""
                  placeholder="Username here"
                  id="email"
                />
              </div>
             </div>

              <div className="field flex flex-col gap-2 mt-4 relative">
                <label
                  htmlFor="password"
                  className="text-md font-regular text-black-primary"
                >
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type={showPassword ? "text" : "password"}
                  name=""
                  placeholder="*********"
                  id="password"
                />
                <div className="absolute right-3 bottom-4">
                  {!showPassword ? (
                    <AiFillEyeInvisible
                      className="text-black-primary cursor-pointer text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEye
                      className="text-black-primary cursor-pointer text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>


              <div className="mt-4">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  radius="md"
                  w={"100%"}
                  size="md"
                  className="h-[50px] bg-primary text-white rounded-[10px] w-full font-semibold"
                >
                  Sign Up
                </Button>
              </div>

              <div className="mt-6">
                <p className="text-md text-black-primary text-center">
                  Already have account ?{" "}
                  <a href="/auth/login" className="text-primary">
                    Login
                  </a>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full hidden md:flex items-center justify-center">
          <img src={illustration} className="w-[60%]" alt="" />
        </div>
      </div>
    </main>
  );
}

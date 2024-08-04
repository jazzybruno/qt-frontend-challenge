import { Button } from "@mantine/core";
import illustration from "../../assets/images/Illustration.png";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api, getResError } from "@/utils/fetcher";
import { notifications } from "@mantine/notifications";
import { IUser } from "@/types/user.type";
import { IRole } from "@/types/base.type";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
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
      const res = await api.post("/auth/login", data);
      console.log(res);
      notifications.show({
        title: "Login Success",
        message: "Login Success",
        color: "green",
        autoClose: 3000,
      });
      if (res.data) {
        const user : IUser = res.data.payload?.user;
        sessionStorage.setItem("token", res.data.payload.tokens?.accessToken);
        sessionStorage.setItem("user", JSON.stringify(user));
        const role : IRole[] = user.roles.filter(role => {
            return role.name == "ADMIN"
        })
        let nextUrl ="/";
        if(role.length == 0){
           nextUrl='/'
        }else{
            nextUrl = '/account'
        }
        window.location.href = nextUrl;
      }
    } catch (error) {
      console.log(getResError(error));
      const _err = getResError(error);
      notifications.show({
        title: "Login Failed",
        message:
          _err.trim() !== "" ? _err : "The Email or password is incorrect",
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
            <h2 className="text-center text-2xl font-semibold mt-8">Login</h2>
          </header>

          <div className="mt-12 scale-90">
            <form onSubmit={login}>
              <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Email Address
                </label>
                <input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="text"
                  name=""
                  placeholder="example@gmail.com"
                  id="email"
                />
              </div>

              <div className="field flex flex-col gap-2 mt-6 relative">
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


              <div className="mt-6">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  radius="md"
                  w={"100%"}
                  size="md"
                  className="h-[50px] bg-primary text-white rounded-[10px] w-full font-semibold"
                >
                  Log in
                </Button>
              </div>

              <div className="mt-6">
                <p className="text-md text-black-primary text-center">
                  Don't have account yet?{" "}
                  <a href="/auth/signup" className="text-primary">
                    New Account
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

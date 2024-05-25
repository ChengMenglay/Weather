import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post("https://user-authentication-kji1.onrender.com/api/login", {
          email: email,
          password: password,
        })
        .then((respons) => respons.data);
      if (res && res.data) {
        message.success(res.message);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      } else {
        message.info(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-full h-screen bg-gray-900 flex justify-center items-center">
      <section className="w-[600px] h-[600px] px-3">
        <h1 className="text-center font-bold text-4xl text-white mb-16">
          Sign in to account
        </h1>
        <form onSubmit={handleLoginForm}>
          <label
            className="text-lg text-white font-bold leading-7"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            required
            value={email}
            className="w-full h-12 bg-gray-800 rounded-lg outline-none text-lg px-5 text-white mt-2 mb-10 "
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="text-lg text-white font-bold leading-7"
            htmlFor="password"
          >
            Password
          </label>
          <input
            required
            value={password}
            className="w-full h-12 px-5 text-lg bg-gray-800 rounded-lg outline-none text-white my-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className=" font-bold w-full h-12 bg-blue-700 rounded-lg outline-none text-white my-4"
            type="submit"
          >
            Sign in
          </button>
          <p className="text-lg font-bold leading-7 text-center text-white mt-10">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;

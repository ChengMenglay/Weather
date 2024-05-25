import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
import { message } from "antd";
const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate("");
  const handleSignupForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post("https://user-authentication-kji1.onrender.com/api/signup", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          confirm_password: confirmPassword,
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
        <h1 className="text-center font-bold sm:text-4xl text-2xl text-white mb-14 sm:mt-0 mt-5">
          Sign up new account
        </h1>
        <form onSubmit={handleSignupForm}>
          <div className="w-full flex gap-5 mb-8">
            <div>
              <label
                className="text-lg text-white font-bold leading-7"
                htmlFor="firstname"
              >
                First name
              </label>
              <input
                value={firstname}
                id="firstname"
                className="w-full h-12 bg-gray-800 rounded-lg outline-none text-lg px-5 text-white mt-2 "
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label
                className="text-lg text-white font-bold leading-7"
                htmlFor="lastname"
              >
                Last name
              </label>
              <input
                value={lastname}
                id="lastname"
                className="w-full h-12 px-5 text-lg bg-gray-800 rounded-lg outline-none text-white mt-2"
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <label
            className="text-lg text-white font-bold leading-7"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            value={email}
            id="email"
            className="w-full h-12 bg-gray-800 rounded-lg outline-none text-lg px-5 text-white mt-2 mb-8"
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
            value={password}
            id="password"
            className="w-full h-12 px-5 text-lg bg-gray-800 rounded-lg outline-none text-white mt-2 mb-8"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="text-lg text-white font-bold leading-7"
            htmlFor="cpassword"
          >
            Confirm Password
          </label>
          <input
            value={confirmPassword}
            id="cpassword"
            className="w-full h-12 px-5 text-lg bg-gray-800 rounded-lg outline-none text-white my-2"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className=" font-bold w-full h-12 bg-blue-700 rounded-lg outline-none text-white my-4"
            type="submit"
          >
            Sign up
          </button>
        </form>{" "}
        <Link
          to="/login"
          className="w-28 h-9 fixed sm:top-8 top-3 sm:left-5 left-2 hover:bg-blue-700 duration-300 rounded-lg flex justify-center items-center gap-3 text-white font-bold border border-blue-700"
        >
          <FaLongArrowAltLeft /> Back
        </Link>
      </section>
    </main>
  );
};

export default Signup;

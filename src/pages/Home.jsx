import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import axios from "axios";
import moment from "moment/moment";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [forecastData, setForecastData] = useState(null);
  const [country, setCountry] = useState("");
  const navigate = useNavigate("");
  //Get Api Data from Weather Api
  useEffect(() => {
    getData();
  }, [country]);
  const getData = async () => {
    const res = await axios.get("http://api.weatherapi.com/v1/forecast.json?", {
      params: {
        key: "ed1aabfec939403584e151523242105",
        q: country ? country : "Cambodia",
        days: 7,
      },
    });
    if (res && res.data) {
      setForecastData(res.data);
    }
  };
  useEffect(() => {
    const userinfo = localStorage.getItem("user");
    if (!userinfo) {
      navigate("/login");
    }
  }, [navigate]);

  const userinfo = JSON.parse(localStorage.getItem("user"));
  if (!userinfo) {
    return null;
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className=" text-white">
      {/* NavBar */}

      <nav className="h-20 flex justify-between items-center border-b border-b-gray-600 lg:px-14 px-5">
        <h1 className="font-bold sm:text-3xl text-2xl">Weather App</h1>
        <div className="w-80 h-10 md:flex hidden relative">
          <input
            value={country}
            placeholder="Search country..."
            type="text"
            className="w-full h-full rounded-lg bg-[#333533] outline-none text-md px-12 "
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="absolute left-2 text-2xl top-2 ">
            <IoSearch />
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <p className="font-bold text-xl">
            {userinfo.firstname + " " + userinfo.lastname}
          </p>

          <button
            className="w-28 h-10 bg-[#333533] rounded-lg hover:bg-[#424442] duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Responsive Search Country */}

      <div className="md:w-80 mx-5 h-10 md:hidden flex sm:mt-5 mt-2 relative duration-200">
        <input
          value={country}
          placeholder="Search country..."
          type="text"
          className="w-full h-full rounded-lg bg-[#333533] outline-none text-md px-12 "
          onChange={(e) => setCountry(e.target.value)}
        />
        <span className="absolute left-2 text-2xl top-2">
          <IoSearch />
        </span>
      </div>

      {/* Current Weather */}
      {forecastData && forecastData.current ? (
        <section className="container sm:mt-10 mt-2 mx-auto flex md:flex-row flex-col md:items-start items-center justify-between duration-200">
          <div className="w-80 sm:h-80 flex flex-col justify-center items-center relative">
            <img
              src={forecastData.current.condition.icon}
              alt="weather"
              className="sm:w-44 w-32 sm:h-44 h-32 sm:my-5 my-2 duration-200"
            />
            <h2 className="font-bold sm:text-2xl text-xl text-center">
              {forecastData.current.condition.text}
            </h2>
            <span className="text-2xl font-bold absolute top-0 sm:left-3 left-0">
              Now
            </span>
          </div>
          <h1 className="sm:text-3xl text-2xl font-bold">
            {forecastData.location.name + ", " + forecastData.location.country}
          </h1>
          <div className="w-80 sm:h-80">
            <div className="sm:h-28 h-20 border-b border-b-[#333533] mt-5 flex justify-center items-center sm:text-6xl text-5xl font-bold leading-none">
              {forecastData.current.temp_c + "°C"}
            </div>
            <div className="sm:my-8 my-2 sm:px-1 px-2 sm:text-2xl text-xl flex justify-between">
              <FaWind />
              <p className="text-xl font-bold">
                {forecastData.current.wind_kph + "km/h"}
              </p>
            </div>
            <div className="flex justify-between sm:px-1 px-2">
              <GrSchedule className="sm:text-2xl text-xl" />
              <p className="text-sm">
                {moment(forecastData.current.last_updated).format(
                  "dddd, MMMM MM, h:mma"
                )}
              </p>
              {/* Wednesday, 11, May */}
            </div>
          </div>
        </section>
      ) : null}

      {/* Forcast today by time */}
      {forecastData && forecastData.forecast ? (
        <div className="container mt-5 border border-[#333533] scrollbar-hide h-36 mx-auto sm:px-3 overflow-x-auto overflow-y-hidden whitespace-nowrap">
          {forecastData.forecast.forecastday[0].hour.map((e, i) => (
            <div key={i} className="w-36 h-36 inline-block text-center">
              <h1 className="font-bold text-lg">
                {moment(e.time).format("h:mm a")}
              </h1>
              <img className="mx-auto" src={e.condition.icon} alt="weather" />
              <h1 className="text-lg font-bold mt-5">{e.temp_c + "°C"}</h1>
            </div>
          ))}
        </div>
      ) : null}
      {forecastData && forecastData.forecast ? (
        <div className="container md:px-20 sm:px-10 px-5 mx-auto py-10 flex flex-col items-center duration-200">
          <h1 className=" font-bold text-base">7-Days FORECAST</h1>

          <div className="w-full grid grid-cols-1 mt-10 gap-4 ">
            {forecastData.forecast.forecastday.map((e, i) => (
              <div
                key={i}
                className=" min-h-20 bg-[#293241] rounded-lg flex justify-between items-center lg:px-20 md:px-12 sm:px-8 px-5"
              >
                <h1 className="text-lg font-bold">
                  {moment(e.date).format("L") ==
                  moment(forecastData.current.last_updated).format("L")
                    ? "Today"
                    : moment(e.date).format("dddd")}
                </h1>
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="mx-auto"
                    src={e.day.condition.icon}
                    alt="weather"
                  />
                  <h1 className="text-lg font-bold">{e.day.avgtemp_c}°C</h1>
                </div>

                <div className="text-2xl flex items-center md:gap-8 gap-5">
                  <FaWind />
                  <p className="text-xl font-bold">{e.day.maxwind_kph}km/h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Skeleton avatar paragraph={{ rows: 50 }} />
      )}
    </div>
  );
};

export default Home;

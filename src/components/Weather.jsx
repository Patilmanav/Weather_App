import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Weather(props) {
  const [cityName,setCityName] = useState("");

  return (
    <div className="rounded-lg bg-slate-100 bg-opacity-80 min-w-[30vmax]">
      {/* <img src="https://hoangsonww.github.io/WeatherMate-App/utils/logo.png" alt="cloud img" /> */}
      <div id="center" className="p-10 flex flex-col items-center gap-y-5">
        <img
          src="https://hoangsonww.github.io/WeatherMate-App/utils/logo.png"
          id="img"
          onClick={() => {
            window.location.href = "/";
          }}
          title="Click to go back to the home page"
          alt="WeatherMate Logo"
          className="h-[75px] cursor-pointer object-center"
        />
        <a href="/">
          <h1
            id="my-heading"
            className="font-[700] font-[Poppins,sans-serif]  text-3xl"
          >
            The WeatherMate App
          </h1>
        </a>

        <form id="form" action={(cityName!="" && cityName!==null && cityName!=" ")&&`/search-Weather/${cityName}`} className="border-none flex flex-col justify-center items-center gap-5">
          <input
            type="text"
            id="search"
            placeholder="Search for any location..."
            autoComplete="on"
            className="border-none min-w-[300px] rounded-full p-3 drop-shadow-lg"
            onChange={(e) => {
              setCityName(e.target.value);
            }}
          />
            <input
              type="submit"
              id="btn"
              title="Simply press enter or this button to search"
              className="px-5 p-2 bg-slate-300 rounded-xl font-bold m-1 hover:cursor-pointer"
              value={`Search`}
            />
              
        </form>
        <div className="text-center">
          <button
            id="toggle-temp"
            title="Click to Change Temperature Units"
            className="px-5 p-2 bg-slate-300 rounded-xl font-bold m-1"
          >
            Displaying in °F
          </button>
        </div>

        <div className="text-center">
          <div
            id="favorites-section "
            className="m-1 drop-shadow-lg bg-slate-100 p-5 rounded-lg font-bold text-xl"
          >
            <h3>No favorite cities added.</h3>
          </div>

          <button
            type="button"
            id="btn1"
            title="See this app's and its creator's overview information"
            className="px-5 p-2 bg-slate-300 rounded-xl font-bold m-1"
          >
            About Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Weather;

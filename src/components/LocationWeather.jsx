import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import DateTime from "./dateTime";
import logo from '../assets/logo.png';
import clouds from '../assets/clouds.jpg';
import cloud_sm from '../assets/04d@2x.png';

const api_key = "449698db8add438098aca31048838cfb";

function LocationWeather(props) {

  const [city,setCity] = useState("");
  const [ferTemp,setFerTemp] = useState(false);

  const { data, refetch, isError, isLoading,isFetched } = useQuery(["weather"], () => {
    console.log("Fetching....");
    return axios
      .get(
        `https://api.weatherbit.io/v2.0/current?city=${props.city_name}&key=${api_key}&include=minutely`
      )
      .then((res) => res.data.data[0]);
  });
  if(isFetched){
   props.setLocalDate(data.timezone);

  }
  if (isError) {
    return (
      <div>
        <h1>Unable to Fetch the data..</h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <h1>Loading data...</h1>
      </div>
    );
  }

  return (
    <>
      <div className={`bg-slate-100 bg-opacity-80 p-10 flex justify-center items-center flex-col gap-3 rounded-lg mt-20 w-[35vmax]`}>
        <div className="image-cloud flex justify-center">
          <img
            className="h-[75px]"
            src={logo}
            alt=""
          />
        </div>
        <div className="heading font-bold text-4xl font-serif">
          <h1>The WeatherApp</h1>
        </div>
        <div className="city-name text-xl font-semibold">{data?.city_name}</div>
        <div className="temp flex items-center gap-2 text-xl font-semibold">
          <img src={cloud_sm} alt="" />
          {ferTemp? <span>{(data?.temp * 9/5) + 32} °F</span> : <span>{data?.temp} °C</span> }
          <img src={cloud_sm} alt="" />
        </div>
        <div className="howsTheSky text-xl font-semibold">{data?.weather.description}</div>
        <div className="time text-xl font-semibold">Local Time = <DateTime timezone={data?.timezone} /> </div>

        <form className="flex flex-col gap-2 justify-center items-center">
          <input
            type="text"
            className="p-6 rounded-full "
            placeholder="Search for any location..."
            onChange={(e)=>{setCity(e.target.value);}}
          />
          <a href={`/search-Weather/${city}`}>
          <button className="px-5 p-2 bg-slate-300 rounded-xl" onClick={()=>{setTimeout(refetch,500);}}>Search</button>
          </a>
        </form>
        <button className="px-5 p-2 bg-slate-300 rounded-xl" onClick={(e)=>{
          setFerTemp(!ferTemp);
        }}>
          Displaying in {ferTemp ? '°C' : '°F'}
        </button>

        <button className="px-5 p-2 bg-slate-300 rounded-xl" onClick={refetch}>
          Refresh Weather
        </button>
        <button className="px-5 p-2 bg-slate-300 rounded-xl font-bold">
          <a href="/">Back To Home</a>
        </button>
      </div>
    </>
  );
}

export default LocationWeather;

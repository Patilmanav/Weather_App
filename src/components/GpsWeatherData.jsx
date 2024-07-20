import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

const api_key = "449698db8add438098aca31048838cfb";

function GpsWeatherData(props) {

    const { data, refetch, isError, isLoading,isFetched } = useQuery(["weather"], () => {
        console.log("Fetching....");
        return axios
          .get(
            `https://api.weatherbit.io/v2.0/current?lon=${props.location.longitude}&lat=${props.location.latitude}&key=${api_key}&include=minutely`
          )
          .then((res) => res.data.data[0]);
      });
    
        if (isFetched) {
          props.setLocalDate(data.timezone);
        }
        if (isError) {
          return (
    
            <div>
              <h1>Enable location access then reload to view live weather in your area!</h1>
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
    <div onClick={refetch} className='flex flex-col justify-center items-center text-xl font-sans font-bold w-full gap-8'>
        <h1>Weather in Your Location</h1>
       <h1>{data?.city_name}</h1> 
        <h2>{data?.temp} C, overcast clouds</h2>
    </div>
  )
}


export default GpsWeatherData
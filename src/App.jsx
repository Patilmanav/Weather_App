import { useRef, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Link,
  Routes,
  Await,
} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Weather from "./components/Weather";
import LocationWeather from "./components/LocationWeather";
import GpsWeatherData from "./components/GpsWeatherData";
import LiveTime from "./components/LiveTime";
import Home from "./assets/home.svg";
import "./assets/clouds.jpg";


function App() {
  const [count, setCount] = useState(0);
  const [localDate, setLocalDate] = useState(null);
  // const [localDate, setLocalDate] = [null,5]
  const client = new QueryClient();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState("Click Me To Refresh");
  const locationBtn = useRef();
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setWeatherData(<GpsWeatherData location={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }} setLocalDate={setLocalDate}/>);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
    

  }, []);
  
  

  return (
    <>
      <QueryClientProvider client={client}>
        <Router>
          <div className="relative min-h-screen" id="main">
            <div className="center flex flex-col justify-center items-center h-[100vh] py-5 overflow-y-auto">
              {/* <div className="h-52 m-5"> dnrkjlflrjkn</div> */}
              <Routes>
                <Route
                  path="search-Weather/:city"
                  element={<LocationWeather setLocalDate={setLocalDate} />}
                />
                <Route path="/" element={<Weather />} />
              </Routes>
            </div>
            <div className="hidden md:block top_left fixed top-0 left-0 m-7 drop-shadow-lg">
              <button
                className="text-wrap max-w-56 p-8 rounded-lg bg-slate-100"
                onClick={(e)=>{
                  console.log(e.target.innerHTML)
                  if(location.latitude){
                    setWeatherData(<GpsWeatherData location={location} setLocalDate={setLocalDate}/>)
                  }
                  else if(error){
                    setWeatherData(<div>
                    <h1>Enable location access then reload to view live weather in your area!</h1>
                  </div>)
                  }
                }}
              >
               {weatherData}
              </button>
            </div>

            <div className="top_right fixed top-0 right-0 m-7 text-center">
              <div className="flex flex-col justify-center items-center ">
                <p className="font-semibold text-xl">Your Local Time</p>
                <div className="h-24 w-24 rounded-[100%] bg-slate-100 drop-shadow-lg flex items-center justify-center flex-wrap font-semibold text-xl">
                  {/* <LiveTime localDate={localDate}/> */}
                  <LiveTime timezone={localDate} />
                </div>

                <p className="font-semibold text-xl">Back to Home</p>
                <Link to={`/`}>
                  <button className="h-14 w-14 rounded-[100%] bg-slate-100 drop-shadow-lg">
                    <div className="flex justify-center">
                      <img className="h-7" src={Home} alt="Home" />
                    </div>
                  </button>
                </Link>
              </div>
              <div></div>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;

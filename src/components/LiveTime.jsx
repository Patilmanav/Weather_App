import React, { useState, useEffect } from 'react';

const LiveTime = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
    const tz = "Asia";
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date, timeZone) => {
    if(timeZone){
        return new Intl.DateTimeFormat('en-US', {
            timeZone ,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(date);
    }
    else{
        return new Intl.DateTimeFormat('en-US', {
            tz ,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(date);
    }
  };

  return (
    <div>
      <p>{formatTime(currentTime, timezone)}</p>
    </div>
  );
};

export default LiveTime;

import React from 'react'

function dateTime(props) {
    const date = new Date();
    const options = { timeZone: props.timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const options2 = { timeZone: props.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const formattedDate2 = new Intl.DateTimeFormat('en-US', options2).format(date);
  return (
    <span>{formattedDate}</span>
  )
}

export default dateTime
import React, {useState, useEffect} from 'react';
import "../assets/css/lap.css";


function Lap({time}){   
    const [timeList, setTimeList] = useState([]);

    useEffect(() => {
        if(!time) setTimeList([]);
        setTimeList(prevTime => [time, ...prevTime]);
    }, [time]);
    
    const listTime = timeList.map((time, index) => (
        <li key={index}>{time}</li>
    ))

    return(

        <div className="lap-box">
            <h1>Laps</h1>
            <p>{listTime}</p>

        </div>
    )
}

export default Lap;
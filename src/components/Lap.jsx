import React, { useState, useEffect } from "react";

function Lap({ laps }) {
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    if (laps && laps.length > 0) {
      setTimeList(laps);
    } else {
      setTimeList([]);
    }
  }, [laps]);

  return (
    <div className="laps">
      <ul>
        {timeList.map((time, index) => (
          <li key={index}>
            Lap {index + 1}: {time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lap;

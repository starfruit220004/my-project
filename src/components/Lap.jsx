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
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        maxHeight: "50vh",
        overflowY: "auto",
      }}
    >
      <ul style={{ padding: 0, margin: 0 }}>
        {timeList.map((time, index) => (
          <li
            key={index}
            style={{
              listStyle: "none",
              padding: "2px 0",
              color: "black",
              textShadow: "1px 1px 2px black",
            }}
          >
            Lap {index + 1}: {time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lap;

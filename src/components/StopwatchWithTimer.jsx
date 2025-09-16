import React, { useState, useEffect, useRef } from 'react';
import "../assets/css/stopwatch.css";
import Lap from './Lap';

function StopwatchWithTimer() {
  const [mode, setMode] = useState("stopwatch"); // stopwatch | timer
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // stopwatch
  const [countdown, setCountdown] = useState(0);     // timer (seconds)
  const [laps, setLaps] = useState([]);

  // User input states
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  // Handles stopwatch or timer updates
  useEffect(() => {
    if (isRunning) {
      if (mode === "stopwatch") {
        intervalIdRef.current = setInterval(() => {
          setElapsedTime(Date.now() - startTimeRef.current);
        }, 10);
      } else if (mode === "timer") {
        intervalIdRef.current = setInterval(() => {
          setCountdown(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      }
    }
    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, mode]);

  function start() {
    if (mode === "stopwatch") {
      startTimeRef.current = Date.now() - elapsedTime;
    }
    if (mode === "timer" && countdown <= 0) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds === 0) return;
      setCountdown(totalSeconds);
    }
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
    setCountdown(0);
    setLaps([]); 
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  function lap() {
    if (!isRunning) return;

    if (mode === "stopwatch") {
      setLaps(prev => [...prev, formatTime()]);
    } else if (mode === "timer" && countdown > 0) {
      const h = String(Math.floor(countdown / 3600)).padStart(2, "0");
      const m = String(Math.floor((countdown % 3600) / 60)).padStart(2, "0");
      const s = String(countdown % 60).padStart(2, "0");
      setLaps(prev => [...prev, `${h}:${m}:${s}`]);
    }
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        {/* Mode toggle */}
        <div className="mode-switch">
          <button onClick={() => { reset(); setMode("stopwatch"); }}>Stopwatch</button>
          <button onClick={() => { reset(); setMode("timer"); }}>Timer</button>
        </div>

        {/* Display */}
        <div className="display">
          {mode === "stopwatch" ? (
            formatTime()
          ) : (
            <>
              {String(Math.floor(countdown / 3600)).padStart(2, "0")}:
              {String(Math.floor((countdown % 3600) / 60)).padStart(2, "0")}:
              {String(countdown % 60).padStart(2, "0")}
            </>
          )}
        </div>

        {/* Timer input (only if timer and not running) */}
        {mode === "timer" && !isRunning && (
          <div className="time-inputs">
            <div className="time-control">
              <select
                value={hours}
                onChange={(e) => {
                  setHours(Number(e.target.value));
                  setMode("timer"); // auto-switch
                }}
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={i}>{String(i).padStart(2, "0")} h</option>
                ))}
              </select>
            </div>

            <div className="time-control">
              <select
                value={minutes}
                onChange={(e) => {
                  setMinutes(Number(e.target.value));
                  setMode("timer"); // auto-switch
                }}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>{String(i).padStart(2, "0")} m</option>
                ))}
              </select>
            </div>

            <div className="time-control">
              <select
                value={seconds}
                onChange={(e) => {
                  setSeconds(Number(e.target.value));
                  setMode("timer"); // auto-switch
                }}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>{String(i).padStart(2, "0")} s</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="buttons">
          {!isRunning && (elapsedTime === 0 && countdown === 0) ? (
            <button onClick={start} className="start-button">Start</button>
          ) : !isRunning ? (
            <button onClick={start} className="start-button">Continue</button>
          ) : (
            <button onClick={stop} className="stop-button">Stop</button>
          )}

          <button onClick={reset} className="reset-button">Reset</button>
          <button onClick={lap} className="lap-button">Lap</button>
        </div>

        {/* Laps at bottom */}
        {laps.length > 0 && (
          <div className="laps bottom-center">
            <Lap laps={laps} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StopwatchWithTimer;

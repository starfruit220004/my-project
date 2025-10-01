import React, { useState, useEffect } from 'react';
import "../assets/css/stopwatch.css";
import Lap from './Lap';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [lapseTime, setLapseTime] = useState("");
    const [showLap,  setShowLap] =  useState(false);
    
    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, startTime]);

    function startOrStop() {
        if (!isRunning) {
            setIsRunning(true);
            setStartTime(Date.now() - elapsedTime);
            setHasStarted(true);
        } else {
            setIsRunning(false);
        }
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        setLapseTime("");
        setStartTime(null);
        setHasStarted(false); 
        setShowLap(false);
        
    }

    function lapse() {
        if (!isRunning) return;
        setLapseTime(formatTime());
        setShowLap(true);
        
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
        <div className="stopwatch">
            <div className="stopwatch-box">
                <div className="display">{formatTime()}</div>
                <div className="buttons">
                    {
                        !isRunning
                            ? (
                                <button className='start-button' onClick={startOrStop}>
                                    {hasStarted ? "Resume" : "Start"}
                                </button>
                              )
                            : <button className='stop-button' onClick={startOrStop}>Stop</button>
                    }
                    <button onClick={reset} className="reset-button">Reset</button>
                    <button className='lapse-button' onClick={lapse}>Lap</button>
                </div>
            </div>
                {showLap && <Lap time={lapseTime} />}
        </div>
    );
}

export default Stopwatch;

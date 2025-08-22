import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(/* boolean */ false);
  const [elapsedTime, setElapsedTime] = useState(/* initial value */ 0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

      if (isRunning) {
        intervalIdRef.current = setInterval(() => {
          setElapsedTime(Date.now() - startTimeRef.current);
        }, 10);
      }

    return () => {
       clearInterval(intervalIdRef.current) 
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    console.log(startTimeRef.current);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {

let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
let seconds = Math.floor(elapsedTime / (1000) % 60)
let milliseconds = Math.floor((elapsedTime % 1000) / 10)

hours = String(hours).padStart(2,"0")
minutes = String(minutes).padStart(2,"0")
seconds = String(seconds).padStart(2,"0")
milliseconds = String(milliseconds).padStart(2,"0")

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
  <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      <div className="flex flex-col items-center justify-center w-92 h-92 rounded-full bg-neutral-900 border-4 border-lime-400">
        <div className="text-5xl font-mono font-bold text-lime-400  mb-6">
          {formatTime()}
        </div>

        <div className="flex gap-3">
          <button
            onClick={start}
            className="px-4 py-2 rounded-full bg-lime-400 text-white font-semibold hover:bg-lime-500 cursor-pointer focus:ring-2 focus:ring-emerald-600 transition"
          >
            Start
          </button>

          <button
            onClick={stop}
            className="px-4 py-2 rounded-full bg-lime-400 text-white font-semibold hover:bg-lime-500 focus:ring-2 focus:ring-red-400 transition"
          >
            Stop
          </button>

          <button
            onClick={reset}
            className="px-4 py-2 rounded-full bg-lime-400 text-white font-semibold hover:bg-lime-500 focus:ring-2 focus:ring-sky-400 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </>
);

};

export default Stopwatch;

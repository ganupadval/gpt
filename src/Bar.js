import React, { useState, useEffect } from "react";
import ProgressBar from "./progressbar";


const time = 30;

export default function Bar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      if (time >= seconds) {
        const newProgress = (seconds / time) * 100;
        setProgress(newProgress);
        seconds += 1;
      } else {
        clearInterval(interval); // Stop the interval when time is up
      }
    }, 1000);

    return () => {
      clearInterval(interval); // Clean up the interval on unmount
    };
  }, [time]);

  return (
    <div className="App">
      <ProgressBar progress={progress} />
    </div>
  );
}

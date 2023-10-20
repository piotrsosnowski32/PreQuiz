import { useState, useEffect } from "react";

interface TimerProps {
    onFinish?: () => void;
    initTime?: number;
}

const Timer = ( { onFinish, initTime } : TimerProps ) => {
    const [seconds, setSeconds] = useState(initTime ?? 10);

      useEffect(() => {
        const Timer = setInterval(() => {
          if(seconds > 0) {
            setSeconds(seconds - 1)
          } else if(seconds === 0) {
            onFinish?.();
            setSeconds(-1);
          }   
        }, 1000);

        return () => clearInterval(Timer)
      }, [onFinish, seconds])

    return (
      <div className="timer">
        {seconds}
      </div>
    )
  }

  export default Timer;
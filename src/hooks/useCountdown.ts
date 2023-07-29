import { useState, useEffect } from "react";
import { clearTimeout, setTimeout } from "timers";

const useCountdown = (seconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
  const [start, setStart] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsFinished(true);
      return;
    }

    if (start) {
      const timeout = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [secondsLeft, start]);

  const startCountdown = () => {
    setStart(true);
  };

  return { secondsLeft, startCountdown, isFinished };
};

export default useCountdown;

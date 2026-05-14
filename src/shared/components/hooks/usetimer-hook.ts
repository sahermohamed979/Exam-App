"use client";
import { useTimer } from "react-timer-hook";

const getExpiry = (minutes: number) => {
  const t = new Date();
  t.setSeconds(t.getSeconds() + minutes * 60); 
  return t;
};

export function useResendTimer(minutes: number) {
  const {
    seconds: s,
    minutes: m,
    hours: h,
    restart,
    pause,
  } = useTimer({
    expiryTimestamp: getExpiry(minutes),
    autoStart: true,
  });

  const remaining = h * 3600 + m * 60 + s;

  const start = () => {
    restart(getExpiry(minutes));
  };
  const stop = () => pause();

  return { remaining, start, stop };
}

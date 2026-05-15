"use client";
import { useTimer } from "react-timer-hook";

const STORAGE_KEY = "exam_timer_expiry";

const getOrCreateExpiry = (minutes: number): Date => {
  if (typeof window === "undefined") {
    return new Date();
  }

  const saved = sessionStorage.getItem(STORAGE_KEY);

  if (saved) {
    const expiry = new Date(saved);
    if (expiry > new Date()) return expiry;
  }

  const t = new Date();
  t.setSeconds(t.getSeconds() + minutes * 60);
  sessionStorage.setItem(STORAGE_KEY, t.toISOString());
  return t;
};

export function useResendTimer(minutes: number) {
  const { seconds: s, minutes: m, hours: h, restart, pause } = useTimer({
    expiryTimestamp: getOrCreateExpiry(minutes),
    autoStart: true,
  });

  const remaining = h * 3600 + m * 60 + s;

  const start = () => {
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + minutes * 60);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, expiry.toISOString());
    }
    restart(expiry);
  };

  const stop = () => pause();

  return { remaining, start, stop };
}
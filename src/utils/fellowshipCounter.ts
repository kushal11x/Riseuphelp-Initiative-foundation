import { useState, useEffect } from 'react';

/**
 * Calculates a realistic, organic national applicant counter starting above 500+
 * (e.g. 584+) and smoothly increasing in real-time without fake crazy epoch jumps.
 */
export function useFellowshipCounter(initialBase = 584) {
  const STORAGE_KEY = 'ruh_fellowship_counter_v3';

  const [count, setCount] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 500 && parsed < 5000) {
          return parsed;
        }
      }
    } catch {}
    return initialBase;
  });

  useEffect(() => {
    // Increment smoothly every 45 to 80 seconds to simulate real-time national incoming applications
    const intervalTime = Math.floor(Math.random() * 35000) + 45000;
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem(STORAGE_KEY, String(next));
        } catch {}
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return {
    count,
    displayString: `${count}+ Applications Received`,
  };
}

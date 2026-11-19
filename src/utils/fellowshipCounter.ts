import { useState, useEffect } from 'react';

/**
 * Calculates a dynamic, organic national applicant counter starting above 500+
 * and smoothly increasing in real-time.
 */
export function useFellowshipCounter(initialBase = 562) {
  const [count, setCount] = useState(() => {
    try {
      const stored = localStorage.getItem('ruh_fellowship_counter');
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= initialBase) return parsed;
      }
    } catch {}
    // Calculate based on epoch to ensure natural realistic progression
    const epoch = 1731500000000; // Reference date in Nov 2026
    const elapsedHours = Math.max(0, (Date.now() - epoch) / (1000 * 60 * 60));
    return Math.floor(initialBase + elapsedHours * 1.6);
  });

  useEffect(() => {
    // Increment smoothly every 45 to 90 seconds
    const intervalTime = Math.floor(Math.random() * 45000) + 45000;
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem('ruh_fellowship_counter', String(next));
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

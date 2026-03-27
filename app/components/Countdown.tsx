'use client';
import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string; // ISO date string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    } as const;
  };

  const [timeLeft, setTimeLeft] = useState<
    | { days: number; hours: number; minutes: number; seconds: number }
    | null
  >(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <p className="text-gold">Acara telah berlangsung.</p>;
  }

  return (
    <div className="flex justify-center gap-2 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-2xl font-mono text-gold" style={{ fontFamily: 'Inter' }}>
            {value}
          </span>
          <span className="text-xs uppercase text-white" style={{ fontFamily: 'Inter' }}>
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

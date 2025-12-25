'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
  onExpire?: () => void;
}

export function CountdownTimer({ targetDate, label = "Volgende workshop start over:", onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        onExpire?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  if (isExpired) {
    return (
      <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-2xl p-6 text-center">
        <p className="text-[#f5a623] font-bold text-lg">Workshop is gestart!</p>
      </div>
    );
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-[#24242d] rounded-xl p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]">
      <div className="text-2xl sm:text-3xl font-bold text-[#f5a623] tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs sm:text-sm text-[#6a6a70] mt-1">{label}</div>
    </div>
  );

  return (
    <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-[#f5a623]" />
        <p className="text-[#9a9a9f] font-medium">{label}</p>
      </div>

      <div className="flex justify-center gap-2 sm:gap-4">
        <TimeBlock value={timeLeft.days} label="dagen" />
        <TimeBlock value={timeLeft.hours} label="uren" />
        <TimeBlock value={timeLeft.minutes} label="min" />
        <TimeBlock value={timeLeft.seconds} label="sec" />
      </div>

      <p className="text-center text-sm text-[#f5a623] mt-4 font-medium">
        Nog slechts 6 plekken beschikbaar!
      </p>
    </div>
  );
}

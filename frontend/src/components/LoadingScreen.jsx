import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onFinish }) => {
  const [phase, setPhase] = useState('loading'); // loading -> fade-out -> done

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fade-out'), 1800);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onFinish?.();
    }, 2400);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onFinish]);

  if (phase === 'done') return null;

  return (
    <div
      data-testid="loading-screen"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1628] transition-opacity duration-600 ${
        phase === 'fade-out' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Animated logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-[#d4a650]/30 rounded-full animate-[spin_3s_linear_infinite]" />
            {/* Inner ring */}
            <div className="absolute inset-2 border-2 border-[#d4a650]/60 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-pulse">
                <path d="M20 4L4 16V36H16V24H24V36H36V16L20 4Z" stroke="#d4a650" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 4L4 16" stroke="#d4a650" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20 4L36 16" stroke="#d4a650" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <h1 className="text-2xl font-bold tracking-wider mb-4">
          <span className="text-white">CONSTRUYE</span>{' '}
          <span className="text-[#d4a650]">TU HOGAR</span>
        </h1>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#d4a650] to-[#e8c06a] rounded-full loading-bar-animate" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

import { useState } from 'react';

export default function Button({ children = 'Click me', onClick, className = '' }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = e => {
    setPressed(true);
    setTimeout(() => setPressed(false), 350);
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative px-6 py-3 rounded-2xl
        text-white font-medium
        bg-white/10 backdrop-blur-md
        border border-white/25
        shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        transition-transform duration-300
        [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
        hover:bg-white/15 hover:border-white/35
        active:scale-90
        ${pressed ? 'scale-110' : 'scale-100'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
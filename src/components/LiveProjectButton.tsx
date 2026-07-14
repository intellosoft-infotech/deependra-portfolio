interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

const LiveProjectButton = ({
  label = 'Live Project',
  href = '#',
  className = '',
}: LiveProjectButtonProps) => {
  return (
    <>
      <style>{`
        @keyframes smoothBlink {
          0%, 100% { 
            opacity: 0.35; 
            transform: scale(0.85); 
            box-shadow: 0 0 4px rgba(255, 0, 0, 0.4);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2); 
            box-shadow: 0 0 16px #ff0000;
          }
        }
        .custom-blink-glow {
          animation: smoothBlink 1.6s ease-in-out infinite;
        }
      `}</style>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className}`}
      >
        <span className="relative flex h-2.5 w-2.5 mr-3 shrink-0 items-center justify-center">
          {/* Smooth custom-pulsing bright red glow */}
          <span className="custom-blink-glow absolute inline-flex h-full w-full rounded-full bg-[#ff0000]"></span>
          {/* Bright red solid core */}
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff0000] shadow-[0_0_8px_#ff0000]"></span>
        </span>
        {label}
      </a>
    </>
  );
};

export default LiveProjectButton;

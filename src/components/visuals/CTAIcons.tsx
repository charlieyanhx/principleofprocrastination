"use client";

export function ReviewIcon({ className }: { className?: string }) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes review-scan {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.7; }
          40% { transform: translate(6px, 4px); opacity: 1; }
          50% { transform: translate(6px, 4px) scale(1.1); opacity: 1; }
          60% { transform: translate(6px, 4px); opacity: 1; }
          90% { transform: translate(0px, 8px); opacity: 0.7; }
        }
        @keyframes review-highlight {
          0%, 100% { opacity: 0; }
          45%, 55% { opacity: 0.5; }
        }
      `}</style>

      {/* Clipboard body */}
      <rect
        x={10}
        y={8}
        width={20}
        height={28}
        rx={2}
        stroke="#e5e5e5"
        strokeWidth={1.5}
        fill="none"
      />
      {/* Clipboard clip */}
      <rect
        x={16}
        y={5}
        width={8}
        height={5}
        rx={1}
        stroke="#e5e5e5"
        strokeWidth={1.5}
        fill="none"
      />
      {/* Text lines */}
      <line x1={15} y1={17} x2={25} y2={17} stroke="#e5e5e5" strokeWidth={1} strokeLinecap="round" />
      <line x1={15} y1={21} x2={23} y2={21} stroke="#e5e5e5" strokeWidth={1} strokeLinecap="round" />
      <line x1={15} y1={25} x2={25} y2={25} stroke="#e5e5e5" strokeWidth={1} strokeLinecap="round" />
      <line x1={15} y1={29} x2={21} y2={29} stroke="#e5e5e5" strokeWidth={1} strokeLinecap="round" />

      {/* Highlight zone (appears when magnifier passes) */}
      <rect
        x={14}
        y={19.5}
        width={12}
        height={4}
        rx={1}
        fill="#b98b55"
        style={{ animation: "review-highlight 3s ease-in-out infinite" }}
      />

      {/* Magnifying glass group */}
      <g style={{ animation: "review-scan 3s ease-in-out infinite" }}>
        <circle
          cx={30}
          cy={20}
          r={5.5}
          stroke="#b98b55"
          strokeWidth={1.5}
          fill="none"
        />
        <line
          x1={34}
          y1={24}
          x2={38}
          y2={28}
          stroke="#b98b55"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function ThesisIcon({ className }: { className?: string }) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes thesis-page-left {
          0%, 100% { transform: rotateY(0deg); }
          25% { transform: rotateY(-12deg); }
          50% { transform: rotateY(0deg); }
        }
        @keyframes thesis-page-right {
          0%, 50% { transform: rotateY(0deg); }
          75% { transform: rotateY(12deg); }
          100% { transform: rotateY(0deg); }
        }
        .thesis-left-page {
          transform-origin: 24px 24px;
          animation: thesis-page-left 4s ease-in-out infinite;
        }
        .thesis-right-page {
          transform-origin: 24px 24px;
          animation: thesis-page-right 4s ease-in-out infinite;
        }
      `}</style>

      {/* Book spine */}
      <line
        x1={24}
        y1={10}
        x2={24}
        y2={38}
        stroke="#b98b55"
        strokeWidth={1.5}
      />

      {/* Left page */}
      <g className="thesis-left-page">
        <path
          d="M24 10 L8 12 L8 36 L24 38"
          stroke="#e5e5e5"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
        />
        {/* Left page text lines */}
        <line x1={12} y1={17} x2={21} y2={16} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={12} y1={21} x2={20} y2={20} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={12} y1={25} x2={21} y2={24.5} stroke="#b98b55" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={12} y1={29} x2={19} y2={28.5} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={12} y1={33} x2={21} y2={32.5} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
      </g>

      {/* Right page */}
      <g className="thesis-right-page">
        <path
          d="M24 10 L40 12 L40 36 L24 38"
          stroke="#e5e5e5"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
        />
        {/* Right page text lines */}
        <line x1={27} y1={16} x2={37} y2={17} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={27} y1={20} x2={36} y2={21} stroke="#b98b55" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={27} y1={24.5} x2={37} y2={25} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={27} y1={28.5} x2={35} y2={29} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={27} y1={32.5} x2={37} y2={33} stroke="#e5e5e5" strokeWidth={0.8} strokeLinecap="round" />
      </g>

      {/* Page edge accents */}
      <path
        d="M8 12 L8 36"
        stroke="#b98b55"
        strokeWidth={0.8}
        strokeLinecap="round"
      />
      <path
        d="M40 12 L40 36"
        stroke="#b98b55"
        strokeWidth={0.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactIcon({ className }: { className?: string }) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes contact-pulse-primary {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes contact-pulse-secondary {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .contact-bubble-primary {
          transform-origin: 18px 20px;
          animation: contact-pulse-primary 2.5s ease-in-out infinite;
        }
        .contact-bubble-secondary {
          transform-origin: 32px 26px;
          animation: contact-pulse-secondary 2.5s ease-in-out 0.6s infinite;
        }
      `}</style>

      {/* Primary speech bubble (gold, left/top) */}
      <g className="contact-bubble-primary">
        <path
          d="M6 12 L30 12 Q32 12 32 14 L32 24 Q32 26 30 26 L14 26 L10 31 L10 26 L8 26 Q6 26 6 24 Z"
          stroke="#b98b55"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
        />
        {/* Dots inside primary bubble */}
        <circle cx={14} cy={19} r={1.2} fill="#b98b55" />
        <circle cx={19} cy={19} r={1.2} fill="#b98b55" />
        <circle cx={24} cy={19} r={1.2} fill="#b98b55" />
      </g>

      {/* Secondary speech bubble (gray, right/bottom, overlapping) */}
      <g className="contact-bubble-secondary">
        <path
          d="M18 22 L40 22 Q42 22 42 24 L42 32 Q42 34 40 34 L36 34 L36 38 L32 34 L20 34 Q18 34 18 32 Z"
          stroke="#e5e5e5"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
        />
        {/* Dots inside secondary bubble */}
        <circle cx={26} cy={28} r={1.2} fill="#e5e5e5" />
        <circle cx={31} cy={28} r={1.2} fill="#e5e5e5" />
        <circle cx={36} cy={28} r={1.2} fill="#e5e5e5" />
      </g>
    </svg>
  );
}

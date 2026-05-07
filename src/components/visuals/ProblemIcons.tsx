"use client";

const GRAY = "#e5e5e5";
const DIM = "rgba(229,229,229,0.35)";
const GOLD = "#b98b55";
const MUTED = "rgba(115,115,115,0.4)";

// ---------------------------------------------------------------------------
// 1. DataAssemblyIcon
//    Engineers pull data from ERP, MES into spreadsheets manually.
//    Visual: Multiple source boxes (ERP, MES) with data streams flowing
//    into a center document, but the streams are manual/slow — dashed,
//    with a small figure icon doing the assembly.
// ---------------------------------------------------------------------------

export function ScatteredSignalsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={120}
      height={120}
      className={className}
      aria-label="Manual data assembly"
    >
      <style>{`
        @keyframes data-pull-1 {
          0%, 100% { stroke-dashoffset: 20; opacity: 0.2; }
          50% { stroke-dashoffset: 0; opacity: 0.5; }
        }
        @keyframes data-pull-2 {
          0%, 100% { stroke-dashoffset: 20; opacity: 0.2; }
          50% { stroke-dashoffset: 0; opacity: 0.5; }
        }
        @keyframes data-pull-3 {
          0%, 100% { stroke-dashoffset: 20; opacity: 0.2; }
          50% { stroke-dashoffset: 0; opacity: 0.5; }
        }
        @keyframes cursor-blink {
          0%, 49% { opacity: 0.6; }
          50%, 100% { opacity: 0; }
        }
        @keyframes doc-line-fill {
          0% { width: 0; }
          50% { width: 22px; }
          100% { width: 0; }
        }
        .dp-1 { animation: data-pull-1 3s ease-in-out infinite; }
        .dp-2 { animation: data-pull-2 3s ease-in-out 0.8s infinite; }
        .dp-3 { animation: data-pull-3 3s ease-in-out 1.6s infinite; }
        .cursor { animation: cursor-blink 1s step-end infinite; }
      `}</style>

      {/* Source box: ERP (top-left) */}
      <rect x={8} y={14} width={28} height={18} rx={3}
        fill="none" stroke={GRAY} strokeWidth={1} opacity={0.5} />
      <text x={22} y={26} textAnchor="middle" fontSize={7}
        fill={MUTED} fontFamily="Inter, sans-serif" fontWeight={600}>ERP</text>

      {/* Source box: MES (top-right) */}
      <rect x={84} y={14} width={28} height={18} rx={3}
        fill="none" stroke={GRAY} strokeWidth={1} opacity={0.5} />
      <text x={98} y={26} textAnchor="middle" fontSize={7}
        fill={MUTED} fontFamily="Inter, sans-serif" fontWeight={600}>MES</text>

      {/* Source box: WMS (left) */}
      <rect x={4} y={50} width={26} height={18} rx={3}
        fill="none" stroke={GRAY} strokeWidth={1} opacity={0.5} />
      <text x={17} y={62} textAnchor="middle" fontSize={6.5}
        fill={MUTED} fontFamily="Inter, sans-serif" fontWeight={600}>WMS</text>

      {/* Center document (spreadsheet) */}
      <rect x={42} y={42} width={36} height={44} rx={3}
        fill="none" stroke={GOLD} strokeWidth={1.2} opacity={0.5} />
      {/* Grid lines inside doc */}
      <line x1={42} y1={52} x2={78} y2={52} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />
      <line x1={42} y1={62} x2={78} y2={62} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />
      <line x1={42} y1={72} x2={78} y2={72} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />
      <line x1={55} y1={42} x2={55} y2={86} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />
      <line x1={67} y1={42} x2={67} y2={86} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />

      {/* Blinking cursor in the doc */}
      <rect x={46} y={46} width={1.5} height={5} fill={GOLD} className="cursor" />

      {/* Data streams (dashed, slow — manual pulling) */}
      <path d="M 36,26 Q 42,35 46,42"
        fill="none" stroke={GRAY} strokeWidth={0.8}
        strokeDasharray="3 3" className="dp-1" />
      <path d="M 84,26 Q 75,35 72,42"
        fill="none" stroke={GRAY} strokeWidth={0.8}
        strokeDasharray="3 3" className="dp-2" />
      <path d="M 30,58 Q 36,58 42,58"
        fill="none" stroke={GRAY} strokeWidth={0.8}
        strokeDasharray="3 3" className="dp-3" />

      {/* Small dots traveling along streams */}
      <circle r={2} fill={GOLD} opacity={0.6}>
        <animateMotion dur="3s" repeatCount="indefinite"
          path="M 36,26 Q 42,35 46,42" />
      </circle>
      <circle r={2} fill={GOLD} opacity={0.6}>
        <animateMotion dur="3s" repeatCount="indefinite" begin="0.8s"
          path="M 84,26 Q 75,35 72,42" />
      </circle>
      <circle r={2} fill={GOLD} opacity={0.6}>
        <animateMotion dur="3s" repeatCount="indefinite" begin="1.6s"
          path="M 30,58 Q 36,58 42,58" />
      </circle>

      {/* Email arrow going out (bottom-right) */}
      <line x1={78} y1={76} x2={100} y2={90}
        stroke={GRAY} strokeWidth={0.8} strokeDasharray="3 4" opacity={0.3} />
      <polygon points="98,85 104,92 96,92"
        fill={GRAY} opacity={0.3} />
      <text x={102} y={102} textAnchor="middle" fontSize={6}
        fill={MUTED} fontFamily="Inter, sans-serif">→ mgmt</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 2. HumanAPIIcon
//    Managers sit between systems translating info back and forth.
//    Visual: A person/node in the center with bidirectional arrows to
//    system boxes on each side. The person pulses (overloaded), arrows
//    cycle back and forth showing constant translation.
// ---------------------------------------------------------------------------

export function TangledRoutesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={120}
      height={120}
      className={className}
      aria-label="Human API between systems"
    >
      <style>{`
        @keyframes arrow-left {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(-4px); opacity: 0.7; }
        }
        @keyframes arrow-right {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(4px); opacity: 0.7; }
        }
        @keyframes person-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes data-left-flow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes data-right-flow {
          0% { stroke-dashoffset: -24; }
          100% { stroke-dashoffset: 0; }
        }
        .arrow-l { animation: arrow-left 2s ease-in-out infinite; }
        .arrow-r { animation: arrow-right 2s ease-in-out 1s infinite; }
        .person-glow { animation: person-pulse 2s ease-in-out infinite; }
        .flow-l { animation: data-left-flow 2s linear infinite; }
        .flow-r { animation: data-right-flow 2s linear infinite; }
      `}</style>

      {/* Left system block */}
      <rect x={4} y={35} width={28} height={40} rx={3}
        fill="none" stroke={GRAY} strokeWidth={1} opacity={0.5} />
      <text x={18} y={50} textAnchor="middle" fontSize={6.5}
        fill={MUTED} fontFamily="Inter, sans-serif" fontWeight={600}>SYS A</text>
      {/* Data lines inside */}
      <line x1={9} y1={57} x2={27} y2={57} stroke={GRAY} strokeWidth={0.5} opacity={0.25} />
      <line x1={9} y1={62} x2={23} y2={62} stroke={GRAY} strokeWidth={0.5} opacity={0.25} />
      <line x1={9} y1={67} x2={25} y2={67} stroke={GRAY} strokeWidth={0.5} opacity={0.25} />

      {/* Right system block */}
      <rect x={88} y={35} width={28} height={40} rx={3}
        fill="none" stroke={GRAY} strokeWidth={1} opacity={0.5} />
      <text x={102} y={50} textAnchor="middle" fontSize={6.5}
        fill={MUTED} fontFamily="Inter, sans-serif" fontWeight={600}>SYS B</text>
      {/* Data lines inside */}
      <line x1={93} y1={57} x2={111} y2={57} stroke={GRAY} strokeWidth={0.5} opacity={0.25} />
      <line x1={93} y1={62} x2={107} y2={62} stroke={GRAY} strokeWidth={0.5} opacity={0.25} />
      <line x1={93} y1={67} x2={109} y2={67} stroke={GRAY} strokeWidth={0.5} opacity={0.25} />

      {/* Center person icon */}
      <g className="person-glow">
        {/* Head */}
        <circle cx={60} cy={45} r={7} fill="none" stroke={GOLD} strokeWidth={1.2} />
        {/* Body */}
        <line x1={60} y1={52} x2={60} y2={68} stroke={GOLD} strokeWidth={1.2} />
        {/* Arms */}
        <line x1={50} y1={58} x2={70} y2={58} stroke={GOLD} strokeWidth={1.2} />
      </g>

      {/* Bidirectional flow lines — left */}
      <line x1={32} y1={50} x2={50} y2={50}
        stroke={GRAY} strokeWidth={0.8} strokeDasharray="3 3" className="flow-l" opacity={0.4} />
      <line x1={32} y1={60} x2={50} y2={60}
        stroke={GRAY} strokeWidth={0.8} strokeDasharray="3 3" className="flow-r" opacity={0.4} />

      {/* Bidirectional flow lines — right */}
      <line x1={70} y1={50} x2={88} y2={50}
        stroke={GRAY} strokeWidth={0.8} strokeDasharray="3 3" className="flow-r" opacity={0.4} />
      <line x1={70} y1={60} x2={88} y2={60}
        stroke={GRAY} strokeWidth={0.8} strokeDasharray="3 3" className="flow-l" opacity={0.4} />

      {/* Arrow heads */}
      <polygon points="50,47 50,53 46,50" fill={GOLD} opacity={0.5} className="arrow-l" />
      <polygon points="50,57 50,63 54,60" fill={GOLD} opacity={0.5} className="arrow-r" />
      <polygon points="70,47 70,53 74,50" fill={GOLD} opacity={0.5} className="arrow-r" />
      <polygon points="70,57 70,63 66,60" fill={GOLD} opacity={0.5} className="arrow-l" />

      {/* Label underneath */}
      <text x={60} y={88} textAnchor="middle" fontSize={6}
        fill={MUTED} fontFamily="Inter, sans-serif" letterSpacing={0.5}>HUMAN API</text>

      {/* Overload indicator — small stress marks */}
      <line x1={52} y1={38} x2={50} y2={35} stroke={GOLD} strokeWidth={0.8} opacity={0.4}>
        <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1.5s" repeatCount="indefinite" />
      </line>
      <line x1={68} y1={38} x2={70} y2={35} stroke={GOLD} strokeWidth={0.8} opacity={0.4}>
        <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 3. ScatteredContextIcon
//    A procurement approval sits for 3 days. The decision needs data from
//    ERP, quality system, supplier email, shared drive — all scattered.
//    Visual: A document in the center with a clock/wait indicator.
//    Surrounding it: scattered data fragments with thin broken lines
//    that never quite connect. Nothing assembles the context.
// ---------------------------------------------------------------------------

export function ManualHandoffIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={120}
      height={120}
      className={className}
      aria-label="Scattered context waiting"
    >
      <style>{`
        @keyframes wait-tick {
          0% { transform: rotate(0deg); transform-origin: 60px 42px; }
          100% { transform: rotate(360deg); transform-origin: 60px 42px; }
        }
        @keyframes fragment-drift {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-2px); opacity: 0.55; }
        }
        @keyframes line-reach {
          0%, 100% { stroke-dashoffset: 16; opacity: 0.15; }
          50% { stroke-dashoffset: 8; opacity: 0.3; }
        }
        @keyframes day-count {
          0%, 33% { opacity: 0; }
          34%, 66% { opacity: 0.3; }
          67%, 100% { opacity: 0.5; }
        }
        .wait-hand { animation: wait-tick 6s linear infinite; }
        .frag-1 { animation: fragment-drift 3s ease-in-out infinite; }
        .frag-2 { animation: fragment-drift 3s ease-in-out 0.7s infinite; }
        .frag-3 { animation: fragment-drift 3s ease-in-out 1.4s infinite; }
        .frag-4 { animation: fragment-drift 3s ease-in-out 2.1s infinite; }
        .reach-line { animation: line-reach 3s ease-in-out infinite; }
        .day-dots { animation: day-count 6s step-end infinite; }
      `}</style>

      {/* Center document (the approval) */}
      <rect x={46} y={28} width={28} height={34} rx={3}
        fill="none" stroke={GOLD} strokeWidth={1.2} opacity={0.5} />
      {/* Document lines */}
      <line x1={50} y1={36} x2={70} y2={36} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />
      <line x1={50} y1={41} x2={66} y2={41} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />
      <line x1={50} y1={46} x2={68} y2={46} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />
      <line x1={50} y1={51} x2={64} y2={51} stroke={GOLD} strokeWidth={0.5} opacity={0.2} />

      {/* Clock overlay on document */}
      <circle cx={60} cy={42} r={8} fill="none" stroke={GOLD} strokeWidth={0.8} opacity={0.3} />
      <line x1={60} y1={42} x2={60} y2={37} stroke={GOLD} strokeWidth={1} opacity={0.5} className="wait-hand" />
      <line x1={60} y1={42} x2={64} y2={42} stroke={GOLD} strokeWidth={0.8} opacity={0.4} className="wait-hand"
        style={{ animationDuration: "1.5s" }} />

      {/* 3 day dots */}
      <circle cx={53} cy={67} r={2} fill={GOLD} opacity={0.5} className="day-dots" />
      <circle cx={60} cy={67} r={2} fill={GOLD} opacity={0.5} className="day-dots"
        style={{ animationDelay: "2s" }} />
      <circle cx={67} cy={67} r={2} fill={GOLD} opacity={0.5} className="day-dots"
        style={{ animationDelay: "4s" }} />
      <text x={60} y={76} textAnchor="middle" fontSize={5.5}
        fill={MUTED} fontFamily="Inter, sans-serif">3 days</text>

      {/* Scattered data fragments around the document */}
      {/* Top-left: ERP data */}
      <rect x={8} y={12} width={22} height={14} rx={2}
        fill="none" stroke={GRAY} strokeWidth={0.8} opacity={0.4} className="frag-1" />
      <line x1={12} y1={18} x2={26} y2={18} stroke={GRAY} strokeWidth={0.5} opacity={0.25} className="frag-1" />
      <line x1={12} y1={22} x2={22} y2={22} stroke={GRAY} strokeWidth={0.5} opacity={0.25} className="frag-1" />

      {/* Top-right: Quality system */}
      <rect x={90} y={16} width={22} height={14} rx={2}
        fill="none" stroke={GRAY} strokeWidth={0.8} opacity={0.4} className="frag-2" />
      <line x1={94} y1={22} x2={108} y2={22} stroke={GRAY} strokeWidth={0.5} opacity={0.25} className="frag-2" />
      <line x1={94} y1={26} x2={104} y2={26} stroke={GRAY} strokeWidth={0.5} opacity={0.25} className="frag-2" />

      {/* Bottom-left: Supplier email */}
      <rect x={6} y={70} width={22} height={14} rx={2}
        fill="none" stroke={GRAY} strokeWidth={0.8} opacity={0.4} className="frag-3" />
      {/* Envelope shape */}
      <polyline points="9,72 17,78 25,72" fill="none" stroke={GRAY} strokeWidth={0.5} opacity={0.25} className="frag-3" />

      {/* Bottom-right: Shared drive */}
      <rect x={92} y={66} width={22} height={14} rx={2}
        fill="none" stroke={GRAY} strokeWidth={0.8} opacity={0.4} className="frag-4" />
      {/* Folder tab */}
      <path d="M 95,68 L 95,66 L 102,66 L 104,68" fill="none" stroke={GRAY} strokeWidth={0.5} opacity={0.25} className="frag-4" />

      {/* Broken connection lines — reaching toward doc but not connecting */}
      <line x1={30} y1={22} x2={42} y2={32}
        stroke={GRAY} strokeWidth={0.6} strokeDasharray="2 4" className="reach-line" />
      <line x1={90} y1={26} x2={76} y2={34}
        stroke={GRAY} strokeWidth={0.6} strokeDasharray="2 4" className="reach-line"
        style={{ animationDelay: "0.7s" }} />
      <line x1={28} y1={74} x2={44} y2={58}
        stroke={GRAY} strokeWidth={0.6} strokeDasharray="2 4" className="reach-line"
        style={{ animationDelay: "1.4s" }} />
      <line x1={92} y1={72} x2={76} y2={58}
        stroke={GRAY} strokeWidth={0.6} strokeDasharray="2 4" className="reach-line"
        style={{ animationDelay: "2.1s" }} />
    </svg>
  );
}

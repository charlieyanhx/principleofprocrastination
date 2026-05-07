"use client";

const STROKE = "rgba(255,255,255,0.4)";
const GOLD = "#b98b55";

// ---------------------------------------------------------------------------
// 1. SignalAggregateIcon – three input streams merging into one output
//    Maps to: 信号智能体 — aggregates data from multiple systems
// ---------------------------------------------------------------------------

export function GearTrainIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={64}
      height={64}
      className={className}
      aria-label="Signal aggregation icon"
    >
      <style>{`
        @keyframes stream-flow {
          0%   { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulse-out {
          0%   { stroke-dashoffset: 16; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes node-pulse {
          0%, 100% { r: 3; opacity: 0.6; }
          50%      { r: 4; opacity: 1; }
        }
        .stream-in  { animation: stream-flow 2s linear infinite; }
        .stream-out { animation: pulse-out 2s linear infinite; }
        .merge-node { animation: node-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Three input streams converging to center node */}
      <line x1={4} y1={12} x2={22} y2={24}
        stroke={STROKE} strokeWidth={1}
        strokeDasharray="3 2" className="stream-in"
        style={{ animationDelay: "0s" }} />
      <line x1={4} y1={24} x2={22} y2={24}
        stroke={STROKE} strokeWidth={1}
        strokeDasharray="3 2" className="stream-in"
        style={{ animationDelay: "0.3s" }} />
      <line x1={4} y1={36} x2={22} y2={24}
        stroke={STROKE} strokeWidth={1}
        strokeDasharray="3 2" className="stream-in"
        style={{ animationDelay: "0.6s" }} />

      {/* Input dots */}
      <circle cx={4} cy={12} r={1.5} fill={STROKE} />
      <circle cx={4} cy={24} r={1.5} fill={STROKE} />
      <circle cx={4} cy={36} r={1.5} fill={STROKE} />

      {/* Center merge node */}
      <circle cx={24} cy={24} r={3} fill={GOLD} className="merge-node" />

      {/* Output stream */}
      <line x1={26} y1={24} x2={44} y2={24}
        stroke={GOLD} strokeWidth={1.5}
        strokeDasharray="4 2" className="stream-out" />

      {/* Output arrow */}
      <path d="M 41 21 L 44 24 L 41 27" fill="none" stroke={GOLD} strokeWidth={1} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 2. DecisionRouterIcon – input hits a junction, switch toggles between paths
//    Maps to: 决策智能体 — routes approvals, surfaces anomalies
// ---------------------------------------------------------------------------

export function CamMechanismIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={64}
      height={64}
      className={className}
      aria-label="Decision router icon"
    >
      <style>{`
        @keyframes switch-toggle {
          0%, 40%   { transform: rotate(0deg); }
          50%, 90%  { transform: rotate(-30deg); }
          100%      { transform: rotate(0deg); }
        }
        @keyframes path-a-glow {
          0%, 40%   { stroke: ${GOLD}; opacity: 1; }
          50%, 90%  { stroke: rgba(255,255,255,0.4); opacity: 0.5; }
          100%      { stroke: ${GOLD}; opacity: 1; }
        }
        @keyframes path-b-glow {
          0%, 40%   { stroke: rgba(255,255,255,0.4); opacity: 0.5; }
          50%, 90%  { stroke: ${GOLD}; opacity: 1; }
          100%      { stroke: rgba(255,255,255,0.4); opacity: 0.5; }
        }
        .switch-arm   { animation: switch-toggle 3s ease-in-out infinite; }
        .route-a      { animation: path-a-glow 3s ease-in-out infinite; }
        .route-b      { animation: path-b-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Input line */}
      <line x1={4} y1={24} x2={20} y2={24}
        stroke={STROKE} strokeWidth={1} />

      {/* Junction node */}
      <circle cx={22} cy={24} r={3} fill={GOLD} />

      {/* Switch arm (toggles direction) */}
      <line x1={22} y1={24} x2={34} y2={24}
        stroke={GOLD} strokeWidth={1.5}
        className="switch-arm"
        style={{ transformOrigin: "22px 24px" }} />

      {/* Route A: upper path */}
      <path d="M 25 22 Q 32 14 40 14"
        fill="none" strokeWidth={1} className="route-a" />
      <circle cx={42} cy={14} r={2} fill="none" stroke={GOLD} strokeWidth={1} className="route-a" />

      {/* Route B: lower path */}
      <path d="M 25 26 Q 32 34 40 34"
        fill="none" strokeWidth={1} className="route-b" />
      <circle cx={42} cy={34} r={2} fill="none" stroke={GOLD} strokeWidth={1} className="route-b" />

      {/* Labels: small ticks at endpoints */}
      <line x1={42} y1={12} x2={42} y2={10} stroke={STROKE} strokeWidth={0.5} />
      <line x1={42} y1={36} x2={42} y2={38} stroke={STROKE} strokeWidth={0.5} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 3. ExecuteBroadcastIcon – center node sends pulses to multiple endpoints
//    Maps to: 执行智能体 — triggers downstream processes across teams/systems
// ---------------------------------------------------------------------------

export function PistonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={64}
      height={64}
      className={className}
      aria-label="Execution broadcast icon"
    >
      <style>{`
        @keyframes broadcast-pulse {
          0%   { stroke-dashoffset: 12; opacity: 0; }
          20%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.6; }
        }
        @keyframes ring-expand {
          0%   { r: 5; opacity: 0.6; }
          100% { r: 12; opacity: 0; }
        }
        .bc-line-0 { animation: broadcast-pulse 2s ease-out infinite; animation-delay: 0s; }
        .bc-line-1 { animation: broadcast-pulse 2s ease-out infinite; animation-delay: 0.25s; }
        .bc-line-2 { animation: broadcast-pulse 2s ease-out infinite; animation-delay: 0.5s; }
        .bc-line-3 { animation: broadcast-pulse 2s ease-out infinite; animation-delay: 0.75s; }
        .bc-line-4 { animation: broadcast-pulse 2s ease-out infinite; animation-delay: 1.0s; }
        .bc-ring   { animation: ring-expand 2s ease-out infinite; }
      `}</style>

      {/* Center source node */}
      <circle cx={14} cy={24} r={3.5} fill={GOLD} />

      {/* Expanding ring pulse */}
      <circle cx={14} cy={24} r={5} fill="none"
        stroke={GOLD} strokeWidth={0.8} className="bc-ring" />

      {/* Broadcast lines to 5 endpoints */}
      <line x1={17} y1={24} x2={42} y2={10}
        stroke={GOLD} strokeWidth={1}
        strokeDasharray="3 2" className="bc-line-0" />
      <line x1={17} y1={24} x2={44} y2={18}
        stroke={GOLD} strokeWidth={1}
        strokeDasharray="3 2" className="bc-line-1" />
      <line x1={17} y1={24} x2={44} y2={24}
        stroke={GOLD} strokeWidth={1}
        strokeDasharray="3 2" className="bc-line-2" />
      <line x1={17} y1={24} x2={44} y2={30}
        stroke={GOLD} strokeWidth={1}
        strokeDasharray="3 2" className="bc-line-3" />
      <line x1={17} y1={24} x2={42} y2={38}
        stroke={GOLD} strokeWidth={1}
        strokeDasharray="3 2" className="bc-line-4" />

      {/* Endpoint nodes */}
      <circle cx={42} cy={10} r={1.5} fill={STROKE} />
      <circle cx={44} cy={18} r={1.5} fill={STROKE} />
      <circle cx={44} cy={24} r={1.5} fill={STROKE} />
      <circle cx={44} cy={30} r={1.5} fill={STROKE} />
      <circle cx={42} cy={38} r={1.5} fill={STROKE} />
    </svg>
  );
}

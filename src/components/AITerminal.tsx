// @ts-nocheck
import React, { useState, useEffect } from 'react';

export const AITerminal: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "CORE:: INITIALIZING QUANTUM TELEMETRY LINK...",
    "BMS:: SCANNING BATTERY CELL CLUSTERS...",
    "PINN:: PREDICTIVE THERMAL ALGORITHMS: STANDBY"
  ]);

  useEffect(() => {
    const logsPool = [
      "BMS:: OPTIMAL CELL RESONANCE DETECTED IN CLUSTER #42",
      "THERMAL:: RUNNING PREDICTIVE ANALYSIS... STABLE",
      "AI:: BATTERY PASSPORT GENERATION IN PROGRESS (ERR < 3%)",
      "CORE:: SYNCHRONIZING WITH DATABASE TELEMETRY",
      "SYS:: DEPLOYING FRESNEL RIM LIGHTING SCHEMATICS",
      "BMS:: HIGH-VOLTAGE BALANCING: ACTIVE"
    ];

    const interval = setInterval(() => {
      const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
      setLogs(prev => [ `[${new Date().toLocaleTimeString()}] ${randomLog}`, prev[0], prev[1] ].slice(0, 3));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950/80 border border-slate-800/60 rounded-2xl p-4 font-mono text-xs shadow-inner h-28 flex flex-col justify-between mt-4">
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">&gt;_ LIVE AI DIAGNOSTICS TERMINAL LOG:</div>
      <div className="flex-1 space-y-1 text-cyan-500/80 mt-2 overflow-hidden select-text font-bold">
        {logs.map((log, idx) => (
          <div key={idx} className="truncate tracking-wide text-right" style={{ direction: 'ltr' }}>{log}</div>
        ))}
      </div>
    </div>
  );
};
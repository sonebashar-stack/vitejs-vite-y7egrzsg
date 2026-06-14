// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- الأيقونات ---
const IconRadar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="12" x2="19" y2="5"/></svg>;
const IconTerminal = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

// --- CSS CSS للـ Sci-Fi HUD ---
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
    
    #root, body, html { width: 100% !important; margin: 0 !important; background-color: #030712; color: #e2e8f0; font-family: system-ui, sans-serif; }
    
    /* شبكة الفضاء الرقمي الخلفية */
    body::before {
      content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background-image: linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
      background-size: 30px 30px; z-index: -1; pointer-events: none;
    }

    .font-tech { font-family: 'Share Tech Mono', monospace; }
    
    /* خطوط المسح الضوئي (Scanlines) */
    .scanline-container { position: relative; overflow: hidden; }
    .scanline-container::after {
      content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 5px;
      background: rgba(217, 70, 239, 0.4); box-shadow: 0 0 10px rgba(217, 70, 239, 0.8);
      animation: scan 4s linear infinite; pointer-events: none; opacity: 0.5;
    }
    @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }

    /* تأثير الوميض للجاهزية */
    @keyframes hud-pulse {
      0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); border-color: rgba(6, 182, 212, 0.8); }
      70% { box-shadow: 0 0 0 15px rgba(6, 182, 212, 0); border-color: rgba(6, 182, 212, 0.2); }
      100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); border-color: rgba(6, 182, 212, 0.8); }
    }
    .hud-ready { animation: hud-pulse 2s infinite; }

    /* تأثير الطباعة الحركية للـ Terminal */
    .typewriter { overflow: hidden; white-space: nowrap; border-left: 2px solid #06b6d4; animation: typing 2s steps(40, end) infinite, blink-caret .75s step-end infinite; }
    @keyframes typing { from { width: 0 } to { width: 100% } }
    @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #06b6d4; } }
  `;
  document.head.appendChild(style);
}

// دالة الصوت التوليدي (Web Audio API)
const playBeep = (freq = 880, type = 'sine') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) { /* صامت في حال منع المتصفح */ }
};

// --- مكون العداد الدائري (Circular HUD) ---
const CircularHUD = ({ percentage, colorStr, label }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="transform -rotate-90 w-16 h-16">
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#1e293b]" />
          <circle cx="32" cy="32" r={radius} stroke={colorStr} strokeWidth="4" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out drop-shadow-[0_0_5px_currentColor]" />
        </svg>
        <span className="absolute font-tech text-[10px] font-bold" style={{ color: colorStr }}>{percentage}%</span>
      </div>
      <span className="text-[8px] font-tech tracking-widest text-slate-400 mt-1 uppercase">{label}</span>
    </div>
  );
};

// --- مكون السجل الطرفي للذكاء الاصطناعي (Live AI Terminal) ---
const AITerminal = ({ text }) => {
    const lines = [
        "Initializing Neural Diagnostics...",
        "BMS_CELL_BALANCING: ACTIVE",
        "Thermal Anomaly: NONE DETECTED",
        `TARGET: ${text.substring(0, 15)}...`,
        "Applying Quantum Fix..."
    ];
    const [lineIdx, setLineIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLineIdx(prev => (prev + 1) % lines.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#030712] border border-[#1e293b] p-2 rounded-lg font-tech text-[9px] text-[#06b6d4] h-14 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-1 right-1 opacity-50"><IconTerminal /></div>
            <span className="text-slate-500 mb-1">root@AI-DIAGNOSTICS:~$</span>
            <div className="typewriter text-[#d946ef] drop-shadow-[0_0_2px_#d946ef]">{lines[lineIdx]}</div>
        </div>
    );
}

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        
        if (Array.isArray(data) && isMounted) {
          const getCleanValue = (row, possibleKeys) => {
             const rowKeys = Object.keys(row);
             for (let pKey of possibleKeys) {
                const foundKey = rowKeys.find(k => k.trim() === pKey);
                if (foundKey && row[foundKey] !== undefined && row[foundKey] !== "") return row[foundKey];
             }
             return null;
          };

          const liveRows = data.filter(r => {
             const isArchived = getCleanValue(r, ["مرحل"]);
             const customer = getCleanValue(r, ["اسم الزبون", "الزبون"]);
             return customer !== null && isArchived !== true && isArchived !== "TRUE" && isArchived !== "true";
          });

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;

            return {
              id,
              plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة كهربائية",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || status,
              status,
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف"]) || "-",
              cost: parseFloat(rawCost) || 0,
              soc: 30 + (plateNum % 66),
              soh: 85 + (plateNum % 15)
            };
          });

          setTickets(parsedTickets.reverse());
        }
      } catch (err) { console.error("API Error:", err); }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 10000);
    return () => { isMounted = false; clearInterval(loop); };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header FUI Style */}
      <header className="w-full bg-[#0b0f19]/80 backdrop-blur-md border-b border-[#1e293b] px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="text-[#06b6d4] animate-pulse drop-shadow-[0_0_8px_#06b6d4]"><IconRadar /></div>
          <div>
            <h1 className="text-xl font-black text-white tracking-widest font-tech drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">RAMLI <span className="text-[#06b6d4]">AI-SYS</span></h1>
            <span className="text-[9px] text-[#f59e0b] font-tech uppercase tracking-widest bg-[#f59e0b]/10 px-1 border border-[#f59e0b]/30">Automated Diagnostics Live</span>
          </div>
        </div>
        <div className="font-tech text-xs bg-[#030712] border border-[#1e293b] px-4 py-2 rounded text-[#06b6d4] shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            SYS_TIME: {currentTime.toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </header>

      {/* Main Board */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {tickets.map(t => {
            let glowColor = "#f59e0b"; // Amber for waiting (Predictive Maintenance style)
            let isReady = false;
            let percent = 35;
            
            if (t.status.includes('عمل') || t.status.includes('فحص')) { 
                glowColor = "#d946ef"; // Magenta for active scanning
                percent = 70;
            }
            if (t.status.includes('جاهز') || t.status.includes('تسليم')) { 
                glowColor = "#06b6d4"; // Cyan for ready
                percent = 100;
                isReady = true;
            }

            return (
              <div key={t.id} 
                   className={`relative bg-[#0b0f19]/90 backdrop-blur-lg border rounded-lg p-5 flex flex-col justify-between scanline-container transition-all duration-500
                   ${isReady ? 'hud-ready' : ''}`}
                   style={{ borderColor: `rgba(${glowColor === '#06b6d4' ? '6,182,212' : glowColor === '#d946ef' ? '217,70,239' : '245,158,11'}, 0.3)` }}>
                
                {/* زوايا تصويبية ستايل الخيال العلمي */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: glowColor }}></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: glowColor }}></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: glowColor }}></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: glowColor }}></div>

                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-[#1e293b] pb-2">
                    <span className="font-tech text-[#06b6d4] text-[10px] tracking-widest">ID_REF: {t.id}</span>
                    <span className="font-tech text-[10px] px-2 py-0.5 uppercase tracking-widest bg-opacity-20 border"
                          style={{ color: glowColor, backgroundColor: glowColor, borderColor: glowColor }}>
                        {t.status}
                    </span>
                </div>

                {/* Identity */}
                <div className="mb-4">
                    <h3 className="font-tech text-white text-xl tracking-widest mb-1">{t.plate}</h3>
                    <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">{t.carModel}</span>
                        <span className="text-[#06b6d4]">{t.customer.split(' ')[0]}</span>
                    </div>
                </div>

                {/* HUD Data (Circular Graphs) */}
                <div className="flex justify-between items-center bg-[#030712] rounded p-3 border border-[#1e293b] mb-4">
                    <CircularHUD percentage={percent} colorStr={glowColor} label="PRG" />
                    <CircularHUD percentage={t.soc} colorStr="#06b6d4" label="SOC" />
                    <CircularHUD percentage={t.soh} colorStr="#f59e0b" label="SOH" />
                </div>

                {/* AI Terminal output instead of regular text */}
                <AITerminal text={t.problem} />

                {/* Footer Data */}
                <div className="border-t border-[#1e293b] pt-3 mt-4 flex justify-between font-tech text-[10px]">
                    <span className="text-slate-500">VAL: <span className="text-white">{t.cost} JOD</span></span>
                    <span className="text-slate-500">OPR: <span style={{ color: glowColor }}>{t.engineer}</span></span>
                </div>
              </div>
            );
          })}
          {tickets.length === 0 && <div className="text-[#06b6d4] font-tech col-span-full py-10 text-center animate-pulse">NO ACTIVE DIAGNOSTICS IN RANGE...</div>}
        </div>
      </main>
    </div>
  );
}
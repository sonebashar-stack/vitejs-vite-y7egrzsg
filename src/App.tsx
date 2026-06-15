// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { useWebAudio } from './hooks/useWebAudio';
import { QuantumHeader } from './components/QuantumHeader';
import { AITerminal } from './components/AITerminal';
import { HologramStage } from './components/HologramStage';
import { LiveYardCarousel } from './components/LiveYardCarousel';

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [readyTimers, setReadyTimers] = useState({});
  const [activeCarId, setActiveCarId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { startAmbientEngine, playReadyBeep, playScannerSound } = useWebAudio();

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
             const customer = getCleanValue(r, ["اسم الزبون", "الزبون", "اسم العميل"]);
             return customer !== null && isArchived !== true && String(isArchived).toUpperCase() !== "TRUE";
          });

          let playBeep = false;
          const currentTimers = { ...readyTimers };

          const parsedTickets = liveRows.map((t, idx) => {
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = String(getCleanValue(t, ["حالة السيارة", "الحالة"]) || "قيد الانتظار");
            const isReady = status.includes("جاهز") || status.includes("تسليم");
            
            if (isReady) {
              if (!currentTimers[id]) { currentTimers[id] = Date.now(); playBeep = true; }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;

            return {
              ticketId: id,
              plate: plateStr,
              brand: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              description: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || status,
              status: status,
              customer: String(getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي"),
              soc: 30 + (plateNum % 66),
              soh: 88 + (plateNum % 11) + (plateNum % 9) / 10,
              temp: 24 + (plateNum % 12)
            };
          });

          if (playBeep) playReadyBeep();
          setReadyTimers(currentTimers);
          
          const reversed = parsedTickets.reverse();
          setTickets(reversed);
          if (reversed.length > 0 && !activeCarId) setActiveCarId(reversed[0].ticketId);
        }
      } catch (err) { console.error(err); }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 8000);
    return () => { isMounted = false; clearInterval(loop); };
  }, [readyTimers, activeCarId]);

  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز') || t.status.includes('تسليم');
      if (isReady && readyTimers[t.ticketId] && (Date.now() - readyTimers[t.ticketId] > 4 * 60 * 1000)) return false; 
      return true;
    });
  }, [tickets, readyTimers, currentTime]);

  const activeCar = useMemo(() => displayTickets.find(t => t.ticketId === activeCarId) || displayTickets[0] || null, [displayTickets, activeCarId]);

  const handleCarSelect = (id) => {
    setActiveCarId(id);
    playScannerSound(); 
  };

  return (
    // الشاشة تملأ العرض والطول بالكامل 100vw 100vh
    <div className="w-screen h-screen flex flex-col overflow-hidden" onClick={startAmbientEngine}>
      
      {/* رأس الشاشة (مدمج ورفيع لترك مساحة للبيانات) */}
      <div className="h-16 shrink-0 z-20">
         <QuantumHeader currentTime={currentTime} onLogoClick={startAmbientEngine} />
      </div>

      {/* منطقة العرض الرئيسية مقسمة لـ 3 أعمدة تملأ الشاشة */}
      <main className="flex-1 w-full p-4 grid grid-cols-12 gap-6 z-10 h-[calc(100vh-4rem)]">
        
        {/* العمود الأيسر (3/12): طابور السيارات الحي */}
        <div className="col-span-3 h-full flex flex-col hud-panel p-4">
          <div className="text-[10px] font-black text-[#00f3ff] mb-4 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-[#00f3ff]/20 pb-2">
            <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse shadow-[0_0_8px_#00f3ff]"></span>
            SYSTEM_QUEUE
          </div>
          <div className="flex-1 overflow-hidden">
            <LiveYardCarousel tickets={displayTickets} activeCarId={activeCarId} onCarSelect={handleCarSelect} />
          </div>
        </div>

        {/* العمود الأوسط (6/12): المجسم العملاق والمركز البصري */}
        <div className="col-span-6 h-full flex flex-col hud-panel p-1 relative">
          <div className="absolute top-4 left-6 z-20">
             <h2 className="text-4xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{activeCar?.brand || "AWAITING"}</h2>
             <div className="text-sm font-mono mt-1 text-[#00ff88]">OWNER_ID // <span className="text-white">{activeCar?.customer || "---"}</span></div>
          </div>
          <div className="absolute top-4 right-6 z-20 text-right font-mono">
             <div className="text-[10px] text-slate-400 tracking-widest">PLATE_LINK</div>
             <div className="text-2xl font-black text-[#00f3ff] tracking-widest drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">{activeCar?.plate || "---"}</div>
          </div>
          
          <div className="flex-1 w-full h-full rounded-xl overflow-hidden">
             {/* مساحة المجسم الهولوغرافي الذي سيكبر ليملأ هذا الفراغ الشاسع */}
             <HologramStage status={activeCar?.status} />
          </div>
        </div>

        {/* العمود الأيمن (3/12): التحليل المتقدم والذكاء الاصطناعي */}
        <div className="col-span-3 h-full flex flex-col gap-4">
          
          {/* عدادات الحيوية */}
          <div className="h-2/5 hud-panel p-4 flex flex-col justify-around">
            <div className="text-[10px] font-black text-slate-400 mb-2 tracking-[0.2em] border-b border-white/10 pb-2">DIAGNOSTICS_HUD</div>
            
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-300 font-mono tracking-widest">S.O.C</span>
              <span className="text-2xl font-black text-[#ffb800] drop-shadow-[0_0_8px_rgba(255,184,0,0.8)]">{activeCar?.soc || 0}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-300 font-mono tracking-widest">HEALTH</span>
              <span className="text-2xl font-black text-[#00ff88] drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]">{activeCar?.soh?.toFixed(1) || 0}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-300 font-mono tracking-widest">THERMAL</span>
              <span className="text-2xl font-black text-[#00f3ff] drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">{activeCar?.temp || 0}°C</span>
            </div>
          </div>

          {/* التيرمنال العميق يملأ باقي المساحة */}
          <div className="h-3/5 hud-panel p-0 overflow-hidden">
             <AITerminal />
          </div>

        </div>

      </main>
    </div>
  );
}
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { useWebAudio } from './hooks/useWebAudio';
import { QuantumHeader } from './components/QuantumHeader';
import { AITerminal } from './components/AITerminal';
import { HologramStage } from './components/HologramStage';
import { LiveYardCarousel } from './components/LiveYardCarousel';

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes pulse-border {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink-card {
      animation: pulse-border 1.5s infinite !important;
      background-color: rgba(16, 185, 129, 0.04) !important;
    }
  `;
  document.head.appendChild(style);
}

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [readyTimers, setReadyTimers] = useState({});
  const [activeCarId, setActiveCarId] = useState(null); // تتبع السيارة المعروضة في الهولوغرام
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { startAmbientEngine, playReadyBeep } = useWebAudio();

  // تحديث الساعة
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب البيانات من السحابة
  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("فشل الاتصال");
        const data = await res.json();
        
        if (Array.isArray(data) && isMounted) {
          const getCleanValue = (row, possibleKeys) => {
             const rowKeys = Object.keys(row);
             for (let pKey of possibleKeys) {
                const foundKey = rowKeys.find(k => k.trim() === pKey);
                if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null && row[foundKey] !== "") return row[foundKey];
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
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            
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
              payment: String(getCleanValue(t, ["طريقة الدفع", "الدفع"]) || "كاش"),
              staff: [String(getCleanValue(t, ["الموظف المسؤول", "الموظف"]) || "-")],
              cost: parseFloat(rawCost) || 0,
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
          
          // تحديد أول سيارة كنشطة إذا لم يكن هناك سيارة محددة
          if (reversed.length > 0 && !activeCarId) {
            setActiveCarId(reversed[0].ticketId);
          }
          
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("خطأ في الاتصال بالمنظومة السحابية");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 10000);
    return () => { isMounted = false; clearInterval(loop); };
  }, [readyTimers, activeCarId]);

  // إخفاء الـ 4 دقائق
  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز') || t.status.includes('تسليم');
      if (isReady && readyTimers[t.ticketId]) {
        const elapsed = Date.now() - readyTimers[t.ticketId];
        if (elapsed > 4 * 60 * 1000) return false; 
      }
      return true;
    });
  }, [tickets, readyTimers, currentTime]);

  // إحصائيات
  const stats = useMemo(() => {
    return {
      waiting: displayTickets.filter(t => !t.status.includes('عمل') && !t.status.includes('فحص') && !t.status.includes('جاهز') && !t.status.includes('تسليم')).length,
      working: displayTickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: displayTickets.filter(t => t.status.includes('جاهز') || t.status.includes('تسليم')).length,
    };
  }, [displayTickets]);

  // استخراج السيارة النشطة لعرضها في الهولوغرام
  const activeCar = useMemo(() => {
    return displayTickets.find(t => t.ticketId === activeCarId) || displayTickets[0] || null;
  }, [displayTickets, activeCarId]);

  // دالة النقر على الكرت
  const handleCarSelect = (id) => {
    setActiveCarId(id);
    // تشغيل صوت رادار خفيف عند تغيير السيارة (اختياري)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle'; osc.frequency.setValueAtTime(300, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } catch(e) {}
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans flex flex-col relative overflow-hidden" onClick={startAmbientEngine}>
      {/* شبكة الفضاء الرقمي في الخلفية */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none z-0"></div>

      <div className="z-10 w-full flex flex-col h-screen">
        <QuantumHeader currentTime={currentTime} onLogoClick={startAmbientEngine} />

        <div className="flex flex-1 overflow-hidden">
          {/* مساحة العرض المركزية الكبرى مقسومة قسمين */}
          <main className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
            {error && <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl mb-4 text-sm font-bold flex-shrink-0">{error}</div>}
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-6">
              
              {/* القسم الأيمن: كبسولة الفحص 3D والتيرمنال (7 أعمدة) */}
              <div className="lg:col-span-7 flex flex-col gap-4 h-full">
                
                {/* كبسولة الفحص الرئيسية (الهولوغرام) */}
                <div className="flex-1 bg-[#090d16]/70 border border-[#162235] backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-[9px] font-black text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded z-10">
                    HOLOGRAM DIAGNOSTICS
                  </div>

                  {activeCar ? (
                    <>
                      <div className="flex justify-between items-start z-10 mb-2">
                        <div>
                          <h2 className="text-2xl font-black text-white">{activeCar.brand}</h2>
                          <p className="text-xs text-slate-400 mt-1">الزبون: <span className="text-cyan-400 font-bold">{activeCar.customer}</span></p>
                        </div>
                        <div className="text-left font-mono bg-[#04070d] border border-[#162235] px-4 py-2 rounded-xl shadow-inner">
                          <div className="text-[9px] text-slate-500 font-bold mb-1">PLATE NUMBER</div>
                          <div className="text-xl font-black text-cyan-400 tracking-widest">{activeCar.plate}</div>
                        </div>
                      </div>

                      {/* هنا يتم استدعاء المجسم ثلاثي الأبعاد وإعطاؤه لون الحالة */}
                      <div className="flex-1 w-full relative min-h-[220px]">
                        <HologramStage status={activeCar.status} />
                      </div>

                      {/* العدادات الدائرية السفلية */}
                      <div className="grid grid-cols-3 gap-4 border-t border-[#162235] pt-4 mt-2 z-10">
                        <div className="text-center">
                          <span className="text-[9px] text-slate-500 font-bold block mb-1">STATE OF CHARGE</span>
                          <div className="text-xl font-black text-amber-400 font-mono">{activeCar.soc}%</div>
                          <div className="w-16 h-1 bg-slate-900 rounded-full mx-auto mt-2 overflow-hidden"><div className="h-full bg-amber-500" style={{width: `${activeCar.soc}%`}}></div></div>
                        </div>
                        <div className="text-center border-x border-[#162235]">
                          <span className="text-[9px] text-slate-500 font-bold block mb-1">HEALTH (SOH)</span>
                          <div className="text-xl font-black text-emerald-400 font-mono">{activeCar.soh.toFixed(1)}%</div>
                          <span className="text-[8px] text-emerald-500/70 font-bold mt-1 block">CELLS STABLE</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[9px] text-slate-500 font-bold block mb-1">THERMAL</span>
                          <div className="text-xl font-black text-cyan-400 font-mono">{activeCar.temp}°C</div>
                          <span className="text-[8px] text-cyan-500/70 font-bold mt-1 block">COOLING: OK</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-600 font-bold text-sm">بانتظار وصول مركبات للساحة...</div>
                  )}
                </div>

                {/* التيرمنال الذكي في الأسفل */}
                <AITerminal />
              </div>

              {/* القسم الأيسر: العدادات السريعة وكاروسيل الكروت (5 أعمدة) */}
              <div className="lg:col-span-5 flex flex-col gap-4 h-full overflow-hidden">
                {/* عدادات علوية مدمجة */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#090d16]/80 border border-[#162235] p-3.5 rounded-xl text-center shadow-lg">
                    <span className="text-slate-500 text-[10px] font-black tracking-wider uppercase block">قيد الانتظار</span>
                    <span className="text-2xl font-black text-amber-400 font-mono block mt-1">{stats.waiting}</span>
                  </div>
                  <div className="bg-[#090d16]/80 border border-[#162235] p-3.5 rounded-xl text-center shadow-lg">
                    <span className="text-slate-400 text-[10px] font-black tracking-wider uppercase block">تحت الفحص</span>
                    <span className="text-2xl font-black text-cyan-400 font-mono block mt-1">{stats.working}</span>
                  </div>
                  <div className="bg-[#090d16]/80 border border-emerald-500/30 p-3.5 rounded-xl text-center shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                    <span className="text-emerald-400 text-[10px] font-black tracking-wider uppercase block">جاهزة للتسليم</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono block mt-1 animate-pulse">{stats.ready}</span>
                  </div>
                </div>

                {/* الكاروسيل المنزلق للسيارات باستخدام Framer Motion */}
                <div className="flex-1 bg-[#090d16]/50 border border-[#162235] backdrop-blur-md rounded-xl p-4 flex flex-col overflow-hidden shadow-xl">
                  <div className="text-xs font-black text-white mb-4 tracking-widest uppercase flex items-center gap-2 border-b border-[#162235] pb-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    ممر الحركة الفورية للمركبات
                  </div>
                  
                  {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-cyan-400 font-mono text-xs tracking-widest animate-pulse">ESTABLISHING LINK...</div>
                  ) : (
                    <LiveYardCarousel 
                       tickets={displayTickets} 
                       activeCarId={activeCarId} 
                       onCarSelect={handleCarSelect} 
                    />
                  )}
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
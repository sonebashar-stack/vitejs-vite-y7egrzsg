// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// أيقونات سايبربانك والذكاء الاصطناعي (AI & Cyberpunk Icons)
// ==========================================
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1 3-4"/><path d="M12 13v8"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;

const IconBattery = ({ level }) => {
  let color = "#10b981"; // أخضر
  if (level <= 20) color = "#f43f5e"; // أحمر
  else if (level <= 50) color = "#f59e0b"; // أصفر
  const fillWidth = Math.max(1, 12 * (level / 100));
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke="currentColor" className="text-slate-500" />
      <line x1="22" x2="22" y1="11" y2="13" stroke="currentColor" className="text-slate-500" />
      <rect width={fillWidth} height="6" x="4" y="9" rx="1" ry="1" fill={color} stroke="none" />
    </svg>
  );
};

// أيقونات الحالة العائمة (الفني / الفحص / التسليم)
const AvatarInspect = () => <div className="animate-bounce bg-amber-500/20 text-amber-400 p-2 rounded-full border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>;
const AvatarWork = () => <div className="animate-spin-slow bg-cyan-500/20 text-cyan-400 p-2 rounded-full border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>;
const AvatarReady = () => <div className="animate-pulse bg-emerald-500/20 text-emerald-400 p-2 rounded-full border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.5)]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></div>;


const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Orbitron:wght@400;700;900&display=swap');
    
    #root, body, html { 
        width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; 
        background-color: #010308; color: #f0f4f8; font-family: 'Cairo', system-ui, sans-serif;
        overflow-x: hidden;
    }
    
    .font-orbitron { font-family: 'Orbitron', sans-serif; }
    
    /* خلفية الخلايا العصبية والذكاء الاصطناعي */
    .neural-bg {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1;
        background: radial-gradient(circle at 15% 50%, rgba(6, 182, 212, 0.04), transparent 50%),
                    radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.04), transparent 50%);
        background-color: #010308;
    }
    .neural-grid {
        position: absolute; top: 0; left: 0; width: 200%; height: 200%;
        background-image: 
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
        background-size: 40px 40px;
        animation: panGrid 60s linear infinite;
        transform: perspective(500px) rotateX(45deg);
        transform-origin: top;
        opacity: 0.6;
    }

    @keyframes panGrid {
        0% { transform: perspective(500px) rotateX(45deg) translateY(0); }
        100% { transform: perspective(500px) rotateX(45deg) translateY(-40px); }
    }

    /* الشريط الإخباري (Ticker) */
    .ticker-container { overflow: hidden; white-space: nowrap; box-sizing: border-box; width: 100%; display: flex; align-items: center;}
    .ticker-content { display: inline-block; padding-left: 100%; animation: ticker 35s linear infinite; }
    .ticker-content:hover { animation-play-state: paused; }
    @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(100%, 0, 0); } }

    /* حواف الكروت السايبربانك (Circuit Lines) */
    .cyber-card { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
    .cyber-card::before {
        content: ''; position: absolute; top: 0; left: 0; width: 2px; height: 100%;
        background: linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.8), transparent);
        opacity: 0; transition: opacity 0.3s;
    }
    .cyber-card:hover::before { opacity: 1; }

    /* أنيميشن انفجار الكرت (Ready Pop) */
    @keyframes superPop {
        0% { transform: scale(0.5) translateY(100px); opacity: 0; filter: blur(10px); }
        15% { transform: scale(1.1) translateY(-10px); opacity: 1; filter: blur(0px); box-shadow: 0 0 80px rgba(16, 185, 129, 0.6); }
        25% { transform: scale(1) translateY(0); box-shadow: 0 0 50px rgba(16, 185, 129, 0.4); }
        90% { transform: scale(1) translateY(0); opacity: 1; box-shadow: 0 0 50px rgba(16, 185, 129, 0.4); }
        100% { transform: scale(0.8) translateY(-50px); opacity: 0; filter: blur(10px); }
    }
    .ready-modal-animate { animation: superPop 10s ease-in-out forwards; }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #010308; }
    ::-webkit-scrollbar-thumb { background: #162235; border-radius: 10px; }
    .animate-spin-slow { animation: spin 4s linear infinite; }
  `;
  document.head.appendChild(style);
}

// =====================================
// نظام الصوت الخفي 
// =====================================
let globalAudioCtx = null; let audioInitialized = false;
const initAudioSilent = () => {
  if (audioInitialized) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    globalAudioCtx = new AudioContext();
    if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
    audioInitialized = true;
  } catch (e) { console.error("Audio init failed", e); }
};
const playReadySound = () => {
  if (!globalAudioCtx || !audioInitialized) return; 
  if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
  try {
    const ctx = globalAudioCtx; const t = ctx.currentTime;
    const playAlertTone = (freq, startTime, duration, volume = 0.1) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(freq, startTime);
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02); 
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.start(startTime); osc.stop(startTime + duration + 0.1);
    };
    playAlertTone(880.00, t, 0.5, 0.1);
    playAlertTone(1318.51, t + 0.25, 1.5, 0.1);
  } catch (e) { console.error("Audio blocked by browser.", e); }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [highlightedCar, setHighlightedCar] = useState(null); // للسيارة التي تجهز للتو

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => { initAudioSilent(); document.removeEventListener('click', handleFirstInteraction); };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const timestampUrl = `${API_URL}?t=${new Date().getTime()}`;
        const res = await fetch(timestampUrl, { cache: "no-store" });
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
             const status = String(getCleanValue(r, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "");
             return customer !== null && isArchived !== true && isArchived !== "TRUE" && isArchived !== "true" && !status.includes("تسليم") && !status.includes("تم التسليم");
          });

          let playBeep = false;
          let newHighlight = null;
          const currentTimers = { ...readyTimers };

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
           
            const isReady = status.includes("جاهز");
            const ticketData = {
              id,
              time: getCleanValue(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO'),
              plate: String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100"),
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost: parseFloat(rawCost) || 0,
              soc: parseInt(String(getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"])).replace(/\D/g, '')) || (30 + ((parseInt(String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100").replace(/\D/g, '')) || 101) % 66)),
            };

            if (isReady) {
              if (!currentTimers[id]) { 
                  currentTimers[id] = Date.now(); 
                  playBeep = true; 
                  newHighlight = ticketData; // حفظ الكرت ليعرض بمنتصف الشاشة
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }
            return ticketData;
          });

          if (playBeep) playReadySound();
          if (newHighlight && !highlightedCar) {
              setHighlightedCar(newHighlight);
              setTimeout(() => setHighlightedCar(null), 10000); // يختفي بعد 10 ثواني
          }

          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) { console.error("الربط السحابي معطل:", err); }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 1500);
    return () => { isMounted = false; clearInterval(loop); };
  }, [readyTimers, highlightedCar]);

  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز');
      if (isReady && readyTimers[t.id]) {
        const elapsed = Date.now() - readyTimers[t.id];
        if (elapsed > 4 * 60 * 1000) return false; 
      }
      return true;
    });
  }, [tickets, readyTimers, currentTime]);

  const accounting = useMemo(() => {
    let grossRevenue = 0, laborFees = 0, partsRevenue = 0, cliqTotal = 0, cashTotal = 0;
    displayTickets.forEach(t => {
      grossRevenue += t.cost;
      laborFees += t.cost * 0.4; partsRevenue += t.cost * 0.6; 
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) cliqTotal += t.cost;
      else cashTotal += t.cost;
    });
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, taxes: grossRevenue * 0.05, netProfit: grossRevenue - (grossRevenue * 0.05) };
  }, [displayTickets]);

  return (
    <div className="min-h-screen w-full flex flex-col select-none relative" dir="rtl">
      
      {/* خلفية الذكاء الاصطناعي (العصبية) */}
      <div className="neural-bg"><div className="neural-grid"></div></div>

      {/* نافذة انفجار الكرت الجاهز (تظهر فوق كل شيء) */}
      {highlightedCar && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-[#010308]/60 transition-all duration-500">
             <div className="ready-modal-animate w-full max-w-md">
                 <VehicleCard t={highlightedCar} isHighlight={true} />
             </div>
          </div>
      )}

      {/* البار العلوي (Header) */}
      <header className="w-full bg-[#030610]/80 backdrop-blur-md border-b border-[#0d172a] px-6 py-4 flex flex-row justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] p-1">
             <img src="/logo.jpg" alt="Logo" className="h-full w-full object-contain rounded-lg" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-3 rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.3)] animate-pulse">
            <IconBrain />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-orbitron px-2 py-0.5 rounded-md tracking-widest uppercase">AI Cloud Gateway</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-wider">ABU AL-NADI <span className="text-cyan-400 font-light text-sm font-orbitron">AI OS v5.0</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-orbitron text-xs bg-[#050914]/80 border border-[#162235] px-5 py-2.5 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 tracking-widest">
            <span className="text-emerald-400 animate-ping text-[8px]">●</span>
            <span>AMMAN ZONE</span>
            <span className="text-white text-lg font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden z-10">
        {/* القائمة الجانبية (Sidebar) */}
        <aside className="w-20 bg-[#030610]/90 backdrop-blur-md border-l border-[#0d172a] flex flex-col items-center py-6 gap-6 shadow-2xl">
          <SidebarButton icon={<IconGrid />} title="شبكة المركبات الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="الخزينة (Treasury)" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
          <SidebarButton icon={<IconCalendar />} title="سجل الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full relative">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} tickets={displayTickets} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'expenses' && <QuantumExpenses />}
          {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
        </main>
      </div>

      {/* الشريط الإخباري السفلي (EV Tips Ticker) */}
      <footer className="w-full bg-[#030610]/90 border-t border-[#0d172a] h-10 flex items-center z-20 text-[13px] font-bold">
         <div className="bg-cyan-500 text-black h-full px-4 flex items-center shrink-0 z-10 font-orbitron">AI ALERTS</div>
         <div className="ticker-container text-cyan-400/90 h-full">
            <div className="ticker-content flex gap-16">
               <span>🧠 نظام الذكاء الاصطناعي يحلل الآن بيانات البطاريات الحية بكفاءة 99.9%.</span>
               <span>⚡ نصيحة تقنية: تجنب شحن البطارية بنسبة 100% يومياً، اكتفِ بـ 80% لإطالة عمر الخلايا الكيميائية.</span>
               <span>⚠️ تحذير: التفريغ العميق المتكرر (أقل من 10%) يسرع من تدهور بطارية سيارتك بمرور الوقت.</span>
               <span>🛡️ نصيحة تقنية: الركن الطويل تحت أشعة الشمس المباشرة صيفاً يجهد نظام التبريد السائل للبطارية.</span>
               <span>⚙️ معلومة: استخدم الفرملة المتجددة (Regenerative Braking) لزيادة المدى وتقليل تآكل نظام الفرامل.</span>
            </div>
         </div>
      </footer>

    </div>
  );
}

// مكون زر القائمة الجانبية
const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-4 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'text-slate-500 hover:bg-[#0f172a] hover:text-cyan-400'}`}>
    {icon}
    <span className="absolute right-24 bg-[#0f172a] border border-[#1e293b] px-3 py-1.5 rounded-lg text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

// ==========================================
// مكونات عرض الساحة والكروت (Cards & Yard)
// ==========================================
const QuantumYard = ({ tickets }) => {
  const stats = useMemo(() => {
    return {
      waiting: tickets.filter(t => t.status.includes('انتظار')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز')).length,
      total: tickets.length
    };
  }, [tickets]);

  return (
    <div className="w-full space-y-8 animate-fade-in pb-10">
      {/* إحصائيات علوية بشكل متطور */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="مركبات قيد الانتظار" value={stats.waiting} badge="DIAGNOSTIC QUEUE" color="amber" icon={<AvatarInspect />} />
        <StatCard title="قيد العمل / الفحص" value={stats.working} badge="NEURAL PROCESSING" color="cyan" icon={<AvatarWork />} />
        <StatCard title="جاهزة للتسليم" value={stats.ready} badge="READY FOR DEPLOY" color="emerald" isPulse={true} icon={<AvatarReady />} />
        <StatCard title="إجمالي الشبكة الحية" value={stats.total} badge="SYSTEM OVERVIEW" color="white" icon={<IconGrid />} />
      </div>

      <div className="w-full">
        <h2 className="text-sm font-black text-cyan-400 mb-6 uppercase tracking-widest flex items-center gap-3">
          <IconBrain /> <span>شبكة التتبع المباشر (AI Live Tracking Grid)</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-cyan-500/50 to-transparent ml-4"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {tickets.map(t => <VehicleCard key={t.id} t={t} />)}
          {tickets.length === 0 && <div className="text-slate-500 col-span-full py-20 text-center font-bold flex flex-col items-center gap-4"><IconBrain /><p>شبكة المعالجة فارغة. لا توجد مركبات حية حالياً.</p></div>}
        </div>
      </div>
    </div>
  );
};

// تصميم كرت السيارة (Cyberpunk AI Style)
const VehicleCard = ({ t, isHighlight = false }) => {
    let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
    let glow = "border-[#1e293b]";
    let Avatar = AvatarInspect;
    let progressPercent = 15; let progressColor = "bg-amber-500 shadow-[0_0_10px_#f59e0b]";
    
    if (t.status.includes('انتظار')) { 
        badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30"; Avatar = AvatarInspect; 
    }
    if (t.status.includes('عمل') || t.status.includes('فحص')) { 
        badgeStyle = "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
        glow="border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.15)]"; 
        progressPercent = t.status.includes('عمل') ? 75 : 45; 
        progressColor = "bg-cyan-400 shadow-[0_0_15px_#22d3ee]";
        Avatar = AvatarWork;
    }
    if (t.status.includes('جاهز')) { 
        badgeStyle = "bg-emerald-500/20 text-emerald-400 font-bold border-emerald-500/50";
        glow="border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.2)]"; 
        progressPercent = 100; progressColor = "bg-emerald-400 shadow-[0_0_15px_#34d399]"; 
        Avatar = AvatarReady;
    }

    let socColorText = 'text-emerald-400';
    if(t.soc <= 20) socColorText = 'text-rose-400';
    else if(t.soc <= 50) socColorText = 'text-amber-400';

    return (
      <div className={`cyber-card bg-[#050914]/90 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group w-full ${glow} ${isHighlight ? 'scale-100 shadow-[0_0_60px_rgba(16,185,129,0.3)] bg-[#030610]' : 'hover:-translate-y-1'}`}>
        
        {/* الأيقونة العائمة في الزاوية */}
        <div className="absolute top-4 left-4 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            <Avatar />
        </div>

        <div>
          <div className="flex justify-between items-center mb-6 pl-12">
            <span className="font-orbitron text-xs text-slate-400 bg-[#0f172a] px-3 py-1 rounded-md border border-[#1e293b]">CRD #{t.id}</span>
            <span className={`text-[11px] px-3 py-1.5 rounded-md border font-black uppercase tracking-wider flex items-center gap-2 ${badgeStyle}`}>
              {t.status}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="font-black text-white text-2xl tracking-wide mb-2 drop-shadow-md">{t.carModel}</h3>
            <div className="flex items-center gap-2"><span className="text-xs text-slate-500 font-bold">Client:</span><span className="text-sm font-black text-cyan-400">{t.customer}</span></div>
          </div>

          <div className="flex items-center justify-between bg-[#030610] border border-[#1e293b] rounded-xl px-4 py-3 mb-6 relative overflow-hidden">
             {/* خط شبكي خفيف في الخلفية */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent"></div>
            
            <div className="flex-[2] relative z-10">
              <span className="text-[9px] text-slate-500 block font-orbitron font-bold mb-1">SYS_PLATE</span>
              <span className="font-orbitron text-white text-base font-black tracking-widest">{t.plate}</span>
            </div>
            <div className="flex-1 flex flex-col items-end pl-2 border-r border-[#1e293b] pr-4 relative z-10">
              <span className="text-[9px] text-slate-500 block font-orbitron font-bold mb-1">BATTERY_SOC</span>
              <div className="flex items-center gap-2">
                 <span className={`font-orbitron text-sm font-black drop-shadow-md ${socColorText}`}>{t.soc}%</span>
                 <IconBattery level={t.soc} />
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-[10px] font-orbitron font-bold"><span className="text-slate-500">AI_PROGRESS</span><span className="text-white">{progressPercent}%</span></div>
            <div className="w-full h-2 bg-[#0f172a] rounded-full overflow-hidden border border-[#1e293b]">
                <div className={`h-full rounded-full transition-all duration-1000 ease-out ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          
          <div className="bg-[#030610] p-4 rounded-xl border border-[#1e293b] mb-4 relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500/50 rounded-l-xl"></div>
            <span className="text-[10px] text-slate-500 block mb-2 font-bold">تفاصيل الفحص / العطل:</span>
            <div className="text-sm text-slate-300 leading-relaxed font-bold line-clamp-2">{t.problem}</div>
          </div>
        </div>

        <div className="border-t border-[#1e293b] pt-4 flex items-center justify-between text-xs font-bold mt-auto">
           <div><span className="text-slate-500 block mb-1 font-orbitron text-[9px]">TOTAL_VALUE</span><span className="text-white text-base font-black font-orbitron">{t.cost.toFixed(0)} <span className="text-cyan-500 text-xs">JOD</span></span></div>
           <div className="text-left"><span className="text-slate-500 block mb-1 font-orbitron text-[9px]">TECH_ASSIGNED</span><span className="text-cyan-400 font-black">{t.engineer}</span></div>
        </div>
      </div>
    );
};

// ==========================================
// باقي المكونات (Treasury, Receipts, Expenses, Daily Details)
// تم تحديث الألوان لتلائم الديزاين السايبربانك الجديد
// ==========================================

const StatCard = ({ title, value, badge, color, isPulse = false, icon }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    white: "text-white border-slate-700 bg-slate-800/50"
  };

  return (
    <div className={`bg-[#050914]/80 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between border ${colors[color]} relative overflow-hidden group hover:-translate-y-1 transition-transform`}>
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity scale-150">
          {icon}
      </div>
      <span className="text-slate-400 text-[11px] font-black tracking-wider uppercase">{title}</span>
      <div className="flex items-baseline justify-between mt-4">
        <span className={`text-5xl font-black font-orbitron drop-shadow-lg ${colors[color].split(' ')[0]} ${isPulse ? 'animate-pulse' : ''}`}>{value}</span>
        <span className={`text-[9px] font-orbitron px-2 py-1 rounded font-bold border ${colors[color]} bg-black/40`}>{badge}</span>
      </div>
    </div>
  );
};

const QuantumTreasury = ({ accounting }) => (
  <div className="w-full space-y-8 animate-fade-in pb-10">
    <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
      <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/40"><IconCoins /></div>
      الخزينة المركزية (AI Treasury System)
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="الدخل الخام (Gross)" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="عوائد الأيدي العاملة (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="مبيعات القطع (60%)" value={accounting.partsRevenue} color="cyan" />
      <FinanceCard title="صافي التدفق (Net Profit)" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <div className="bg-[#050914]/80 backdrop-blur-md border border-[#1e293b] rounded-2xl p-6 shadow-xl">
         <h3 className="text-sm font-bold text-slate-300 mb-5 border-b border-[#1e293b] pb-4">تحليل قنوات الدفع</h3>
         <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#030610] p-5 rounded-xl border border-[#1e293b]">
               <span className="text-slate-400 font-bold text-sm">مقبوضات الكاش הפوري</span>
               <span className="text-2xl font-black text-emerald-400 font-orbitron">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#030610] p-5 rounded-xl border border-[#1e293b]">
               <span className="text-slate-400 font-bold text-sm">حوالات ذكية (CliQ)</span>
               <span className="text-2xl font-black text-cyan-400 font-orbitron">{accounting.cliqTotal.toFixed(2)} JOD</span>
            </div>
         </div>
       </div>
    </div>
  </div>
);

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
  const glowClass = isGlow ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-900/10' : 'border-[#1e293b] bg-[#050914]/80';
  return (
    <div className={`backdrop-blur-md border ${glowClass} p-8 rounded-2xl`}>
      <span className="text-slate-400 text-xs font-bold block tracking-wider uppercase mb-2">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-orbitron mt-2 block tracking-tighter drop-shadow-md`}>{value.toFixed(2)} <span className="text-sm text-slate-500">JOD</span></span>
    </div>
  );
};

const QuantumReceipts = ({ tickets }) => {
  const paidTickets = tickets.filter(t => t.cost > 0);
  return (
    <div className="w-full space-y-8 animate-fade-in pb-10">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
        <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 border border-blue-500/40"><IconReceipt /></div>
        سجل الإيرادات الذكي
      </h2>
      <div className="w-full bg-[#050914]/80 backdrop-blur-md border border-[#1e293b] rounded-2xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-[#1e293b]">
                <th className="pb-4 px-4 text-center">رقم المرجع</th>
                <th className="pb-4 px-4">رقم اللوحة</th>
                <th className="pb-4 px-4">اسم الزبون</th>
                <th className="pb-4 px-4">نوع المركبة</th>
                <th className="pb-4 px-4 text-center">بوابة الدفع</th>
                <th className="pb-4 px-4 text-left">المبلغ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#0f172a] transition-colors">
                  <td className="py-4 px-4 text-center font-orbitron text-xs text-slate-500">#{t.id}</td>
                  <td className="py-4 px-4 font-orbitron text-sm font-black text-cyan-400">{t.plate}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{t.customer}</td>
                  <td className="py-4 px-4 text-xs text-slate-400">{t.carModel}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-black border ${t.paymentMethod.includes('كليك') ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                      {t.paymentMethod || 'كاش'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-left font-orbitron font-black text-emerald-400 text-lg">+{t.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuantumExpenses = () => {
  const mockExpenses = [{ id: 1, desc: "أكل للشباب", amount: 20, time: "01:30 PM" }, { id: 2, desc: "شراء مواد فحص", amount: 45, time: "11:15 AM" }, { id: 3, desc: "مصاريف ضيافة", amount: 10, time: "09:00 AM" }];
  return (
    <div className="w-full space-y-8 animate-fade-in pb-10">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
        <div className="bg-rose-500/20 p-2.5 rounded-xl text-rose-400 border border-rose-500/40"><IconExpense /></div>
        سجل المصروفات التشغيلية
      </h2>
      <div className="w-full bg-[#050914]/80 backdrop-blur-md border border-[#1e293b] rounded-2xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-[#1e293b]">
                <th className="pb-4 px-4 text-center">الطابع الزمني</th>
                <th className="pb-4 px-4">بيان المصروف</th>
                <th className="pb-4 px-4 text-left">القيمة المخصومة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {mockExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#0f172a] transition-colors">
                  <td className="py-4 px-4 text-center font-orbitron text-xs text-slate-500">{exp.time}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{exp.desc}</td>
                  <td className="py-4 px-4 text-left font-orbitron font-black text-rose-400 text-lg">-{exp.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuantumDailyDetails = ({ tickets }) => {
  const todayStr = new Date().toLocaleDateString('en-GB');
  let dCash = 0, dCliq = 0;
  tickets.forEach(t => { if (t.paymentMethod.includes('كليك')) dCliq += t.cost; else dCash += t.cost; });
  const dExp = 75; const dNet = (dCash + dCliq) - dExp;
  return (
    <div className="w-full space-y-8 animate-fade-in pb-10">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
        <div className="bg-purple-500/20 p-2.5 rounded-xl text-purple-400 border border-purple-500/40"><IconCalendar /></div>
        التقرير اليومي المفصل (Master Log)
      </h2>
      <div className="w-full border border-[#1e293b] rounded-2xl overflow-hidden bg-[#050914]/80 backdrop-blur-md">
        <div className="bg-[#0f172a] text-cyan-400 text-center py-4 font-black tracking-widest border-b border-[#1e293b] flex items-center justify-center gap-2">
          <IconCalendar /> سجل إغلاق نظام الذكاء الاصطناعي: {todayStr}
        </div>
        <div className="p-1 overflow-x-auto">
          <table className="w-full text-center text-xs min-w-[800px]">
            <thead>
              <tr>
                <th className="bg-[#064e3b] text-white py-3 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#064e3b] text-white py-3 px-2 border border-[#1e293b]">الملخص المالي لليوم</th>
                <th className="w-4"></th>
                <th className="bg-[#881337] text-white py-3 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#881337] text-white py-3 px-2 border border-[#1e293b]">بيان المصروف</th>
                <th className="w-4"></th>
                <th className="bg-[#1e293b] text-cyan-400 py-3 px-2 border border-[#334155]">المبلغ</th>
                <th className="bg-[#1e293b] text-cyan-400 py-3 px-2 border border-[#334155]">تفاصيل الشغل</th>
                <th className="bg-[#1e293b] text-cyan-400 py-3 px-2 border border-[#334155]">الموظف المسؤول</th>
                <th className="bg-[#1e293b] text-cyan-400 py-3 px-2 border border-[#334155]">الموديل</th>
                <th className="bg-[#1e293b] text-cyan-400 py-3 px-2 border border-[#334155]">الزبون</th>
                <th className="bg-[#1e293b] text-cyan-400 py-3 px-2 border border-[#334155]">رقم اللوحة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 border border-[#1e293b] font-orbitron font-bold text-slate-300">{dCash}</td>
                <td className="py-2 border border-[#1e293b] font-bold text-emerald-400">دخل الكاش</td>
                <td></td>
                <td className="py-2 border border-[#1e293b] font-orbitron font-bold text-slate-300">20</td>
                <td className="py-2 border border-[#1e293b] font-bold text-slate-300">أكل للشباب</td>
                <td></td>
                {tickets[0] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-orbitron text-emerald-400">{tickets[0].cost} ({tickets[0].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[0].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-orbitron text-cyan-400">{tickets[0].plate}</td>
                   </>
                ) : <td colSpan="6" className="py-2 border border-[#1e293b] text-slate-500">لا يوجد بيانات</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
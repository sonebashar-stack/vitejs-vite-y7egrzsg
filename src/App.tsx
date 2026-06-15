// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// --- أيقونات سايبربانك الهندسية المستقبلية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconTrendingDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>;
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;

const API_URL = "https://script.google.com/macros/s/AKfycbzgL0DkpMDfAUEyYi1eYK-TQuU8Y2DNakx2sw85kxHICgpMyljppwNgbc3hrRC4MQcc6Q/exec";

// أيقونات القوائم الجانبية
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;

// أيقونة البطارية الذكية
const IconBattery = ({ level }) => {
  let color = "#10b981"; 
  if (level <= 20) color = "#f43f5e"; 
  else if (level <= 50) color = "#f59e0b"; 

  const fillWidth = Math.max(1, 12 * (level / 100));

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke="currentColor" className="text-slate-500" />
      <line x1="22" x2="22" y1="11" y2="13" stroke="currentColor" className="text-slate-500" />
      <rect width={fillWidth} height="6" x="4" y="9" rx="1" ry="1" fill={color} stroke="none" />
    </svg>
  );
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #030712; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; direction: ltr !important; text-align: left !important; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #030712; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink {
      animation: pulse-ring 1.5s infinite;
      background-color: rgba(16, 185, 129, 0.04) !important;
    }
    
    .glass-panel {
      background: rgba(9, 13, 22, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(22, 34, 53, 0.8);
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }
  `;
  document.head.appendChild(style);
}

// الرنة المزدوجة الهادئة لغرفة الانتظار (Ding-Dong)
const playReadySound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    
    const playTone = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(523.25, now, 0.6); 
    playTone(659.25, now + 0.15, 0.8); 

  } catch (e) {
    console.error("Audio blocked by browser.");
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [allRawCars, setAllRawCars] = useState([]);
  const [allRawExpenses, setAllRawExpenses] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [employees] = useState([
    { id: "EMP01", name: "عدنان", role: "كبير فنيي البطاريات HV", status: "نشط", power: "98%" },
    { id: "EMP02", name: "عكاشة", role: "خبير ميكانيك", status: "في ميكانيك 1", power: "95%" },
    { id: "EMP03", name: "كرم", role: "مهندس برمجة", status: "غرفة السيرفر", power: "100%" },
    { id: "EMP04", name: "محمد", role: "فحص ومقاييس", status: "نشط", power: "90%" },
    { id: "EMP05", name: "مالك", role: "ميكاترونكس", status: "نشط", power: "94%" },
    { id: "EMP06", name: "شريف", role: "فني صيانة", status: "نشط", power: "85%" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const timestampUrl = `${API_URL}?_=${Date.now()}`;
        const res = await fetch(timestampUrl, { cache: "no-store" });
        const data = await res.json();
        
        if (isMounted && data) {
          setAllRawCars(data.cars || []);
          setAllRawExpenses(data.expenses || []);
          
          const rawCars = data.cars || [];
          setReadyTimers(prevTimers => {
             const nextTimers = { ...prevTimers };
             let triggerBeep = false;
             
             rawCars.forEach((t, idx) => {
                const status = String(t["حالة السيارة"] || t["الحالة"] || t["حالة الصيانة"] || "").trim();
                const id = t["رقم الكرت"] || t["ID"] || idx + 1;
                
                if (status.includes("جاهز")) {
                   if (!nextTimers[id]) {
                      nextTimers[id] = Date.now();
                      triggerBeep = true;
                   }
                } else {
                   if (nextTimers[id]) delete nextTimers[id];
                }
             });
             
             if (triggerBeep) playReadySound();
             return nextTimers;
          });

          setIsLoading(false);
        }
      } catch (err) {
        console.error("الربط السحابي معطل:", err);
        setIsLoading(false);
      }
    }
    
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 3000);
    return () => { isMounted = false; clearInterval(loop); };
  }, []);

  const getCleanValue = (row, possibleKeys) => {
     const rowKeys = Object.keys(row);
     for (let pKey of possibleKeys) {
        const foundKey = rowKeys.find(k => k.trim() === pKey);
        if (foundKey && row[foundKey] !== undefined && row[foundKey] !== "") return row[foundKey];
     }
     return null;
  };

  const liveYardTickets = useMemo(() => {
     return allRawCars.map((t, idx) => {
        const status = String(getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار");
        const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
        const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
        const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;

        const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
        const socValue = rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : (30 + (plateNum % 66));

        return {
          id,
          plate: plateStr,
          customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
          phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
          carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
          problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || status,
          status,
          paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع"]) || "-",
          engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف"]) || "-",
          cost: parseFloat(String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '')) || 0,
          soc: socValue,
          driveTrain: plateNum % 2 === 0 ? "AWD Dual Motor" : "RWD Ultra",
          date: getCleanValue(t, ["وقت الإدخال", "التاريخ"]) || new Date().toISOString()
        };
     }).filter(t => !t.status.includes("تسليم") && !t.status.includes("تم التسليم"));
  }, [allRawCars]);

  const displayLiveYard = useMemo(() => {
    return liveYardTickets.filter(t => {
      const isReady = t.status.includes('جاهز');
      if (isReady && readyTimers[t.id]) {
        const elapsed = Date.now() - readyTimers[t.id];
        if (elapsed > 4 * 60 * 1000) return false; 
      }
      return true;
    });
  }, [liveYardTickets, readyTimers, currentTime]);

  const currentReceipts = useMemo(() => {
     return allRawCars.map((t, idx) => {
        return {
           id: getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1,
           customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
           plate: getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "-",
           carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
           problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || "-",
           paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع"]) || "كاش",
           cost: parseFloat(String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '')) || 0,
           isArchived: getCleanValue(t, ["مرحل"])
        };
     }).filter(t => t.isArchived !== true && String(t.isArchived).toUpperCase() !== "TRUE");
  }, [allRawCars]);

  const currentExpenses = useMemo(() => {
     return allRawExpenses.map((e, idx) => {
        return {
           id: idx + 1,
           desc: getCleanValue(e, ["بيان المصروف", "البيان"]) || "مصروف",
           amount: parseFloat(String(getCleanValue(e, ["القيمة", "المبلغ"]) || "0").replace(/[^\d.]/g, '')) || 0,
           isArchived: getCleanValue(e, ["مرحل"])
        };
     }).filter(e => e.isArchived !== true && String(e.isArchived).toUpperCase() !== "TRUE");
  }, [allRawExpenses]);

  const accounting = useMemo(() => {
    let grossRevenue = 0, laborFees = 0, partsRevenue = 0, cliqTotal = 0, cashTotal = 0, totalExpenses = 0;
    
    currentReceipts.forEach(t => {
      grossRevenue += t.cost; laborFees += t.cost * 0.4; partsRevenue += t.cost * 0.6;
      if (t.paymentMethod.includes('كليك')) cliqTotal += t.cost; else cashTotal += t.cost;
    });
    currentExpenses.forEach(e => totalExpenses += e.amount);

    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, totalExpenses, netProfit: grossRevenue - totalExpenses };
  }, [currentReceipts, currentExpenses]);

  return (
    <div className="min-h-screen w-full bg-[#030712] flex flex-col font-sans select-none overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

      <header className="w-full glass-panel border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white border border-slate-700 shadow-[0_0_15px_rgba(6,182,212,0.4)] overflow-hidden flex items-center justify-center p-1">
             <img src="/logo.jpg" alt="Logo" className="h-full w-full object-contain" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-black p-2.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.35)] animate-pulse">
            <IconVolt />
          </div>
          <div>
            <div className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest uppercase w-max">Central Command</div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono mt-0.5">ABU AL-NADI ENTERPRISE <span className="text-cyan-400 font-light text-sm">v5.0 OS</span></h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs bg-[#05080f] border border-[#1b2b44] px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-cyan-400 animate-ping text-[6px]">●</span>
            <span>AMMAN ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden z-10">
        <aside className="w-20 glass-panel border-r border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20 relative">
          <MenuBtn active={activeTab==='liveyard'} onClick={() => setActiveTab('liveyard')} icon={<IconGrid />} label="الساحة الحية" />
          <MenuBtn active={activeTab==='receipts'} onClick={() => setActiveTab('receipts')} icon={<IconTrendingUp />} label="المقبوضات" />
          <MenuBtn active={activeTab==='expenses'} onClick={() => setActiveTab('expenses')} icon={<IconTrendingDown />} label="المصروفات" />
          <MenuBtn active={activeTab==='finance'} onClick={() => setActiveTab('finance')} icon={<IconCoins />} label="الخزينة اليومية" />
          <MenuBtn active={activeTab==='employees'} onClick={() => setActiveTab('employees')} icon={<IconCpu />} label="إدارة الطواقم" />
          <MenuBtn active={activeTab==='archive'} onClick={() => setActiveTab('archive')} icon={<IconShield />} label="أرشيف الأيام" />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto w-full text-left">
          {isLoading && allRawCars.length === 0 ? (
            <div className="h-full flex items-center justify-center text-cyan-400 font-mono tracking-widest animate-pulse text-xs">ESTABLISHING QUANTUM LINK...</div>
          ) : (
            <>
              {activeTab === 'liveyard' && <QuantumYard tickets={displayLiveYard} />}
              {activeTab === 'receipts' && <QuantumReceipts tickets={currentReceipts} accounting={accounting} />}
              {activeTab === 'expenses' && <QuantumExpenses expenses={currentExpenses} />}
              {activeTab === 'finance' && <QuantumFinance accounting={accounting} />}
              {activeTab === 'employees' && <QuantumStaff employees={employees} tickets={displayLiveYard} />}
              {activeTab === 'archive' && <QuantumArchive />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

const MenuBtn = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group flex items-center justify-center w-12 h-12 ${active ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'text-slate-500 hover:bg-slate-800 hover:text-cyan-400'}`}>
    {icon}
    <span className="absolute left-16 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
      {label}
    </span>
  </button>
);

const QuantumYard = ({ tickets }) => (
  <div className="w-full space-y-6">
    <div className="glass-panel rounded-2xl p-6 shadow-2xl">
      <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> LIVE MONITORING DECK
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {tickets.map(t => {
          let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
          let glow = "border-[#142135]";
          let isReadyBlink = false;
          let progressPercent = 15;
          let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
          
          if (t.status.includes('انتظار')) badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/20"; 
          if (t.status.includes('عمل') || t.status.includes('فحص')) { 
            badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"; glow="border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.05)]"; 
            progressPercent = 70; progressColor = "bg-cyan-400 shadow-[0_0_8px_#06b6d4]";
          }
          if (t.status.includes('جاهز')) { 
            badgeStyle = "bg-emerald-500 text-black border-emerald-400 font-bold"; glow="border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.1)]"; 
            progressPercent = 100; progressColor = "bg-emerald-500 shadow-[0_0_8px_#10b981]"; isReadyBlink = true;
          }

          let socColorText = 'text-emerald-400';
          if(t.soc <= 20) socColorText = 'text-rose-400';
          else if(t.soc <= 50) socColorText = 'text-amber-400';

          return (
            <div key={t.id} className={`bg-[#050914] border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group w-full shadow-xl ${isReadyBlink ? 'ready-blink' : ''}`}>
              <div>
                <div className="flex flex-row justify-between items-center mb-4 border-b border-[#142135] pb-3">
                  <span className="font-mono text-[10px] text-slate-400 bg-[#090d16] px-2 py-1 rounded border border-[#142135]">CRD #{t.id}</span>
                  <span className={`text-[10px] px-3 py-1 rounded border font-black uppercase tracking-wider ${badgeStyle}`}>
                    {isReadyBlink && <IconCheck />} {t.status}
                  </span>
                </div>
                <div className="mb-4">
                  <h3 className="font-black text-white text-xl tracking-wide mb-1.5">{t.carModel}</h3>
                  <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Client:</span>
                      <span className="text-sm font-bold text-cyan-400">{t.customer.split(' ')[0]}</span>
                  </div>
                </div>
                
                {/* اللوحة والبطارية فقط (معروضة بشكل مريح وواضح) */}
                <div className="flex items-center justify-between bg-[#0a101d] border border-[#162235] rounded-xl px-4 py-2.5 mb-5">
                  <div className="text-left overflow-hidden">
                    <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">PLATE NUMBER</span>
                    <span className="font-mono text-cyan-400 text-sm font-black tracking-widest whitespace-nowrap">{t.plate}</span>
                  </div>
                  <div className="flex flex-col items-end pl-2 border-l border-[#162235]">
                    <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">BATTERY SOC</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <span className={`font-mono text-[11px] font-black ${socColorText}`}>{t.soc}%</span>
                       <IconBattery level={t.soc} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-[#142033]">
                    <div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
                <div className="bg-[#090d16] p-3.5 rounded-xl border border-[#142033] mb-4">
                  <span className="text-[10px] text-slate-500 block">Task Specs / الشغل:</span>
                  <div className="text-xs text-slate-200 leading-relaxed font-medium mt-1 line-clamp-2">{t.problem}</div>
                </div>
              </div>
              <div className="border-t border-[#162235] pt-3 flex items-center justify-between text-[10px] font-mono font-bold">
                <div><span className="text-slate-500 block">VALUE</span><span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span></div>
                <div className="text-right"><span className="text-slate-500 block">TECH</span><span className="text-cyan-400 text-xs">{t.engineer}</span></div>
              </div>
            </div>
          );
        })}
        {tickets.length === 0 && <div className="text-slate-500 col-span-full py-10 text-center font-bold">الساحة المركزية خالية من الحركات الحية حالياً.</div>}
      </div>
    </div>
  );
};

const QuantumReceipts = ({ tickets, accounting }) => (
  <div className="w-full space-y-6">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2"><IconTrendingUp /> RECEIPTS JOURNAL (ACTIVE SHIFT)</h2>
        <div className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-400 font-mono font-black text-sm">TOTAL INFLOW: {accounting.grossRevenue.toFixed(2)} JOD</div>
    </div>
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#090d16] border-b border-[#162235]">
          <tr className="text-slate-400 font-bold tracking-wider text-[11px] uppercase">
            <th className="p-4">CARD ID</th><th className="p-4">CLIENT / PLATE</th><th className="p-4">TASK DETAILS</th><th className="p-4">METHOD</th><th className="p-4 text-right">COLLECTED</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#162235]/50">
          {tickets.map((t, idx) => (
            <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 font-mono text-slate-500 font-bold">#{t.id}</td>
              <td className="p-4">
                  <div className="font-bold text-white">{t.customer}</div>
                  <div className="font-mono text-[10px] text-cyan-400">{t.plate}</div>
              </td>
              <td className="p-4 text-slate-300 text-xs truncate max-w-xs">{t.problem}</td>
              <td className="p-4"><span className={`px-2.5 py-1 rounded border font-bold text-[10px] uppercase ${t.paymentMethod.includes('كليك') ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>{t.paymentMethod}</span></td>
              <td className="p-4 text-right font-mono font-black text-cyan-400">+{t.cost.toFixed(2)} JOD</td>
            </tr>
          ))}
          {tickets.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-500 font-bold">الخزينة مصفّرة. لا توجد مقبوضات في الوردية الحالية.</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

const QuantumExpenses = ({ expenses }) => {
  const totalExp = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="w-full space-y-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2"><IconTrendingDown /> EXPENSES JOURNAL (ACTIVE SHIFT)</h2>
            <div className="bg-rose-500/10 border border-rose-500/30 px-4 py-2 rounded-lg text-rose-400 font-mono font-black text-sm">TOTAL OUTFLOW: -{totalExp.toFixed(2)} JOD</div>
        </div>
        <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#090d16] border-b border-[#162235]">
              <tr className="text-slate-400 font-bold tracking-wider text-[11px] uppercase"><th className="p-4 w-24">ID</th><th className="p-4">DESCRIPTION</th><th className="p-4 text-right">AMOUNT</th></tr>
            </thead>
            <tbody className="divide-y divide-[#162235]/50">
              {expenses.map((e, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono text-slate-500 font-bold">EX-{e.id}</td>
                  <td className="p-4 text-slate-200 font-medium">{e.desc}</td>
                  <td className="p-4 text-right font-mono font-black text-rose-400">-{e.amount.toFixed(2)} JOD</td>
                </tr>
              ))}
              {expenses.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-slate-500 font-bold">لا توجد مصروفات نشطة بالوردية الحالية.</td></tr>}
            </tbody>
          </table>
        </div>
    </div>
  );
};

const QuantumFinance = ({ accounting }) => (
  <div className="w-full space-y-6">
    <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6"><IconCoins /> CENTRAL TREASURY OVERVIEW</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
        <span className="text-slate-400 text-xs font-bold block tracking-wider uppercase mb-2">CASH IN TILL</span>
        <span className="text-4xl font-black text-emerald-400 font-mono tracking-tighter">{accounting.cashTotal.toFixed(2)} <span className="text-sm text-slate-500">JOD</span></span>
      </div>
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
        <span className="text-slate-400 text-xs font-bold block tracking-wider uppercase mb-2">CLIQ TRANSFER TOTAL</span>
        <span className="text-4xl font-black text-indigo-400 font-mono tracking-tighter">{accounting.cliqTotal.toFixed(2)} <span className="text-sm text-slate-500">JOD</span></span>
      </div>
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden border-rose-500/30">
        <span className="text-rose-400 text-xs font-bold block tracking-wider uppercase mb-2">LIVE OUTFLOW (EXPENSES)</span>
        <span className="text-4xl font-black text-rose-400 font-mono tracking-tighter">-{accounting.totalExpenses.toFixed(2)} <span className="text-sm text-rose-500/50">JOD</span></span>
      </div>
      <div className="md:col-span-2 lg:col-span-3 glass-panel p-8 rounded-2xl relative overflow-hidden border-cyan-500/40 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
                <span className="text-cyan-400 text-sm font-black block tracking-widest uppercase mb-2">NET PROVISIONAL PROFIT</span>
                <span className="text-5xl font-black text-white font-mono tracking-tighter">{accounting.netProfit.toFixed(2)} <span className="text-lg text-cyan-400">JOD</span></span>
            </div>
            <div className="text-right font-mono text-xs text-slate-400 space-y-1 bg-[#04070d]/80 p-4 rounded-xl border border-[#162235]">
                <div className="flex justify-between gap-8"><span>GROSS REVENUE:</span> <span className="text-white">{accounting.grossRevenue.toFixed(2)}</span></div>
                <div className="flex justify-between gap-8 border-t border-[#162235] mt-1 pt-1"><span>PARTS (60%):</span> <span className="text-slate-300">{accounting.partsRevenue.toFixed(2)}</span></div>
                <div className="flex justify-between gap-8"><span>LABOR (40%):</span> <span className="text-slate-300">{accounting.laborFees.toFixed(2)}</span></div>
            </div>
        </div>
      </div>
    </div>
  </div>
);

const QuantumArchive = () => (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl"><IconShield /></div>
        <h2 className="text-2xl font-black text-white tracking-widest uppercase">SECURE ARCHIVE HUB</h2>
        <p className="text-slate-400 max-w-lg leading-relaxed text-sm">Historical records, reconciled sessions, and deep shift telemetry have been compiled inside the secure Master Spreadsheet for managerial audit.</p>
        <button onClick={() => window.open('https://docs.google.com/spreadsheets/d/1bqrxOR2jvKhaubJlrQxQ4RgPALpromU6mTuHEHehwQQ/edit', '_blank')} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-xl uppercase tracking-wider transition-colors shadow-lg">OPEN CONTROL CENTER (G-SHEETS)</button>
    </div>
);

const QuantumStaff = ({ employees, tickets }) => (
  <div className="w-full space-y-6">
    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><IconCpu /> WORKFORCE EFFICIENCY MATRIX</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {employees.map(emp => {
            const load = tickets.filter(t => String(t.engineer || '').includes(emp.name)).length;
            return ( 
                <div key={emp.id} className="glass-panel rounded-2xl p-5 relative w-full shadow-2xl hover:border-cyan-500/50 transition-colors">
                    {load > 0 && <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-[11px] font-black text-black shadow-[0_0_15px_#22d3ee]">{load}</span>}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-lg font-black text-cyan-400 font-mono shadow-inner">{emp.name.charAt(0)}</div>
                        <div>
                            <h3 className="font-black text-white text-base tracking-wide">{emp.name}</h3>
                            <span className="text-[10px] text-slate-400 font-black font-mono block uppercase">{emp.role}</span>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
  </div>
);
// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- أيقونات سايبربانك الهندسية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

const API_URL = "https://script.google.com/macros/s/AKfycbyrcByMnL3uYpL83StHbkA5d_2Ng5Ny09w-mGM-RCmeHyoXNUqAl9KMaYCjaieHl-4bhg/exec";

// تحطيم وتدمير قياسات المربعات القديمة من الجذور
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
  `;
  document.head.appendChild(style);
}

// دالة تشغيل التنبيه الصوتي
const playReadySound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // نغمة التنبيه
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.8);
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    console.error("Audio blocked by browser, user needs to interact with the page first.");
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // تتبع السيارات الجاهزة لحساب 4 دقائق وإخفائها
  const [readyTimers, setReadyTimers] = useState({});

  const [employees] = useState([
    { id: "EMP01", name: "عدنان", role: "كبير فنيي البطاريات HV", status: "نشط", power: "98%", advances: 0 },
    { id: "EMP02", name: "عكاشة", role: "خبير ميكانيك", status: "نشط", power: "95%", advances: 0 },
    { id: "EMP03", name: "كرم", role: "مهندس برمجة", status: "نشط", power: "100%", advances: 0 },
    { id: "EMP04", name: "شريف", role: "فني فحص جودة", status: "نشط", power: "90%", advances: 0 },
    { id: "EMP05", name: "خالد", role: "مهندس سيارات", status: "نشط", power: "94%", advances: 0 }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // المزامنة اللحظية الذكية مع سحب البيانات الحقيقية
  useEffect(() => {
    let isMounted = true;

    async function fetchQuantumData() {
      try {
        setError(null);
        const res = await fetch(API_URL);
        
        if (!res.ok) throw new Error("فشل الاتصال بالقاعدة السحابية");
        
        const data = await res.json();
        
        if (Array.isArray(data) && isMounted) {
          // 1. فلترة البيانات للساحة الحية فقط (استبعاد المرحل والفارغ)
          const liveCarsOnly = data.filter(r => 
            r && 
            (r["رقم اللوحة"] || r["اسم الزبون"]) && 
            r["مرحل"] !== true && 
            r["مرحل"] !== "TRUE" && 
            r["مرحل"] !== "true"
          );
          
          let playBeep = false;
          const currentTimers = { ...readyTimers };

          const parsedTickets = liveCarsOnly.map((t, idx) => {
            const getVal = (key1, key2) => t[key1] || t[key2] || "";
            const rawCost = getVal("المبلغ المدفوع", "المبلغ") ? String(getVal("المبلغ المدفوع", "المبلغ")).replace(/[^\d.]/g, '') : "0";
            const cost = parseFloat(rawCost) || 0;
            
            const id = getVal("رقم الكرت", "ID") || idx + 1;
            const status = getVal("حالة السيارة", "الحالة") || "قيد الانتظار";
            const isReady = status.includes("جاهز") || status.includes("تسليم");

            // نظام تتبع الـ 4 دقائق والصوت للسيارات الجاهزة
            if (isReady) {
              if (!currentTimers[id]) {
                currentTimers[id] = Date.now(); // بدأ العداد الآن
                playBeep = true; // تشغيل الصوت لسيارة جديدة جاهزة
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id]; // إلغاء العداد إذا رجعت قيد العمل
            }

            const plateStr = String(getVal("رقم اللوحة", "اللوحة") || "101");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;

            return {
              id,
              plate: getVal("رقم اللوحة", "اللوحة") || "-",
              customer: getVal("اسم الزبون", "الزبون") || "-",
              phone: getVal("رقم الهاتف", "الهاتف") || "-",
              carModel: getVal("نوع وموديل السيارة", "الموديل") || "مركبة",
              problem: getVal("العمل المطلوب", "تفاصيل الشغل") || status || "قيد الفحص",
              status,
              paymentMethod: getVal("طريقة الدفع", "الدفع") || "-",
              engineer: getVal("الموظف المسؤول", "الموظف") || "-",
              cost,
              soc: 30 + (plateNum % 66),
              driveTrain: plateNum % 2 === 0 ? "AWD Dual Motor" : "RWD Ultra"
            };
          });

          if (playBeep) playReadySound();
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse()); // الأحدث أولاً
        }
      } catch (err) {
        console.error("الربط السحابي معطل:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 30000); // تحديث كل 30 ثانية
    return () => {
      isMounted = false;
      clearInterval(loop);
    };
  }, [readyTimers]); // تم إضافة readyTimers لتحديث الـ state الصحيح

  // نظام فلترة السيارات الجاهزة بعد 4 دقائق من الشاشة
  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز') || t.status.includes('تسليم');
      if (isReady && readyTimers[t.id]) {
        const elapsed = Date.now() - readyTimers[t.id];
        if (elapsed > 4 * 60 * 1000) return false; // إخفاء بعد 4 دقائق (240,000 ملي ثانية)
      }
      return true;
    });
  }, [tickets, readyTimers, currentTime]); // currentTime يضمن تحديث الإخفاء كل ثانية

  const accounting = useMemo(() => {
    let grossRevenue = 0, laborFees = 0, partsRevenue = 0, cliqTotal = 0, cashTotal = 0;
    displayTickets.forEach(t => {
      grossRevenue += t.cost;
      laborFees += t.cost * 0.4; 
      partsRevenue += t.cost * 0.6; 
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) {
        cliqTotal += t.cost;
      } else {
        cashTotal += t.cost;
      }
    });
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, netProfit: grossRevenue * 0.95 };
  }, [displayTickets]);

  return (
    <div className="min-h-screen w-full bg-[#02040a] flex flex-col font-sans select-none overflow-hidden">
      <header className="w-full bg-[#090d16] border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-black p-2.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse">
            <IconVolt />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest">AL-RAMLI GATEWAY</span>
              {isLoading && <span className="text-[10px] text-cyan-400 animate-pulse font-mono tracking-widest border border-cyan-500/50 px-2 rounded">SYNCING...</span>}
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">RAMLI ENTERPRISE <span className="text-emerald-400 font-light text-sm">v4.0 OS</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs bg-[#05080f] border border-[#1b2b44] px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-emerald-400 animate-ping text-[6px]">●</span>
            <span>AMMAN ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden">
        <aside className="w-20 bg-[#04070d] border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl">
          <button onClick={() => setActiveTab('liveyard')} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab==='liveyard'?'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]':'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
            <IconGrid />
            <span className="absolute right-24 bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">الساحة المركزية</span>
          </button>
          <button onClick={() => setActiveTab('finance')} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab==='finance'?'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]':'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
            <IconCoins />
            <span className="absolute right-24 bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">الخزينة المتقدمة</span>
          </button>
          <button onClick={() => setActiveTab('employees')} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab==='employees'?'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]':'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
            <IconCpu />
            <span className="absolute right-24 bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">إدارة الطواقم</span>
          </button>
          <button onClick={() => setActiveTab('archive')} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab==='archive'?'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]':'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
            <IconShield />
            <span className="absolute right-24 bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">سجل الأرشيف</span>
          </button>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto w-full bg-[#02040a]">
          {isLoading && displayTickets.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-emerald-400 font-mono tracking-widest space-y-4">
               <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
               <p>ESTABLISHING QUANTUM LINK...</p>
             </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-red-500 font-mono tracking-widest space-y-4">
              <p>CONNECTION FAILED: {error}</p>
              <button onClick={() => window.location.reload()} className="px-4 py-2 border border-red-500/50 rounded hover:bg-red-500/10">REBOOT SYSTEM</button>
            </div>
          ) : (
            <>
              {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
              {activeTab === 'finance' && <QuantumFinance accounting={accounting} tickets={displayTickets} />}
              {activeTab === 'employees' && <QuantumStaff employees={employees} tickets={displayTickets} />}
              {activeTab === 'archive' && <QuantumArchive tickets={tickets} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 🚗 مكون ساحة المراقبة (تم ضبط الألوان هنا)
// ==========================================
const QuantumYard = ({ tickets }) => {
  const stats = useMemo(() => {
    return {
      waiting: tickets.filter(t => !t.status.includes('جاهز') && !t.status.includes('تسليم') && !t.status.includes('عمل')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز') || t.status.includes('تسليم')).length,
      total: tickets.length
    };
  }, [tickets]);

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <div className="bg-[#090d16] border border-[#16243a] p-5 rounded-2xl flex flex-col justify-between shadow-xl">
          <span className="text-slate-400 text-xs font-black tracking-wider uppercase">قيد الانتظار والفحص</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-amber-400 font-mono">{stats.waiting}</span>
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-bold">WAITING BAYS</span>
          </div>
        </div>
        <div className="bg-[#090d16] border border-[#16243a] p-5 rounded-2xl flex flex-col justify-between shadow-xl">
          <span className="text-slate-400 text-xs font-black tracking-wider uppercase">قيد العمل والصيانة</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-cyan-400 font-mono">{stats.working}</span>
            <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded font-bold">ACTIVE LOCKS</span>
          </div>
        </div>
        <div className="bg-[#090d16] border border-[#16243a] p-5 rounded-2xl flex flex-col justify-between shadow-xl border-emerald-500/20 shadow-emerald-900/10">
          <span className="text-emerald-400 text-xs font-black tracking-wider uppercase">جاهز للتسليم الآن</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-emerald-400 font-mono animate-pulse">{stats.ready}</span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold">READY TO FLY</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0c1322] to-[#040810] border border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-xl">
          <span className="text-slate-400 text-xs font-black tracking-wider uppercase">مجموع السيارات بالساحة الحية</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-white font-mono">{stats.total}</span>
            <span className="text-[10px] px-2 py-0.5 bg-white/10 text-white rounded font-bold">CUMULATIVE LOGS</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#070b12] border border-[#121e30] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          اللوحة الرقمية الموحدة لتدفق المركبات الحية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-full">
          {tickets.map(t => {
            // نظام الألوان المتطور لكل حالة
            let badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/20"; // افتراضي (انتظار)
            let glow = "border-amber-900/30";
            let progressPercent = 15;
            let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
            
            if (t.status.includes('عمل') || t.status.includes('فحص')) { 
              badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"; 
              glow="border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.05)]"; 
              progressPercent = 65; 
              progressColor = "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";
            } 
            else if (t.status.includes('جاهز') || t.status.includes('تسليم')) { 
              badgeStyle = "bg-emerald-400/10 text-emerald-400 border-emerald-400/20 animate-pulse"; 
              glow="border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.1)]"; 
              progressPercent = 100; 
              progressColor = "bg-emerald-500 shadow-[0_0_15px_#10b981]";
            }

            return (
              <div key={t.id} className={`bg-[#02050b] border ${glow} rounded-xl p-3.5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group w-full text-xs`}>
                <div>
                  <div className="flex flex-row justify-between items-start mb-3">
                    <div>
                      <span className="font-mono text-[9px] text-slate-500 font-bold block">CRD #{t.id}</span>
                      <h3 className="font-black text-white text-sm mt-0.5 group-hover:text-emerald-400 transition tracking-wide line-clamp-1">{t.carModel}</h3>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded border font-black uppercase tracking-wider ${badgeStyle}`}>{t.status}</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#070c14] border border-[#142033] rounded-lg px-2.5 py-1.5 mb-3">
                    <div>
                      <span className="text-[8px] text-slate-500 block font-mono font-bold">PLATE NUMBER</span>
                      <span className="font-mono text-emerald-400 text-xs font-black tracking-widest">{t.plate}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[8px] text-slate-500 block font-mono font-bold">CUSTOMER</span>
                      <span className="font-mono text-slate-300 text-[10px] font-bold line-clamp-1">{t.customer}</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-[9px] font-mono font-bold">
                      <span className="text-slate-500 uppercase">حالة الإنجاز المئوية</span>
                      <span className="text-white font-black">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60">
                      <div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 leading-relaxed bg-[#040810]/40 p-2 rounded-xl border border-slate-900 min-h-[3rem] line-clamp-2 mb-3 font-medium">
                    {t.problem}
                  </div>
                </div>

                <div className="border-t border-[#131f33] pt-2.5 flex items-center justify-between text-[9px] font-mono font-bold">
                  <div>
                    <span className="text-slate-500 block">COST VALUE</span>
                    <span className="text-white text-xs font-black">{t.cost.toFixed(0)} JOD</span>
                  </div>
                  <div className="text-left">
                    <span className="text-slate-500 block">TECH</span>
                    <span className="text-emerald-400">{t.engineer}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 💰 مكون الخزينة 
// ==========================================
const QuantumFinance = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
      <IconCoins /> نظام الخزينة النقدية (للسيارات بالساحة الحية فقط)
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">إجمالي مبالغ الساحة</span>
        <span className="text-4xl font-black text-white font-mono mt-2 block tracking-tighter">{accounting.grossRevenue.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">مقبوضات الأيدي العاملة (40%)</span>
        <span className="text-4xl font-black text-emerald-400 font-mono mt-2 block tracking-tighter">{accounting.laborFees.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">مبيعات مخزن القطع (60%)</span>
        <span className="text-4xl font-black text-cyan-400 font-mono mt-2 block tracking-tighter">{accounting.partsRevenue.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
    </div>
  </div>
);

// ==========================================
// 📂 مكون البحث والأرشيف
// ==========================================
const QuantumArchive = ({ tickets }) => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query) return tickets;
    const s = query.toLowerCase();
    return tickets.filter(t => (t.plate && t.plate.toLowerCase().includes(s)) || (t.customer && t.customer.toLowerCase().includes(s)));
  }, [query, tickets]);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full border-b border-[#16243a] pb-4">
        <div>
          <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest block w-max mb-1">SEARCH DB</span>
          <h2 className="text-base font-black text-white uppercase tracking-wider">سجل السيارات الحالية</h2>
        </div>
        <div className="relative w-full md:w-96">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="بحث فوري..." className="w-full bg-[#090d16] border border-[#1a2c46] rounded-xl pl-4 pr-10 py-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition font-sans font-bold" />
          <div className="absolute right-3 top-3.5 text-slate-500"><IconSearch /></div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 💻 مكون إدارة الفنيين
// ==========================================
const QuantumStaff = ({ employees, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><IconCpu /> مصفوفة الفنيين</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {employees.map(emp => {
            const load = tickets.filter(t => t.engineer.includes(emp.name)).length;
            return ( 
                <div key={emp.id} className="bg-[#090d16] border border-[#142135] rounded-2xl p-5 relative w-full shadow-2xl">
                    {load > 0 && <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-[11px] font-black text-black shadow-[0_0_15px_#22d3ee]">{load}</span>}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-lg font-black text-emerald-400 font-mono shadow-inner">{emp.name.charAt(0)}</div>
                        <div>
                            <h3 className="font-black text-white text-base tracking-wide">{emp.name}</h3>
                            <span className="text-[10px] text-slate-400 font-black tracking-wider block uppercase">{emp.role}</span>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
  </div>
);
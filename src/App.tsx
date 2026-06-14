// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// --- أيقونات سايبربانك الهندسية الجديدة ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

// ⚠️ ضع رابط شعار المركز الخاص بك هنا بين علامتي التنصيص ⚠️
const LOGO_URL = "https://cdn-icons-png.flaticon.com/512/5555/5555062.png"; 

// الرابط الصحيح لجوجل شيت
const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink {
      animation: pulse-ring 1.5s infinite;
      background-color: rgba(16, 185, 129, 0.08) !important;
    }
  `;
  document.head.appendChild(style);
}

const playReadySound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); 
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.8);
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    console.error("Audio blocked by browser.");
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});

  const [employees] = useState([
    { id: "EMP01", name: "عدنان", role: "كبير فنيي البطاريات HV", status: "نشط", power: "98%", advances: 0 },
    { id: "EMP02", name: "عكاشة", role: "خبير ميكانيك وأنظمة تعليق", status: "في ميكانيك 1", power: "95%", advances: 0 },
    { id: "EMP03", name: "كرم", role: "مهندس تشخيص وبرمجة العقول", status: "غرفة السيرفر", power: "100%", advances: 0 },
    { id: "EMP04", name: "محمد", role: "فني فحص ومقاييس الجودة", status: "نشط", power: "90%", advances: 0 },
    { id: "EMP05", name: "شريف", role: "مهندس صيانة", status: "نشط", power: "94%", advances: 0 }
  ]);

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
                if (foundKey && row[foundKey] !== undefined && row[foundKey] !== "") {
                   return row[foundKey];
                }
             }
             return null;
          };

          const liveRows = data.filter(r => {
             const isArchived = getCleanValue(r, ["مرحل"]);
             const customer = getCleanValue(r, ["اسم الزبون", "الزبون"]);
             return customer !== null && isArchived !== true && isArchived !== "TRUE" && isArchived !== "true";
          });

          let playBeep = false;
          const currentTimers = { ...readyTimers };
          
          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const cost = parseFloat(rawCost) || 0;
            const deposit = 0;

            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            
            const isReady = status.includes("جاهز") || status.includes("تسليم") || status.includes("تم");
            if (isReady) {
              if (!currentTimers[id]) {
                currentTimers[id] = Date.now();
                playBeep = true;
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "---");
            const fullCustomerName = getCleanValue(t, ["اسم الزبون", "الزبون"]) || "غير مسجل";
            // سحب الاسم الأول فقط
            const firstName = fullCustomerName.split(' ')[0];

            return {
              id,
              plate: plateStr,
              customer: fullCustomerName,
              firstName: firstName,
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل", "نوع السيارة"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة"]) || "لا يوجد وصف محدد",
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول", "المستلم"]) || "قيد التعيين",
              cost,
              deposit,
            };
          });

          if (playBeep) playReadySound();
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) {
        console.error("الربط السحابي معطل:", err);
      }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 10000); 
    return () => {
        isMounted = false;
        clearInterval(loop);
    };
  }, [readyTimers]);

  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز') || t.status.includes('تسليم') || t.status.includes('تم');
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
      laborFees += t.cost * 0.4; 
      partsRevenue += t.cost * 0.6; 
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) cliqTotal += t.cost;
      else cashTotal += t.cost;
    });
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, netProfit: grossRevenue * 0.95 };
  }, [displayTickets]);

  return (
    <div className="min-h-screen w-full bg-[#02040a] flex flex-col font-sans select-none overflow-hidden">
      <header className="w-full bg-[#090d16] border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          {/* إضافة الشعار هنا */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
             <img src={LOGO_URL} alt="Logo" className="relative w-11 h-11 rounded-xl border border-emerald-500/30 object-contain bg-[#02040a] p-1" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest">AL-RAMLI GATEWAY</span>
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
          </button>
          <button onClick={() => setActiveTab('finance')} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab==='finance'?'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]':'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
            <IconCoins />
          </button>
          <button onClick={() => setActiveTab('employees')} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab==='employees'?'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]':'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
            <IconCpu />
          </button>
          <button onClick={() => setActiveTab('archive')} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab==='archive'?'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]':'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
            <IconShield />
          </button>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto w-full bg-[#02040a]">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'finance' && <QuantumFinance accounting={accounting} tickets={displayTickets} />}
          {activeTab === 'employees' && <QuantumStaff employees={employees} tickets={displayTickets} />}
          {activeTab === 'archive' && <QuantumArchive tickets={tickets} />}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 🚗 مكون ساحة المراقبة (بالتصميم الاحترافي الجديد للكرت)
// ==========================================
const QuantumYard = ({ tickets }) => {
  const stats = useMemo(() => {
    return {
      waiting: tickets.filter(t => !t.status.includes('عمل') && !t.status.includes('فحص') && !t.status.includes('جاهز') && !t.status.includes('تسليم') && !t.status.includes('تم')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز') || t.status.includes('تسليم') || t.status.includes('تم')).length,
      total: tickets.length
    };
  }, [tickets]);

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <div className="bg-[#090d16] border border-[#16243a] p-5 rounded-2xl flex flex-col justify-between shadow-xl">
          <span className="text-slate-400 text-xs font-black tracking-wider uppercase">مسار الاستلام والفحص المبدئي</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-amber-400 font-mono">{stats.waiting}</span>
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-bold">WAITING BAYS</span>
          </div>
        </div>
        <div className="bg-[#090d16] border border-[#16243a] p-5 rounded-2xl flex flex-col justify-between shadow-xl">
          <span className="text-slate-400 text-xs font-black tracking-wider uppercase">كبائن العمليات والصيانة</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-cyan-400 font-mono">{stats.working}</span>
            <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded font-bold">ACTIVE LOCKS</span>
          </div>
        </div>
        <div className="bg-[#090d16] border border-[#16243a] p-5 rounded-2xl flex flex-col justify-between shadow-xl">
          <span className="text-slate-400 text-xs font-black tracking-wider uppercase">ممر التجهيز والتسليم النهائي</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-emerald-400 font-mono">{stats.ready}</span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold">READY TO FLY</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0c1322] to-[#040810] border border-emerald-500/20 p-5 rounded-2xl flex flex-col justify-between shadow-xl shadow-emerald-950/10">
          <span className="text-emerald-400 text-xs font-black tracking-wider uppercase">مجموع الحركات المسجلة بالمنظومة</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-white font-mono">{stats.total}</span>
            <span className="text-[10px] px-2 py-0.5 bg-white/10 text-white rounded font-bold">LIVE LOGS</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#070b12] border border-[#121e30] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          اللوحة الرقمية الموحدة لتدفق المركبات الحية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
          {tickets.map(t => {
            let badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/20"; 
            let glow = "border-[#1c2e4a]";
            let isReadyBlink = false;
            let progressPercent = 15;
            let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
            
            if (t.status.includes('عمل') || t.status.includes('فحص')) { 
                badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"; 
                glow="border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.08)]"; 
                progressPercent = 65;
                progressColor = "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";
            }
            if (t.status.includes('جاهز') || t.status.includes('تسليم') || t.status.includes('تم')) { 
                badgeStyle = "bg-emerald-400/10 text-emerald-400 border-emerald-400/30 font-black"; 
                glow="border-emerald-500/60"; 
                progressPercent = 100;
                progressColor = "bg-emerald-500 shadow-[0_0_12px_#10b981]";
                isReadyBlink = true; 
            }

            return (
              <div key={t.id} className={`bg-[#040812] border ${glow} rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group w-full ${isReadyBlink ? 'ready-blink' : ''}`}>
                
                {/* الهيدر: الآي دي والحالة */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[10px] text-slate-400 font-bold bg-[#0a1120] px-2 py-1 rounded border border-[#1a2942]">CRD #{t.id}</span>
                  <span className={`text-[10px] px-3 py-1 rounded-md border uppercase tracking-wider ${badgeStyle}`}>{t.status}</span>
                </div>

                {/* البيانات الرئيسية: نوع السيارة واسم العميل */}
                <div className="mb-5">
                  <h3 className="font-black text-white text-lg tracking-wide drop-shadow-md mb-1">{t.carModel}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-sm">👤</span>
                    <span className="text-slate-400 text-xs font-bold">العميل: <span className="text-slate-100">{t.firstName}</span></span>
                  </div>
                </div>

                {/* شبكة البيانات المصغرة: اللوحة والفني */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-[#0a1120] border border-[#1a2942] rounded-lg p-2.5 flex flex-col justify-center items-center text-center">
                    <span className="text-[9px] text-slate-500 font-mono font-bold mb-1">اللوحة / PLATE</span>
                    <span className="font-mono text-emerald-400 text-[13px] font-black tracking-widest">{t.plate}</span>
                  </div>
                  <div className="bg-[#0a1120] border border-[#1a2942] rounded-lg p-2.5 flex flex-col justify-center items-center text-center">
                    <span className="text-[9px] text-slate-500 font-mono font-bold mb-1">الفني / TECH</span>
                    <span className="text-cyan-400 text-[13px] font-black line-clamp-1">{t.engineer}</span>
                  </div>
                </div>

                {/* مربع العطل الواضح والمميز */}
                <div className="mb-5">
                  <span className="text-[10px] text-slate-400 font-bold mb-1.5 block flex items-center gap-1.5">
                    <span>🛠️</span> العطل المبلّغ عنه:
                  </span>
                  <div className="text-xs text-slate-200 leading-relaxed bg-[#0a1120] p-3 rounded-lg border border-[#1a2942] min-h-[3.5rem] line-clamp-2">
                    {t.problem}
                  </div>
                </div>

                {/* شريط الإنجاز في الأسفل */}
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-[10px] font-mono font-bold">
                    <span className="text-slate-500 uppercase">مؤشر الإنجاز</span>
                    <span className="text-white">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#0a1120] rounded-full overflow-hidden border border-[#1a2942]">
                    <div className={`h-full rounded-full transition-all duration-1000 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

              </div>
            );
          })}
          {tickets.length === 0 && <div className="text-slate-500 col-span-full py-10 text-center font-bold">الساحة المركزية فارغة من الحركات الحية حالياً.</div>}
        </div>
      </div>
    </div>
  );
};

const QuantumFinance = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
      <IconCoins /> نظام الخزينة النقدية
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">إجمالي مبالغ الساحة</span>
        <span className="text-4xl font-black text-white font-mono mt-2 block tracking-tighter">{accounting.grossRevenue.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
    </div>
  </div>
);

const QuantumArchive = ({ tickets }) => {
  return (
    <div className="w-full space-y-6 animate-fade-in text-white text-center py-20">
      <h2>الأرشيف متاح من خلال تطبيق AppSheet</h2>
    </div>
  );
};

const QuantumStaff = ({ employees, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><IconCpu /> مصفوفة الفنيين</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {employees.map(emp => {
            return ( 
                <div key={emp.id} className="bg-[#090d16] border border-[#142135] rounded-2xl p-5 relative w-full shadow-2xl">
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
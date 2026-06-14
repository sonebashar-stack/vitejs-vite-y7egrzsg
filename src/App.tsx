// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// 🔗 ضع رابط شعار مركزك هنا (صورة بخلفية شفافة PNG أفضل شيء)
// ==========================================
const COMPANY_LOGO_URL = "https://cdn-icons-png.flaticon.com/512/3204/3204095.png"; // استبدل هذا الرابط برابط شعارك الحقيقي

// --- أيقونات سايبربانك الهندسية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

// الرابط الصحيح لجوجل شيت الخاص بك
const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; }
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
      background-color: rgba(16, 185, 129, 0.05) !important;
    }
  `;
  document.head.appendChild(style);
}

// دالة التنبيه الصوتي
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
    { id: "EMP05", name: "مالك", role: "مهندس ميكاترونكس سيارات", status: "نشط", power: "94%", advances: 0 }
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
            
            const isReady = status.includes("جاهز") || status.includes("تسليم") || status.includes("تم التسليم");
            if (isReady) {
              if (!currentTimers[id]) {
                currentTimers[id] = Date.now();
                playBeep = true;
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "-");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;
            
            // استخراج الاسم الأول فقط
            const fullCustomerName = getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل";
            const firstName = fullCustomerName.trim().split(" ")[0];

            return {
              id,
              plate: plateStr,
              customer: firstName,
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب", "العطل"]) || "لم يتم تحديد عطل",
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost,
              deposit,
              driveTrain: plateNum % 2 === 0 ? "AWD Dual Motor" : "RWD Ultra"
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
      const isReady = t.status.includes('جاهز') || t.status.includes('تسليم') || t.status.includes('تم التسليم');
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
          <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 shadow-[0_0_15px_rgba(16,185,129,0.2)] overflow-hidden">
            <img src={COMPANY_LOGO_URL} alt="Logo" className="object-contain w-full h-full" />
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
// 🚗 مكون ساحة المراقبة المطور بالكامل بجودة العرض العالمي
// ==========================================
const QuantumYard = ({ tickets }) => {
  const stats = useMemo(() => {
    return {
      waiting: tickets.filter(t => !t.status.includes('عمل') && !t.status.includes('فحص') && !t.status.includes('جاهز') && !t.status.includes('تسليم')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز') || t.status.includes('تسليم')).length,
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
          <span className="text-slate-400 text-xs font-black tracking-wider uppercase">كبائن العمليات وصيانة الـ High-Voltage</span>
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
          <span className="text-emerald-400 text-xs font-black tracking-wider uppercase">السيارات الحية الآن</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-white font-mono">{stats.total}</span>
            <span className="text-[10px] px-2 py-0.5 bg-white/10 text-white rounded font-bold">LIVE LOGS</span>
          </div>
        </div>
      </div>

      {/* كروت الصيانة الجبارة - التصميم الجديد المرتب */}
      <div className="w-full bg-[#070b12] border border-[#121e30] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          اللوحة الرقمية الموحدة لتدفق المركبات الحية داخل الكبائن
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
          {tickets.map(t => {
            let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
            let glow = "border-[#142135]";
            let isReadyBlink = false;
            let progressPercent = 15;
            let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
            
            if (t.status.includes('انتظار')) { 
                badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/20"; 
            }
            if (t.status.includes('عمل') || t.status.includes('فحص')) { 
                badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"; 
                glow="border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]"; 
                progressPercent = t.status.includes('عمل') ? 75 : 45;
                progressColor = t.status.includes('عمل') ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";
            }
            if (t.status.includes('جاهز') || t.status.includes('تسليم')) { 
                badgeStyle = "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"; 
                glow="border-emerald-500/50"; 
                progressPercent = 100;
                progressColor = "bg-emerald-500 shadow-[0_0_8px_#10b981]";
                isReadyBlink = true; 
            }

            return (
              <div key={t.id} className={`bg-[#02050b] border ${glow} rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group w-full ${isReadyBlink ? 'ready-blink' : ''}`}>
                
                {/* الهيدر: الكرت والحالة */}
                <div className="flex flex-row justify-between items-center mb-4">
                  <span className="font-mono text-[11px] text-slate-500 font-bold bg-slate-900 px-2 py-1 rounded">CRD #{t.id}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded border font-black uppercase tracking-wider ${badgeStyle}`}>{t.status}</span>
                </div>

                {/* البيانات الأساسية المكبرة */}
                <div className="mb-4">
                  <h3 className="font-black text-white text-xl tracking-wide line-clamp-1">{t.carModel}</h3>
                  <div className="mt-1 text-xs text-slate-400 font-bold">
                    العميل: <span className="text-slate-200 text-sm">{t.customer}</span>
                  </div>
                </div>

                {/* لوحة السيارة */}
                <div className="flex items-center justify-between bg-[#070c14] border border-[#142033] rounded-xl px-3 py-2 mb-4">
                  <div>
                    <span className="text-[9px] text-slate-500 block font-mono font-bold mb-0.5">PLATE NUMBER</span>
                    <span className="font-mono text-emerald-400 text-sm font-black tracking-widest">{t.plate}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-slate-500 block font-mono font-bold mb-0.5">SYSTEM</span>
                    <span className="font-mono text-slate-300 text-[10px] font-bold">{t.driveTrain}</span>
                  </div>
                </div>

                {/* شريط الإنجاز */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-[10px] font-mono font-bold">
                    <span className="text-slate-400 uppercase">حالة الإنجاز</span>
                    <span className="text-white font-black">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60">
                    <div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

                {/* مربع العطل المرتب */}
                <div className="bg-[#050812] border border-[#142033] rounded-xl p-3 mb-4 min-h-[3.5rem]">
                  <span className="text-[9px] text-slate-500 block font-bold mb-1">العمل المطلوب / العطل:</span>
                  <div className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-2">
                    {t.problem}
                  </div>
                </div>

                {/* التذييل */}
                <div className="border-t border-[#131f33] pt-3 flex items-center justify-between text-[10px] font-mono font-bold">
                  <div>
                    <span className="text-slate-500 block mb-0.5">TOTAL VALUE</span>
                    <span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span>
                  </div>
                  <div className="text-left bg-[#090d16] px-2 py-1 rounded border border-[#162235]">
                    <span className="text-slate-500 block text-[8px] mb-0.5">TECH</span>
                    <span className="text-emerald-400">{t.engineer}</span>
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

// ==========================================
// 💰 مكون الخزينة
// ==========================================
const QuantumFinance = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
      <IconCoins /> نظام التدقيق المحاسبي الموحد وخزينة النقد الرقمية
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">إجمالي التدفقات الكلية</span>
        <span className="text-4xl font-black text-white font-mono mt-2 block tracking-tighter bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{accounting.grossRevenue.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">مقبوضات الأيدي العاملة (40%)</span>
        <span className="text-4xl font-black text-emerald-400 font-mono mt-2 block tracking-tighter">{accounting.laborFees.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">مبيعات مخزن القطع (60%)</span>
        <span className="text-4xl font-black text-cyan-400 font-mono mt-2 block tracking-tighter">{accounting.partsRevenue.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl border-emerald-500/20 shadow-emerald-950/10">
        <span className="text-emerald-400 text-xs font-black block tracking-wider uppercase">صافي التدفق المالي الحركي الفعلي</span>
        <span className="text-4xl font-black text-white font-mono mt-2 block tracking-tighter shadow-emerald-400/5">{accounting.netProfit.toFixed(2)} <span className="text-xs text-emerald-400 font-mono font-black">JOD</span></span>
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
    return tickets.filter(t => (t.plate && t.plate.toLowerCase().includes(s)) || (t.customer && t.customer.toLowerCase().includes(s)) || (t.carModel && t.carModel.toLowerCase().includes(s)));
  }, [query, tickets]);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full border-b border-[#16243a] pb-4">
        <div>
          <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest block w-max mb-1">CENTRAL DATABASE</span>
          <h2 className="text-base font-black text-white uppercase tracking-wider">السجل السحابي الموحد</h2>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="بحث فوري برقم اللوحة، اسم الزبون، أو رقم الشاصي..." 
            className="w-full bg-[#090d16] border border-[#1a2c46] rounded-xl pl-4 pr-10 py-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition font-sans placeholder:text-slate-600 font-bold" 
          />
          <div className="absolute right-3 top-3.5 text-slate-500"><IconSearch /></div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 💻 مكون إدارة الفنيين والإنتاجية
// ==========================================
const QuantumStaff = ({ employees, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><IconCpu /> مصفوفة الكفاءة وتوزيع الكوادر الفنية</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {employees.map(emp => {
            const load = tickets.filter(t => (t.status.includes('عمل') || t.status.includes('جاري')) && t.engineer.includes(emp.name)).length;
            return ( 
                <div key={emp.id} className="bg-[#090d16] border border-[#142135] rounded-2xl p-5 relative w-full shadow-2xl">
                    {load > 0 && <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-[11px] font-black text-black shadow-[0_0_15px_#22d3ee]">{load}</span>}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-lg font-black text-emerald-400 font-mono shadow-inner">{emp.name.charAt(0)}</div>
                        <div>
                            <h3 className="font-black text-white text-base tracking-wide">{emp.name}</h3>
                            <span className="text-[10px] text-slate-400 font-black font-mono tracking-wider block uppercase">{emp.role}</span>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
  </div>
);
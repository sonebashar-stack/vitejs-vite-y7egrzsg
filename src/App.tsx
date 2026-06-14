// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// --- Icons (From your original design) ---
const IconCloud = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>;
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const IconCar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconWallet = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-9.24 7.71 1 1 0 0 1-.76-1.14l1.5-6.92A2 2 0 0 0 12 11h-3"/><path d="M22 10v6"/><path d="M3 5v14a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-4"/></svg>;
const IconArchive = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

// --- API URL ---
const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

// --- Global CSS from your original code ---
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #0b0f19; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0b0f19; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
    
    /* Animation for Ready Cars */
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink {
      animation: pulse-ring 2s infinite;
      background-color: rgba(16, 185, 129, 0.05);
    }
  `;
  document.head.appendChild(style);
}

// --- Sound Function ---
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
    console.error("Audio blocked by browser, user needs to click first");
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [readyTimers, setReadyTimers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Original states
  const [employees] = useState([
    { name: "عدنان", role: "فني بطاريات", phone: "0790123456", advances: 20 },
    { name: "عكاشة", role: "ميكانيك عام", phone: "0791234567", advances: 0 },
    { name: "كرم", role: "مهندس برمجة", phone: "0792345678", advances: 10 },
    { name: "محمد", role: "فني صيانة", phone: "0793456789", advances: 50 },
    { name: "مالك", role: "ميكانيك", phone: "0794567890", advances: 0 }
  ]);
  const [finances] = useState([]); // Kept for layout compatibility
  
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  // --- API Fetch Logic ---
  useEffect(() => {
    let isMounted = true;

    async function fetchQuantumData() {
      try {
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("فشل الاتصال");
        
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

          // فلترة السيارات غير المرحلة
          const liveCarsOnly = data.filter(r => {
             const isArchived = getCleanValue(r, ["مرحل"]);
             const customer = getCleanValue(r, ["اسم الزبون", "الزبون"]);
             return customer !== null && isArchived !== true && isArchived !== "TRUE" && isArchived !== "true";
          });
          
          let playBeep = false;
          const currentTimers = { ...readyTimers };

          const parsedTickets = liveCarsOnly.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة"]) || "قيد الانتظار";
            
            // تحقق من الجاهزية للصوت والوميض
            const isReady = status.includes("تم التسليم") || status.includes("جاهز");

            if (isReady) {
              if (!currentTimers[id]) {
                currentTimers[id] = Date.now();
                playBeep = true;
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            return {
              ticketId: id,
              plate: getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "-",
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "-",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              brand: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              description: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || status,
              status: status,
              payment: getCleanValue(t, ["طريقة الدفع", "الدفع"]) || "-",
              staff: [getCleanValue(t, ["الموظف المسؤول", "الموظف"]) || "-"],
              cost: parseFloat(rawCost) || 0,
            };
          });

          if (playBeep) playReadySound();
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) {
        console.error("خطأ:", err);
        if (isMounted) setError("خطأ في جلب البيانات");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 10000); // تحديث كل 10 ثواني
    return () => {
      isMounted = false;
      clearInterval(loop);
    };
  }, [readyTimers]);

  // --- 4 Minute Filter Logic ---
  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('تم التسليم') || t.status.includes('جاهز');
      if (isReady && readyTimers[t.ticketId]) {
        const elapsed = Date.now() - readyTimers[t.ticketId];
        if (elapsed > 4 * 60 * 1000) return false; // إخفاء بعد 4 دقائق
      }
      return true;
    });
  }, [tickets, readyTimers, currentTime]);

  // Derived Dashboard Stats (From your original)
  const ticketStats = useMemo(() => {
    return {
      waiting: displayTickets.filter(t => !t.status.includes('عمل') && !t.status.includes('فحص') && !t.status.includes('جاهز') && !t.status.includes('تسليم')).length,
      working: displayTickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: displayTickets.filter(t => t.status.includes('جاهز') || t.status.includes('تسليم')).length,
    };
  }, [displayTickets]);

  const financeStats = useMemo(() => {
    let totalCashIn = 0, totalCliqIn = 0, extIncome = 0, expTotal = 0;
    displayTickets.forEach(t => {
        if (t.payment === 'كاش') totalCashIn += t.cost;
        if (t.payment === 'كليك' || t.payment === 'CliQ') totalCliqIn += t.cost;
    });
    const netProfit = (totalCashIn + totalCliqIn + extIncome) - expTotal;
    return { totalCashIn, totalCliqIn, extIncome, expTotal, netProfit };
  }, [displayTickets]);

  // ===============================================
  // VIEWS (Exactly as your original design)
  // ===============================================
  const ViewLiveYard = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">مركبات قيد الانتظار</span>
                <span className="text-3xl font-black text-amber-500">{ticketStats.waiting}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-2 -top-2 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
                <span className="text-slate-400 text-xs font-bold block mb-1">تحت الصيانة الحالية</span>
                <span className="text-3xl font-black text-blue-400">{ticketStats.working}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">جاهزة للتسليم</span>
                <span className="text-3xl font-black text-emerald-400">{ticketStats.ready}</span>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl"></div>
                <span className="text-slate-400 text-xs font-bold block mb-1">صافي الصندوق المتوقع</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-sky-400">{financeStats.netProfit.toFixed(0)}</span>
                    <span className="text-xs text-slate-500 font-mono">JOD</span>
                </div>
            </div>
        </div>

        {/* Live Cars Board */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                    ساحة المراقبة الحية
                </h2>
                <button onClick={() => setIsAddCarModalOpen(true)} className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(2,132,199,0.4)] transition">
                    <IconPlus /> استلام مركبة
                </button>
            </div>
            
            {isLoading ? (
                <div className="text-center py-10 text-sky-500 text-sm animate-pulse font-mono">جاري جلب البيانات من الأرشيف السحابي...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayTickets.map(t => {
                        let statusColor = "bg-slate-800 border-slate-700 text-slate-300";
                        let glow = "";
                        let isReadyBlink = false;
                        
                        if(t.status.includes('انتظار')) { statusColor = "bg-amber-500/10 border-amber-500/20 text-amber-500"; }
                        if(t.status.includes('عمل') || t.status.includes('فحص')) { statusColor = "bg-blue-500/10 border-blue-500/30 text-blue-400"; glow="shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"; }
                        if(t.status.includes('جاهز') || t.status.includes('تسليم')) { 
                          statusColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-black"; 
                          isReadyBlink = true; 
                        }

                        return (
                            <div key={t.ticketId} className={`bg-slate-950/50 border rounded-2xl p-4 flex flex-col justify-between border-slate-800/80 hover:border-slate-700 transition ${glow} ${isReadyBlink ? 'ready-blink' : ''}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="font-mono text-xs text-slate-500 block mb-1">#{t.ticketId}</span>
                                        <span className="font-bold text-white text-base block">{t.brand}</span>
                                        <span className="font-mono text-sky-400 text-sm font-bold tracking-wider">{t.plate}</span>
                                    </div>
                                    <span className={`text-[10px] px-2 py-1 rounded-lg border font-bold ${statusColor}`}>{t.status}</span>
                                </div>
                                <div className="text-xs text-slate-400 mb-4 line-clamp-2 min-h-[2rem]">
                                    {t.description}
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-800 pt-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${t.status.includes('عمل') ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
                                        <span className="text-[10px] font-bold text-slate-300">{t.staff.join(', ')}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500">{t.customer}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {!isLoading && displayTickets.length === 0 && (
                <div className="text-center py-10 text-slate-500 text-sm">الساحة فارغة حالياً.</div>
            )}
        </div>
    </div>
  );

  const ViewFinance = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <IconWallet /> الإدارة المالية للساحة الحية
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">إجمالي مقبوضات الكاش</span>
                <span className="text-3xl font-black text-emerald-400">{financeStats.totalCashIn.toFixed(2)}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">حوالات CliQ</span>
                <span className="text-3xl font-black text-indigo-400">{financeStats.totalCliqIn.toFixed(2)}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-rose-500/5 rounded-2xl"></div>
                <span className="text-slate-400 text-xs font-bold block mb-1 relative z-10">إجمالي المصروفات والسلف</span>
                <span className="text-3xl font-black text-rose-400 relative z-10">{financeStats.expTotal.toFixed(2)}</span>
            </div>
        </div>
    </div>
  );

  const ViewEmployees = () => (
      <div className="space-y-6 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <IconUsers /> إدارة الفنيين
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map(emp => {
                const activeCarsCount = displayTickets.filter(t => t.status.includes('عمل') && t.staff.includes(emp.name)).length;
                return (
                    <div key={emp.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative">
                        {activeCarsCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-lg shadow-emerald-500/40">
                                {activeCarsCount}
                            </span>
                        )}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xl font-black text-slate-400">
                                {emp.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">{emp.name}</h3>
                                <span className="text-xs text-sky-400 font-medium">{emp.role}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
  );

  const ViewArchive = () => (
      <div className="space-y-6 animate-in fade-in duration-300">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <IconArchive /> الأرشيف مبني في الأب شيت مباشرة
          </h2>
      </div>
  );

  // Modal Mockup (UI only)
  const AddCarModal = () => {
    if (!isAddCarModalOpen) return null;
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_40px_-15px_rgba(56,189,248,0.3)] p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><IconCar /> استلام مركبة جديدة</h2>
                <button onClick={() => setIsAddCarModalOpen(false)} className="text-slate-400 hover:text-white transition"><IconX /></button>
            </div>
            <p className="text-slate-400 text-sm text-center py-4">الرجاء إضافة السيارات من تطبيق AppSheet الخاص بالموظفين لضمان المزامنة السحابية.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans selection:bg-sky-500/30 flex flex-col">
        {/* Top Header */}
        <header className="bg-slate-900/50 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40">
            <div className="px-4 py-3 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="bg-sky-500/10 text-sky-400 p-2 rounded-xl border border-sky-500/20 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]">
                        <IconCloud />
                    </div>
                    <div>
                        <h1 className="font-black text-white text-lg leading-tight tracking-wide">الرملي كلوود</h1>
                        <p className="text-[10px] font-mono text-sky-400/80">AWS-NODE-AMMAN • v2.1</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-950/50 border border-slate-800 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="font-mono text-slate-400">{currentTime.toLocaleTimeString('ar-JO')}</span>
                    </div>
                </div>
            </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900/30 border-l border-slate-800/80 flex flex-col p-4 flex-shrink-0 hidden md:flex">
                <nav className="space-y-1.5 flex-1">
                    <button onClick={() => setActiveTab('liveyard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='liveyard' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                        <IconDashboard /> الساحة الحية
                    </button>
                    <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='finance' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                        <IconWallet /> الإدارة المالية
                    </button>
                    <button onClick={() => setActiveTab('employees')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='employees' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                        <IconUsers /> الموظفون
                    </button>
                    <button onClick={() => setActiveTab('archive')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='archive' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                        <IconArchive /> الأرشيف العام
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {error && <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl mb-4 text-sm font-bold">{error}</div>}
                {activeTab === 'liveyard' && <ViewLiveYard />}
                {activeTab === 'finance' && <ViewFinance />}
                {activeTab === 'employees' && <ViewEmployees />}
                {activeTab === 'archive' && <ViewArchive />}
            </main>
        </div>

        {/* Mobile Navigation (Bottom) */}
        <div className="md:hidden border-t border-slate-800 bg-slate-900/80 backdrop-blur-md p-2 flex justify-around">
             <button onClick={() => setActiveTab('liveyard')} className={`p-3 rounded-xl ${activeTab==='liveyard' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500'}`}><IconDashboard /></button>
             <button onClick={() => setActiveTab('finance')} className={`p-3 rounded-xl ${activeTab==='finance' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}><IconWallet /></button>
             <button onClick={() => setActiveTab('employees')} className={`p-3 rounded-xl ${activeTab==='employees' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500'}`}><IconUsers /></button>
             <button onClick={() => setActiveTab('archive')} className={`p-3 rounded-xl ${activeTab==='archive' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-500'}`}><IconArchive /></button>
        </div>

        {/* Global Components */}
        <AddCarModal />

        {/* Toast Notification */}
        {isToastVisible && (
            <div className={`fixed bottom-20 md:bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl transition-all duration-300 ${toastMessage.type === 'success' ? 'bg-emerald-500/90 text-white shadow-emerald-500/20' : 'bg-red-500/90 text-white shadow-red-500/20'}`}>
                <span className="text-sm font-bold">{toastMessage.text}</span>
            </div>
        )}
    </div>
  );
}
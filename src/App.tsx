// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { useWebAudio } from './hooks/useWebAudio';
import { QuantumHeader } from './components/QuantumHeader';
import { AITerminal } from './components/AITerminal';

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [readyTimers, setReadyTimers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { startAmbientEngine, playReadyBeep } = useWebAudio();

  const [employees] = useState([
    { name: "عدنان", role: "كبير فنيي البطاريات HV", status: "نشط" },
    { name: "عكاشة", role: "خبير ميكانيك وأنظمة تعليق", status: "نشط" },
    { name: "كرم", role: "مهندس تشخيص وبرمجة العقول", status: "نشط" },
    { name: "محمد", role: "فني فحص ومقاييس الجودة", status: "نشط" },
    { name: "مالك", role: "مهندس ميكاترونكس سيارات", status: "نشط" }
  ]);

  // تحديث الساعة الحية وطاقة الصوت
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب ومزامنة البيانات من جوجل شيت
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
              brand: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة كهربائية",
              description: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || status,
              status: status,
              payment: String(getCleanValue(t, ["طريقة الدفع", "الدفع"]) || "كاش"),
              staff: [String(getCleanValue(t, ["الموظف المسؤول", "الموظف"]) || "كرم")],
              cost: parseFloat(rawCost) || 0,
              customer: String(getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي"),
              soc: 30 + (plateNum % 66)
            };
          });

          if (playBeep) playReadyBeep();
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
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
  }, [readyTimers]);

  // تصفية الـ 4 دقائق للسيارات الجاهزة
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

  const stats = useMemo(() => {
    return {
      waiting: displayTickets.filter(t => !t.status.includes('عمل') && !t.status.includes('فحص') && !t.status.includes('جاهز') && !t.status.includes('تسليم')).length,
      working: displayTickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: displayTickets.filter(t => t.status.includes('جاهز') || t.status.includes('تسليم')).length,
    };
  }, [displayTickets]);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans flex flex-col relative" onClick={startAmbientEngine}>
      {/* هيدر المنظومة المستدعى من الملف الجديد */}
      <QuantumHeader currentTime={currentTime} onLogoClick={startAmbientEngine} />

      <div className="flex flex-1 overflow-hidden">
        {/* السايد بار الأنيق */}
        <aside className="w-64 bg-slate-900/30 border-l border-slate-800/80 flex flex-col p-4 hidden md:flex">
          <nav className="space-y-1.5 flex-1">
            <button onClick={() => setActiveTab('liveyard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='liveyard' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
              الساحة الحية
            </button>
            <button onClick={() => setActiveTab('employees')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='employees' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
              الكادر الفني
            </button>
          </nav>
          {/* حقن الـ Terminal المتقدم بالأسفل */}
          <AITerminal />
        </aside>

        {/* مساحة العرض المركزية الكبرى */}
        <main className="flex-1 p-6 overflow-y-auto">
          {error && <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl mb-4 text-sm font-bold">{error}</div>}
          
          {activeTab === 'liveyard' && (
            <div className="space-y-6">
              {/* لوحة المقاييس العليا الـ HUD */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-slate-400 text-xs font-bold block mb-1">مركبات قيد الانتظار</span>
                  <span className="text-3xl font-black text-amber-500">{stats.waiting}</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-slate-400 text-xs font-bold block mb-1">تحت الصيانة الفورية</span>
                  <span className="text-3xl font-black text-blue-400">{stats.working}</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-slate-400 text-xs font-bold block mb-1">جاهزة للتسليم (4 د)</span>
                  <span className="text-3xl font-black text-emerald-400">{stats.ready}</span>
                </div>
              </div>

              {/* لوحة الكروت الحية النظيفة */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  شاشة صالة الانتظار المركزية الحية
                </h2>
                
                {isLoading ? (
                  <div className="text-center py-10 text-sky-500 text-sm animate-pulse font-mono tracking-widest">ESTABLISHING TELEMETRY LINK...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayTickets.map(t => {
                      let statusColor = "bg-slate-800 border-slate-700 text-slate-300";
                      let isReadyBlink = false;
                      const sStr = t.status;
                      
                      if(sStr.includes('انتظار')) statusColor = "bg-amber-500/10 border-amber-500/20 text-amber-500";
                      if(sStr.includes('عمل') || sStr.includes('فحص')) statusColor = "bg-blue-500/10 border-blue-500/30 text-blue-400";
                      if(sStr.includes('جاهز') || sStr.includes('تسليم')) { statusColor = "bg-emerald-500 text-black font-black border-emerald-400"; isReadyBlink = true; }

                      return (
                        <div key={t.ticketId} className={`bg-slate-950/70 border rounded-2xl p-5 flex flex-col justify-between border-slate-800/80 transition duration-300 ${isReadyBlink ? 'ready-blink-card' : 'hover:border-slate-700'}`}>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="font-mono text-xs text-slate-500 block mb-1">CRD #{t.ticketId}</span>
                              <h3 className="font-bold text-white text-lg block">{t.brand}</h3>
                              <span className="font-mono text-sky-400 text-sm font-black tracking-wider">{t.plate}</span>
                            </div>
                            <span className={`text-[10px] px-2 py-1 rounded-lg border font-bold ${statusColor}`}>{t.status}</span>
                          </div>
                          <div className="text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/40 mb-4 min-h-[3rem]">
                            {t.description}
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-800/60 pt-3 text-xs">
                            <span className="text-slate-400 font-bold">الفني: <span className="text-slate-200">{t.staff.join(', ')}</span></span>
                            <span className="text-sky-400 font-black">الزبون: {t.customer.split(' ')[0]}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map(emp => (
                <div key={emp.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xl font-black text-sky-400 font-mono">{emp.name.charAt(0)}</div>
                    <div>
                      <h3 className="font-bold text-white text-base">{emp.name}</h3>
                      <span className="text-xs text-slate-400 font-medium block mt-0.5">{emp.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
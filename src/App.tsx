// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// --- الأيقونات المستقبلية المستحدثة ---
const IconCloud = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>;
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1.5"/><rect width="7" height="5" x="14" y="3" rx="1.5"/><rect width="7" height="9" x="14" y="12" rx="1.5"/><rect width="7" height="5" x="3" y="16" rx="1.5"/></svg>;
const IconCar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconWallet = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-9.24 7.71 1 1 0 0 1-.76-1.14l1.5-6.92A2 2 0 0 0 12 11h-3"/><path d="M22 10v6"/><path d="M3 5v14a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-4"/></svg>;
const IconArchive = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

const API_URL = "https://script.google.com/macros/s/AKfycbyrcByMnL3uYpL83StHbkA5d_2Ng5Ny09w-mGM-RCmeHyoXNUqAl9KMaYCjaieHl-4bhg/exec";

// حقن استايل لكسر حدود الشاشة وإجبار الفرش الكامل على أي متصفح
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #030712; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
  `;
  document.head.appendChild(style);
}

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [cars, setCars] = useState([]);
  const [tickets, setTickets] = useState([]);
  
  const [employees] = useState([
    { name: "عدنان", role: "فني بطاريات", phone: "0790123456", advances: 0 },
    { name: "عكاشة", role: "ميكانيك عام", phone: "0791234567", advances: 0 },
    { name: "كرم", role: "مهندس برمجة", phone: "0792345678", advances: 0 },
    { name: "محمد", role: "فني صيانة", phone: "0793456789", advances: 0 },
    { name: "مالك", role: "ميكانيك", phone: "0794567890", advances: 0 }
  ]);
  
  const [finances, setFinances] = useState([]);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadLiveStats() {
      try {
        const bypassCacheUrl = `${API_URL}?_=${new Date().getTime()}`;
        const response = await fetch(bypassCacheUrl);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const validData = data.filter(t => t && (t["رقم اللوحة"] || t["السيارة واللوحة"] || t["اسم الزبون"]));

          const formattedTickets = validData.map((t, idx) => {
            let costVal = 0;
            let depositVal = 0;
            try {
              costVal = t["تكلفة الصيانة والقطع الإجمالية"] ? Number(String(t["تكلفة الصيانة والقطع الإجمالية"]).replace(/[^\d.]/g, '')) : 0;
              depositVal = t["العربون المستلم مقدماً"] ? Number(String(t["العربون المستلم مقدماً"]).replace(/[^\d.]/g, '')) : 0;
            } catch(e) {
              costVal = 0;
              depositVal = 0;
            }

            return {
              ticketId: t["رقم الكرت (ID)"] || t["ID"] || idx + 1,
              plate: t["رقم اللوحة"] || t["السيارة واللوحة"] || "بدون لوحة",
              description: t["وصف المشكلة والشغل المطلوب"] || t["العطل"] || "صيانة عامة",
              cost: isNaN(costVal) ? 0 : costVal,
              deposit: isNaN(depositVal) ? 0 : depositVal,
              status: t["حالة الصيانة"] || "قيد الانتظار",
              payment: t["طريقة تسوية الدفع"] || "كاش",
              dateIn: new Date().toISOString(),
              staff: t["الفني المسؤول"] ? [t["الفني المسؤول"]] : ["غير معين"]
            };
          });

          const formattedCars = validData.map((t, idx) => ({
            id: idx,
            plate: t["رقم اللوحة"] || t["السيارة واللوحة"] || "بدون لوحة",
            brand: t["نوع وموديل السيارة"] || "EV Car",
            color: t["لون السيارة"] || "أحدث",
            customer: t["اسم الزبون"] || "زبون المركز",
            phone: t["رقم الهاتف"] || "07XXXXXXX",
            visits: 1
          }));

          const extractedFinances = formattedTickets.map((t, idx) => ({
            id: `auto-fin-${idx}`,
            type: "دخل",
            amount: t.cost,
            notes: `صيانة مركبة لوحة: ${t.plate}`,
            method: t.payment,
          }));

          setTickets(formattedTickets);
          setCars(formattedCars);
          setFinances(extractedFinances);
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات الحية:", error);
      }
    }

    loadLiveStats();
    const intervalId = setInterval(loadLiveStats, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  const financeStats = useMemo(() => {
    let totalCashIn = 0;
    let totalCliqIn = 0;
    let expTotal = 0;

    tickets.forEach(t => {
      const currentCost = Number(t.cost) || 0;
      const currentDeposit = Number(t.deposit) || 0;
      
      if (t.payment.includes('كليك') || t.payment.includes('CliQ')) {
        totalCliqIn += currentCost;
      } else {
        totalCashIn += currentCost;
      }
      if (currentDeposit > 0 && currentCost === 0) totalCashIn += currentDeposit;
    });

    employees.forEach(emp => { expTotal += (Number(emp.advances) || 0); });
    const netProfit = (totalCashIn + totalCliqIn) - expTotal;

    return { totalCashIn, totalCliqIn, expTotal, netProfit };
  }, [tickets, employees]);

  const ticketStats = useMemo(() => {
    return {
      waiting: tickets.filter(t => t.status.includes('انتظار')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهزة') || t.status.includes('تسليم')).length,
    };
  }, [tickets]);

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 font-sans flex flex-col m-0 p-0 antialiased selection:bg-emerald-500 selection:text-black">
        <header className="w-full bg-[#0b0f19]/80 border-b border-slate-800/60 backdrop-blur-xl sticky top-0 z-40 shadow-lg shadow-black/20">
            <div className="w-full px-6 py-4 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <IconCloud />
                    </div>
                    <div>
                        <h1 className="font-black text-white text-xl tracking-wider uppercase bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">الرملي كلوود</h1>
                        <p className="text-[10px] font-mono text-emerald-400/80 tracking-widest font-bold">EV-STATION CONTROL • CENTER OS</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></div>
                        <span className="font-mono text-xs text-slate-300 font-bold tracking-wider">{currentTime.toLocaleTimeString('ar-JO')}</span>
                    </div>
                 </div>
            </div>
        </header>

        <div className="flex flex-1 w-full overflow-hidden">
            <aside className="w-64 bg-[#070b14] border-l border-slate-800/50 flex flex-col p-4 hidden md:flex shadow-2xl">
                <nav className="space-y-2 flex-1 pt-2">
                    <button onClick={() => setActiveTab('liveyard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab==='liveyard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-100'}`}><IconDashboard /> ساحة الورشة الحية</button>
                    <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab==='finance' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-100'}`}><IconWallet /> الإدارة المالية</button>
                    <button onClick={() => setActiveTab('employees')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab==='employees' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-100'}`}><IconUsers /> إدارة الفنيين</button>
                    <button onClick={() => setActiveTab('archive')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab==='archive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-100'}`}><IconArchive /> أرشيف الزبائن</button>
                </nav>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto w-full max-w-none bg-[#030712]">
                {activeTab === 'liveyard' && <ViewLiveYard tickets={tickets} cars={cars} ticketStats={ticketStats} financeStats={financeStats} setIsAddCarModalOpen={setIsAddCarModalOpen} />}
                {activeTab === 'finance' && <ViewFinance financeStats={financeStats} finances={finances} />}
                {activeTab === 'employees' && <ViewEmployees employees={employees} tickets={tickets} />}
                {activeTab === 'archive' && <ViewArchive cars={cars} />}
            </main>
        </div>

        <div className="md:hidden border-t border-slate-800 bg-[#0b0f19]/90 backdrop-blur-md p-2 flex justify-around w-full shadow-2xl">
             <button onClick={() => setActiveTab('liveyard')} className={`p-3 rounded-xl transition ${activeTab==='liveyard' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}><IconDashboard /></button>
             <button onClick={() => setActiveTab('finance')} className={`p-3 rounded-xl transition ${activeTab==='finance' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}><IconWallet /></button>
             <button onClick={() => setActiveTab('employees')} className={`p-3 rounded-xl transition ${activeTab==='employees' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}><IconUsers /></button>
             <button onClick={() => setActiveTab('archive')} className={`p-3 rounded-xl transition ${activeTab==='archive' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}><IconArchive /></button>
        </div>

        {isAddCarModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20"><IconCar /></div>
                    <h2 className="text-xl font-bold text-white mb-2">مزامنة الإدخال الذكي</h2>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed px-2">لضمان دقة البيانات، يرجى تسجيل السيارات وتحديث الحالات من هواتف الفنيين عبر تطبيق الميدان (AppSheet) لتنعكس على شاشة مكتبك حياً خلال ثوانٍ.</p>
                    <button onClick={() => setIsAddCarModalOpen(false)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs transition shadow-[0_0_15px_rgba(16,185,129,0.3)]">حسناً، فهمت</button>
                </div>
            </div>
          </div>
        )}
    </div>
  );
}

const ViewLiveYard = ({ tickets, cars, ticketStats, financeStats, setIsAddCarModalOpen }) => (
  <div className="w-full space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-[#0b0f19] border border-slate-800/80 p-5 rounded-2xl w-full shadow-md hover:border-amber-500/30 transition duration-300">
              <span className="text-slate-400 text-xs font-bold block mb-1">مركبات قيد الانتظار</span>
              <span className="text-4xl font-black text-amber-400 tracking-tight">{ticketStats.waiting}</span>
          </div>
          <div className="bg-[#0b0f19] border border-slate-800/80 p-5 rounded-2xl w-full shadow-md hover:border-cyan-500/30 transition duration-300">
              <span className="text-slate-400 text-xs font-bold block mb-1">تحت الصيانة الحالية</span>
              <span className="text-4xl font-black text-cyan-400 tracking-tight">{ticketStats.working}</span>
          </div>
          <div className="bg-[#0b0f19] border border-slate-800/80 p-5 rounded-2xl w-full shadow-md hover:border-emerald-500/30 transition duration-300">
              <span className="text-slate-400 text-xs font-bold block mb-1">جاهزة للتسليم</span>
              <span className="text-4xl font-black text-emerald-400 tracking-tight">{ticketStats.ready}</span>
          </div>
          <div className="bg-gradient-to-br from-[#0b0f19] to-[#040811] border border-slate-800 p-5 rounded-2xl w-full shadow-lg border-emerald-500/20">
              <span className="text-emerald-400 text-xs font-bold block mb-1 tracking-wider uppercase">صافي صندوق الورشة الحركي</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-4xl font-black text-white tracking-tight">{financeStats.netProfit < 0 ? 0 : financeStats.netProfit.toFixed(0)}</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">JOD</span>
              </div>
          </div>
      </div>

      <div className="w-full bg-[#0b0f19] border border-slate-800/60 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6 w-full border-b border-slate-800/40 pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-wide">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_#34d399]"></div>
                  غرفة التحكم والمراقبة المركزية للساحة
              </h2>
              <button onClick={() => setIsAddCarModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <IconPlus /> استلام كرت مركبة
              </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
              {tickets.map((t, idx) => {
                  const car = cars.find(c => c.plate === t.plate) || {};
                  let statusColor = "bg-slate-800 border-slate-700 text-slate-300";
                  let glowBorder = "border-slate-800/80";
                  
                  if(t.status.includes('انتظار')) { statusColor = "bg-amber-500/10 border-amber-500/30 text-amber-400"; }
                  if(t.status.includes('عمل') || t.status.includes('فحص')) { statusColor = "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"; glowBorder="border-cyan-500/10"; }
                  if(t.status.includes('جاهزة') || t.status.includes('تسليم')) { statusColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"; glowBorder="border-emerald-500/20"; }

                  return (
                      <div key={idx} className={`bg-[#050914] border ${glowBorder} rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition duration-300 w-full group shadow-lg`}>
                          <div className="flex justify-between items-start mb-3">
                              <div>
                                  <span className="font-mono text-[10px] text-slate-500 block mb-0.5 font-bold">TICKET #{t.ticketId}</span>
                                  <span className="font-bold text-white text-base block group-hover:text-emerald-400 transition duration-200">{car.brand || "مركبة EV"}</span>
                                  <span className="font-mono text-slate-400 text-xs font-bold tracking-widest bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800/60 inline-block mt-1">{t.plate}</span>
                              </div>
                              <span className={`text-[10px] px-2.5 py-1 rounded-lg border font-black tracking-wide ${statusColor}`}>{t.status}</span>
                          </div>
                          <div className="text-xs text-slate-400 mb-5 leading-relaxed line-clamp-2 min-h-[2.2rem]">
                              {t.description}
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-800/60 pt-3">
                              <div className="flex items-center gap-1.5">
                                  <div className={`w-1.5 h-1.5 rounded-full ${t.status.includes('عمل') ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></div>
                                  <span className="text-[10px] font-bold text-slate-300">{t.staff.join(', ')}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 font-medium">{car.customer || "زبون المركز"}</span>
                          </div>
                      </div>
                  );
              })}
          </div>
          {tickets.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm font-medium">جاري تحديث ومزامنة قنوات البث الحي للمركز...</div>
          )}
      </div>
  </div>
);

const ViewFinance = ({ financeStats }) => (
  <div className="w-full space-y-6">
      <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-wide"><IconWallet /> غرفة المراقبة والتحليل المالي للتدفقات</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl w-full shadow-xl">
              <span className="text-slate-400 text-xs font-bold block mb-1">مقبوضات الكاش المباشر</span>
              <span className="text-4xl font-black text-emerald-400 tracking-tight font-mono">{financeStats.totalCashIn.toFixed(2)} <span className="text-xs font-sans text-slate-500 font-normal">JOD</span></span>
          </div>
          <div className="bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl w-full shadow-xl">
              <span className="text-slate-400 text-xs font-bold block mb-1">المحفظة الإلكترونية (CliQ)</span>
              <span className="text-4xl font-black text-indigo-400 tracking-tight font-mono">{financeStats.totalCliqIn.toFixed(2)} <span className="text-xs font-sans text-slate-500 font-normal">JOD</span></span>
          </div>
          <div className="bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl w-full shadow-xl">
              <span className="text-slate-400 text-xs font-bold block mb-1">المصروفات والسلف الإجمالية</span>
              <span className="text-4xl font-black text-rose-400 tracking-tight font-mono">{financeStats.expTotal.toFixed(2)} <span className="text-xs font-sans text-slate-500 font-normal">JOD</span></span>
          </div>
      </div>
  </div>
);

const ViewArchive = ({ cars }) => {
  const [query, setQuery] = useState('');

  const filteredCars = useMemo(() => {
      if (!query) return cars;
      const s = query.toLowerCase();
      return cars.filter(c => (c.plate && c.plate.toLowerCase().includes(s)) || (c.customer && c.customer.toLowerCase().includes(s)));
  }, [query, cars]);

  return (
    <div className="w-full space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full border-b border-slate-800/40 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-wide"><IconArchive /> السجل الرقمي وأرشيف مالكي المركبات</h2>
            <div className="relative w-full md:w-96">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="بحث برقم اللوحة، أو اسم الزبون..." 
                    className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none font-sans transition placeholder:text-slate-600 shadow-inner" 
                />
                <div className="absolute right-3 top-3 text-slate-500"><IconSearch /></div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {filteredCars.map((c, idx) => (
                <div key={idx} className="bg-[#0b0f19] border border-slate-800/60 rounded-2xl p-5 hover:border-emerald-500/20 transition duration-300 w-full group">
                    <h3 className="font-bold text-white text-base mb-1 group-hover:text-emerald-400 transition text-slate-100">{c.customer}</h3>
                    <span className="bg-slate-950 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded-lg block w-max mb-3 tracking-widest border border-slate-800/80 font-bold">{c.plate}</span>
                    <div className="text-xs text-slate-400 font-medium">نوع وموديل السيارة: <span className="text-slate-200">{c.brand} ({c.color})</span></div>
                </div>
            ))}
        </div>
    </div>
  );
};

const ViewEmployees = ({ employees, tickets }) => (
  <div className="w-full space-y-6">
    <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-wide"><IconUsers /> سجل إنتاجية وتوزيع الطواقم الفنية</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {employees.map(emp => {
            const activeCarsCount = tickets.filter(t => t.status.includes('عمل') && t.staff.includes(emp.name)).length;
            return (
                <div key={emp.name} className="bg-[#0b0f19] border border-slate-800/60 rounded-2xl p-5 relative w-full shadow-lg">
                    {activeCarsCount > 0 && <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-black text-white shadow-[0_0_10px_#06b6d4]">{activeCarsCount}</span>}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-lg font-black text-emerald-400 shadow-inner">{emp.name.charAt(0)}</div>
                        <div>
                            <h3 className="font-bold text-white text-base">{emp.name}</h3>
                            <span className="text-xs text-emerald-400 font-bold tracking-wide">{emp.role}</span>
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 flex justify-between border-t border-slate-800/60 pt-3">
                        <span>السلف الحالية:</span>
                        <span className="font-mono font-bold text-rose-400 bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10">{emp.advances.toFixed(2)} JOD</span>
                    </div>
                </div>
            );
        })}
    </div>
  </div>
);
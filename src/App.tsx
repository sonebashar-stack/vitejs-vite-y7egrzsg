// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- الأيقونات ---
const IconCloud = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>;
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const IconCar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconWallet = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-9.24 7.71 1 1 0 0 1-.76-1.14l1.5-6.92A2 2 0 0 0 12 11h-3"/><path d="M22 10v6"/><path d="M3 5v14a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-4"/></svg>;
const IconArchive = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

const API_URL = "https://script.google.com/macros/s/AKfycbyrcByMnL3uYpL83StHbkA5d_2Ng5Ny09w-mGM-RCmeHyoXNUqAl9KMaYCjaieHl-4bhg/exec";

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [cars, setCars] = useState([]);
  const [tickets, setTickets] = useState([]);
  
  // 💡 يمكنك تعديل السلف أو تصفيرها للموظفين مباشرة من هنا:
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
  
  // حالة البحث مفصولة لمنع اختفاء المؤشر أثناء الـ Live Refresh
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب البيانات حياً وتصفية الكروت المحذوفة أو الفارغة
  useEffect(() => {
    async function loadLiveStats() {
      try {
        const bypassCacheUrl = `${API_URL}?_=${new Date().getTime()}`;
        const response = await fetch(bypassCacheUrl);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          // فلترة أي صفوف فارغة تماماً لتجنب ظهور مربعات خالية
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
    const intervalId = setInterval(loadLiveStats, 5000); // تحديث كل 5 ثوانٍ
    return () => clearInterval(intervalId);
  }, []);

  // حساب الإحصائيات المالية بدقة وحماية الصندوق من السوالب غير المبررة
  const financeStats = useMemo(() => {
    let totalCashIn = 0;
    let totalCliqIn = 0;
    let expTotal = 0;

    tickets.forEach(t => {
      const currentCost = Number(t.cost) || 0;
      const currentDeposit = Number(t.deposit) || 0;
      
      // احتساب أي مبالغ داخلة فوراً
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

  const AddCarModal = () => {
    if (!isAddCarModalOpen) return null;
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-4"><IconCar /></div>
                <h2 className="text-lg font-bold text-white mb-2">تنبيه المزامنة الذكية</h2>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">للحفاظ على استقرار السيرفر، يتم استلام المركبات وتعديل الحالات حصرياً من تطبيق الهاتف الميداني (AppSheet) لتظهر هنا تلقائياً في ثوانٍ.</p>
                <button onClick={() => setIsAddCarModalOpen(false)} className="w-full bg-sky-600 hover:bg-sky-500 text-white py-2.5 rounded-xl font-bold text-xs transition">حسناً، مفهوم</button>
            </div>
        </div>
      </div>
    );
  };

  const ViewLiveYard = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">مركبات قيد الانتظار</span>
                <span className="text-3xl font-black text-amber-500">{ticketStats.waiting}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">تحت الصيانة الحالية</span>
                <span className="text-3xl font-black text-blue-400">{ticketStats.working}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">جاهزة للتسليم</span>
                <span className="text-3xl font-black text-emerald-400">{ticketStats.ready}</span>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">صافي الصندوق الحركي</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-sky-400">{financeStats.netProfit < 0 ? 0 : financeStats.netProfit.toFixed(0)}</span>
                    <span className="text-xs text-slate-500 font-mono">JOD</span>
                </div>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                    شاشة المراقبة الحية لمركز الرملي كلوود
                </h2>
                <button onClick={() => setIsAddCarModalOpen(true)} className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition">
                    <IconPlus /> استلام مركبة
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.map((t, idx) => {
                    const car = cars.find(c => c.plate === t.plate) || {};
                    let statusColor = "bg-slate-800 border-slate-700 text-slate-300";
                    if(t.status.includes('انتظار')) statusColor = "bg-amber-500/10 border-amber-500/20 text-amber-500";
                    if(t.status.includes('عمل') || t.status.includes('فحص')) statusColor = "bg-blue-500/10 border-blue-500/30 text-blue-400";
                    if(t.status.includes('جاهزة') || t.status.includes('تسليم')) statusColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";

                    return (
                        <div key={idx} className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="font-mono text-xs text-slate-500 block mb-1">#{t.ticketId}</span>
                                    <span className="font-bold text-white text-base block">{car.brand || "مركبة EV"}</span>
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
                                <span className="text-[10px] text-slate-500">{car.customer || "زبون المركز"}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            {tickets.length === 0 && (
                <div className="text-center py-10 text-slate-500 text-sm">جاري مزامنة ساحة المركز السحابي...</div>
            )}
        </div>
    </div>
  );

  const ViewFinance = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><IconWallet /> الإدارة المالية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">إجمالي مقبوضات الكاش</span>
                <span className="text-3xl font-black text-emerald-400">{financeStats.totalCashIn.toFixed(2)}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">حوالات CliQ</span>
                <span className="text-3xl font-black text-indigo-400">{financeStats.totalCliqIn.toFixed(2)}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold block mb-1">إجمالي المصروفات والسلف</span>
                <span className="text-3xl font-black text-rose-400">{financeStats.expTotal.toFixed(2)}</span>
            </div>
        </div>
    </div>
  );

  const ViewArchive = () => {
      const filteredCars = useMemo(() => {
          if(!searchQuery) return cars;
          const s = searchQuery.toLowerCase();
          return cars.filter(c => (c.plate && c.plate.toLowerCase().includes(s)) || (c.customer && c.customer.toLowerCase().includes(s)));
      }, [searchQuery, cars]);

      return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><IconArchive /> أرشيف زبائن المركز</h2>
                <div className="relative w-full md:w-96">
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="بحث برقم اللوحة، أو اسم الزبون..." 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none" 
                    />
                    <div className="absolute right-3 top-3 text-slate-500"><IconSearch /></div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCars.map((c, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
                        <h3 className="font-bold text-white text-base mb-1">{c.customer}</h3>
                        <span className="bg-slate-950 text-sky-400 font-mono text-xs px-2 py-1 rounded-lg block w-max mb-3 tracking-widest">{c.plate}</span>
                        <div className="text-xs text-slate-400">السيارة: {c.brand} ({c.color})</div>
                    </div>
                ))}
            </div>
        </div>
      );
  };

  const ViewEmployees = () => (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><IconUsers /> إدارة الفنيين</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map(emp => {
                const activeCarsCount = tickets.filter(t => t.status.includes('عمل') && t.staff.includes(emp.name)).length;
                return (
                    <div key={emp.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative">
                        {activeCarsCount > 0 && <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">{activeCarsCount}</span>}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-xl font-black text-slate-400">{emp.name.charAt(0)}</div>
                            <div>
                                <h3 className="font-bold text-white text-base">{emp.name}</h3>
                                <span className="text-xs text-sky-400 font-medium">{emp.role}</span>
                            </div>
                        </div>
                        <div className="text-xs text-slate-500 flex justify-between border-t border-slate-800 pt-3">
                            <span>السلف المسجلة:</span>
                            <span className="font-mono font-bold text-rose-400">{emp.advances.toFixed(2)} د.أ</span>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans flex flex-col">
        <header className="bg-slate-900/50 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40">
            <div className="px-4 py-3 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="bg-sky-500/10 text-sky-400 p-2 rounded-xl border border-sky-500/20"><IconCloud /></div>
                    <div>
                        <h1 className="font-black text-white text-lg leading-tight tracking-wide">الرملي كلوود</h1>
                        <p className="text-[10px] font-mono text-sky-400/80">AWS-NODE-AMMAN • v2.5</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/50 border border-slate-800 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="font-mono text-slate-400">{currentTime.toLocaleTimeString('ar-JO')}</span>
                    </div>
                 </div>
            </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
            <aside className="w-64 bg-slate-900/30 border-l border-slate-800/80 flex flex-col p-4 hidden md:flex">
                <nav className="space-y-1.5 flex-1">
                    <button onClick={() => setActiveTab('liveyard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='liveyard' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}><IconDashboard /> الساحة الحية</button>
                    <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='finance' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}><IconWallet /> الإدارة المالية</button>
                    <button onClick={() => setActiveTab('employees')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='employees' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}><IconUsers /> الموظفون</button>
                    <button onClick={() => setActiveTab('archive')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab==='archive' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}><IconArchive /> أرشيف الزبائن</button>
                </nav>
            </aside>

            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {activeTab === 'liveyard' && <ViewLiveYard />}
                {activeTab === 'finance' && <ViewFinance />}
                {activeTab === 'employees' && <ViewEmployees />}
                {activeTab === 'archive' && <ViewArchive />}
            </main>
        </div>

        <div className="md:hidden border-t border-slate-800 bg-slate-900/80 backdrop-blur-md p-2 flex justify-around">
             <button onClick={() => setActiveTab('liveyard')} className={`p-3 rounded-xl ${activeTab==='liveyard' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500'}`}><IconDashboard /></button>
             <button onClick={() => setActiveTab('finance')} className={`p-3 rounded-xl ${activeTab==='finance' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}><IconWallet /></button>
             <button onClick={() => setActiveTab('employees')} className={`p-3 rounded-xl ${activeTab==='employees' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500'}`}><IconUsers /></button>
             <button onClick={() => setActiveTab('archive')} className={`p-3 rounded-xl ${activeTab==='archive' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-500'}`}><IconArchive /></button>
        </div>

        <AddCarModal />
    </div>
  );
}
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

// --- Icons ---
const IconCloud = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>;
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const IconCar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconWallet = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-9.24 7.71 1 1 0 0 1-.76-1.14l1.5-6.92A2 2 0 0 0 12 11h-3"/><path d="M22 10v6"/><path d="M3 5v14a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-4"/></svg>;
const IconArchive = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>;
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

// --- Initial Data ---
const initialCars = [
  { id: 10, plate: "12-40291", brand: "ID.4", color: "أبيض", customer: "كرم الرملي", phone: "0798224192", odometer: 120500, persistentNotes: "يفضل غسيل السيارة بعد الصيانة دائماً", visits: 3 },
  { id: 12, plate: "15-58291", brand: "BYD Song", color: "كحلي", customer: "محمد الأحمد", phone: "0782199022", odometer: 85200, persistentNotes: "صوت طقطقة عند تدوير المقود", visits: 1 }
];

const initialTickets = [
  { ticketId: 10, plate: "12-40291", description: "فحص وبرمجة كمبيوتر", cost: 120, deposit: 25, status: "تم الدفع والتسليم", payment: "كليك", dateIn: "2026-05-18T10:30:00", staff: ["كرم"] },
  { ticketId: 11, plate: "15-58291", description: "صيانة بريك وخراطات", cost: 80, deposit: 0, status: "قيد الانتظار", payment: "غير مدفوع", dateIn: "2026-05-18T11:00:00", staff: ["مالك"] },
  { ticketId: 12, plate: "12-40291", description: "تنظيف مروحة التبريد", cost: 150, deposit: 50, status: "قيد العمل", payment: "كاش", dateIn: "2026-05-19T08:00:00", staff: ["محمد", "عدنان"] }
];

const initialEmployees = [
  { name: "عدنان", role: "فني بطاريات", phone: "0790123456", advances: 20 },
  { name: "عكاشة", role: "ميكانيك عام", phone: "0791234567", advances: 0 },
  { name: "كرم", role: "مهندس برمجة", phone: "0792345678", advances: 10 },
  { name: "محمد", role: "فني صيانة", phone: "0793456789", advances: 50 },
  { name: "مالك", role: "ميكانيك", phone: "0794567890", advances: 0 }
];

const initialFinances = [
  { id: "fin-1", type: "دخل", amount: 20, notes: "دخل فكة من الصندوق", date: "2026-05-19T09:00:00", method: "كاش" },
  { id: "fin-2", type: "مصروف", amount: 15, notes: "ضيافة", date: "2026-05-19T10:00:00", method: "كاش" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [cars, setCars] = useState(initialCars);
  const [tickets, setTickets] = useState(initialTickets);
  const [employees, setEmployees] = useState(initialEmployees);
  const [finances, setFinances] = useState(initialFinances);
  
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });

  // Clock
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

  // Derived Finance Data
  const financeStats = useMemo(() => {
    let totalCashIn = 0;
    let totalCliqIn = 0;
    let extIncome = 0;
    let expTotal = 0;

    tickets.forEach(t => {
      if (t.status === 'تم الدفع والتسليم') {
        if (t.payment === 'كاش') totalCashIn += t.cost;
        if (t.payment === 'كليك') totalCliqIn += t.cost;
      }
      if (t.deposit > 0) totalCashIn += t.deposit;
    });

    finances.forEach(f => {
      if (f.type === 'دخل') extIncome += f.amount;
      if (f.type === 'مصروف') expTotal += f.amount;
    });

    employees.forEach(emp => { expTotal += emp.advances; });

    const netProfit = (totalCashIn + totalCliqIn + extIncome) - expTotal;
    return { totalCashIn, totalCliqIn, extIncome, expTotal, netProfit };
  }, [tickets, finances, employees]);

  // Derived Dashboard Stats
  const ticketStats = useMemo(() => {
    return {
      waiting: tickets.filter(t => t.status === 'قيد الانتظار').length,
      working: tickets.filter(t => t.status === 'قيد العمل' || t.status === 'جاري الفحص').length,
      ready: tickets.filter(t => t.status === 'جاهزة').length,
    };
  }, [tickets]);

  const AddCarModal = () => {
    const [plate, setPlate] = useState('');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [brand, setBrand] = useState('ID.4');
    const [desc, setDesc] = useState('');
    const [selectedStaff, setSelectedStaff] = useState([]);

    const handlePlateLookup = (val) => {
        setPlate(val);
        const matchedCar = cars.find(c => c.plate.replace(/\s+/g, '') === val.replace(/\s+/g, ''));
        if (matchedCar) {
            setCustomer(matchedCar.customer);
            setPhone(matchedCar.phone);
            setBrand(matchedCar.brand);
            showToast("تم استيراد بيانات العميل المسجل!", "success");
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(selectedStaff.length === 0) {
          showToast("الرجاء اختيار فني واحد على الأقل", "error");
          return;
      }

      // Update or add car
      const existingCarIdx = cars.findIndex(c => c.plate === plate);
      if (existingCarIdx >= 0) {
          const newCars = [...cars];
          newCars[existingCarIdx].visits = (newCars[existingCarIdx].visits || 0) + 1;
          setCars(newCars);
      } else {
          setCars([...cars, { id: Date.now(), plate, brand, customer, phone, visits: 1, color: "", odometer: 0, persistentNotes: "" }]);
      }

      // Add Ticket
      const nextId = tickets.length > 0 ? Math.max(...tickets.map(t => t.ticketId)) + 1 : 1;
      setTickets([...tickets, {
          ticketId: nextId, plate, description: desc, cost: 0, deposit: 0, 
          status: "قيد الانتظار", payment: "غير مدفوع", dateIn: new Date().toISOString(), staff: selectedStaff
      }]);

      showToast("تم إضافة المركبة للساحة بنجاح");
      setIsAddCarModalOpen(false);
    };

    if (!isAddCarModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_40px_-15px_rgba(56,189,248,0.3)]">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <IconCar /> استلام مركبة جديدة
                    </h2>
                    <button onClick={() => setIsAddCarModalOpen(false)} className="text-slate-400 hover:text-white transition">
                        <IconX />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">رقم اللوحة</label>
                            <input type="text" value={plate} onChange={(e) => handlePlateLookup(e.target.value)} required placeholder="12-40291" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-lg text-center focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">اسم العميل</label>
                                <input type="text" value={customer} onChange={e=>setCustomer(e.target.value)} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-sky-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">الهاتف</label>
                                <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-left focus:border-sky-500 focus:outline-none" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">نوع السيارة</label>
                            <select value={brand} onChange={e=>setBrand(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-sky-500 focus:outline-none">
                                <option>ID.4</option><option>ID.6</option><option>BYD Song</option><option>Tesla Model 3</option><option>أخرى</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">وصف العمل المطلوب</label>
                            <textarea value={desc} onChange={e=>setDesc(e.target.value)} required rows="3" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-sky-500 focus:outline-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">تعيين الفنيين</label>
                            <div className="flex flex-wrap gap-2">
                                {employees.map(emp => (
                                    <button type="button" key={emp.name} 
                                        onClick={() => setSelectedStaff(prev => prev.includes(emp.name) ? prev.filter(n => n !== emp.name) : [...prev, emp.name])}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${selectedStaff.includes(emp.name) ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                                        {emp.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-800 mt-2">
                        <button type="button" onClick={() => setIsAddCarModalOpen(false)} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition">إلغاء</button>
                        <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_-3px_rgba(2,132,199,0.5)] transition">حفظ وإصدار كرت</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
  };

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.filter(t => t.status !== 'تم الدفع والتسليم').map(t => {
                    const car = cars.find(c => c.plate === t.plate) || {};
                    
                    let statusColor = "bg-slate-800 border-slate-700 text-slate-300";
                    let glow = "";
                    if(t.status === 'قيد الانتظار') statusColor = "bg-amber-500/10 border-amber-500/20 text-amber-500";
                    if(t.status === 'قيد العمل') { statusColor = "bg-blue-500/10 border-blue-500/30 text-blue-400"; glow="shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"; }
                    if(t.status === 'جاهزة') { statusColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"; glow="shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]"; }

                    return (
                        <div key={t.ticketId} className={`bg-slate-950/50 border ${glow} rounded-2xl p-4 flex flex-col justify-between border-slate-800/80 hover:border-slate-700 transition`}>
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="font-mono text-xs text-slate-500 block mb-1">#{t.ticketId}</span>
                                    <span className="font-bold text-white text-base block">{car.brand}</span>
                                    <span className="font-mono text-sky-400 text-sm font-bold tracking-wider">{t.plate}</span>
                                </div>
                                <span className={`text-[10px] px-2 py-1 rounded-lg border font-bold ${statusColor}`}>{t.status}</span>
                            </div>
                            <div className="text-xs text-slate-400 mb-4 line-clamp-2 min-h-[2rem]">
                                {t.description}
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-800 pt-3">
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'قيد العمل' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
                                    <span className="text-[10px] font-bold text-slate-300">{t.staff.join(', ')}</span>
                                </div>
                                <span className="text-[10px] text-slate-500">{car.customer}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {tickets.filter(t => t.status !== 'تم الدفع والتسليم').length === 0 && (
                <div className="text-center py-10 text-slate-500 text-sm">الساحة فارغة حالياً.</div>
            )}
        </div>
    </div>
  );

  const ViewFinance = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <IconWallet /> الإدارة المالية
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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">سجل الحركات الأخير</h3>
                <div className="flex gap-2">
                    <button onClick={()=>showToast("سيتم إضافة نافذة المصروف قريباً", "success")} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20 transition">سجل مصروف</button>
                    <button onClick={()=>showToast("سيتم إضافة نافذة الدخل قريباً", "success")} className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/20 transition">تمويل خارجي</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                    <thead>
                        <tr className="text-slate-400 border-b border-slate-800 pb-2">
                            <th className="pb-2">البيان</th>
                            <th className="pb-2">التصنيف</th>
                            <th className="pb-2">النوع</th>
                            <th className="pb-2 font-mono">المبلغ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {finances.map(f => (
                            <tr key={f.id} className="hover:bg-slate-950/50">
                                <td className="py-3 text-slate-200">{f.notes}</td>
                                <td className="py-3 text-slate-400">{f.method}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] ${f.type==='دخل'?'bg-emerald-500/10 text-emerald-400':'bg-red-500/10 text-red-400'}`}>{f.type}</span>
                                </td>
                                <td className={`py-3 font-mono font-bold ${f.type==='دخل'?'text-emerald-400':'text-red-400'}`}>
                                    {f.type==='دخل'?'+':'-'}{f.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  const ViewArchive = () => {
      const [search, setSearch] = useState('');
      
      const filteredCars = useMemo(() => {
          if(!search) return cars;
          const s = search.toLowerCase();
          return cars.filter(c => c.plate.toLowerCase().includes(s) || c.customer.toLowerCase().includes(s));
      }, [search, cars]);

      return (
        <div className="space-y-6 animate-in fade-in duration-300">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <IconArchive /> أرشيف الزبائن الذكي
                </h2>
                <div className="relative w-full md:w-96">
                    <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث برقم اللوحة، أو اسم الزبون..." 
                           className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none" />
                    <div className="absolute right-3 top-3 text-slate-500"><IconSearch /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCars.map(c => (
                    <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition group relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-white text-base">{c.customer}</h3>
                                <span className="font-mono text-slate-400 text-xs">{c.phone}</span>
                            </div>
                            <span className="bg-slate-950 border border-slate-800 text-sky-400 font-mono text-xs px-2 py-1 rounded-lg tracking-widest">{c.plate}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-800 pt-3">
                            <div>
                                <span className="text-slate-500 block">السيارة:</span>
                                <span className="text-slate-200 font-semibold">{c.brand} ({c.color})</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">عدد الزيارات السابقة:</span>
                                <span className="text-sky-400 font-bold">{c.visits}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredCars.length === 0 && <div className="text-center py-10 text-slate-500">لا يوجد نتائج مطابقة للبحث.</div>}
        </div>
      )
  };

  const ViewEmployees = () => (
      <div className="space-y-6 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <IconUsers /> إدارة الفنيين
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map(emp => {
                const activeCarsCount = tickets.filter(t => t.status === 'قيد العمل' && t.staff.includes(emp.name)).length;
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
                        <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                             <div className="flex justify-between">
                                <span className="text-slate-500">سلف وخصومات مسجلة:</span>
                                <span className="font-mono font-bold text-rose-400">{emp.advances.toFixed(2)} د.أ</span>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button onClick={()=>showToast(`جاري فتح سجل ${emp.name}`, 'success')} className="flex-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 py-1.5 rounded-lg text-xs transition">سجل الأعمال</button>
                            <button onClick={()=>showToast(`نافذة سلف ${emp.name} قريباً`, 'success')} className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-1.5 rounded-lg text-xs transition">صرف سلفة</button>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
  );

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
                        <IconArchive /> أرشيف الزبائن
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
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
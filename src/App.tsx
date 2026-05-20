// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

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

// !!! ضع رابط الـ API الخاص بك هنا بين علامتي التنصيص !!!
const API_URL = "https://script.google.com/macros/s/AKfycbyrcByMnL3uYpL83StHbkA5d_2Ng5Ny09w-mGM-RCmeHyoXNUqAl9KMaYCjaieHl-4bhg/exec";

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [cars, setCars] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [employees, setEmployees] = useState([
    { name: "عدنان", role: "فني بطاريات", phone: "0790123456", advances: 20 },
    { name: "عكاشة", role: "ميكانيك عام", phone: "0791234567", advances: 0 },
    { name: "كرم", role: "مهندس برمجة", phone: "0792345678", advances: 10 },
    { name: "محمد", role: "فني صيانة", phone: "0793456789", advances: 50 },
    { name: "مالك", role: "ميكانيك", phone: "0794567890", advances: 0 }
  ]);
  const [finances, setFinances] = useState([
    { id: "fin-1", type: "دخل", amount: 20, notes: "دخل فكة من الصندوق", date: "2026-05-19T09:00:00", method: "كاش" },
    { id: "fin-2", type: "مصروف", amount: 15, notes: "ضيافة", date: "2026-05-19T10:00:00", method: "كاش" }
  ]);
  
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });
  const [currentTime, setCurrentTime] = useState(new Date());

  // تحديث الوقت المباشر
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب البيانات الحقيقية من جوجل شيت
  useEffect(() => {
    async function loadLiveStats() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const formattedTickets = data.map((t, idx) => ({
            ticketId: t["رقم الكرت (ID)"] || t["ID"] || idx + 1,
            plate: t["رقم اللوحة"] || t["السيارة واللوحة"] || "بدون لوحة",
            description: t["وصف المشكلة والشغل المطلوب"] || t["العطل"] || "صيانة عامة",
            cost: Number(t["تكلفة الصيانة والقطع الإجمالية"]) || 0,
            deposit: Number(t["العربون المستلم مقدماً"]) || 0,
            status: t["حالة الصيانة"] || "قيد الانتظار",
            payment: t["طريقة تسوية الدفع"] || "غير مدفوع",
            dateIn: new Date().toISOString(),
            staff: t["الفني المسؤول"] ? [t["الفني المسؤول"]] : ["غير معين"]
          }));

          const formattedCars = data.map((t, idx) => ({
            id: idx,
            plate: t["رقم اللوحة"] || t["السيارة واللوحة"] || "بدون لوحة",
            brand: t["نوع وموديل السيارة"] || t["السيارة واللوحة"] || "EV Car",
            color: t["لون السيارة"] || "أحدث",
            customer: t["اسم الزبون"] || "زبون المركز",
            phone: t["رقم الهاتف"] || "07XXXXXXX",
            visits: 1
          }));

          setTickets(formattedTickets);
          setCars(formattedCars);
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    }
    loadLiveStats();
  }, []);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  // الإحصائيات المالية المشتقة
  const financeStats = useMemo(() => {
    let totalCashIn = 0;
    let totalCliqIn = 0;
    let extIncome = 0;
    let expTotal = 0;

    tickets.forEach(t => {
      if (t.status === 'تم الدفع والتسليم' || t.status === 'تم التسليم النهائي') {
        if (t.payment === 'كاش') totalCashIn += t.cost;
        if (t.payment === 'كليك' || t.payment === 'كليك (محفظة CliQ)') totalCliqIn += t.cost;
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

  // إحصائيات لوحة التحكم
  const ticketStats = useMemo(() => {
    return {
      waiting: tickets.filter(t => t.status === 'قيد الانتظار').length,
      working: tickets.filter(t => t.status === 'قيد العمل' || t.status === 'جاري الفحص').length,
      ready: tickets.filter(t => t.status === 'جاهزة' || t.status === 'جاهزة للتسليم').length,
    };
  }, [tickets]);

  // مكون النافذة المنبثقة لإضافة سيارة
  const AddCarModal = () => {
    const [plate, setPlate] = useState('');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [brand, setBrand] = useState('ID.4');
    const [desc, setDesc] = useState('');
    const [selectedStaff, setSelectedStaff] = useState([]);

    if (!isAddCarModalOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if(selectedStaff.length === 0) {
          showToast("الرجاء اختيار فني واحد على الأقل", "error");
          return;
      }
      showToast("النظام متصل حالياً للمراقبة، يرجى الإضافة من الهاتف لتحديث السيرفر");
      setIsAddCarModalOpen(false);
    };

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
                            <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} required placeholder="12-40291" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-lg text-center focus:border-sky-500 focus:outline-none" />
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
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${selectedStaff.includes(emp.name) ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                                        {emp.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-800 mt-2">
                        <button type="button" onClick={() => setIsAddCarModalOpen(false)} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white">إلغاء</button>
                        <button type="submit" className="bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_-3px_rgba(2,132,199,0.5)]">حفظ المركبة</button>
                    </div>
                </form>
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
                <span className="text-slate-400 text-xs font-bold block mb-1">صافي الصندوق المتوقع</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-sky-400">{financeStats.netProfit.toFixed(0)}</span>
                    <span className="text-xs text-slate-500 font-mono">JOD</span>
                </div>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                    ساحة المراقبة الحية لمركز الرملي
                </h2>
                <button onClick={() => setIsAddCarModalOpen(true)} className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(2,132,199,0.4)] transition">
                    <IconPlus /> استلام مركبة
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.filter(t => t.status !== 'تم الدفع والتسليم' && t.status !== 'تم التسليم النهائي').map(t => {
                    const car = cars.find(c => c.plate === t.plate) || {};
                    let statusColor = "bg-slate-800 border-slate-700 text-slate-300";
                    let glow = "";
                    if(t.status === 'قيد الانتظار') statusColor = "bg-amber-500/10 border-amber-500/20 text-amber-500";
                    if(t.status === 'قيد العمل' || t.status === 'جاري العمل') { statusColor = "bg-blue-500/10 border-blue-500/30 text-blue-400"; glow="shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"; }
                    if(t.status === 'جاهزة' || t.status === 'جاهزة للتسليم') { statusColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"; glow="shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]"; }

                    return (
                        <div key={t.ticketId} className={`bg-slate-950/50 border ${glow} rounded-2xl p-4 flex flex-col justify-between border-slate-800/80 hover:border-slate-700 transition`}>
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
            {tickets.filter(t => t.status !== 'تم الدفع والتسليم' && t.status !== 'تم التسليم النهائي').length === 0 && (
                <div className="text-center py-10 text-slate-500 text-sm">لا يوجد مركبات في الساحة حالياً.</div>
            )}
        </div>
    </div>
  );

  const ViewFinance = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <IconWallet /> الإدارة المالية
        </h2>
        <div className="grid grid-cols
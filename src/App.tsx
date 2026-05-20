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
  const [employees] = useState([
    { name: "عدنان", role: "فني بطاريات", phone: "0790123456", advances: 20 },
    { name: "عكاشة", role: "ميكانيك عام", phone: "0791234567", advances: 0 },
    { name: "كرم", role: "مهندس برمجة", phone: "0792345678", advances: 10 },
    { name: "محمد", role: "فني صيانة", phone: "0793456789", advances: 50 },
    { name: "مالك", role: "ميكانيك", phone: "0794567890", advances: 0 }
  ]);
  const [finances] = useState([
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
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur
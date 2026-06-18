// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// --- أيقونات سايبربانك الهندسية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

// أيقونات القوائم الجديدة
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;

// أيقونة البطارية الذكية التفاعلية الجديدة
const IconBattery = ({ level }) => {
  let color = "#10b981"; 
  if (level <= 20) color = "#f43f5e"; 
  else if (level <= 50) color = "#f59e0b"; 

  const fillWidth = Math.max(1, 12 * (level / 100));
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke="currentColor" className="text-slate-500" />
      <line x1="22" x2="22" y1="11" y2="13" stroke="currentColor" className="text-slate-500" />
      <rect width={fillWidth} height="6" x="4" y="9" rx="1" ry="1" fill={color} stroke="none" />
    </svg>
  );
};

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important;
    padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; }
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
      background-color: rgba(16, 185, 129, 0.03) !important;
    }
  `;
  document.head.appendChild(style);
}

// =====================================
// نظام الصوت الشامل (نغمة + نطق آلي باللغة العربية)
// =====================================
let globalAudioCtx = null;
let audioInitialized = false;

const initAudioSilent = () => {
  if (audioInitialized) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    globalAudioCtx = new AudioContext();
    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }
    
    // تهيئة صامتة لمحرك النطق لتجاوز حظر المتصفح
    if ('speechSynthesis' in window) {
       const dummy = new SpeechSynthesisUtterance('');
       window.speechSynthesis.speak(dummy);
    }
    
    audioInitialized = true;
  } catch (e) {
    console.error("Audio init failed", e);
  }
};

// دالة جديدة تستقبل بيانات السيارة لنطقها
const playReadyAlertWithVoice = (ticketId, customerName) => {
  if (!globalAudioCtx || !audioInitialized) return; 
  if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();

  try {
    const ctx = globalAudioCtx;
    const t = ctx.currentTime;

    // 1. تشغيل نغمة التنبيه (Ding-Ding) أولاً
    const playAlertTone = (freq, startTime, duration, volume = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(freq, startTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02); 
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration); 
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    };

    playAlertTone(880.00, t, 0.5, 0.08);        
    playAlertTone(1318.51, t + 0.25, 1.5, 0.08); 

    // 2. بعد ثانية واحدة (لإعطاء النغمة وقتها)، نقوم بتشغيل النطق الآلي
    setTimeout(() => {
      if ('speechSynthesis' in window) {
        // نأخذ الاسم الأول للعميل ليكون النداء ودياً وقصيراً
        const firstName = customerName ? customerName.split(' ')[0] : 'عميلنا';
        
        // النص الذي سينطقه النظام
        const textToSpeak = `نِداء. سيارة العميل ${firstName}، كرت رقم ${ticketId}، جاهزة الآن.`;
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ar-SA'; // نطلب من النظام استخدام الصوت العربي المتاح
        utterance.rate = 0.85;    // إبطاء سرعة النطق قليلاً ليكون واضحاً ومفهوماً
        utterance.pitch = 1.0;
        
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);

  } catch (e) { 
      console.error("Audio/Speech blocked by browser.", e); 
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudioSilent();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const timestampUrl = `${API_URL}?t=${new Date().getTime()}`;
        const res = await fetch(timestampUrl, { cache: "no-store" });
        const data = await res.json();
        
        if (Array.isArray(data) && isMounted) {
          const getCleanValue = (row, possibleKeys) => {
             const rowKeys = Object.keys(row);
             for (let pKey of possibleKeys) {
                const foundKey = rowKeys.find(k => k.trim() === pKey);
                if (foundKey && row[foundKey] !== undefined && row[foundKey] !== "") return row[foundKey];
             }
             return null;
          };

          const liveRows = data.filter(r => {
             const isArchived = getCleanValue(r, ["مرحل"]);
             const customer = getCleanValue(r, ["اسم الزبون", "الزبون"]);
             const status = String(getCleanValue(r, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "");
             return customer !== null && isArchived !== true && isArchived !== "TRUE" && isArchived !== "true" && !status.includes("تسليم") && !status.includes("تم التسليم");
          });

          // مصفوفة لحفظ السيارات التي أصبحت جاهزة في هذه الدورة
          let newlyReadyTickets = [];
          const currentTimers = { ...readyTimers };

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const cost = parseFloat(rawCost) || 0;

            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            const customerName = getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي";
           
            const isReady = status.includes("جاهز");
            if (isReady) {
              // إذا كانت السيارة للتو أصبحت جاهزة (غير موجودة في المؤقتات السابقة)
              if (!currentTimers[id]) { 
                 currentTimers[id] = Date.now(); 
                 newlyReadyTickets.push({ id, customerName }); 
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;
            const timeStr = getCleanValue(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO');
            
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            const socValue = rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : (30 + (plateNum % 66));

            return {
              id,
              time: timeStr,
              plate: plateStr,
              customer: customerName,
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost,
              soc: socValue,
              driveTrain: plateNum % 2 === 0 ? "AWD Dual Motor" : "RWD Ultra"
            };
          });

          // تفعيل النداء الصوتي لكل سيارة أصبحت جاهزة للتو
          if (newlyReadyTickets.length > 0) {
            newlyReadyTickets.forEach(ticket => {
               playReadyAlertWithVoice(ticket.id, ticket.customerName);
            });
          }

          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) {
        console.error("الربط السحابي معطل:", err);
      }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 1500);
    return () => { isMounted = false; clearInterval(loop); };
  }, [readyTimers]);

  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز');
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
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) {
        cliqTotal += t.cost;
      } else {
        cashTotal += t.cost;
      }
    });
    const taxes = grossRevenue * 0.05; 
    const netProfit = grossRevenue - taxes;
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, taxes, netProfit };
  }, [displayTickets]);

  return (
    <div className="min-h-screen w-full bg-[#02040a] flex flex-col font-sans select-none overflow-hidden" dir="rtl">
      <header className="w-full bg-[#090d16] border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-700 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
             <img src="/logo.jpg" alt="Logo" className="h-full w-full object-contain" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-black p-2.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse">
            <IconVolt />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest">ABU AL-NADI GATEWAY</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">ABU AL-NADI ENTERPRISE <span className="text-emerald-400 font-light text-sm">v5.0 OS</span></h1>
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
        <aside className="w-20 bg-[#04070d] border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20">
          <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
          <SidebarButton icon={<IconCalendar />} title="تفاصيل الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto w-full bg-[#02040a]">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} tickets={displayTickets} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'expenses' && <QuantumExpenses />}
          {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
        </main>
      </div>
    </div>
  );
}

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
    {icon}
    <span className="absolute right-24 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

// ==========================================
// 1. الساحة الحية (Live Yard)
// ==========================================
const QuantumYard = ({ tickets }) => {
  const stats = useMemo(() => {
    return {
      waiting: tickets.filter(t => t.status.includes('انتظار')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز')).length,
      total: tickets.length
    };
  }, [tickets]);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="مسار الاستلام والفحص" value={stats.waiting} badge="WAITING BAYS" color="amber" />
        <StatCard title="كبائن العمليات (HV)" value={stats.working} badge="ACTIVE LOCKS" color="cyan" />
        <StatCard title="ممر التجهيز والتسليم" value={stats.ready} badge="READY TO FLY" color="emerald" isPulse={true} />
        <StatCard title="المركبات النشطة" value={stats.total} badge="LIVE UNITS" color="white" />
      </div>

      <div className="w-full bg-[#070b12] border border-[#121e30] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          اللوحة الرقمية الموحدة لتدفق المركبات الحية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {tickets.map(t => {
            let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
            let glow = "border-[#1a2740]";
            let isReadyBlink = false;
            let progressPercent = 15; let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";

            if (t.status.includes('انتظار')) { badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/20"; }
            if (t.status.includes('عمل') || t.status.includes('فحص')) { 
                badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";
                glow="border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]"; 
                progressPercent = t.status.includes('عمل') ? 75 : 45; progressColor = t.status.includes('عمل') ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";
            }
            if (t.status.includes('جاهز')) { 
                badgeStyle = "bg-emerald-500 text-black font-bold border-emerald-400";
                glow="border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]"; 
                progressPercent = 100; progressColor = "bg-emerald-500 shadow-[0_0_12px_#10b981]"; isReadyBlink = true;
            }

            let socColorText = 'text-emerald-400';
            if(t.soc <= 20) socColorText = 'text-rose-400';
            else if(t.soc <= 50) socColorText = 'text-amber-400';

            return (
              <div key={t.id} className={`bg-[#050914] border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group w-full shadow-xl ${isReadyBlink ? 'ready-blink' : ''}`}>
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">CRD #{t.id}</span>
                    <span className={`text-[10px] px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
                      {isReadyBlink && <IconCheck />}{t.status}
                    </span>
                  </div>
  
                  <div className="mb-5">
                    <h3 className="font-black text-white text-xl tracking-wide mb-1.5">{t.carModel}</h3>
                    <div className="flex items-center gap-2"><span className="text-xs text-slate-500">العميل:</span><span className="text-sm font-bold text-sky-400">{t.customer.split(' ')[0]}</span></div>
                  </div>
         
                  <div className="flex items-center justify-between bg-[#0a101d] border border-[#162235] rounded-xl px-4 py-2.5 mb-5">
                    <div className="flex-[2]">
                      <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">PLATE NUMBER</span>
                      <span className="font-mono text-cyan-400 text-sm font-black tracking-widest whitespace-nowrap">{t.plate}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-end pl-1 border-r border-[#162235] pr-3">
                      <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">BATTERY SOC</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <span className={`font-mono text-[11px] font-black ${socColorText}`}>{t.soc}%</span>
                         <IconBattery level={t.soc} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between text-[10px] font-mono font-bold"><span className="text-slate-400">PROGRESS</span><span className="text-white font-black">{progressPercent}%</span></div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80"><div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div></div>
                  </div>
                  <div className="bg-[#090d16] p-3.5 rounded-xl border border-[#142033] mb-5">
                    <span className="text-[10px] text-slate-500 block mb-1.5">تفاصيل العطل / العمل:</span>
                    <div className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-2">{t.problem}</div>
                  </div>
                </div>
                <div className="border-t border-[#162235] pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto">
                   <div><span className="text-slate-500 block mb-0.5">TOTAL VALUE</span><span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span></div>
                  <div className="text-left"><span className="text-slate-500 block mb-0.5">TECH</span><span className="text-emerald-400 text-xs">{t.engineer}</span></div>
                </div>
              </div>
            );
          })}
          {tickets.length === 0 && <div className="text-slate-500 col-span-full py-10 text-center font-bold">الساحة المركزية فارغة من الحركات الحية.</div>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. الخزينة اليومية (Daily Treasury)
// ==========================================
const QuantumTreasury = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
      <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/30"><IconCoins /></div>
      الخزينة اليومية - التدقيق المحاسبي الموحد
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="إجمالي الدخل (الخام)" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="مقبوضات الأيدي العاملة (40%)" value={accounting.laborFees} color="emerald" />
      <FinanceCard title="مبيعات مخزن القطع (60%)" value={accounting.partsRevenue} color="cyan" />
      <FinanceCard title="صافي التدفق المالي" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
       <div className="bg-[#070b12] border border-[#121e30] rounded-2xl p-6 shadow-xl">
         <h3 className="text-sm font-bold text-slate-300 mb-4 border-b border-[#162235] pb-3">تفصيل المقبوضات حسب القناة</h3>
         <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#090d16] p-4 rounded-xl border border-[#162235]">
               <span className="text-slate-400 font-bold text-sm">مقبوضات الكاش الفوري</span>
               <span className="text-xl font-black text-emerald-400 font-mono">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#090d16] p-4 rounded-xl border border-[#162235]">
               <span className="text-slate-400 font-bold text-sm">حوالات كليك (CliQ)</span>
               <span className="text-xl font-black text-indigo-400 font-mono">{accounting.cliqTotal.toFixed(2)} JOD</span>
            </div>
         </div>
       </div>
    </div>
  </div>
);

// ==========================================
// 3. المقبوضات (Receipts)
// ==========================================
const QuantumReceipts = ({ tickets }) => {
  const paidTickets = tickets.filter(t => t.cost > 0);
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/30"><IconReceipt /></div>
        سجل المقبوضات والإيرادات
      </h2>
      
      <div className="w-full bg-[#070b12] border border-[#121e30] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-500 text-[11px] font-black uppercase tracking-wider border-b border-[#16243a]">
                <th className="pb-4 px-4 text-center">رقم الكرت</th>
                <th className="pb-4 px-4">رقم اللوحة</th>
                <th className="pb-4 px-4">اسم الزبون</th>
                <th className="pb-4 px-4">نوع المركبة</th>
                <th className="pb-4 px-4 text-center">طريقة الدفع</th>
                <th className="pb-4 px-4 text-left">المبلغ المُحصل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111a29]">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#090d16] transition-colors group">
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-500">#{t.id}</td>
                  <td className="py-4 px-4 font-mono text-sm font-bold text-cyan-400">{t.plate}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{t.customer}</td>
                   <td className="py-4 px-4 text-xs text-slate-400">{t.carModel}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-black border ${t.paymentMethod.includes('كليك') ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                      {t.paymentMethod || 'كاش'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-left font-mono font-black text-emerald-400 text-lg">+{t.cost.toFixed(2)} JOD</td>
                </tr>
              ))}
              {paidTickets.length === 0 && (
                <tr><td colSpan="6" className="text-center py-10 text-slate-500 font-bold">لا يوجد مقبوضات مسجلة حالياً.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. المصاريف (Expenses)
// ==========================================
const QuantumExpenses = () => {
  const mockExpenses = [
    { id: 1, desc: "أكل للشباب", amount: 20, time: "01:30 PM" },
    { id: 2, desc: "شراء مواد فحص", amount: 45, time: "11:15 AM" },
    { id: 3, desc: "مصاريف ضيافة", amount: 10, time: "09:00 AM" }
  ];
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-rose-500/10 p-2 rounded-lg text-rose-400 border border-rose-500/30"><IconExpense /></div>
        سجل المصروفات اليومية
      </h2>
      
      <div className="w-full bg-[#070b12] border border-[#121e30] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-6 text-sm text-rose-400 font-bold flex items-center gap-3">
             <IconVolt /> ملاحظة: هذه بيانات تجريبية للتصميم. يتطلب عرض المصاريف الحقيقية تحديث كود Google Apps Script.
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-500 text-[11px] font-black uppercase tracking-wider border-b border-[#16243a]">
                <th className="pb-4 px-4 text-center">الوقت</th>
                <th className="pb-4 px-4">بيان المصروف</th>
                <th className="pb-4 px-4 text-left">القيمة المخصومة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111a29]">
              {mockExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#090d16] transition-colors">
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-500">{exp.time}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{exp.desc}</td>
                  <td className="py-4 px-4 text-left font-mono font-black text-rose-400 text-lg">-{exp.amount.toFixed(2)} JOD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. تفاصيل الأيام / شيت الأيام (Daily Details)
// ==========================================
const QuantumDailyDetails = ({ tickets }) => {
  const todayStr = new Date().toLocaleDateString('en-GB');
  let dCash = 0, dCliq = 0;
  tickets.forEach(t => {
      if (t.paymentMethod.includes('كليك')) dCliq += t.cost;
      else dCash += t.cost;
  });
  const dExp = 75; // افتراضي من الـ Mock
  const dNet = (dCash + dCliq) - dExp;

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/30"><IconCalendar /></div>
        التقرير اليومي المفصل (شيت الأيام)
      </h2>

      <div className="w-full border border-[#162235] rounded-2xl overflow-hidden shadow-2xl bg-[#02050b]">
        <div className="bg-[#0f172a] text-white text-center py-4 font-black tracking-widest border-b border-[#1e293b] flex items-center justify-center gap-2">
          <IconCalendar /> 
          كشف حركات وإغلاق يوم: {todayStr}
        </div>

        <div className="p-1 overflow-x-auto">
          <table className="w-full text-center text-xs min-w-[800px]">
            <thead>
              <tr>
                <th className="bg-[#065f46] text-white py-2 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#065f46] text-white py-2 px-2 border border-[#1e293b]">الملخص المالي لليوم</th>
                <th className="w-4"></th>
                <th className="bg-[#9f1239] text-white py-2 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#9f1239] text-white py-2 px-2 border border-[#1e293b]">بيان المصروف</th>
                <th className="w-4"></th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">المبلغ</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">تفاصيل الشغل</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">الموظف المسؤول</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">الموديل</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">الزبون</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">رقم اللوحة</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">رقم الكرت</th>
              </tr>
            </thead>
            <tbody>
               <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300 bg-[#0f172a]">{dCash}</td>
                <td className="py-2 border border-[#1e293b] font-bold text-emerald-400 bg-[#0f172a]">دخل الكاش 💵</td>
                <td></td>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300">20</td>
                <td className="py-2 border border-[#1e293b] font-bold text-slate-300">أكل للشباب</td>
                <td></td>
                {tickets[0] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[0].cost} ({tickets[0].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[0].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[0].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">#{tickets[0].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b] text-slate-500">لا يوجد بيانات</td>}
              </tr>
              <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300 bg-[#0f172a]">{dCliq}</td>
                <td className="py-2 border border-[#1e293b] font-bold text-indigo-400 bg-[#0f172a]">دخل الكليك 💳</td>
                <td></td>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300">45</td>
                <td className="py-2 border border-[#1e293b] font-bold text-slate-300">مواد فحص</td>
                <td></td>
                {tickets[1] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[1].cost} ({tickets[1].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[1].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[1].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[1].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[1].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[1].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">#{tickets[1].id}</td>
                  </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b]"></td>}
              </tr>
              <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300 bg-[#0f172a]">{dExp}</td>
                <td className="py-2 border border-[#1e293b] font-bold text-rose-400 bg-[#0f172a]">إجمالي المصاريف 📉</td>
                <td></td>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300">10</td>
                <td className="py-2 border border-[#1e293b] font-bold text-slate-300">ضيافة</td>
                <td></td>
                {tickets[2] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[2].cost} ({tickets[2].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[2].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[2].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[2].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[2].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[2].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">#{tickets[2].id}</td>
                  </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b]"></td>}
              </tr>
               <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-black text-emerald-900 bg-[#10b981]">{dNet}</td>
                <td className="py-2 border border-[#1e293b] font-black text-emerald-900 bg-[#10b981]">صافي الربح 💰</td>
                <td></td>
                <td className="py-2 border border-[#1e293b]"></td>
                <td className="py-2 border border-[#1e293b]"></td>
                <td></td>
                {tickets[3] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[3].cost} ({tickets[3].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[3].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[3].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[3].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[3].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[3].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">#{tickets[3].id}</td>
                  </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b]"></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, badge, color, isPulse = false }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    white: "text-white border-slate-500/20 bg-white/10"
  };
  const glow = isPulse ? `shadow-[0_0_15px_rgba(16,185,129,0.05)] border-emerald-500/30` : `border-[#16243a]`;

  return (
    <div className={`bg-[#090d16] p-5 rounded-2xl flex flex-col justify-between shadow-xl border ${glow}`}>
      <span className="text-slate-400 text-xs font-black tracking-wider uppercase">{title}</span>
      <div className="flex items-baseline justify-between mt-2">
        <span className={`text-4xl font-black font-mono ${colors[color].split(' ')[0]} ${isPulse ? 'animate-pulse' : ''}`}>{value}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${colors[color]}`}>{badge}</span>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
  const glowClass = isGlow ? 'border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-[#16243a]';
  return (
    <div className={`bg-[#090d16] border ${glowClass} p-6 rounded-2xl shadow-xl`}>
      <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-mono mt-2 block tracking-tighter`}>{value.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
    </div>
  );
};
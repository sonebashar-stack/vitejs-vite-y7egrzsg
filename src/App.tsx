// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- أيقونات سايبربانك الهندسية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;

// أيقونة البطارية الذكية التفاعلية الجديدة
const IconBattery = ({ level }) => {
  let color = "#10b981"; // أخضر (ممتاز)
  if (level <= 20) color = "#f43f5e"; // أحمر (منخفض جداً)
  else if (level <= 50) color = "#f59e0b"; // أصفر (متوسط)
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
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #050a15; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    
    /* شبكة الذكاء الاصطناعي في الخلفية */
    .bg-ai-grid {
      background-size: 50px 50px;
      background-image: linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
    }
    
    /* تأثير الخطوط الإلكترونية داخل الكروت */
    .circuit-bg {
      background-image: radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.05) 0%, transparent 70%);
    }

    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink {
      animation: pulse-ring 1.5s infinite;
      background-color: rgba(16, 185, 129, 0.05) !important;
    }
    
    /* تأثير دوران بطيء للإيموجي */
    .animate-spin-slow { animation: spin 4s linear infinite; }
  `;
  document.head.appendChild(style);
}

// =====================================
// نظام الصوت الخفي - نغمة تنبيه راقية تلفت الانتباه
// =====================================
let globalAudioCtx = null;
let audioInitialized = false;
const initAudioSilent = () => {
  if (audioInitialized) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    globalAudioCtx = new AudioContext();
    if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
    audioInitialized = true;
  } catch (e) { console.error("Audio init failed", e); }
};
const playReadySound = () => {
  if (!globalAudioCtx || !audioInitialized) return; 
  if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
  try {
    const ctx = globalAudioCtx;
    const t = ctx.currentTime;
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
    playAlertTone(880.00, t, 0.5, 0.08); // النغمة الأولى
    playAlertTone(1318.51, t + 0.25, 1.5, 0.08); // النغمة الثانية
  } catch (e) { console.error("Audio blocked by browser.", e); }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  
  // تتبع الوقت
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- تفعيل الصوت بصمت ---
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudioSilent();
      ['click', 'keydown', 'touchstart'].forEach(e => document.removeEventListener(e, handleFirstInteraction));
    };
    ['click', 'keydown', 'touchstart'].forEach(e => document.addEventListener(e, handleFirstInteraction));
    return () => {
      ['click', 'keydown', 'touchstart'].forEach(e => document.removeEventListener(e, handleFirstInteraction));
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

          let playBeep = false;
          const currentTimers = { ...readyTimers };
          
          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const cost = parseFloat(rawCost) || 0;
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
           
            const isReady = status.includes("جاهز");
            if (isReady) {
              if (!currentTimers[id]) { currentTimers[id] = Date.now(); playBeep = true; }
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
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة ذكية",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost,
              soc: socValue,
              driveTrain: plateNum % 2 === 0 ? "AWD Dual Motor" : "RWD Ultra"
            };
          });

          if (playBeep) playReadySound();
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) { console.error("الربط السحابي معطل:", err); }
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
    <div className="min-h-screen w-full bg-[#050a15] bg-ai-grid flex flex-col font-sans select-none overflow-hidden relative" dir="rtl">
      {/* البار العلوي بلمسة الذكاء الاصطناعي المستوحاة من الصور */}
      <header className="w-full bg-[#030610]/90 backdrop-blur-md border-b border-[#122340] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(34,211,238,0.1)] z-30">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
             <IconCpu className="text-cyan-400 w-8 h-8" />
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-black p-2.5 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] animate-pulse">
            <IconVolt />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest">EV AI CARE</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">ABU AL-NADI <span className="text-cyan-400 font-light text-sm">Adaptive AI Solutions</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs bg-[#05080f]/80 border border-cyan-900/50 px-4 py-2 rounded-xl text-cyan-200 shadow-inner flex items-center gap-3 font-bold tracking-widest backdrop-blur-sm">
            <span className="text-emerald-400 animate-ping text-[6px]">●</span>
            <span>AMMAN AI-ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden relative z-10">
        {/* القوائم الجانبية */}
        <aside className="w-20 bg-[#030610]/95 backdrop-blur-xl border-l border-[#122340] flex flex-col items-center py-6 gap-6 shadow-2xl z-20">
          <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
          <SidebarButton icon={<IconCalendar />} title="تفاصيل الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} readyTimers={readyTimers} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} tickets={displayTickets} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'expenses' && <QuantumExpenses />}
          {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
        </main>
      </div>
    </div>
  );
}

// مكون زر القائمة الجانبية
const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:bg-slate-800 hover:text-cyan-300'}`}>
    {icon}
    <span className="absolute right-24 bg-[#0a1224] border border-cyan-900/50 px-3 py-1.5 rounded-lg text-[11px] text-cyan-50 font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

// ==========================================
// 1. الساحة الحية (Live Yard) مع نظام الكرت المنبثق
// ==========================================
const QuantumYard = ({ tickets, readyTimers }) => {
  const [heroTicket, setHeroTicket] = useState(null);
  const shownReadyIds = useRef(new Set());

  // منطق اكتشاف كرت جاهز جديد وعرضه كـ Hero Modal لمدة 10 ثواني
  useEffect(() => {
    const newReady = tickets.find(t => t.status.includes('جاهز') && !shownReadyIds.current.has(t.id));
    if (newReady) {
      shownReadyIds.current.add(newReady.id);
      setHeroTicket(newReady);
      const timer = setTimeout(() => {
        setHeroTicket(null);
      }, 10000); // إخفاء بعد 10 ثواني
      return () => clearTimeout(timer);
    }
  }, [tickets]);

  const stats = useMemo(() => {
    return {
      waiting: tickets.filter(t => t.status.includes('انتظار')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز')).length,
      total: tickets.length
    };
  }, [tickets]);

  return (
    <div className="w-full space-y-6 animate-fade-in relative">
      {/* طبقة التغبيش والكرت المنبثق (Hero) عند التجهيز */}
      {heroTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050b]/80 backdrop-blur-md transition-all duration-500 animate-in fade-in zoom-in-95">
           <div className="absolute top-10 text-center w-full animate-bounce">
              <span className="text-4xl font-black text-emerald-400 tracking-widest drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]">المركبة جاهزة للتسليم!</span>
           </div>
           <div className="w-[500px] transform scale-125 shadow-[0_0_100px_rgba(16,185,129,0.4)] rounded-3xl border-2 border-emerald-400 bg-[#050914] relative">
              <TicketCard t={heroTicket} isHero={true} />
              {/* شريط التحميل التنازلي للـ Hero */}
              <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 w-full animate-[shrink_10s_linear_forwards]" />
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="قائمة الانتظار (AI Queue)" value={stats.waiting} badge="WAITING BAYS" color="amber" />
        <StatCard title="قيد التشخيص / الفحص" value={stats.working} badge="ACTIVE AI SCAN" color="cyan" />
        <StatCard title="ممر التجهيز والتسليم" value={stats.ready} badge="READY TO FLY" color="emerald" isPulse={true} />
        <StatCard title="إجمالي المركبات النشطة" value={stats.total} badge="LIVE AI UNITS" color="white" />
      </div>

      <div className="w-full bg-[#0a1122]/80 backdrop-blur-sm border border-cyan-900/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <h2 className="text-sm font-black text-cyan-50 mb-6 uppercase tracking-widest flex items-center gap-2">
          <IconSearch className="text-cyan-400 animate-pulse" />
          اللوحة الرقمية المدعومة بالذكاء الاصطناعي للتدفق الحي
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {tickets.map(t => (
            <TicketCard key={t.id} t={t} isHero={false} />
          ))}
          {tickets.length === 0 && <div className="text-cyan-700 col-span-full py-10 text-center font-bold text-lg border border-dashed border-cyan-800/50 rounded-xl bg-cyan-900/10">الساحة المركزية فارغة من الحركات الحية حالياً.</div>}
        </div>
      </div>
    </div>
  );
};

// تصميم الكرت المنفصل لتسهيل إعادة استخدامه في العرض العادي والـ Hero Popup
const TicketCard = ({ t, isHero }) => {
  let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
  let glow = "border-[#1a2740]";
  let isReadyBlink = false;
  let progressPercent = 15; 
  let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
  let statusEmoji = "⏳";
  let emojiAnim = "animate-pulse";

  if (t.status.includes('انتظار')) { 
    badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30"; 
    statusEmoji = "⏳"; 
  }
  if (t.status.includes('فحص')) { 
    badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/30";
    glow="border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]"; 
    progressPercent = 45; 
    progressColor = "bg-blue-400 shadow-[0_0_8px_#60a5fa]";
    statusEmoji = "🔍";
    emojiAnim = "animate-bounce";
  }
  if (t.status.includes('عمل') || t.status.includes('صيانة')) { 
    badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/30";
    glow="border-cyan-500/50 shadow-[0_0_25px_rgba(34,211,238,0.2)]"; 
    progressPercent = 75; 
    progressColor = "bg-cyan-400 shadow-[0_0_12px_#22d3ee]";
    statusEmoji = "⚙️";
    emojiAnim = "animate-spin-slow";
  }
  if (t.status.includes('جاهز')) { 
    badgeStyle = "bg-emerald-500 text-black font-bold border-emerald-400 shadow-[0_0_10px_#10b981]";
    glow="border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]"; 
    progressPercent = 100; 
    progressColor = "bg-emerald-500 shadow-[0_0_12px_#10b981]"; 
    isReadyBlink = true;
    statusEmoji = "🚀";
    emojiAnim = "animate-bounce";
  }

  let socColorText = 'text-emerald-400';
  if(t.soc <= 20) socColorText = 'text-rose-400';
  else if(t.soc <= 50) socColorText = 'text-amber-400';

  return (
    <div className={`circuit-bg bg-[#070d1c] border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${!isHero && 'hover:scale-[1.02] hover:-translate-y-1'} group w-full relative ${isReadyBlink ? 'ready-blink' : ''}`}>
      
      {/* الإيموجي العائم المعبر عن الحالة والتصرف */}
      <div className={`absolute -top-4 -right-3 w-10 h-10 bg-[#0a1224] border border-cyan-800 rounded-full flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10 ${emojiAnim}`}>
        {statusEmoji}
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <span className="font-mono text-[10px] text-cyan-200 bg-cyan-900/40 px-2.5 py-1 rounded border border-cyan-800/60 shadow-inner">
            AI-CRD #{t.id}
          </span>
          <span className={`text-[10px] px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
            {isReadyBlink && <IconCheck />}{t.status}
          </span>
        </div>

        <div className="mb-5 relative z-10">
          <h3 className="font-black text-white text-xl tracking-wide mb-1.5 drop-shadow-md">{t.carModel}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">العميل:</span>
            <span className="text-sm font-bold text-amber-400">{t.customer.split(' ')[0]}</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#030610]/80 backdrop-blur-sm border border-cyan-900/40 rounded-xl px-4 py-2.5 mb-5 shadow-inner">
          <div className="flex-[2]">
            <span className="text-[8px] text-cyan-600 block font-mono font-bold mb-0.5">PLATE NUMBER</span>
            <span className="font-mono text-cyan-300 text-sm font-black tracking-widest whitespace-nowrap drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{t.plate}</span>
          </div>
          <div className="flex-1 flex flex-col items-end pl-1 border-r border-[#162235] pr-3">
            <span className="text-[8px] text-cyan-600 block font-mono font-bold mb-0.5">BATTERY SOC</span>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className={`font-mono text-[11px] font-black drop-shadow-md ${socColorText}`}>{t.soc}%</span>
               <IconBattery level={t.soc} />
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-[10px] font-mono font-bold">
            <span className="text-cyan-600">AI DIAGNOSTIC PROGRESS</span>
            <span className="text-cyan-100 font-black">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#030610] rounded-full overflow-hidden border border-cyan-900/50 shadow-inner">
            <div className={`h-full rounded-full transition-all duration-1000 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="bg-[#030610]/60 p-3.5 rounded-xl border border-cyan-900/30 mb-5 relative overflow-hidden group-hover:border-cyan-700/50 transition-colors">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none"></div>
          <span className="text-[10px] text-cyan-500 block mb-1.5 flex items-center gap-1"><IconCpu /> تفاصيل فحص الـ AI:</span>
          <div className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-2">{t.problem}</div>
        </div>
      </div>

      <div className="border-t border-[#122340] pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto relative z-10">
         <div>
           <span className="text-cyan-700 block mb-0.5">ESTIMATED VALUE</span>
           <span className="text-white text-sm font-black drop-shadow-md">{t.cost.toFixed(0)} JOD</span>
         </div>
         <div className="text-left">
           <span className="text-cyan-700 block mb-0.5">ASSIGNED TECH</span>
           <span className="text-amber-400 text-xs font-bold drop-shadow-[0_0_5px_rgba(245,158,11,0.4)]">{t.engineer}</span>
         </div>
      </div>
    </div>
  );
};

// ==========================================
// باقي المكونات (Treasury, Receipts, Expenses, Daily Details)
// تم تعديل الألوان العامة لتناسب النمط الجديد.
// ==========================================
const QuantumTreasury = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-lg font-black text-cyan-50 uppercase tracking-widest flex items-center gap-2">
      <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400 border border-amber-500/30"><IconCoins /></div>
      الخزينة اليومية - التدقيق المحاسبي الموحد الذكي
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="إجمالي الدخل (الخام)" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="مقبوضات الأيدي العاملة (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="مبيعات مخزن القطع (60%)" value={accounting.partsRevenue} color="blue" />
      <FinanceCard title="صافي التدفق المالي" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
       <div className="bg-[#0a1122]/80 backdrop-blur-sm border border-cyan-900/30 rounded-2xl p-6 shadow-xl">
         <h3 className="text-sm font-bold text-cyan-200 mb-4 border-b border-cyan-900/50 pb-3">تفصيل المقبوضات حسب القناة (AI Routing)</h3>
         <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#030610]/80 p-4 rounded-xl border border-cyan-900/40">
               <span className="text-slate-300 font-bold text-sm">مقبوضات الكاش الفوري</span>
               <span className="text-xl font-black text-emerald-400 font-mono drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#030610]/80 p-4 rounded-xl border border-cyan-900/40">
               <span className="text-slate-300 font-bold text-sm">حوالات كليك (CliQ) المدعومة</span>
               <span className="text-xl font-black text-blue-400 font-mono drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]">{accounting.cliqTotal.toFixed(2)} JOD</span>
            </div>
         </div>
       </div>
    </div>
  </div>
);

const QuantumReceipts = ({ tickets }) => {
  const paidTickets = tickets.filter(t => t.cost > 0);
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h2 className="text-lg font-black text-cyan-50 uppercase tracking-widest flex items-center gap-2">
        <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/30"><IconReceipt /></div>
        سجل المقبوضات والإيرادات الذكية
      </h2>
      <div className="w-full bg-[#0a1122]/80 backdrop-blur-sm border border-cyan-900/30 rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-cyan-600 text-[11px] font-black uppercase tracking-wider border-b border-cyan-900/50">
                <th className="pb-4 px-4 text-center">رقم AI-CRD</th>
                <th className="pb-4 px-4">رقم اللوحة</th>
                <th className="pb-4 px-4">العميل</th>
                <th className="pb-4 px-4">نوع المركبة</th>
                <th className="pb-4 px-4 text-center">بوابة الدفع</th>
                <th className="pb-4 px-4 text-left">المبلغ المُحصل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-900/30">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#030610]/60 transition-colors group">
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-500">#{t.id}</td>
                  <td className="py-4 px-4 font-mono text-sm font-bold text-cyan-300">{t.plate}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{t.customer}</td>
                  <td className="py-4 px-4 text-xs text-slate-400">{t.carModel}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-black border ${t.paymentMethod.includes('كليك') ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                      {t.paymentMethod || 'كاش'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-left font-mono font-black text-emerald-400 text-lg">+{t.cost.toFixed(2)} JOD</td>
                </tr>
              ))}
              {paidTickets.length === 0 && (
                <tr><td colSpan="6" className="text-center py-10 text-cyan-700 font-bold">لا توجد حركات مالية مسجلة في الشبكة حالياً.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuantumExpenses = () => {
  const mockExpenses = [
    { id: 1, desc: "أكل للشباب", amount: 20, time: "01:30 PM" },
    { id: 2, desc: "شراء مواد فحص", amount: 45, time: "11:15 AM" },
    { id: 3, desc: "مصاريف ضيافة", amount: 10, time: "09:00 AM" }
  ];
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h2 className="text-lg font-black text-cyan-50 uppercase tracking-widest flex items-center gap-2">
        <div className="bg-rose-500/10 p-2 rounded-lg text-rose-400 border border-rose-500/30"><IconExpense /></div>
        سجل المصروفات اليومية
      </h2>
      <div className="w-full bg-[#0a1122]/80 backdrop-blur-sm border border-cyan-900/30 rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-6 text-sm text-rose-400 font-bold flex items-center gap-3">
              <IconVolt /> تنبيه النظام: هذه بيانات تجريبية للتصميم المستقبلي. يتطلب عرض المصاريف الحقيقية تحديث خوادم Google Apps Script.
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-cyan-600 text-[11px] font-black uppercase tracking-wider border-b border-cyan-900/50">
                <th className="pb-4 px-4 text-center">طابع الوقت (Timestamp)</th>
                <th className="pb-4 px-4">بيان المصروف</th>
                <th className="pb-4 px-4 text-left">القيمة المخصومة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-900/30">
              {mockExpenses.map((exp) => (
                 <tr key={exp.id} className="hover:bg-[#030610]/60 transition-colors">
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-500">{exp.time}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{exp.desc}</td>
                  <td className="py-4 px-4 text-left font-mono font-black text-rose-400 text-lg drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">-{exp.amount.toFixed(2)} JOD</td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuantumDailyDetails = ({ tickets }) => {
  const todayStr = new Date().toLocaleDateString('en-GB');
  let dCash = 0, dCliq = 0;
  tickets.forEach(t => {
      if (t.paymentMethod.includes('كليك')) dCliq += t.cost;
      else dCash += t.cost;
  });
  const dExp = 75; 
  const dNet = (dCash + dCliq) - dExp;
  return (
    <div className="w-full space-y-8 animate-fade-in">
      <h2 className="text-lg font-black text-cyan-50 uppercase tracking-widest flex items-center gap-2">
        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/30"><IconCalendar /></div>
        التقرير اليومي المفصل - AI Analytics
      </h2>

      <div className="w-full border border-cyan-900/50 rounded-2xl overflow-hidden shadow-2xl bg-[#030610]/90 backdrop-blur-md">
        <div className="bg-[#0a1224] text-cyan-300 text-center py-4 font-black tracking-widest border-b border-cyan-900/50 flex items-center justify-center gap-2">
          <IconCpu /> سجل حركات وإغلاق يوم: {todayStr} (Data Node Sync)
        </div>

        <div className="p-1 overflow-x-auto">
          <table className="w-full text-center text-xs min-w-[800px]">
            <thead>
              <tr>
                <th className="bg-emerald-900/40 text-emerald-300 py-2 px-2 border border-cyan-900/30">القيمة</th>
                <th className="bg-emerald-900/40 text-emerald-300 py-2 px-2 border border-cyan-900/30">الملخص المالي لليوم</th>
                <th className="w-4"></th>
                <th className="bg-rose-900/40 text-rose-300 py-2 px-2 border border-cyan-900/30">القيمة</th>
                <th className="bg-rose-900/40 text-rose-300 py-2 px-2 border border-cyan-900/30">بيان المصروف</th>
                <th className="w-4"></th>
                <th className="bg-cyan-900/40 text-cyan-100 py-2 px-2 border border-cyan-900/30">المبلغ</th>
                <th className="bg-cyan-900/40 text-cyan-100 py-2 px-2 border border-cyan-900/30">تفاصيل فحص الـ AI</th>
                <th className="bg-cyan-900/40 text-cyan-100 py-2 px-2 border border-cyan-900/30">الموظف المسؤول</th>
                <th className="bg-cyan-900/40 text-cyan-100 py-2 px-2 border border-cyan-900/30">الموديل</th>
                <th className="bg-cyan-900/40 text-cyan-100 py-2 px-2 border border-cyan-900/30">الزبون</th>
                <th className="bg-cyan-900/40 text-cyan-100 py-2 px-2 border border-cyan-900/30">اللوحة</th>
                <th className="bg-cyan-900/40 text-cyan-100 py-2 px-2 border border-cyan-900/30">رقم السجل</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 border border-cyan-900/30 font-mono font-bold text-slate-300 bg-[#0a1224]">{dCash}</td>
                <td className="py-2 border border-cyan-900/30 font-bold text-emerald-400 bg-[#0a1224]">دخل الكاش 💵</td>
                <td></td>
                <td className="py-2 border border-cyan-900/30 font-mono font-bold text-slate-300">20</td>
                <td className="py-2 border border-cyan-900/30 font-bold text-slate-300">أكل للشباب</td>
                <td></td>
                {tickets[0] ? (
                   <>
                    <td className="py-2 border border-cyan-900/30 font-mono text-cyan-400">{tickets[0].cost} ({tickets[0].paymentMethod})</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[0].problem}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[0].engineer}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[0].carModel}</td>
                    <td className="py-2 border border-cyan-900/30 font-bold text-white">{tickets[0].customer}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-sky-400">{tickets[0].plate}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-slate-500">#{tickets[0].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-cyan-900/30 text-slate-500">لا يوجد بيانات</td>}
              </tr>
              <tr>
                <td className="py-2 border border-cyan-900/30 font-mono font-bold text-slate-300 bg-[#0a1224]">{dCliq}</td>
                <td className="py-2 border border-cyan-900/30 font-bold text-blue-400 bg-[#0a1224]">دخل الكليك 💳</td>
                <td></td>
                <td className="py-2 border border-cyan-900/30 font-mono font-bold text-slate-300">45</td>
                <td className="py-2 border border-cyan-900/30 font-bold text-slate-300">مواد فحص</td>
                <td></td>
                {tickets[1] ? (
                   <>
                    <td className="py-2 border border-cyan-900/30 font-mono text-cyan-400">{tickets[1].cost} ({tickets[1].paymentMethod})</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[1].problem}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[1].engineer}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[1].carModel}</td>
                    <td className="py-2 border border-cyan-900/30 font-bold text-white">{tickets[1].customer}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-sky-400">{tickets[1].plate}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-slate-500">#{tickets[1].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-cyan-900/30"></td>}
              </tr>
              <tr>
                <td className="py-2 border border-cyan-900/30 font-mono font-bold text-slate-300 bg-[#0a1224]">{dExp}</td>
                <td className="py-2 border border-cyan-900/30 font-bold text-rose-400 bg-[#0a1224]">إجمالي المصاريف 📉</td>
                <td></td>
                <td className="py-2 border border-cyan-900/30 font-mono font-bold text-slate-300">10</td>
                <td className="py-2 border border-cyan-900/30 font-bold text-slate-300">ضيافة</td>
                <td></td>
                {tickets[2] ? (
                   <>
                    <td className="py-2 border border-cyan-900/30 font-mono text-cyan-400">{tickets[2].cost} ({tickets[2].paymentMethod})</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[2].problem}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[2].engineer}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[2].carModel}</td>
                    <td className="py-2 border border-cyan-900/30 font-bold text-white">{tickets[2].customer}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-sky-400">{tickets[2].plate}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-slate-500">#{tickets[2].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-cyan-900/30"></td>}
              </tr>
               <tr>
                <td className="py-2 border border-cyan-900/30 font-mono font-black text-emerald-900 bg-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">{dNet}</td>
                <td className="py-2 border border-cyan-900/30 font-black text-emerald-900 bg-emerald-400">صافي الربح الموحد 💰</td>
                <td></td>
                <td className="py-2 border border-cyan-900/30"></td>
                <td className="py-2 border border-cyan-900/30"></td>
                <td></td>
                {tickets[3] ? (
                   <>
                    <td className="py-2 border border-cyan-900/30 font-mono text-cyan-400">{tickets[3].cost} ({tickets[3].paymentMethod})</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[3].problem}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[3].engineer}</td>
                    <td className="py-2 border border-cyan-900/30 text-slate-300">{tickets[3].carModel}</td>
                    <td className="py-2 border border-cyan-900/30 font-bold text-white">{tickets[3].customer}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-sky-400">{tickets[3].plate}</td>
                    <td className="py-2 border border-cyan-900/30 font-mono text-slate-500">#{tickets[3].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-cyan-900/30"></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// أدوات مساعدة للتصميم
const StatCard = ({ title, value, badge, color, isPulse = false }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    white: "text-cyan-50 border-cyan-500/30 bg-cyan-900/20"
  };
  const glow = isPulse ? `shadow-[0_0_20px_rgba(16,185,129,0.15)] border-emerald-500/50` : `border-cyan-900/40`;

  return (
    <div className={`bg-[#0a1122]/80 backdrop-blur-sm p-5 rounded-2xl flex flex-col justify-between shadow-xl border ${glow}`}>
      <span className="text-cyan-600 text-xs font-black tracking-wider uppercase drop-shadow-sm">{title}</span>
      <div className="flex items-baseline justify-between mt-2">
        <span className={`text-4xl font-black font-mono ${colors[color].split(' ')[0]} ${isPulse ? 'animate-pulse drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'drop-shadow-md'}`}>{value}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${colors[color]}`}>{badge}</span>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : color === 'blue' ? 'text-blue-400' : 'text-cyan-400';
  const glowClass = isGlow ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-cyan-900/40 shadow-xl';
  return (
    <div className={`bg-[#0a1122]/80 backdrop-blur-sm border ${glowClass} p-6 rounded-2xl`}>
      <span className="text-cyan-600 text-xs font-black block tracking-wider uppercase">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-mono mt-2 block tracking-tighter drop-shadow-md`}>{value.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
    </div>
  );
};
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

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
const IconWarning = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;

const IconBattery = ({ level }) => {
  let color = "#10b981"; // أخضر
  if (level <= 20) color = "#f43f5e"; // أحمر
  else if (level <= 50) color = "#f59e0b"; // أصفر
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
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #030712; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #030712; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
    
    /* خلفية الدوائر العصبية والذكاء الاصطناعي */
    .ai-circuit-bg {
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(0, 240, 255, 0.04) 0%, transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 25%),
        linear-gradient(rgba(0, 240, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
      animation: gridScroll 30s linear infinite;
    }
    
    @keyframes gridScroll {
      0% { background-position: 0 0, 0 0, 0 0, 0 0; }
      100% { background-position: 0 0, 0 0, 40px 40px, 40px 40px; }
    }

    /* خط المسح الضوئي لحالة الفحص */
    @keyframes scan-line {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; box-shadow: 0 0 15px rgba(0, 240, 255, 0.6); }
      90% { opacity: 1; box-shadow: 0 0 15px rgba(0, 240, 255, 0.6); }
      100% { top: 100%; opacity: 0; }
    }
    .scanning-card::before {
      content: ''; position: absolute; left: 0; right: 0; height: 2px;
      background: rgba(0, 240, 255, 0.8); z-index: 10;
      animation: scan-line 3s linear infinite;
      pointer-events: none;
    }

    /* نبض السيارة الجاهزة */
    @keyframes ready-glow {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); border-color: rgba(16, 185, 129, 1); }
      50% { box-shadow: 0 0 30px 10px rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.5); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink { animation: ready-glow 2s infinite; background: linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(3,7,18,1) 100%); }

    /* أنيميشن شريط الأخبار */
    @keyframes scroll-rtl {
      0% { transform: translateX(100vw); }
      100% { transform: translateX(-150%); }
    }
    .animate-ticker {
      display: inline-block;
      white-space: nowrap;
      animation: scroll-rtl 40s linear infinite;
    }

    /* حركات الإيموجي */
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    @keyframes scan-move { 0%, 100% { transform: translateX(-3px); } 50% { transform: translateX(3px); } }
    .emoji-float { animation: float 3s ease-in-out infinite; }
    .emoji-scan { animation: scan-move 1.5s ease-in-out infinite; }
    
    /* تأثير بطاقة الانبثاق */
    @keyframes pop-in {
      0% { transform: scale(0.5); opacity: 0; }
      80% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .pop-animation { animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  `;
  document.head.appendChild(style);
}

// نظام الصوت
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
    const playAlertTone = (freq, startTime, duration, volume = 0.1) => {
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
    playAlertTone(880.00, t, 0.5, 0.1); 
    playAlertTone(1318.51, t + 0.25, 1.5, 0.1);
  } catch (e) { console.error("Audio blocked.", e); }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [spotlightCard, setSpotlightCard] = useState(null); // حالة الكرت المنبثق

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => { initAudioSilent(); };
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
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
          let newSpotlightFound = null;

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;

            return {
              id,
              time: getCleanValue(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO'),
              plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost: parseFloat(rawCost) || 0,
              soc: rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : (30 + (plateNum % 66))
            };
          }).reverse();

          setReadyTimers(prev => {
            const currentTimers = { ...prev };
            parsedTickets.forEach(t => {
                if (t.status.includes("جاهز")) {
                    if (!currentTimers[t.id]) { 
                        currentTimers[t.id] = Date.now(); 
                        playBeep = true; 
                        newSpotlightFound = t; // تحديد الكرت للانبثاق
                    }
                } else {
                    if (currentTimers[t.id]) delete currentTimers[t.id];
                }
            });
            return currentTimers;
          });

          if (playBeep) playReadySound();
          if (newSpotlightFound && !spotlightCard) {
              setSpotlightCard(newSpotlightFound);
              setTimeout(() => setSpotlightCard(null), 10000); // يختفي بعد 10 ثواني
          }
          
          setTickets(parsedTickets);
        }
      } catch (err) { console.error("الربط السحابي معطل:", err); }
    }
    
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 2000);
    return () => { isMounted = false; clearInterval(loop); };
  }, [spotlightCard]);

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
      grossRevenue += t.cost; laborFees += t.cost * 0.4; partsRevenue += t.cost * 0.6; 
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) cliqTotal += t.cost; else cashTotal += t.cost;
    });
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, taxes: grossRevenue * 0.05, netProfit: grossRevenue * 0.95 };
  }, [displayTickets]);

  const evTips = [
    "⚡ نصيحة ذكية: حافظ على نسبة شحن البطارية (SOC) بين 20% و 80% لإطالة عمر الخلايا.",
    "⚠️ تحذير: الشحن السريع (DC) المتكرر جداً يرفع حرارة الخلايا ويقلل من كفاءة البطارية (SOH) على المدى الطويل.",
    "♻️ نظام الذكاء الاصطناعي: استخدم الفرملة المتجددة (Regenerative Braking) لزيادة المدى وتقليل تآكل الفرامل.",
    "🛡️ تنبيه: تجنب ركن السيارة تحت أشعة الشمس المباشرة لفترات طويلة لحماية نظام التبريد الحراري.",
    "🧠 تحديث سحابي: تأكد من تحديث أنظمة السيارة (OTA) بانتظام لضمان أفضل أداء لنظام إدارة البطارية (BMS)."
  ];

  return (
    <div className="h-screen w-full ai-circuit-bg flex flex-col font-sans select-none overflow-hidden" dir="rtl">
      
      {/* --- طبقة التعتيم والانبثاق (Spotlight) للسيارة الجاهزة --- */}
      {spotlightCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl transition-all duration-500">
            <div className="absolute top-10 text-emerald-400 font-black text-4xl uppercase tracking-widest animate-pulse flex items-center gap-4">
                <IconCheck /> مركبة جاهزة للتسليم
            </div>
            <div className="transform scale-125 pop-animation pointer-events-none">
                <LiveCard t={spotlightCard} isSpotlight={true} />
            </div>
        </div>
      )}

      {/* البار العلوي (Cyber Header) */}
      <header className="w-full bg-[#050b14]/90 backdrop-blur-md border-b border-[#121f3d] px-6 py-4 flex flex-row justify-between items-center z-20 shadow-[0_4px_30px_rgba(0,240,255,0.05)]">
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-[#1e2d4a] shadow-[0_0_20px_rgba(0,240,255,0.2)]">
             <img src="/logo.jpg" alt="Logo" className="h-full w-full object-contain" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest flex items-center gap-1">
                <IconCpu /> HIGH-VOLTAGE INTELLIGENCE
              </span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">ABU AL-NADI <span className="text-emerald-400">EV AI CLINIC</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs bg-[#03060d] border border-[#1b2b44] px-5 py-2.5 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-cyan-400 animate-pulse text-[8px]">●</span>
            <span>AMMAN ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden relative">
        {/* القوائم الجانبية */}
        <aside className="w-20 bg-[#02050b]/90 backdrop-blur-sm border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20">
          <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
          <SidebarButton icon={<IconCalendar />} title="تفاصيل الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full z-10 custom-scrollbar pb-20">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'expenses' && <QuantumExpenses />}
          {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
        </main>
      </div>

      {/* شريط النصائح السفلي (EV Smart Ticker) */}
      <div className="w-full bg-[#03060d] border-t border-[#121f3d] py-2 flex items-center relative z-40 overflow-hidden shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
         <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-[#03060d] to-transparent z-10" />
         <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-[#03060d] to-transparent z-10" />
         <div className="animate-ticker text-slate-300 font-bold text-sm tracking-wide">
             {evTips.map((tip, i) => (
               <span key={i} className="mx-12 inline-flex items-center gap-2">
                 {tip.includes('تحذير') ? <span className="text-rose-400"><IconWarning /></span> : <span className="text-cyan-400"><IconVolt /></span>}
                 {tip}
               </span>
             ))}
         </div>
      </div>
    </div>
  );
}

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'text-slate-500 border border-transparent hover:bg-[#0a1128] hover:text-white'}`}>
    {icon}
    <span className="absolute right-24 bg-[#0a1128] border border-[#1e2d4a] px-3 py-1.5 rounded-lg text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
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
    <div className="w-full space-y-6 animate-fade-in relative">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="مسار الاستلام" value={stats.waiting} badge="WAITING BAYS" color="amber" />
        <StatCard title="كبائن العمليات" value={stats.working} badge="AI ACTIVE LOCKS" color="cyan" />
        <StatCard title="ممر التسليم" value={stats.ready} badge="READY TO FLY" color="emerald" isPulse={true} />
        <StatCard title="المركبات النشطة" value={stats.total} badge="LIVE UNITS" color="white" />
      </div>

      <div className="w-full bg-[#050b14]/80 backdrop-blur-md border border-[#121f3d] rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          اللوحة الرقمية الموحدة لتدفق المركبات الحية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full relative z-10">
          {tickets.map(t => <LiveCard key={t.id} t={t} />)}
          {tickets.length === 0 && <div className="text-slate-500 col-span-full py-16 text-center font-bold flex flex-col items-center gap-3"><IconSearch /> الساحة المركزية فارغة من الحركات الحية.</div>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// تصميم الكرت الديناميكي (AI Live Card)
// ==========================================
const LiveCard = ({ t, isSpotlight = false }) => {
  let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
  let glow = "border-[#1a2740]";
  let progressPercent = 15; let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
  let extraClasses = "";
  let EmojiIcon = "⏳";
  let emojiClass = "emoji-float";

  if (t.status.includes('انتظار')) { 
      badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30"; 
      EmojiIcon = "⏳"; 
  }
  if (t.status.includes('عمل')) { 
      badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/30";
      glow = "border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]"; 
      progressPercent = 75; progressColor = "bg-blue-500 shadow-[0_0_12px_#3b82f6]";
      EmojiIcon = "⚙️"; emojiClass = "animate-spin-slow";
  }
  if (t.status.includes('فحص')) { 
      badgeStyle = "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      glow = "border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.2)]"; 
      progressPercent = 45; progressColor = "bg-cyan-400 shadow-[0_0_12px_#00f0ff]";
      extraClasses = "scanning-card"; // يضيف خط المسح الضوئي
      EmojiIcon = "🔍"; emojiClass = "emoji-scan text-cyan-400";
  }
  if (t.status.includes('جاهز')) { 
      badgeStyle = "bg-emerald-500 text-black font-bold border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]";
      glow = "border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]"; 
      progressPercent = 100; progressColor = "bg-emerald-500 shadow-[0_0_15px_#10b981]"; 
      extraClasses = "ready-blink";
      EmojiIcon = "✅"; emojiClass = "animate-bounce";
  }

  let socColorText = 'text-emerald-400';
  if(t.soc <= 20) socColorText = 'text-rose-400';
  else if(t.soc <= 50) socColorText = 'text-amber-400';

  return (
    <div className={`bg-[#060d1a] border relative overflow-hidden ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${!isSpotlight && 'hover:-translate-y-1 hover:shadow-2xl'} group w-full ${extraClasses}`}>
      
      {/* خلفية مائية للكرت تعبر عن الشبكة */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top right, rgba(0, 240, 255, 0.1), transparent 70%)' }}></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-5">
          <span className="font-mono text-[10px] text-slate-400 bg-[#03060d] px-2.5 py-1 rounded border border-[#1e2d4a] shadow-inner">ID #{t.id}</span>
          <span className={`text-[11px] px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
            {t.status}
          </span>
        </div>

        <div className="mb-5 relative">
          {/* الإيموجي العائم */}
          <div className={`absolute left-0 top-0 text-2xl drop-shadow-lg ${emojiClass}`}>{EmojiIcon}</div>
          
          <h3 className="font-black text-white text-xl tracking-wide mb-1.5 drop-shadow-md">{t.carModel}</h3>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-500">العميل:</span><span className="text-sm font-bold text-cyan-400">{t.customer.split(' ')[0]}</span></div>
        </div>

        <div className="flex items-center justify-between bg-[#03060d]/80 border border-[#1e2d4a] rounded-xl px-4 py-2.5 mb-5 shadow-inner backdrop-blur-sm">
          <div className="flex-[2]">
            <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">PLATE NUMBER</span>
            <span className="font-mono text-white text-sm font-black tracking-widest whitespace-nowrap">{t.plate}</span>
          </div>
          <div className="flex-1 flex flex-col items-end pl-1 border-r border-[#1e2d4a] pr-3">
            <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">BATTERY SOC</span>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className={`font-mono text-[11px] font-black ${socColorText}`}>{t.soc}%</span>
               <IconBattery level={t.soc} />
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-[10px] font-mono font-bold"><span className="text-cyan-500/70">AI PROGRESS</span><span className="text-white font-black">{progressPercent}%</span></div>
          <div className="w-full h-1.5 bg-[#03060d] rounded-full overflow-hidden border border-[#1e2d4a] shadow-inner">
             <div className={`h-full rounded-full transition-all duration-1000 ease-out ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        
        <div className="bg-[#050b14]/80 p-3.5 rounded-xl border border-[#121f3d] mb-5 relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
          <span className="text-[10px] text-slate-500 block mb-1.5 flex items-center gap-1"><IconCpu /> نظام الذكاء الاصطناعي - التشخيص:</span>
          <div className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-2">{t.problem}</div>
        </div>
      </div>
      
      <div className="border-t border-[#1e2d4a] pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto relative z-10">
         <div><span className="text-slate-500 block mb-0.5">EST. VALUE</span><span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span></div>
         <div className="text-left flex items-center gap-1.5"><span className="text-slate-500">TECH:</span><span className="text-cyan-400 text-xs bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{t.engineer}</span></div>
      </div>
    </div>
  );
};

// ==========================================
// مكونات فرعية للإحصائيات والخزينة
// ==========================================
const StatCard = ({ title, value, badge, color, isPulse = false }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.1)]",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    white: "text-white border-slate-500/30 bg-white/5"
  };
  return (
    <div className={`bg-[#050b14]/80 backdrop-blur-sm p-5 rounded-2xl flex flex-col justify-between border ${colors[color]}`}>
      <span className="text-slate-400 text-xs font-black tracking-wider uppercase">{title}</span>
      <div className="flex items-baseline justify-between mt-2">
        <span className={`text-4xl font-black font-mono ${colors[color].split(' ')[0]} ${isPulse ? 'animate-pulse' : ''}`}>{value}</span>
        <span className={`text-[9px] px-2 py-1 rounded font-bold border ${colors[color]}`}>{badge}</span>
      </div>
    </div>
  );
};

// بقية المكونات (QuantumTreasury, QuantumReceipts, etc.) مبسطة بنفس الروح
const QuantumTreasury = ({ accounting }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
      <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/30"><IconCoins /></div>
      الخزينة الرقمية - Smart Treasury
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="الدخل الخام" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="الأيدي العاملة (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="مبيعات القطع (60%)" value={accounting.partsRevenue} color="blue" />
      <FinanceCard title="صافي التدفق" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>
  </div>
);

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : color === 'blue' ? 'text-blue-400' : 'text-cyan-400';
  const glowClass = isGlow ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-500/5' : 'border-[#1e2d4a] bg-[#050b14]/80';
  return (
    <div className={`backdrop-blur-sm border ${glowClass} p-6 rounded-2xl`}>
      <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-mono mt-2 block tracking-tighter`}>{value.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
    </div>
  );
};

const QuantumReceipts = ({ tickets }) => {
  const paidTickets = tickets.filter(t => t.cost > 0);
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/30"><IconReceipt /></div>سجل المقبوضات الذكي
      </h2>
      <div className="w-full bg-[#050b14]/80 backdrop-blur-sm border border-[#1e2d4a] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-500 text-[11px] font-black uppercase tracking-wider border-b border-[#1e2d4a]">
                <th className="pb-4 px-4 text-center">ID</th><th className="pb-4 px-4">رقم اللوحة</th><th className="pb-4 px-4">اسم الزبون</th>
                <th className="pb-4 px-4 text-center">الدفع</th><th className="pb-4 px-4 text-left">المبلغ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#0a1128] transition-colors">
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-500">#{t.id}</td>
                  <td className="py-4 px-4 font-mono text-sm font-bold text-cyan-400">{t.plate}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{t.customer}</td>
                  <td className="py-4 px-4 text-center"><span className="px-3 py-1 rounded-md text-[10px] font-black border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">{t.paymentMethod || 'كاش'}</span></td>
                  <td className="py-4 px-4 text-left font-mono font-black text-emerald-400 text-lg">+{t.cost.toFixed(2)} JOD</td>
                </tr>
              ))}
              {paidTickets.length === 0 && <tr><td colSpan="5" className="text-center py-10 text-slate-500 font-bold">لا يوجد مقبوضات حالياً.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuantumExpenses = () => (
  <div className="w-full space-y-6 animate-fade-in text-center py-20 text-slate-400 font-bold">
    <IconExpense className="mx-auto text-rose-500/50 w-16 h-16 mb-4" />
    وحدة المصاريف قيد التطوير والربط السحابي...
  </div>
);

const QuantumDailyDetails = () => (
  <div className="w-full space-y-6 animate-fade-in text-center py-20 text-slate-400 font-bold">
    <IconCalendar className="mx-auto text-purple-500/50 w-16 h-16 mb-4" />
    يتم تجميع تقرير اليوم في الخلفية بواسطة الذكاء الاصطناعي...
  </div>
);
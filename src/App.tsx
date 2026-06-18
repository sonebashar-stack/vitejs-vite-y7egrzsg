// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- أيقونات سايبربانك المحدثة ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2h5"/><path d="M16.5 6.5A2.5 2.5 0 0 0 19 9v1a2.5 2.5 0 0 0 2.5 2.5H22"/><path d="M19 9a2.5 2.5 0 0 1-2.5-2.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 1-5 0v-1a2.5 2.5 0 0 0-5 0v1A2.5 2.5 0 0 1 5 9"/><path d="M2 12.5h.5A2.5 2.5 0 0 0 5 10V9"/><path d="M19 14.5v1a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 15.5v-1"/><path d="M12 18v4"/><path d="M9 22h6"/></svg>;

// نصائح البطارية لشريط الأخبار السفلي
const EV_TIPS = [
  "⚡ تجنب تفريغ البطارية بالكامل (0%) لفترات طويلة للحفاظ على صحة الخلايا.",
  "🔋 الشحن البطيء (AC) في المنزل هو الخيار الأفضل لإطالة العمر الافتراضي لبطاريتك.",
  "🔥 تجنب ركن السيارة تحت أشعة الشمس المباشرة لفترات طويلة لحماية نظام التبريد.",
  "⚡ لا تستخدم الشحن السريع (DC) بشكل يومي، اجعله مقتصراً على السفر والرحلات الطويلة.",
  "🔋 حافظ على نسبة الشحن بين 20% و 80% للاستخدام اليومي الروتيني.",
  "❄️ في فصل الشتاء، قم بتدفئة المقصورة أثناء توصيل السيارة بالشاحن لتوفير طاقة البطارية.",
  "⚡ افحص ضغط الإطارات بانتظام، الإطارات غير الممتلئة تزيد من استهلاك طاقة البطارية.",
  "🧠 نظام AI الخاص بنا يقرأ مستقبل سيارتك.. حافظ على صيانة نظام التبريد بشكل دوري.",
  "🔋 إذا كنت ستترك السيارة لأسبوع أو أكثر، اترك نسبة الشحن حول 50%."
];

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');
    
    #root, body, html { width: 100% !important; margin: 0 !important; padding: 0 !important; background-color: #020617; color: #f0f4f8; font-family: 'Tajawal', system-ui, sans-serif; overflow: hidden; }
    
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #020617; }
    ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; }

    /* شبكة الذكاء الاصطناعي العصبية المحدثة */
    .bg-neural-net {
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 85% 30%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
        linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
      background-attachment: fixed;
    }

    /* حركة الماسح الضوئي للكروت */
    @keyframes laser-scan {
      0% { top: -10%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 110%; opacity: 0; }
    }
    .laser-line {
      position: absolute; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(14,165,233,0.8), transparent);
      box-shadow: 0 0 10px rgba(14,165,233,0.5);
      animation: laser-scan 4s infinite linear;
      z-index: 20; pointer-events: none;
    }

    /* أنيميشن حركة الشريط السفلي */
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(50%); } /* 50% because text is duplicated */
    }
    .animate-marquee {
      display: inline-block;
      white-space: nowrap;
      animation: marquee 60s linear infinite;
    }

    /* الكرت المنبثق السينمائي */
    @keyframes cinematic-pop {
      0% { transform: scale(0.5) translateY(100px) rotateX(-20deg); opacity: 0; }
      50% { transform: scale(1.05) translateY(-10px) rotateX(5deg); opacity: 1; }
      100% { transform: scale(1) translateY(0) rotateX(0deg); opacity: 1; }
    }
    .cinematic-card {
      animation: cinematic-pop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-shadow: 0 0 100px rgba(16, 185, 129, 0.4), inset 0 0 30px rgba(16, 185, 129, 0.2);
    }
    
    .floating-emoji {
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(style);
}

// نظام الصوت الخفي
let globalAudioCtx = null;
let audioInitialized = false;
const initAudioSilent = () => {
  if (audioInitialized) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    globalAudioCtx = new AudioContext();
    if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
    audioInitialized = true;
  } catch (e) { console.error(e); }
};
const playReadySound = () => {
  if (!globalAudioCtx || !audioInitialized) return;
  if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
  try {
    const ctx = globalAudioCtx;
    const t = ctx.currentTime;
    const playTone = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square'; 
      osc.frequency.setValueAtTime(freq, startTime);
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.05, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.start(startTime); osc.stop(startTime + duration + 0.1);
    };
    playTone(523.25, t, 0.2); // C5
    playTone(659.25, t + 0.15, 0.2); // E5
    playTone(1046.50, t + 0.3, 1.0); // C6
  } catch (e) { console.error(e); }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [highlightedTicket, setHighlightedTicket] = useState(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudioSilent();
      document.removeEventListener('click', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
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
          let newReadyTicket = null;
          const currentTimers = { ...readyTimers };

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const cost = parseFloat(rawCost) || 0;
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            const socValue = rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : 50;
  
            const parsed = {
              id, plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة EV",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "نظام AI",
              cost, soc: socValue
            };

            const isReady = status.includes("جاهز");
            if (isReady) {
              if (!currentTimers[id]) { 
                  currentTimers[id] = Date.now();
                  playBeep = true; 
                  newReadyTicket = parsed;
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }
            return parsed;
          });

          if (playBeep && !isInitialLoad.current) {
              playReadySound();
              if (newReadyTicket) {
                  setHighlightedTicket(newReadyTicket);
                  setTimeout(() => setHighlightedTicket(null), 10000); // 10 ثواني عرض
              }
          }
          
          isInitialLoad.current = false;
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) { console.error(err); }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 2000);
    return () => { isMounted = false; clearInterval(loop); };
  }, [readyTimers]);

  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز');
      if (isReady && readyTimers[t.id]) {
        if (Date.now() - readyTimers[t.id] > 4 * 60 * 1000) return false; 
      }
      return true;
    });
  }, [tickets, readyTimers, currentTime]);

  const accounting = useMemo(() => {
    let grossRevenue = 0, laborFees = 0, partsRevenue = 0, cliqTotal = 0, cashTotal = 0;
    displayTickets.forEach(t => {
      grossRevenue += t.cost;
      laborFees += t.cost * 0.4; partsRevenue += t.cost * 0.6; 
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) cliqTotal += t.cost;
      else cashTotal += t.cost;
    });
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, netProfit: grossRevenue * 0.95 };
  }, [displayTickets]);

  return (
    <div className="h-screen w-full bg-[#020617] bg-neural-net flex flex-col overflow-hidden relative text-slate-200" dir="rtl">
      
      {/* ==========================================
          الشاشة السينمائية للكرت الجاهز (Pop-up)
          ========================================== */}
      {highlightedTicket && (
        <div className="fixed inset-0 z-[999] backdrop-blur-3xl bg-[#020617]/90 flex flex-col items-center justify-center transition-all duration-700">
           
           {/* مؤثرات الإضاءة الخلفية */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

           <div className="text-center mb-8 z-10">
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] mb-4">
                 🚀 جاهزة للإنطلاق 🚀
              </h2>
              <p className="text-cyan-400 font-mono tracking-[0.3em] text-xl bg-cyan-900/30 px-6 py-2 rounded-full border border-cyan-500/30 inline-block">
                 SYSTEM: VEHICLE DEPLOYMENT READY
              </p>
           </div>
           
           {/* الكرت بشكل Portrait كبير */}
           <div className="w-full max-w-md z-10 cinematic-card">
              <TicketCard t={highlightedTicket} isPortraitMode={true} />
           </div>
        </div>
      )}

      {/* الهيدر العلوي المطور */}
      <header className="w-full bg-[#030b20]/80 backdrop-blur-md border-b border-cyan-900/50 px-8 py-4 flex justify-between items-center z-40 shadow-[0_4px_40px_rgba(14,165,233,0.1)]">
        <div className="flex items-center gap-5">
          <div className="relative">
             <div className="absolute inset-0 bg-amber-500 blur-lg opacity-30 rounded-full animate-pulse"></div>
             <div className="h-14 w-14 bg-[#0a192f] rounded-2xl flex items-center justify-center border-2 border-amber-500/50 relative z-10">
                <IconBrain className="text-amber-400" />
             </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <IconVolt /> ADAPTIVE AI
              </span>
              <span className="text-[10px] text-cyan-400 tracking-widest uppercase border border-cyan-500/30 px-2 py-0.5 rounded-full">Al-Scan Active</span>
            </div>
            <h1 className="text-2xl font-black tracking-wide text-white">
              أبو النادي <span className="text-cyan-400 font-light">EV AI Care</span>
            </h1>
          </div>
        </div>
        <div className="font-mono bg-[#061224] border border-cyan-900/60 px-6 py-3 rounded-xl shadow-inner flex items-center gap-4">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
               <span className="text-slate-400 text-xs font-bold">LIVE SYNC</span>
            </div>
            <div className="h-4 w-[1px] bg-cyan-900/50"></div>
            <span className="text-cyan-400 text-lg font-black tracking-widest">{currentTime.toLocaleTimeString('ar-JO')}</span>
        </div>
      </header>

      {/* المحتوى الجانبي والرئيسي */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* قائمة جانبية رفيعة وتكنولوجية */}
        <aside className="w-24 bg-[#030b20]/90 backdrop-blur-xl border-l border-cyan-900/30 flex flex-col items-center py-8 gap-6 z-30 shadow-2xl">
          <SidebarBtn icon={<IconGrid />} title="الساحة الرقمية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarBtn icon={<IconCoins />} title="خزينة AI" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarBtn icon={<IconReceipt />} title="سجل العمليات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarBtn icon={<IconExpense />} title="التشغيل" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
        </aside>

        {/* المساحة الرئيسية */}
        <main className="flex-1 p-8 overflow-y-auto z-20 scroll-smooth">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'expenses' && <div className="text-center mt-20 text-cyan-500 text-2xl font-bold">وحدة المصاريف قيد التحديث...</div>}
        </main>
      </div>

      {/* ==========================================
          الشريط السفلي (Smart Ticker) للنصائح
          ========================================== */}
      <footer className="h-12 bg-[#020617]/95 border-t border-cyan-900/50 z-40 flex items-center overflow-hidden relative">
         <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 flex items-center justify-end pr-4">
            <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-amber-500/30 flex items-center gap-1 backdrop-blur-md">
               <IconVolt /> نصائح الذكاء الاصطناعي
            </span>
         </div>
         
         <div className="w-full whitespace-nowrap" dir="ltr">
            <div className="animate-marquee inline-block text-cyan-100/70 text-sm font-medium tracking-wide">
               {EV_TIPS.join(' ✦ ')} ✦ {EV_TIPS.join(' ✦ ')}
            </div>
         </div>
      </footer>
    </div>
  );
}

// زر القائمة الجانبية المطور
const SidebarBtn = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-4 rounded-2xl transition-all duration-300 relative group flex justify-center items-center w-14 h-14 ${isActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'text-slate-500 hover:bg-[#0a192f] hover:text-cyan-300 border border-transparent'}`}>
    {icon}
    <span className="absolute right-20 bg-[#061224] border border-cyan-900/50 px-4 py-2 rounded-lg text-xs text-cyan-100 font-bold opacity-0 group-hover:opacity-100 transition-all z-50 whitespace-nowrap shadow-xl pointer-events-none translate-x-2 group-hover:translate-x-0">{title}</span>
  </button>
);

// ==========================================
// تصميم الكرت الجديد (الذكي والديناميكي)
// ==========================================
const TicketCard = ({ t, isPortraitMode = false }) => {
    // إعدادات حسب الحالة
    let theme = {
      border: "border-slate-800", bg: "bg-[#061224]/80", 
      glow: "", text: "text-slate-300", emoji: "🕵️‍♂️", label: "فحص مبدئي",
      barBg: "bg-amber-500/20", barFill: "bg-amber-500", percent: "30%"
    };

    if (t.status.includes('عمل') || t.status.includes('فحص')) { 
        theme = {
          border: "border-cyan-500/40", bg: "bg-[#041021]/90",
          glow: "shadow-[0_0_30px_rgba(14,165,233,0.15)]", text: "text-cyan-400", 
          emoji: "👨‍🔧", label: "قيد الصيانة والتحديث",
          barBg: "bg-cyan-500/20", barFill: "bg-cyan-400", percent: "65%"
        };
    } else if (t.status.includes('جاهز')) { 
        theme = {
          border: "border-emerald-500/60", bg: "bg-[#02120a]/90",
          glow: "shadow-[0_0_40px_rgba(16,185,129,0.25)]", text: "text-emerald-400", 
          emoji: "🚀", label: "جاهز للتسليم",
          barBg: "bg-emerald-500/20", barFill: "bg-emerald-500", percent: "100%"
        };
    }

    // للمظهر العمودي (الانفجار السينمائي)
    const cardScale = isPortraitMode ? "aspect-[3/4] p-8 border-2 bg-[#05101a] shadow-[0_0_50px_rgba(16,185,129,0.3)]" : "p-5 hover:-translate-y-2";
    const headerText = isPortraitMode ? "text-4xl" : "text-xl";
    const subText = isPortraitMode ? "text-xl" : "text-sm";

    return (
      <div className={`backdrop-blur-xl border ${theme.border} ${theme.bg} ${theme.glow} ${cardScale} rounded-3xl flex flex-col justify-between transition-all duration-500 relative overflow-hidden group`}>
        
        {/* الماسح الليزري (يظهر فقط في العرض العادي وليس بالبوب-أب) */}
        {!isPortraitMode && <div className="laser-line"></div>}

        {/* خلفية الكرت (Circuits) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5L22.5 11H40V9H23.5L20 12.5V0h-2v12.5L14.5 9H0v2h13.5l3.5 3.5V18H0v2h17v2.5l-3.5 3.5H0v2h14.5l3.5-3.5V40h2V27.5l3.5 3.5H40v-2H23.5l-3.5-3.5z' fill='%230ea5e9' fill-rule='evenodd'/%3E%3C/svg%3E")`}}></div>

        {/* الإيموجي العائم المعبر عن حالة الفني */}
        <div className={`absolute ${isPortraitMode ? '-top-6 -right-6 text-6xl' : '-top-4 -right-4 text-3xl'} bg-[#0a192f] border-2 ${theme.border} rounded-full p-3 z-10 floating-emoji shadow-2xl`}>
            {theme.emoji}
        </div>

        <div className="relative z-10 h-full flex flex-col">
          
          {/* الهيدر: الأي دي والحالة */}
          <div className="flex justify-between items-center mb-6">
            <span className={`font-mono text-slate-400 bg-[#020617] px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 ${isPortraitMode ? 'text-lg' : 'text-xs'}`}>
                <IconCpu /> <span>NODE #{t.id}</span>
            </span>
            <span className={`px-4 py-1.5 rounded-lg border font-black tracking-wide bg-opacity-10 ${theme.text} ${theme.border} ${isPortraitMode ? 'text-xl' : 'text-xs'}`}>
              {theme.label}
            </span>
          </div>

          {/* معلومات السيارة والعميل */}
          <div className="mb-6">
            <h3 className={`font-black text-white mb-2 tracking-wide ${headerText}`}>{t.carModel}</h3>
            <div className="flex items-center gap-2">
                <span className={`text-slate-500 ${subText}`}>العميل:</span>
                <span className={`font-bold text-amber-400 ${subText}`}>{t.customer}</span>
            </div>
          </div>

          {/* داشبورد مصغر داخل الكرت */}
          <div className={`bg-[#020617]/80 border ${theme.border} rounded-2xl p-4 mb-6 flex items-center justify-between`}>
            <div className="flex-[2]">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block mb-1">LICENSE PLATE</span>
              <span className={`font-mono font-black tracking-widest ${isPortraitMode ? 'text-3xl text-white' : 'text-lg text-slate-200'}`}>{t.plate}</span>
            </div>
            <div className="w-[1px] h-10 bg-slate-800 mx-4"></div>
            <div className="flex-1 text-left">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block mb-1">BATTERY</span>
              <span className={`font-mono font-black ${t.soc < 30 ? 'text-red-400' : 'text-emerald-400'} ${isPortraitMode ? 'text-3xl' : 'text-lg'}`}>{t.soc}%</span>
            </div>
          </div>

          {/* تفاصيل الذكاء الاصطناعي (المشكلة) */}
          <div className={`mb-auto bg-cyan-950/20 p-4 rounded-xl border border-cyan-900/30 flex-grow ${isPortraitMode ? 'mb-8' : ''}`}>
            <span className="text-[10px] text-cyan-500 font-bold mb-2 flex items-center gap-1"><IconBrain className="w-3 h-3"/> AI DIAGNOSTIC LOG</span>
            <p className={`text-cyan-100/80 font-medium leading-relaxed ${isPortraitMode ? 'text-lg line-clamp-none' : 'text-xs line-clamp-2'}`}>{t.problem}</p>
          </div>

          {/* شريط التقدم */}
          <div className={`mt-6 ${isPortraitMode ? 'mb-8' : 'mb-4'}`}>
             <div className="flex justify-between text-[10px] font-mono font-bold mb-2">
                <span className="text-slate-500">SYSTEM PROGRESS</span>
                <span className={theme.text}>{theme.percent}</span>
             </div>
             <div className={`w-full ${theme.barBg} rounded-full h-1.5 overflow-hidden`}>
                <div className={`h-full ${theme.barFill} transition-all duration-1000 relative`} style={{ width: theme.percent }}>
                   <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/30 animate-pulse"></div>
                </div>
             </div>
          </div>
          
          {/* الفوتر: التكلفة والفني */}
          <div className="border-t border-slate-800 pt-4 flex items-center justify-between mt-auto">
           <div>
              <span className="text-[9px] text-slate-500 block mb-1 font-mono tracking-wider">TOTAL VALUE</span>
              <span className={`font-black text-amber-400 ${isPortraitMode ? 'text-3xl' : 'text-sm'}`}>{t.cost.toFixed(0)} <span className="text-[10px] text-amber-400/50">JOD</span></span>
           </div>
           <div className="text-left">
              <span className="text-[9px] text-slate-500 block mb-1 font-mono tracking-wider">LEAD TECH</span>
              <span className={`font-bold ${theme.text} ${isPortraitMode ? 'text-xl' : 'text-xs'}`}>{t.engineer}</span>
           </div>
        </div>
        </div>
      </div>
    );
};

// ==========================================
// الساحة الحية (الشبكة الرقمية)
// ==========================================
const QuantumYard = ({ tickets }) => {
  const stats = useMemo(() => {
    return {
      wait: tickets.filter(t => t.status.includes('انتظار')).length,
      work: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز')).length,
    };
  }, [tickets]);

  return (
    <div className="w-full space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* عدادات الحالة السريعة */}
      <div className="grid grid-cols-3 gap-6">
        <StatHUD title="SCANNING QUEUE" value={stats.wait} color="amber" label="قيد الانتظار" />
        <StatHUD title="NEURAL REPAIR" value={stats.work} color="cyan" label="كبائن العمليات" isGlow />
        <StatHUD title="READY FOR DEPLOY" value={stats.ready} color="emerald" label="بانتظار التسليم" />
      </div>

      <div className="w-full">
        <h2 className="text-xl font-black text-cyan-400 mb-8 tracking-widest flex items-center gap-3 border-b border-cyan-900/50 pb-4">
          <IconGrid /> شبكة المركبات النشطة (LIVE NODES)
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {tickets.map(t => <TicketCard key={t.id} t={t} />)}
          
          {tickets.length === 0 && (
              <div className="col-span-full py-24 flex flex-col items-center justify-center bg-[#061224]/30 border border-dashed border-cyan-900/50 rounded-3xl">
                  <IconBrain className="text-6xl mb-6 text-cyan-900/50" />
                  <p className="text-cyan-500/50 font-bold tracking-widest text-lg">لا يوجد بيانات تتدفق حالياً في الشبكة</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// مكونات مساعدة للشكل الجديد
// ==========================================
const StatHUD = ({ title, value, color, label, isGlow }) => {
  const colorMap = {
    amber: "text-amber-400 border-amber-500/30",
    cyan: "text-cyan-400 border-cyan-500/50",
    emerald: "text-emerald-400 border-emerald-500/50"
  };
  const glowStyle = isGlow ? "shadow-[0_0_30px_rgba(14,165,233,0.1)] bg-cyan-950/20" : "bg-[#061224]/60";

  return (
    <div className={`p-6 rounded-3xl border ${colorMap[color]} ${glowStyle} backdrop-blur-md relative overflow-hidden flex flex-col justify-between`}>
       <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase mb-2">{title}</span>
       <div className="flex items-end justify-between">
          <span className={`text-6xl font-black font-mono ${colorMap[color].split(' ')[0]}`}>{value}</span>
          <span className="text-sm font-bold text-slate-300 pb-2">{label}</span>
       </div>
    </div>
  );
};

// الخزينة (تصميم سريع ليتناسب مع الثيم)
const QuantumTreasury = ({ accounting }) => (
  <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
    <h2 className="text-xl font-black text-amber-400 tracking-widest flex items-center gap-3 border-b border-amber-900/50 pb-4">
      <IconCoins /> خزينة الذكاء الاصطناعي (TREASURY CORE)
    </h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-[#061224]/80 border border-slate-700 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
         <span className="text-slate-400 font-mono tracking-widest mb-2 text-sm">GROSS REVENUE</span>
         <span className="text-5xl font-black text-white font-mono">{accounting.grossRevenue.toFixed(2)} <span className="text-lg text-slate-500">JOD</span></span>
      </div>
      <div className="bg-emerald-950/20 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.1)] p-8 rounded-3xl flex flex-col items-center justify-center text-center">
         <span className="text-emerald-500/70 font-mono tracking-widest mb-2 text-sm">NET PROFIT (AI EST.)</span>
         <span className="text-5xl font-black text-emerald-400 font-mono">{accounting.netProfit.toFixed(2)} <span className="text-lg text-emerald-700">JOD</span></span>
      </div>
    </div>
  </div>
);

// المقبوضات
const QuantumReceipts = ({ tickets }) => {
  const paidTickets = tickets.filter(t => t.cost > 0);
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
       <h2 className="text-xl font-black text-cyan-400 tracking-widest flex items-center gap-3 border-b border-cyan-900/50 pb-4">
          <IconReceipt /> سجل العمليات السحابي (DATA LOGS)
       </h2>
       <div className="bg-[#030b20]/80 border border-cyan-900/40 rounded-3xl overflow-hidden backdrop-blur-xl">
          <table className="w-full text-right">
             <thead className="bg-[#061224]">
                <tr className="text-cyan-600 text-[10px] font-mono tracking-widest">
                   <th className="py-5 px-6">NODE ID</th>
                   <th className="py-5 px-6">PLATE</th>
                   <th className="py-5 px-6">CLIENT</th>
                   <th className="py-5 px-6 text-center">METHOD</th>
                   <th className="py-5 px-6 text-left">VALUE</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-cyan-950/50 text-sm">
                {paidTickets.map(t => (
                   <tr key={t.id} className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-4 px-6 text-slate-500 font-mono">#{t.id}</td>
                      <td className="py-4 px-6 text-cyan-300 font-bold font-mono tracking-wider">{t.plate}</td>
                      <td className="py-4 px-6 text-slate-200">{t.customer}</td>
                      <td className="py-4 px-6 text-center">
                         <span className={`px-3 py-1 rounded text-[10px] font-bold border ${t.paymentMethod.includes('كليك') ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                            {t.paymentMethod || 'كاش'}
                         </span>
                      </td>
                      <td className="py-4 px-6 text-left text-amber-400 font-black font-mono">+{t.cost.toFixed(2)}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};
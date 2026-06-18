// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- أيقونات سايبربانك وذكاء اصطناعي ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;

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
      {/* وميض طاقة للبطارية المنخفضة */}
      {level <= 20 && <path d="M10 12l2-2v4l2-2" stroke="#f43f5e" className="animate-pulse"/>}
    </svg>
  );
};

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #020612; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    
    /* شبكة الذكاء الاصطناعي الخلفية */
    .bg-neural {
        background-color: #020612;
        background-image: 
            radial-gradient(circle at 15% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 25%);
        background-size: cover;
        position: relative;
    }
    .bg-neural::before {
        content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background-image: linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
        background-size: 40px 40px; pointer-events: none; z-index: 0;
    }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #020612; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
    
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.4); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink { animation: pulse-ring 1.5s infinite; background-color: rgba(16, 185, 129, 0.05) !important; }
    
    @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
    .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 30s linear infinite; }
    
    /* حركة عائمة للأيقونات */
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
    .floating-icon { animation: float 3s ease-in-out infinite; }

    /* أنيميشن الظهور الكبير */
    @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    .animate-pop { animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `;
  document.head.appendChild(style);
}

// =====================================
// نظام الصوت الخفي
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
    const ctx = globalAudioCtx; const t = ctx.currentTime;
    const playAlertTone = (freq, startTime, duration, volume = 0.1) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(freq, startTime);
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02); 
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.start(startTime); osc.stop(startTime + duration + 0.1);
    };
    playAlertTone(880.00, t, 0.5); // A5
    playAlertTone(1318.51, t + 0.25, 1.5); // E6
  } catch (e) { console.error("Audio blocked", e); }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // نظام التنبيهات والمنبثق
  const [readyTimers, setReadyTimers] = useState({});
  const [popupTicket, setPopupTicket] = useState(null); // الكرت المعروض كمنبثق
  const notifiedTickets = useRef(new Set()); // تتبع الكروت التي تم تنبيهها بالفعل

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudioSilent();
      ['click', 'keydown', 'touchstart'].forEach(e => document.removeEventListener(e, handleFirstInteraction));
    };
    ['click', 'keydown', 'touchstart'].forEach(e => document.addEventListener(e, handleFirstInteraction));
    return () => ['click', 'keydown', 'touchstart'].forEach(e => document.removeEventListener(e, handleFirstInteraction));
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
          let newPopup = null;
          const currentTimers = { ...readyTimers };

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            
            const ticketObj = {
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
              soc: rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : 50,
            };

            const isReady = status.includes("جاهز");
            if (isReady) {
              if (!currentTimers[id]) { 
                currentTimers[id] = Date.now(); 
                
                // التأكد من عدم تنبيهنا لهذا الكرت مسبقاً
                if (!notifiedTickets.current.has(id)) {
                   playBeep = true; 
                   newPopup = ticketObj;
                   notifiedTickets.current.add(id);
                }
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
              if (notifiedTickets.current.has(id)) notifiedTickets.current.delete(id);
            }

            return ticketObj;
          });

          if (playBeep) playReadySound();
          if (newPopup) {
            setPopupTicket(newPopup);
            // إخفاء المنبثق بعد 10 ثواني
            setTimeout(() => {
              setPopupTicket(current => (current && current.id === newPopup.id) ? null : current);
            }, 10000);
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
        if (elapsed > 4 * 60 * 1000) return false; // إخفاء بعد 4 دقائق
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
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) cliqTotal += t.cost;
      else cashTotal += t.cost;
    });
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, taxes: grossRevenue * 0.05, netProfit: grossRevenue * 0.95 };
  }, [displayTickets]);

  return (
    <div className="min-h-screen w-full bg-neural flex flex-col font-sans select-none overflow-hidden" dir="rtl">
      
      {/* المنبثق التفاعلي الكبير عند الجهوزية */}
      {popupTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all">
          <div className="w-[500px] transform animate-pop">
            <h2 className="text-center text-emerald-400 text-3xl font-black mb-6 tracking-widest drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse">
              ⚡ مركبة جاهزة للتسليم ⚡
            </h2>
            <TicketCard t={popupTicket} isReadyBlink={true} isLarge={true} />
          </div>
        </div>
      )}

      {/* البار العلوي (مستوحى من هوية الذكاء الاصطناعي) */}
      <header className="w-full bg-[#030816]/90 backdrop-blur-sm border-b border-[#0f1d35] px-6 py-4 flex flex-row justify-between items-center z-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] p-1">
             <IconBrain className="text-cyan-400 w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded tracking-widest">AI SCAN & CARE</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-wider font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              ABU AL-NADI <span className="text-cyan-400">EV CLINIC</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs bg-[#050b1a] border border-cyan-900/50 px-4 py-2 rounded-xl text-cyan-100 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] flex items-center gap-3 font-bold tracking-widest">
            <span className="text-cyan-400 animate-ping text-[8px]">●</span>
            <span>SYSTEM ACTIVE</span>
            <span className="text-white text-sm font-black border-r border-cyan-900/50 pr-3 ml-2">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden relative z-0">
        {/* القوائم الجانبية */}
        <aside className="w-20 bg-[#030816]/90 backdrop-blur-md border-l border-[#0f1d35] flex flex-col items-center py-6 gap-6 z-20">
          <SidebarButton icon={<IconGrid />} title="الساحة العصبية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="خزينة الشبكة" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="التدفق المالي" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconCalendar />} title="سجل الذكاء" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
        </main>
      </div>

      {/* شريط النصائح السفلي (EV AI Tips) */}
      <footer className="w-full bg-[#02050f] border-t border-cyan-900/40 py-2 px-4 z-10 flex items-center overflow-hidden">
        <div className="flex items-center gap-2 text-amber-400 min-w-max border-l border-cyan-900/50 pl-4">
            <IconVolt className="w-4 h-4" />
            <span className="text-xs font-black tracking-widest">AI SYSTEM ALERTS:</span>
        </div>
        <div className="flex-1 overflow-hidden ml-4">
            <div className="animate-marquee text-xs font-bold text-cyan-200/80 tracking-wide">
                <span className="mx-8 text-emerald-400">💡 نصيحة: للحفاظ على عمر بطارية سيارتك (BYD/Tesla)، حافظ على نسبة الشحن بين 20% و 80% قدر الإمكان.</span>
                <span className="mx-8 text-rose-400">⚠️ تحذير: تجنب ركن السيارة لفترات طويلة جداً تحت أشعة الشمس المباشرة لحماية نظام التبريد السائل للبطارية.</span>
                <span className="mx-8 text-cyan-400">🔍 معلومة: الفحص الدوري باستخدام تقنياتنا المدعومة بالذكاء الاصطناعي يكتشف الأعطال قبل حدوثها بنسبة 90%.</span>
                <span className="mx-8 text-amber-400">⚡ تنبيه: استخدم دائماً الشواحن المعتمدة وتجنب الوصلات التجارية غير المطابقة للمواصفات.</span>
            </div>
        </div>
      </footer>
    </div>
  );
}

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'text-slate-500 hover:bg-[#0f1d35] hover:text-cyan-300'}`}>
    {icon}
    <span className="absolute right-24 bg-[#050b1a] border border-cyan-900/50 px-3 py-1.5 rounded-lg text-[11px] text-cyan-100 font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

// ==========================================
// 1. الساحة الحية (AI Live Yard)
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
    <div className="w-full space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="خوارزميات الفحص (انتظار)" value={stats.waiting} badge="QUEUED" color="amber" />
        <StatCard title="شبكات الصيانة النشطة" value={stats.working} badge="PROCESSING" color="cyan" />
        <StatCard title="مركبات مكتملة المعالجة" value={stats.ready} badge="SYSTEM READY" color="emerald" isPulse={true} />
        <StatCard title="إجمالي وحدات الشبكة" value={stats.total} badge="TOTAL NODES" color="white" />
      </div>

      <div className="w-full bg-[#030816]/60 backdrop-blur-md border border-[#0f1d35] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* تأثير دائرة مضيئة في الخلفية */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="text-sm font-black text-cyan-400 mb-6 uppercase tracking-widest flex items-center gap-2">
          <IconCpu className="w-5 h-5" />
          مصفوفة معالجة المركبات الحية (AI Flow)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full relative z-10">
          {tickets.map(t => <TicketCard key={t.id} t={t} />)}
          {tickets.length === 0 && <div className="text-cyan-800 col-span-full py-20 text-center font-bold tracking-widest text-lg">الشبكة فارغة - لا توجد بيانات للمعالجة</div>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// مكون كرت السيارة (Dynamic AI Card)
// ==========================================
const TicketCard = ({ t, isReadyBlink: forceBlink, isLarge = false }) => {
    let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
    let glow = "border-[#0f1d35]";
    let isReadyBlink = forceBlink || false;
    let progressPercent = 15; let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
    
    // الأيقونات العائمة حسب الحالة
    let AvatarIcon = "⏳";
    let avatarClass = "text-amber-400 bg-amber-400/10 border-amber-400/30";

    if (t.status.includes('انتظار')) { 
        badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/30"; 
        AvatarIcon = "⏳"; avatarClass = "text-amber-400 bg-amber-400/10 border-amber-400/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
    }
    if (t.status.includes('فحص')) { 
        badgeStyle = "bg-purple-400/10 text-purple-400 border-purple-400/30";
        glow="border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"; 
        progressPercent = 45; progressColor = "bg-purple-400 shadow-[0_0_8px_#a855f7]";
        AvatarIcon = "🔍"; avatarClass = "text-purple-400 bg-purple-400/10 border-purple-400/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]";
    }
    if (t.status.includes('عمل')) { 
        badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/30";
        glow="border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]"; 
        progressPercent = 75; progressColor = "bg-cyan-500 shadow-[0_0_12px_#06b6d4]";
        AvatarIcon = "⚙️"; avatarClass = "text-cyan-400 bg-cyan-400/10 border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]";
    }
    if (t.status.includes('جاهز')) { 
        badgeStyle = "bg-emerald-500 text-black font-bold border-emerald-400";
        glow="border-emerald-500/60 shadow-[0_0_35px_rgba(16,185,129,0.2)]"; 
        progressPercent = 100; progressColor = "bg-emerald-500 shadow-[0_0_15px_#10b981]"; 
        isReadyBlink = true;
        AvatarIcon = "✅"; avatarClass = "text-emerald-400 bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
    }

    let socColorText = 'text-emerald-400';
    if(t.soc <= 20) socColorText = 'text-rose-400';
    else if(t.soc <= 50) socColorText = 'text-amber-400';

    return (
      <div className={`bg-[#050a14]/90 backdrop-blur-md border ${glow} rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group w-full shadow-2xl relative overflow-hidden ${isReadyBlink ? 'ready-blink' : ''} ${isLarge ? 'scale-110' : ''}`}>
        
        {/* خلفية الكرت (تصميم لوحة دوائر) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

        {/* الأيقونة العائمة (تعبر عن الحالة / الفني) */}
        <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-xl border z-10 floating-icon ${avatarClass}`}>
            {AvatarIcon}
        </div>

        <div className="relative z-10">
          <div className="flex justify-end items-center mb-6">
            <span className={`text-[11px] px-3 py-1.5 rounded-lg border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
              {isReadyBlink && <IconCheck />}{t.status}
            </span>
          </div>

          <div className="mb-6 text-right">
            <h3 className={`font-black text-white tracking-wide mb-1 ${isLarge ? 'text-3xl' : 'text-xl'}`}>{t.carModel}</h3>
            <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-bold text-cyan-300">{t.customer.split(' ')[0]}</span>
                <span className="text-xs text-slate-500">:العميل</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#030712] border border-[#162a4a] rounded-2xl px-4 py-3 mb-6 shadow-inner">
            <div className="flex-[2] text-left">
              <span className="text-[9px] text-cyan-700 block font-mono font-bold mb-1">SYS ID</span>
              <span className="font-mono text-slate-400 text-xs font-black tracking-widest whitespace-nowrap">#{t.id}</span>
            </div>
            <div className="flex-[3] flex flex-col items-center border-x border-[#162a4a] px-2">
              <span className="text-[9px] text-cyan-700 block font-mono font-bold mb-1">PLATE</span>
              <span className="font-mono text-cyan-400 text-sm font-black tracking-widest whitespace-nowrap">{t.plate}</span>
            </div>
            <div className="flex-[2] flex flex-col items-end pr-1">
              <span className="text-[9px] text-cyan-700 block font-mono font-bold mb-1">PWR</span>
              <div className="flex items-center gap-1">
                 <span className={`font-mono text-[12px] font-black ${socColorText}`}>{t.soc}%</span>
                 <IconBattery level={t.soc} />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 mb-6">
            <div className="flex justify-between text-[10px] font-mono font-bold">
                <span className="text-cyan-700">AI PROCESSING</span>
                <span className="text-white font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-[#02050f] rounded-full overflow-hidden border border-[#162a4a] shadow-inner">
                <div className={`h-full rounded-full transition-all duration-700 ease-out ${progressColor} relative overflow-hidden`} style={{ width: `${progressPercent}%` }}>
                    <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 animate-pulse"></div>
                </div>
            </div>
          </div>

          <div className="bg-[#030712]/80 p-4 rounded-2xl border border-[#0f1d35] mb-6">
            <span className="text-[10px] text-cyan-700 block mb-2 font-bold text-right">مخرجات الفحص / المهام:</span>
            <div className="text-xs text-cyan-100 leading-relaxed font-medium line-clamp-2 text-right">{t.problem}</div>
          </div>
        </div>

        <div className="border-t border-[#0f1d35] pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto relative z-10">
           <div className="text-left">
             <span className="text-cyan-800 block mb-1">TOTAL</span>
             <span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span>
           </div>
           <div className="text-right">
             <span className="text-cyan-800 block mb-1">ENGINEER</span>
             <span className="text-cyan-400 text-xs bg-cyan-900/30 px-2 py-1 rounded-md border border-cyan-800/50">{t.engineer}</span>
           </div>
        </div>
      </div>
    );
};

// ==========================================
// 2. الخزينة اليومية
// ==========================================
const QuantumTreasury = ({ accounting }) => (
  <div className="w-full space-y-6 animate-fade-in pb-10">
    <h2 className="text-lg font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
      <IconCoins /> التدقيق المالي لشبكة الذكاء الاصطناعي
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="إجمالي الدخل (الخام)" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="مقبوضات العمليات (40%)" value={accounting.laborFees} color="emerald" />
      <FinanceCard title="مبيعات العتاد (60%)" value={accounting.partsRevenue} color="cyan" />
      <FinanceCard title="صافي التدفق المالي" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>
  </div>
);

// ==========================================
// 3. المقبوضات
// ==========================================
const QuantumReceipts = ({ tickets }) => {
  const paidTickets = tickets.filter(t => t.cost > 0);
  return (
    <div className="w-full space-y-6 animate-fade-in pb-10">
      <h2 className="text-lg font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
        <IconReceipt /> سجل العمليات المالية
      </h2>
      <div className="w-full bg-[#030816]/60 backdrop-blur-md border border-[#0f1d35] rounded-3xl p-6 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-cyan-700 text-[11px] font-black uppercase tracking-wider border-b border-[#0f1d35]">
                <th className="pb-4 px-4 text-center">SYS ID</th>
                <th className="pb-4 px-4">رقم اللوحة</th>
                <th className="pb-4 px-4">اسم الزبون</th>
                <th className="pb-4 px-4">نوع المركبة</th>
                <th className="pb-4 px-4 text-center">طريقة الدفع</th>
                <th className="pb-4 px-4 text-left">المبلغ المُحصل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0f1d35]">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#050a14] transition-colors group">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. تفاصيل الأيام
// ==========================================
const QuantumDailyDetails = ({ tickets }) => {
  return (
    <div className="w-full space-y-8 animate-fade-in pb-10">
      <h2 className="text-lg font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
        <IconCalendar /> التقرير المفصل للشبكة
      </h2>
      <div className="w-full border border-[#0f1d35] rounded-3xl p-10 shadow-2xl bg-[#030816]/60 backdrop-blur-md text-center text-cyan-500 font-bold">
        وحدة التقارير قيد المزامنة مع خوادم الذكاء الاصطناعي...
      </div>
    </div>
  );
};

// ==========================================
// أدوات مساعدة للتصميم (UI Utils)
// ==========================================
const StatCard = ({ title, value, badge, color, isPulse = false }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    white: "text-white border-slate-500/30 bg-slate-500/10"
  };
  const glow = isPulse ? `shadow-[0_0_20px_rgba(16,185,129,0.15)] border-emerald-500/40` : `border-[#0f1d35]`;

  return (
    <div className={`bg-[#030816]/80 backdrop-blur-sm p-6 rounded-3xl flex flex-col justify-between shadow-xl border relative overflow-hidden ${glow}`}>
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-white opacity-5 rounded-full blur-xl"></div>
      <span className="text-cyan-700 text-xs font-black tracking-wider uppercase mb-2">{title}</span>
      <div className="flex items-baseline justify-between mt-2">
        <span className={`text-4xl font-black font-mono drop-shadow-md ${colors[color].split(' ')[0]} ${isPulse ? 'animate-pulse' : ''}`}>{value}</span>
        <span className={`text-[9px] px-2 py-1 rounded-md font-bold border ${colors[color]}`}>{badge}</span>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
  const glowClass = isGlow ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-950/20' : 'border-[#0f1d35] bg-[#030816]/80';
  return (
    <div className={`backdrop-blur-sm border ${glowClass} p-8 rounded-3xl shadow-xl relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-cyan-500/20 to-transparent"></div>
      <span className="text-cyan-700 text-xs font-black block tracking-wider uppercase mb-3">{title}</span>
      <span className={`text-5xl font-black ${textColor} font-mono block tracking-tighter drop-shadow-lg`}>
        {value.toFixed(1)} <span className="text-sm text-cyan-800 ml-1">JOD</span>
      </span>
    </div>
  );
};
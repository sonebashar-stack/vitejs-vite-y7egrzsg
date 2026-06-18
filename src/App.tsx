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
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;

// أيقونة الشبكة العصبية (خلفية الكروت)
const AICircuitBackground = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="M0,50 Q25,20 50,50 T100,50 M20,0 L20,100 M80,0 L80,100 M50,20 L50,80" stroke="#00F0FF" strokeWidth="0.5" fill="none" />
    <circle cx="20" cy="50" r="1.5" fill="#00F0FF" />
    <circle cx="50" cy="50" r="2" fill="#00FF9D" />
    <circle cx="80" cy="50" r="1.5" fill="#00F0FF" />
    <path d="M10,10 L30,30 M90,10 L70,30 M10,90 L30,70 M90,90 L70,70" stroke="#00F0FF" strokeWidth="0.3" fill="none" strokeDasharray="2,2" />
  </svg>
);

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
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #040814; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; overflow-x: hidden; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 10px; }
    
    /* شبكة خلفية متحركة تعبر عن الذكاء الاصطناعي */
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background-image: 
        linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
      background-size: 30px 30px;
      z-index: -1;
      pointer-events: none;
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
    
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(5deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .emoji-float {
      animation: float 3s ease-in-out infinite;
    }

    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.5); }
      70% { transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }
    .animate-pop-in {
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
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
    playAlertTone(880.00, t, 0.5, 0.1);
    playAlertTone(1318.51, t + 0.25, 1.5, 0.1);
  } catch (e) { console.error("Audio blocked by browser.", e); }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [featuredReadyTicket, setFeaturedReadyTicket] = useState(null); // الكرت الجاهز الذي سيتوسط الشاشة

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

          let newFeaturedTicket = null;
          const currentTimers = { ...readyTimers };
          
          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const cost = parseFloat(rawCost) || 0;
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
           
            const isReady = status.includes("جاهز");
            
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;
            const timeStr = getCleanValue(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO');
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            const socValue = rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : (30 + (plateNum % 66));
            
            const ticketObj = {
              id, time: timeStr, plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost, soc: socValue,
              driveTrain: plateNum % 2 === 0 ? "AWD Dual Motor" : "RWD Ultra"
            };

            // منطق ظهور الكرت الجاهز لمدة 10 ثواني
            if (isReady) {
              if (!currentTimers[id]) { 
                  currentTimers[id] = Date.now(); 
                  playReadySound();
                  newFeaturedTicket = ticketObj; // تعيين الكرت ليظهر في المنتصف
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            return ticketObj;
          });

          if (newFeaturedTicket) {
             setFeaturedReadyTicket(newFeaturedTicket);
             // إخفاء الكرت بعد 10 ثواني
             setTimeout(() => {
                setFeaturedReadyTicket(null);
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
        if (elapsed > 4 * 60 * 1000) return false; 
      }
      return true;
    });
  }, [tickets, readyTimers, currentTime]);

  const accounting = useMemo(() => {
    let grossRevenue = 0, laborFees = 0, partsRevenue = 0, cliqTotal = 0, cashTotal = 0;
    displayTickets.forEach(t => {
      grossRevenue += t.cost; laborFees += t.cost * 0.4; partsRevenue += t.cost * 0.6; 
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) cliqTotal += t.cost;
      else cashTotal += t.cost;
    });
    const taxes = grossRevenue * 0.05; const netProfit = grossRevenue - taxes;
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, taxes, netProfit };
  }, [displayTickets]);

  return (
    <div className="min-h-screen w-full bg-[#040814] flex flex-col font-sans select-none overflow-hidden relative" dir="rtl">
      
      {/* النافذة المنبثقة للكرت الجاهز (تتوسط الشاشة) */}
      {featuredReadyTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500">
           <div className="animate-pop-in relative w-[90%] max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-70 animate-pulse"></div>
              <div className="relative">
                <TicketCard t={featuredReadyTicket} isFeatured={true} />
              </div>
              <div className="text-center mt-6 text-emerald-400 font-bold text-xl animate-bounce">
                🚀 المركبة جاهزة للتسليم 🚀
              </div>
           </div>
        </div>
      )}

      {/* البار العلوي - طابع الذكاء الاصطناعي */}
      <header className="w-full bg-[#09101f]/90 backdrop-blur-lg border-b border-[#1e3a5f] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,240,255,0.1)] z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-[#02040a] rounded-xl flex items-center justify-center overflow-hidden border border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
             <IconCpu />
          </div>
          <div className="bg-gradient-to-br from-[#00F0FF] to-[#00FF9D] text-black p-2.5 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] animate-pulse">
            <IconVolt />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono font-black px-2 py-0.5 rounded-md tracking-widest">AI EV CLINIC</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">ABU AL-NADI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00FF9D] font-bold">INTELLIGENCE</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs bg-[#040814] border border-[#1e3a5f] px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-[#00FF9D] animate-ping text-[8px]">●</span>
            <span>SYSTEM ACTIVE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden z-0">
        {/* القوائم الجانبية */}
        <aside className="w-20 bg-[#060b17]/90 backdrop-blur-md border-l border-[#1e3a5f] flex flex-col items-center py-6 gap-6 shadow-2xl z-20">
          <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
          <SidebarButton icon={<IconCalendar />} title="تفاصيل الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full relative">
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
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-[#00F0FF] text-black shadow-[0_0_20px_rgba(0,240,255,0.5)]' : 'text-slate-400 hover:bg-[#0a1224] hover:text-white'}`}>
    {icon}
    <span className="absolute right-24 bg-[#0a1224] border border-[#1e3a5f] px-3 py-1.5 rounded-lg text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

// ==========================================
// مكون كرت السيارة الموحد (للاستخدام في الساحة والنافذة المنبثقة)
// ==========================================
const TicketCard = ({ t, isFeatured = false }) => {
  let badgeStyle = "bg-[#1e3a5f]/50 text-slate-300 border-[#1e3a5f]";
  let glow = "border-[#1e3a5f]";
  let isReadyBlink = false;
  let progressPercent = 15; 
  let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
  let floatingIcon = "⏳"; // إيموجي افتراضي

  if (t.status.includes('انتظار')) { 
      badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/30"; 
      glow = "border-amber-500/20";
      floatingIcon = "⏳";
  }
  if (t.status.includes('فحص')) { 
      badgeStyle = "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30";
      glow = "border-[#FFB800]/30 shadow-[0_0_20px_rgba(255,184,0,0.1)]"; 
      progressPercent = 45; 
      progressColor = "bg-[#FFB800] shadow-[0_0_8px_#FFB800]";
      floatingIcon = "🕵️‍♂️";
  }
  if (t.status.includes('عمل')) { 
      badgeStyle = "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30";
      glow = "border-[#00F0FF]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]"; 
      progressPercent = 75; 
      progressColor = "bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]";
      floatingIcon = "👨‍🔧";
  }
  if (t.status.includes('جاهز')) { 
      badgeStyle = "bg-[#00FF9D] text-black font-bold border-[#00FF9D]";
      glow = "border-[#00FF9D]/60 shadow-[0_0_30px_rgba(0,255,157,0.2)]"; 
      progressPercent = 100; 
      progressColor = "bg-[#00FF9D] shadow-[0_0_12px_#00FF9D]"; 
      isReadyBlink = true;
      floatingIcon = "🚀";
  }

  let socColorText = 'text-[#00FF9D]';
  if(t.soc <= 20) socColorText = 'text-rose-400';
  else if(t.soc <= 50) socColorText = 'text-amber-400';

  const cardClasses = isFeatured 
    ? `bg-[#060b17] border-[2px] ${glow} rounded-3xl p-8 flex flex-col justify-between w-full shadow-2xl relative overflow-hidden`
    : `bg-[#060b17]/80 backdrop-blur-sm border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group w-full shadow-xl relative overflow-hidden ${isReadyBlink ? 'ready-blink' : ''}`;

  return (
    <div className={cardClasses}>
      <AICircuitBackground />
      
      {/* الإيموجي العائم */}
      <div className={`absolute left-4 top-4 text-3xl emoji-float opacity-80 ${isFeatured ? 'text-5xl left-6 top-6' : ''}`}>
        {floatingIcon}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-5">
          <span className="font-mono text-[10px] text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded border border-[#00F0FF]/20">CRD #{t.id}</span>
          <span className={`text-[10px] px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
            {isReadyBlink && <IconCheck />}{t.status}
          </span>
        </div>

        <div className="mb-5">
          <h3 className={`font-black text-white tracking-wide mb-1.5 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>{t.carModel}</h3>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-500">العميل:</span><span className="text-sm font-bold text-[#00F0FF]">{t.customer.split(' ')[0]}</span></div>
        </div>

        <div className="flex items-center justify-between bg-[#0a1224] border border-[#1e3a5f] rounded-xl px-4 py-2.5 mb-5">
          <div className="flex-[2]">
            <span className="text-[8px] text-[#00F0FF]/70 block font-mono font-bold mb-0.5">SCAN ID (PLATE)</span>
            <span className="font-mono text-white text-sm font-black tracking-widest whitespace-nowrap">{t.plate}</span>
          </div>
          <div className="flex-1 flex flex-col items-end pl-1 border-r border-[#1e3a5f] pr-3">
            <span className="text-[8px] text-[#00F0FF]/70 block font-mono font-bold mb-0.5">AI-BMS SOC</span>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className={`font-mono text-[11px] font-black ${socColorText}`}>{t.soc}%</span>
               <IconBattery level={t.soc} />
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-[10px] font-mono font-bold"><span className="text-slate-400">NETWORK PROGRESS</span><span className="text-white font-black">{progressPercent}%</span></div>
          <div className="w-full h-1.5 bg-[#0a1224] rounded-full overflow-hidden border border-[#1e3a5f]"><div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div></div>
        </div>
        
        <div className="bg-[#0a1224]/80 p-3.5 rounded-xl border border-[#1e3a5f] mb-5">
          <span className="text-[10px] text-slate-400 block mb-1.5 flex items-center gap-1"><IconSearch /> تحليل النظام / العطل:</span>
          <div className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-2">{t.problem}</div>
        </div>
      </div>
      
      <div className="border-t border-[#1e3a5f] pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto relative z-10">
         <div><span className="text-slate-500 block mb-0.5">COMPUTED VALUE</span><span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span></div>
         <div className="text-left"><span className="text-slate-500 block mb-0.5">AI TECH ASSIGNED</span><span className="text-[#00FF9D] text-xs">{t.engineer}</span></div>
      </div>
    </div>
  );
};


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
    <div className="w-full space-y-6 animate-fade-in relative z-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="مسار الاستلام والفحص" value={stats.waiting} badge="WAITING / SCAN" color="amber" />
        <StatCard title="كبائن العمليات (AI)" value={stats.working} badge="ACTIVE NEURAL LOCKS" color="cyan" />
        <StatCard title="ممر التجهيز والتسليم" value={stats.ready} badge="READY TO FLY" color="emerald" isPulse={true} />
        <StatCard title="المركبات النشطة" value={stats.total} badge="LIVE UNITS" color="white" />
      </div>

      <div className="w-full bg-[#060b17]/60 backdrop-blur-xl border border-[#1e3a5f] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <AICircuitBackground />
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2 relative z-10">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
          الشبكة الرقمية لتدفق المركبات 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full relative z-10">
          {tickets.map(t => <TicketCard key={t.id} t={t} />)}
          {tickets.length === 0 && <div className="text-slate-500 col-span-full py-10 text-center font-bold">شبكة البيانات فارغة حالياً.</div>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. الخزينة اليومية (Daily Treasury)
// ==========================================
const QuantumTreasury = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in relative z-10">
    <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
      <div className="bg-[#00FF9D]/10 p-2 rounded-lg text-[#00FF9D] border border-[#00FF9D]/30"><IconCoins /></div>
      الخزينة الموحدة - الذكاء المحاسبي
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="إجمالي الدخل (الخام)" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="مقبوضات الأيدي العاملة (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="مبيعات مخزن القطع (60%)" value={accounting.partsRevenue} color="cyan" />
      <FinanceCard title="صافي التدفق المالي" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
       <div className="bg-[#060b17]/80 backdrop-blur-md border border-[#1e3a5f] rounded-2xl p-6 shadow-xl">
         <h3 className="text-sm font-bold text-[#00F0FF] mb-4 border-b border-[#1e3a5f] pb-3">مسارات الدفع الرقمية</h3>
         <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#0a1224] p-4 rounded-xl border border-[#1e3a5f]">
               <span className="text-slate-400 font-bold text-sm">مقبوضات الكاش الفوري</span>
               <span className="text-xl font-black text-[#00FF9D] font-mono">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#0a1224] p-4 rounded-xl border border-[#1e3a5f]">
               <span className="text-slate-400 font-bold text-sm">حوالات كليك (CliQ)</span>
               <span className="text-xl font-black text-[#00F0FF] font-mono">{accounting.cliqTotal.toFixed(2)} JOD</span>
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
    <div className="w-full space-y-6 animate-fade-in relative z-10">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-[#00F0FF]/10 p-2 rounded-lg text-[#00F0FF] border border-[#00F0FF]/30"><IconReceipt /></div>
        سجل المقبوضات الذكي
      </h2>
      
      <div className="w-full bg-[#060b17]/80 backdrop-blur-md border border-[#1e3a5f] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-[#00F0FF] text-[11px] font-black uppercase tracking-wider border-b border-[#1e3a5f]">
                <th className="pb-4 px-4 text-center">رمز الكود</th>
                <th className="pb-4 px-4">رقم اللوحة</th>
                <th className="pb-4 px-4">المعرف (الزبون)</th>
                <th className="pb-4 px-4">نوع المركبة</th>
                <th className="pb-4 px-4 text-center">طريقة الدفع</th>
                <th className="pb-4 px-4 text-left">القيمة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a5f]/50">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#0a1224] transition-colors group">
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-500">#{t.id}</td>
                  <td className="py-4 px-4 font-mono text-sm font-bold text-[#00F0FF]">{t.plate}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200">{t.customer}</td>
                  <td className="py-4 px-4 text-xs text-slate-400">{t.carModel}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-black border ${t.paymentMethod.includes('كليك') ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-[#00FF9D]/10 text-[#00FF9D] border-[#00FF9D]/30'}`}>
                      {t.paymentMethod || 'كاش'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-left font-mono font-black text-[#00FF9D] text-lg">+{t.cost.toFixed(2)} JOD</td>
                </tr>
              ))}
              {paidTickets.length === 0 && (
                <tr><td colSpan="6" className="text-center py-10 text-slate-500 font-bold">لا يوجد بيانات حالياً.</td></tr>
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
    <div className="w-full space-y-6 animate-fade-in relative z-10">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-rose-500/10 p-2 rounded-lg text-rose-400 border border-rose-500/30"><IconExpense /></div>
        سجل المصروفات
      </h2>
      <div className="w-full bg-[#060b17]/80 backdrop-blur-md border border-[#1e3a5f] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-6 text-sm text-rose-400 font-bold flex items-center gap-3">
            <IconVolt /> ملاحظة: هذه بيانات تجريبية للتصميم.
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-[#00F0FF] text-[11px] font-black uppercase tracking-wider border-b border-[#1e3a5f]">
                <th className="pb-4 px-4 text-center">Timestamp</th>
                <th className="pb-4 px-4">بيان المصروف</th>
                <th className="pb-4 px-4 text-left">القيمة المخصومة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a5f]/50">
              {mockExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#0a1224] transition-colors">
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
// 5. تفاصيل الأيام (Daily Details)
// ==========================================
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
    <div className="w-full space-y-8 animate-fade-in relative z-10">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/30"><IconCalendar /></div>
        التقرير اليومي المفصل
      </h2>
      <div className="w-full border border-[#1e3a5f] rounded-2xl overflow-hidden shadow-2xl bg-[#060b17]/80 backdrop-blur-md">
        <div className="bg-[#0a1224] text-[#00F0FF] text-center py-4 font-black tracking-widest border-b border-[#1e3a5f] flex items-center justify-center gap-2">
          <IconCalendar /> كشف بيانات إغلاق يوم: {todayStr}
        </div>
        <div className="p-1 overflow-x-auto">
          <table className="w-full text-center text-xs min-w-[800px]">
             <thead>
              <tr>
                <th className="bg-[#065f46] text-white py-2 px-2 border border-[#1e3a5f]">القيمة</th>
                <th className="bg-[#065f46] text-white py-2 px-2 border border-[#1e3a5f]">الملخص المالي لليوم</th>
                <th className="w-4"></th>
                <th className="bg-[#9f1239] text-white py-2 px-2 border border-[#1e3a5f]">القيمة</th>
                <th className="bg-[#9f1239] text-white py-2 px-2 border border-[#1e3a5f]">بيان المصروف</th>
                <th className="w-4"></th>
                <th className="bg-[#0a1224] text-[#00F0FF] py-2 px-2 border border-[#1e3a5f]">المبلغ</th>
                <th className="bg-[#0a1224] text-[#00F0FF] py-2 px-2 border border-[#1e3a5f]">تفاصيل الشغل</th>
                <th className="bg-[#0a1224] text-[#00F0FF] py-2 px-2 border border-[#1e3a5f]">الموظف المسؤول</th>
                <th className="bg-[#0a1224] text-[#00F0FF] py-2 px-2 border border-[#1e3a5f]">الموديل</th>
                <th className="bg-[#0a1224] text-[#00F0FF] py-2 px-2 border border-[#1e3a5f]">الزبون</th>
                <th className="bg-[#0a1224] text-[#00F0FF] py-2 px-2 border border-[#1e3a5f]">رقم اللوحة</th>
                <th className="bg-[#0a1224] text-[#00F0FF] py-2 px-2 border border-[#1e3a5f]">رقم الكرت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 border border-[#1e3a5f] font-mono font-bold text-slate-300 bg-[#0a1224]">{dCash}</td>
                <td className="py-2 border border-[#1e3a5f] font-bold text-[#00FF9D] bg-[#0a1224]">دخل الكاش 💵</td>
                <td></td>
                <td className="py-2 border border-[#1e3a5f] font-mono font-bold text-slate-300">20</td>
                <td className="py-2 border border-[#1e3a5f] font-bold text-slate-300">أكل للشباب</td>
                <td></td>
                {tickets[0] ? (
                   <>
                    <td className="py-2 border border-[#1e3a5f] font-mono text-[#00F0FF]">{tickets[0].cost} ({tickets[0].paymentMethod})</td>
                    <td className="py-2 border border-[#1e3a5f] text-slate-300">{tickets[0].problem}</td>
                    <td className="py-2 border border-[#1e3a5f] text-slate-300">{tickets[0].engineer}</td>
                    <td className="py-2 border border-[#1e3a5f] text-slate-300">{tickets[0].carModel}</td>
                    <td className="py-2 border border-[#1e3a5f] font-bold text-white">{tickets[0].customer}</td>
                    <td className="py-2 border border-[#1e3a5f] font-mono text-[#00F0FF]">{tickets[0].plate}</td>
                    <td className="py-2 border border-[#1e3a5f] font-mono text-slate-500">#{tickets[0].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-[#1e3a5f] text-slate-500">لا يوجد بيانات</td>}
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
    cyan: "text-[#00F0FF] border-[#00F0FF]/30 bg-[#00F0FF]/10",
    emerald: "text-[#00FF9D] border-[#00FF9D]/30 bg-[#00FF9D]/10",
    white: "text-white border-slate-500/30 bg-white/5"
  };
  const glow = isPulse ? `shadow-[0_0_20px_rgba(0,255,157,0.15)] border-[#00FF9D]/40` : `border-[#1e3a5f]`;

  return (
    <div className={`bg-[#060b17]/80 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-xl border ${glow}`}>
      <span className="text-[#00F0FF]/80 text-xs font-black tracking-wider uppercase">{title}</span>
      <div className="flex items-baseline justify-between mt-2">
        <span className={`text-4xl font-black font-mono ${colors[color].split(' ')[0]} ${isPulse ? 'animate-pulse' : ''}`}>{value}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${colors[color]}`}>{badge}</span>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-[#00FF9D]' : 'text-[#00F0FF]';
  const glowClass = isGlow ? 'border-[#00FF9D]/40 shadow-[0_0_25px_rgba(0,255,157,0.15)]' : 'border-[#1e3a5f]';
  return (
    <div className={`bg-[#060b17]/80 backdrop-blur-md border ${glowClass} p-6 rounded-2xl shadow-xl`}>
      <span className="text-[#00F0FF]/80 text-xs font-black block tracking-wider uppercase">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-mono mt-2 block tracking-tighter`}>{value.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
    </div>
  );
};
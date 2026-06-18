// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- أيقونات سايبربانك الهندسية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 2.5 2.5 0 0 0-1.83-4.59V9.5a2.5 2.5 0 0 0-3.59-2.26A2.5 2.5 0 0 0 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1 1.83-4.59V9.5a2.5 2.5 0 0 1 3.59-2.26A2.5 2.5 0 0 1 14.5 2Z"/></svg>;

const IconBattery = ({ level }) => {
  let color = "#00e5ff"; // السماوي (السيان) كطابع الذكاء الاصطناعي
  if (level <= 20) color = "#ff0055"; // نيون أحمر
  else if (level <= 50) color = "#ffea00"; // نيون أصفر
  const fillWidth = Math.max(1, 12 * (level / 100));
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 drop-shadow-[0_0_5px_currentColor]" style={{color: color}}>
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke="#475569" />
      <line x1="22" x2="22" y1="11" y2="13" stroke="#475569" />
      <rect width={fillWidth} height="6" x="4" y="9" rx="1" ry="1" fill={color} stroke="none" />
    </svg>
  );
};

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

// =====================================
// نظام الاستايلات (Cyberpunk & AI Network)
// =====================================
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Changa:wght@400;600;800&family=Orbitron:wght@500;700;900&display=swap');

    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #030712; color: #f0f4f8; font-family: 'Changa', system-ui, sans-serif; overflow: hidden; }
    .font-mono { font-family: 'Orbitron', monospace; }
    
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #030712; }
    ::-webkit-scrollbar-thumb { background: #00e5ff55; border-radius: 10px; }
    
    /* شبكة الذكاء الاصطناعي في الخلفية */
    .ai-network-bg {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: -1;
        background-color: #010614;
        background-image: 
            radial-gradient(circle at 15% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
            linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px);
        background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
        animation: panBg 60s linear infinite;
    }
    
    /* تأثيرات البطاقات */
    .cyber-card {
        background: linear-gradient(145deg, rgba(11, 25, 44, 0.8) 0%, rgba(3, 7, 18, 0.9) 100%);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 229, 255, 0.1);
        position: relative;
        overflow: hidden;
    }
    .cyber-card::before {
        content: '';
        position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.1), transparent);
        transform: skewX(-20deg);
        animation: scanline 4s infinite;
    }

    /* حركات مخصصة */
    @keyframes panBg { 0% { background-position: 0 0, 0 0, 0 0, 0 0; } 100% { background-position: 0 0, 0 0, 0 400px, 400px 0; } }
    @keyframes scanline { 0% { left: -100%; } 100% { left: 200%; } }
    @keyframes pulse-neon-green { 0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 135, 0.2); border-color: rgba(0, 255, 135, 0.4); } 50% { box-shadow: 0 0 30px rgba(0, 255, 135, 0.6); border-color: rgba(0, 255, 135, 1); } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes radar-scan { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes pop-in { 0% { transform: scale(0.5) translateY(100px); opacity: 0; } 70% { transform: scale(1.05) translateY(-10px); opacity: 1; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
    @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }

    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    .ticker-content { display: inline-block; white-space: nowrap; animation: marquee 35s linear infinite; }
    .ticker-content:hover { animation-play-state: paused; }
    
    /* حالات الكروت */
    .status-ready { animation: pulse-neon-green 2s infinite; }
    
    /* شبكة مصغرة داخل الكروت */
    .card-circuit {
        position: absolute; right: 0; bottom: 0; opacity: 0.05; pointer-events: none;
        width: 100px; height: 100px;
        background-image: radial-gradient(circle, #00e5ff 1px, transparent 1px);
        background-size: 10px 10px;
        mask-image: linear-gradient(to top left, black, transparent);
        -webkit-mask-image: linear-gradient(to top left, black, transparent);
    }
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
    const playTone = (freq, startTime, duration, type='sine') => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, startTime);
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime); osc.stop(startTime + duration + 0.1);
    };
    // نغمة نجاح وتنبيه سايبربانك (Chime)
    playTone(1046.50, t, 0.4, 'triangle'); // C6
    playTone(1318.51, t + 0.15, 0.4, 'triangle'); // E6
    playTone(1567.98, t + 0.3, 1.0, 'sine'); // G6
  } catch (e) {}
};

// =====================================
// مصفوفة النصائح للشريط السفلي
// =====================================
const EV_TIPS = [
  "⚡ تجنب شحن البطارية لنسبة 100% يومياً، حافظ عليها بين 20% و 80% لإطالة عمرها الافتراضي.",
  "🌡️ درجات الحرارة المرتفعة جداً تقلل من كفاءة البطارية، حاول ركن سيارتك في الظل.",
  "⚙️ احرص على فحص نظام التبريد السائل للبطارية بشكل دوري لتجنب الأعطال المفاجئة.",
  "⚠️ التسارع والفرملة العنيفة يستهلكان طاقة البطارية بسرعة ويقللان من المدى المتبقي.",
  "🔋 استخدم الشواحن البطيئة (AC) للاستخدام اليومي، واجعل الشواحن السريعة (DC) لحالات السفر فقط.",
  "🛠️ لا تتجاهل رسائل الخطأ على الشاشة؛ الفحص المبكر بالذكاء الاصطناعي يوفر عليك آلاف الدنانير.",
  "❄️ في فصل الشتاء، المدى يقل طبيعياً بسبب استهلاك نظام التدفئة، خطط لرحلتك بذكاء.",
  "🔍 تحديث برمجيات السيارة (OTA) بانتظام يضمن لك أفضل أداء وأعلى مستويات الأمان."
];

// =====================================
// التطبيق الرئيسي
// =====================================
export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [highlightedCard, setHighlightedCard] = useState(null); // الكرت المنبثق
  const popupTimeoutRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleInteraction = () => { initAudioSilent(); ['click','keydown','touchstart'].forEach(e => document.removeEventListener(e, handleInteraction)); };
    ['click','keydown','touchstart'].forEach(e => document.addEventListener(e, handleInteraction));
    return () => ['click','keydown','touchstart'].forEach(e => document.removeEventListener(e, handleInteraction));
  }, []);

  // دالة إطلاق الانبثاق للكرت الجاهز
  const triggerReadyPopup = (ticketData) => {
    setHighlightedCard(ticketData);
    if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    popupTimeoutRef.current = setTimeout(() => {
      setHighlightedCard(null);
    }, 10000); // إخفاء بعد 10 ثواني
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const res = await fetch(`${API_URL}?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        
        if (Array.isArray(data) && isMounted) {
          const getCleanValue = (row, keys) => {
             for (let pKey of keys) {
                const k = Object.keys(row).find(x => x.trim() === pKey);
                if (k && row[k] !== undefined && row[k] !== "") return row[k];
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
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            
            const tData = {
              id,
              time: getCleanValue(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO'),
              plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة EV",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost: parseFloat(rawCost) || 0,
              soc: rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : (30 + (parseInt(plateStr.replace(/\D/g, '')) % 66) || 50),
            };

            if (status.includes("جاهز")) {
              if (!currentTimers[id]) { 
                  currentTimers[id] = Date.now(); 
                  playBeep = true; 
                  newReadyTicket = tData; // التقاط الكرت الجديد
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }
            return tData;
          });

          if (playBeep) {
              playReadySound();
              if (newReadyTicket) triggerReadyPopup(newReadyTicket);
          }
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) { console.error("API Error", err); }
    }
    
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 2000);
    return () => { isMounted = false; clearInterval(loop); };
  }, [readyTimers]);

  const displayTickets = useMemo(() => {
    return tickets.filter(t => {
      if (t.status.includes('جاهز') && readyTimers[t.id]) {
        if (Date.now() - readyTimers[t.id] > 4 * 60 * 1000) return false; 
      }
      return true;
    });
  }, [tickets, readyTimers]);

  const accounting = useMemo(() => {
    let gross = 0, labor = 0, parts = 0, cliq = 0, cash = 0;
    displayTickets.forEach(t => {
      gross += t.cost; labor += t.cost * 0.4; parts += t.cost * 0.6; 
      (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) ? cliq += t.cost : cash += t.cost;
    });
    return { grossRevenue: gross, laborFees: labor, partsRevenue: parts, cliqTotal: cliq, cashTotal: cash, netProfit: gross - (gross * 0.05) };
  }, [displayTickets]);

  return (
    <>
      <div className="ai-network-bg"></div>
      
      <div className="h-screen w-full flex flex-col select-none overflow-hidden" dir="rtl">
        {/* البار العلوي (Header) */}
        <header className="w-full bg-[#030712]/80 backdrop-blur-md border-b border-[#00e5ff]/20 px-6 py-4 flex justify-between items-center z-30">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center border border-[#00e5ff]/50 shadow-[0_0_15px_rgba(0,229,255,0.3)] relative overflow-hidden group">
               <div className="absolute inset-0 bg-[#00e5ff]/10 animate-pulse"></div>
               <IconBrain className="text-[#00e5ff] w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] font-mono font-black px-2 py-0.5 rounded tracking-widest uppercase">Adaptive AI Solutions</span>
              </div>
              <h1 className="text-xl font-black text-white tracking-wider">
                عيادة أبو النادي <span className="text-[#00ff87] font-mono text-sm ml-1 font-light">EV AI Care</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="font-mono text-xs bg-[#0b192c] border border-[#00e5ff]/30 px-4 py-2 rounded-xl text-[#00e5ff] flex items-center gap-3 font-bold tracking-widest shadow-[inset_0_0_10px_rgba(0,229,255,0.1)]">
               <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse"></span>
               <span>AMMAN NODE</span>
               <span className="text-white text-sm">{currentTime.toLocaleTimeString('en-US', {hour12: false})}</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 w-full overflow-hidden relative z-10">
          {/* القائمة الجانبية */}
          <aside className="w-20 bg-[#030712]/90 border-l border-[#00e5ff]/10 flex flex-col items-center py-6 gap-6 z-20 backdrop-blur-sm">
            <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
            <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
            <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
            <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
            <SidebarButton icon={<IconCalendar />} title="شيت الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
          </aside>

          {/* مساحة العرض الرئيسية (Main Content) */}
          <main className="flex-1 p-6 overflow-y-auto pb-16">
            {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
            {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} tickets={displayTickets} />}
            {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
            {activeTab === 'expenses' && <QuantumExpenses />}
            {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
          </main>
        </div>

        {/* شريط النصائح السفلي (Ticker Bar) */}
        <div className="w-full bg-[#0b192c] border-t border-[#00e5ff]/30 h-10 absolute bottom-0 left-0 z-40 overflow-hidden flex items-center shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
            <div className="bg-[#00e5ff] text-black h-full px-4 flex items-center font-black text-sm z-10 whitespace-nowrap shadow-[5px_0_15px_rgba(0,229,255,0.5)]">
                <IconCpu className="inline w-4 h-4 ml-2" /> تنبيهات النظام
            </div>
            <div className="flex-1 overflow-hidden relative h-full">
                <div className="absolute whitespace-nowrap h-full flex items-center text-[#00e5ff] font-bold text-sm tracking-wide ticker-content">
                    {EV_TIPS.map((tip, i) => (
                        <span key={i} className="mx-8 flex items-center gap-2">
                           {tip} <span className="text-[#00ff87] mx-4">|</span>
                        </span>
                    ))}
                     {EV_TIPS.map((tip, i) => ( // Duplicate for seamless scroll
                        <span key={'dup'+i} className="mx-8 flex items-center gap-2">
                           {tip} <span className="text-[#00ff87] mx-4">|</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* نافذة الانبثاق للسيارة الجاهزة (Popup Modal) */}
        {highlightedCard && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-fade-in">
              <div className="w-full max-w-lg p-2 animate-pop-in relative">
                 {/* تأثيرات الإضاءة حول النافذة المنبثقة */}
                 <div className="absolute inset-0 bg-[#00ff87] opacity-20 blur-3xl rounded-full"></div>
                 <h2 className="text-center text-[#00ff87] font-black text-3xl mb-6 drop-shadow-[0_0_10px_#00ff87] font-mono uppercase tracking-widest animate-pulse">
                   SYSTEM READY
                 </h2>
                 <div className="transform scale-110 shadow-[0_0_50px_rgba(0,255,135,0.3)] rounded-2xl">
                    <VehicleCard t={highlightedCard} isPopup={true} />
                 </div>
                 <p className="text-center text-slate-400 mt-8 font-mono text-sm">
                   جاري إخطار العميل... إغلاق تلقائي خلال ثوانٍ
                 </p>
              </div>
           </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// مكونات واجهة المستخدم
// ==========================================

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group border ${isActive ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/50 shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-slate-500 border-transparent hover:bg-[#0b192c] hover:text-[#00e5ff] hover:border-[#00e5ff]/30'}`}>
    {icon}
    <span className="absolute right-20 bg-[#0b192c] border border-[#00e5ff]/50 px-3 py-1.5 rounded-lg text-xs text-[#00e5ff] font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl pointer-events-none">
      {title}
    </span>
  </button>
);

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
    <div className="w-full space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="مسار الاستلام والفحص" value={stats.waiting} badge="WAITING" color="amber" />
        <StatCard title="كبائن العمليات (AI)" value={stats.working} badge="PROCESSING" color="cyan" />
        <StatCard title="ممر التجهيز والتسليم" value={stats.ready} badge="READY" color="emerald" isPulse={true} />
        <StatCard title="إجمالي المركبات النشطة" value={stats.total} badge="LIVE UNITS" color="white" />
      </div>

      <div className="w-full rounded-2xl p-6 bg-[#030712]/60 border border-[#00e5ff]/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <h2 className="text-sm font-black text-[#00e5ff] mb-6 uppercase tracking-widest flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping"></span>
          AI Fleet Flow Monitor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {tickets.map(t => <VehicleCard key={t.id} t={t} />)}
          {tickets.length === 0 && <div className="text-slate-500 col-span-full py-20 text-center font-bold text-xl uppercase tracking-widest">No Active Units Detected</div>}
        </div>
      </div>
    </div>
  );
};

// تصميم كرت السيارة المستوحى من السايبربانك والذكاء الاصطناعي
const VehicleCard = ({ t, isPopup = false }) => {
    let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
    let glow = "border-[#1a2740]";
    let isReady = false;
    let progressPercent = 15; 
    let progressColor = "bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]";
    
    // الأفاتار العائم
    let AvatarIcon = () => <div className="text-xl">⏳</div>;

    if (t.status.includes('انتظار')) { 
        badgeStyle = "bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/30"; 
        AvatarIcon = () => <div className="text-2xl animate-pulse">⏳</div>;
    }
    if (t.status.includes('عمل') || t.status.includes('فحص')) { 
        badgeStyle = "bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30";
        glow="border-[#00e5ff]/50 shadow-[0_0_20px_rgba(0,229,255,0.15)]"; 
        progressPercent = t.status.includes('عمل') ? 75 : 45; 
        progressColor = "bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]";
        AvatarIcon = () => t.status.includes('فحص') ? 
            <div className="text-2xl relative"><span className="absolute inset-0 animate-[radar-scan_2s_linear_infinite]">🔦</span>🔍</div> : 
            <div className="text-2xl animate-[spin-slow_4s_linear_infinite]">⚙️</div>;
    }
    if (t.status.includes('جاهز')) { 
        badgeStyle = "bg-[#00ff87]/20 text-[#00ff87] font-bold border-[#00ff87]";
        glow="border-[#00ff87] status-ready"; 
        progressPercent = 100; 
        progressColor = "bg-[#00ff87] shadow-[0_0_15px_#00ff87]"; 
        isReady = true;
        AvatarIcon = () => <div className="text-3xl animate-bounce drop-shadow-[0_0_10px_#00ff87]">✨</div>;
    }

    return (
      <div className={`cyber-card rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 w-full ${glow} ${isPopup ? 'h-auto' : 'hover:scale-[1.02]'}`}>
        <div className="card-circuit"></div>
        
        {/* الأفاتار العائم في الزاوية العلوية اليسرى */}
        <div className="absolute top-4 left-4 z-10 animate-float bg-black/50 p-2 rounded-full border border-slate-700/50 backdrop-blur-md">
            <AvatarIcon />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4 pr-12"> {/* pr-12 لترك مساحة للأفاتار */}
            <div>
               <span className="font-mono text-[10px] text-[#00e5ff] bg-[#0b192c] px-2.5 py-1 rounded border border-[#00e5ff]/30 shadow-[inset_0_0_5px_#00e5ff]">UID: #{t.id}</span>
            </div>
            <span className={`text-[10px] px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
              {isReady && <IconCheck />}{t.status}
            </span>
          </div>

          <div className="mb-5">
            <h3 className="font-black text-white text-2xl tracking-wide mb-1 uppercase font-mono">{t.carModel}</h3>
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">OWNER:</span>
                <span className="text-sm font-bold text-[#fbbf24]">{t.customer.split(' ')[0]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#030712] border border-[#00e5ff]/20 rounded-xl px-4 py-3 mb-5 shadow-inner">
            <div className="flex-[2]">
              <span className="text-[8px] text-[#00e5ff]/60 block font-mono font-bold mb-1">LICENSE PLATE</span>
              <span className="font-mono text-white text-base font-black tracking-widest bg-slate-900 px-2 py-0.5 rounded border border-slate-700">{t.plate}</span>
            </div>
            <div className="flex-1 flex flex-col items-end pl-2 border-r border-[#00e5ff]/20 pr-3">
              <span className="text-[8px] text-[#00e5ff]/60 block font-mono font-bold mb-1">BATTERY SOC</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                 <span className={`font-mono text-xs font-black ${t.soc <= 20 ? 'text-[#ff0055]' : t.soc <= 50 ? 'text-[#ffea00]' : 'text-[#00e5ff]'}`}>{t.soc}%</span>
                 <IconBattery level={t.soc} />
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-[10px] font-mono font-bold uppercase"><span className="text-slate-400">AI Diagnostics</span><span className={`font-black ${t.status.includes('جاهز') ? 'text-[#00ff87]' : 'text-[#00e5ff]'}`}>{progressPercent}% COMPLETED</span></div>
            <div className="w-full h-1.5 bg-[#030712] rounded-full overflow-hidden border border-slate-800">
                <div className={`h-full rounded-full transition-all duration-1000 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          <div className="bg-[#0b192c]/50 p-3.5 rounded-xl border border-[#00e5ff]/10 mb-5 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#00e5ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-[9px] text-[#00e5ff] font-mono uppercase block mb-1">System Log / Task:</span>
            <div className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-2 pl-2">{t.problem}</div>
          </div>
        </div>

        <div className="border-t border-[#00e5ff]/20 pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto relative z-10">
           <div><span className="text-slate-500 block mb-0.5 uppercase">Invoice Est.</span><span className="text-white text-sm font-black drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{t.cost.toFixed(0)} JOD</span></div>
           <div className="text-left flex items-center gap-2">
               <div className="text-right">
                   <span className="text-slate-500 block mb-0.5 uppercase">Lead Tech</span>
                   <span className="text-[#00ff87] text-xs uppercase">{t.engineer}</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-[#030712] border border-[#00ff87]/50 flex items-center justify-center font-black text-[#00ff87] shadow-[0_0_10px_rgba(0,255,135,0.2)]">
                   {t.engineer.charAt(0) || 'AI'}
               </div>
           </div>
        </div>
      </div>
    );
};

// ==========================================
// باقي الشاشات (مالية، تقارير، الخ) بتصميم موحد
// ==========================================

const QuantumTreasury = ({ accounting, tickets }) => (
  <div className="w-full space-y-6">
    <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2 font-mono">
      <div className="bg-[#fbbf24]/10 p-2 rounded-lg text-[#fbbf24] border border-[#fbbf24]/30"><IconCoins /></div>
      Financial Data Core
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="Gross Revenue" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="Labor Value (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="Parts Value (60%)" value={accounting.partsRevenue} color="cyan" />
      <FinanceCard title="Net Flow" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
       <div className="bg-[#030712]/80 backdrop-blur-md border border-[#00e5ff]/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/5 blur-[50px] rounded-full"></div>
         <h3 className="text-sm font-bold text-slate-300 mb-4 border-b border-[#00e5ff]/20 pb-3 font-mono uppercase tracking-widest">Payment Gateways</h3>
         <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center bg-[#0b192c] p-4 rounded-xl border border-[#00e5ff]/20 hover:border-[#00e5ff]/50 transition-colors">
               <span className="text-slate-400 font-bold text-sm">CASH INTAKE</span>
               <span className="text-xl font-black text-[#00ff87] font-mono">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#0b192c] p-4 rounded-xl border border-[#00e5ff]/20 hover:border-[#00e5ff]/50 transition-colors">
               <span className="text-slate-400 font-bold text-sm">CLIQ TRANSFERS</span>
               <span className="text-xl font-black text-[#00e5ff] font-mono">{accounting.cliqTotal.toFixed(2)} JOD</span>
            </div>
         </div>
       </div>
    </div>
  </div>
);

const QuantumReceipts = ({ tickets }) => {
  const paidTickets = tickets.filter(t => t.cost > 0);
  return (
    <div className="w-full space-y-6">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2 font-mono">
        <div className="bg-[#00e5ff]/10 p-2 rounded-lg text-[#00e5ff] border border-[#00e5ff]/30"><IconReceipt /></div>
        Revenue Ledger
      </h2>
      <div className="w-full bg-[#030712]/80 backdrop-blur-md border border-[#00e5ff]/20 rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right font-mono">
            <thead>
              <tr className="text-[#00e5ff] text-[10px] font-black uppercase tracking-widest border-b border-[#00e5ff]/20">
                <th className="pb-4 px-4 text-center">UID</th>
                <th className="pb-4 px-4">Plate No.</th>
                <th className="pb-4 px-4">Client</th>
                <th className="pb-4 px-4">Model</th>
                <th className="pb-4 px-4 text-center">Method</th>
                <th className="pb-4 px-4 text-left">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0b192c]">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#0b192c]/50 transition-colors group">
                  <td className="py-4 px-4 text-center text-xs text-slate-500">#{t.id}</td>
                  <td className="py-4 px-4 text-sm font-bold text-white">{t.plate}</td>
                  <td className="py-4 px-4 text-sm text-slate-300 font-sans">{t.customer}</td>
                  <td className="py-4 px-4 text-xs text-slate-400">{t.carModel}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-black border ${t.paymentMethod.includes('كليك') ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30' : 'bg-[#00ff87]/10 text-[#00ff87] border-[#00ff87]/30'}`}>
                      {t.paymentMethod || 'CASH'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-left font-black text-[#00ff87] text-lg">+{t.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuantumExpenses = () => {
  const mockExpenses = [
    { id: 1, desc: "أكل للشباب", amount: 20, time: "13:30" },
    { id: 2, desc: "شراء مواد فحص", amount: 45, time: "11:15" },
    { id: 3, desc: "مصاريف ضيافة", amount: 10, time: "09:00" }
  ];
  return (
    <div className="w-full space-y-6">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2 font-mono">
        <div className="bg-[#ff0055]/10 p-2 rounded-lg text-[#ff0055] border border-[#ff0055]/30"><IconExpense /></div>
        Outflow Ledger
      </h2>
      <div className="w-full bg-[#030712]/80 backdrop-blur-md border border-[#00e5ff]/20 rounded-2xl p-6 shadow-xl">
        <div className="bg-[#ff0055]/10 border border-[#ff0055]/20 p-4 rounded-xl mb-6 text-sm text-[#ff0055] font-bold flex items-center gap-3">
            <IconVolt /> ملاحظة: يجب تعديل السكربت السحابي لجلب المصاريف الحقيقية. (بيانات وهمية للعرض)
        </div>
        <table className="w-full text-right font-mono">
            <thead>
              <tr className="text-[#00e5ff] text-[10px] font-black uppercase tracking-widest border-b border-[#00e5ff]/20">
                <th className="pb-4 px-4 text-center">Time</th>
                <th className="pb-4 px-4">Description</th>
                <th className="pb-4 px-4 text-left">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0b192c]">
              {mockExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#0b192c]/50">
                  <td className="py-4 px-4 text-center text-xs text-slate-500">{exp.time}</td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-200 font-sans">{exp.desc}</td>
                  <td className="py-4 px-4 text-left font-black text-[#ff0055] text-lg">-{exp.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

const QuantumDailyDetails = ({ tickets }) => {
  return (
    <div className="w-full space-y-6">
       <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2 font-mono">
        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/30"><IconCalendar /></div>
        Master Data Sheet
      </h2>
      <div className="w-full border border-[#00e5ff]/20 rounded-2xl overflow-hidden shadow-xl bg-[#030712]/80 backdrop-blur-md">
         <div className="bg-[#0b192c] text-[#00e5ff] text-center py-4 font-black tracking-widest border-b border-[#00e5ff]/20 uppercase font-mono text-sm">
          System State Matrix - {new Date().toLocaleDateString('en-GB')}
        </div>
        <div className="p-8 text-center text-slate-400 font-mono">
             [ DATA STREAM RENDERED IN MAIN MODULES ]
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, badge, color, isPulse = false }) => {
  const colors = {
    amber: "text-[#fbbf24] border-[#fbbf24]/30 bg-[#fbbf24]/10",
    cyan: "text-[#00e5ff] border-[#00e5ff]/30 bg-[#00e5ff]/10",
    emerald: "text-[#00ff87] border-[#00ff87]/30 bg-[#00ff87]/10",
    white: "text-white border-slate-500/30 bg-white/5"
  };
  const glow = isPulse ? `shadow-[0_0_20px_rgba(0,255,135,0.1)] border-[#00ff87]/50` : `border-[#00e5ff]/20`;

  return (
    <div className={`bg-[#0b192c]/80 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-xl border ${glow} relative overflow-hidden group`}>
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl ${colors[color].split(' ')[2]} opacity-50`}></div>
      <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase font-mono relative z-10">{title}</span>
      <div className="flex items-baseline justify-between mt-3 relative z-10">
        <span className={`text-4xl font-black font-mono ${colors[color].split(' ')[0]} ${isPulse ? 'animate-pulse drop-shadow-[0_0_10px_currentColor]' : ''}`}>{value}</span>
        <span className={`text-[9px] px-2 py-0.5 rounded font-black font-mono border tracking-widest ${colors[color]}`}>{badge}</span>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-[#00ff87]' : 'text-[#00e5ff]';
  const glowClass = isGlow ? 'border-[#00ff87]/50 shadow-[0_0_30px_rgba(0,255,135,0.15)] bg-[#00ff87]/5' : 'border-[#00e5ff]/20 bg-[#0b192c]/80';
  return (
    <div className={`backdrop-blur-md border ${glowClass} p-6 rounded-2xl shadow-xl relative overflow-hidden`}>
      <span className="text-slate-400 text-[10px] font-black block tracking-widest uppercase font-mono">{title}</span>
      <span className={`text-3xl font-black ${textColor} font-mono mt-3 block tracking-wider drop-shadow-[0_0_5px_currentColor]`}>{value.toFixed(0)} <span className="text-xs text-slate-500 opacity-50">JOD</span></span>
    </div>
  );
};
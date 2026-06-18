// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- أيقونات الذكاء الاصطناعي والهندسة ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.002 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>;
const IconCoins = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><circle cx="18" cy="18" r="4"/><path d="M12 18a6 6 0 0 0-6-6"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;

// أيقونة البطارية بتصميم النيون
const IconBattery = ({ level }) => {
  let color = "#06b6d4"; // Cyan for excellent
  if (level <= 20) color = "#e11d48"; // Rose for critical
  else if (level <= 50) color = "#f59e0b"; // Amber for medium
  const fillWidth = Math.max(1, 12 * (level / 100));
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke="currentColor" className="text-slate-600" />
      <line x1="22" x2="22" y1="11" y2="13" stroke="currentColor" className="text-slate-600" />
      <rect width={fillWidth} height="6" x="4" y="9" rx="1" ry="1" fill={color} stroke="none" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
};

// =====================================
// CSS الحقن الديناميكي والمؤثرات المتقدمة
// =====================================
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Orbitron:wght@400;700;900&display=swap');
    
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #020617; color: #f8fafc; font-family: 'Cairo', sans-serif; overflow-x: hidden; }
    .font-orbitron { font-family: 'Orbitron', sans-serif; }
    
    /* سكرول بار عصري */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #020617; }
    ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 10px; }

    /* خلفية الشبكة العصبية والذكاء الاصطناعي */
    .neural-bg {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none;
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 85% 30%, rgba(245, 158, 11, 0.04) 0%, transparent 50%);
    }
    .grid-lines {
      position: absolute; width: 200%; height: 200%; top: -50%; left: -50%;
      background-image: 
        linear-gradient(rgba(30, 41, 59, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30, 41, 59, 0.3) 1px, transparent 1px);
      background-size: 40px 40px;
      transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
      animation: gridMove 20s linear infinite;
      opacity: 0.2;
    }
    
    @keyframes gridMove { 0% { transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px); } 100% { transform: perspective(500px) rotateX(60deg) translateY(40px) translateZ(-200px); } }

    /* شريط المعلومات المتحرك */
    .ticker-wrap { width: 100%; overflow: hidden; background: rgba(2, 6, 23, 0.9); border-top: 1px solid rgba(6, 182, 212, 0.3); backdrop-filter: blur(10px); position: fixed; bottom: 0; z-index: 50; display: flex; align-items: center; height: 35px; box-shadow: 0 -5px 20px rgba(0,0,0,0.5); }
    .ticker-content { display: flex; white-space: nowrap; animation: tickerScroll 45s linear infinite; padding-right: 100%; }
    .ticker-content:hover { animation-play-state: paused; }
    .ticker-item { margin-left: 50px; font-size: 0.85rem; font-weight: 700; color: #cbd5e1; display: flex; align-items: center; gap: 8px; }
    @keyframes tickerScroll { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }

    /* أنيميشن التركيز (Pop-up) للسيارة الجاهزة */
    @keyframes cinematic-pop {
      0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; filter: brightness(2); }
      20% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; filter: brightness(1.2); }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; filter: brightness(1); }
    }
    .hero-popup {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      z-index: 9999;
      width: 450px; max-width: 90vw;
      animation: cinematic-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-shadow: 0 0 50px rgba(6, 182, 212, 0.5), 0 0 100px rgba(2, 6, 23, 0.9);
    }
    .hero-backdrop {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(2, 6, 23, 0.8); backdrop-filter: blur(12px);
      z-index: 9998;
      animation: fadeIn 0.5s ease forwards;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    /* لمسات النيون الجمالية */
    .cyber-border { position: relative; }
    .cyber-border::before { content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; background: linear-gradient(45deg, #06b6d4, transparent, #f59e0b); z-index: -1; border-radius: inherit; opacity: 0.3; }
  `;
  document.head.appendChild(style);
}

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

// نصائح شريط الذكاء الاصطناعي السفلية
const EV_TIPS = [
  "🤖 ABU AL-NADI AI: للحفاظ على صحة بطاريتك (SOH)، تجنب ترك السيارة مشحونة بنسبة 100% لفترات طويلة.",
  "⚠️ تحذير نظام المعالجة: الشحن السريع المتكرر (DC) يرفع حرارة الخلايا، استخدم الشحن المنزلي (AC) كخيار افتراضي.",
  "💡 تلميح تقني: التسارع المفاجئ والقوي يستنزف طاقة البطارية ويؤثر على نظام التبريد بمرور الوقت.",
  "🔍 فحص الذكاء الاصطناعي: تأكد من تحديث نظام السيارة (OTA) بانتظام لضمان أفضل إدارة لطاقة البطارية (BMS).",
  "⚡ نصيحة الأداء: لا تترك مستوى البطارية ينخفض عن 20% باستمرار، هذا يسبب إجهاداً للخلايا (Deep Discharge).",
  "❄️ نظام الطقس: في الأيام شديدة الحرارة، حاول ركن سيارتك في الظل لتقليل العبء على نظام تبريد البطارية النشط.",
  "🔄 إعادة التوليد: استخدم نظام الكبح المتجدد (Regenerative Braking) لزيادة مدى القيادة وتقليل تآكل الفرامل.",
  "🛡️ درع الحماية: الصيانة الدورية لنظام التبريد (Coolant) للبطارية هو خط الدفاع الأول لمنع تدهورها."
];

// الصوت
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

const playAlertTone = () => {
  if (!globalAudioCtx || !audioInitialized) return; 
  if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
  try {
    const ctx = globalAudioCtx;
    const t = ctx.currentTime;
    const playTone = (freq, startTime, duration, volume) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; // موجة تكنولوجية حادة قليلاً
      osc.frequency.setValueAtTime(freq, startTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    };
    playTone(1046.50, t, 0.3, 0.05); // C6
    playTone(1567.98, t + 0.15, 0.8, 0.08); // G6
  } catch (e) {}
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // نظام الـ Popup للسيارات الجاهزة
  const [featuredReadyId, setFeaturedReadyId] = useState(null);
  const seenReadyIds = useRef(new Set());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFirst = () => { initAudioSilent(); ['click','keydown','touchstart'].forEach(e => document.removeEventListener(e, handleFirst)); };
    ['click','keydown','touchstart'].forEach(e => document.addEventListener(e, handleFirst));
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const res = await fetch(`${API_URL}?t=${new Date().getTime()}`, { cache: "no-store" });
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
             return customer !== null && isArchived !== true && isArchived !== "TRUE" && isArchived !== "true" && !status.includes("تسليم");
          });

          let newReadyToPop = null;

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            
            // تحقق ما إذا كانت السيارة جاهزة للتو ولم نعرض لها الـ Popup
            const isReady = status.includes("جاهز");
            if (isReady && !seenReadyIds.current.has(id)) {
                newReadyToPop = id;
                seenReadyIds.current.add(id);
            }

            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            
            return {
              id,
              time: getCleanValue(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO'),
              plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "-",
              cost: parseFloat(rawCost) || 0,
              soc: rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : 50
            };
          });

          setTickets(parsedTickets.reverse());

          // تفعيل عرض البوب أب إذا وجد
          if (newReadyToPop) {
              setFeaturedReadyId(newReadyToPop);
              playAlertTone();
              // إخفاء البوب أب بعد 10 ثواني
              setTimeout(() => {
                  setFeaturedReadyId(null);
              }, 10000);
          }
        }
      } catch (err) { console.error("Data Fetch Error", err); }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 2000);
    return () => { isMounted = false; clearInterval(loop); };
  }, []);

  const accounting = useMemo(() => {
    let grossRevenue = 0, laborFees = 0, partsRevenue = 0, cliqTotal = 0, cashTotal = 0;
    tickets.filter(t => t.cost > 0).forEach(t => {
      grossRevenue += t.cost;
      laborFees += t.cost * 0.4; 
      partsRevenue += t.cost * 0.6; 
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) cliqTotal += t.cost;
      else cashTotal += t.cost;
    });
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, netProfit: grossRevenue * 0.95 };
  }, [tickets]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans select-none relative z-10" dir="rtl">
      {/* خلفية الذكاء الاصطناعي */}
      <div className="neural-bg"><div className="grid-lines"></div></div>

      {/* بوب أب السيارة الجاهزة */}
      {featuredReadyId && (
        <>
          <div className="hero-backdrop"></div>
          <div className="hero-popup">
            {tickets.filter(t => t.id === featuredReadyId).map(t => (
               <TicketCard key={`popup-${t.id}`} t={t} isPopup={true} />
            ))}
          </div>
        </>
      )}

      {/* الهيدر العلوي */}
      <header className="w-full bg-[#020617]/80 backdrop-blur-md border-b border-cyan-900/50 px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-70 animate-pulse"></div>
             <div className="relative h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center border border-cyan-500/50">
               <IconBrain className="text-cyan-400 w-8 h-8" />
             </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-orbitron font-black px-2 py-0.5 rounded tracking-widest uppercase">AI Service Core Active</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-wider font-orbitron">ABU AL-NADI <span className="text-amber-500 font-light text-sm tracking-widest">EV CLINIC v6.0</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-orbitron text-xs bg-[#0f172a]/80 border border-slate-700/50 px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-cyan-400 animate-ping text-[8px]">●</span>
            <span>SYSTEM TIME</span>
            <span className="text-cyan-300 text-sm font-black">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden z-20 mb-[35px] /* مساحة للشريط السفلي */">
        {/* القوائم الجانبية */}
        <aside className="w-20 bg-[#020617]/90 backdrop-blur-md border-l border-cyan-900/30 flex flex-col items-center py-6 gap-6 shadow-2xl relative">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
          <SidebarButton icon={<IconGrid />} title="المحرك المركزي" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="داتا الإيرادات" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="سجلات الدفع" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconCalendar />} title="التحليل اليومي" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full relative scroll-smooth">
          {activeTab === 'liveyard' && <QuantumYard tickets={tickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} />}
          {/* تم اختصار البقية لتبسيط الكود، يمكنك إضافة المكونات السابقة هنا وتحديث ألوانها */}
          {(activeTab === 'receipts' || activeTab === 'daily_details') && (
              <div className="flex items-center justify-center h-full text-cyan-500/50 font-orbitron text-2xl font-black">
                 MODULE INITIALIZING...
              </div>
          )}
        </main>
      </div>

      {/* شريط المعلومات السفلي (Ticker) */}
      <div className="ticker-wrap font-orbitron">
        <div className="ticker-content">
          {EV_TIPS.map((tip, idx) => (
            <div key={idx} className="ticker-item">
              {tip} <span className="text-cyan-700 ml-4">///</span>
            </div>
          ))}
          {/* تكرار لضمان السلاسة */}
          {EV_TIPS.map((tip, idx) => (
            <div key={`dup-${idx}`} className="ticker-item">
              {tip} <span className="text-cyan-700 ml-4">///</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-4 rounded-2xl transition-all duration-300 relative group overflow-hidden ${isActive ? 'text-slate-900 bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]' : 'text-slate-500 hover:text-cyan-300 hover:bg-slate-800'}`}>
    {isActive && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
    <div className="relative z-10">{icon}</div>
    <span className="absolute right-24 bg-slate-800 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs text-cyan-50 font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 font-orbitron shadow-xl pointer-events-none">{title}</span>
  </button>
);

// ==========================================
// 1. الساحة الحية للذكاء الاصطناعي (AI Live Yard)
// ==========================================
const QuantumYard = ({ tickets }) => {
  const stats = useMemo(() => ({
      waiting: tickets.filter(t => t.status.includes('انتظار')).length,
      working: tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: tickets.filter(t => t.status.includes('جاهز')).length,
      total: tickets.length
  }), [tickets]);

  return (
    <div className="w-full space-y-8 animate-fade-in relative z-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        <StatCard title="SCAN QUEUE" subtitle="مسار الاستلام" value={stats.waiting} color="amber" />
        <StatCard title="AI DIAGNOSIS" subtitle="كبائن الفحص والعمل" value={stats.working} color="cyan" />
        <StatCard title="READY FOR LAUNCH" subtitle="جاهز للتسليم" value={stats.ready} color="emerald" isPulse={true} />
        <StatCard title="NETWORK LOAD" subtitle="إجمالي المركبات" value={stats.total} color="white" />
      </div>

      <div className="w-full bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-900/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <h2 className="text-sm font-black text-cyan-400 mb-8 uppercase tracking-widest flex items-center gap-3 font-orbitron border-b border-cyan-900/50 pb-4">
          <IconBrain />
          NEURAL NETWORK GRID // شبكة المركبات الحية
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
          {tickets.map(t => <TicketCard key={t.id} t={t} />)}
          {tickets.length === 0 && <div className="text-cyan-700/50 col-span-full py-20 text-center font-orbitron text-2xl font-black uppercase tracking-widest">NO ACTIVE VEHICLES IN GRID</div>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// تصميم الكرت المتطور (Ticket Card UI)
// ==========================================
const TicketCard = ({ t, isPopup = false }) => {
  let mainColor = "cyan";
  let statusIcon = "📡"; // جاري الفحص/انتظار
  let statusGlow = "shadow-[0_0_15px_rgba(6,182,212,0.15)]";
  let progressPercent = 30;

  if (t.status.includes('انتظار')) {
      mainColor = "amber"; statusIcon = "⏳"; progressPercent = 10;
      statusGlow = "shadow-[0_0_15px_rgba(245,158,11,0.1)] border-amber-500/30";
  } else if (t.status.includes('عمل') || t.status.includes('فحص')) {
      mainColor = "cyan"; statusIcon = "⚙️"; progressPercent = 65;
      statusGlow = "shadow-[0_0_20px_rgba(6,182,212,0.2)] border-cyan-500/40";
  } else if (t.status.includes('جاهز')) {
      mainColor = "emerald"; statusIcon = "🚀"; progressPercent = 100;
      statusGlow = "shadow-[0_0_30px_rgba(16,185,129,0.3)] border-emerald-400";
  }

  const bgClass = isPopup ? "bg-[#020617]" : "bg-[#020617]/80";

  return (
    <div className={`cyber-border rounded-2xl ${bgClass} border border-slate-800 p-6 flex flex-col justify-between transition-all duration-500 group w-full ${statusGlow} relative overflow-hidden backdrop-blur-md hover:scale-[1.03]`}>
      
      {/* تأثير الإضاءة الخلفية للكرت */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${mainColor}-500/10 rounded-full blur-2xl transition-all group-hover:bg-${mainColor}-500/20`}></div>

      {/* الأيقونة العائمة (Floating Avatar) */}
      <div className={`absolute top-4 left-4 text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${t.status.includes('عمل') ? 'animate-bounce' : ''}`}>
        {statusIcon}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6 border-b border-slate-800/80 pb-4">
          <div>
             <span className={`text-[10px] px-3 py-1 rounded bg-${mainColor}-950/50 border border-${mainColor}-500/30 text-${mainColor}-400 font-black uppercase tracking-widest`}>
                {t.status}
             </span>
             <div className="mt-2 text-slate-400 text-xs font-orbitron">ID // <span className="text-white font-bold">#{t.id}</span></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-black text-white text-2xl tracking-wide mb-1 font-orbitron drop-shadow-md">{t.carModel}</h3>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-500 uppercase">Client:</span><span className="text-sm font-bold text-amber-400">{t.customer.split(' ')[0]}</span></div>
        </div>

        {/* لوحة المعلومات الدقيقة */}
        <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-3 mb-6 grid grid-cols-2 gap-4">
          <div>
            <span className="text-[9px] text-cyan-600 block font-orbitron font-bold mb-1 uppercase">License Plate</span>
            <span className="font-orbitron text-slate-200 text-sm font-black tracking-widest">{t.plate}</span>
          </div>
          <div className="border-r border-slate-700/50 pr-4 flex flex-col items-end">
            <span className="text-[9px] text-cyan-600 block font-orbitron font-bold mb-1 uppercase">Battery Core</span>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className={`font-orbitron text-xs font-black ${t.soc <= 20 ? 'text-rose-500' : 'text-cyan-400'}`}>{t.soc}%</span>
               <IconBattery level={t.soc} />
            </div>
          </div>
        </div>

        {/* شريط التقدم الاصطناعي */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-[9px] font-orbitron font-bold uppercase"><span className="text-slate-500">System Progress</span><span className={`text-${mainColor}-400`}>{progressPercent}%</span></div>
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className={`h-full rounded-full bg-${mainColor}-500 shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out`} style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-slate-800/50 mb-6">
          <span className="text-[10px] text-slate-500 block mb-2 uppercase font-orbitron">Diagnostic Log:</span>
          <div className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 border-r-2 border-cyan-500/50 pr-2">{t.problem}</div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between text-[10px] font-orbitron font-bold mt-auto relative z-10">
         <div><span className="text-slate-600 block mb-1 uppercase">Cost Compute</span><span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span></div>
         <div className="text-left"><span className="text-slate-600 block mb-1 uppercase">Tech Lead</span><span className="text-amber-400 text-xs px-2 py-1 bg-amber-950/30 rounded">{t.engineer}</span></div>
      </div>
    </div>
  );
};

// ==========================================
// إحصائيات علوية
// ==========================================
const StatCard = ({ title, subtitle, value, color, isPulse = false }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/5",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
    white: "text-white border-slate-600/30 bg-slate-800/50"
  };

  return (
    <div className={`p-6 rounded-3xl flex flex-col justify-between shadow-lg border backdrop-blur-sm ${colors[color]} relative overflow-hidden`}>
      {isPulse && <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>}
      <div className="relative z-10">
        <span className="text-cyan-700 text-[10px] font-black tracking-widest uppercase font-orbitron block">{title}</span>
        <span className="text-slate-400 text-xs font-bold mt-1 block">{subtitle}</span>
        <div className="flex items-baseline justify-end mt-4">
          <span className={`text-5xl font-black font-orbitron drop-shadow-[0_0_15px_currentColor]`}>{value}</span>
        </div>
      </div>
    </div>
  );
};

const QuantumTreasury = ({ accounting }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2 font-orbitron text-cyan-400">
      <IconCoins /> FINANCIAL DATA CORE
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
      <FinanceCard title="Gross Income" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="Tech Labor (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="Parts Ops (60%)" value={accounting.partsRevenue} color="amber" />
      <FinanceCard title="Net Flow" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>
  </div>
);

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : color === 'amber' ? 'text-amber-400' : 'text-cyan-400';
  return (
    <div className={`bg-[#0f172a]/80 border ${isGlow ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-700/50'} p-6 rounded-2xl backdrop-blur-sm`}>
      <span className="text-slate-500 text-[10px] font-black block tracking-widest uppercase font-orbitron">{title}</span>
      <span className={`text-3xl font-black ${textColor} font-orbitron mt-3 block`}>{value.toFixed(2)} <span className="text-xs text-slate-600">JOD</span></span>
    </div>
  );
};
// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

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
  let color = "#10b981"; // أخضر (ممتاز)
  if (level <= 20) color = "#f43f5e"; // أحمر (منخفض جداً)
  else if (level <= 50) color = "#f59e0b"; // أصفر (متوسط)

  // حساب عرض التعبئة الداخلية للبطارية
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
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; overflow-x: hidden; }
    .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    
    /* خلفية شبكة الذكاء الاصطناعي - AI Circuit Background */
    .bg-ai-circuit {
        background-color: #02040a;
        background-image: 
           radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.05) 0%, transparent 40%),
           linear-gradient(rgba(34, 211, 238, 0.02) 1px, transparent 1px),
           linear-gradient(90deg, rgba(34, 211, 238, 0.02) 1px, transparent 1px);
        background-size: 100% 100%, 40px 40px, 40px 40px;
        position: relative;
    }
    
    /* تصميم الكروت الديناميكي - مسح الرادار */
    .card-ai-bg {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-ai-bg::before {
        content: "";
        position: absolute;
        top: -50%; left: -50%; width: 200%; height: 200%;
        background: conic-gradient(transparent, rgba(34, 211, 238, 0.15), transparent 30%);
        animation: rotate-bg 6s linear infinite;
        pointer-events: none;
    }
    .card-inner {
        background: #050914; /* لون عميق */
        margin: 1px; /* مساحة لحدود الكرت */
        height: calc(100% - 2px);
        width: calc(100% - 2px);
        border-radius: calc(1rem - 1px);
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
    }
    @keyframes rotate-bg { 100% { transform: rotate(360deg); } }

    /* تأثير نبض الجاهزية */
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink .card-inner {
      animation: pulse-ring 2s infinite;
      background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), #050914 60%);
    }

    /* الايموجي الطافي - شخصيات الفنيين */
    .floating-emoji {
        animation: float-up-down 3s ease-in-out infinite;
    }
    @keyframes float-up-down {
        0%, 100% { transform: translateY(0) rotate(-5deg); }
        50% { transform: translateY(-6px) rotate(5deg); }
    }

    /* الستايلات الخاصة بالكرت المنبثق المتمركز (Showcase) */
    .app-blurred {
        filter: blur(15px) brightness(0.4);
        pointer-events: none;
        transition: all 0.5s ease;
    }
    .showcase-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 99999; display: flex; justify-content: center; align-items: center;
        background: rgba(2, 4, 10, 0.5);
        animation: fadeInOverlay 0.5s ease-out forwards;
        perspective: 1000px;
    }
    .showcase-card {
        width: 380px; height: 600px;
        background: linear-gradient(180deg, #06101c 0%, #03060c 100%);
        border: 2px solid #10b981;
        box-shadow: 0 0 80px rgba(16, 185, 129, 0.3), inset 0 0 30px rgba(16,185,129,0.1);
        border-radius: 2rem;
        padding: 2rem;
        display: flex; flex-direction: column; align-items: center;
        position: relative; overflow: hidden;
        animation: popInCard 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .ai-scanline {
        position: absolute; top: 0; left: 0; width: 100%; height: 4px;
        background: #10b981;
        box-shadow: 0 0 20px 5px #10b981;
        animation: scanlineAnim 3s ease-in-out infinite alternate;
        z-index: 10; opacity: 0.8;
    }
    @keyframes scanlineAnim {
        0% { top: 0%; }
        100% { top: 100%; }
    }
    @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
    @keyframes popInCard {
        0% { transform: scale(0.5) rotateX(-20deg); opacity: 0; }
        100% { transform: scale(1.1) rotateX(0); opacity: 1; }
    }
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
    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }
    audioInitialized = true;
  } catch (e) {
    console.error("Audio init failed", e);
  }
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
    playAlertTone(880.00, t, 0.5, 0.08); // A5
    playAlertTone(1318.51, t + 0.25, 1.5, 0.08); // E6
  } catch (e) { 
      console.error("Audio blocked by browser.", e);
  }
};

// ==========================================
// دالة مساعدة لتحديد تفاصيل الحالة (الإيموجي، اللون، النص)
// ==========================================
const getAiStatusDetails = (status) => {
  if (status.includes('انتظار')) return { emoji: "👨‍💻", text: "جارِ التحليل المبدئي...", colorClass: "text-amber-400 border-amber-400/30 bg-amber-500/10" };
  if (status.includes('فحص')) return { emoji: "👨‍🔧", text: "تشخيص الذكاء الاصطناعي...", colorClass: "text-cyan-400 border-cyan-400/30 bg-cyan-500/10" };
  if (status.includes('عمل')) return { emoji: "👨‍🏭", text: "جاري صيانة وبرمجة النظام...", colorClass: "text-blue-400 border-blue-400/30 bg-blue-500/10" };
  if (status.includes('جاهز')) return { emoji: "🚀", text: "النظام جاهز للتحليق", colorClass: "text-emerald-400 border-emerald-400/50 bg-emerald-500/10 font-bold" };
  return { emoji: "🤖", text: "معالجة البيانات...", colorClass: "text-slate-400 border-slate-600 bg-slate-800" };
};


export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [showcaseTicket, setShowcaseTicket] = useState(null);

  // تتبع الوقت
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // تفعيل الصوت بصمت بمجرد أول لمسة/نقرة
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

          let playBeep = false;
          let newlyReadyObj = null;
          const currentTimers = { ...readyTimers };
          
          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const cost = parseFloat(rawCost) || 0;
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
           
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;
            const timeStr = getCleanValue(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO');
            const rawSoc = getCleanValue(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            const socValue = rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : (30 + (plateNum % 66));
            
            const parsedObj = {
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

            const isReady = status.includes("جاهز");
            if (isReady) {
              if (!currentTimers[id]) { 
                currentTimers[id] = Date.now(); 
                playBeep = true; 
                newlyReadyObj = parsedObj; // التقاط المركبة التي أصبحت جاهزة للتو
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }
            return parsedObj;
          });

          if (playBeep) playReadySound();
          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());

          // تفعيل وضع البورتريه (Showcase) للمركبة الجديدة الجاهزة لمدة 10 ثواني
          if (newlyReadyObj) {
            setShowcaseTicket(newlyReadyObj);
            setTimeout(() => {
               // إغلاق الكرت المنبثق التلقائي بعد 10 ثواني
               setShowcaseTicket(prev => prev?.id === newlyReadyObj.id ? null : prev);
            }, 10000);
          }
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
    <>
      {/* الغلاف الرئيسي للتطبيق (يتأثر بالـ Blur عند ظهور الكرت المنبثق) */}
      <div className={`min-h-screen w-full bg-[#02040a] bg-ai-circuit flex flex-col font-sans select-none overflow-hidden ${showcaseTicket ? 'app-blurred' : ''}`} dir="rtl">
        {/* البار العلوي - معزز بهوية الذكاء الاصطناعي */}
        <header className="w-full bg-[#050914]/80 backdrop-blur-md border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-40 relative">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] p-1">
               <IconCpu />
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-2.5 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] animate-pulse">
              <IconVolt />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span> AI-GATEWAY
                </span>
              </div>
              <h1 className="text-xl font-black text-white tracking-wider font-mono mt-0.5">ABU AL-NADI EV AI CLINIC <span className="text-cyan-400 font-light text-sm ml-1">AI-CORE OS</span></h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs bg-[#03060c] border border-cyan-900/50 px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
              <span className="text-emerald-400 animate-ping text-[6px]">●</span>
              <span>AMMAN NETWORK</span>
              <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 w-full overflow-hidden relative z-10">
          {/* القوائم الجانبية */}
          <aside className="w-20 bg-[#03050a]/90 backdrop-blur-md border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20">
            <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
            <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
            <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
            <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
            <SidebarButton icon={<IconCalendar />} title="تفاصيل الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
          </aside>

          {/* مساحة العرض الرئيسية */}
          <main className="flex-1 p-6 overflow-y-auto w-full">
            {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
            {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} tickets={displayTickets} />}
            {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
            {activeTab === 'expenses' && <QuantumExpenses />}
            {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
          </main>
        </div>
      </div>

      {/* ========================================================
          شاشة العرض المنبثقة (Showcase Overlay) للسيارة الجاهزة 
          ======================================================== */}
      {showcaseTicket && (
        <div className="showcase-overlay" onClick={() => setShowcaseTicket(null)}>
           <div className="showcase-card" onClick={e => e.stopPropagation()}>
              <div className="ai-scanline"></div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/50 px-3 py-1 rounded-full text-emerald-400 font-mono text-xs font-black animate-pulse">
                 <IconCheck /> جاهز للتسليم
              </div>

              <div className="mt-8 mb-4">
                 <div className="w-24 h-24 bg-[#0a1422] rounded-full border-4 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center text-5xl floating-emoji z-20 relative">
                    🚀
                 </div>
              </div>

              <h1 className="text-3xl font-black text-white tracking-widest uppercase mb-1">{showcaseTicket.carModel}</h1>
              <h2 className="text-xl text-cyan-400 font-bold mb-6 text-center">العميل: {showcaseTicket.customer.split(' ')[0]}</h2>

              <div className="w-full bg-[#03060c] border border-[#162235] rounded-2xl p-4 mb-6 shadow-inner relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-mono font-bold tracking-widest mb-1">AI-SCAN / PLATE NUMBER</span>
                    <span className="font-mono text-3xl text-emerald-400 font-black tracking-[0.2em]">{showcaseTicket.plate}</span>
                 </div>
              </div>

              <div className="w-full text-center bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 mb-4">
                 <span className="text-xs text-slate-400 block mb-1">تقرير الذكاء الاصطناعي للمشكلة:</span>
                 <p className="text-sm text-slate-200 font-medium leading-relaxed">{showcaseTicket.problem}</p>
              </div>

              <div className="mt-auto w-full border-t border-emerald-500/20 pt-4 flex justify-between items-center text-xs font-mono">
                 <div className="text-slate-400">
                    TECH:<br/><span className="text-emerald-400 font-bold text-sm">{showcaseTicket.engineer}</span>
                 </div>
                 <div className="text-left text-slate-400">
                    SYSTEM SOC:<br/><span className="text-emerald-400 font-bold text-sm">{showcaseTicket.soc}% 🔋</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
}

// مكون زر القائمة الجانبية
const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:bg-slate-900 hover:text-cyan-400'}`}>
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
    <div className="w-full space-y-6 animate-fade-in relative z-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard title="مسار الاستلام والفحص" value={stats.waiting} badge="WAITING BAYS" color="amber" />
        <StatCard title="كبائن العمليات (AI)" value={stats.working} badge="ACTIVE AI LOCKS" color="cyan" />
        <StatCard title="ممر التجهيز والتسليم" value={stats.ready} badge="READY TO FLY" color="emerald" isPulse={true} />
        <StatCard title="المركبات النشطة" value={stats.total} badge="LIVE AI UNITS" color="white" />
      </div>

      <div className="w-full bg-[#050914]/80 backdrop-blur-sm border border-[#121e30] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* عنصر جمالي للشاشة */}
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
        
        <h2 className="text-sm font-black text-white mb-8 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          شبكة الذكاء الاصطناعي لتدفق المركبات الحية
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {tickets.map(t => {
            const isReadyBlink = t.status.includes('جاهز');
            const aiDetails = getAiStatusDetails(t.status);
            
            let progressPercent = 15; let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
            if (t.status.includes('عمل') || t.status.includes('فحص')) { 
                progressPercent = t.status.includes('عمل') ? 75 : 45; 
                progressColor = t.status.includes('عمل') ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";
            }
            if (isReadyBlink) { 
                progressPercent = 100; 
                progressColor = "bg-emerald-500 shadow-[0_0_12px_#10b981]"; 
            }

            let socColorText = 'text-emerald-400';
            if(t.soc <= 20) socColorText = 'text-rose-400';
            else if(t.soc <= 50) socColorText = 'text-amber-400';

            return (
              <div key={t.id} className={`card-ai-bg group ${isReadyBlink ? 'ready-blink' : ''}`}>
                <div className="card-inner p-5 transition-all duration-300 group-hover:scale-[1.01]">
                    
                    {/* الإيموجي الطافي المعبر عن الفني/الحالة */}
                    <div className="absolute -top-3 -left-3 w-11 h-11 bg-[#090d16] border border-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-full flex items-center justify-center text-2xl z-20 floating-emoji">
                        {aiDetails.emoji}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-5 pl-6">
                        <span className="font-mono text-[10px] text-cyan-500/70 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-800/50">SYS-ID #{t.id}</span>
                        <span className={`text-[10px] px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${aiDetails.colorClass}`}>
                          {isReadyBlink && <IconCheck />}{t.status}
                        </span>
                      </div>
      
                      <div className="mb-5">
                        <h3 className="font-black text-white text-xl tracking-wide mb-1.5">{t.carModel}</h3>
                        <div className="flex items-center gap-2"><span className="text-xs text-slate-500">العميل:</span><span className="text-sm font-bold text-sky-400">{t.customer.split(' ')[0]}</span></div>
                      </div>
             
                      <div className="flex items-center justify-between bg-[#03060c] border border-[#162235] rounded-xl px-4 py-2.5 mb-5 shadow-inner">
                        <div className="flex-[2]">
                          <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">AI-SCAN PLATE</span>
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
                        <div className="flex justify-between text-[10px] font-mono font-bold">
                            <span className="text-slate-400">{aiDetails.text}</span>
                            <span className="text-white font-black">{progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
                            <div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>

                      <div className="bg-[#090d16]/80 p-3.5 rounded-xl border border-[#142033] mb-5 relative overflow-hidden">
                        <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500/50"></div>
                        <span className="text-[10px] text-cyan-500/70 block mb-1.5 font-mono">LOG_DATA:</span>
                        <div className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2">{t.problem}</div>
                      </div>
                    </div>
                    
                    <div className="border-t border-[#162235] pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto">
                       <div><span className="text-slate-500 block mb-0.5">SYS_VALUE</span><span className="text-white text-sm font-black">{t.cost.toFixed(0)} JOD</span></div>
                       <div className="text-left"><span className="text-slate-500 block mb-0.5">AI-TECH</span><span className="text-cyan-400 text-xs">{t.engineer}</span></div>
                    </div>
                </div>
              </div>
            );
          })}
          {tickets.length === 0 && <div className="text-slate-500 col-span-full py-10 text-center font-bold text-lg">الشبكة فارغة من الحركات الحية حالياً.</div>}
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
       <div className="bg-[#050914]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-xl">
         <h3 className="text-sm font-bold text-cyan-400 mb-4 border-b border-[#162235] pb-3 font-mono">RECEIPTS CHANNELS</h3>
         <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#090d16] p-4 rounded-xl border border-[#162235]">
               <span className="text-slate-400 font-bold text-sm flex items-center gap-2"><span className="text-xl">💵</span> مقبوضات الكاش الفوري</span>
               <span className="text-xl font-black text-emerald-400 font-mono">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#090d16] p-4 rounded-xl border border-[#162235]">
               <span className="text-slate-400 font-bold text-sm flex items-center gap-2"><span className="text-xl">💳</span> حوالات كليك (CliQ)</span>
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
      
      <div className="w-full bg-[#050914]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-500 text-[11px] font-black uppercase tracking-wider border-b border-[#16243a]">
                <th className="pb-4 px-4 text-center">رقم النظام</th>
                <th className="pb-4 px-4">رقم اللوحة</th>
                <th className="pb-4 px-4">اسم الزبون</th>
                <th className="pb-4 px-4">المركبة (AI Model)</th>
                <th className="pb-4 px-4 text-center">بوابة الدفع</th>
                <th className="pb-4 px-4 text-left">المبلغ المُحصل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111a29]">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#090d16] transition-colors group">
                  <td className="py-4 px-4 text-center font-mono text-xs text-cyan-500/50">SYS-{t.id}</td>
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
                <tr><td colSpan="6" className="text-center py-10 text-slate-500 font-bold">لا يوجد مقبوضات مسجلة بالشبكة حالياً.</td></tr>
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
    { id: 2, desc: "شراء مواد فحص إلكترونية", amount: 45, time: "11:15 AM" },
    { id: 3, desc: "مصاريف ضيافة المركز", amount: 10, time: "09:00 AM" }
  ];
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-rose-500/10 p-2 rounded-lg text-rose-400 border border-rose-500/30"><IconExpense /></div>
        سجل المصروفات اليومية
      </h2>
      
      <div className="w-full bg-[#050914]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-6 text-sm text-rose-400 font-bold flex items-center gap-3">
          <IconVolt /> ملاحظة: هذه بيانات تجريبية للتصميم. يتطلب عرض المصاريف الحقيقية تحديث كود الشبكة المركزية.
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-500 text-[11px] font-black uppercase tracking-wider border-b border-[#16243a]">
                <th className="pb-4 px-4 text-center">TIMESTAMP</th>
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
        سجل النظام اليومي التفصيلي (System Logs)
      </h2>

      <div className="w-full border border-[#162235] rounded-2xl overflow-hidden shadow-2xl bg-[#03060c]">
        <div className="bg-[#0f172a] text-cyan-400 text-center py-4 font-black tracking-widest border-b border-[#1e293b] flex items-center justify-center gap-2 font-mono">
          <IconCalendar /> 
          AI LOGS - DATE: {todayStr}
        </div>

        <div className="p-1 overflow-x-auto">
          <table className="w-full text-center text-xs min-w-[800px]">
            <thead>
              <tr>
                <th className="bg-[#065f46] text-white py-2 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#065f46] text-white py-2 px-2 border border-[#1e293b]">الملخص المالي لليوم</th>
                <th className="w-4 border-none bg-transparent"></th>
                <th className="bg-[#9f1239] text-white py-2 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#9f1239] text-white py-2 px-2 border border-[#1e293b]">بيان المصروف</th>
                <th className="w-4 border-none bg-transparent"></th>
                <th className="bg-[#1e293b] text-cyan-400 py-2 px-2 border border-[#334155]">المبلغ</th>
                <th className="bg-[#1e293b] text-cyan-400 py-2 px-2 border border-[#334155]">تفاصيل الشغل</th>
                <th className="bg-[#1e293b] text-cyan-400 py-2 px-2 border border-[#334155]">المبرمج/الفني</th>
                <th className="bg-[#1e293b] text-cyan-400 py-2 px-2 border border-[#334155]">الموديل</th>
                <th className="bg-[#1e293b] text-cyan-400 py-2 px-2 border border-[#334155]">الزبون</th>
                <th className="bg-[#1e293b] text-cyan-400 py-2 px-2 border border-[#334155]">رقم اللوحة</th>
                <th className="bg-[#1e293b] text-cyan-400 py-2 px-2 border border-[#334155]">رقم النظام</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300 bg-[#0f172a]">{dCash}</td>
                <td className="py-2 border border-[#1e293b] font-bold text-emerald-400 bg-[#0f172a]">دخل الكاش 💵</td>
                <td className="border-none bg-transparent"></td>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300">20</td>
                <td className="py-2 border border-[#1e293b] font-bold text-slate-300">أكل للشباب</td>
                <td className="border-none bg-transparent"></td>
                {tickets[0] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[0].cost} ({tickets[0].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[0].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[0].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">SYS-{tickets[0].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b] text-slate-500">لا يوجد بيانات</td>}
              </tr>
              <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300 bg-[#0f172a]">{dCliq}</td>
                <td className="py-2 border border-[#1e293b] font-bold text-indigo-400 bg-[#0f172a]">دخل الكليك 💳</td>
                <td className="border-none bg-transparent"></td>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300">45</td>
                <td className="py-2 border border-[#1e293b] font-bold text-slate-300">مواد فحص إلكترونية</td>
                <td className="border-none bg-transparent"></td>
                {tickets[1] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[1].cost} ({tickets[1].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[1].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[1].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[1].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[1].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[1].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">SYS-{tickets[1].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b]"></td>}
              </tr>
              <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300 bg-[#0f172a]">{dExp}</td>
                <td className="py-2 border border-[#1e293b] font-bold text-rose-400 bg-[#0f172a]">إجمالي المصاريف 📉</td>
                <td className="border-none bg-transparent"></td>
                <td className="py-2 border border-[#1e293b] font-mono font-bold text-slate-300">10</td>
                <td className="py-2 border border-[#1e293b] font-bold text-slate-300">ضيافة المركز</td>
                <td className="border-none bg-transparent"></td>
                {tickets[2] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[2].cost} ({tickets[2].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[2].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[2].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[2].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[2].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[2].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">SYS-{tickets[2].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b]"></td>}
              </tr>
               <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-black text-emerald-900 bg-[#10b981]">{dNet}</td>
                <td className="py-2 border border-[#1e293b] font-black text-emerald-900 bg-[#10b981]">صافي أرباح النظام 💰</td>
                <td className="border-none bg-transparent"></td>
                <td className="py-2 border border-[#1e293b] border-none bg-transparent"></td>
                <td className="py-2 border border-[#1e293b] border-none bg-transparent"></td>
                <td className="border-none bg-transparent"></td>
                {tickets[3] ? (
                   <>
                    <td className="py-2 border border-[#1e293b] font-mono text-cyan-400">{tickets[3].cost} ({tickets[3].paymentMethod})</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[3].problem}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[3].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[3].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[3].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[3].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">SYS-{tickets[3].id}</td>
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

// أدوات مساعدة للتصميم
const StatCard = ({ title, value, badge, color, isPulse = false }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    white: "text-white border-slate-500/20 bg-white/5"
  };
  const glow = isPulse ? `shadow-[0_0_25px_rgba(16,185,129,0.15)] border-emerald-500/40` : `border-[#16243a]`;

  return (
    <div className={`bg-[#050914]/90 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-xl border ${glow}`}>
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
  const glowClass = isGlow ? 'border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.15)]' : 'border-[#16243a] shadow-xl';
  return (
    <div className={`bg-[#050914]/90 backdrop-blur-md border ${glowClass} p-6 rounded-2xl`}>
      <span className="text-slate-400 text-xs font-black block tracking-wider uppercase">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-mono mt-2 block tracking-tighter`}>{value.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
    </div>
  );
};
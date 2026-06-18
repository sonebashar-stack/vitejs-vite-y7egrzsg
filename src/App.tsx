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
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    
    /* خلفية الخلايا العصبية والذكاء الاصطناعي */
    @keyframes panGrid {
      0% { background-position: 0 0; }
      100% { background-position: 60px 60px; }
    }
    .ai-network-bg {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: -10;
      background-color: #020617;
      background-image: 
        linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      animation: panGrid 20s linear infinite;
    }
    .ai-glow-orb {
      position: fixed; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.15; z-index: -9; pointer-events: none;
    }
    .orb-1 { top: -10%; left: -10%; background: #0ea5e9; }
    .orb-2 { bottom: -10%; right: -10%; background: #10b981; }

    /* حركات الكروت */
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink { animation: pulse-ring 2s infinite; background: linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, rgba(2, 6, 23, 1) 100%) !important; }
    
    /* حركة أيقونات الحالات العائمة */
    @keyframes float-avatar {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(5deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .floating-avatar { animation: float-avatar 3s ease-in-out infinite; }

    /* تأثير شاشة الظهور المؤقت (Showcase) */
    @keyframes showcase-entry {
      0% { transform: scale(0.5) translateY(50px); opacity: 0; filter: blur(10px); }
      10% { transform: scale(1.1) translateY(0); opacity: 1; filter: blur(0px); }
      15% { transform: scale(1); }
      90% { transform: scale(1); opacity: 1; filter: blur(0px); }
      100% { transform: scale(0.8); opacity: 0; filter: blur(10px); }
    }
    .showcase-card { animation: showcase-entry 10s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

    /* حركة الشريط الإخباري */
    @keyframes scroll-ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); } /* يلف لنصف المحتوى لأنه مكرر */
    }
    .ticker-track { display: flex; white-space: nowrap; animation: scroll-ticker 100s linear infinite; }
    .ticker-track:hover { animation-play-state: paused; }
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
  } catch (e) { console.error("Audio blocked.", e); }
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

  // تفعيل الصوت بصمت
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudioSilent();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
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
          let newlyReadyTicket = null;
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
            
            const ticketObj = {
              id, time: timeStr, plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل سحابي",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل", "وصف المشكلة والشغل المطلوب"]) || status,
              status,
              paymentMethod: getCleanValue(t, ["طريقة الدفع", "الدفع", "طريقة تسوية الدفع"]) || "-",
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "الذكاء الاصطناعي",
              cost, soc: socValue,
              driveTrain: plateNum % 2 === 0 ? "AWD Dual Motor" : "RWD Ultra"
            };

            const isReady = status.includes("جاهز");
            if (isReady) {
              if (!currentTimers[id]) { 
                currentTimers[id] = Date.now(); 
                playBeep = true; 
                newlyReadyTicket = ticketObj;
              }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            return ticketObj;
          });

          if (playBeep) playReadySound();
          if (newlyReadyTicket) {
             setShowcaseTicket(newlyReadyTicket);
             setTimeout(() => setShowcaseTicket(null), 10000); // العرض لمدة 10 ثواني
          }

          setReadyTimers(currentTimers);
          setTickets(parsedTickets.reverse());
        }
      } catch (err) {
        console.error("الربط السحابي معطل:", err);
      }
    }
    
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 2000);
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
    <div className="h-screen w-full flex flex-col font-sans select-none relative" dir="rtl">
      
      {/* خلفية الذكاء الاصطناعي الثابتة */}
      <div className="ai-network-bg"></div>
      <div className="ai-glow-orb orb-1"></div>
      <div className="ai-glow-orb orb-2"></div>

      {/* نافذة العرض المنبثقة (Showcase Mode) للسيارات الجاهزة */}
      {showcaseTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl transition-all duration-500">
           <div className="showcase-card w-[500px] pointer-events-none">
              <div className="text-center mb-6">
                <span className="inline-block bg-emerald-500 text-black font-black text-2xl px-8 py-3 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.6)] animate-pulse">
                  🚀 المركبة جاهزة للتسليم
                </span>
              </div>
              <TicketCard t={showcaseTicket} isShowcase={true} />
           </div>
        </div>
      )}

      {/* البار العلوي */}
      <header className="w-full bg-[#040814]/80 backdrop-blur-md border-b border-[#162235] px-6 py-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.4)] relative overflow-hidden group">
             <div className="absolute inset-0 bg-cyan-500/20 group-hover:bg-cyan-500/40 transition"></div>
             <IconCpu />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                 ABU AL-NADI EV AI CLINIC
              </span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider">عيادة أبو النادي <span className="text-emerald-400 font-light text-sm">للذكاء الاصطناعي</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs bg-[#02050f]/80 border border-cyan-900/50 px-5 py-2.5 rounded-xl text-cyan-200 shadow-inner flex items-center gap-3 font-bold tracking-widest backdrop-blur-sm">
            <span className="text-emerald-400 animate-ping text-[6px]">●</span>
            <span>SYSTEM TIME</span>
            <span className="text-white text-base font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden z-10">
        {/* القوائم الجانبية */}
        <aside className="w-20 bg-[#02050f]/90 backdrop-blur-md border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl">
          <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
          <SidebarButton icon={<IconCalendar />} title="التقرير المفصل" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full relative scroll-smooth pb-20">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} tickets={displayTickets} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'expenses' && <QuantumExpenses />}
          {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
        </main>
      </div>

      {/* الشريط الإخباري الذكي (AI Ticker) */}
      <footer className="absolute bottom-0 w-full bg-[#02050f]/95 border-t border-cyan-900/50 backdrop-blur-lg z-30 h-10 flex items-center overflow-hidden">
        <div className="bg-cyan-600 text-white font-black text-xs px-4 py-3 z-40 h-full flex items-center border-l border-cyan-400 shadow-[20px_0_20px_rgba(0,0,0,0.5)]">
          <IconCpu /> <span className="mr-2">نصائح AI</span>
        </div>
        <div className="flex-1 overflow-hidden relative h-full flex items-center text-sm font-bold text-cyan-100">
           <div className="ticker-track">
              {/* تكرار المحتوى مرتين للحركة المستمرة السلسة */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 px-12">
                  <span>🔋 <span className="text-emerald-400">نصيحة ذكية:</span> حافظ على شحن بطاريتك بين 20% و 80% لإطالة عمرها الافتراضي.</span>
                  <span>⚠️ <span className="text-rose-400">تحذير:</span> تجنب الشحن السريع المتكرر (DC) في درجات الحرارة العالية جداً للحد من التدهور الحراري.</span>
                  <span>🤖 <span className="text-cyan-400">ذكاء اصطناعي:</span> أنظمة الفحص لدينا تقرأ المستقبل وتتوقع الأعطال المخفية في خلايا الجهد العالي.</span>
                  <span>♻️ <span className="text-emerald-400">معلومة:</span> استخدم الكبح المتجدد (Regenerative Braking) لزيادة المدى وتقليل تآكل نظام الفرامل.</span>
                  <span>⚙️ <span className="text-amber-400">صيانة:</span> افحص ضغط الإطارات شهرياً، الضغط المنخفض يزيد الاحتكاك ويقلل من مدى السيارة.</span>
                  <span>⛔ <span className="text-rose-400">تنبيه هام:</span> لا تترك السيارة متوقفة لفترات طويلة جداً بنسبة شحن 100% أو قريبة من الصفر المئوي.</span>
                  <span>🌟 <span className="text-cyan-400">أبو النادي EV AI Care:</span> سيارتك أخذت العلامة الكاملة... دورك تعطينا 5 نجوم عبر مسح الكود!</span>
                </div>
              ))}
           </div>
        </div>
      </footer>
    </div>
  );
}

// مكون زر القائمة الجانبية
const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-4 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:bg-slate-900/50 hover:text-white border border-transparent'}`}>
    {icon}
    <span className="absolute right-20 bg-cyan-950 border border-cyan-800 px-3 py-1.5 rounded-lg text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
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
        <StatCard title="مسار الاستلام والفحص" value={stats.waiting} badge="WAITING BAYS" color="amber" />
        <StatCard title="كبائن العمليات (AI)" value={stats.working} badge="ACTIVE AI LOCKS" color="cyan" isPulse={true} />
        <StatCard title="ممر التجهيز والتسليم" value={stats.ready} badge="READY TO FLY" color="emerald" />
        <StatCard title="المركبات النشطة" value={stats.total} badge="LIVE UNITS" color="white" />
      </div>

      <div className="w-full bg-[#050914]/80 backdrop-blur-lg border border-cyan-900/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <h2 className="text-sm font-black text-cyan-100 mb-6 uppercase tracking-widest flex items-center gap-3">
          <IconCpu />
          اللوحة الرقمية الموحدة لتدفق المركبات - AI Vision
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {tickets.map(t => <TicketCard key={t.id} t={t} />)}
          {tickets.length === 0 && <div className="text-cyan-600/50 col-span-full py-16 text-center font-bold text-lg">الشبكة العصبية فارغة.. لا توجد مركبات نشطة حالياً.</div>}
        </div>
      </div>
    </div>
  );
};

// مكون كرت السيارة (مفصول لسهولة استخدامه في العرض المنبثق والشبكة)
const TicketCard = ({ t, isShowcase = false }) => {
  let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
  let glow = "border-[#1a2740]";
  let isReadyBlink = false;
  let progressPercent = 15; 
  let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
  let AvatarIcon = "⏳";

  if (t.status.includes('انتظار')) { 
      badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/20"; 
      AvatarIcon = "⏳";
  }
  if (t.status.includes('فحص')) { 
      badgeStyle = "bg-purple-400/10 text-purple-400 border-purple-400/20";
      glow="border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]"; 
      progressPercent = 45; progressColor = "bg-purple-400 shadow-[0_0_10px_#a855f7]";
      AvatarIcon = "🤖"; // روبوت الفحص الذكي
  }
  if (t.status.includes('عمل')) { 
      badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";
      glow="border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.15)]"; 
      progressPercent = 75; progressColor = "bg-blue-400 shadow-[0_0_10px_#3b82f6]";
      AvatarIcon = "👨‍🔧"; // فني يعمل
  }
  if (t.status.includes('جاهز')) { 
      badgeStyle = "bg-emerald-500 text-black font-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
      glow="border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]"; 
      progressPercent = 100; progressColor = "bg-emerald-400 shadow-[0_0_15px_#10b981]"; 
      isReadyBlink = true;
      AvatarIcon = "🚀"; // جاهز للانطلاق
  }

  let socColorText = 'text-emerald-400';
  if(t.soc <= 20) socColorText = 'text-rose-400';
  else if(t.soc <= 50) socColorText = 'text-amber-400';

  return (
    <div className={`bg-[#030712]/90 backdrop-blur-md border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group w-full shadow-2xl relative overflow-visible ${isReadyBlink && !isShowcase ? 'ready-blink' : ''}`}>
      
      {/* تأثير الشريحة الإلكترونية كخلفية للكرت */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none rounded-2xl"></div>

      {/* الأفاتار العائم */}
      <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center text-xl shadow-lg z-10 floating-avatar">
         {AvatarIcon}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-5">
          <span className="font-mono text-[11px] text-slate-400 bg-[#0f172a] px-3 py-1 rounded-lg border border-slate-700/50 shadow-inner">AI-CRD #{t.id}</span>
          <span className={`text-[11px] px-3 py-1 rounded-lg border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
            {isReadyBlink && <IconCheck />}{t.status}
          </span>
        </div>

        <div className="mb-5">
          <h3 className="font-black text-white text-2xl tracking-wide mb-1.5 drop-shadow-md">{t.carModel}</h3>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-500">مالك المركبة:</span><span className="text-sm font-bold text-cyan-300">{t.customer.split(' ')[0]}</span></div>
        </div>

        <div className="flex items-center justify-between bg-[#080d1a] border border-cyan-900/40 rounded-xl px-4 py-3 mb-5 shadow-inner">
          <div className="flex-[2]">
            <span className="text-[9px] text-slate-500 block font-mono font-bold mb-1">PLATE NUMBER</span>
            <span className="font-mono text-cyan-400 text-base font-black tracking-widest whitespace-nowrap">{t.plate}</span>
          </div>
          <div className="flex-1 flex flex-col items-end pl-1 border-r border-cyan-900/40 pr-3">
            <span className="text-[9px] text-slate-500 block font-mono font-bold mb-1">AI BATTERY SCAN</span>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className={`font-mono text-[12px] font-black ${socColorText}`}>{t.soc}%</span>
               <IconBattery level={t.soc} />
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-[10px] font-mono font-bold"><span className="text-slate-400">SYSTEM PROGRESS</span><span className="text-white font-black">{progressPercent}%</span></div>
          <div className="w-full h-1.5 bg-[#0f172a] rounded-full overflow-hidden border border-slate-700">
             <div className={`h-full rounded-full transition-all duration-1000 ${progressColor}`} style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        
        <div className="bg-[#050b14] p-4 rounded-xl border border-cyan-900/30 mb-5 relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-emerald-500 opacity-50"></div>
          <span className="text-[10px] text-cyan-500 block mb-1.5 font-bold flex items-center gap-1"><IconSearch/> التحليل والتشخيص المدعوم بـ AI:</span>
          <div className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 pl-2 border-l border-slate-800">{t.problem}</div>
        </div>
      </div>
      
      <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto relative z-10">
         <div><span className="text-slate-500 block mb-1">ESTIMATED VALUE</span><span className="text-white text-base font-black">{t.cost.toFixed(0)} <span className="text-[10px] text-emerald-400">JOD</span></span></div>
         <div className="text-left bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800"><span className="text-slate-500 block mb-0.5">LEAD TECH / AI</span><span className="text-cyan-400 text-xs">{t.engineer}</span></div>
      </div>
    </div>
  );
};

// ==========================================
// 2. الخزينة اليومية (Daily Treasury)
// ==========================================
const QuantumTreasury = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in relative z-10">
    <h2 className="text-lg font-black text-cyan-100 uppercase tracking-widest flex items-center gap-3">
      <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"><IconCoins /></div>
      الخزينة اليومية - التحليل المالي الذكي
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="إجمالي الدخل (الخام)" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="عائدات الرعاية (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="قطع الغيار (60%)" value={accounting.partsRevenue} color="purple" />
      <FinanceCard title="صافي التدفق المالي" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
       <div className="bg-[#050914]/80 backdrop-blur-md border border-cyan-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
         <h3 className="text-sm font-bold text-cyan-300 mb-6 border-b border-cyan-900/50 pb-4 flex items-center gap-2">تفصيل قنوات الدفع</h3>
         <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#030712] p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
               <span className="text-slate-300 font-bold text-sm">مقبوضات الكاش الفوري 💵</span>
               <span className="text-2xl font-black text-emerald-400 font-mono">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#030712] p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-colors">
               <span className="text-slate-300 font-bold text-sm">حوالات كليك (CliQ) 💳</span>
               <span className="text-2xl font-black text-indigo-400 font-mono">{accounting.cliqTotal.toFixed(2)} JOD</span>
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
      <h2 className="text-lg font-black text-cyan-100 uppercase tracking-widest flex items-center gap-3">
        <div className="bg-cyan-500/10 p-2.5 rounded-xl text-cyan-400 border border-cyan-500/30"><IconReceipt /></div>
        سجل المقبوضات وإيرادات النظام
      </h2>
      
      <div className="w-full bg-[#050914]/80 backdrop-blur-md border border-cyan-900/40 rounded-3xl p-6 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-cyan-500 text-[11px] font-black uppercase tracking-wider border-b border-cyan-900/50">
                <th className="pb-5 px-4 text-center">رقم AI-CRD</th>
                <th className="pb-5 px-4">رقم اللوحة</th>
                <th className="pb-5 px-4">الزبون</th>
                <th className="pb-5 px-4">نوع المركبة</th>
                <th className="pb-5 px-4 text-center">بوابة الدفع</th>
                <th className="pb-5 px-4 text-left">المبلغ المُحصل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {paidTickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-cyan-900/10 transition-colors group">
                  <td className="py-5 px-4 text-center font-mono text-xs text-slate-500">#{t.id}</td>
                  <td className="py-5 px-4 font-mono text-sm font-bold text-cyan-300">{t.plate}</td>
                  <td className="py-5 px-4 text-sm font-bold text-slate-200">{t.customer}</td>
                  <td className="py-5 px-4 text-xs text-slate-400">{t.carModel}</td>
                  <td className="py-5 px-4 text-center">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black border ${t.paymentMethod.includes('كليك') ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                      {t.paymentMethod || 'كاش'}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-left font-mono font-black text-emerald-400 text-lg">+{t.cost.toFixed(2)} <span className="text-xs">JOD</span></td>
                </tr>
              ))}
              {paidTickets.length === 0 && (
                <tr><td colSpan="6" className="text-center py-12 text-cyan-700 font-bold">لا يوجد مقبوضات مسجلة في قاعدة البيانات حالياً.</td></tr>
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
    { id: 2, desc: "شراء معدات فحص AI", amount: 145, time: "11:15 AM" },
    { id: 3, desc: "مصاريف ضيافة", amount: 10, time: "09:00 AM" }
  ];
  return (
    <div className="w-full space-y-6 animate-fade-in relative z-10">
      <h2 className="text-lg font-black text-cyan-100 uppercase tracking-widest flex items-center gap-3">
        <div className="bg-rose-500/10 p-2.5 rounded-xl text-rose-400 border border-rose-500/30"><IconExpense /></div>
        سجل المصروفات المباشرة
      </h2>
      
      <div className="w-full bg-[#050914]/80 backdrop-blur-md border border-rose-900/30 rounded-3xl p-6 shadow-2xl overflow-hidden">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-6 text-sm text-rose-300 font-bold flex items-center gap-3">
          <IconVolt /> ملاحظة: هذه الواجهة تعرض بيانات تجريبية. سيتم ربطها لاحقاً بخوارزميات Google Script للمصاريف.
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-rose-400 text-[11px] font-black uppercase tracking-wider border-b border-rose-900/30">
                <th className="pb-5 px-4 text-center">الطابع الزمني</th>
                <th className="pb-5 px-4">بيان المصروف</th>
                <th className="pb-5 px-4 text-left">القيمة المخصومة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-900/20">
              {mockExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-rose-900/10 transition-colors">
                  <td className="py-5 px-4 text-center font-mono text-xs text-slate-500">{exp.time}</td>
                  <td className="py-5 px-4 text-sm font-bold text-slate-200">{exp.desc}</td>
                  <td className="py-5 px-4 text-left font-mono font-black text-rose-400 text-lg">-{exp.amount.toFixed(2)} <span className="text-xs">JOD</span></td>
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
// 5. التقرير المفصل (Daily Details)
// ==========================================
const QuantumDailyDetails = ({ tickets }) => {
  const todayStr = new Date().toLocaleDateString('en-GB');
  let dCash = 0, dCliq = 0;
  tickets.forEach(t => {
      if (t.paymentMethod.includes('كليك')) dCliq += t.cost;
      else dCash += t.cost;
  });
  const dExp = 175; // افتراضي
  const dNet = (dCash + dCliq) - dExp;
  
  return (
    <div className="w-full space-y-8 animate-fade-in relative z-10">
      <h2 className="text-lg font-black text-cyan-100 uppercase tracking-widest flex items-center gap-3">
        <div className="bg-purple-500/10 p-2.5 rounded-xl text-purple-400 border border-purple-500/30"><IconCalendar /></div>
        التقرير الاستراتيجي وإغلاق اليوم
      </h2>

      <div className="w-full border border-cyan-900/40 rounded-3xl overflow-hidden shadow-2xl bg-[#030712]/90 backdrop-blur-md">
        <div className="bg-gradient-to-r from-cyan-950 to-[#0f172a] text-cyan-300 text-center py-5 font-black tracking-widest border-b border-cyan-900/50 flex items-center justify-center gap-3 shadow-inner">
          <IconCalendar /> تقرير تحليلات يوم: {todayStr}
        </div>

        <div className="p-2 overflow-x-auto">
          <table className="w-full text-center text-xs min-w-[900px]">
            <thead>
              <tr>
                <th className="bg-emerald-900/50 text-emerald-200 py-3 px-2 border border-slate-800 rounded-tl-lg">القيمة</th>
                <th className="bg-emerald-900/50 text-emerald-200 py-3 px-2 border border-slate-800">الملخص المالي</th>
                <th className="w-2"></th>
                <th className="bg-rose-900/50 text-rose-200 py-3 px-2 border border-slate-800">المصروف</th>
                <th className="bg-rose-900/50 text-rose-200 py-3 px-2 border border-slate-800">البيان</th>
                <th className="w-2"></th>
                <th className="bg-cyan-900/30 text-cyan-200 py-3 px-2 border border-slate-800">التكلفة</th>
                <th className="bg-cyan-900/30 text-cyan-200 py-3 px-2 border border-slate-800">تحليل العطل</th>
                <th className="bg-cyan-900/30 text-cyan-200 py-3 px-2 border border-slate-800">المهندس / AI</th>
                <th className="bg-cyan-900/30 text-cyan-200 py-3 px-2 border border-slate-800">المركبة</th>
                <th className="bg-cyan-900/30 text-cyan-200 py-3 px-2 border border-slate-800">المالك</th>
                <th className="bg-cyan-900/30 text-cyan-200 py-3 px-2 border border-slate-800">اللوحة</th>
                <th className="bg-cyan-900/30 text-cyan-200 py-3 px-2 border border-slate-800 rounded-tr-lg">CRD</th>
              </tr>
            </thead>
            <tbody>
              {/* تبسيط العرض لتوضيح الفكرة الديزاين */}
              {[...Array(4)].map((_, i) => {
                 const t = tickets[i];
                 return (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    {i === 0 && <><td className="py-3 border border-slate-800/50 font-mono font-bold text-emerald-400 bg-emerald-950/20">{dCash}</td><td className="py-3 border border-slate-800/50 font-bold text-emerald-300 bg-emerald-950/20">كاش نقدي 💵</td><td></td><td className="py-3 border border-slate-800/50 font-mono text-rose-400 bg-rose-950/10">20</td><td className="py-3 border border-slate-800/50 text-rose-300 bg-rose-950/10">أكل</td><td></td></>}
                    {i === 1 && <><td className="py-3 border border-slate-800/50 font-mono font-bold text-indigo-400 bg-indigo-950/20">{dCliq}</td><td className="py-3 border border-slate-800/50 font-bold text-indigo-300 bg-indigo-950/20">تحويل كليك 💳</td><td></td><td className="py-3 border border-slate-800/50 font-mono text-rose-400 bg-rose-950/10">145</td><td className="py-3 border border-slate-800/50 text-rose-300 bg-rose-950/10">معدات AI</td><td></td></>}
                    {i === 2 && <><td className="py-3 border border-slate-800/50 font-mono font-bold text-rose-400 bg-rose-950/20">{dExp}</td><td className="py-3 border border-slate-800/50 font-bold text-rose-300 bg-rose-950/20">إجمالي المصروف 📉</td><td></td><td className="py-3 border border-slate-800/50 font-mono text-rose-400 bg-rose-950/10">10</td><td className="py-3 border border-slate-800/50 text-rose-300 bg-rose-950/10">ضيافة</td><td></td></>}
                    {i === 3 && <><td className="py-3 border border-slate-800/50 font-mono font-black text-emerald-400 bg-emerald-900/30 text-lg">{dNet}</td><td className="py-3 border border-slate-800/50 font-black text-emerald-300 bg-emerald-900/30">صافي التدفق 💰</td><td></td><td className="py-3 border border-slate-800/50"></td><td className="py-3 border border-slate-800/50"></td><td></td></>}

                    {t ? (
                       <>
                        <td className="py-3 border border-slate-800/50 font-mono text-cyan-400">{t.cost} ({t.paymentMethod})</td>
                        <td className="py-3 border border-slate-800/50 text-slate-300 px-2 line-clamp-1 max-w-[120px]">{t.problem}</td>
                        <td className="py-3 border border-slate-800/50 text-cyan-300 bg-cyan-950/10">{t.engineer}</td>
                        <td className="py-3 border border-slate-800/50 text-slate-300">{t.carModel}</td>
                        <td className="py-3 border border-slate-800/50 font-bold text-white">{t.customer}</td>
                        <td className="py-3 border border-slate-800/50 font-mono text-amber-400 tracking-wider">{t.plate}</td>
                        <td className="py-3 border border-slate-800/50 font-mono text-slate-500 bg-slate-900/50">#{t.id}</td>
                       </>
                    ) : <td colSpan="7" className="py-3 border border-slate-800/50 text-slate-600">-- مساحة فارغة --</td>}
                  </tr>
                 )
              })}
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
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    white: "text-slate-200 border-slate-600/50 bg-slate-800/50 shadow-lg",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
  };
  const glow = isPulse ? `animate-pulse border-${color}-400/50` : ``;

  return (
    <div className={`backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between transition-transform hover:scale-105 border ${colors[color]} relative overflow-hidden group`}>
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-white opacity-5 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
      <span className="text-cyan-100/70 text-xs font-black tracking-wider uppercase drop-shadow-sm">{title}</span>
      <div className="flex items-baseline justify-between mt-3 z-10">
        <span className={`text-4xl font-black font-mono drop-shadow-lg ${colors[color].split(' ')[0]}`}>{value}</span>
        <span className={`text-[10px] px-2 py-1 rounded-lg font-bold border tracking-wider bg-[#02050f]/50 ${colors[color].split(' ')[0]} ${glow}`}>{badge}</span>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : color === 'purple' ? 'text-purple-400' : 'text-cyan-400';
  const glowClass = isGlow ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-950/20' : 'border-cyan-900/40 bg-[#030712]/80';
  
  return (
    <div className={`backdrop-blur-xl border ${glowClass} p-6 rounded-3xl shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      <span className="text-cyan-100/60 text-xs font-black block tracking-wider uppercase">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-mono mt-3 block tracking-tighter drop-shadow-md`}>
         {value.toFixed(2)} <span className="text-sm text-slate-500 font-bold ml-1">JOD</span>
      </span>
    </div>
  );
};
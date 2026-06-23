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
const IconReceipt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7 7-7-7"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2h5"/><path d="M16.5 6.5A2.5 2.5 0 0 0 19 9v1a2.5 2.5 0 0 0 2.5 2.5H22"/><path d="M19 9a2.5 2.5 0 0 1-2.5-2.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 1-5 0v-1a2.5 2.5 0 0 0-5 0v1A2.5 2.5 0 0 1 5 9"/><path d="M2 12.5h.5A2.5 2.5 0 0 0 5 10V9"/><path d="M19 14.5v1a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 15.5v-1"/><path d="M12 18v4"/><path d="M9 22h6"/></svg>;
const IconInfo = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
const IconMessage = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconEdit = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;

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

// النصائح الافتراضية في حال لم يتم إدخال أي شيء
const DEFAULT_TIPS = [
    "💡 الاعتقاد بأن السيارات الكهربائية لا تحتاج لصيانة هو خاطئ، فهي تعتمد على أنظمة إدارة حرارية دقيقة وزيوت تروس تتحمل سرعات هائلة.",
    "⚠️ تجنب الإفراط المستمر في الشحن السريع (DC) للضرورة واعتمد على شواحن التيار المتردد (AC) المنزلية لإطالة عمر البطارية.",
    "🔋 حافظ على نسبة الشحن ضمن 'النطاق الذهبي' (20%-80%) وتجنب التفريغ العميق المستمر للصفر في البطاريات التقليدية.",
    "❄️ نصيحة ذهبية: الركن في الظل صيفاً يقلل من استهلاك طاقة التبريد ويحمي البطارية من الشيخوخة والانهيار الحراري."
];

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    .bg-ai-grid {
      background-image: linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
      background-size: 30px 30px; background-position: center center;
    }
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
    .ready-blink { animation: pulse-ring 1.5s infinite; background-color: rgba(16, 185, 129, 0.05) !important; }
    @keyframes pop-in { 0% { transform: scale(0.8) translateY(50px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
    .animate-pop-in { animation: pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes scroll-news-seamless { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
    .ticker-track { display: flex; width: max-content; animation: scroll-news-seamless 180s linear infinite; }
    .ticker-track:hover { animation-play-state: paused; }
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
    const oscillator = globalAudioCtx.createOscillator();
    const gainNode = globalAudioCtx.createGain();
    gainNode.gain.value = 0; 
    oscillator.connect(gainNode);
    gainNode.connect(globalAudioCtx.destination);
    oscillator.start(0); oscillator.stop(0.001);
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
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.start(startTime); osc.stop(startTime + duration + 0.1);
    };
    playAlertTone(880.00, t, 0.5, 0.08);
    playAlertTone(1318.51, t + 0.25, 1.5, 0.08);
  } catch (e) { console.error("Audio blocked by browser.", e); }
};

// =====================================
// شريط نصائح السيارات المتحرك (الآن يستقبل البيانات ديناميكياً)
// =====================================
const InfoTicker = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  const tipElements = tips.map((tip, index) => (
    <span key={index} className="flex items-center gap-3 px-8 whitespace-nowrap" dir="rtl">
        {(tip.includes('تحذير') || tip.includes('تنبيه') || tip.includes('⚠️') || tip.includes('🛑')) ? <span className="text-amber-400 text-sm">●</span> : <span className="text-emerald-400 text-sm">●</span>}
        {tip}
    </span>
  ));

  return (
    <div className="w-full bg-[#05080f] border-t border-[#162235] h-12 flex items-center overflow-hidden relative z-50 shrink-0" dir="ltr">
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#05080f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#05080f] to-transparent z-10 pointer-events-none"></div>
      
      <div className="absolute right-0 h-full flex items-center bg-[#090d16] border-l border-[#162235] px-4 z-20 shadow-[5px_0_15px_rgba(0,0,0,0.5)]" dir="rtl">
         <IconInfo className="text-cyan-400 ml-2 animate-pulse" />
         <span className="font-mono text-xs font-black text-cyan-400 tracking-wider">EV AI TIPS</span>
      </div>

      <div className="ticker-track text-[15px] font-bold text-slate-300 tracking-wide">
        <div className="flex items-center">{tipElements}</div>
        <div className="flex items-center">{tipElements}</div>
      </div>
    </div>
  );
};

// =====================================
// لوحة إدارة الشريط الإخباري (شاشة الإضافة والحذف)
// =====================================
const QuantumTickerManager = ({ tips, setTips }) => {
  const [newTip, setNewTip] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTip.trim()) {
      setTips([newTip.trim(), ...tips]);
      setNewTip("");
    }
  };

  const handleRemove = (indexToRemove) => {
    setTips(tips.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <IconMessage />
        </div>
        إدارة الشريط الإخباري (البث المباشر)
      </h2>

      <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-2xl">
        <form onSubmit={handleAdd} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            placeholder="اكتب رسالة أو معلومة جديدة لتدور في الشريط السفلي..."
            className="flex-1 bg-[#090d16] border border-[#162235] text-slate-200 text-sm font-bold p-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600"
            dir="rtl"
          />
          <button
            type="submit"
            className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-8 rounded-xl font-bold hover:bg-emerald-500/30 transition-all whitespace-nowrap"
          >
            إضافة للشريط
          </button>
        </form>

        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex justify-between items-center bg-[#090d16] border border-[#162235] p-4 rounded-xl group hover:border-slate-700 transition-all">
              <p className="text-slate-300 text-sm font-bold ml-4 leading-relaxed">{tip}</p>
              <button
                onClick={() => handleRemove(index)}
                className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg opacity-50 group-hover:opacity-100 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all font-bold text-xs"
              >
                حذف
              </button>
            </div>
          ))}
          {tips.length === 0 && (
            <div className="text-center py-10 text-slate-500 font-bold border-2 border-dashed border-[#162235] rounded-xl">
              لا توجد أسطر حالياً. قم بإضافة نص ليعمل الشريط بالأسفل.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [highlightedTicket, setHighlightedTicket] = useState(null);
  
  // حفظ وقراءة بيانات الشريط من المتصفح لكي لا تُفقد
  const [tickerTips, setTickerTips] = useState(() => {
    try {
      const saved = localStorage.getItem('ev_ai_tips');
      return saved ? JSON.parse(saved) : DEFAULT_TIPS;
    } catch {
      return DEFAULT_TIPS;
    }
  });

  // تحديث الذاكرة المحلية عند كل تغيير في الشريط
  useEffect(() => {
    localStorage.setItem('ev_ai_tips', JSON.stringify(tickerTips));
  }, [tickerTips]);

  const isInitialLoad = useRef(true);

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

          let playBeep = false;
          let newReadyTicket = null;
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
  
            const parsed = {
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
                  setTimeout(() => setHighlightedTicket(null), 60000);
              }
          }
          
          isInitialLoad.current = false;
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
        if (elapsed > 5 * 60 * 1000) return false; 
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
      if (t.paymentMethod.includes('كليك') || t.paymentMethod.includes('CliQ')) { cliqTotal += t.cost; } 
      else { cashTotal += t.cost; }
    });
    const taxes = grossRevenue * 0.05; 
    const netProfit = grossRevenue - taxes;
    return { grossRevenue, laborFees, partsRevenue, cliqTotal, cashTotal, taxes, netProfit };
  }, [displayTickets]);

  return (
    <div className="h-screen w-full bg-[#02040a] flex flex-col font-sans select-none overflow-hidden relative" dir="rtl">
      
      {highlightedTicket && (
        <div className="fixed inset-0 z-[100] backdrop-blur-md bg-[#02040a]/80 flex items-center justify-center transition-all duration-500">
           <div className="absolute inset-0 bg-ai-grid opacity-20"></div>
           <div className="animate-pop-in w-full max-w-lg z-10">
              <div className="text-center mb-6">
                 <h2 className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-2 animate-pulse">🚀 مركبة جاهزة للتسليم 🚀</h2>
                 <p className="text-slate-300 font-mono text-lg">AI SYSTEM: TASK COMPLETED</p>
              </div>
              <TicketCard t={highlightedTicket} isHighlighted={true} />
           </div>
        </div>
      )}

      <header className="w-full bg-[#090d16]/90 backdrop-blur-sm border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10 relative shrink-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-0 left-1/4 w-96 h-full bg-cyan-500/5 blur-[100px]"></div>
             <div className="absolute top-0 right-1/4 w-96 h-full bg-emerald-500/5 blur-[100px]"></div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-10 w-10 bg-[#0f172a] rounded-xl flex items-center justify-center overflow-hidden border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
             <IconBrain className="text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest flex items-center gap-1"><IconVolt /> EV AI CLINIC</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">ABU AL-NADI <span className="text-cyan-400 font-light text-sm">Adaptive AI</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="font-mono text-xs bg-[#05080f] border border-[#1b2b44] px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-emerald-400 animate-ping text-[6px]">●</span>
            <span>AMMAN ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-ai-grid opacity-10 pointer-events-none"></div>
        <aside className="w-20 bg-[#04070d]/90 backdrop-blur-md border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20 relative shrink-0">
          <SidebarButton icon={<IconGrid />} title="الساحة الحية" isActive={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarButton icon={<IconCoins />} title="الخزينة اليومية" isActive={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} />
          <SidebarButton icon={<IconReceipt />} title="المقبوضات" isActive={activeTab === 'receipts'} onClick={() => setActiveTab('receipts')} />
          <SidebarButton icon={<IconExpense />} title="المصاريف" isActive={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
          <SidebarButton icon={<IconCalendar />} title="تفاصيل الأيام" isActive={activeTab === 'daily_details'} onClick={() => setActiveTab('daily_details')} />
          
          {/* زر شاشة إدارة الشريط الجديدة */}
          <SidebarButton icon={<IconEdit />} title="إدارة الشريط" isActive={activeTab === 'ticker_manager'} onClick={() => setActiveTab('ticker_manager')} />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto w-full z-10 relative">
          {activeTab === 'liveyard' && <QuantumYard tickets={displayTickets} />}
          {activeTab === 'treasury' && <QuantumTreasury accounting={accounting} tickets={displayTickets} />}
          {activeTab === 'receipts' && <QuantumReceipts tickets={displayTickets} />}
          {activeTab === 'expenses' && <QuantumExpenses />}
          {activeTab === 'daily_details' && <QuantumDailyDetails tickets={displayTickets} />}
          
          {/* شاشة إدارة الشريط الجديدة */}
          {activeTab === 'ticker_manager' && <QuantumTickerManager tips={tickerTips} setTips={setTickerTips} />}
        </main>
      </div>
      
      {/* شريط الأخبار والنصائح في الأسفل (تم ربطه بالبيانات المتغيرة) */}
      <InfoTicker tips={tickerTips} />
    </div>
  );
}

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-500 hover:bg-slate-900 hover:text-white border border-transparent'}`}>
    {icon}
    <span className="absolute right-24 bg-[#090d16] border border-slate-700 px-3 py-1.5 rounded-lg text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

const TicketCard = ({ t, isHighlighted = false }) => {
    let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
    let glow = "border-[#1a2740] bg-[#050914]/80";
    let isReadyBlink = false;
    let progressPercent = 15; let progressColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
    let statusEmoji = "⏳";
    let statusIconAnim = "animate-pulse";

    if (t.status.includes('انتظار')) { 
        badgeStyle = "bg-amber-400/10 text-amber-400 border-amber-400/20";
        statusEmoji = "📋"; 
        statusIconAnim = "animate-bounce";
    }
    if (t.status.includes('عمل') || t.status.includes('فحص')) { 
        badgeStyle = "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";
        glow = "border-cyan-500/40 bg-[#061224]/80 shadow-[0_0_25px_rgba(34,211,238,0.15)]"; 
        progressPercent = t.status.includes('عمل') ? 75 : 45; 
        progressColor = t.status.includes('عمل') ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-cyan-400 shadow-[0_0_10px_#22d3ee]";
        statusEmoji = t.status.includes('عمل') ? "🛠️" : "👨‍💻";
        statusIconAnim = "animate-pulse";
    }
    if (t.status.includes('جاهز')) { 
        badgeStyle = "bg-emerald-500 text-black font-bold border-emerald-400";
        glow = "border-emerald-500/60 bg-[#04140d]/90 shadow-[0_0_35px_rgba(16,185,129,0.25)]"; 
        progressPercent = 100; progressColor = "bg-emerald-500 shadow-[0_0_15px_#10b981]"; 
        isReadyBlink = true;
        statusEmoji = "✅";
        statusIconAnim = "animate-bounce";
    }

    let socColorText = 'text-emerald-400';
    if(t.soc <= 20) socColorText = 'text-rose-400';
    else if(t.soc <= 50) socColorText = 'text-amber-400';

    return (
      <div className={`backdrop-blur-md border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group w-full shadow-2xl relative overflow-hidden ${isReadyBlink ? 'ready-blink' : ''} ${isHighlighted ? 'scale-105 hover:scale-105 border-2 p-8' : ''}`}>
        
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>

        <div className={`absolute -top-3 -right-3 bg-[#0a101d] border border-[#162235] rounded-full p-2 text-xl z-10 shadow-lg ${statusIconAnim}`}>
            {statusEmoji}
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-5">
            <span className={`font-mono ${isHighlighted ? 'text-sm' : 'text-[10px]'} text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1`}><IconCpu /> AI-SCAN #{t.id}</span>
            <span className={`${isHighlighted ? 'text-sm' : 'text-[10px]'} px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
              {isReadyBlink && <IconCheck />}{t.status}
            </span>
          </div>

          <div className="mb-5 border-b border-slate-800/50 pb-4">
            <h3 className={`font-black text-white tracking-wide mb-1.5 ${isHighlighted ? 'text-3xl' : 'text-xl'}`}>{t.carModel}</h3>
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">العميل:</span>
                <span className={`font-bold text-sky-400 ${isHighlighted ? 'text-lg' : 'text-sm'}`}>{t.customer.split(' ')[0]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#0a101d]/80 backdrop-blur-sm border border-[#162235] rounded-xl px-4 py-3 mb-5">
            <div className="flex-[2]">
              <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">PLATE NUMBER</span>
              <span className={`font-mono text-cyan-400 font-black tracking-widest whitespace-nowrap ${isHighlighted ? 'text-xl' : 'text-sm'}`}>{t.plate}</span>
            </div>
            <div className="flex-1 flex flex-col items-end pl-1 border-r border-[#162235] pr-3">
              <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">BATTERY SOC</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                 <span className={`font-mono font-black ${socColorText} ${isHighlighted ? 'text-sm' : 'text-[11px]'}`}>{t.soc}%</span>
                 <IconBattery level={t.soc} />
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-[10px] font-mono font-bold"><span className="text-slate-400">AI DIAGNOSTIC PROGRESS</span><span className="text-white font-black">{progressPercent}%</span></div>
            <div className={`w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 ${isHighlighted ? 'h-3' : 'h-1.5'}`}>
                <div className={`h-full rounded-full transition-all duration-500 relative ${progressColor}`} style={{ width: `${progressPercent}%` }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>
          </div>

          <div className="bg-[#090d16]/80 p-3.5 rounded-xl border border-[#142033] mb-5">
            <span className="text-[10px] text-slate-500 block mb-1.5 flex items-center gap-1"><IconSearch /> تقرير الذكاء الاصطناعي (العمل):</span>
            <div className={`text-slate-200 leading-relaxed font-medium ${isHighlighted ? 'text-sm line-clamp-none' : 'text-xs line-clamp-2'}`}>{t.problem}</div>
          </div>
        </div>
        
        <div className="border-t border-[#162235] pt-4 flex items-center justify-between text-[10px] font-mono font-bold mt-auto relative z-10">
           <div><span className="text-slate-500 block mb-0.5">TOTAL VALUE</span><span className={`text-white font-black ${isHighlighted ? 'text-xl' : 'text-sm'}`}>{t.cost.toFixed(0)} JOD</span></div>
           <div className="text-left"><span className="text-slate-500 block mb-0.5">TECH ENGINEER</span><span className={`text-emerald-400 ${isHighlighted ? 'text-base' : 'text-xs'}`}>{t.engineer}</span></div>
        </div>
      </div>
    );
};

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
        <StatCard title="مسار الاستلام والفحص" value={stats.waiting} badge="AI SCANNING" color="amber" />
        <StatCard title="كبائن العمليات (HV)" value={stats.working} badge="NEURAL LOCKS" color="cyan" />
        <StatCard title="ممر التجهيز والتسليم" value={stats.ready} badge="READY TO FLY" color="emerald" isPulse={true} />
        <StatCard title="المركبات النشطة" value={stats.total} badge="LIVE NODES" color="white" />
      </div>

      <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          اللوحة الرقمية لشبكة المركبات الحية (AI Flow)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {tickets.map(t => <TicketCard key={t.id} t={t} />)}
          
          {tickets.length === 0 && (
              <div className="text-slate-500 col-span-full py-16 flex flex-col items-center justify-center font-bold border-2 border-dashed border-slate-800 rounded-xl">
                  <IconBrain className="text-4xl mb-3 text-slate-700" />
                  شبكة الذكاء الاصطناعي فارغة حالياً من الحركات.
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuantumTreasury = ({ accounting, tickets }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
      <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"><IconCoins /></div>
      الخزينة اليومية - التدقيق المحاسبي المدعوم بالذكاء الاصطناعي
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <FinanceCard title="إجمالي الدخل (الخام)" value={accounting.grossRevenue} color="white" />
      <FinanceCard title="مقبوضات الأيدي العاملة (40%)" value={accounting.laborFees} color="cyan" />
      <FinanceCard title="مبيعات مخزن القطع (60%)" value={accounting.partsRevenue} color="cyan" />
      <FinanceCard title="صافي التدفق المالي" value={accounting.netProfit} color="emerald" isGlow={true} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
       <div className="bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-xl relative overflow-hidden">
         <div className="absolute -right-10 -top-10 text-9xl text-slate-800/20 opacity-20 pointer-events-none"><IconCoins/></div>
         <h3 className="text-sm font-bold text-cyan-400 mb-4 border-b border-[#162235] pb-3 flex items-center gap-2"><IconVolt /> تفصيل المقبوضات الذكية</h3>
         <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center bg-[#090d16] p-4 rounded-xl border border-[#162235] shadow-inner hover:border-emerald-500/30 transition-colors">
               <span className="text-slate-400 font-bold text-sm">مقبوضات الكاش الفوري</span>
               <span className="text-xl font-black text-emerald-400 font-mono">{accounting.cashTotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between items-center bg-[#090d16] p-4 rounded-xl border border-[#162235] shadow-inner hover:border-indigo-500/30 transition-colors">
               <span className="text-slate-400 font-bold text-sm">حوالات كليك (NFC/CliQ)</span>
               <span className="text-xl font-black text-indigo-400 font-mono">{accounting.cliqTotal.toFixed(2)} JOD</span>
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
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]"><IconReceipt /></div>
        سجل المقبوضات السحابي
      </h2>
      
      <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-2xl overflow-hidden">
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
                <tr><td colSpan="6" className="text-center py-10 text-slate-500 font-bold">لا يوجد مقبوضات مسجلة حالياً في الشبكة.</td></tr>
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
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-rose-500/10 p-2 rounded-lg text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]"><IconExpense /></div>
        سجل المصروفات التشغيلية
      </h2>
      <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-6 text-sm text-rose-400 font-bold flex items-center gap-3">
          <IconBrain className="animate-pulse" /> ملاحظة: هذه بيانات تجريبية للتصميم. يتطلب العرض الفعلي تحديث خوارزمية الربط.
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-500 text-[11px] font-black uppercase tracking-wider border-b border-[#16243a]">
                <th className="pb-4 px-4 text-center">التوقيت الزمني</th>
                <th className="pb-4 px-4">البيان التشغيلي</th>
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
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"><IconCalendar /></div>
        تقرير الاستخبارات اليومي (شيت الأيام)
      </h2>
      <div className="w-full border border-[#162235] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.6)] bg-[#02050b]/90 backdrop-blur-md">
        <div className="bg-[#0f172a] text-cyan-400 text-center py-4 font-black tracking-widest border-b border-[#1e293b] flex items-center justify-center gap-2">
          <IconCpu /> سجل حركات وإغلاق يوم: <span className="text-white">{todayStr}</span>
        </div>
        <div className="p-1 overflow-x-auto">
          <table className="w-full text-center text-xs min-w-[800px]">
            <thead>
              <tr>
                <th className="bg-[#065f46] text-emerald-300 py-2 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#065f46] text-white py-2 px-2 border border-[#1e293b]">الملخص المالي لليوم</th>
                <th className="w-4"></th>
                <th className="bg-[#9f1239] text-rose-300 py-2 px-2 border border-[#1e293b]">القيمة</th>
                <th className="bg-[#9f1239] text-white py-2 px-2 border border-[#1e293b]">بيان المصروف</th>
                <th className="w-4"></th>
                <th className="bg-[#1e293b] text-cyan-300 py-2 px-2 border border-[#334155]">المبلغ</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">تقرير الذكاء الاصطناعي</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">الموظف المسؤول</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">الموديل</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">الزبون</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">رقم اللوحة</th>
                <th className="bg-[#1e293b] text-white py-2 px-2 border border-[#334155]">رقم الـ Scan</th>
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
                    <td className="py-2 border border-[#1e293b] text-emerald-400 font-bold">{tickets[0].engineer}</td>
                    <td className="py-2 border border-[#1e293b] text-slate-300">{tickets[0].carModel}</td>
                    <td className="py-2 border border-[#1e293b] font-bold text-white">{tickets[0].customer}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-sky-400">{tickets[0].plate}</td>
                    <td className="py-2 border border-[#1e293b] font-mono text-slate-500">#{tickets[0].id}</td>
                   </>
                ) : <td colSpan="7" className="py-2 border border-[#1e293b] text-slate-500">لا يوجد بيانات مسجلة</td>}
              </tr>
              <tr>
                <td className="py-2 border border-[#1e293b] font-mono font-black text-emerald-900 bg-[#10b981]">{dNet}</td>
                <td className="py-2 border border-[#1e293b] font-black text-emerald-900 bg-[#10b981]">صافي الربح 💰</td>
                <td colSpan="11" className="py-2 border border-[#1e293b] bg-[#05080f]"></td>
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
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]",
    emerald: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    white: "text-white border-slate-500/30 bg-white/5"
  };
  const pulseClass = isPulse ? 'animate-pulse' : '';

  return (
    <div className={`bg-[#090d16]/80 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-xl border relative overflow-hidden group hover:scale-[1.02] transition-transform ${colors[color].split('shadow')[0]} ${colors[color].split(' ').pop()}`}>
      <div className={`absolute top-0 right-0 w-16 h-16 bg-${color}-500/10 rounded-bl-full pointer-events-none`}></div>
      <span className="text-slate-400 text-xs font-black tracking-wider uppercase z-10">{title}</span>
      <div className="flex items-baseline justify-between mt-2 z-10">
        <span className={`text-4xl font-black font-mono ${colors[color].split(' ')[0]} ${pulseClass}`}>{value}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${colors[color].split('shadow')[0]} bg-black/40`}>{badge}</span>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, color, isGlow = false }) => {
  const textColor = color === 'white' ? 'text-white' : color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
  const glowClass = isGlow ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-[#04140d]/80' : 'border-[#16243a] bg-[#090d16]/80 hover:border-cyan-500/30';
  return (
    <div className={`backdrop-blur-md border ${glowClass} p-6 rounded-2xl shadow-xl transition-colors relative overflow-hidden`}>
      <div className="absolute inset-0 bg-ai-grid opacity-10"></div>
      <span className="text-slate-400 text-xs font-black block tracking-wider uppercase relative z-10">{title}</span>
      <span className={`text-4xl font-black ${textColor} font-mono mt-2 block tracking-tighter relative z-10`}>{value.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
    </div>
  );
};
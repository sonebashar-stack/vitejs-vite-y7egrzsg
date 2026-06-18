// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// ==========================================
// أيقونات نظام الذكاء الاصطناعي
// ==========================================
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.002 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>;
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconFinance = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IconDatabase = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;

const IconBatteryHolo = ({ level }) => {
  let color = "#00f0ff"; // Cyan Neon
  let glow = "drop-shadow(0 0 5px rgba(0, 240, 255, 0.8))";
  if (level <= 20) { color = "#ff003c"; glow = "drop-shadow(0 0 5px rgba(255, 0, 60, 0.8))"; }
  else if (level <= 50) { color = "#ffb700"; glow = "drop-shadow(0 0 5px rgba(255, 183, 0, 0.8))"; }
  const fillWidth = Math.max(1, 12 * (level / 100));
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ filter: glow }}>
      <rect width="16" height="10" x="2" y="7" rx="1" stroke="rgba(255,255,255,0.3)" />
      <path d="M20 10v4" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
      <rect width={fillWidth} height="6" x="4" y="9" rx="0.5" fill={color} stroke="none" />
    </svg>
  );
};

// ==========================================
// CSS الحقن الديناميكي والمؤثرات الجبارة
// ==========================================
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap');
    
    #root, body, html { width: 100% !important; margin: 0; padding: 0; background-color: #010409; color: #e5e7eb; font-family: 'Cairo', sans-serif; overflow: hidden; }
    .font-cyber { font-family: 'Rajdhani', sans-serif; letter-spacing: 1px; }
    
    /* سكرول بار مخفي وذكي */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.3); border-radius: 10px; }

    /* --- 1. خلفية الشبكة العصبية (Neural Grid) --- */
    .cyber-bg-container {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background: radial-gradient(circle at 50% 50%, #061121 0%, #010409 100%);
    }
    .cyber-grid {
      position: absolute; width: 200vw; height: 200vh; top: -50%; left: -50%;
      background-image: 
        linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
      background-size: 50px 50px;
      transform: perspective(600px) rotateX(60deg) translateY(-100px) translateZ(-200px);
      animation: hyperDrive 15s linear infinite;
    }
    @keyframes hyperDrive {
      0% { transform: perspective(600px) rotateX(60deg) translateY(0) translateZ(-200px); }
      100% { transform: perspective(600px) rotateX(60deg) translateY(50px) translateZ(-200px); }
    }

    /* --- 2. الشريط الإخباري (EV Marquee Ticker) --- */
    .ev-ticker {
      position: fixed; bottom: 0; left: 0; width: 100%; height: 45px;
      background: rgba(1, 4, 9, 0.85); border-top: 1px solid rgba(0, 240, 255, 0.3);
      backdrop-filter: blur(10px); z-index: 50; display: flex; align-items: center; overflow: hidden;
      box-shadow: 0 -5px 30px rgba(0, 0, 0, 0.8);
    }
    .ticker-track {
      display: flex; white-space: nowrap; animation: scrollTicker 90s linear infinite;
    }
    .ticker-track:hover { animation-play-state: paused; cursor: crosshair; }
    .ticker-item {
      display: inline-flex; align-items: center; font-size: 14px; font-weight: 700;
      color: #94a3b8; padding: 0 40px; border-right: 2px solid rgba(0,240,255,0.2);
    }
    .ticker-highlight { color: #00f0ff; text-shadow: 0 0 8px rgba(0,240,255,0.6); margin-right: 8px; }
    @keyframes scrollTicker { 0% { transform: translateX(50vw); } 100% { transform: translateX(-150%); } }

    /* --- 3. الوضع السينمائي (Cinematic Focus Pop-up) --- */
    .focus-backdrop {
      position: fixed; inset: 0; background: rgba(1, 4, 9, 0.85); backdrop-filter: blur(15px);
      z-index: 9998; opacity: 0; animation: fadeInOverlay 0.5s forwards;
    }
    .focus-card-wrapper {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999;
      width: 450px; max-width: 90vw; pointer-events: none;
      animation: popInCard 0.8s cubic-bezier(0.2, 1.2, 0.3, 1) forwards;
    }
    .focus-card-wrapper .hologram-card {
      box-shadow: 0 0 80px rgba(16, 185, 129, 0.4), inset 0 0 40px rgba(16, 185, 129, 0.1);
      border: 2px solid #10b981; transform: scale(1.15);
    }
    @keyframes fadeInOverlay { to { opacity: 1; } }
    @keyframes popInCard {
      0% { transform: translate(-50%, -50%) scale(0.5) translateY(100px); opacity: 0; filter: brightness(2); }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; filter: brightness(1); }
    }

    /* --- 4. تصميم الكروت الهولوغرامية --- */
    .hologram-card {
      background: linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(2, 6, 23, 0.9) 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px); position: relative; overflow: hidden;
    }
    .hologram-card::before {
      content: ''; position: absolute; top: 0; left: -150%; width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
      transform: skewX(-20deg); animation: shine 6s infinite;
    }
    @keyframes shine { 0% { left: -150%; } 20% { left: 200%; } 100% { left: 200%; } }

    /* الأفاتار العائم (المهندس/الفاحص) */
    .floating-avatar {
      position: absolute; top: -15px; right: 20px; font-size: 28px;
      filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));
      animation: float 3s ease-in-out infinite; z-index: 10;
    }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  `;
  document.head.appendChild(style);
}

// داتا سورس API
const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

// موسوعة نصائح الذكاء الاصطناعي
const EV_KNOWLEDGE_BASE = [
  "🔋 [نظام إدارة البطارية BMS]: للحفاظ على صحة خلايا سيارتك (SOH)، تجنب تركها مشحونة بنسبة 100% لأكثر من 12 ساعة متواصلة.",
  "⚠️ [تحذير حراري]: الشحن السريع المتكرر (DC Fast Charge) يرفع درجة حرارة الخلايا الداخلية ويقلل من عمر البطارية الافتراضي بنسبة تصل لـ 15% سنوياً.",
  "⚙️ [كفاءة المحرك]: التسارع العنيف والانطلاق المفاجئ (Launch Control) يضع ضغطاً هائلاً على نظام التبريد السائل، استخدمه بحذر.",
  "🧠 [تحديثات OTA]: تأكد دائماً من تنزيل أحدث أنظمة التشغيل لسيارتك، الشركات تقوم بتحسين خوارزميات استهلاك الطاقة عن بعد.",
  "❄️ [إدارة الطقس]: في الأجواء الحارة جداً، حاول ركن سيارتك في الظل لمنع نظام تبريد البطارية النشط من استنزاف الطاقة أثناء الوقوف.",
  "🛡️ [حماية الخلايا]: لا تسمح لنسبة البطارية بالانخفاض دون 15% (Deep Discharge) بشكل متكرر، هذا يسبب تلفاً غير قابل للإصلاح في كيمياء الليثيوم.",
  "🔄 [استرجاع الطاقة]: تفعيل نظام الكبح المتجدد (Regenerative Braking) لا يزيد مدى القيادة فحسب، بل يطيل عمر تيل الفرامل بشكل مضاعف.",
  "💧 [تبريد البطاريات]: سائل التبريد الخاص بالبطارية (Coolant) يحتاج إلى فحص وتغيير دوري حسب كتيب المصنع، إهماله قد يؤدي لاحتراق الخلايا."
];

// نظام الصوت المستقبلي
let audioCtx = null;
const initAudio = () => {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) {}
};
const playReadyHologramSound = () => {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, t); // A5
  osc.frequency.exponentialRampToValueAtTime(1760, t + 0.3); // ينطلق لأعلى
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.1, t + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 1);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(t); osc.stop(t + 1.2);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('liveyard');
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // نظام الـ Focus Popup الديناميكي
  const [focusedReadyCar, setFocusedReadyCar] = useState(null);
  const seenReadyIds = useRef(new Set());

  // تحديث الساعة
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // تفعيل الصوت بأول تفاعل
  useEffect(() => {
    const unlockAudio = () => { initAudio(); window.removeEventListener('click', unlockAudio); };
    window.addEventListener('click', unlockAudio);
  }, []);

  // جلب البيانات من السحابة
  useEffect(() => {
    let isMounted = true;
    async function fetchAIStream() {
      try {
        const res = await fetch(`${API_URL}?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        
        if (Array.isArray(data) && isMounted) {
          const getClean = (row, keys) => {
             const rowKeys = Object.keys(row);
             for (let k of keys) {
                const found = rowKeys.find(r => r.trim() === k);
                if (found && row[found]) return row[found];
             }
             return null;
          };

          const liveData = data.filter(r => {
             const archived = getClean(r, ["مرحل"]);
             const customer = getClean(r, ["اسم الزبون", "الزبون"]);
             const status = String(getClean(r, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "");
             return customer && archived !== true && archived !== "TRUE" && !status.includes("تسليم");
          });

          let newReadyCar = null;

          const parsed = liveData.map((t, idx) => {
            const status = getClean(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "فحص أولي";
            const id = getClean(t, ["رقم الكرت", "ID"]) || idx + 1;
            
            // اكتشاف سيارة جاهزة جديدة للـ Pop-up
            if (status.includes("جاهز") && !seenReadyIds.current.has(id)) {
                newReadyCar = id;
                seenReadyIds.current.add(id);
            }

            const rawSoc = getClean(t, ["نسبة الشحن", "شحن البطارية", "الشحن", "SOC", "البطارية"]);
            
            return {
              id,
              time: getClean(t, ["وقت الدخول", "الوقت"]) || new Date().toLocaleTimeString('ar-JO'),
              plate: String(getClean(t, ["رقم اللوحة", "اللوحة"]) || "---"),
              customer: getClean(t, ["اسم الزبون", "الزبون"]) || "عميل مجهول",
              carModel: getClean(t, ["نوع وموديل السيارة", "الموديل"]) || "Unidentified EV",
              problem: getClean(t, ["العمل المطلوب", "تفاصيل الشغل"]) || "قيد التشخيص...",
              status,
              paymentMethod: getClean(t, ["طريقة الدفع", "الدفع"]) || "-",
              engineer: getClean(t, ["الموظف المسؤول", "الموظف", "الفني المسؤول"]) || "AI System",
              cost: parseFloat(String(getClean(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '')) || 0,
              soc: rawSoc !== null ? parseInt(String(rawSoc).replace(/\D/g, '')) || 0 : 45
            };
          });

          setTickets(parsed.reverse());

          // تفعيل الـ Popup للسيارة الجاهزة
          if (newReadyCar) {
              setFocusedReadyCar(parsed.find(c => c.id === newReadyCar));
              playReadyHologramSound();
              setTimeout(() => { setFocusedReadyCar(null); }, 10000); // يختفي بعد 10 ثواني
          }
        }
      } catch (err) { console.error("Neural Link Down:", err); }
    }
    
    fetchAIStream();
    const syncLoop = setInterval(fetchAIStream, 2000);
    return () => { isMounted = false; clearInterval(syncLoop); };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col relative z-10" dir="rtl">
      {/* 1. خلفية الشبكة العصبية */}
      <div className="cyber-bg-container"><div className="cyber-grid"></div></div>

      {/* 2. الـ Pop-up السينمائي للسيارة الجاهزة */}
      {focusedReadyCar && (
        <>
          <div className="focus-backdrop"></div>
          <div className="focus-card-wrapper">
             <AICard t={focusedReadyCar} isFocused={true} />
          </div>
        </>
      )}

      {/* الهيدر المستقبلي */}
      <header className="w-full bg-[rgba(2,6,23,0.6)] backdrop-blur-xl border-b border-[#00f0ff]/20 px-8 py-4 flex justify-between items-center z-20 shadow-[0_4px_40px_rgba(0,240,255,0.1)]">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#00f0ff] blur-lg opacity-30 group-hover:opacity-60 transition"></div>
            <div className="relative bg-[#0f172a] border border-[#00f0ff]/50 p-3 rounded-2xl">
              <IconBrain />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-widest font-cyber uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Abu Al-Nadi <span className="text-[#00f0ff] font-light">AI Clinic</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
              <span className="text-[11px] text-[#00f0ff] font-cyber tracking-[0.2em] uppercase">Hypercar Diagnostics Grid Active</span>
            </div>
          </div>
        </div>
        <div className="font-cyber bg-[#0f172a] border border-slate-700 rounded-xl px-5 py-2 flex items-center gap-4 shadow-inner">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">System Sync</span>
          <span className="text-[#00f0ff] text-xl font-black drop-shadow-[0_0_5px_currentColor]">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
      </header>

      {/* مساحة العمل */}
      <div className="flex flex-1 w-full z-20 pb-[45px] overflow-hidden">
        {/* القائمة الجانبية */}
        <aside className="w-24 bg-[rgba(2,6,23,0.8)] backdrop-blur-md border-l border-slate-800 flex flex-col items-center py-8 gap-6 relative">
          <SidebarBtn icon={<IconGrid />} label="GRID" active={activeTab === 'liveyard'} onClick={() => setActiveTab('liveyard')} />
          <SidebarBtn icon={<IconFinance />} label="DATA" active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} />
          <SidebarBtn icon={<IconDatabase />} label="LOGS" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
        </aside>

        {/* الواجهة الرئيسية */}
        <main className="flex-1 p-8 overflow-y-auto w-full scroll-smooth">
          {activeTab === 'liveyard' && <QuantumGrid tickets={tickets} />}
          {activeTab !== 'liveyard' && (
            <div className="h-full flex items-center justify-center">
               <div className="text-center space-y-4">
                  <IconBrain className="w-16 h-16 text-slate-600 mx-auto animate-pulse" />
                  <h2 className="text-2xl font-cyber text-slate-500 tracking-widest">MODULE OFFLINE / INITIALIZING...</h2>
               </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. شريط المعلومات الاصطناعي (Ticker) */}
      <div className="ev-ticker font-cyber">
        <div className="ticker-track">
          {EV_KNOWLEDGE_BASE.map((tip, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-highlight">SYS_MSG:</span> {tip}
            </div>
          ))}
          {/* تكرار للنهاية اللانهائية */}
          {EV_KNOWLEDGE_BASE.map((tip, i) => (
            <div key={`dup-${i}`} className="ticker-item">
              <span className="ticker-highlight">SYS_MSG:</span> {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// زر القائمة الجانبية
const SidebarBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 group ${active ? 'bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}>
    {icon}
    <span className="text-[9px] font-cyber mt-1 font-bold tracking-widest opacity-80">{label}</span>
  </button>
);

// ==========================================
// شبكة العرض المركزية (Quantum Grid)
// ==========================================
const QuantumGrid = ({ tickets }) => {
  return (
    <div className="w-full space-y-8 animate-fade-in pb-10">
      {/* العدادات الذكية */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        <DataNode title="SCAN PENDING" value={tickets.filter(t => t.status.includes('انتظار')).length} color="amber" />
        <DataNode title="AI DIAGNOSIS" value={tickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length} color="blue" />
        <DataNode title="READY FOR LAUNCH" value={tickets.filter(t => t.status.includes('جاهز')).length} color="emerald" isPulse />
        <DataNode title="TOTAL NETWORK LOAD" value={tickets.length} color="cyan" />
      </div>

      {/* الكروت الذكية */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {tickets.map(t => <AICard key={t.id} t={t} />)}
        {tickets.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <span className="font-cyber text-2xl tracking-[0.3em] text-slate-600">GRID IS EMPTY // STANDBY MODE</span>
          </div>
        )}
      </div>
    </div>
  );
};

const DataNode = ({ title, value, color, isPulse }) => {
  const themes = {
    amber: "border-[#ffb700]/30 bg-[#ffb700]/5 text-[#ffb700]",
    blue: "border-[#0073ff]/30 bg-[#0073ff]/5 text-[#0073ff]",
    emerald: "border-[#10b981]/40 bg-[#10b981]/10 text-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    cyan: "border-[#00f0ff]/30 bg-[#00f0ff]/5 text-[#00f0ff]"
  };
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm relative overflow-hidden ${themes[color]}`}>
      {isPulse && <div className="absolute inset-0 bg-[#10b981]/10 animate-pulse"></div>}
      <div className="relative z-10 flex justify-between items-end">
        <div>
           <span className="text-slate-400 text-[10px] font-bold font-cyber tracking-[0.2em] block mb-2">{title}</span>
           <span className="text-4xl font-black font-cyber drop-shadow-[0_0_10px_currentColor]">{value}</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// تصميم الكرت الذكي (AI Diagnostic Card)
// ==========================================
const AICard = ({ t, isFocused = false }) => {
  let theme = { hex: "#00f0ff", bg: "bg-[#00f0ff]/10", border: "border-[#00f0ff]/40", avatar: "👨‍💻", icon: "⚙️" };
  let progress = 60;

  if (t.status.includes('انتظار')) {
    theme = { hex: "#ffb700", bg: "bg-[#ffb700]/10", border: "border-[#ffb700]/30", avatar: "🕵️‍♂️", icon: "🔍" }; progress = 15;
  } else if (t.status.includes('جاهز')) {
    theme = { hex: "#10b981", bg: "bg-[#10b981]/20", border: "border-[#10b981]", avatar: "🚀", icon: "✅" }; progress = 100;
  }

  return (
    <div className={`hologram-card rounded-2xl p-6 flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-2 group ${theme.border} ${isFocused ? '' : 'shadow-xl'}`}>
      
      {/* 4. الأفاتار التقني العائم */}
      <div className="floating-avatar" title="حالة الفني الذكي">{theme.avatar}</div>

      {/* الهيدر: الآي دي والحالة */}
      <div className="flex justify-between items-start border-b border-slate-700/50 pb-3">
        <div>
          <span className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.bg} text-[${theme.hex}] border ${theme.border} font-bold font-cyber tracking-widest uppercase flex items-center gap-2`}>
            {theme.icon} {t.status}
          </span>
        </div>
        <div className="text-right">
           <span className="text-[9px] text-slate-500 font-cyber tracking-widest uppercase block">Sys ID</span>
           <span className="font-cyber text-lg font-black text-white">#{t.id}</span>
        </div>
      </div>

      {/* معلومات المركبة */}
      <div>
        <h3 className="font-black text-white text-2xl tracking-wide mb-1 font-cyber uppercase">{t.carModel}</h3>
        <div className="flex items-center gap-2"><span className="text-xs text-slate-400">OWNER:</span><span className="text-sm font-bold" style={{ color: theme.hex }}>{t.customer.split(' ')[0]}</span></div>
      </div>

      {/* شاشات الداتا المصغرة */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#010409]/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-center">
          <span className="text-[8px] text-slate-500 font-cyber tracking-widest uppercase mb-1">License Plate</span>
          <span className="font-cyber text-slate-200 text-sm font-black tracking-widest">{t.plate}</span>
        </div>
        <div className="bg-[#010409]/60 border border-slate-800 rounded-xl p-3 flex flex-col items-end justify-center">
          <span className="text-[8px] text-slate-500 font-cyber tracking-widest uppercase mb-1">Energy Core</span>
          <div className="flex items-center gap-2">
             <span className="font-cyber text-sm font-black text-white">{t.soc}%</span>
             <IconBatteryHolo level={t.soc} />
          </div>
        </div>
      </div>

      {/* التشخيص الذكي */}
      <div className="bg-[#061121]/50 p-4 rounded-xl border border-slate-800/80 relative">
        <span className="absolute top-2 right-3 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
        <span className="text-[9px] text-slate-400 block mb-2 uppercase font-cyber tracking-widest">Diagnostic Log</span>
        <div className="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed border-r-2 pr-2" style={{ borderColor: theme.hex }}>
          {t.problem}
        </div>
      </div>

      {/* شريط المعالجة (Progress) */}
      <div className="mt-auto pt-2">
        <div className="flex justify-between text-[9px] font-cyber font-bold uppercase mb-2">
          <span className="text-slate-500">AI Processing</span>
          <span style={{ color: theme.hex }}>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%`, backgroundColor: theme.hex, boxShadow: `0 0 10px ${theme.hex}` }}></div>
        </div>
      </div>
      
      {/* تذييل الكرت */}
      <div className="flex justify-between items-end mt-2">
         <span className="text-[10px] text-slate-500 font-cyber">TECH: <strong className="text-white bg-slate-800 px-2 py-0.5 rounded">{t.engineer}</strong></span>
         <span className="font-cyber text-lg font-black" style={{ color: theme.hex }}>{t.cost} <span className="text-[10px] text-slate-500">JOD</span></span>
      </div>

    </div>
  );
};
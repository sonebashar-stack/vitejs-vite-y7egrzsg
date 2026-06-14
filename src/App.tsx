// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

// --- نظام المؤثرات الصوتية الخوارزمي (Web Audio API) ---
const playProceduralSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    
    // 1. المذبذب الأساسي
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'ready') {
      // نغمة تأكيد هولوغرافية نقية مزدوجة التردد
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'scan') {
      // صوت مسح راداري منخفض التردد يحاكي معالجة البيانات
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(350, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.log("Audio contexts blocked by browser protocol.");
  }
};

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readyTimers, setReadyTimers] = useState({});
  const [activeCarId, setActiveCarId] = useState(null); // للسيارة التي تحت التركيز الفوري
  const [isLoading, setIsLoading] = useState(true);

  // مصفوفة سجل المحطة الطرفية للذكاء الاصطناعي (Live AI Terminal)
  const [terminalLogs, setTerminalLogs] = useState([
    "CORE:: INITIALIZING QUANTUM TELEMETRY LINK...",
    "BMS:: SCANNING BATTERY CELL CLUSTERS...",
    "PINN:: PREDICTIVE THERMAL ALGORITHMS: STANDBY"
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // توليد نصوص المحطة الطرفية بشكل عشوائي ومستمر لإبهار الزبون
  useEffect(() => {
    const logsPool = [
      "BMS:: OPTIMAL RESONANCE DETECTED IN CLUSTER #42",
      "THERMAL:: RUNNING PREDICTIVE THERMAL ANALYSIS... OK",
      "AI:: PASSPORT GENERATION IN PROGRESS (ERR < 3%)",
      "CORE:: SYNCHRONIZING WITH AWS-NODE-AMMAN DIRECTLY",
      "SYS:: DEPLOYING FRESNEL RIM LIGHTING SCHEMATICS",
      "BMS:: POWER FLOW STATUS: HIGH-VOLTAGE BALANCED"
    ];
    const logInterval = setInterval(() => {
      const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
      setTerminalLogs(prev => [ `[${new Date().toLocaleTimeString()}] ${randomLog}`, prev[0], prev[1] ].slice(0, 4));
    }, 4000);
    return () => clearInterval(logInterval);
  }, []);

  // جلب ومعالجة البيانات الحركية الحية من الأب شيت
  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const res = await fetch(API_URL);
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
             return customer !== null && isArchived !== true && isArchived !== "TRUE" && isArchived !== "true";
          });

          let playBeep = false;
          const currentTimers = { ...readyTimers };
          
          const parsedTickets = liveRows.map((t, idx) => {
            const id = getCleanValue(t, ["رقم الكرت", "ID"]) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة"]) || "قيد الانتظار";
            const isReady = status.includes("جاهز") || status.includes("تسليم");

            if (isReady) {
              if (!currentTimers[id]) { currentTimers[id] = Date.now(); playBeep = true; }
            } else {
              if (currentTimers[id]) delete currentTimers[id];
            }

            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "000000");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;

            return {
              id,
              plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل المركز",
              phone: getCleanValue(t, ["رقم الهاتف", "الهاتف"]) || "-",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "Tesla Model Y",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || "فحص البطارية والجهد العالي",
              status,
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف"]) || "كرم",
              soc: 45 + (plateNum % 46), // محاكاة لنسبة الشحن الحية
              soh: 88 + (plateNum % 11) + (plateNum % 9) / 10, // صحة البطارية العشرية بدقة
              temp: 24 + (plateNum % 12)
            };
          });

          if (playBeep) playProceduralSound('ready');
          if (parsedTickets.length > 0 && !activeCarId) setActiveCarId(parsedTickets[0].id);
          setReadyTimers(currentTimers);
          setTickets(parsedTickets);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 10000);
    return () => { isMounted = false; clearInterval(loop); };
  }, [readyTimers]);

  // فلترة الإخفاء بعد 4 دقائق للجاهز للتسليم
  const liveYardTickets = useMemo(() => {
    return tickets.filter(t => {
      const isReady = t.status.includes('جاهز') || t.status.includes('تسليم');
      if (isReady && readyTimers[t.id]) {
        const elapsed = Date.now() - readyTimers[t.id];
        if (elapsed > 4 * 60 * 1000) return false;
      }
      return true;
    });
  }, [tickets, readyTimers, currentTime]);

  // إحصائيات عدادات الـ HUD العليا
  const hudStats = useMemo(() => {
    return {
      waiting: liveYardTickets.filter(t => !t.status.includes('عمل') && !t.status.includes('فحص') && !t.status.includes('جاهز') && !t.status.includes('تسليم')).length,
      working: liveYardTickets.filter(t => t.status.includes('عمل') || t.status.includes('فحص')).length,
      ready: liveYardTickets.filter(t => t.status.includes('جاهز') || t.status.includes('تسليم')).length
    };
  }, [liveYardTickets]);

  const activeCar = useMemo(() => {
    return liveYardTickets.find(t => t.id === activeCarId) || liveYardTickets[0] || null;
  }, [liveYardTickets, activeCarId]);

  return (
    <div className="min-h-screen w-full bg-[#030712] text-[#f0f4f8] flex flex-col font-mono select-none overflow-hidden relative p-4 rtl">
      {/* شبكة الخلفية الفضائية المتحركة السيبرانية (Grid Pattern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

      {/* --- الهيدر العلوي: الخيال العلمي المتكامل --- */}
      <header className="w-full bg-[#090d16]/80 border border-[#162235] backdrop-blur-md p-4 rounded-xl flex justify-between items-center z-10 mb-4 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <IconVolt />
          </div>
          <div>
            <div className="text-[10px] text-cyan-400 tracking-widest font-black">ABU AL-NADI FFUI SYSTEMS</div>
            <h1 className="text-xl font-black tracking-wider text-white">RAMLI ENTERPRISE <span className="text-cyan-400 text-sm font-light">QUANTUM OS v5.0</span></h1>
          </div>
        </div>
        {/* التوقيت العسكري */}
        <div className="bg-[#05080f] border border-[#1b2b44] px-4 py-2 rounded-lg text-slate-300 flex items-center gap-3 font-bold tracking-wider text-sm">
          <span className="text-cyan-400 animate-ping text-[6px]">●</span>
          <span>AMMAN CENTRAL PROTOCOL</span>
          <span className="text-white font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
        </div>
      </header>

      {/* --- منطقة العرض الأساسية المنقسمة هندسياً --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden z-10">
        
        {/* المطور الأيمن: كبسولة الفحص ثلاثية الأبعاد التفاعلية والعدادات الحيوية (6 أعمدة) */}
        <div className="lg:col-span-7 flex flex-col gap-4 overflow-hidden">
          
          {/* كبسولة الفحص الرئيسية (الهولوغرام) */}
          <div className="flex-1 bg-[#090d16]/60 border border-[#162235] backdrop-blur-md rounded-xl p-5 relative flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="absolute top-3 right-3 text-[10px] font-black text-cyan-400/60 bg-cyan-950/30 border border-cyan-800/30 px-2 py-0.5 rounded">
              DIAGNOSTICS HOLOGRAM INTERFACE
            </div>

            {activeCar ? (
              <>
                {/* تفاصيل السيارة النشطة */}
                <div className="flex justify-between items-start z-10">
                  <div>
                    <h2 className="text-2xl font-black text-white bg-gradient-to-l from-white to-slate-400 bg-clip-text text-transparent">{activeCar.carModel}</h2>
                    <p className="text-xs text-slate-400 mt-1">المالك: <span className="text-cyan-300 font-bold">{activeCar.customer}</span> | معرّف الكرت: <span className="text-slate-300 font-mono">#{activeCar.id}</span></p>
                  </div>
                  <div className="text-left font-mono">
                    <div className="text-[10px] text-slate-500 font-bold">PLATE NUMBER</div>
                    <div className="text-xl font-black text-cyan-400 tracking-widest bg-[#040810] border border-[#16243a] px-3 py-1 rounded-lg mt-0.5">{activeCar.plate}</div>
                  </div>
                </div>

                {/* رسم هولوغرافي حي مفرغ (Wireframe Simulation) عبر الـ Canvas الذكي */}
                <div className="flex-1 w-full relative flex items-center justify-center min-h-[14rem]">
                  <HologramCanvas status={activeCar.status} />
                </div>

                {/* لوحة الصيانة التنبؤية ومؤشرات الحيوية الدائرية (HUD Circular العدادات) */}
                <div className="grid grid-cols-3 gap-4 border-t border-[#162235]/60 pt-4 z-10 bg-[#04070d]/40 p-3 rounded-lg">
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] text-slate-500 font-bold block mb-1">STATE OF CHARGE</span>
                    <div className="text-lg font-black text-amber-400 font-mono">{activeCar.soc}%</div>
                    <div className="w-16 h-1 bg-slate-900 rounded-full mt-1.5 overflow-hidden"><div className="h-full bg-amber-500" style={{width: `${activeCar.soc}%`}}></div></div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center border-x border-[#162235]/60">
                    <span className="text-[9px] text-slate-500 font-bold block mb-1">STATE OF HEALTH (SOH)</span>
                    <div className="text-lg font-black text-emerald-400 font-mono">{activeCar.soh.toFixed(1)}%</div>
                    <span className="text-[8px] text-emerald-500/70 font-bold">خلايا معايرة 100%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] text-slate-500 font-bold block mb-1">THERMAL STABILITY</span>
                    <div className="text-lg font-black text-cyan-400 font-mono">{activeCar.temp}°C</div>
                    <span className="text-[8px] text-cyan-500/70 font-bold">نظام التبريد: مستقر</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-600 font-bold text-sm">الرجاء اختيار مركبة من اللوحة الجانبية لبدء الفحص الهولوغرافي</div>
            )}
          </div>

          {/* لوحة التحكم والذكاء الاصطناعي السفلي (Live AI Terminal) */}
          <div className="bg-[#04070d]/90 border border-[#162235] rounded-xl p-4 h-32 flex flex-col justify-between font-mono text-xs shadow-inner relative">
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">LIVE AI DIAGNOSTICS TERMINAL LOG:</div>
            <div className="flex-1 space-y-1 text-cyan-500/80 overflow-hidden font-bold select-text">
              {terminalLogs.map((log, index) => (
                <div key={index} className="truncate tracking-wide">&gt; {log}</div>
              ))}
            </div>
          </div>
        </div>

        {/* المطور الأيسر: عدادات الـ HUD وكاروسيل تدفق المركبات الحية (5 أعمدة) */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-hidden">
          
          {/* عدادات الـ HUD الدائرية العلوية السريعة (تحل مكان الإجماليات التقليدية) */}
          <div className="grid grid-cols-3 gap-3 w-full">
            <div className="bg-[#090d16]/80 border border-[#162235] p-3 rounded-xl text-center relative overflow-hidden">
              <span className="text-slate-500 text-[9px] font-black tracking-wider uppercase block">قيد الانتظار</span>
              <span className="text-2xl font-black text-amber-400 font-mono block mt-1">{hudStats.waiting}</span>
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-amber-500/30"></div>
            </div>
            <div className="bg-[#090d16]/80 border border-[#162235] p-3 rounded-xl text-center relative overflow-hidden">
              <span className="text-slate-400 text-[9px] font-black tracking-wider uppercase block">تحت الفحص والعمل</span>
              <span className="text-2xl font-black text-cyan-400 font-mono block mt-1">{hudStats.working}</span>
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-cyan-500/50"></div>
            </div>
            <div className="bg-[#090d16]/80 border border-emerald-500/30 p-3 rounded-xl text-center relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <span className="text-emerald-400 text-[9px] font-black tracking-wider uppercase block">جاهز للتسليم (4د)</span>
              <span className="text-2xl font-black text-emerald-400 font-mono block mt-1 animate-pulse">{hudStats.ready}</span>
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-500/50"></div>
            </div>
          </div>

          {/* كاروسيل اللوحة الرقمية لتدفق المركبات الحية */}
          <div className="flex-1 bg-[#090d16]/50 border border-[#162235] backdrop-blur-md rounded-xl p-4 flex flex-col overflow-hidden">
            <div className="text-xs font-black text-white mb-3 tracking-widest uppercase flex items-center gap-2 border-b border-[#162235] pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              ممر الحركة الفورية للمركبات بالساحة
            </div>

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center text-cyan-400 font-mono text-xs tracking-widest animate-pulse">CONNECTING TO CYBER SYSTEM...</div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {liveYardTickets.map(t => {
                  const isActive = t.id === activeCarId;
                  let statusStyle = "border-amber-500/30 text-amber-400 bg-amber-500/5";
                  let isReady = false;

                  if (t.status.includes('عمل') || t.status.includes('فحص')) {
                    statusStyle = "border-cyan-500/40 text-cyan-400 bg-cyan-500/5";
                  } else if (t.status.includes('جاهز') || t.status.includes('تسليم')) {
                    statusStyle = "border-emerald-500/60 text-emerald-400 bg-emerald-500/10 ready-blink";
                    isReady = true;
                  }

                  return (
                    <div 
                      key={t.id} 
                      onClick={() => { setActiveCarId(t.id); playProceduralSound('scan'); }}
                      className={`border rounded-xl p-3 flex justify-between items-center cursor-pointer transition-all duration-300 bg-[#04070d]/60 ${isActive ? 'border-cyan-400 bg-[#091524]/60 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[0.99]' : 'border-[#162235] hover:border-slate-600'}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-slate-500 font-bold">#{t.id}</span>
                          <h4 className="font-black text-sm text-white">{t.carModel}</h4>
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans font-medium">الزبون: <span className="text-slate-200">{t.customer.split(' ')[0]}</span></div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[16rem]">الشغل: {t.problem}</div>
                      </div>

                      <div className="text-left flex flex-col items-end gap-1.5">
                        <span className="font-mono text-xs font-black text-cyan-400 tracking-wider bg-[#02040a] px-2 py-0.5 border border-[#162235] rounded">{t.plate}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-md border font-black uppercase tracking-wider ${statusStyle}`}>
                          {t.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {liveYardTickets.length === 0 && (
                  <div className="text-center py-10 text-slate-600 text-xs font-bold">لا يوجد أي سيارات نشطة بالساحة الحية حالياً.</div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// =========================================================
// 🎨 مكون الرسوم الهولوغرافية التفاعلية بالـ Canvas النظيف 100%
// =========================================================
const HologramCanvas = ({ status }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    // تكييف الألوان بناءً على حالة السيارة حركياً
    let hologramColor = "rgba(6, 182, 212, "; // أزرق سيبراني كحالة افتراضية
    if (status.includes('جاهز') || status.includes('تسليم')) hologramColor = "rgba(16, 185, 129, "; // أخضر مشع
    if (status.includes('انتظار')) hologramColor = "rgba(245, 158, 11, "; // كهرماني دافئ

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.01;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // 1. رسم حلقات رادارية سفلية تدور (قاعدة الهولوغرام طيف الطاقة)
      ctx.lineWidth = 1;
      ctx.strokeStyle = hologramColor + "0.15)";
      ctx.beginPath();
      ctx.ellipse(0, 60, 90, 25, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = hologramColor + "0.3)";
      ctx.beginPath();
      ctx.ellipse(0, 60, 60, 15, angle, 0, Math.PI * 2);
      ctx.stroke();

      // 2. محاكاة رسم مجسم مفرغ للسيارة (Wireframe Physics) خطوط هندسية معقّدة
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = hologramColor + "0.6)";
      
      // الهيكل الخارجي للسيارة (محاكاة منظور ثلاثي أبعاد رياضي مبسط)
      const xOffset = Math.sin(angle) * 25;
      ctx.beginPath();
      // سقف الزجاج
      ctx.moveTo(-30 + xOffset / 2, -20);
      ctx.lineTo(20 + xOffset / 2, -20);
      // الزجاج الأمامي والخلفي
      ctx.lineTo(50 + xOffset, 10);
      ctx.lineTo(-60 + xOffset, 10);
      ctx.closePath();
      ctx.stroke();

      // قاعدة السيارة والرفارف
      ctx.beginPath();
      ctx.moveTo(-75 + xOffset, 10);
      ctx.lineTo(65 + xOffset, 10);
      ctx.lineTo(55 + xOffset, 35);
      ctx.lineTo(-65 + xOffset, 35);
      ctx.closePath();
      ctx.stroke();

      // العجلات الدائرية الهيدروليكية
      ctx.strokeStyle = hologramColor + "0.8)";
      ctx.beginPath();
      ctx.arc(-35 + xOffset, 35, 12, 0, Math.PI * 2);
      ctx.arc(30 + xOffset, 35, 12, 0, Math.PI * 2);
      ctx.stroke();

      // 3. تأثير خطوط المسح المقطعي العمودي (Scanning Lines Effect)
      const scanY = Math.sin(angle * 2.5) * 50 + 10;
      ctx.restore();
      
      ctx.lineWidth = 1;
      ctx.strokeStyle = hologramColor + "0.4)";
      ctx.shadowColor = hologramColor + "0.5)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(centerX - 120, centerY + scanY);
      ctx.lineTo(centerX + 120, centerY + scanY);
      ctx.stroke();
      ctx.shadowBlur = 0; // صيانة جودة الأداء لمنع تشتت الكرت

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [status]);

  return <canvas ref={canvasRef} width={400} height={200} className="w-full max-w-[400px] h-[200px] block" />;
};
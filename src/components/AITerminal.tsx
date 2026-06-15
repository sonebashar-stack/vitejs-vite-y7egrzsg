// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AITerminal: React.FC = () => {
  const [logs, setLogs] = useState<{ id: number; text: string; type: string }[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    // بنك مصطلحات الخيال العلمي والصيانة التنبؤية المعقدة
    const logsPool = [
      { text: "BMS_SYNC:: OPTIMAL CELL RESONANCE IN CLUSTER [0x4A2F]", type: "ok" },
      { text: "THERMAL_CORE:: PREDICTIVE ANALYSIS... STABLE", type: "ok" },
      { text: "AI_PASSPORT:: GENERATING ENCRYPTED HASH (ERR < 0.01%)", type: "warn" },
      { text: "SYS_LINK:: DEPLOYING QUANTUM TELEMETRY DATA", type: "info" },
      { text: "VOLTAGE:: HIGH-VOLTAGE BALANCING ACTIVE [NODE 77]", type: "ok" },
      { text: "PINN_EVAL:: NEURAL NET SCANNING LITHIUM ARCHITECTURE", type: "info" },
      { text: "SEC_PROTOCOL:: ENCRYPTING VEHICLE DATA BLOCK", type: "warn" },
      { text: "REGEN_BRAKE:: CALIBRATING MAGNETIC FLUX ALGORITHMS", type: "info" }
    ];

    // رسائل الإقلاع الأولية
    setLogs([
      { id: counterRef.current++, text: "CORE:: INITIALIZING QUANTUM TELEMETRY LINK...", type: "info" }
    ]);

    // سرعة جنونية لتدفق البيانات (كل 800 جزء من الثانية)
    const interval = setInterval(() => {
      const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
      const now = new Date();
      // توليد أجزاء الثانية وشيفرات سداسية عشوائية لإضافة تعقيد بصري
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
      
      setLogs(prev => {
        const newLogs = [...prev, { 
          id: counterRef.current++, 
          text: `[${timestamp}] <0x${hex}> ${randomLog.text}`,
          type: randomLog.type
        }];
        // الاحتفاظ بآخر 12 سطر فقط لتجنب استهلاك الذاكرة وإبقاء الحركة سريعة
        if (newLogs.length > 12) return newLogs.slice(newLogs.length - 12);
        return newLogs;
      });
    }, 800); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 font-mono text-[9px] relative overflow-hidden flex flex-col justify-end">
      
      {/* طبقة خطوط الشاشة القديمة (Scanlines) المدمجة مع الزجاج */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] pointer-events-none z-0 opacity-50"></div>
      
      {/* العنوان العلوي للتيرمنال */}
      <div className="absolute top-4 left-4 text-[#00f3ff]/60 font-black uppercase tracking-[0.3em] z-10 flex items-center gap-2 border-b border-[#00f3ff]/20 pb-2 w-[calc(100%-2rem)]">
        <span className="w-1.5 h-1.5 bg-[#ffb800] rounded-full animate-ping"></span>
        LIVE_AI_DATA_STREAM
      </div>
      
      {/* منطقة عرض السجلات المنزلقة للأعلى */}
      <div className="z-10 relative flex flex-col justify-end w-full h-[calc(100%-2rem)] mask-image: linear-gradient(to bottom, transparent, black 20%)">
        <AnimatePresence initial={false}>
          {logs.map((log) => {
            // تلوين السطور بناءً على نوعها لكسر الملل البصري
            let textColor = "text-[#00f3ff]";
            if (log.type === "warn") textColor = "text-[#ffb800]";
            if (log.type === "ok") textColor = "text-[#00ff88]";

            return (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.2 }}
                className={`${textColor} drop-shadow-[0_0_2px_currentColor] tracking-[0.1em] flex items-start gap-2 whitespace-nowrap mb-1 font-bold`}
                style={{ direction: 'ltr' }}
              >
                <span className="text-white/30 shrink-0">&gt;_</span> 
                <span className="truncate">{log.text}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* مؤشر الكتابة النابض (Blinking Cursor) */}
        <div className="text-[#00f3ff] animate-pulse mt-1 ml-4 z-10 font-black text-[12px] shadow-[0_0_8px_#00f3ff]">█</div>
      </div>
    </div>
  );
};
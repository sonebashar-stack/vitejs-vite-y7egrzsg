// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const LiveYardCarousel = ({ tickets, activeCarId, onCarSelect }) => {
  if (tickets.length === 0) {
    return (
       <div className="flex-1 flex flex-col items-center justify-center text-[#00f3ff]/50 font-mono text-sm tracking-[0.2em] animate-pulse h-full">
         [ NO_DATA_STREAM ]
       </div>
    );
  }

  return (
    <motion.div 
      className="flex-1 overflow-y-auto space-y-2 pr-2 h-full pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence mode="popLayout">
        {tickets.map((t) => {
          const isActive = t.ticketId === activeCarId;
          
          // هندسة الألوان النيونية السيكولوجية [cite: 96, 97]
          let statusTextGlow = "text-slate-400";
          let glowBorder = "border-transparent";

          if (t.status.includes('عمل') || t.status.includes('فحص')) {
            statusTextGlow = "text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]";
            glowBorder = isActive ? "border-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.2)]" : "border-[#00f3ff]/30";
          } else if (t.status.includes('جاهز') || t.status.includes('تسليم')) {
            statusTextGlow = "text-[#00ff88] drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]";
            glowBorder = isActive ? "border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.2)]" : "border-[#00ff88]/30";
          } else {
             statusTextGlow = "text-[#ffb800] drop-shadow-[0_0_5px_rgba(255,184,0,0.8)]";
             glowBorder = isActive ? "border-[#ffb800] shadow-[0_0_15px_rgba(255,184,0,0.2)]" : "border-[#ffb800]/30";
          }

          return (
            <motion.div
              layout="position"
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={{ 
                opacity: isActive ? 1 : 0.4, 
                scale: isActive ? 1.02 : 0.98,
                filter: isActive ? "blur(0px)" : "blur(1px)",
                x: isActive ? 15 : 0 // دفع الكبسولة النشطة للأمام لكسر الملل
              }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              key={t.ticketId}
              onClick={() => onCarSelect(t.ticketId)}
              className={`relative p-3 cursor-pointer transition-all duration-300 backdrop-blur-sm border-l-2 bg-gradient-to-r ${isActive ? 'from-white/10 to-transparent' : 'from-transparent to-transparent'} ${glowBorder}`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black tracking-widest ${statusTextGlow}`}>
                      #{t.ticketId}
                    </span>
                    <h4 className={`font-black text-sm tracking-[0.1em] uppercase ${isActive ? 'text-white' : 'text-slate-300'}`}>{t.brand}</h4>
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 tracking-widest">USR // <span className="text-white">{t.customer}</span></div>
                  <div className="text-[8px] font-mono text-slate-400 tracking-widest uppercase truncate max-w-[12rem] mt-1">
                    {isActive ? <span className="animate-pulse text-white">&gt; {t.description}</span> : t.description}
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="font-mono text-[10px] font-black text-white tracking-[0.2em] bg-black/50 px-2 py-0.5 rounded border border-white/10">{t.plate}</div>
                  <div className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 ${statusTextGlow}`}>[{t.status}]</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
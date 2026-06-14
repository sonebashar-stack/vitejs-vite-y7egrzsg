// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiveYardCarousel = ({ tickets, activeCarId, onCarSelect }) => {
  if (tickets.length === 0) {
    return <div className="text-center py-10 text-slate-500 text-sm font-bold">الساحة المركزية خالية حالياً.</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
      {/* AnimatePresence مسؤولة عن تأثير الدخول والخروج الناعم للسيارات */}
      <AnimatePresence>
        {tickets.map((t) => {
          const isActive = t.ticketId === activeCarId;
          let statusStyle = "border-amber-500/30 text-amber-400 bg-amber-500/5";
          let isReadyBlink = false;

          if (t.status.includes('عمل') || t.status.includes('فحص')) {
            statusStyle = "border-cyan-500/40 text-cyan-400 bg-cyan-500/5";
          } else if (t.status.includes('جاهز') || t.status.includes('تسليم')) {
            statusStyle = "border-emerald-500/60 text-emerald-400 bg-emerald-500/10";
            isReadyBlink = true;
          }

          return (
            <motion.div
              layout="position" // سحر الانزلاق عند تغير الترتيب
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              key={t.ticketId}
              onClick={() => onCarSelect(t.ticketId)}
              className={`border rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all duration-300 bg-[#04070d]/60 
                ${isActive ? 'border-cyan-400 bg-[#091524]/80 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.02] ml-2' : 'border-[#162235] hover:border-slate-600'}
                ${isReadyBlink ? 'ready-blink-card' : ''}
              `}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">#{t.ticketId}</span>
                  <h4 className="font-black text-base text-white">{t.brand}</h4>
                </div>
                <div className="text-xs text-slate-400 font-sans font-medium">الزبون: <span className="text-sky-400 font-bold">{t.customer.split(' ')[0]}</span></div>
                <div className="text-[11px] text-slate-500 truncate max-w-[14rem]">{t.description}</div>
              </div>

              <div className="text-left flex flex-col items-end gap-2">
                <span className="font-mono text-xs font-black text-cyan-400 tracking-widest bg-[#02040a] px-3 py-1 border border-[#162235] rounded-lg shadow-inner">
                  {t.plate}
                </span>
                <span className={`text-[9px] px-2.5 py-1 rounded-md border font-black uppercase tracking-wider ${statusStyle}`}>
                  {t.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
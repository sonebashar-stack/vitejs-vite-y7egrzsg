// @ts-nocheck
import React from 'react';

interface HeaderProps {
  currentTime: Date;
  onLogoClick: () => void;
}

export const QuantumHeader: React.FC<HeaderProps> = ({ currentTime, onLogoClick }) => {
  return (
    <header className="bg-slate-900/50 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onLogoClick}>
          {/* محرك الشعار المتوافق تلقائياً - يقرأ من مجلد public */}
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]" 
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
          />
          <div className="bg-sky-500/10 text-sky-400 p-2 rounded-xl border border-sky-500/20 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>
          </div>
          <div>
            <h1 className="font-black text-white text-xl leading-tight tracking-wide font-mono">RAMLI ENTERPRISE</h1>
            <p className="text-[10px] font-mono text-sky-400/80 tracking-widest">AL-RAMLI GATEWAY • AWS-NODE-AMMAN • v4.0</p>
          </div>
        </div>
        
        {/* التوقيت الرقمي العسكري المحصن */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-slate-400 font-mono tracking-wider">AMMAN ZONE:</span>
            <span className="font-mono text-white font-black text-sm">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
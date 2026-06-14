// @ts-nocheck
import { useEffect, useRef } from 'react';

export function useWebAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);

  // 1. تشغيل السجاد الصوتي المحيطي (رنين المحرك الكهربائي) لتقليل توتر الانتظار
  const startAmbientEngine = () => {
    try {
      if (audioCtxRef.current) return;
      
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(35, ctx.currentTime); // تردد منخفض جداً يحاكي المحرك الكهربائي
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime); // صوت خافت جداً غير مزعج

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      ambientOscRef.current = osc;
    } catch (e) {
      console.log("Audio activation deferred until user gesture.");
    }
  };

  // 2. إطلاق نغمة هولوغرافية نقية عند جاهزية أي مركبة
  const playReadyBeep = () => {
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      if (!audioCtxRef.current) audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5 نغمة تقنية نقية
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
       console.error(e);
    }
  };

  useEffect(() => {
    return () => {
      if (ambientOscRef.current) {
        try { ambientOscRef.current.stop(); } catch(e){}
      }
    };
  }, []);

  return { startAmbientEngine, playReadyBeep };
}
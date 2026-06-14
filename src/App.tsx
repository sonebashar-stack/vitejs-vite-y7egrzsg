// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

// --- رابط قاعدة البيانات المباشر الخاص بك (Google Sheets) ---
const API_URL = "https://script.google.com/macros/s/AKfycbydJBGZEjUibERKSWbk317NBVK4dYTqBSWz8kFC2iq2BJXrkVlWJrHoDEbWseV98pHgaQ/exec";

// --- أيقونات تكنولوجية مخصصة للواجهة المستقبلية ---
const IconRadar = () => <svg className="animate-spin" style={{ animationDuration: '8s' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="12" x2="19" y2="5"/></svg>;
const IconTerminal = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;
const IconSoundOn = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const IconSoundOff = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;

// --- هندسة لغة التصميم السينمائي وخطوط المسح الضوئي (Sci-Fi Styles) ---
if (typeof document!== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Cairo:wght@400;700;900&display=swap');
    
    #root, body, html { 
      width: 100%!important; 
      margin: 0!important; 
      background-color: #02040a; 
      color: #e2e8f0; 
      font-family: 'Cairo', sans-serif; 
      overflow-x: hidden;
    }
    
    /* شبكة الفضاء الرقمي الخلفية العميقة */
    body::before {
      content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 80%),
        linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
      background-size: 100% 100%, 40px 40px, 40px 40px; 
      z-index: -1; pointer-events: none;
    }

   .font-tech { font-family: 'Share Tech Mono', monospace; }
    
    /* خطوط المسح الضوئي السيبرانية المتدفقة */
   .scanline-container { position: relative; overflow: hidden; }
   .scanline-container::after {
      content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 6px;
      background: linear-gradient(to bottom, rgba(217, 70, 239, 0), rgba(217, 70, 239, 0.3), rgba(217, 70, 239, 0));
      animation: scan-effect 6s linear infinite; pointer-events: none; opacity: 0.7;
    }
    @keyframes scan-effect { 0% { transform: translateY(-100%); } 100% { transform: translateY(1100%); } }

    /* نبض الهولوغرام للجاهزية */
    @keyframes ready-pulse {
      0% { box-shadow: 0 0 5px rgba(6, 182, 212, 0.2); border-color: rgba(6, 182, 212, 0.3); }
      50% { box-shadow: 0 0 25px rgba(6, 182, 212, 0.6); border-color: rgba(6, 182, 212, 1); }
      100% { box-shadow: 0 0 5px rgba(6, 182, 212, 0.2); border-color: rgba(6, 182, 212, 0.3); }
    }
   .hud-ready { animation: ready-pulse 3s infinite ease-in-out; }

    /* شريط النصائح السفلي المترابط (Marquee) */
    @keyframes scroll-text {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
   .marquee-text { animation: scroll-text 35s linear infinite; }
   .marquee-text:hover { animation-play-state: paused; }

    /* تأثير الكتابة البرمجية التلقائي */
   .typewriter { overflow: hidden; white-space: nowrap; border-left: 2px solid #06b6d4; animation: typing 2.5s steps(30, end) infinite; }
    @keyframes typing { from { width: 0 } to { width: 100% } }
  `;
  document.head.appendChild(style);
}

// --- المظلل الرياضي المخصص للهولوغرام (GLSL Custom Shaders) ---
const HologramShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      // نبضة اهتزازية خفيفة لمحاكاة عدم استقرار الطاقة الهولوغرافية
      vec3 pos = position;
      float glitch = sin(uTime * 15.0) * cos(uTime * 10.0);
      if (glitch > 0.85) {
        pos.x += sin(pos.y * 50.0) * 0.04;
      }
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uTime;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // حساب تأثير فرينزيل للتوهج على الحواف الخارجية
      float fresnel = 1.0 - max(0.0, dot(normal, viewDir));
      float rim = pow(fresnel, 3.5) * 2.5;
      
      // خطوط فحص هولوغرافية متحركة عمودياً
      float scanline = sin(vUv.y * 120.0 - uTime * 6.0) * 0.2 + 0.8;
      
      // تمثيل تدفق البيانات كأمواج طاقة
      float wave = sin(vUv.y * 15.0 + uTime * 2.0) * 0.1 + 0.9;
      
      vec3 finalColor = uColor * (rim + 0.15) * scanline * wave;
      float alpha = rim * 0.9 + 0.2;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

// --- محرك توليد الأصوات الإجرائي (Procedural Sound Generator) ---
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.ambientOsc = null;
    this.ambientLowpass = null;
    this.isConnected = false;
  }

  init() {
    if (this.isConnected) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      
      // 1. توليد السجاد الصوتي المحيطي الهادئ (Low Frequency Hum - 45Hz)
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientLowpass = this.ctx.createBiquadFilter();
      const ambientGain = this.ctx.createGain();
      
      this.ambientOsc.type = 'triangle';
      this.ambientOsc.frequency.setValueAtTime(45, this.ctx.currentTime); // تردد مهدئ للأعصاب
      
      this.ambientLowpass.type = 'lowpass';
      this.ambientLowpass.frequency.setValueAtTime(80, this.ctx.currentTime); // تنقية الترددات الحادة
      
      ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // مستوى صوت خلفي خافت جداً
      
      this.ambientOsc.connect(this.ambientLowpass);
      this.ambientLowpass.connect(ambientGain);
      ambientGain.connect(this.ctx.destination);
      
      this.ambientOsc.start();
      this.isConnected = true;
    } catch (e) { console.error("Web Audio API blocked or unsupported", e); }
  }

  // 2. صوت طنين التحليل الرقمي السريع (Telemetry Package Beep)
  playTelemetryBeep() {
    if (!this.isConnected ||!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.12); // هبوط ترددي رقمي سريعا
      
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.15);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  // 3. صوت اكتمال الفحص وطلب الاستدعاء (Notification Chime)
  playReadyChime() {
    if (!this.isConnected ||!this.ctx) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, this.ctx.currentTime); // نغمة C5
      osc1.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1); // نغمة E5
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.05); // نغمة G5
      osc2.frequency.setValueAtTime(1046.50, this.ctx.currentTime + 0.15); // نغمة C6
      
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.6);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc1.start();
      osc2.start();
      
      osc1.stop(this.ctx.currentTime + 0.6);
      osc2.stop(this.ctx.currentTime + 0.6);
    } catch (e) {}
  }

  stop() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
      } catch (e) {}
    }
    this.isConnected = false;
  }
}

const soundManager = new SoundEngine();

// --- مجسم السيارة الهولوغرافي ثلاثي الأبعاد المولد إجرائياً بالكامل ---
const ProceduralCar = ({ glowColor, status }) => {
  const groupRef = useRef();
  const materialRef = useRef();
  
  // تحضير المتغيرات الزمنية للمظاهر الهولوغرافية لضمان الحركة المستمرة
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(glowColor) }
  }),);

  useEffect(() => {
    uniforms.uColor.value.set(glowColor);
  }, [glowColor, uniforms]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }
    
    if (groupRef.current) {
      // 1. سلوك الدوران والطفو الإجرائي حسب حالة السيارة
      if (status.includes('عمل') || status.includes('فحص')) {
        // دوران تحليلي متكامل مستمر في حالة الفحص النشط
        groupRef.current.rotation.y = time * 0.6;
        groupRef.current.position.y = Math.sin(time * 2.0) * 0.1;
      } else if (status.includes('جاهز') || status.includes('تسليم')) {
        // دوران هجومي سريع احتفالاً بالجاهزية
        groupRef.current.rotation.y = time * 1.5;
        groupRef.current.position.y = Math.sin(time * 3.5) * 0.15;
      } else {
        // طفو عائم هادئ في حالة الانتظار
        groupRef.current.rotation.y = time * 0.2;
        groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* الهيكل السفلي للسيارة (Chassis) */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2.2, 0.35, 1.1]} />
        <shaderMaterial args={} uniforms={uniforms} ref={materialRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* كابينة السيارة العلوية (Cabin) */}
      <mesh position={[-0.2, 0.25, 0]}>
        <boxGeometry args={[1.1, 0.45, 0.9]} />
        <shaderMaterial args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* العجلات الأربع المضيئة والمتحركة بالتناوب */}
      {/* عجلة أمامية يمين */}
      <mesh position={[0.65, -0.25, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.15, 16]} />
        <shaderMaterial args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* عجلة أمامية يسار */}
      <mesh position={[0.65, -0.25, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.15, 16]} />
        <shaderMaterial args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* عجلة خلفية يمين */}
      <mesh position={[-0.65, -0.25, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.15, 16]} />
        <shaderMaterial args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* عجلة خلفية يسار */}
      <mesh position={[-0.65, -0.25, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.15, 16]} />
        <shaderMaterial args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* محرك الطاقة الخلفي (Flux Core / Rocket Ring) */}
      <mesh position={[-1.15, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.22, 0.04, 8, 24]} />
        <shaderMaterial args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* حلقة الجسيمات الطائرة المحيطة بالمركبة لإضفاء عمق خيالي */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.015, 8, 64]} />
        <shaderMaterial args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

// --- مكون العداد الدائري السيبراني المتوهج (Circular HUD) ---
const CircularHUD = ({ percentage, colorStr, label }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-[#02040a]/40 border border-[#1e293b]/50 rounded-lg">
      <div className="relative w-20 h-24 flex items-center justify-center">
        <svg className="transform -rotate-90 w-20 h-20">
          <circle cx="40" cy="40" r={radius} stroke="#090d16" strokeWidth="4" fill="transparent" />
          <circle cx="40" cy="40" r={radius} stroke={colorStr} strokeWidth="4.5" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out drop-shadow-[0_0_6px_currentColor]" />
        </svg>
        <span className="absolute font-tech text-xs font-bold tracking-tighter" style={{ color: colorStr }}>{percentage}%</span>
      </div>
      <span className="text-[10px] font-tech tracking-widest text-slate-500 mt-1 uppercase">{label}</span>
    </div>
  );
};

// --- مكون السجل البرمجي للبطارية (Neural Terminal Logs) ---
const AITerminal = ({ text, status }) => {
  const lines = useMemo(() =>, [text, status]);

  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIdx(prev => (prev + 1) % lines.length);
      // إطلاق طنين برمجي ناعم عند تحديث الأسطر البرمجية
      soundManager.playTelemetryBeep();
    }, 2500);
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className="bg-[#02040a] border border-[#101928] p-3 rounded-lg font-tech text-[10px] text-[#06b6d4] h-20 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-1.5 right-1.5 opacity-30"><IconTerminal /></div>
      <span className="text-slate-600 block text-[9px] border-b border-[#101928] pb-1">AI-DIAGNOSTICS_SHELL@ABU_ALNADI</span>
      <div className="typewriter text-[#d946ef] drop-shadow-[0_0_1px_#d946ef] tracking-tight">{lines[lineIdx]}</div>
    </div>
  );
};

export default function App() {
  const = useState();
  const = useState(false);
  const = useState(new Date());

  // تحديث الساعة الرقمية الحية
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  },);

  // جلب البيانات ومعالجتها من ملف Google Sheets المباشر الخاص بك
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
                if (foundKey && row[foundKey]!== undefined && row[foundKey]!== "") return row[foundKey];
             }
             return null;
          };

          const liveRows = data.filter(r => {
             const isArchived = getCleanValue(r, ["مرحل"]);
             const customer = getCleanValue(r, ["اسم الزبون", "الزبون"]);
             return customer!== null && isArchived!== true && isArchived!== "TRUE" && isArchived!== "true";
          });

          const parsedTickets = liveRows.map((t, idx) => {
            const rawCost = String(getCleanValue(t, ["المبلغ المدفوع", "المبلغ"]) || "0").replace(/[^\d.]/g, '');
            const id = getCleanValue(t,) || idx + 1;
            const status = getCleanValue(t, ["حالة السيارة", "الحالة", "حالة الصيانة"]) || "قيد الانتظار";
            const plateStr = String(getCleanValue(t, ["رقم اللوحة", "اللوحة"]) || "10-100");
            const plateNum = parseInt(plateStr.replace(/\D/g, '')) || 101;

            return {
              id,
              plate: plateStr,
              customer: getCleanValue(t, ["اسم الزبون", "الزبون"]) || "عميل",
              carModel: getCleanValue(t, ["نوع وموديل السيارة", "الموديل"]) || "مركبة كهربائية",
              problem: getCleanValue(t, ["العمل المطلوب", "تفاصيل الشغل"]) || status,
              status,
              engineer: getCleanValue(t, ["الموظف المسؤول", "الموظف"]) || "-",
              cost: parseFloat(rawCost) || 0,
              soc: Math.max(30, Math.min(100, 30 + (plateNum % 66))),
              soh: Math.max(80, Math.min(100, 85 + (plateNum % 15)))
            };
          });

          // تفعيل صوت الشيم الاحتفالي إذا تحولت سيارة إلى الحالة الجاهزة للتسليم
          if (tickets.length > 0 && parsedTickets.length > 0) {
            const hasNewReady = parsedTickets.some(nt => {
              const old = tickets.find(ot => ot.id === nt.id);
              return old &&!old.status.includes('جاهز') && nt.status.includes('جاهز');
            });
            if (hasNewReady && soundEnabled) {
              soundManager.playReadyChime();
            }
          }

          setTickets(parsedTickets.reverse());
        }
      } catch (err) { console.error("Database connection fault:", err); }
    }
    
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 8000);
    return () => { isMounted = false; clearInterval(loop); };
  }, [tickets, soundEnabled]);

  // إدارة تفعيل أو كتم الصوت الإجرائي
  const toggleSound = () => {
    if (!soundEnabled) {
      soundManager.init();
      soundManager.playReadyChime();
      setSoundOn(true);
    } else {
      soundManager.stop();
      setSoundOn(false);
    }
  };

  // ميكانيكية الحركة ثلاثية الأبعاد للكروت عند مرور مؤشر الفأرة (Mouse Parallax)
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateY(${x / 14}deg) rotateX(${-y / 14}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.borderColor = 'rgba(6, 182, 212, 0.6)';
    card.style.boxShadow = '0 15px 35px rgba(6, 182, 212, 0.15)';
  };

  const handleMouseLeave = (e, baseGlowColor) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    card.style.borderColor = `${baseGlowColor}4d`;
    card.style.boxShadow = 'none';
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between selection:bg-cyan-500/20">
      
      {/* الشريط العلوي للتحكم - Sci-Fi Header */}
      <header className="w-full bg-[#030712]/95 border-b border-[#141d2f] px-6 py-4 flex justify-between items-center z-20 sticky top-0 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="text-[#06b6d4] drop-shadow-[0_0_8px_#06b6d4]"><IconRadar /></div>
          <div>
            <h1 className="text-xl font-black text-white tracking-widest font-tech leading-none">ABU_ALNADI <span className="text-[#06b6d4]">AI-SYS</span></h1>
            <span className="text-[9px] text-[#f59e0b] font-tech uppercase tracking-widest bg-[#f59e0b]/10 px-1.5 py-0.5 border border-[#f59e0b]/30 inline-block mt-1">Real-Time Core Diagnostics</span>
          </div>
        </div>

        {/* أزرار الاتصال بالأصوات الإجرائية ومحاكي الفضاء */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSound}
            className={`flex items-center gap-2 px-4 py-2 rounded font-tech text-xs border transition-all duration-300 ${soundEnabled? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]' : 'bg-slate-950/20 border-slate-800 text-slate-500'}`}
          >
            {soundEnabled? <IconSoundOn /> : <IconSoundOff />}
            {soundEnabled? 'TELEMETRY AUDIO LINKED' : 'CONNECT SOUND LINK'}
          </button>
          
          <div className="font-tech text-xs bg-[#02040a] border border-[#141d2f] px-4 py-2 rounded text-[#06b6d4] drop-shadow-[0_0_5px_rgba(6,182,212,0.1)]">
            SYS_TIME: {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>
      </header>

      {/* لوحة عرض الكروت التفاعلية والشبكة الهولوغرافية */}
      <main className="flex-1 p-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {tickets.map(t => {
            // هندسة سيكولوجية الألوان بناءً على التقرير
            let glowColor = "#f59e0b"; // كهرماني نابض ومريح للانتظار
            let statusPercent = 35;
            let isReady = false;
            
            if (t.status.includes('عمل') || t.status.includes('فحص')) { 
              glowColor = "#d946ef"; // فوشي حاد ومشع لتمثيل المسح النشط
              statusPercent = 75;
            }
            if (t.status.includes('جاهز') || t.status.includes('تسليم')) { 
              glowColor = "#06b6d4"; // أزرق سيبراني نقي للجاهزية والراحة التامة
              statusPercent = 100;
              isReady = true;
            }

            return (
              <div 
                key={t.id} 
                onMouseMove={handleMouseMove}
                onMouseLeave={(e) => handleMouseLeave(e, glowColor)}
                className={`relative bg-[#050914]/90 backdrop-blur-xl border rounded-xl p-5 flex flex-col justify-between scanline-container transition-all duration-300 ease-out cursor-pointer overflow-hidden ${isReady? 'hud-ready' : ''}`}
                style={{ borderColor: `${glowColor}4d`, transformStyle: 'preserve-3d' }}
              >
                {/* زوايا استهداف تكنولوجية حادة (Hologram Frame Corners) */}
                <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: glowColor }}></div>
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: glowColor }}></div>
                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: glowColor }}></div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: glowColor }}></div>

                {/* ترويسة الكرت وبطاقة الحالة */}
                <div className="flex justify-between items-center mb-4 border-b border-[#141d2f] pb-2" style={{ transform: 'translateZ(20px)' }}>
                  <span className="font-tech text-slate-500 text-[10px] tracking-widest">DIAG_REF // {t.id}</span>
                  <span className="font-tech text-[10px] px-2 py-0.5 uppercase tracking-widest border font-bold"
                    style={{ color: glowColor, backgroundColor: `${glowColor}1a`, borderColor: glowColor }}>
                    {t.status}
                  </span>
                </div>

                {/* معلومات السيارة ومالكها */}
                <div className="mb-4 text-right" style={{ transform: 'translateZ(30px)' }}>
                  <h3 className="font-tech text-white text-2xl tracking-widest mb-1 text-center">{t.plate}</h3>
                  <div className="flex items-center justify-between text-xs font-bold px-1 mt-2">
                    <span className="text-slate-400 font-tech">{t.carModel.toUpperCase()}</span>
                    <span className="text-[#06b6d4] tracking-tight">{t.customer}</span>
                  </div>
                </div>

                {/* كانفاس العرض ثلاثي الأبعاد المباشر - الابتكار الإجرائي التفاعلي */}
                <div className="w-full h-44 bg-[#010307]/80 rounded-lg border border-[#141d2f] mb-4 relative shadow-inner overflow-hidden" style={{ transform: 'translateZ(40px)' }}>
                  {/* شريط المسح الضوئي العمودي الحركي في الخلفية */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                  
                  <Canvas camera={{ position: [0, 1.1, 3.2], fov: 60 }} dpr={[1, 2]}>
                    <ambientLight intensity={1.5} />
                    <pointLight position={[5, 5, 5]} intensity={2} color={glowColor} />
                    <ProceduralCar glowColor={glowColor} status={t.status} />
                  </Canvas>
                </div>

                {/* عدادات حيوية البطارية الدائرية (Circular Gauge HUDs) */}
                <div className="flex justify-between items-center bg-[#010307] rounded-lg p-2 border border-[#141d2f] mb-4" style={{ transform: 'translateZ(25px)' }}>
                  <CircularHUD percentage={statusPercent} colorStr={glowColor} label="PRG" />
                  <CircularHUD percentage={t.soc} colorStr="#06b6d4" label="SOC" />
                  <CircularHUD percentage={t.soh} colorStr="#f59e0b" label="SOH" />
                </div>

                {/* موجه الأوامر ومحلل الشبكات العصبية المباشر */}
                <div style={{ transform: 'translateZ(15px)' }}>
                  <AITerminal text={t.problem} status={t.status} />
                </div>

                {/* تذييل الكرت المالي والإداري الصامت */}
                <div className="border-t border-[#141d2f] pt-3 mt-4 flex justify-between font-tech text-[10px] text-left" style={{ transform: 'translateZ(10px)' }}>
                  <span className="text-slate-500">VAL: <span className="text-white font-bold">{t.cost} JOD</span></span>
                  <span className="text-slate-500">OPR: <span style={{ color: glowColor }}>{t.engineer}</span></span>
                </div>

              </div>
            );
          })}
          
          {tickets.length === 0 && (
            <div className="text-[#06b6d4] font-tech col-span-full py-20 text-center animate-pulse tracking-widest text-sm">
              SEARCHING TELEMETRY BANDS... NO ACTIVE DIAGNOSTICS IN RANGE.
            </div>
          )}
        </div>
      </main>

      {/* شريط النصائح السفلي المتحرك (Scrolling Marquee Ticker) لـ "أبو النادي" */}
      <footer className="w-full bg-[#030712] border-t border-[#141d2f] py-3 overflow-hidden z-20 flex items-center">
        <div className="bg-[#f59e0b] text-[#02040a] font-bold text-xs px-3 py-1 font-tech uppercase tracking-wider z-30 shrink-0">
          AI INSIGHTS
        </div>
        <div className="flex-1 overflow-hidden relative flex items-center">
          <div className="marquee-text whitespace-nowrap text-xs text-[#06b6d4] font-bold flex gap-12 font-tech">
            <span>• KEEP BATTERY SOC BETWEEN 20% AND 80% TO PROLONG REMAINING USEFUL LIFE (RUL) BY UP TO 24 MONTHS.</span>
            <span>• ABU AL-NADI SECURE PASS: VERIFIED BATTERY PASSPORT INCREASES RESALE ASSET VALUE BY 15%.</span>
            <span>• PREVENT THERMAL RUNAWAY THROUGH OUR REAL-TIME NEURAL DIAGNOSTICS POWERED BY PINN.</span>
            <span>• FAST CHARGING FREQUENTLY? CHECK YOUR SOH BI-WEEKLY AT OUR CYBER CLINIC FOR THE PRECISE 100% HEALTH REPORT.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
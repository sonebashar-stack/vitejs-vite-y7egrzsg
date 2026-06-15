// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, PointMaterial, Points } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- 1. نظام الجسيمات الكمومية ---
const QuantumParticles = ({ color }) => {
  const pointsRef = useRef();
  
  const [positions, sizes] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5; // Z
      size[i] = Math.random() * 1.5;
    }
    return [pos, size];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} sizes={sizes}>
      <PointMaterial 
        transparent 
        color={color} 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        opacity={0.4}
      />
    </Points>
  );
};

// --- 2. الهيكل الهندسي الدقيق للسيارة (CAD Blueprint SUV) ---
const AdvancedCarHologram = ({ color }) => {
  const groupRef = useRef();
  const scannerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3; // دوران سينمائي بطيء
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.15; // طفو
    }
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(time * 2) * 1.8; // حركة الليزر
    }
  });

  // مادة شفافة تتفاعل مع التوهج
  const glassMaterial = new THREE.MeshBasicMaterial({
    color: '#000000',
    transparent: true,
    opacity: 0.8,
    depthWrite: true,
  });

  return (
    <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
      {/* الشاسيه السفلي */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[4.8, 1, 2]} />
        <primitive object={glassMaterial} attach="material" />
        <Edges scale={1.01} threshold={15} color={color} />
      </mesh>
      
      {/* قمرة القيادة (الزجاج والسقف) */}
      <mesh position={[-0.4, 0.8, 0]}>
        <boxGeometry args={[2.6, 1, 1.6]} />
        <primitive object={glassMaterial} attach="material" />
        <Edges scale={1.01} threshold={15} color={color} />
      </mesh>

      {/* مقدمة السيارة (الغطاء الأمامي) */}
      <mesh position={[1.7, 0.1, 0]} rotation={[0, 0, -0.2]}>
         <boxGeometry args={[1.5, 0.6, 1.8]} />
         <primitive object={glassMaterial} attach="material" />
         <Edges scale={1.01} threshold={15} color={color} />
      </mesh>
      
      {/* العجلات الهولوغرافية بتفاصيل دقيقة */}
      {[[-1.4, 1.1], [1.5, 1.1], [-1.4, -1.1], [1.5, -1.1]].map((pos, i) => (
        <group key={i} position={[pos[0], -0.6, pos[1]]} rotation={[Math.PI / 2, 0, 0]}>
          {/* الإطار الخارجي */}
          <mesh>
            <cylinderGeometry args={[0.55, 0.55, 0.3, 32]} />
            <meshBasicMaterial color="#000" transparent opacity={0.9} />
            <Edges scale={1.05} color={color} />
          </mesh>
          {/* الجنط الداخلي */}
          <mesh>
             <torusGeometry args={[0.3, 0.05, 16, 32]} />
             <meshBasicMaterial color={color} />
          </mesh>
        </group>
      ))}

      {/* شريحة الفحص بالليزر (Scanner Plane) */}
      <mesh ref={scannerRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial 
          color="#D946EF" // لون مسح ضوئي ماجنتا كما في التقرير
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
        {/* حواف ليزر حادة */}
        <Edges scale={1.0} color="#D946EF" />
      </mesh>
    </group>
  );
};

// --- المكون الرئيسي للمسرح ---
export const HologramStage = ({ status }) => {
  // المحرك اللوني السيكولوجي لتوهج السيارة
  const hologramColor = useMemo(() => {
    const s = String(status || '');
    if (s.includes('جاهز') || s.includes('تسليم')) return '#00ff88'; // أخضر نيون
    if (s.includes('عمل') || s.includes('فحص')) return '#00f3ff'; // أزرق سيبراني
    return '#ffb800'; // أصفر كهرماني
  }, [status]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      {/* شارة التشخيص الرقمي العلوية */}
      <div className="absolute top-2 right-4 text-[10px] font-black text-[#00f3ff] px-3 py-1 rounded z-10 tracking-[0.3em] flex items-center gap-2 border border-[#00f3ff]/30 bg-[#000000]/50 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping"></span>
        AI_QUANTUM_SCAN :: ACTIVE
      </div>

      <div className="absolute bottom-4 left-4 text-[9px] font-mono text-[#00f3ff]/70 z-10 leading-relaxed tracking-widest pointer-events-none">
        <div>&gt; SYS.OP: OPTIMAL</div>
        <div>&gt; CELL_MATRIX: STABLE</div>
        <div>&gt; FREQUENCY: 144.02Hz</div>
        <div className="animate-pulse text-[#D946EF] font-bold mt-1">&gt; EXECUTING DEEP SCAN...</div>
      </div>
      
      {/* مسرح الـ WebGL مع تأثيرات التوهج (Bloom) */}
      <Canvas camera={{ position: [6, 4, 7], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={2} />
        
        <QuantumParticles color={hologramColor} />
        <AdvancedCarHologram color={hologramColor} />

        {/* سحر التوهج السينمائي - Post Processing */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.1} // درجة حساسية الإضاءة
            mipmapBlur 
            intensity={2.5} // قوة التوهج
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
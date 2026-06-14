// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- مكون المجسم ثلاثي الأبعاد للسيارة ---
const SciFiCarModel = ({ color }) => {
  const groupRef = useRef();
  const scannerRef = useRef();

  // هذه الدالة تعمل 60 مرة في الثانية (60 FPS) لتحريك المجسم
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // 1. دوران هولوغرافي بطيء ومستمر
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.4;
    }
    // 2. حركة خط المسح المقطعي (Scanner) صعوداً ونزولاً
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(time * 2.5) * 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* هيكل السيارة السفلي */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.5, 0.8, 1.8]} />
        <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.4} />
      </mesh>
      
      {/* قمرة القيادة (الزجاج والسقف) */}
      <mesh position={[-0.3, 0.6, 0]}>
        <boxGeometry args={[1.8, 0.8, 1.6]} />
        <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.6} />
      </mesh>
      
      {/* العجلات الدائرية المفرغة */}
      {[-1.1, 1.1].map((x, i) => (
        <React.Fragment key={i}>
          <mesh position={[x, -0.6, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
            <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.5} />
          </mesh>
          <mesh position={[x, -0.6, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
            <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.5} />
          </mesh>
        </React.Fragment>
      ))}

      {/* خط المسح الراداري الشفاف (Scanner Plane) */}
      <mesh ref={scannerRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
};

// --- المكون الرئيسي الذي سيتم تصديره للمشروع ---
export const HologramStage = ({ status }) => {
  // محرك ذكي لتغيير لون المجسم بالكامل حسب حالة السيارة
  const hologramColor = useMemo(() => {
    const s = String(status || '');
    if (s.includes('جاهز') || s.includes('تسليم')) return '#10b981'; // أخضر مشع للجاهز
    if (s.includes('انتظار')) return '#f59e0b'; // أصفر كهرماني للانتظار
    return '#06b6d4'; // أزرق سيبراني للعمل والفحص
  }, [status]);

  return (
    <div className="w-full h-full min-h-[250px] relative rounded-xl overflow-hidden bg-[#02050b] border border-[#162235] shadow-inner">
      {/* شارة توضيحية زجاجية */}
      <div className="absolute top-3 right-3 text-[9px] font-black text-cyan-400/80 bg-cyan-950/40 border border-cyan-800/40 px-2 py-1 rounded z-10 backdrop-blur-sm">
        3D DIAGNOSTICS HOLOGRAM
      </div>
      
      {/* مسرح الـ WebGL ثلاثي الأبعاد */}
      <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <SciFiCarModel color={hologramColor} />
      </Canvas>
      
      {/* قناع تظليل الأطراف (Vignette) لدمج الـ 3D مع الشاشة بنعومة */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 40%, #02050b 95%)' }}></div>
    </div>
  );
};
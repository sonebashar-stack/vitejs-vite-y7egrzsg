// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// --- نظام الجسيمات (Particles) ---
const DiagnosticParticles = ({ color }) => {
  const pointsRef = useRef();
  
  const [positions, sizes] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      size[i] = Math.random() * 1.5;
    }
    return [pos, size];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} sizes={sizes}>
      <PointMaterial 
        transparent 
        color={color} 
        size={0.02} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        opacity={0.6}
      />
    </Points>
  );
};

// --- المجسم الهولوغرافي ---
const SciFiCarHologram = ({ color }) => {
  const groupRef = useRef();
  const scannerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.5;
      groupRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(time * 3) * 1.5;
    }
  });

  const hologramMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.15,
    wireframe: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.8, 0.9, 1.8]} />
        <primitive object={hologramMaterial} attach="material" />
        <Edges scale={1.01} threshold={15} color={color} />
      </mesh>
      
      <mesh position={[-0.4, 0.7, 0]}>
        <boxGeometry args={[2, 0.8, 1.5]} />
        <primitive object={hologramMaterial} attach="material" />
        <Edges scale={1.01} threshold={15} color={color} />
      </mesh>
      
      {[-1.2, 1.2].map((x, i) => (
        <React.Fragment key={i}>
          <mesh position={[x, -0.7, 1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.25, 24]} />
            <primitive object={hologramMaterial} attach="material" />
            <Edges scale={1.05} color={color} />
          </mesh>
          <mesh position={[x, -0.7, -1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.25, 24]} />
            <primitive object={hologramMaterial} attach="material" />
            <Edges scale={1.05} color={color} />
          </mesh>
        </React.Fragment>
      ))}

      <mesh ref={scannerRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.4} 
          side={THREE.DoubleSide} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
};

// --- المكون الرئيسي ---
export const HologramStage = ({ status }) => {
  const hologramColor = useMemo(() => {
    const s = String(status || '');
    if (s.includes('جاهز') || s.includes('تسليم')) return '#10b981';
    if (s.includes('عمل') || s.includes('فحص')) return '#06b6d4';
    return '#f59e0b';
  }, [status]);

  return (
    <div className="w-full h-full min-h-[250px] relative rounded-xl overflow-hidden bg-[#030712] border border-[#162235] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
      
      <div className="absolute top-3 right-3 text-[9px] font-black text-cyan-400/80 bg-cyan-950/40 border border-cyan-800/40 px-2 py-1 rounded z-10 backdrop-blur-sm tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        AI_QUANTUM_SCAN
      </div>

      <div className="absolute bottom-3 left-3 text-[8px] font-mono text-cyan-500/60 z-10 leading-tight pointer-events-none">
        <div>SYS.OP: OPTIMAL</div>
        <div>CELL_MATRIX: STABLE</div>
        <div className="animate-pulse text-amber-500/80">RUNNING DIAGNOSTICS...</div>
      </div>
      
      <Canvas camera={{ position: [5, 3.5, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={2} />
        <DiagnosticParticles color={hologramColor} />
        <SciFiCarHologram color={hologramColor} />
      </Canvas>
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 30%, #030712 100%)' }}></div>
    </div>
  );
};
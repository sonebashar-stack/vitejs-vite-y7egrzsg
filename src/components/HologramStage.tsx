// src/components/HologramStage.tsx
import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

// معادلة تظليل الهولوغرام والمسح النيون والاهتزاز البرمجي
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
      
      // اهتزاز عشوائي خفيف لمحاكاة تذبذب الطاقة داخل الهولوغرام
      vec3 pos = position;
      float glitch = sin(uTime * 12.0) * cos(uTime * 8.0);
      if (glitch > 0.88) {
        pos.x += sin(pos.y * 40.0) * 0.05;
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
      
      // معادلة فريزنل لتوهج الإشعاع على الحواف الخارجية
      float fresnel = 1.0 - max(0.0, dot(normal, viewDir));
      float rim = pow(fresnel, 3.2) * 2.2;
      
      // خطوط مسح ضوئي أفقية متحركة عمودياً لتعزيز المظهر السيبراني
      float scanline = sin(vUv.y * 140.0 - uTime * 5.0) * 0.25 + 0.75;
      
      // موجات طاقة نابضة
      float wave = sin(vUv.y * 10.0 + uTime * 2.0) * 0.1 + 0.9;
      
      vec3 finalColor = uColor * (rim + 0.1) * scanline * wave;
      float alpha = rim * 0.85 + 0.15;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

interface ProceduralCarProps {
  glowColor: string;
  status: string;
}

const ProceduralCar: React.FC<ProceduralCarProps> = ({ glowColor, status }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

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
      // دوران عائم وحركة إجرائية إيقاعية ممتازة بناءً على حالة الصيانة
      if (status.includes('عمل') || status.includes('فحص')) {
        groupRef.current.rotation.y = time * 0.5;
        groupRef.current.position.y = Math.sin(time * 1.8) * 0.08;
      } else if (status.includes('جاهز') || status.includes('تسليم')) {
        groupRef.current.rotation.y = time * 1.3;
        groupRef.current.position.y = Math.sin(time * 3.0) * 0.12;
      } else {
        groupRef.current.rotation.y = time * 0.15;
        groupRef.current.position.y = Math.sin(time * 0.6) * 0.04;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* هيكل السيارة الرئيسي (Chassis Box) */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.0, 0.3, 1.0]} />
        <shaderMaterial attach="material" args={} uniforms={uniforms} ref={materialRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* كابينة القيادة (Cabin Box) */}
      <mesh position={[-0.15, 0.22, 0]}>
        <boxGeometry args={[1.0, 0.4, 0.8]} />
        <shaderMaterial attach="material" uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* العجلات الأربع المضيئة بالتناوب */}
      <mesh position={[0.6, -0.2, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.12, 16]} />
        <shaderMaterial attach="material" args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0.6, -0.2, -0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.12, 16]} />
        <shaderMaterial attach="material" args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-0.6, -0.2, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.12, 16]} />
        <shaderMaterial attach="material" args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-0.6, -0.2, -0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.12, 16]} />
        <shaderMaterial attach="material" args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* النواة البرمجية الخلفية للمحرك (Flux Core/Torus) */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.2, 0.03, 8, 24]} />
        <shaderMaterial attach="material" args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* حلقة البيانات العائمة المحيطة بالسيارة */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 8, 64]} />
        <shaderMaterial attach="material" args={} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

interface HologramStageProps {
  glowColor: string;
  status: string;
}

export const HologramStage: React.FC<HologramStageProps> = ({ glowColor, status }) => {
  return (
    <div className="w-full h-56 bg-[#010307]/80 rounded-xl border border-[#141d2f] relative shadow-inner overflow-hidden">
      {/* شبكة المسح الضوئي الخلفية الرفيعة */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
      
      <Canvas camera={{ position: [0, 1.0, 2.8], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color={glowColor} />
        <ProceduralCar glowColor={glowColor} status={status} />
      </Canvas>
    </div>
  );
};
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

interface SprinkleParticle {
  position: [number, number, number];
  rotation: [number, number, number];
  rotSpeed: [number, number, number];
  scale: number;
  type: "diamond" | "tetra" | "cube" | "ring" | "sparkle";
  color: string;
}

function SprinkleMesh({ p }: { p: SprinkleParticle }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = p.position[1];
  const floatSpeed = useMemo(() => 0.4 + Math.random() * 0.5, []);
  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // 3D rotation
    meshRef.current.rotation.x += p.rotSpeed[0] * delta;
    meshRef.current.rotation.y += p.rotSpeed[1] * delta;
    meshRef.current.rotation.z += p.rotSpeed[2] * delta;
    // Gentle 3D floating movement
    meshRef.current.position.y = initialY + Math.sin(t * floatSpeed + floatOffset) * 0.35;
    meshRef.current.position.x = p.position[0] + Math.cos(t * floatSpeed * 0.5 + floatOffset) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={p.position} rotation={p.rotation} scale={p.scale}>
      {p.type === "diamond" && <octahedronGeometry args={[0.22, 0]} />}
      {p.type === "tetra" && <tetrahedronGeometry args={[0.25, 0]} />}
      {p.type === "cube" && <boxGeometry args={[0.2, 0.2, 0.2]} />}
      {p.type === "ring" && <torusGeometry args={[0.22, 0.05, 8, 24]} />}
      {p.type === "sparkle" && <dodecahedronGeometry args={[0.18, 0]} />}
      <meshStandardMaterial
        color={p.color}
        metalness={0.92}
        roughness={0.18}
        emissive={p.color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function SprinklesField() {
  const goldColors = ["#f8e3a1", "#d4af37", "#fef3c7", "#eab308"];
  const emeraldColors = ["#86efac", "#34d399", "#10b981", "#6ee7b7"];

  const particles: SprinkleParticle[] = useMemo(() => {
    const list: SprinkleParticle[] = [];
    const count = 38;
    const types: SprinkleParticle["type"][] = ["diamond", "tetra", "cube", "ring", "sparkle"];

    for (let i = 0; i < count; i++) {
      const isGold = Math.random() > 0.45;
      const palette = isGold ? goldColors : emeraldColors;
      const color = palette[Math.floor(Math.random() * palette.length)];
      const type = types[Math.floor(Math.random() * types.length)];

      list.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 5,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        rotSpeed: [
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 0.9,
        ],
        scale: 0.55 + Math.random() * 0.75,
        type,
        color,
      });
    }
    return list;
  }, []);

  return (
    <group>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 6, 4]} intensity={2.5} color="#fff8e7" />
      <pointLight position={[-4, 3, 2]} intensity={2} color="#86efac" />
      <pointLight position={[4, -3, 2]} intensity={2} color="#d4af37" />
      {particles.map((p, idx) => (
        <SprinkleMesh key={idx} p={p} />
      ))}
    </group>
  );
}

export default function FloatingSprinkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* CSS Ambient Twinkling Sprinkles Layer (immediate visual & depth layer) */}
      <div className="absolute inset-0 z-0">
        {[
          { top: "12%", left: "15%", delay: "0s", size: "w-2 h-2", color: "bg-[#d4af37]" },
          { top: "25%", left: "82%", delay: "1.4s", size: "w-2.5 h-2.5", color: "bg-[#86efac]" },
          { top: "70%", left: "10%", delay: "2.1s", size: "w-1.5 h-1.5", color: "bg-[#fef08a]" },
          { top: "85%", left: "75%", delay: "0.8s", size: "w-2 h-2", color: "bg-[#6ee7b7]" },
          { top: "45%", left: "92%", delay: "1.8s", size: "w-2 h-2", color: "bg-[#d4af37]" },
          { top: "18%", left: "48%", delay: "2.5s", size: "w-1.5 h-1.5", color: "bg-[#86efac]" },
          { top: "60%", left: "30%", delay: "1.1s", size: "w-2.5 h-2.5", color: "bg-[#fde047]" },
          { top: "35%", left: "5%", delay: "0.5s", size: "w-2 h-2", color: "bg-[#34d399]" },
        ].map((s, idx) => (
          <span
            key={idx}
            className={`absolute ${s.size} ${s.color} rounded-full blur-[0.5px] opacity-75 animate-pulse`}
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: "3s",
              boxShadow: "0 0 10px currentColor",
            }}
          />
        ))}
      </div>

      {/* 3D WebGL Sprinkles Canvas */}
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%" }}
        >
          <SprinklesField />
        </Canvas>
      </Suspense>
    </div>
  );
}

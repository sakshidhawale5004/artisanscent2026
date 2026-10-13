import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

function Sculpture({ gold, paper, reduced, compact = false }: { gold: string; paper: string; reduced: boolean; compact?: boolean }) {
  const group = useRef<Group>(null);
  const width = useThree(state => state.viewport.width);
  useFrame((_, rawDelta) => {
    if (group.current && !reduced) {
      const delta = Math.min(rawDelta, .05);
      group.current.rotation.y += delta * (compact ? .65 : .12);
      if (compact) group.current.rotation.x += delta * .15;
    }
  });
  return <group ref={group} position={[compact || width < 6 ? 0 : 1.4, 0, 0]} scale={compact ? .8 : width < 6 ? .75 : 1} rotation={[.3, .2, -.35]}>
    {[0, 1, 2, 3].map(i => <mesh key={i} rotation={[i * .65, i * .48, i * .2]}>
      <torusGeometry args={[1.25 + i * .22, i % 2 === 0 ? .055 : .022, 12, 100]} />
      <meshStandardMaterial color={i % 2 === 0 ? gold : paper} metalness={.9} roughness={.22} />
    </mesh>)}
  </group>;
}

export default function ScentSculpture({ compact = false }: { compact?: boolean }) {
  const [colors, setColors] = useState<{ gold: string; paper: string; reduced: boolean }>();
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const resolve = (token: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d');
      if (!context) return 'white';
      context.fillStyle = css.getPropertyValue(token).trim();
      context.fillRect(0, 0, 1, 1);
      const pixel = context.getImageData(0, 0, 1, 1).data;
      return `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    };
    setColors({ gold: resolve('--gold'), paper: resolve('--paper'), reduced: matchMedia('(prefers-reduced-motion: reduce)').matches });
  }, []);
  if (!colors) return null;
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.2], fov: 45 }} aria-label={compact ? 'Rotating Aurel sculpture' : 'Interactive golden scent sculpture'}>
    <ambientLight intensity={.65} />
    <directionalLight position={[4, 4, 3]} intensity={3} />
    <Suspense fallback={null}>
      <Environment resolution={128}>
        <Lightformer intensity={4} position={[0, 5, 3]} scale={[10, 5, 1]} />
        <Lightformer intensity={2} position={[-5, 0, 3]} rotation-y={Math.PI / 2} scale={[5, 5, 1]} />
      </Environment>
      <Sculpture {...colors} compact={compact} />
      {!compact && <OrbitControls enableZoom={false} enablePan={false} />}
    </Suspense>
  </Canvas>;
}
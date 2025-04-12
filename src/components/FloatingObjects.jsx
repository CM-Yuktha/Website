import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';

export default function FloatingObjects({ position, color }) {
  const ref = useRef();

  useFrame(({ mouse }) => {
    if (ref.current) {
      ref.current.position.x = position[0] + mouse.x * 0.5;
      ref.current.position.y = position[1] + mouse.y * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={ref} args={[0.2, 32, 32]} position={position}>
        <meshStandardMaterial color={color} />
      </Sphere>
    </Float>
  );
}

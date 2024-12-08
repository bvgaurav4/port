import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three'

function MovingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const speed = 0.02;

  // Animate the sphere to move in a sinusoidal pattern
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(elapsedTime * speed) * 5;
      sphereRef.current.position.y = Math.cos(elapsedTime * speed) * 2;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}



export default MovingSphere;

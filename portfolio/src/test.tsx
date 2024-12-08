import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Base from './Base'

function Torus() {
  return (
    <mesh rotation={[90, 0, 20]}>
      <torusGeometry args={[10, 3, 16, 100]} />
      <meshStandardMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}

export default function Lays2() {
  return (
    <Canvas style={{ height: '70vh', width: '70vw' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Torus />
      <OrbitControls />
    </Canvas>
  )
}
import { Tube } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface SectorProps {
  radius: number
  startAngle: number
  endAngle: number
}

const Sector: React.FC<SectorProps> = ({ radius, startAngle, endAngle }) => {
  const sectorRef = useRef<THREE.Mesh>(null)
  const extrudeSettings = {
    innerWidth: 5,
    bevelEnabled: true
  }
  useEffect(() => {
    if (sectorRef.current) {
      const shape = new THREE.Shape()
      shape.moveTo(0, 0) // Move to the circle's center
      shape.arc(0, 0, radius, startAngle, endAngle, false) // Draw the arc
      shape.lineTo(0, 0) // Close the shape back to the center


        const geometryRect = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const materialRect = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Solid color material
        const rectMesh = new THREE.Mesh(geometryRect, materialRect);
        rectMesh.position.set(0, 0, 0);
        
      sectorRef.current.add(rectMesh)
    }
  }, [radius, startAngle, endAngle])

  return <primitive object={new THREE.Object3D()} ref={sectorRef} />
}

export default Sector
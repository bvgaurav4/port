import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './index.css'
import Sector from './secotr'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { depth, sin } from 'three/webgpu'

export default function Lays() {
  const mountRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    const l2=new THREE.AmbientLight(0xffffff, 1)
    scene.add(l2);
    camera.position.setX(100)
    camera.position.setY(100)
    

    renderer.setSize(window.innerWidth, window.innerHeight)
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
    }

    // Making glass

    const glass = new THREE.BoxGeometry(1000, 50, 1000);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,          // White color (can adjust tint)
        roughness: 0.5,             // Smooth surface
        metalness: 1,             // Not metallic
        transmission: 1,          // Fully transparent
        ior: 1,                 // Index of Refraction (similar to glass)
        thickness: 0.1,           // Thickness of the material for refraction
        clearcoat: 1,             // Add a reflective layer
        clearcoatRoughness: 1,    // Smooth clearcoat
        opacity: 0.1,             // Slightly less transparent for a solid feel
        transparent: true         // Enable transparency
      });
      
      const glassSlab = new THREE.Mesh(glass, glassMaterial)
      glassSlab.position.set(20, 20, 0)
      scene.add(glassSlab);

      const daft_texture= new THREE.TextureLoader().load("src/assets/Daft_Punk_-_Random_Access_Memories.jpg")
      const daft = new THREE.CylinderGeometry(100, 100, 5,64)
      const daftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff 
        ,map:daft_texture
      })

      const daftMesh = new THREE.Mesh(daft, daftMaterial)
      daftMesh.position.set(0, -10, 0);
      scene.add(daftMesh)



    const orbit = new OrbitControls(camera, renderer.domElement)
    const grid = new THREE.GridHelper(1000, 100)
    scene.add(grid)


    camera.position.z = 5

    
    const extrudeSettings = {
      depth: 5,
      bevelEnabled: true
    }
    let radius = 100; // Radius of the circle
    var r=10
    const startAngle = 0; // Start angle in radians
    const endAngle = Math.PI / 9; // End angle in radians (90 degrees)
    for(var j=0;j<10;j++)
    {
      let add= 0
      radius+=25
      console.log(radius)
      for( var i=0;i<19;i++)
        {
          add+=Math.PI / 9;
          const shape2 = new THREE.Shape();
          shape2.moveTo(0, 0); 
          shape2.arc(0, 0, radius, startAngle, endAngle, false);
          shape2.lineTo(0, 0); 
          
          const innerShape = new THREE.Path();
          innerShape.moveTo(0, 0);
          innerShape.arc(0, 0, radius-10, startAngle, endAngle, false);
          innerShape.lineTo(0, 0);
          
          shape2.holes.push(innerShape);
          
          const geometryRect = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
          const materialRect = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
          const rectMesh = new THREE.Mesh(geometryRect, materialRect);
          rectMesh.rotation.x += Math.PI / 2
          scene.add(rectMesh);
          rectMesh.rotation.z+=add
          rectMesh.position.set(r*Math.cos(add), -15,r*Math.sin(add));
          
        }
    }

    

    const animate = () => {
      requestAnimationFrame(animate)
      daftMesh.rotation.y += 0.015
      orbit.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Autoplay was prevented:', error)
      })
    }
  }, [])
  return <div ref={mountRef}>
        <audio    ref={audioRef} loop>
        <source src="src/assets/Doin it Right (Official Audio).mp3" type="audio/mpeg" />
    </audio>
  </div>
}
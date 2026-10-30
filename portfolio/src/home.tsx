import { useEffect, useRef, useState } from 'react'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './index.css'
// import * as CANNON from 'cannon-es'
// import Stats from 'three/addons/libs/stats.module.js'

export default function Home(){

    const mountRef = useRef<HTMLDivElement>(null)
    const [ovals, setOvals] = useState<number[]>([1, 2, 3, 4]);
    console.log("load ing somthins")
    const handleClick = ()=>{
        setOvals(prev => [...prev, 1]);
    }

    return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
        <div
          style={{
            position: 'absolute',
            bottom:5,
            left: 5,
            backgroundColor: 'rgba(0, 10, 5, 0.85)',
            padding: '10px 24px',
            color: '#00ff88',
            fontFamily: 'monospace',
            minWidth: '600px',
            minHeight: '300px',
            // Custom shape
            clipPath:
              'polygon(0 0px, 0px 0, 100% calc(100% - 0px), 100% calc(100% - 0px), calc(100% - 0px) 100%, 0 100%)',

            borderLeft: '2px solid #00ff88',
            borderBottom: '2px solid #00ff88',
            borderRight: '2px solid #00ff88',
            borderTop: '2px solid #00ff88',
          }}
        >
          <h3
            style={{
              margin: '0 0 15px',
              letterSpacing: '3px',
              borderBottom: '1px solid #00ff8855',
              paddingBottom: '10px',
            }}
          >
            CONTROLS
          </h3>

          <p>W / ↑ : Accelerate</p>
          <p>S / ↓ : Brake</p>
          <p>A / ← : Turn Left</p>
          <p>D / → : Turn Right</p>
          <p>SPACE : Toggle Trail</p>
        </div>



                    <div
          style={{
            position: 'absolute',
            bottom:5,
            right: 5,
            backgroundColor: 'rgba(0, 10, 5, 0.85)',
            padding: '10px 24px',
            color: '#00ff88',
            fontFamily: 'monospace',
            minWidth: '600px',
            minHeight: '300px',
            // Custom shape
            clipPath:
              'polygon(0 0px, 0px 0, 0% calc(100% - 0%), 100% calc(100% - 0px), calc(100% - 0px) 0%, 0 100%)',

            borderLeft: '2px solid #00ff88',
            borderBottom: '2px solid #00ff88',
            borderRight: '2px solid #00ff88',
            borderTop: '2px solid #00ff88',
          }}
        >
          <h3
            style={{
              margin: '0 0 15px',
              letterSpacing: '3px',
              borderBottom: '1px solid #00ff8855',
              paddingBottom: '10px',
            }}
          >
            CONTROLS
          </h3>

          <p>W / ↑ : Accelerate</p>
          <p>S / ↓ : Brake</p>
          <p>A / ← : Turn Left</p>
          <p>D / → : Turn Right</p>
          <p>SPACE : Toggle Trail</p>
        </div>






        <div
          style={{
            position: 'absolute',
            top:5,
            right: 5,
            backgroundColor: 'rgba(0, 10, 5, 0.85)',
            padding: '10px 24px',
            color: '#00ff88',
            fontFamily: 'monospace',
            minWidth: '600px',
            minHeight: '300px',
            // Custom shape
            clipPath:
              'polygon(0 0px, 0px 0, 100% calc(100% - 0px), 100% calc(100% - 0%), calc(100% - 0%) 0%, 100% 0%)',

            borderLeft: '2px solid #00ff88',
            borderBottom: '2px solid #00ff88',
            borderRight: '2px solid #00ff88',
            borderTop: '2px solid #00ff88',
          }}
        >
          <h3
            style={{
              margin: '0 0 15px',
              letterSpacing: '3px',
              borderBottom: '1px solid #00ff8855',
              paddingBottom: '10px',
            }}
          >
            CONTROLS
          </h3>

          <p>W / ↑ : Accelerate</p>
          <p>S / ↓ : Brake</p>
          <p>A / ← : Turn Left</p>
          <p>D / → : Turn Right</p>
          <p>SPACE : Toggle Trail</p>
        </div>


        <div
          style={{
            position: 'absolute',
            top:5,
            left: 5,
            backgroundColor: 'rgba(0, 10, 5, 0.85)',
            padding: '10px 24px',
            color: '#00ff88',
            fontFamily: 'monospace',
            minWidth: '600px',
            minHeight: '300px',
            // Custom shape
            clipPath:
              'polygon(0 0px, 0px 0, 100% 0, 100% calc(100% - 100%), calc(100% - 100%) 100%, 0 100%)',

            borderLeft: '2px solid #00ff88',
            borderBottom: '2px solid #00ff88',
            borderRight: '2px solid #00ff88',
            borderTop: '2px solid #00ff88',
          }}
        >
          <h3
            style={{
              margin: '0 0 15px',
              letterSpacing: '3px',
              borderBottom: '1px solid #00ff8855',
              paddingBottom: '10px',
            }}
          >
            CONTROLS
          </h3>

          <p>W / ↑ : Accelerate</p>
          <p>S / ↓ : Brake</p>
          <p>A / ← : Turn Left</p>
          <p>D / → : Turn Right</p>
          <p>SPACE : Toggle Trail</p>
        </div>
    </div>
  );
}
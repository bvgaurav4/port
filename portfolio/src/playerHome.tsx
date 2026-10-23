import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import './index.css'
import * as CANNON from 'cannon-es'
import Stats from 'three/addons/libs/stats.module.js'

export default function PlayerHome(){

     return (
    <div style={{ position: 'relative' }}>
      {/* <div ref={mountRef} /> */}
      <div style={{
        position: 'absolute',
        top: window.innerHeight-200,
        right:window.innerWidth-250,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        color: '#00ff00',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '200px'
        }}>
          <div style={{ marginBottom: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Controls</h3>
          <p style={{ margin: '0 0 5px 0' }}>W/↑: Accelerate</p>
          <p style={{ margin: '0 0 5px 0' }}>S/↓: Brake</p>
          <p style={{ margin: '0 0 5px 0' }}>A/←: Turn Left</p>
          <p style={{ margin: '0 0 5px 0' }}>D/→: Turn Right</p>
          <p style={{ margin: '0' }}>Space: Toggle Trail</p>
      </div>
      </div>
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        color: '#00ff00',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        minWidth: '200px'
      }}>
              </div>

<div style={{
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  border: '4px solid #0000ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <div style={{
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'conic-gradient(from 200deg, #0000ff 0% 90%, transparent 90% 100%)',
    maskImage: 'radial-gradient(circle, transparent 60%, black 0%)',
    WebkitMaskImage: 'radial-gradient(circle, transparent 60%, black 50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    fontWeight: 'bold',
    userSelect: 'none',
  }}>
  </div>
    <div style={{ display: 'flex',flexDirection:'column', gap: '8px' }}>
        <div>score</div>
        <div>blue - yellow</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
        </div>
        <input></input>
            <button style={{
            backgroundColor: '#00ff00',
            color: 'black',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}>Url to connect</button>
      </div>
    </div>
          </div>

  )

}
// import { useEffect, useRef ,useState} from 'react'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import * as CANNON from 'cannon-es'
// import './index.css'

// export default function Test() {
//   const mountRef = useRef<HTMLDivElement>(null)
//   const [ovals, setOvals] = useState<number[]>([1, 2, 3, 4]);
//   const [ovalBlue, setOvalBlue] = useState<number[]>([1, 2, 3, 4]);
//   const [ovalBYellow, setOvalYellow] = useState<number[]>([1, 2, 3, 4]);


//   const handleClick = ()=>{
//     setOvals(prev => [...prev, 1]);
//   }
//   useEffect(() => {
//     const scene = new THREE.Scene()
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
//     camera.position.set(100, 10, 100)
//     camera.lookAt(0, 0, 0)

//     const renderer = new THREE.WebGLRenderer()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     if (mountRef.current) {
//       mountRef.current.appendChild(renderer.domElement)
//     }

//     const controls = new OrbitControls(camera, renderer.domElement)

//     // Lighting
//     const light = new THREE.AmbientLight(0xffffff)
//     scene.add(light)


//     const l2=new THREE.AmbientLight(0xffffff, 1)
//     scene.add(l2);
//     // Cannon.js physics world
//     const world = new CANNON.World({
//       gravity: new CANNON.Vec3(0, -9.82, 0),
//     })

//     // Cannon ground
//     const groundBody = new CANNON.Body({
//       type: CANNON.Body.STATIC,
//       shape: new CANNON.Plane(),
//     })
//     groundBody.quaternion.setFromEuler(-Math.PI / 2, Math.PI/9, 0)
//     world.addBody(groundBody) 

//     // Cannon box
//     const boxBody = new CANNON.Body({
//       mass: 1,
//       shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
//       position: new CANNON.Vec3(0, 10, 0),
//     })
//     // world.addBody(boxBody)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

//     // THREE.js box mesh
//     const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
//     const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
//     const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
//     scene.add(boxMesh)

//     // THREE.js ground mesh (optional visual aid)
//     const groundGeo = new THREE.PlaneGeometry(100, 100)
//     const groundMat = new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide })
//     const ground = new THREE.Mesh(groundGeo, groundMat)
//     ground.rotation.x = -Math.PI / 2
//     scene.add(ground)

//     const clock = new THREE.Clock()
//     // var style={{ width: '8px',
//     //         height: '25px',
//     //         backgroundColor: '#00ff00',
//     //         borderRadius: '9999px'
//     //       }}

//     const animate = () => {
//       requestAnimationFrame(animate)

//       const delta = clock.getDelta()
//       world.step(1 / 60, delta)

//       // Sync Three.js mesh position with Cannon.js body
//       boxMesh.position.copy(boxBody.position as any)
//       boxMesh.quaternion.copy(boxBody.quaternion as any)

//       controls.update()
//       renderer.render(scene, camera)
//     }
//     animate()


//     return () => {
//       if (mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement)
//       }
//     }
//   }, [])


//   return (
//     <div style={{ position: 'relative' }}>
//       <div ref={mountRef} />
//       <div style={{
//         position: 'absolute',
//         top: 600,
//         right: 1500,
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         padding: '15px',
//         borderRadius: '8px',
//         color: '#00ff00',
//         fontFamily: 'monospace',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//         minWidth: '200px'
//       }}>
//           <div style={{ marginBottom: '10px' }}>
//           <h3 style={{ margin: '0 0 10px 0' }}>Controls</h3>
//           <p style={{ margin: '0 0 5px 0' }}>W/↑: Accelerate</p>
//           <p style={{ margin: '0 0 5px 0' }}>S/↓: Brake</p>
//           <p style={{ margin: '0 0 5px 0' }}>A/←: Turn Left</p>
//           <p style={{ margin: '0 0 5px 0' }}>D/→: Turn Right</p>
//           <p style={{ margin: '0' }}>Space: Toggle Trail</p>
//         </div>
//       </div>
//       <div style={{
//         position: 'absolute',
//         top: 10,
//         right: 10,
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         padding: '15px',
//         borderRadius: '8px',
//         color: '#00ff00',
//         fontFamily: 'monospace',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//         alignItems: 'center',
//         minWidth: '200px'
//       }}>
// <div style={{
//   width: '100px',
//   height: '100px',
//   borderRadius: '50%',
//   border: '4px solid #0000ff',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }}>
//   <div style={{
//     width: '70px',
//     height: '70px',
//     borderRadius: '50%',
//     background: 'conic-gradient(from 200deg, #0000ff 0% 90%, transparent 90% 100%)',
//     maskImage: 'radial-gradient(circle, transparent 60%, black 0%)',
//     WebkitMaskImage: 'radial-gradient(circle, transparent 60%, black 50%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color:"white",
//     fontWeight: 'bold',
//     userSelect: 'none',
//   }}>
//   </div>
// </div>
//     <div style={{ display: 'flex',flexDirection:'column', gap: '8px' }}>
//           <div style={{ display: 'flex', gap: '8px' }}>
//             {ovals.map((_, index) => (
//               <div
//                 key={index}
//                 style={{
//                   width: '8px',
//                   height: '25px',
//                   backgroundColor: '#ffff00',
//                   borderRadius: '9999px'
//                 }}
//               ></div>
//             ))}
//           </div>

//             <div style={{ display: 'flex', gap: '8px' }}>
//             {ovals.map((_, index) => (
//               <div
//                 key={index}
//                 style={{
//                   width: '8px',
//                   height: '25px',
//                   backgroundColor: '#0000ff',
//                   borderRadius: '9999px'
//                 }}
//               ></div>
//             ))}
//           </div>
//         </div>
//         <div>score</div>
//         <div>blue - yellow</div>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
//           <button style={{
//             backgroundColor: '#00ff00',
//             color: 'black',
//             border: 'none',
//             padding: '8px',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontFamily: 'monospace'
//           }}>Reset</button>
//           <button style={{
//             backgroundColor: '#00ff00',
//             color: 'black',
//             border: 'none',
//             padding: '8px',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontFamily: 'monospace'
//           }}  onClick={handleClick}>Exit</button>
//         </div>
//       </div>
//     </div>
//   )

//   }

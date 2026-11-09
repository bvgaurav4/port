import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useEffect, useRef, useState } from 'react'
import * as CANNON from 'cannon-es'
import './index.css'
import ControlsPanel from './ControlsPanel'
import EdgePanel from './edgePannel'
import HorizontalEdgePanel from './HorizontalEdges'
// import Stats from 'three/addons/libs/stats.module.js'

type ClipUnit = 'px' | '%'
type ClipPoint = readonly [number, number]

const toPolygon = (points: readonly ClipPoint[], unit: ClipUnit = '%') =>
    `polygon(${points.map(([x, y]) => `${x}${unit} ${y}${unit}`).join(', ')})`

type CornerCuts = {
    topLeft?: number
    topRight?: number
    bottomRight?: number
    bottomLeft?: number
}

const chamferedRect = (
    { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 }: CornerCuts = {},
    unit: ClipUnit = '%',
) => {
    const points: ClipPoint[] = [[topLeft, 0]]
    points.push(topRight ? [100 - topRight, 0] : [100, 0])
    if (topRight) points.push([100, topRight])
    points.push(bottomRight ? [100, 100 - bottomRight] : [100, 100])
    if (bottomRight) points.push([100 - bottomRight, 100])
    points.push(bottomLeft ? [bottomLeft, 100] : [0, 100])
    if (bottomLeft) points.push([0, 100 - bottomLeft])
    if (topLeft) points.push([0, topLeft])
    return toPolygon(points, unit)
}

const CUT = 100
const PANEL_WIDTH = 1200
const LEAD = (150 / PANEL_WIDTH) * 100
const SLANT_LEFT = 14
const SLANT_RIGHT = 87

const PANEL_SIZE = {
    controls: { width: '450px', height: '300px' },
    edge: { width: '150px', height: '530px' },
    horizontal: { width: `${PANEL_WIDTH}px`, height: '85px' },
}

const clips = {
    controlsBottomLeft: chamferedRect({ topRight: CUT }),
    edgeLeft: chamferedRect(),
    edgeRight: chamferedRect(),
    horizontalBottomRight: toPolygon([
        [0, 0], [0, 0], [100, 0], [SLANT_RIGHT, 100], [100, 100], [SLANT_LEFT, 100],
    ]),
    horizontalTopRight: toPolygon([
        [LEAD, 0], [0, 0], [SLANT_RIGHT, 0], [100, 100], [100, 100], [0, 100],
    ]),
    controlsBottomRight: toPolygon([
        [0, 0], [0, 0], [0, 100], [100, 100], [100, 0], [0, 100],
    ]),
    controlsTopRight: chamferedRect({ bottomLeft: CUT }),
    controlsTopLeft: chamferedRect({ bottomRight: CUT }),
}

export default function Home(){

      const hitBox = () => {
        const material =  new CANNON.Material({
          friction:0,
          restitution:0
        })
        const boxBody = new CANNON.Body({
          mass: 1000,
          shape: new CANNON.Box(new CANNON.Vec3(0.3, 0.4, 0.9)),
          position: new CANNON.Vec3(0,0.5, 0),
          quaternion: new CANNON.Quaternion(0,0,0),
          material:material
        })
        return boxBody;
      }

    const mountRef = useRef<HTMLDivElement>(null)
      useEffect(() => {
          const keyMap: { [key: string]: boolean } = {}
          let speed = 0
          const acceleration = 0.1
          const maxSpeed = 10
        const onDocumentKey = (e: KeyboardEvent) => {
          keyMap[e.code] = e.type === 'keydown'
          if (keyMap['KeyW'] || keyMap['ArrowUp']) {
            console.log("increasing speed",speed)
            speed = Math.min(speed + acceleration,maxSpeed)
          }
          if (keyMap['KeyS'] || keyMap['ArrowDown']) {
            console.log("decreasing speed",speed)
            speed = Math.max(speed - acceleration,0)
          }
        }

          const renderer = new THREE.WebGLRenderer()
          renderer.setSize(window.innerWidth, window.innerHeight)

          const scene = new THREE.Scene()

          const world = new CANNON.World({
            gravity: new CANNON.Vec3(0, 0, 0),
          })

          const clock = new THREE.Clock()
          const groundMaterial = new CANNON.Material({
            friction:0.4,
            restitution:0
          });

          const groundBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
            position : new CANNON.Vec3(0,0,0),
            material:groundMaterial
          })
          world.addBody(groundBody)

          const pilBody = hitBox()
          const geometry = new THREE.CapsuleGeometry( 1, 10, 8, 8 );
          const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
          const capsule = new THREE.Mesh( geometry, material );
          // capsule.rotation.z +=Math.PI/2
          scene.add( capsule );
          
          scene.add(capsule)
          world.addBody(pilBody);


          const grid = new THREE.GridHelper(1000, 100)
          scene.add(grid)

          const canvas = renderer.domElement;
          canvas.addEventListener("click", () => {
              canvas.requestPointerLock();
          });

          let yaw = 0;
          let pitch = 0;
          const sensitivity = 0.002;
          const yawQuaternion = new THREE.Quaternion();
          const pitchQuaternion = new THREE.Quaternion();
          const worldUp = new THREE.Vector3(0, 1, 0);
          const localRight = new THREE.Vector3(1, 0, 0);


          // listners
          document.addEventListener('keydown', onDocumentKey, false)
          document.addEventListener('keyup', onDocumentKey, false)
          document.addEventListener("mousemove", (event) => {
              if (document.pointerLockElement !== canvas) return;
              yaw -= event.movementX * sensitivity;
              pitch -= event.movementY * sensitivity;
              yawQuaternion.setFromAxisAngle(worldUp, yaw);
              pitchQuaternion.setFromAxisAngle(localRight, pitch);
              camera.quaternion
                  .copy(yawQuaternion)
                  .multiply(pitchQuaternion);
              capsule.quaternion
                  .copy(yawQuaternion)
                  .multiply(pitchQuaternion);
          });

          const l2=new THREE.AmbientLight(0xffffff, 1)
          scene.add(l2);
          
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200)
          camera.position.x=10
          camera.position.z=10
          camera.position.y=10

          // const orbit = new OrbitControls(camera, renderer.domElement)

          if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
          }

          const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta()
            world.step(1 / 60, delta)
            // camera.lookAt(capsule.position)
            const euler = new THREE.Euler();
            euler.setFromQuaternion(capsule.quaternion, 'YXZ');
            const angleX = euler.x;
            const angleY = euler.y;
            pilBody.velocity.x = speed*10*Math.cos(angleY)
            pilBody.velocity.y = speed*10*Math.sin(angleX)
            pilBody.velocity.z = speed*10*Math.sin(angleY)
            console.log(pilBody.position)
            capsule.position.copy(pilBody.position as any)
            var r=10
            var x = r * Math.sin(angleX)
            var z = r * Math.cos(angleX)
            camera.position.set(capsule.position.x-r,capsule.position.y-r,capsule.position.z-r) 
            renderer.render(scene, camera);

            
          }
          animate()
            return ()=>{

              if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement)
                renderer.setSize(window.innerWidth, window.innerHeight);
              }
          }
      },[]);

    return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ bottom: 5, left: 5 }}
          clipPath={clips.controlsBottomLeft}
        />


        <EdgePanel
          {...PANEL_SIZE.edge}
          placement={{ bottom: 200, left: 5 }}
          clipPath={clips.edgeLeft}
        />


        <EdgePanel
          {...PANEL_SIZE.edge}
          placement={{ bottom: 200, right: 5 }}
          clipPath={clips.edgeRight}
        />



        <HorizontalEdgePanel
          {...PANEL_SIZE.horizontal}
          placement={{ bottom: 5, right: 335 }}
          clipPath={clips.horizontalBottomRight}
        />

        <HorizontalEdgePanel
          {...PANEL_SIZE.horizontal}
          title='Play'
          placement={{ top: 5, right: 335 }}
          clipPath={clips.horizontalTopRight}
        />

        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ bottom: 5, right: 5 }}
          clipPath={clips.controlsBottomRight}
        />

        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ top: 5, right: 5 }}
          clipPath={clips.controlsTopRight}
        />

        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ top: 5, left: 5 }}
          clipPath={clips.controlsTopLeft}
        />
    </div>
  );
}
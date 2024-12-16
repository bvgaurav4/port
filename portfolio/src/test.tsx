import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { add } from 'three/examples/jsm/libs/tween.module.js'

export default function Test() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        mount.appendChild(renderer.domElement)

        const l2 = new THREE.AmbientLight(0xffffff, 1)
        scene.add(l2)
        // camera.position.set(40, 40, 40)
        const controls = new OrbitControls( camera, renderer.domElement );


        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)





        function add_starts(){
            const sphere= new THREE.SphereGeometry(0.25,24,24)
            const sphere_mesh=new THREE.MeshStandardMaterial({color:0xffffff})
            const star=new THREE.Mesh(sphere,sphere_mesh);
            const [x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
            star.position.set(x,Math.abs(y),z);
            scene.add(star)
            }
            Array(2000).fill().forEach(add_starts)
        function flight_path(){
            const    [x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
            return new THREE.Vector3(x,10+Math.abs(y),z);
            }
            var lol =Array(20).fill().map(flight_path)
            console.log(lol)

        const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// const path = new THREE.CatmullRomCurve3([
//   new THREE.Vector3(-10, 0, -10),
//   new THREE.Vector3(-5, 5, 0),
//   new THREE.Vector3(0, 0, 10),
//   new THREE.Vector3(5, -5, 0),
//   new THREE.Vector3(10, 0, -10),
//   new THREE.Vector3(-5, 10, -10),
//   new THREE.Vector3(-1, 5, -10),
//   new THREE.Vector3(-10, 0, -10),
// ]);

const path = new THREE.CatmullRomCurve3(lol);

const pathPoints = path.getPoints(100);
const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const pathLine = new THREE.Line(pathGeometry, pathMaterial);
scene.add(pathLine);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const object = new THREE.Mesh(geometry, material);
scene.add(object);

camera.position.set(0, 10, 20);
// camera.lookAt(0, 0, 0);

let progress = 0; // Progress along the path (0 to 1)
const speed = 0.002; // Adjust speed

function animate() {
  progress += speed; // Increment progress
  if (progress > 1) progress = 0; // Loop back to the start
  const position = path.getPointAt(progress); // Normalized position
  object.position.copy(position);

  const tangent = path.getTangentAt(progress); // Direction of the path
  object.rotation.y = Math.atan2(tangent.x, tangent.z);
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

        return () => {
            window.removeEventListener('resize', handleResize)
            if (mount) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return <div ref={mountRef}></div>
}
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

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
        camera.position.set(40, 40, 40)
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.update()
        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const grid = new THREE.GridHelper(1000, 100)
    scene.add(grid)
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        const torusKnot = new THREE.Mesh(geometry, material)
        scene.add(torusKnot)

        const animate = () => {
            requestAnimationFrame(animate)
            camera.lookAt(10,10,10);
            // controls.update();

            renderer.render(scene, camera)
        }
        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (mount) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return <div ref={mountRef}></div>
}
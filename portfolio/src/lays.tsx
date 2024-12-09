import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './index.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
      const daft = new THREE.CylinderGeometry(110, 110, 5,64)
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

    let radius = 100; // Radius of the circle
    const endAngle = Math.PI / 9; // End angle in radians (90 degrees)
    for(var j=0;j<10;j++)
    {
      let add= 0
      radius+=25
      for( var i=0;i<16;i++)
        {
          add+=Math.PI/8;
          const geometry = new THREE.CylinderGeometry( radius-15, radius, 0, 64,1,true,add,endAngle); 
          const material = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
          const cylinder = new THREE.Mesh( geometry, material );
          cylinder.position.set(0, -15,0 );
          scene.add( cylinder );
        }
    }





    const loader = new GLTFLoader();

    loader.load( 'src/assets/cat_arcade_machine4k.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(20, 20, 20) // Scale the model to twice its original size
      scene.add( model );

    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );



    loader.load( 'src/assets/postapocaliptic_diablo_arcade_machine (1).glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(20, 20, 20) // Scale the model to twice its original size
      model.position.set(20,20,20)
      scene.add( model );

    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );


    loader.load( 'src/assets/blade_runner_arcade_cabinet.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(0.090, 0.090, 0.090) // Scale the model to twice its original size
      scene.add( model );

    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );




    const animate = () => {
      requestAnimationFrame(animate)
      daftMesh.rotation.y += 0.013
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
        {/* <audio    ref={audioRef} loop>
        <source src="src/assets/Doin it Right (Official Audio).mp3" type="audio/mpeg" />
    </audio> */}

  </div>
}
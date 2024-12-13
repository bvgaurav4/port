import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './index.css'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
    camera.position.setX(40)
    camera.position.setY(40)


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
      daftMesh.position.set(100, -10, 100);
      scene.add(daftMesh)

      // let a=daftMesh.position.clone();
      // a.add(new THREE.Vector3(0,10,0));
      
      // camera.lookAt(a);



    const orbit = new OrbitControls(camera, renderer.domElement)
    const grid = new THREE.GridHelper(1000, 100)
    scene.add(grid)
    orbit.enableDamping = true; // For smooth motion
    orbit.dampingFactor = 0.05;
    orbit.enablePan = true;    // Allow panning
    orbit.enableZoom = true; 
    let radius = 100; // Radius of the circle
    const endAngle = Math.PI / 9; // End angle in radians (90 degrees)


    let lol=new THREE.Vector3(0,0,0);
    camera.lookAt(lol);
    orbit.update()
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
          // scene.add( cylinder );
        }
    }

    const r=130
    // for(var i =0;i<6;i++)
    // {
    //   const geometry = new THREE.CapsuleGeometry( 10, 10, 40, 80 ); 
    //   const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
    //   const capsule = new THREE.Mesh( geometry, material ); scene.add( capsule );

    //   capsule.position.set(r*Math.cos(2*i*Math.PI/6),20,r*Math.sin(2*i*Math.PI/6));
    // }

    const loader = new GLTFLoader();


      // degree 0
    loader.load( 'src/assets/postapocaliptic_diablo_arcade_machine.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(20, 20, 20) 
      model.position.set(0,20,0)
      model.position.x+=r*Math.cos(2*0*Math.PI/6);
      model.position.z+=r*Math.sin(2*0*Math.PI/6);
      // scene.add( model );

    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );
    // model.position.set(-20,10,70);

//degree 60

    loader.load(
      'src/assets/cat_arcade_machine4k.glb',
      function (gltf) {
        const model = gltf.scene;
    
        model.scale.set(20, 20, 20);
    
        const box = new THREE.Box3().setFromObject(model);
    
        const center = new THREE.Vector3();
        box.getCenter(center);
        console.log(center);
        model.position.sub(center);
    

        const size = new THREE.Vector3();
        box.getSize(size);
        model.position.y += size.y / 2;
    
        // scene.add(model);
        model.position.x+=r*Math.cos(2*1*Math.PI/6);
        model.position.z+=r*Math.sin(2*1*Math.PI/6);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );    

    




//120 degree  
    loader.load( 'src/assets/blade_runner_arcade_cabinet.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(0.090, 0.090, 0.090) 
      // scene.add( model );
      model.position.x+=r*Math.cos(2*2*Math.PI/6);
      model.position.z+=r*Math.sin(2*2*Math.PI/6);
      model.rotateY(-1*Math.PI/6)
    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );


// 240 degrees
    loader.load( 'src/assets/dbz.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(20, 20, 20) 
      // scene.add( model );
      model.position.set(0,0,0);
      model.position.x+=r*Math.cos(2*4*Math.PI/6);
      model.position.z+=r*Math.sin(2*4*Math.PI/6);
      model.rotation.y-=Math.PI/3
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );



//180 degrees
    loader.load( 'src/assets/cyberpunk_arcade_machine.glb ', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(20, 20, 20) 
      // scene.add( model );
      model.position.set(0,20,0);
      model.position.x+=r*Math.cos(2*3*Math.PI/6);
      model.position.z+=r*Math.sin(2*3*Math.PI/6);
      model.rotateY(Math.PI)

    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );
    
    
    // 300 degrees
// Variables for raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let screenMesh; // Reference to the screen for raycasting

loader.load(
  'src/assets/arcade_machine__automaping.glb',
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);

    // Position the model
    const r = 10; // Example radius
    model.position.set(0, 0, 0);
    model.position.x += r * Math.cos((2 * 5 * Math.PI) / 6);
    model.position.z += r * Math.sin((2 * 5 * Math.PI) / 6);
    model.rotation.y += Math.PI / 2 + Math.PI / 6 + Math.PI / 6;

    // Create a virtual canvas for scrollable content
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 256;
    const screenContext = screenCanvas.getContext('2d');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });

    // Create the screen geometry and mesh
    const screenGeometry = new THREE.PlaneGeometry(2, 1.5);
    screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.set(0, 2, 0.5); // Adjust to align with the arcade model
    // model.add(screenMesh);

    // Add the model with the screen to the scene
    // scene.add(model);

    // Draw initial content
    screenContext.fillStyle = 'black';
    screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
    screenContext.fillStyle = 'white';
    screenContext.font = '30px Arial';
    screenContext.fillText('Click Me!', 180, 130);
    screenTexture.needsUpdate = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);




      const geometry = new THREE.CapsuleGeometry( 10, 10, 40, 80 ); 
      const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
      const capsule = new THREE.Mesh( geometry, material ); scene.add( capsule );
  



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
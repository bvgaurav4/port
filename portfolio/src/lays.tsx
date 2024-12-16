import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './index.css'
// @import url('https://fonts.cdnfonts.com/css/seven-segment');

// import * as CANNON from 'cannon'

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
    camera.position.setX(0)
    camera.position.setY(400)


    renderer.setSize(window.innerWidth, window.innerHeight)
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
    }
      const daft_texture= new THREE.TextureLoader().load("src/assets/Daft_Punk_-_Random_Access_Memories.jpg")
      const daft = new THREE.CylinderGeometry(110, 110, 5,64)
      const daftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff 
        ,map:daft_texture
      })

      const daftMesh = new THREE.Mesh(daft, daftMaterial)
      daftMesh.position.set(0, -10, 0);
      scene.add(daftMesh)

      // let a=daftMesh.position.clone();
      // a.add(new THREE.Vector3(0,10,0));
      
      // camera.lookAt(a);



    const orbit = new OrbitControls(camera, renderer.domElement)
    const grid = new THREE.GridHelper(1000, 100)
    scene.add(grid)
    orbit.enableDamping = false; // For smooth motion
    orbit.dampingFactor = 1;
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
          scene.add( cylinder );
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





    //loading  all the arcade machines

    const loader = new GLTFLoader();
      // degree 0
    loader.load( 'src/assets/postapocaliptic_diablo_arcade_machine.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(20, 20, 20) 
      model.position.set(0,20,0)
      model.position.x+=r*Math.cos(2*0*Math.PI/6);
      model.position.z+=r*Math.sin(2*0*Math.PI/6);
      scene.add( model );

      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1524;
      screenCanvas.height = 1524;
      const screenContext = screenCanvas.getContext('2d');
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
  
      const screenGeometry = new THREE.PlaneGeometry(0.5, 0.5);
      let screenMesh; 

      screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.set(0.2,0.3, 0);

      screenMesh.rotation.y+=Math.PI/2

      model.add(screenMesh);

      screenContext.fillStyle = 'dark green';
      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
      screenContext.fillStyle = 'white';
      screenContext.font = '30px Seven Segment';
      screenContext.fillText('Hi my name is', 180, 130);
      screenTexture.needsUpdate = true;

    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );





//degree 60


      loader.load( 'src/assets/final_fight_arcade.glb', function ( gltf ) {
        const model = gltf.scene
        model.scale.set(20, 20, 20) 
        model.position.set(0,0,0);
        model.position.x+=r*Math.cos(2*1*Math.PI/6);
        model.position.z+=r*Math.sin(2*1*Math.PI/6);
        model.rotateY(Math.PI/6)
        scene.add( model );

        const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 1024;
      const screenContext = screenCanvas.getContext('2d');
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
  
      const screenGeometry = new THREE.PlaneGeometry(0.5, 0.5);
      let screenMesh; 
      screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.set(0,1.2, 0.1);


      screenMesh.rotation.x-=Math.PI/8

      model.add(screenMesh);

      screenContext.fillStyle = 'dark green';
      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
      screenContext.fillStyle = 'white';
      screenContext.font = '30px Seven Segment';
      screenContext.fillText('Hi my name is', 180, 130);
      screenTexture.needsUpdate = true;

      }, undefined, function ( error ) {

        console.error( error );

      } );

    
      camera.position.setX((r+30)*Math.cos(2*2*Math.PI/6));
      camera.position.setZ((r+30)*Math.sin(2*2*Math.PI/6));
      
      camera.position.setY(30)
  
    
    //120 degree  
    loader.load( 'src/assets/blade_runner_arcade_cabinet.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(0.090, 0.090, 0.090) 
      model.position.x+=r*Math.cos(2*2*Math.PI/6);
      model.position.z+=r*Math.sin(2*2*Math.PI/6);
      model.rotateY(-1*Math.PI/6)
      scene.add( model );
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 1024;
      const screenContext = screenCanvas.getContext('2d');
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
  
      const screenGeometry = new THREE.PlaneGeometry(1, 1);
      let screenMesh; 
      screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.set(0,360, -8);
      screenMesh.rotation.x-=Math.PI/10;
      screenMesh.scale.set(200,200,200)
      model.add(screenMesh);

      screenContext.fillStyle = 'dark green';
      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
      screenContext.fillStyle = 'white';
      screenContext.font = '30px Seven Segment';
      screenContext.fillText('Hi my name is', 180, 130);
      screenTexture.needsUpdate = true;


      
    }, undefined, function ( error ) {
      
      console.error( error );
      
    } );





    //180 degrees
        loader.load( 'src/assets/arcade_machine (2).glb', function ( gltf ) {
          const model = gltf.scene
          model.scale.set(0.1, 0.1, 0.1) 
          model.position.set(0,20,0);
          model.position.x+=r*Math.cos(2*3*Math.PI/6);
          model.position.z+=r*Math.sin(2*3*Math.PI/6);
          model.rotateY(Math.PI/4)
          model.rotation.y+=(Math.PI+0.05)
          scene.add( model );

          const screenCanvas = document.createElement('canvas');
          screenCanvas.width = 1024;
          screenCanvas.height = 1024;
          const screenContext = screenCanvas.getContext('2d');
          const screenTexture = new THREE.CanvasTexture(screenCanvas);
          const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
      
          const screenGeometry = new THREE.PlaneGeometry(1, 1);
          let screenMesh; 

          screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
          screenMesh.position.set(40,70,40);
          screenMesh.scale.set(150,150,150)
          screenMesh.rotation.y+=Math.PI/4;
          model.add(screenMesh);
    
          screenContext.fillStyle = 'dark green';
          screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
          screenContext.fillStyle = 'white';
          screenContext.font = '30px Seven Segment';
          screenContext.fillText('Hi my name is', 180, 130);
          screenTexture.needsUpdate = true;
    
        }, undefined, function ( error ) {
        
          console.error( error );
        
        } );
        


// 240 degrees
    loader.load( 'src/assets/arcade_machine__automaping.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(10, 10, 10) 
      model.position.set(0,0,0);
      model.rotateY(-Math.PI/2)
      model.rotation.y-=(Math.PI/3)
      
      model.position.x+=r*Math.cos(2*4*Math.PI/6);
      model.position.z+=r*Math.sin(2*4*Math.PI/6);
      scene.add( model );
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 1024;
      const screenContext = screenCanvas.getContext('2d');
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
  
      const screenGeometry = new THREE.PlaneGeometry(0.8, 0.5);
      let screenMesh; 

      screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.scale.set(2,2,2)
      screenMesh.position.set(0,2.7,0.27);


      screenMesh.rotation.x-=Math.PI/8

      model.add(screenMesh);

      screenContext.fillStyle = 'dark green';
      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
      screenContext.fillStyle = 'white';
      screenContext.font = '30px Seven Segment';
      screenContext.fillText('Hi my name is', 180, 130);
      screenTexture.needsUpdate = true;
      
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );



// 300 degrees
    loader.load( 'src/assets/ppl_2.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(24, 24, 24) 
      model.position.set(0,25,0);
      model.position.x+=r*Math.cos(2*5*Math.PI/6)+12;
      model.position.z+=r*Math.sin(2*5*Math.PI/6)-10;
      model.rotation.y=Math.PI
      scene.add( model );

      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 1024;
      const screenContext = screenCanvas.getContext('2d');
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
  
      const screenGeometry = new THREE.PlaneGeometry(0.5, 0.5);
      let screenMesh; 

      screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.rotation.y-=Math.PI/6
      screenMesh.position.set(0.6,0.3, -0.2);     
       screenMesh.rotation.z-=Math.PI/14;

      screenMesh.rotation.x-=Math.PI/8

      model.add(screenMesh);

      screenContext.fillStyle = 'dark green';
      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
      screenContext.fillStyle = 'white';
      screenContext.font = '30px Seven Segment';
      screenContext.fillText('Hi my name is', 180, 130);
      screenTexture.needsUpdate = true;
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );





function flight_path(){
  const    [x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1000));
  return new THREE.Vector3(x,10+Math.abs(y),z);
  }
var lol_flight_path =Array(20).fill().map(flight_path)

const path = new THREE.CatmullRomCurve3(lol_flight_path);
const pathPoints = path.getPoints(100);
const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const pathLine = new THREE.Line(pathGeometry, pathMaterial);
// scene.add(pathLine);  

// Sword fish
loader.load('src/assets/swordfish_ll.glb', function (gltf) {
  const model = gltf.scene;
  
  model.scale.set(200, 200, 200);
  model.position.set(-100, 50, 0);
  // scene.add(model);
  let progress = 0; 
  const speed = 0.0002; 


  function animate() {
    progress += speed; 
    if (progress > 1) progress = 0; 
    const position = path.getPointAt(progress); 
    model.position.copy(position);
  
    const tangent = path.getTangentAt(progress);
    model.rotation.y = Math.atan2(tangent.x, tangent.z);
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  animate();

}, undefined, function (error) {
  console.error(error);
});

//adding stars

    // function add_starts(){
    //     const sphere= new THREE.SphereGeometry(0.25,24,24)
    //     const sphere_mesh=new THREE.MeshStandardMaterial({color:0xffffff})
    //     const star=new THREE.Mesh(sphere,sphere_mesh);
    //     const [x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1000));
    //     star.position.set(x,Math.abs(y),z);
    //     scene.add(star)
    //     }
    //     Array(2000).fill().forEach(add_starts)


// const geometry = new THREE.CapsuleGeometry( 10, 10, 40, 80 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
// const capsule = new THREE.Mesh( geometry, material ); scene.add( capsule );
    const animate = () => {
      requestAnimationFrame(animate)
      daftMesh.rotation.y += 0.013
      // camera.lookAt(40,50,0);

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
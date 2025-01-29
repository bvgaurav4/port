import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './index.css'
import jsonData from "./projects.txt"


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default function Lays() {
  const mountRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  useEffect(() => {
    const scene = new THREE.Scene()
    // const font = new FontFace('Seven Segment', 'url(/assets/seven-segment/Seven.ttf)');
    // const projects=jsonData.projects
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer()
    const l2=new THREE.AmbientLight(0xffffff, 1)
    scene.add(l2);
    camera.position.setX(0)
    camera.position.setY(400)


    renderer.setSize(window.innerWidth, window.innerHeight)
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
    }
      const daft_texture= new THREE.TextureLoader().load(" /assets/Daft_Punk_-_Random_Access_Memories.jpg")
      const daft = new THREE.CylinderGeometry(110, 110, 5,64)
      const daftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff 
        ,map:daft_texture
      })
      const daftMesh = new THREE.Mesh(daft, daftMaterial)
      daftMesh.position.set(0, -10, 0);
      scene.add(daftMesh)
      
      const geometry = new THREE.ConeGeometry(350, 200, 32 ); 
      const material = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
      const cone = new THREE.Mesh(geometry, material );
      cone.position.set(0, -150, 0);
      cone.rotateX(Math.PI)
      // scene.add( cone ); 
      // let a=daftMesh.position.clone();
      // a.add(new THREE.Vector3(0,10,0));
      
      // camera.lookAt(a);



    const orbit = new OrbitControls(camera, renderer.domElement)
    const grid = new THREE.GridHelper(1000, 100)
    scene.add(grid)
    orbit.enableDamping = false; 
    orbit.dampingFactor = 1;
    orbit.enablePan = true;    
    orbit.enableZoom = true; 

    const colors=[0x00ff00,0xffff00,0xFfa000,0xff0000,0xff00ff]
    // let lol=new THREE.Vector3(0,0,0);
    // camera.lookAt(lol);
    // orbit.update()
var rr=130;
var freq: THREE.MeshBasicMaterial[][] = Array.from({ length: 8 }, () => []);
for(var j=0;j<10;j++)
{
  var a2=-Math.PI/2;
  for(let i = 0; i < 16;i++){
    const boxGeometry = new THREE.BoxGeometry(rr*Math.PI/10, 5, 10, 20, 20, 1); 

    const positionAttribute = boxGeometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const z = positionAttribute.getZ(i);
      const bendAmount =-(x*x+z*z)/200; 
      positionAttribute.setZ(i, z + bendAmount);
    }

      boxGeometry.attributes.position.needsUpdate = true;

      const material2 = new THREE.MeshBasicMaterial( {color: colors[Math.floor(j / 2)]} )
      const bentBox = new THREE.Mesh(boxGeometry, material2);

      scene.add(bentBox);
      freq[i%8].push(material2);

      bentBox.position.set(0,-15,0);
      bentBox.position.x=rr*Math.cos(i*Math.PI/8);
      bentBox.position.z=rr*Math.sin(i*Math.PI/8);
      bentBox.rotation.y-=a2;
      a2+=Math.PI/8;      
    }
    rr+=20;
    }
    // for(var j=0;j<10;j++)
    // {
    //   console.log(j,c2[Math.floor(j / 2)]);
    //   let add= 0
    //   radius+=25
    //   for( var i=0;i<16;i++)
    //     {
    //       add+=Math.PI/8;
    //       const geometry = new THREE.CylinderGeometry( radius-15, radius, 0, 64,1,true,add,endAngle); 
    //       const material = new THREE.MeshBasicMaterial( {color: colors[Math.floor(j / 2)]} ); 
    //       const cylinder = new THREE.Mesh( geometry, material );
    //       cylinder.position.set(0, -15,0 );
    //       scene.add( cylinder );
    //     }
    // }

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
    loader.load( ' /assets/postapocaliptic_diablo_arcade_machine.glb ', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(20, 20, 20) 
      model.position.set(0,20,0)
      model.position.x+=r*Math.cos(2*0*Math.PI/6);
      model.position.z+=r*Math.sin(2*0*Math.PI/6);
      scene.add( model );

      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1524;
      screenCanvas.height = 1524;
      screenCanvas.style.borderRadius="200px"
      const screenContext = screenCanvas.getContext('2d');
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
  
      const screenGeometry = new THREE.PlaneGeometry(0.5, 0.5);
      let screenMesh; 

      screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.set(0.2,0.3, 0);

      screenMesh.rotation.y+=Math.PI/2

      model.add(screenMesh);

      if(screenContext){
        // screenContext.fillStyle = '';
        screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        screenContext.fillStyle = 'green';
        screenContext.font = '40px MyCustomFont';
        var text="Currently pursuing a Bachelor’s in Computer Science at PES University, with a strong passion for software development. Proficient in Java, Python, and C/C++, I have built impactful web applications, machine learning models, and games. Known for problem-solving and quick adaptability, I am eager to bring my skills and enthusiasm to a collaborative development team focused on innovative solutions." 
        var textarray=text.split(" ")
        var t2=Array();
        var count=0;
        var c2=0;
        for(var i=0;i<textarray.length;i++)
        {
          if((count+textarray[i].length)*30>1524)
          {
            c2++;
            count=0;
            var str=t2.join(" ")
            screenContext.fillText(str, 180, 130+c2*55);
            t2=Array();
          }else{
            t2.push(textarray[i]);
            count+=textarray[i].length;
          }
          
        }
        var str=t2.join(" ")
        screenContext.fillText(str, 180, 130+(c2+1)*35);
        

        const screenCanvas1 = document.createElement('canvas');
        screenCanvas1.width = 1524;
        screenCanvas1.height = 1524;

        const screenContext1 = screenCanvas1.getContext('2d');
        const screenTexture1 = new THREE.CanvasTexture(screenCanvas1);
        const screenMaterial1 = new THREE.MeshBasicMaterial({ map: screenTexture1 });
        if(screenContext1!=null)
        {
          screenContext1.fillStyle= 'rgba(70, 106, 160, 0.1) '; 
        }
        const screenGeometry1 = new THREE.PlaneGeometry(0.5, 0.5);
        let screenMesh1; 
        screenMesh1 = new THREE.Mesh(screenGeometry1, screenMaterial1);
        screenMesh1.position.set(1.2,0.3, 1);
  
        screenMesh1.rotation.y+=Math.PI/2
        model.add(screenMesh1);

        const img = new Image();
        img.src = '/assets/Daft_Punk_-_Random_Access_Memories.jpg'; 
        img.onload = () => {

          if(screenContext1){
            screenContext1.drawImage(img, 0, 0, screenCanvas.width, screenCanvas.height);
          }
        
        };


        screenTexture.needsUpdate = true;
      }

    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );





//degree 60
      loader.load( ' /assets/final_fight_arcade.glb', function ( gltf ) {
        const model = gltf.scene
        model.scale.set(20, 20, 20) 
        model.position.set(0,0,0);
        model.position.x+=r*Math.cos(2*1*Math.PI/6);
        model.position.z+=r*Math.sin(2*1*Math.PI/6);
        model.rotateY(Math.PI/6)
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
      screenMesh.position.set(0,1.2, 0.1);
      screenMesh.rotation.x-=Math.PI/8

      model.add(screenMesh);

      if(screenContext){

        screenContext.fillStyle = 'dark green';
        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        screenContext.fillStyle = 'white';
        screenContext.font = '30px Seven Segment';        
      if(screenContext){
        // screenContext.fillStyle = '';
        screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        var text="";
        screenContext.fillStyle = 'green';
        screenContext.font = '40px MyCustomFont';
        var textarray=text.split(" ")
        var t2=Array();
        var count=0;
        var c2=0;
        for(var i=0;i<textarray.length;i++)
        {
          if((count+textarray[i].length)*30>1524)
          {
            c2++;
            count=0;
            var str=t2.join(" ")
            screenContext.fillText(str, 180, 130+c2*55);
            t2=Array();
          }else{
            t2.push(textarray[i]);
            count+=textarray[i].length;
          }
          
        }
        var str=t2.join(" ")
        screenContext.fillText(str, 180, 130+(c2+1)*35);
      }
        screenTexture.needsUpdate = true;
      }

      }, undefined, function ( error ) {

        console.error( error );

      } );

    

    
    //120 degree  
    loader.load( ' /assets/blade_runner_arcade_cabinet.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(0.090, 0.090, 0.090) 
      model.position.x+=r*Math.cos(2*2*Math.PI/6);
      model.position.z+=r*Math.sin(2*2*Math.PI/6);
      model.rotateY(-1*Math.PI/6)
      scene.add( model );
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1524;
      screenCanvas.height = 1524;
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

      if(screenContext){

        screenContext.fillStyle = 'dark green';
        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        screenContext.fillStyle = 'white';
        screenContext.font = '30px Seven Segment';
        
      if(screenContext){
        // screenContext.fillStyle = '';
        screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        screenContext.fillStyle = 'green';
        screenContext.font = '40px MyCustomFont';
        var text="Currently pursuing a Bachelor’s in Computer Science at PES University, with a strong passion for software development. Proficient in Java, Python, and C/C++, I have built impactful web applications, machine learning models, and games. Known for problem-solving and quick adaptability, I am eager to bring my skills and enthusiasm to a collaborative development team focused on innovative solutions." 
        var textarray=text.split(" ")
        var t2=Array();
        var count=0;
        var c2=0;
        for(var i=0;i<textarray.length;i++)
        {
          if((count+textarray[i].length)*30>1524)
          {
            c2++;
            count=0;
            var str=t2.join(" ")
            screenContext.fillText(str, 180, 130+c2*55);
            t2=Array();
          }else{
            t2.push(textarray[i]);
            count+=textarray[i].length;
          }
          
        }
        var str=t2.join(" ")
        screenContext.fillText(str, 180, 130+(c2+1)*35);
        
      }
        screenTexture.needsUpdate = true;
      }


      
    }, undefined, function ( error ) {
      
      console.error( error );
      
    } );





    //180 degrees
        loader.load( ' /assets/arcade_machine (2).glb', function ( gltf ) {
          const model = gltf.scene
          model.scale.set(0.1, 0.1, 0.1) 
          model.position.set(0,20,0);
          model.position.x+=r*Math.cos(2*3*Math.PI/6);
          model.position.z+=r*Math.sin(2*3*Math.PI/6);
          model.rotateY(Math.PI/4)
          model.rotation.y+=(Math.PI+0.05)
          scene.add( model );

          const screenCanvas = document.createElement('canvas');
          screenCanvas.width = 1524;
          screenCanvas.height = 1524;
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
    
          if(screenContext){

            screenContext.fillStyle = 'dark green';
            screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
            screenContext.fillStyle = 'white';
            screenContext.font = '30px Seven Segment';






      
            if(screenContext){
              // screenContext.fillStyle = '';
              screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

              screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
              screenContext.fillStyle = 'green';
              screenContext.font = '40px MyCustomFont';
              var text="Currently pursuing a Bachelor’s in Computer Science at PES University, with a strong passion for software development. Proficient in Java, Python, and C/C++, I have built impactful web applications, machine learning models, and games. Known for problem-solving and quick adaptability, I am eager to bring my skills and enthusiasm to a collaborative development team focused on innovative solutions." 
              var textarray=text.split(" ")
              var t2=Array();
              var count=0;
              var c2=0;
              for(var i=0;i<textarray.length;i++)
              {
                if((count+textarray[i].length)*30>1524)
                {
                  c2++;
                  count=0;
                  var str=t2.join(" ")
                  screenContext.fillText(str, 180, 130+c2*55);
                  t2=Array();
                }else{
                  t2.push(textarray[i]);
                  count+=textarray[i].length;
                }
                
              }
              var str=t2.join(" ")
              screenContext.fillText(str, 180, 130+(c2+1)*35);
            }
            screenTexture.needsUpdate = true;
          }
    
        }, undefined, function ( error ) {
        
          console.error(error );
        
        } );
        


// 240 degrees
    loader.load( ' /assets/arcade_machine__automaping.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(10, 10, 10) 
      model.position.set(0,0,0);
      model.rotateY(-Math.PI/2)
      model.rotation.y-=(Math.PI/3)
      
      model.position.x+=r*Math.cos(2*4*Math.PI/6);
      model.position.z+=r*Math.sin(2*4*Math.PI/6);
      scene.add( model );
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1524;
      screenCanvas.height = 1524;
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
      if(screenContext){

        screenContext.fillStyle = 'dark green';
        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        screenContext.fillStyle = 'white';
        screenContext.font = '30px Seven Segment';



        
      if(screenContext){
        // screenContext.fillStyle = '';
        screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        screenContext.fillStyle = 'green';
        screenContext.font = '40px MyCustomFont';
        var text=jsonData.education
        var textarray=text.split(" ")
        var t2=Array();
        var count=0;
        var c2=0;
        for(var i=0;i<textarray.length;i++)
        {
          if((count+textarray[i].length)*30>1524)
          {
            c2++;
            count=0;
            var str=t2.join(" ")
            screenContext.fillText(str, 180, 130+c2*55);
            t2=Array();
          }else{
            t2.push(textarray[i]);
            count+=textarray[i].length;
          }
          
        }
        var str=t2.join(" ")
        screenContext.fillText(str, 180, 130+(c2+1)*35);
      }
        screenTexture.needsUpdate = true;
      }
      
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );



// 300 degrees
    loader.load( ' /assets/ppl_2.glb', function ( gltf ) {
      const model = gltf.scene
      model.scale.set(24, 24, 24) 
      model.position.set(0,25,0);
      model.position.x+=r*Math.cos(2*5*Math.PI/6)+12;
      model.position.z+=r*Math.sin(2*5*Math.PI/6)-10;
      model.rotation.y=Math.PI
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
      screenMesh.rotation.y-=Math.PI/6
      screenMesh.position.set(0.6,0.3, -0.2);     
       screenMesh.rotation.z-=Math.PI/14;

      screenMesh.rotation.x-=Math.PI/8

      model.add(screenMesh);
  if(screenContext){

    screenContext.fillStyle = 'dark green';
    screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
    screenContext.fillStyle = 'white';
    screenContext.font = '30px Seven Segment';



    
    if(screenContext){
      // screenContext.fillStyle = '';
      screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
      screenContext.fillStyle = 'green';
      screenContext.font = '40px MyCustomFont';
      var textarray=["Email : "+jsonData.email,"Contact Number :"+jsonData.phone_number,"Git :"+jsonData.git];
      var t2=Array();
      var count=0;
      var c2=0;
      for(var i=0;i<textarray.length;i++)
      {
        if((count+textarray[i].length)*30>1524)
        {
          c2++;
          count=0;
          var str=t2.join(" ")
          screenContext.fillText(str, 180, 130+c2*60);
          t2=Array();
        }else{
          t2.push(textarray[i]);
          count+=textarray[i].length;
        }
        
      }
      var str=t2.join(" ")
      screenContext.fillText(str, 180, 130+(c2+1)*35);
    }
    screenTexture.needsUpdate = true;
  }
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );


//making flight path


function flight_path(){
  const    [x,y,z]=Array(3).fill(null).map(()=> THREE.MathUtils.randFloatSpread(1000));
  return new THREE.Vector3(x,10+Math.abs(y),z);
  }
var lol_flight_path =Array(10).fill(null).map(flight_path)


camera.position.setX(400)
camera.position.setY(40)


// var lol_flight_path =[new THREE.Vector3(10,0,0),new THREE.Vector3(0,100,100)]

lol_flight_path.push(lol_flight_path[0]);

const path = new THREE.CatmullRomCurve3(lol_flight_path);
// const pathPoints = path.getPoints(100);
// const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
// const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
// const pathLine = new THREE.Line(pathGeometry, pathMaterial);
// scene.add(pathLine);  

// Sword fish
loader.load(' /assets/swordfish_ll.glb', function (gltf) {
  const model = gltf.scene;
  
  model.scale.set(200, 200, 200);
  model.position.set(10, 0, 0);




  scene.add(model);



  let progress = 0; 
  const speed = 0.0005; 


  function animate() {
    progress += speed; 
    if (progress > 1) progress = 0; 
    const position = path.getPointAt(progress); 
    model.position.copy(position);
  
    const tangent = path.getTangentAt(progress);
    model.rotation.y = Math.atan2(tangent.x, tangent.z);
    // console.log(tangent.x,tangent.z);
    // model.rotation.y= Math.atan2(tangent.x, tangent.z);
    // model.rotation.x=(-Math.atan(tangent.y));
    // model.rotation.y=(Math.atan(tangent.x));
    model.rotation.z=(Math.atan(tangent.x));
    model.rotation.y =Math.atan2(tangent.x, tangent.z);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  animate();

}, undefined, function (error) {
  console.error(error);
});

// adding stars

    function add_starts(){
        const sphere= new THREE.SphereGeometry(0.25,24,24)
        const sphere_mesh=new THREE.MeshStandardMaterial({color:0xffffff})
        const star=new THREE.Mesh(sphere,sphere_mesh);
        const [x,y,z]=Array(3).fill(null).map(()=> THREE.MathUtils.randFloatSpread(1000));
        star.position.set(x,Math.abs(y),z);
        scene.add(star)
        }
        Array(2000).fill(null).forEach(add_starts)


    const listener = new THREE.AudioListener();
    camera.add( listener );
    
    const sound = new THREE.Audio( listener );
    
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '/assets/Way Down We Go.mp3', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop(true);
      sound.setVolume(0.9);
      sound.play();
    });
    
    const analyser = new THREE.AudioAnalyser( sound, 32 );
    const animate = () => {
      requestAnimationFrame(animate)
      daftMesh.rotation.y += 0.013

      var a=analyser.getFrequencyData();
      var condence=[];
      for(var i=0;i<a.length/2;i++)
        {
          // var sum=Math.max(a[2*i],a[2*i+1]);
          var sum=a[2*i]+a[2*i+1];

          condence.push(sum);
        }
      for(var i=0;i<condence.length;i++)
        {
          var sum=condence[i];
              for(var j=0;j<20;j++)
              {
                sum-=20
                if(sum>0)
                {
                  freq[Math.floor(i)][j].color.set(colors[Math.floor(j/4)]);
                }else{
                  freq[Math.floor(i)][j].color.set(0x000000);
                }
              }
        }
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
  </div>
}
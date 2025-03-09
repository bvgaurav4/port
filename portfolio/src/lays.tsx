import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './index.css'
import jsonString from "/assets/projects.txt?raw"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';



export default function Lays() {
  const mountRef = useRef<HTMLDivElement>(null)
  const textrender =(text:string ,width: number)=>{
  var textarray=text.split(" ")
  var t2=Array();
  var t3=Array();
  var count=0;
  var c2=0;
  for(var i=0;i<textarray.length;i++) {
    if((count+textarray[i].length)*width>1524) {
      c2++;
      count=textarray[i].length;
      var str=t2.join(" ")
      t2=Array();
      t2.push(textarray[i]);
      t3.push(str);
      } else {
      t2.push(textarray[i]);
      count+=textarray[i].length;
      }
    }
    var str=t2.join(" ")
    t3.push(str)
    return t3
    }


  useEffect(() => {
    var models=Array();
    const jsonData=JSON.parse(jsonString);
    const scene = new THREE.Scene()
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const renderer = new THREE.WebGLRenderer()
    const l2=new THREE.AmbientLight(0xffffff, 1)
    scene.add(l2);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.setX(150*Math.cos(2*5*Math.PI/6)+5)
    camera.position.setZ(150*Math.sin(2*5*Math.PI/6)+5)
    camera.position.setY(35)


    const point1=new THREE.Vector3(155,35,0)
    const point2=new THREE.Vector3(155,35,0)
    const control=new THREE.Vector3(0,100,0)

    let curve = new THREE.QuadraticBezierCurve3(point1, control, point2);
    let curvePoints = curve.getPoints(150); 
    let geometry1 = new THREE.BufferGeometry().setFromPoints(curvePoints);
    let material1 = new THREE.LineBasicMaterial({ color: 0xff0000 });
    let curveObject = new THREE.Line(geometry1, material1);
    scene.add(curveObject)
      
    const container=(x: number,z: number,sx:number,sy:number,sz:number)=>{
      const geometry = new THREE.BoxGeometry(sx, sy, sz);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0x000000, 
          wireframe: true, 
          transparent: true, 
          opacity: 0 
      });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0,25,0)
        cube.position.x+=x;
        cube.position.z+=z;
        return cube;
        }
        // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

                const makingButtons=(x:number,y:number,z:number,xr:number,yr:number,zr:number,text:string ,h:number,w:number,t:number)=>{
                      const r=w
                      const shape = new THREE.Shape();
                      shape.moveTo(0, 0);
                      shape.absarc(0, h/2, r, 0 ,Math.PI, false);
                      shape.lineTo(-w, -h/2);
                      shape.lineTo(w, -h/2);
                      shape.absarc(0, -h/2, r, Math.PI, 0, false);
                      // Extrude the shape
                      const extrudeSettings = { depth: t*0.01, bevelEnabled: true };
                      const capsuleGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                      const buttonMaterial = new THREE.MeshPhongMaterial({
                        // color: new THREE.Color('#982625'),
                        emissive: new THREE.Color('#9d0302'),
                        specular: new THREE.Color('#ffffff'),
                        shininess: 10
                      });
                      const capsuleButton = new THREE.Mesh(capsuleGeometry, buttonMaterial);
                      
                      // Position the button
                      capsuleButton.position.set(x,y-0.1,z);
                      capsuleButton.rotation.set(Math.PI/2,0,Math.PI/3)
                      // capsuleButton.rotation.set(xr,yr,zr);
        
                      scene.add(capsuleButton);
        
                  const loader = new FontLoader();
                  var button=null;
                  loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
                      const textGeometry = new TextGeometry(text, {
                          font: font,
                          size: 0.35,
                          height: t*0.75,
                      });
                      const textMaterial = new THREE.MeshPhongMaterial({
                        color: new THREE.Color('#982625'),
                        emissive: new THREE.Color('#9d0302'),
                        specular: new THREE.Color('#ffffff'),
                        shininess: 10
                      });              
                      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                      textMesh.position.set(x-0.3,y,z+0.35);
                      textMesh.rotation.set(xr,yr,zr);
                      scene.add(textMesh);
                      button=textMesh;
                  });
                  return button;
                }


        const roundbutton=(x : number,y:number,z:number,rx:number,ry:number,rz:number)=>{
          let textMesh;
          rx+=1
          rz+=1
          const loader = new FontLoader();
          loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
              const textGeometry = new TextGeometry('>', {
                  font: font,
                  size: 0.6,
                  height: 0.1,
              });
              textGeometry.computeBoundingBox();
              textGeometry.center();
              const textMaterial = new THREE.MeshPhongMaterial({
                color: new THREE.Color('#000000'),
                emissive: new THREE.Color('#000000'),
                specular: new THREE.Color('#ffffff'),
                shininess: 10
              });              
              textMesh = new THREE.Mesh(textGeometry, textMaterial);
              textMesh.rotation.x+=Math.PI/2;
              textMesh.rotation.z+=ry;


              textMesh.position.set(x,y,z);
              textMesh.position.y+=0.3
              textMesh.position.x+=.07
              scene.add(textMesh);

              const puck= new THREE.Mesh(
                new THREE.CylinderGeometry(0.5,0.5,0.25),
                new THREE.MeshPhongMaterial({
                  color: new THREE.Color('#982625'),
                  emissive: new THREE.Color('#9d0302'),
                }));
                puck.position.set(x,y+0.2,z)
                puck.updateMatrix();
              textMesh.updateMatrix();
              scene.add(puck)
          });
          return null;
        }


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
      
    const handleClick=(event: { clientX: number; clientY: number; })=>{
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      for(var obj=0;obj<models.length;obj++)
      {
        const intersects = raycaster.intersectObject(models[obj][0]);
        if (intersects.length > 0) {
          console.log('Button clicked!',models[obj]); 
          var point1=camera.position.clone();
          var point2= models[obj][0].position.clone();
          curve = new THREE.QuadraticBezierCurve3(point1, control, point2);
          curvePoints = curve.getPoints(150); 
          geometry1 = new THREE.BufferGeometry().setFromPoints(curvePoints);
          material1 = new THREE.LineBasicMaterial({ color: 0xff0000 });
          curveObject = new THREE.Line(geometry1, material1);
          scene.add(curveObject)
          progress=0;
        }
      }

    }
    const orbit = new OrbitControls(camera, renderer.domElement)
    const grid = new THREE.GridHelper(1000, 100)
    scene.add(grid)
    orbit.enableDamping = false; 
    orbit.dampingFactor = 1;
    orbit.enablePan = true;    
    orbit.enableZoom = true; 

    const colors=[0x00ff00,0xffff00,0xFfa000,0xff0000,0xff00ff]
            
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
    //loading  all the arcade machines
            
    const r=130
    const loader = new GLTFLoader();

    // degree 0
    loader.load( ' /assets/postapocaliptic_diablo_arcade_machine.glb ', function ( gltf ) {
      const model = gltf.scene
    
      const cube =container(r*Math.cos(2*0*Math.PI/6),r*Math.sin(2*0*Math.PI/6),15,35,15);
      scene.add(cube)

      const pos={ "x":10,"y":10,"z":10};
      const lookat={"x":0,"y":0,"z":0};
      var temp=Array();
      temp.push(cube,pos,lookat);
      models.push(temp)
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
        screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

        screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
        screenContext.fillStyle = 'green';
        screenContext.font = '40px MyCustomFont';
        var text = textrender(jsonData.intro,30);
        for(var i =0;i<text.length;i++){
          var str=text[i];
          screenContext.fillText(str, 180, 130+i*55);
        }
        const screenCanvas1 = document.createElement('canvas');
        screenCanvas1.width = 1524;
        screenCanvas1.height = 1524;
        screenTexture.needsUpdate = true;
      }

    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );





    //degree 60
    loader.load( '  /assets/arcade_machine (2).glb', function ( gltf ) {
      const pos={ "x":10,"y":10,"z":10};
      const lookat={"x":0,"y":0,"z":0};
      const cube=container(r*Math.cos(2*1*Math.PI/6),r*Math.sin(2*1*Math.PI/6),15,35,15)
      var temp=Array();
      models.push(temp)                
      scene.add(cube)

      let nextbutton=makingButtons(r*Math.cos(2*1*Math.PI/6)+6.5,24,r*Math.sin(2*1*Math.PI/6)+6.5,-Math.PI/2,0,Math.PI/6,"next",1,0.25,0.2);
      let prevbutton=makingButtons(r*Math.cos(2*1*Math.PI/6)+3,24,r*Math.sin(2*1*Math.PI/6)+8.4,-Math.PI/2,0,Math.PI/6,"prev",1,0.25,0.2);

      
      temp.push(cube,pos,lookat,nextbutton,prevbutton);
      
      const model = gltf.scene

      model.scale.set(0.1, 0.1, 0.1) 
      model.position.set(0,23,0);
      model.position.x+=r*Math.cos(2*1*Math.PI/6);
      model.position.z+=r*Math.sin(2*1*Math.PI/6);
      model.rotateY(Math.PI/4);

      model.rotateY(-Math.PI/3)
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
        screenContext.font = '40px MyCustomFont';
        if(screenContext){
          // screenContext.fillStyle = '';
          screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

          screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
          screenContext.fillStyle = 'green';
          screenContext.font = '40px MyCustomFont';
          var text = textrender(jsonData.intro,30);
          for(var i =0;i<text.length;i++){
            var str=text[i];
            screenContext.fillText(str, 180, 130+i*55);
          }
        }  
        screenTexture.needsUpdate = true;
      }

    }, undefined, function ( error ) {

      console.error( error );

    } );

            

             
            //120 degree  
            loader.load( ' /assets/blade_runner_arcade_cabinet.glb', function ( gltf ) {
              const model = gltf.scene
              const cube=container(r*Math.cos(2*2*Math.PI/6),r*Math.sin(2*2*Math.PI/6),15,35,15)
                            const pos={ "x":10,"y":10,"z":10};
              const lookat={"x":0,"y":0,"z":0};
              var temp=Array();
              temp.push(cube,pos,lookat);
              models.push(temp)              
              scene.add(cube)
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
                screenContext.font = '40px MyCustomFont';                
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
            loader.load( ' /assets/arcade_machine__automaping.glb', function ( gltf ) {
              const model = gltf.scene

              model.scale.set(10, 10, 10) 
              model.position.set(0,0,0);
              model.rotateY(-Math.PI/2)
              model.position.x+=r*Math.cos(2*3*Math.PI/6);
              model.position.z+=r*Math.sin(2*3*Math.PI/6);

              const cube=container(r*Math.cos(2*3*Math.PI/6),r*Math.sin(2*3*Math.PI/6),15,35,15)
                            const pos={ "x":10,"y":10,"z":10};
              const lookat={"x":0,"y":0,"z":0};
              var temp=Array();
              temp.push(cube,pos,lookat);
              models.push(temp)              
              scene.add(cube)

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
                // screenContext.font = '30px Seven Segment';
                screenContext.font = '40px MyCustomFont';



                
              if(screenContext){
                // screenContext.fillStyle = '';
                screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

                screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
                screenContext.fillStyle = 'green';
                screenContext.font = '40px MyCustomFont';
                var text = jsonData.education
                text.push("Phone Number      "+jsonData.phone_number)
                text.push("enail             "+jsonData.email)
                text.push("git               "+jsonData.git)

                for(var i =0;i<text.length;i++){
                  var str=text[i];
                  screenContext.fillText(str, 180, 130+i*55);
                }
              }
                screenTexture.needsUpdate = true;
              }
              
            }, undefined, function ( error ) {
            
              console.error( error );
            
            } );

            
            // 240 degrees    
            loader.load( ' /assets/arcade_machine (2).glb', function ( gltf ) {
              const cube=container(r*Math.cos(2*4*Math.PI/6),r*Math.sin(2*4*Math.PI/6),15,35,15)
              const pos={ "x":10,"y":10,"z":10};
              const lookat={"x":0,"y":0,"z":0};

              const model = gltf.scene

              model.scale.set(0.1, 0.1, 0.1) 
              model.position.set(0,23,0);

              model.position.x+=r*Math.cos(2*4*Math.PI/6);
              model.position.z+=r*Math.sin(2*4*Math.PI/6);
              model.rotateY(Math.PI/4);
              model.rotateY(2*Math.PI/3)
              var temp=Array();
              temp.push(cube,pos,lookat);
              models.push(temp)              
              scene.add( model );
              scene.add(cube)

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
                screenContext.font = '40px MyCustomFont';          
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
            
        // 300 degrees
        loader.load( ' /assets/blade_runner_arcade_cabinet.glb', function ( gltf ) {
          const model = gltf.scene
          model.scale.set(0.090, 0.090, 0.090) 
          model.position.x+=r*Math.cos(5*2*Math.PI/6);
          model.position.z+=r*Math.sin(5*2*Math.PI/6);
          const cube=container(r*Math.cos(5*2*Math.PI/6),r*Math.sin(5*2*Math.PI/6),15,35,15)
                        const pos={ "x":10,"y":10,"z":10};
              const lookat={"x":0,"y":0,"z":0};
              var temp=Array();
              temp.push(cube,pos,lookat);
              models.push(temp)         
               model.rotateY(-7*Math.PI/6)
          scene.add( model );
              scene.add(cube)

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
          roundbutton((r+2)*Math.cos(5*2*Math.PI/6)-1,25.5,(r+2)*Math.sin(5*2*Math.PI/6)-2,0,Math.PI+Math.PI/6,0);
          roundbutton((r+2)*Math.cos(5*2*Math.PI/6)+2.5,25.5,(r+2)*Math.sin(5*2*Math.PI/6),0,Math.PI/6,0);

          if(screenContext){

            screenContext.fillStyle = 'dark green';
            screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
            screenContext.fillStyle = 'white';
            screenContext.font = '40px MyCustomFont';
            
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


        //making flight path


        function flight_path(){
          const    [x,y,z]=Array(3).fill(null).map(()=> THREE.MathUtils.randFloatSpread(1000));
          return new THREE.Vector3(x,10+Math.abs(y),z);
          }
        var lol_flight_path =Array(10).fill(null).map(flight_path)

        // var lol_flight_path =[new THREE.Vector3(10,0,0),new THREE.Vector3(0,100,100)]

        lol_flight_path.push(lol_flight_path[0]);

        const path = new THREE.CatmullRomCurve3(lol_flight_path);

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
        

        const sphere= new THREE.SphereGeometry(0.25,24,24)
        const sphere_mesh=new THREE.MeshStandardMaterial({color:0xffffff})
        // adding stars

        function add_starts(){
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
        audioLoader.load( '/assets/Doin it Right (Official Audio).mp3', function( buffer ) {
          sound.setBuffer( buffer );
          sound.setLoop(true);
          sound.setVolume(0.9);
          // sound.play();
        });
            
        const analyser = new THREE.AudioAnalyser( sound, 32 );
        window.addEventListener('click', handleClick);

        let progress = 1; 
        const speed = 0.005; 
        const animate = () => {
          requestAnimationFrame(animate)
          daftMesh.rotation.y += 0.013

          if(progress<1)
          {
            const position = curve.getPointAt(progress); 
            camera.position.copy(position);
            progress += speed; 
          }

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
                window.removeEventListener('click', handleClick);
                mountRef.current.removeChild(renderer.domElement)
              }
            }
          }, [])
  return <div ref={mountRef}>
  </div>
} 
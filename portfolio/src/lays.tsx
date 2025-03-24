import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './index.css'
import jsonString from "/assets/projects.txt?raw"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CSG } from 'three-csg-ts';

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
    var prevcube: THREE.Object3D<THREE.Object3DEventMap> | null;
    const jsonData=JSON.parse(jsonString);
    var projects=jsonData.projects;
    var exp=jsonData.exp;
    var papers=jsonData.papers
    var project_index=0;
    const elements = new Map<string, number>();
    const elements_content = new Map<string, any[]>();
    elements_content.set("project",projects);
    elements_content.set("exp",exp);
    elements.set("project",0);
    elements.set("exp",0);
    elements.set("papers",0);
    elements_content.set("papers",papers);
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
    const point2=new THREE.Vector3(0,400,0)
    const control=new THREE.Vector3(0,35,155)

    const a=750
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(a, a, a,32,32,32),
    new THREE.MeshNormalMaterial({wireframe:true}));
    const hole= new THREE.Mesh(
      new THREE.SphereGeometry(a*0.65,64,64,64),
    new THREE.MeshNormalMaterial({wireframe:true}));
    const base=CSG.subtract(box,hole);
    box.updateMatrix()
    hole.updateMatrix()
    scene.add(base);
    
    let curve = new THREE.QuadraticBezierCurve3(point1, control, point2);
      const titles=(text : string ,x : number ,y: number ,z: number ,rx: number,ry: number ,rz: number ,t: number )=>{
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
          const textGeometry = new TextGeometry(text, {
              font: font,
              size: 0.5,
              depth: t*0.75,
          });
          const textMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color('#982625'),
            emissive: new THREE.Color('#9d0302'),
            specular: new THREE.Color('#ffffff'),
            shininess: 10
          });              
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(x-0.3,y,z+0.35);
          textMesh.rotation.set(rx,ry,rz);
          scene.add(textMesh);
      });
      }
      const meshRemoval=(myMesh : THREE.Mesh)=>{
          if (myMesh) {
            if (myMesh.geometry) myMesh.geometry.dispose(); // Free geometry memory
            if (myMesh.material) {
                if (Array.isArray(myMesh.material)) {
                    myMesh.material.forEach(mat => mat.dispose()); // Dispose multi-materials
                } else {
                    myMesh.material.dispose(); // Dispose single material
                }
            }
            scene.remove(myMesh);
        }
      }


    const populatingCanvas=(index:number,type:string,screenContext:CanvasRenderingContext2D,screenTexture:THREE.CanvasTexture)=>{
      screenContext.clearRect(0, 0, 1524, 1524);
      screenTexture.needsUpdate=true;
      var somthing=elements_content.get(type);
      var object;
      if(somthing!=undefined){
        object = somthing[index];
      }
      
      screenContext.fillStyle = "green";
      screenContext.font = '50px MyCustomFont';

      var text = textrender(object.title,35);
      var lol=0;
      for(var i =0;i<text.length;i++){
        var str=text[i];
        screenContext.fillText(str, 125, 130+(i+lol)*55);
        lol=i;
      }

      screenContext.fillStyle = 'green';
      screenContext.font = '40px MyCustomFont';

      var text = textrender(object.content,25);
      for(var i =0;i<text.length;i++){
        var str=text[i];
        screenContext.fillText(str, 125, 130+(i+lol+2)*55);
      }
      screenTexture.needsUpdate=true;

    }
    const container=(x: number,z: number,sx:number,sy:number,sz:number)=>{
      const geometry = new THREE.BoxGeometry(sx, sy, sz);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0xffffff, 
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
              const extrudeSettings = { depth: t*0.01, bevelEnabled: true };
              const capsuleGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
              const buttonMaterial = new THREE.MeshPhongMaterial({
                emissive: new THREE.Color('#9d0302'),
                specular: new THREE.Color('#ffffff'),
                shininess: 10
              });
              const capsuleButton = new THREE.Mesh(capsuleGeometry, buttonMaterial);
              
              capsuleButton.position.set(x,y-0.1,z);
              capsuleButton.rotation.set(Math.PI/2,0,Math.PI/3)
              // capsuleButton.rotation.set(xr,yr,zr);

              scene.add(capsuleButton);

          const loader = new FontLoader();
          loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
              const textGeometry = new TextGeometry(text, {
                  font: font,
                  size: 0.35,
                  depth: t*0.75,
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
          });
          return capsuleButton;
        }


        const roundbutton=(x : number,y:number,z:number,rx:number,ry:number,rz:number)=>{
          let textMesh;
          rx+=1
          rz+=1
          let puck= new THREE.Mesh(
            new THREE.CylinderGeometry(0.5,0.5,0.25),
            new THREE.MeshPhongMaterial({
              color: new THREE.Color('#982625'),
              emissive: new THREE.Color('#9d0302'),
            }));
            puck.position.set(x,y+0.2,z)
          scene.add(puck)
          const loader = new FontLoader();
          loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
              const textGeometry = new TextGeometry('>', {
                  font: font,
                  size: 0.6,
                  depth: 0.1,
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

          });
          return puck;
        }


    renderer.setSize(window.innerWidth, window.innerHeight)
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
      }
    const daft_texture= new THREE.TextureLoader().load(" /assets/Daft_Punk_-_Random_Access_Memories.jpg")
    const daft = new THREE.CylinderGeometry(110, 110, 5,64)
    const daftMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      map:daft_texture
    })
    const daftMesh = new THREE.Mesh(daft, daftMaterial)
    daftMesh.position.set(0, -20, 0);
    scene.add(daftMesh)
    const dist=(p1: THREE.Vector3 ,p2:THREE.Vector3,src : THREE.Vector3 )=>{
      p1.distanceTo(p2)
      if(src.distanceTo(p1)<src.distanceTo(p2))
      {
        return p1;
      }
      return p2
    }
    const handleClick1=(event: { clientX: number; clientY: number; })=>{
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      project_index++;
      raycaster.setFromCamera(mouse, camera);
      for(var obj=0;obj<models.length;obj++)
      {
        if(models[obj][4]!=null)
        {
          
          let intersects = raycaster.intersectObject(models[obj][4]);
          if(intersects.length>0){
            console.log("next button");
            var index=elements.get(models[obj][6]);
            var size=elements_content.get(models[obj][6])?.length;
            if(index!=undefined && size!=undefined)
            {
              index=index+1;
              index=Math.min(size-1,index)
              populatingCanvas(index%size,models[obj][6],models[obj][2],models[obj][3]);
              elements.set(models[obj][6],index);
            }
          }
          intersects = raycaster.intersectObject(models[obj][5]);
          if(intersects.length>0){
            console.log("prev button");
            var index=elements.get(models[obj][6]);
            var size=elements_content.get(models[obj][6])?.length;
            if(index!=undefined && size!=undefined)
            {
              index=(index-1)%size;
              index=Math.max(index,0);
              populatingCanvas(index%size,models[obj][6],models[obj][2],models[obj][3]);
              elements.set(models[obj][6],(index)%size);
            }
          }
        }
        const intersects = raycaster.intersectObject(models[obj][0]);
        if (intersects.length > 0) {
          if(prevcube!=null){
            scene.add(prevcube);
          }
          meshRemoval(models[obj][0]);
          prevcube=models[obj][0];
            
          prevcube=models[obj][0];
          var point1=camera.position.clone();
          var point2= models[obj][0].position.clone();
          point2.x=models[obj][1].x
          point2.z=models[obj][1].z
          point2.y=models[obj][1].y
          var control=new THREE.Vector3(0,100,0)
          control=dist(point2,control,point1)

          curve = new THREE.QuadraticBezierCurve3(point1, control, point2);
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
          bentBox.position.y=-20;
          bentBox.rotation.y-=a2;
          a2+=Math.PI/8;      
        }
        rr+=20;
    }

    const basebase = new THREE.Mesh(new THREE.CylinderGeometry(350, 350, 5,64), new THREE.MeshPhongMaterial({
      emissive: new THREE.Color('#9d0302'),
      specular: new THREE.Color('#ffffff'),
      transparent:true,
      opacity: 0,
      shininess: 10
    }));

    // basebase.position.y=
    scene.add(basebase);






    //loading  all the arcade machines
            


    const r=130
    const loader = new GLTFLoader();

    // degree 0
    loader.load( ' /assets/postapocaliptic_diablo_arcade_machine(1).glb ', function ( gltf ) {
      const model = gltf.scene
    
      const cube =container(r*Math.cos(2*0*Math.PI/6),r*Math.sin(2*0*Math.PI/6),13,35,13);
      scene.add(cube)

      var temp=Array();
      models.push(temp)
      model.scale.set(20, 20, 20) 
      
      model.position.set(0,20,0)
      model.position.x+=r*Math.cos(2*0*Math.PI/6);
      model.position.z+=r*Math.sin(2*0*Math.PI/6);
      titles("Introduction",(r+5)*Math.cos(2*0*Math.PI/6+0.1),30,(r+5)*Math.sin(2*0*Math.PI/6 + 0.1),0,Math.PI/2+Math.PI/5,0,0.25);
      const pos={ "x":(r+17)*Math.cos(2*0*Math.PI/6),"y":30,"z":(r+17)*Math.sin(2*0*Math.PI/6)};
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
        var text = textrender(jsonData.intro,25);
        for(var i =0;i<text.length;i++){
          var str=text[i];
          screenContext.fillText(str, 125, 130+i*55);
        }
        screenTexture.needsUpdate = true;
      }
      temp.push(cube,pos,screenContext,screenTexture,null,null,null);
    }, undefined, function ( error ) {
    
      console.error( error );    
    } );

    //degree 60
    loader.load( '  /assets/arcade_machine (2).glb', function ( gltf ) {
      const cube=container(r*Math.cos(2*1*Math.PI/6),r*Math.sin(2*1*Math.PI/6),15,35,15)
      var temp=Array();
      models.push(temp)                
      scene.add(cube)
      
      let nextbutton=makingButtons(r*Math.cos(2*1*Math.PI/6)+6.5,24,r*Math.sin(2*1*Math.PI/6)+6.5,-Math.PI/2,0,Math.PI/6,"next",1,0.25,0.2);
      let prevbutton=makingButtons(r*Math.cos(2*1*Math.PI/6)+3,24,r*Math.sin(2*1*Math.PI/6)+8.4,-Math.PI/2,0,Math.PI/6,"prev",1,0.25,0.2);
      
      
      
      const model = gltf.scene
      
      model.scale.set(0.1, 0.1, 0.1) 
      model.position.set(0,23,0);
      model.position.x+=r*Math.cos(2*1*Math.PI/6);
      model.position.z+=r*Math.sin(2*1*Math.PI/6);
      model.rotateY(Math.PI/4);
      
      const pos={ "x":(r+25)*Math.cos(2*1*Math.PI/6),"y":33,"z":(r+25)*Math.sin(2*1*Math.PI/6)};
      titles("Projects",(r+8.5)*Math.cos(2*1*Math.PI/6+0.1),35,(r+8.5)*Math.sin(2*1*Math.PI/6+0.1),0,Math.PI/4,0,0.25);
      
      model.rotateY(-Math.PI/3)
      scene.add( model );
      
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1524;
      screenCanvas.height = 1524;
      const screenContext = screenCanvas.getContext('2d');
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
      
      temp.push(cube,pos,screenContext,screenTexture,nextbutton,prevbutton,"project");

      const screenGeometry = new THREE.PlaneGeometry(1, 1);
      let screenMesh; 

      screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.set(50,70,50);
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
          var index=elements.get("project")
          if(index!=undefined)
          {
            populatingCanvas(index,"project",screenContext,screenTexture);
          }
        }  
        screenTexture.needsUpdate = true;
      }

    }, undefined, function ( error ) {

      console.error( error );

    } );
             
            //120 degree  
            loader.load( ' /assets/blade_runner_arcade_cabinet (1).glb', function ( gltf ) {
              const model = gltf.scene
              const cube=container(r*Math.cos(2*2*Math.PI/6),r*Math.sin(2*2*Math.PI/6),15,35,15)
              scene.add(cube)
              model.scale.set(0.090, 0.090, 0.090) 
              model.position.x+=r*Math.cos(2*2*Math.PI/6);
              model.position.z+=r*Math.sin(2*2*Math.PI/6);
              titles("Achivements",(r+5.5)*Math.cos(2*2*Math.PI/6+0.1),35,(r+5.5)*Math.sin(2*2*Math.PI/6+0.1),0,-1*Math.PI/6+0.5,0,0.25);

              const pos={ "x":(r+20)*Math.cos(2*2*Math.PI/6),"y":35,"z":(r+20)*Math.sin(2*2*Math.PI/6)};
              var temp=Array();
              model.rotateY(-1*Math.PI/6)
              models.push(temp)              
              scene.add( model );
              const screenCanvas = document.createElement('canvas');
              screenCanvas.width = 1524;
              screenCanvas.height = 1524;
              const screenContext = screenCanvas.getContext('2d');
              const screenTexture = new THREE.CanvasTexture(screenCanvas);
              const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
              
              var next=roundbutton((r+10)*Math.cos(2*2*Math.PI/6-0.02)-1,25.7,(r+2)*Math.sin(2*2*Math.PI/6-0.02)-2,0,Math.PI+Math.PI/6,0);
              var prev=roundbutton((r+10)*Math.cos(2*2*Math.PI/6-0.02)+2.5,25.7,(r+2)*Math.sin(2*2*Math.PI/6-0.02),0,Math.PI/6,0);

              temp.push(cube,pos,screenContext,screenTexture,next,prev,"papers");
          
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
                var index=elements.get("papers")
                if(index!=undefined)
                {
                  populatingCanvas(index,"papers",screenContext,screenTexture);
                }
                
              }
                screenTexture.needsUpdate = true;
              }
            }, undefined, function ( error ) {
              
              console.error( error );
              
            } );

            
            //180 degrees
            loader.load( '/assets/arcade_machine__automaping (1).glb', function ( gltf ) {
              const model = gltf.scene

              model.scale.set(10, 10, 10) 
              model.position.set(0,0,0);
              model.rotateY(-Math.PI/2)
              model.position.x+=r*Math.cos(2*3*Math.PI/6);
              model.position.z+=r*Math.sin(2*3*Math.PI/6);

              const cube=container(r*Math.cos(2*3*Math.PI/6),r*Math.sin(2*3*Math.PI/6),15,35,15)
              const pos={ "x":(r+20)*Math.cos(2*3*Math.PI/6),"y":30,"z":(r+20)*Math.sin(2*3*Math.PI/6)};
              var temp=Array();
              models.push(temp)              
              scene.add(cube)
              
              scene.add( model );
              const screenCanvas = document.createElement('canvas');
              screenCanvas.width = 1524;
              screenCanvas.height = 1524;
              const screenContext = screenCanvas.getContext('2d');
              const screenTexture = new THREE.CanvasTexture(screenCanvas);
              const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
              
              temp.push(cube,pos,screenContext,screenTexture,null,null,null);

              const screenGeometry = new THREE.PlaneGeometry(0.8, 0.5);
              let screenMesh; 
              titles("Contact",(r+8.5)*Math.cos(2*3*Math.PI/6+0.1),30,(r+8.5)*Math.sin(2*3*Math.PI/6+0.1),0,-Math.PI/2,0,0.25);

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
              
              const model = gltf.scene
              
              model.scale.set(0.1, 0.1, 0.1) 
              model.position.set(0,23,0);
              
              model.position.x+=r*Math.cos(2*4*Math.PI/6);
              model.position.z+=r*Math.sin(2*4*Math.PI/6);
              const pos={ "x":(r+25)*Math.cos(2*4*Math.PI/6),"y":33,"z":(r+25)*Math.sin(2*4*Math.PI/6)};
              model.rotateY(Math.PI/4);
              model.rotateY(2*Math.PI/3)
              var temp=Array();
              models.push(temp)              
              scene.add( model );
              scene.add(cube)
              
              const screenCanvas = document.createElement('canvas');
              screenCanvas.width = 1524;
              screenCanvas.height = 1524;
              const screenContext = screenCanvas.getContext('2d');
              const screenTexture = new THREE.CanvasTexture(screenCanvas);
              const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
              
              temp.push(cube,pos,screenContext,screenTexture,null,null,null);

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
                  var text = textrender("Hey! What do you think of my website idea? Do you like it? Is the website good? Would you hire me to create awesome stuff like this for your company too? ",25);
                  for(var i =0;i<text.length;i++){
                    var str=text[i];
                    screenContext.fillText(str, 180, 130+i*55);
                  }
                }  
                screenTexture.needsUpdate = true;
              }  
            }, undefined, function ( error ) {
            
              console.error(error );
            
            } );  
            
        // 300 degrees
        loader.load( ' /assets/blade_runner_arcade_cabinet (1).glb', function ( gltf ) {
          const model = gltf.scene
          model.scale.set(0.090, 0.090, 0.090) 
          model.position.x+=r*Math.cos(5*2*Math.PI/6);
          model.position.z+=r*Math.sin(5*2*Math.PI/6);
          const cube=container(r*Math.cos(5*2*Math.PI/6),r*Math.sin(5*2*Math.PI/6),15,35,15)
          const pos={ "x":(r+20)*Math.cos(5*2*Math.PI/6),"y":35,"z":(r+20)*Math.sin(5*2*Math.PI/6)};
          var temp=Array();
          var next=roundbutton((r+2)*Math.cos(5*2*Math.PI/6)-1,25.5,(r+2)*Math.sin(5*2*Math.PI/6)-2,0,Math.PI+Math.PI/6,0);
          var prev=roundbutton((r+2)*Math.cos(5*2*Math.PI/6)+2.5,25.5,(r+2)*Math.sin(5*2*Math.PI/6),0,Math.PI/6,0);
          models.push(temp) 
          titles("Experience",(r+8.5)*Math.cos(5*2*Math.PI/6+0.1),35,(r+8.5)*Math.sin(5*2*Math.PI/6+0.1),0,-7*Math.PI/6,0,0.25);

          model.rotateY(-7*Math.PI/6)
          scene.add( model );
          scene.add(cube)
          const screenCanvas = document.createElement('canvas');
          screenCanvas.width = 1524;
          screenCanvas.height = 1524;
          const screenContext = screenCanvas.getContext('2d');
          const screenTexture = new THREE.CanvasTexture(screenCanvas);
          const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
          
          temp.push(cube,pos,screenContext,screenTexture,next,prev,"exp");

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
            screenContext.fillStyle = 'rgba(0, 0, 0, 0.1) '; 

            screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
            screenContext.fillStyle = 'green';
            screenContext.font = '40px MyCustomFont';
            
            var index=elements.get("exp")
            if(index!=undefined)
            {
              populatingCanvas(index,"exp",screenContext,screenTexture);
            }
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
            const [x,y,z]=Array(3).fill(null).map(()=> THREE.MathUtils.randFloatSpread(750));
            star.position.set(x,Math.abs(y),z);
            scene.add(star)
            }
        Array(1000).fill(null).forEach(add_starts)
        
        const listener = new THREE.AudioListener();
        camera.add( listener );
            
        const sound = new THREE.Audio( listener );
            
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( '/assets/Doin it Right (Official Audio).mp3', function( buffer ) {
          sound.setBuffer( buffer );
          sound.setLoop(true);
          sound.setVolume(0.9);
          sound.play();
        });
            
        const analyser = new THREE.AudioAnalyser( sound, 32 );
        window.addEventListener('click', handleClick1
        );

        let progress = 0; 
        const speed = 0.005; 
        const animate = () => {
          requestAnimationFrame(animate)
          daftMesh.rotation.y += 0.013
          base.rotation.x+=0.001
          base.rotation.y+=0.001
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
                window.removeEventListener('click', handleClick1);
                mountRef.current.removeChild(renderer.domElement)
              }
            }
          }, [])
  return <div ref={mountRef}>
  </div>
} 
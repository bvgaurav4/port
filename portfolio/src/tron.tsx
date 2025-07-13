import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import './index.css'
import * as CANNON from 'cannon-es'
import Stats from 'three/addons/libs/stats.module.js'

export default function Tron(){

  const mountRef = useRef<HTMLDivElement>(null)
  const loader = new GLTFLoader();
  const [ovals, setOvals] = useState<number[]>([1, 2, 3, 4]);

  // const [ovalBlue, setOvalBlue] = useState<number[]>([1, 2, 3, 4]);
  // const [ovalBYellow, setOvalYellow] = useState<number[]>([1, 2, 3, 4]);

  //   const [playerlifes, setLives] = useState<number[]>([1, 2, 3, 4]);
  //   const lifesChange = ()=>{
  //     setLives(prev => [...prev, 10]); 
  //   }
  let PlayerIdRef = useRef("")
  // let McModel = useRef<THREE.Group | null>(null);
  let McModel = useRef<THREE.Mesh | THREE.Group| null>(null);
  let McHitBox = useRef<CANNON.Body | null>(null);

  let trailState = useRef(false)
  let playersTrails = useRef<Map<string, Array<THREE.Vector3> | null>>(new Map())
  let stateRef = useRef("IDLE")
  let poolId = useRef("")
  let colorRef = useRef("")
  let isAlive = useRef(true)
  let players: { [key: string]: { mesh: THREE.Mesh | null; body?: CANNON.Body[] | null} } = {};


  let accMap: { [key: string]: any } = {};
  let yellowBike = useRef<THREE.Group | null>(null);
  let whiteBike = useRef<THREE.Group | null>(null);
  let blueBike = useRef<THREE.Group | null>(null);
  const keyMap: { [key: string]: boolean } = {}

  var playerTrail=new Array<THREE.Vector3>();

  var playerTrailHitBox = new Array<CANNON.Body>();
  const acceleration=0.5;
  // let dAcc=0.0002
  let speed=0;



  let yellowBikeArray = Array<THREE.Group>();
  let blueBikeArray = Array<THREE.Group>();


  const maxSpeed=20


    const handleClick = ()=>{
    setOvals(prev => [...prev, 1]);
    }
    

  loader.load('/assets/lightcycle.glb', (gltf) => {
    let model = gltf.scene;
    model.position.set(2,0,0);
    blueBike.current=model
  });
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

    const tronBike=(  color : string )=>{
      const geometry = new THREE.BoxGeometry( 0.6, 0.8, 1.8, 8 ); 
      const material = new THREE.MeshBasicMaterial( {color: color} ); 
      const capsule = new THREE.Mesh( geometry, material ); 
      // capsule.position.y+=0.35
      capsule.rotation.x-=Math.PI/2
      return capsule;
    }
    useEffect(() => {
      let wallMesh: THREE.Mesh<THREE.ExtrudeGeometry | THREE.TubeGeometry, THREE.MeshStandardMaterial>;
      function updateWallMesh(newPoints: THREE.Vector3[]) {
        let loweredPoints : THREE.Vector3[] = [];
        if(newPoints.length>0){
          loweredPoints = newPoints.map(p => new THREE.Vector3(p.x,0, p.z));
        }
        if (newPoints.length < 2) return; 
        const strip = new THREE.Shape();
        strip.moveTo(0, 0);
        strip.lineTo(-1, 0);
        strip.lineTo(-1, 0.1);
        strip.lineTo(0, 0.1);
        strip.lineTo(0, 0); 
        const curvePath = new THREE.CatmullRomCurve3(loweredPoints);
        const extrudeSettings = {
            steps: 250,                  
            bevelEnabled: false,         
            extrudePath: curvePath    
          };
          const geometry = new THREE.ExtrudeGeometry(strip, extrudeSettings);
          let color = colorRef.current;
          const material = new THREE.MeshStandardMaterial({ color: color });
          if(wallMesh){
            wallMesh.geometry.dispose
            wallMesh.geometry = geometry as THREE.ExtrudeGeometry
          }else{
          wallMesh = new THREE.Mesh(geometry, material);
          wallMesh.position.set(0,0,0)
          scene.add(wallMesh);
          }
      }


      loader.load('/assets/lightcycle.glb', (gltf) => {
        const model = gltf.scene;
        model.position.set(-2,0,0);
        model.scale.set(1,1,1);
        scene.add(model)
        blueBike.current = model;
      });  

    loader.load('/assets/encom_786__flynns_lightcycle__tron_evolution.glb', (gltf) => { 
      whiteBike.current = gltf.scene;
      whiteBike.current.position.set(5,0,5)
      scene.add(whiteBike.current)
    }); 
        loader.load('/assets/elite_lightcycle__tron_evolution_battle_grids.glb', (gltf) => { 
      yellowBike.current = gltf.scene;
      yellowBike.current.scale.set(7,7,7)
      yellowBike.current.position.set(10,0,10)
      scene.add(yellowBike.current)
    }); 

      function updatePlayerWallMesh(newPoints: THREE.Vector3[],player_color:string,player_id : string ) {
        let loweredPoints = newPoints.map(p => new THREE.Vector3(p.x,0, p.z));
        if (newPoints.length < 2) return; 
        const strip = new THREE.Shape();
        strip.moveTo(0, 0);
        strip.lineTo(-1, 0);
        strip.lineTo(-1, 0.1);
        strip.lineTo(0, 0.1);
        strip.lineTo(0, 0); 
        const curvePath = new THREE.CatmullRomCurve3(loweredPoints);
        const extrudeSettings = {
            steps: 200,                  
            bevelEnabled: false,         
            extrudePath: curvePath    
          };
          const geometry = new THREE.ExtrudeGeometry(strip, extrudeSettings);
          let color = colorRef.current;
          if(player_color)
          {
            color = player_color
          }
          const material = new THREE.MeshStandardMaterial({ color: color });
          const obj : {mesh : THREE.Mesh| null; body : CANNON.Body| null} = {mesh:null,body:null};
          
          if(players[player_id] && players[player_id].mesh){
            players[player_id].mesh.geometry.dispose
            players[player_id].mesh.geometry = geometry
          }else{
            obj.mesh=new THREE.Mesh(geometry, material);
            players[player_id].mesh = obj.mesh

            scene.add(obj.mesh);
          }
      }

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200)
        camera.position.x=10
        camera.position.z=10
        camera.position.y=0



        const l2=new THREE.AmbientLight(0xffffff, 1)
        scene.add(l2);

        const grid = new THREE.GridHelper(1000, 100)
        scene.add(grid)

      
        const world = new CANNON.World({
          gravity: new CANNON.Vec3(0, -9.82, 0),
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
        groundBody.quaternion.setFromEuler(-Math.PI / 2,0, 0)
        world.addBody(groundBody)

        const pilBody = hitBox()
              world.addBody(pilBody);

        McHitBox.current = hitBox()
        if(McHitBox.current){
          world.addBody(McHitBox.current)
        }
        if(McModel.current){
          scene.add(McModel.current)
        }
        

        for(var i=0;i<5;i++){
          loader.load('/assets/lightcycle.glb', (gltf) => { 
              const model = gltf.scene;
              model.position.set(5+blueBikeArray.length*2,0,5+blueBikeArray.length*2)
              scene.add(model)
              blueBikeArray.push(model)
            }); 
        }


        for(var i=0;i<5;i++){
            loader.load('/assets/elite_lightcycle__tron_evolution_battle_grids.glb', (gltf) => { 
              const model = gltf.scene;
              model.position.set(5-yellowBikeArray.length*2,0,5-yellowBikeArray.length*2)
              model.scale.set(7,7,7)
              scene.add(model)
              yellowBikeArray.push(model)
            }); 
        }

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }
        const orbit = new OrbitControls(camera, renderer.domElement)
        orbit.enableDamping = false; 
        orbit.dampingFactor = 1;
        orbit.enablePan = true;    
        orbit.enableZoom = true; 
         
        
        const onDocumentKey = (e: KeyboardEvent) => {
          keyMap[e.code] = e.type === 'keydown'
          if (keyMap['KeyW'] || keyMap['ArrowUp']) {
            speed = Math.min(speed + acceleration,maxSpeed)
          }
          if (keyMap['KeyS'] || keyMap['ArrowDown']) {
            speed = Math.max(speed - acceleration,0)
          }
          if (keyMap['Space']){
            trailState.current=!trailState.current
          }
        }
        document.addEventListener('keydown', onDocumentKey, false)
        document.addEventListener('keyup', onDocumentKey, false)

        //socket


        const ws = new WebSocket("ws://localhost:8080/play");
        if(ws != null){
          ws.onopen=()=>{
            console.log("connected");
          } 
          ws.onclose = () => {
            console.log("Disconnected from WebSocket ❌");
          };
          ws.onmessage = (event) => {
  
            var data = event.data
            if(data.length>0){
              data=JSON.parse(event.data)
              if(PlayerIdRef.current==""){
  
                PlayerIdRef.current=data.main_message.player_id
                stateRef.current = "idle";
              
              }else if(stateRef.current == "idle"){
                stateRef.current=data.main_message.status
              } else if (data.main_message == "waiting") {
                stateRef.current=data.main_message.status
                poolId.current=data.main_message.pool_id
                colorRef.current=data.main_message.color
              } else if (stateRef.current == "Starting") {
                stateRef.current=data.main_message.status
                  if(data.position_list!=null) {
  
                    var positions=data.position_list
                    Object.entries(positions).map(([playerId, pos]) => {
  
                      if(playerId !== PlayerIdRef.current){
                        
                        const position = pos as { color: string; x: number; y: number; z: number; rx: number; ry: number; rz: number ,state:boolean, alive : boolean};                  
                        
                        if(accMap[playerId] == null || accMap[playerId] == undefined) {
                          var model = tronBike("red");
                          scene.add(model)
                          accMap[playerId] = model
                        }
                        accMap[playerId].position.set(position.x,position.y,position.z)
                        accMap[playerId].rotation.set(position.rx,position.ry,position.rz)
                      }})
                      
                  }
              }else if (stateRef.current == "Playing") {
                if(data.position_list!=null)
                {
                  var positions=data.position_list
                  Object.entries(positions).map(([playerId, pos]) => {
                    if(playerId !== PlayerIdRef.current){
                      const position = pos as { color: string; x: number; y: number; z: number; rx: number; ry: number; rz: number ,state:boolean,alive : boolean};                  
                      if(accMap[playerId] == null || accMap[playerId] == undefined)
                      {
                        
                        var model = tronBike("red");
                        model.position.set(0, 0, 0);
  
                        scene.add(model)
                        accMap[playerId] = model
                      }
                      accMap[playerId].position.set(position.x,position.y,position.z)
                      accMap[playerId].rotation.set(position.rx,position.ry,position.rz)
  
                      if(position.state){
                        const trail = playersTrails.current.get(playerId) || [];
                        trail.push(new THREE.Vector3(position.x, position.y, position.z));
  
                        if(trail.length == 200){
                          trail.splice(0,1);
                        }
                        playersTrails.current.set(playerId, trail);
                        updatePlayerWallMesh(trail,position.color,playerId)
  
                      }else{
  
                        if(!players[playerId]){
                          const obj : {mesh : THREE.Mesh| null; body : CANNON.Body[]| null} = {mesh:null,body:null};
                          players[playerId] = obj;
                        }
  
                        if( players[playerId].body){
                          players[playerId].body?.forEach(box=>world.removeBody(box));
                          players[playerId].body.length=0
                        }
  
                        if( players[playerId].mesh){
                          players[playerId].mesh.geometry.dispose
                          scene.remove(players[playerId].mesh)
                        }
                      }
                    }
                  })
                }
              }
            }
          };
                  
          ws.onerror = (error) => {
            console.error("WebSocket error:", error);
          };
        }
        const stats = new Stats()
        document.body.appendChild(stats.dom)
        console.log(window.innerWidth,window.innerHeight)

        const animate = () => {
          console.log(stateRef.current)
          requestAnimationFrame(animate);
          const delta = clock.getDelta()
          world.step(1 / 60, delta)

          if(blueBike.current){
            McModel.current = yellowBike.current
            colorRef.current = "yellow"
          }
          if(McHitBox.current && McModel.current && McHitBox.current.position ){
            var tilt=0
            if (keyMap['KeyA'] || keyMap['ArrowLeft']) {
              const axis = new CANNON.Vec3(0, 1, 0); 
              const angle = +0.025;
              const q = new CANNON.Quaternion();
              q.setFromAxisAngle(axis, angle);
              McHitBox.current.quaternion = q.mult(McHitBox.current.quaternion);
              tilt=0.1
            }

            if (keyMap['KeyD'] || keyMap['ArrowRight']){
              const axis = new CANNON.Vec3(0, 1, 0); 
              const angle = -0.025;
              const q = new CANNON.Quaternion();
              q.setFromAxisAngle(axis, angle);  
              McHitBox.current.quaternion = q.mult(McHitBox.current.quaternion);
              tilt=-0.1
            }
            const euler = new THREE.Euler();
            euler.setFromQuaternion(McModel.current.quaternion, 'YXZ');
            const angleY = euler.y;


            McHitBox.current.velocity.x = speed * 10 * Math.sin(angleY);
            McHitBox.current.velocity.z = speed * 10 * Math.cos(angleY);
            McModel.current.position.copy(McHitBox.current.position as any)
            McModel.current.position.y-=0.35
            McModel.current.quaternion.copy(McHitBox.current.quaternion as any);
            // if(colorRef.current=="blue"){
            //   McModel.current.rotation.y+=Math.PI/2
            // }
            McModel.current.rotation.z-=tilt
            var r=10
            var x = r * Math.sin(angleY)
            var z = r * Math.cos(angleY)
            camera.position.set(McModel.current.position.x-x,5,McModel.current.position.z-z) 
            camera.lookAt(McModel.current.position);  

            const up = new THREE.Vector3(0, 1, 0);
            up.applyQuaternion(McModel.current.quaternion);
            const isUpsideDown = up.y < 0;
            if (isUpsideDown) {
              isAlive.current = false
              trailState.current = false
              McHitBox.current.inertia.setZero
              McHitBox.current.angularVelocity.set(0,0,0)
              McHitBox.current.quaternion.set(0,0,0,1);
              McHitBox.current.position.set(10,1,10);
              McHitBox.current.velocity.setZero
              speed = 0
              isAlive.current = true
            }
          }
          // speed = Math.max(speed - dAcc,0)

          if(trailState.current && McModel.current && McModel.current.position && McModel.current.position!=undefined)
          {
            if(playerTrailHitBox.length==200)
            {
              world.removeBody(playerTrailHitBox[0]);
              playerTrailHitBox.splice(0,1);
            }
            if(playerTrail.length==200){
               playerTrail.splice(0,1);
            }
            if(playerTrail.length == 0){
              playerTrail.push(McModel.current.position.clone())
            }else if(playerTrail[playerTrail.length-1].distanceTo(McModel.current.position)>2)
            {
              const pos1 = playerTrail[playerTrail.length-1]
              const pos = new CANNON.Vec3(pos1.x,pos1.y,pos1.z)
              playerTrail[playerTrail.length-1]
              playerTrail.push(McModel.current.position.clone())
              const material =  new CANNON.Material({
                friction:0,
                restitution:0
              })
              const poll = new CANNON.Body({
              type: CANNON.Body.STATIC,
              shape: new CANNON.Box(new CANNON.Vec3(0.1,0.1,1)), 
              position:pos,
              material: material
              })
              world.addBody(poll);
              playerTrailHitBox.push(poll);
          }
          updateWallMesh(playerTrail)
          scene.add(wallMesh)

          }else if(trailState.current == false && wallMesh!=undefined && wallMesh.geometry != undefined){
            playerTrail = new Array<THREE.Vector3>();
            scene.remove(wallMesh)
            playerTrailHitBox.forEach(box=>world.removeBody(box));
            playerTrailHitBox.length=0
          }
          if(stateRef.current == "Playing"){
            if(McModel.current && McModel.current.position)
            {
              var message: { x: number ,y: number,z: number,rx: number,ry: number,rz: number,state :boolean, color :string , alive :boolean} = { x: 0,y :0,z:0,rx:0, ry:0,rz:0 , state:false,color:"white",alive:true};
              
              message.x = McModel.current.position.x
              message.y = McModel.current.position.y
              message.z = McModel.current.position.z
              message.rx = McModel.current.rotation.x
              message.ry = McModel.current.rotation.y
              message.rz = McModel.current.rotation.z
              message.state = trailState.current
              message.color = colorRef.current
              message.alive = isAlive.current
              console.log(message)

              var playerMessage : {player_id:string ,pool_id:string,status:string ,position:any } = {player_id:"",status:"",position:{},pool_id:""} 

              playerMessage.player_id = PlayerIdRef.current
              playerMessage.pool_id= poolId.current
              playerMessage.status=stateRef.current
              playerMessage.position = message
              if(ws!=null){
                ws.send(JSON.stringify(playerMessage))
              }
            }
          }


          if(stateRef.current=="END"){
            // stateRef
          }
          renderer.render(scene, camera)
          stats.update()
        }
        animate()
        return () => {
          if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement)
            renderer.setSize(window.innerWidth, window.innerHeight);
          }
        };
      }, []); 

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mountRef} />
      <div style={{
        position: 'absolute',
        top: window.innerHeight-200,
        right:window.innerWidth-250,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        color: '#00ff00',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '200px'
        }}>
          <div style={{ marginBottom: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Controls</h3>
          <p style={{ margin: '0 0 5px 0' }}>W/↑: Accelerate</p>
          <p style={{ margin: '0 0 5px 0' }}>S/↓: Brake</p>
          <p style={{ margin: '0 0 5px 0' }}>A/←: Turn Left</p>
          <p style={{ margin: '0 0 5px 0' }}>D/→: Turn Right</p>
          <p style={{ margin: '0' }}>Space: Toggle Trail</p>
      </div>
      </div>
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        color: '#00ff00',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        minWidth: '200px'
      }}>
<div style={{
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  border: '4px solid #0000ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <div style={{
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'conic-gradient(from 200deg, #0000ff 0% 90%, transparent 90% 100%)',
    maskImage: 'radial-gradient(circle, transparent 60%, black 0%)',
    WebkitMaskImage: 'radial-gradient(circle, transparent 60%, black 50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    fontWeight: 'bold',
    userSelect: 'none',
  }}>
  </div>
</div>
    <div style={{ display: 'flex',flexDirection:'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {ovals.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '25px',
                  backgroundColor: '#ffff00',
                  borderRadius: '9999px'
                }}
              ></div>
            ))}
          </div>

            <div style={{ display: 'flex', gap: '8px' }}>
            {ovals.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '25px',
                  backgroundColor: '#0000ff',
                  borderRadius: '9999px'
                }}
              ></div>
            ))}
          </div>
        </div>
        <div>score</div>
        <div>blue - yellow</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <button style={{
            backgroundColor: '#00ff00',
            color: 'black',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}>Reset</button>
          <button style={{
            backgroundColor: '#00ff00',
            color: 'black',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}  onClick={handleClick}>Exit</button>
        </div>
        <input></input>
            <button style={{
            backgroundColor: '#00ff00',
            color: 'black',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}>Url to connect</button>
      </div>
    </div>
  )
}
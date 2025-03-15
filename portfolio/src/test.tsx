// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// const Cube = React.forwardRef<THREE.Mesh>((_, ref) => {
//   return (
//     <mesh ref={ref}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="green" />
//     </mesh>
//   );
// });

// const App: React.FC = () => {
//   const cubeRef = useRef<THREE.Mesh>(null);

//   // Define actions for buttons
//   const actions: { [key: string]: () => void } = {
//     "Change Color": () => {
//       if (cubeRef.current) {
//         cubeRef.current.material.color.set(Math.random() * 0xffffff);
//       }
//     },
//     "Rotate X": () => cubeRef.current && (cubeRef.current.rotation.x += 0.1),
//     "Rotate Y": () => cubeRef.current && (cubeRef.current.rotation.y += 0.1),
//     "Rotate Z": () => cubeRef.current && (cubeRef.current.rotation.z += 0.1),
//     "Scale Up": () =>
//       cubeRef.current &&
//       cubeRef.current.scale.set(
//         cubeRef.current.scale.x + 0.1,
//         cubeRef.current.scale.y + 0.1,
//         cubeRef.current.scale.z + 0.1
//       ),
//     "Scale Down": () =>
//       cubeRef.current &&
//       cubeRef.current.scale.set(
//         cubeRef.current.scale.x - 0.1,
//         cubeRef.current.scale.y - 0.1,
//         cubeRef.current.scale.z - 0.1
//       ),
//     "Move Left": () => cubeRef.current && (cubeRef.current.position.x -= 0.1),
//     "Move Right": () => cubeRef.current && (cubeRef.current.position.x += 0.1),
//     "Move Up": () => cubeRef.current && (cubeRef.current.position.y += 0.1),
//     "Move Down": () => cubeRef.current && (cubeRef.current.position.y -= 0.1),
//   };

//   return (
//     <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
//       {/* Buttons */}
//       <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
//         {Object.keys(actions).map((action) => (
//           <button
//             key={action}
//             onClick={actions[action]}
//             style={{
//               margin: "5px",
//               padding: "10px",
//               cursor: "pointer",
//               background: "#ff5733",
//               color: "white",
//               border: "none",
//             }}
//           >
//             {action}
//           </button>
//         ))}
//       </div>

//       {/* Three.js Scene */}
//       <Canvas camera={{ position: [0, 0, 5] }}>
//         <ambientLight />
//         <pointLight position={[5, 5, 5]} />
//         <Cube ref={cubeRef} />
//       </Canvas>
//     </div>
//   );
// };

// export default App;

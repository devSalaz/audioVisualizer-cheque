import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Billet = ({ posZ = 0 }) => {
  const { viewport, camera } = useThree();
  const [dataPosition] = useState({
    posX: THREE.MathUtils.randFloatSpread(2),
    posY: THREE.MathUtils.randFloatSpread(viewport.height) * 4,
    rotX: Math.random() * Math.PI,
    rotY: Math.random() * Math.PI,
    rotZ: Math.random() * Math.PI,
    rotXIntesity: (Math.random() - 0.5) * 1,
    rotYIntesity: (Math.random() - 0.5) * 1,
    rotZIntesity: (Math.random() - 0.5) * 1,
  });
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -posZ]);
  const billetRef = useRef(null);
  const { nodes, materials } = useGLTF("./models/billet.glb");

  useFrame((state, delta) => {
    billetRef.current.rotation.set(
      (dataPosition.rotX += delta * 0.3 * dataPosition.rotXIntesity),
      (dataPosition.rotY += delta * 0.5 * dataPosition.rotYIntesity),
      (dataPosition.rotZ += delta * 0.3 * dataPosition.rotZIntesity)
    );
    billetRef.current.position.set(
      dataPosition.posX * width,
      (dataPosition.posY += delta * 0.2),
      -posZ
    );
    if (dataPosition.posY > height / 1.5) {
      dataPosition.posY = -height / 1.5;
    }
  });

  return (
    <>
      <group dispose={null} position-x={0} scale={0.4} ref={billetRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Billet.geometry}
          material={materials["Billet_Mat"]}
          rotation={[0, -0.3, 0]}
          material-roughness={0.45}
          material-emissive={"#f74a4a"}
          material-emissiveIntensity={0.2}
          material-envMapIntensity={1.6}
        />
      </group>
    </>
  );
};

export default Billet;

useGLTF.preload("./models/billet.glb");

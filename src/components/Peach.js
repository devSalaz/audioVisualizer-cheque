import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import SoundReactor from "../classes/SoundReactor";

const Peach = ({ posZ = 0, actualIndex }) => {
  const { nodes, materials } = useGLTF("./models/peach.glb");
  const peachRef = useRef(null);

  const { viewport, camera } = useThree();
  const [dataPosition] = useState({
    posX: THREE.MathUtils.randFloatSpread(2),
    posY: THREE.MathUtils.randFloatSpread(viewport.height) * 4,
    rotX: Math.random() * Math.PI,
    rotY: Math.random() * Math.PI,
    rotZ: Math.random() * Math.PI,
    rotXIntesity: Math.random() - 0.5,
    rotYIntesity: Math.random() - 0.5,
    rotZIntesity: Math.random() - 0.5,
  });
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -posZ]);

  useFrame((state, delta) => {
    peachRef.current.rotation.set(
      (dataPosition.rotX += delta * 0.3 * dataPosition.rotXIntesity),
      (dataPosition.rotY += delta * 0.5 * dataPosition.rotYIntesity),
      (dataPosition.rotZ += delta * 0.3 * dataPosition.rotZIntesity)
    );
    peachRef.current.position.set(
      dataPosition.posX * width,
      (dataPosition.posY += delta * 0.2),
      -posZ
    );
    if (dataPosition.posY > height / 1.4) {
      dataPosition.posY = -height / 1.4;
    }

    if (SoundReactor.isInitialized) {
      const scalePeach = 0.6 + (SoundReactor.fdata[actualIndex] / 255) * 0.2;
      const currentScale = THREE.MathUtils.lerp(
        peachRef.current.scale.x,
        scalePeach,
        0.5
      );
      peachRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <>
      <group ref={peachRef} dispose={null} position-x={2} scale={0.6}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials.Body_Mat}
          material-roughness={0.35}
          material-emissive={"#f74a4a"}
          material-emissiveIntensity={0.5}
          material-envMapIntensity={1.2}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Leaf1.geometry}
            material={materials.Leaf1_Mat}
            material-roughness={0.25}
            material-emissive={"#f74a4a"}
            material-emissiveIntensity={0.1}
            material-envMapIntensity={1.2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Leaf2.geometry}
            material={materials.Leaf2_Mat}
            material-roughness={0.25}
            material-emissive={"#f74a4a"}
            material-emissiveIntensity={0.01}
            material-envMapIntensity={1.2}
          />
        </mesh>
      </group>
    </>
  );
};

export default Peach;

useGLTF.preload("./models/peach.glb");

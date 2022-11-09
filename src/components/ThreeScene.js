import React, { useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Lighting from "./Lighting";
import Peach from "./Peach";
import Billet from "./Billet";
import Effects from "./Effects";

const ThreeScene = ({ depthBillets = 50, depthPeachs = 50 }) => {
  const { camera } = useThree();
  const [dataCam] = useState({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, dataCam.x, 0.1);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, dataCam.y, 0.1);
    camera.lookAt(0, 0, 0);
  });

  const onMouseMoveHandler = (event) => {
    const targetX = -(event.clientX / window.innerWidth - 0.5) * 2 * 0.3;
    const targetY = -(event.clientY / window.innerHeight - 0.5) * 2 * 0.1;
    dataCam.x = targetX;
    dataCam.y = targetY;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", onMouseMoveHandler);
    };
  }, []);

  const [billetsQuantity, setBilletsQuantity] = useState(400);
  const [peachQuantity, setPeachsQuantity] = useState(90);
  const billetsArray = [...Array(billetsQuantity)];
  const peachsArray = [...Array(peachQuantity)];
  return (
    <>
      <color args={["#feefe7"]} attach="background" />
      <Effects />
      <Lighting />
      <Billet />
      {billetsArray.map((billet, index) => {
        return (
          <Billet
            key={`billet${index}`}
            posZ={(index / billetsQuantity) * depthBillets}
          ></Billet>
        );
      })}

      {peachsArray.map((peach, index) => {
        return (
          <Peach
            key={`peach${index}`}
            posZ={(index / peachQuantity) * depthPeachs}
            actualIndex={index}
          />
        );
      })}
    </>
  );
};

export default ThreeScene;

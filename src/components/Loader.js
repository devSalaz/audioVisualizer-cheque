import React from "react";
import { Html } from "@react-three/drei";
import { useProgress } from "@react-three/drei";

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html wrapperClass="loader-container">
      <h2>SEN2KBRON</h2>
      <h3>{`Loading ${Math.floor((loaded / total) * 100)}%`}</h3>
    </Html>
  );
};

export default Loader;

import React from "react";
import { Environment } from "@react-three/drei";

const Lighting = () => {
  return (
    <>
      <Environment files="./hdris/venice_sunset_1k.hdr" />
      <ambientLight color={"#f78a4a"} intensity={0.2} />
      <spotLight
        position={[20, 20, 20]}
        intensity={2}
        decay={0}
        angle={Math.PI / 3}
        penumbra={0}
        color={"#f78a4a"}
      />
    </>
  );
};

export default Lighting;

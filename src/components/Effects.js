import React from "react";

import {
  EffectComposer,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";

const Effects = () => {
  return (
    <>
      <EffectComposer>
        <Vignette offset={0.3} darkness={0.55} />
        <DepthOfField
          focusDistance={0}
          focalLength={0.5}
          bokehScale={11}
          height={700}
        />
      </EffectComposer>
    </>
  );
};

export default Effects;

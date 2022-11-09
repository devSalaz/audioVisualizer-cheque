import "./App.css";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ThreeScene from "./components/ThreeScene";
import Song from "./components/Song";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="Three-Container">
      <Song />
      <Canvas camera={{ fov: 50, far: 170 }}>
        <Suspense fallback={<Loader />}>
          <ThreeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

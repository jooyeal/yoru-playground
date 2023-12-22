"use client";
import { StrictMode, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import Init from "./components/init";
import Galary from "./components/galary";
import Rig from "./components/init/rig";

export default function Home() {
  const [sceneName, setSceneName] = useState<string>("");

  return (
    <div className="w-screen h-screen">
      <StrictMode>
        <Canvas
          flat
          shadows
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          //   camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 4] }}
          camera={{ fov: 75, position: [0, 0, 3] }}
        >
          <Perf position="top-left" />
          <Galary />
          <Init handleClickFrame={(name: string) => setSceneName(name)} />
          <Rig sceneName={sceneName} />
        </Canvas>
      </StrictMode>
    </div>
  );
}

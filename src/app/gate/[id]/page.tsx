"use client";
import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Galary from "@/app/components/galary";

export default function Portfolio() {
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
          camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 4] }}
        >
          <Galary />
        </Canvas>
      </StrictMode>
    </div>
  );
}

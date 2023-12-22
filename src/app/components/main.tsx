"use client";
import React, { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Basic from "./basic";
import Galary from "./galary";
import Init from "./init";

export default function Main() {
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
          camera={{ fov: 75, position: [0, 0, 20] }}
        >
          {/* <Galary /> */}
          <Init />
        </Canvas>
      </StrictMode>
    </div>
  );
}

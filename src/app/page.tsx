"use client";
import { StrictMode, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import Main from "./components/main";

export default function Home() {
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
          color="black"
        >
          <Perf position="top-left" />
          <Main />
        </Canvas>
      </StrictMode>
    </div>
  );
}

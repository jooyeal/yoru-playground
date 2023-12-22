"use client";
import { Gltf } from "@react-three/drei";
import * as THREE from "three";
import Frame from "./frame";
import { TInitialSceneCard } from "../types";

export default function Init({
  handleClickFrame,
}: {
  handleClickFrame: (args: TInitialSceneCard) => void;
}) {
  return (
    <>
      <Frame
        id="01"
        name="galary"
        author="Omar Faruq Tawsif"
        bg="#e4cdac"
        position={new THREE.Vector3(...[-1.15, 0, 0])}
        rotation={new THREE.Euler(...[0, 0.5, 0])}
        handleClickFrame={handleClickFrame}
      >
        <Gltf src="glb2.glb" scale={8} position={[0, -0.7, -2]} />
      </Frame>
      <Frame
        id="02"
        name="galary"
        author="Omar Faruq Tawsif"
        position={new THREE.Vector3(...[0, 0, 0])}
        rotation={new THREE.Euler(...[0, 0, 0])}
        handleClickFrame={handleClickFrame}
      >
        <Gltf src="glb1.glb" position={[0, -2, -3]} />
      </Frame>
      <Frame
        id="03"
        name="galary"
        author="Omar Faruq Tawsif"
        bg="#d1d1ca"
        position={new THREE.Vector3(...[1.15, 0, 0])}
        rotation={new THREE.Euler(...[0, -0.5, 0])}
        handleClickFrame={handleClickFrame}
      >
        <Gltf src="glb3.glb" scale={2} position={[0, -0.8, -4]} />
      </Frame>
    </>
  );
}

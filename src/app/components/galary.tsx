"use client";
import React, { useState } from "react";
import { Text, Hud, PerspectiveCamera } from "@react-three/drei";
import Wall from "./meshes/wall";
import Ground from "./meshes/ground";
import Pole from "./meshes/pole";
import FrameList from "./meshes/frame-list";
import GalaryPoint from "./meshes/galary-point";

export default function Galary() {
  const [image, setImage] = useState("./img1.jpeg");
  const images = [
    { id: "1", position: [-1.7, 0.5, 0.05], image: "./img1.jpeg" },
    { id: "2", position: [0, 0.5, 0.05], image: "./img2.jpeg" },
  ];
  return (
    <>
      <color args={["ivory"]} attach="background" />
      <ambientLight intensity={0.5} />
      <group position={[0, 10, 0]}>
        <GalaryPoint />
        <Wall />
        <Ground />
        <Pole />
        <FrameList images={images} />
      </group>
      <Hud>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <Text>hello</Text>
      </Hud>
    </>
  );
}

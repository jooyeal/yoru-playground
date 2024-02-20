import { Center } from "@react-three/drei";
import React, { Suspense, useMemo, useState } from "react";
import CurvedPlane from "./curvedPlane";
import VideoMaterial from "./videoMaterial";
import * as THREE from "three";

type Props = {
  src: string;
  name: string;
  position: number[];
};

export default function VideoScreen({ src, name, position }: Props) {
  const ratio = 16 / 9;
  const width = 5;
  const radius = 4;

  return (
    <mesh name={name} position={new THREE.Vector3(...position)}>
      <CurvedPlane width={width} height={width / ratio} radius={radius}>
        <Suspense
          fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe />}
        >
          <VideoMaterial src={src} />
        </Suspense>
      </CurvedPlane>
    </mesh>
  );
}

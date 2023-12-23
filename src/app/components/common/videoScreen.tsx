import { Center } from "@react-three/drei";
import React, { Suspense, useMemo, useState } from "react";
import CurvedPlane from "./curvedPlane";
import VideoMaterial from "./videoMaterial";
import * as THREE from "three";

type Props = {
  src: string;
  name: string;
};

export default function VideoScreen({ src, name }: Props) {
  const ratio = 16 / 9;
  const width = 5;
  const radius = 4;
  const z = 4;

  return (
    <mesh name={name}>
      <Center top position-z={z}>
        <CurvedPlane width={width} height={width / ratio} radius={radius}>
          <Suspense
            fallback={
              <meshStandardMaterial side={THREE.DoubleSide} wireframe />
            }
          >
            <VideoMaterial src={src} />
          </Suspense>
        </CurvedPlane>
      </Center>
    </mesh>
  );
}

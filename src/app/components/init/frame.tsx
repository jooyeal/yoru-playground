"use client";
import { useRef, useState } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { useCursor, MeshPortalMaterial, Text } from "@react-three/drei";
import { useRouter, useParams } from "next/navigation";
import { easing, geometry } from "maath";
// import { suspend } from "suspend-react";
import { GOLDENRATIO } from "@/app/utils/three";
import * as THREE from "three";
import { TInitialSceneCard } from "../types";

extend(geometry);
// const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
// const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

type Props = {
  id: string;
  name: string;
  author: string;
  bg?: THREE.ColorRepresentation;
  width?: number;
  height?: number;
  children: React.ReactNode;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  handleClickFrame: (args: TInitialSceneCard) => void;
};

export default function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = GOLDENRATIO,
  children,
  handleClickFrame,
  position,
  rotation,
}: Props) {
  const portalRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) => {
    if (portalRef.current)
      easing.damp(
        portalRef.current,
        "blend",
        params.id === id ? 1 : 0,
        0.2,
        dt
      );
  });
  return (
    <group position={position} rotation={rotation}>
      <Text
        // font={suspend(medium).default}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        // font={suspend(regular).default}
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        // font={suspend(regular).default}
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text>
      <mesh
        name={id}
        onClick={(e) => (
          e.stopPropagation(),
          handleClickFrame({ name: id, position, rotation })
        )}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        {/**@ts-ignore */}
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portalRef}
          events={params.id === id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={bg ? [bg] : undefined} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

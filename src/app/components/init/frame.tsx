"use client";
import { useRef, useState } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { useCursor, MeshPortalMaterial, Text, Gltf } from "@react-three/drei";
import { useRouter, useParams } from "next/navigation";
import { easing, geometry } from "maath";
// import { suspend } from "suspend-react";
import * as THREE from "three";
import { TInitialSceneCard } from "../types";
import { GOLDENRATIO } from "@/app/utils/three";

extend(geometry);
// const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
// const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

type Props = {
  currentArgs: TInitialSceneCard | null;
  handleClickFrame: (args: TInitialSceneCard) => void;
  handleDoubleClickFrame: (args: TInitialSceneCard) => void;
} & TInitialSceneCard;

export default function Frame({
  handleClickFrame,
  handleDoubleClickFrame,
  ...rest
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
        params.id === rest.id ? 1 : 0,
        0.2,
        dt
      );
  });
  return (
    <group position={rest.position} rotation={rest.rotation}>
      <Text
        // font={suspend(medium).default}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {rest.title}
      </Text>
      <Text
        // font={suspend(regular).default}
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{rest.id}
      </Text>
      <mesh
        name={rest.id}
        onClick={(e) => (e.stopPropagation(), handleClickFrame(rest))}
        onDoubleClick={(e) => (
          e.stopPropagation(), handleDoubleClickFrame(rest)
        )}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        {/**@ts-ignore */}
        <roundedPlaneGeometry args={[1, GOLDENRATIO, 0.1]} />
        <MeshPortalMaterial
          ref={portalRef}
          events={params.id === rest.id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={rest.bg ? [rest.bg] : undefined} />
          <ambientLight intensity={0.5} />
          <Gltf
            src={rest.src}
            scale={rest.scale}
            position={rest.gltfPosition}
          />
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

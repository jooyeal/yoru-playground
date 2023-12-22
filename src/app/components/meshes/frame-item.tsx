"use client";
import { TImage } from "../types";
import * as THREE from "three";
import { useTexture, useCursor, Decal, useHelper } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { GOLDENRATIO } from "@/app/utils/three";

const boxGeometry = new THREE.BoxGeometry(1, GOLDENRATIO, 0.05);

export default function FrameItem({ data }: { data: TImage }) {
  const imageFrameRef = useRef(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const [hover, setHover] = useState<boolean>(false);
  const texture = useTexture(data.image);

  useEffect(() => {
    if (spotLightRef.current && imageFrameRef.current) {
      spotLightRef.current.target = imageFrameRef.current;
    }
  }, [spotLightRef, imageFrameRef]);

  //   useHelper(
  //     spotLightRef as React.MutableRefObject<THREE.SpotLight>,
  //     THREE.SpotLightHelper,
  //     1
  //   );
  useCursor(hover);

  const aspectRatio = texture.image.width / texture.image.height;
  const scaleY = GOLDENRATIO;
  const scaleX = scaleY * aspectRatio;
  return (
    <group position={new THREE.Vector3(...data.position)}>
      <spotLight
        ref={spotLightRef}
        castShadow
        color="white"
        intensity={1}
        position={[0, 3, 3]}
        angle={Math.PI / 5}
        penumbra={1}
      />

      <mesh position={[0, 0.8, 0]} geometry={boxGeometry} castShadow>
        <meshStandardMaterial
          color="darkgoldenrod"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      <mesh
        ref={imageFrameRef}
        name={data.id}
        onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
        onPointerOut={() => setHover(false)}
        geometry={boxGeometry}
        position={[0, 0.8, 0.01]}
        scale={[0.9, 0.94, 0.9]}
        material-roughness={1}
        dispose={null}
      >
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[scaleX, scaleY, 1]}
          map={texture}
        />
      </mesh>
    </group>
  );
}

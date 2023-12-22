"use client";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import {
  CameraControls,
  PerspectiveCamera,
  Text3D,
  Hud,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Galary from "./galary";
import Init from "./init";
import { TInitialSceneCard } from "./types";

const initialSceneCardList = [
  {
    id: "01",
    src: "glb2.glb",
    targetSceneName: "galary",
    title: "test1",
    bg: "#e4cdac",
    text: "",
    scale: 8,
    gltfPosition: new THREE.Vector3(0, -0.7, -2),
    position: new THREE.Vector3(-1.15, 0, 0),
    rotation: new THREE.Euler(0, 0.5, 0),
  },
  {
    id: "02",
    src: "glb1.glb",
    targetSceneName: "galary",
    title: "test2",
    bg: undefined,
    text: "",
    gltfPosition: new THREE.Vector3(0, -2, -3),
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
  },
  {
    id: "03",
    src: "glb3.glb",
    targetSceneName: "galary",
    title: "test3",
    bg: "#d1d1ca",
    text: "",
    scale: 2,
    gltfPosition: new THREE.Vector3(0, -0.8, -4),
    position: new THREE.Vector3(1.15, 0, 0),
    rotation: new THREE.Euler(0, -0.5, 0),
  },
] satisfies TInitialSceneCard[];

export default function Main({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}: {
  position?: THREE.Vector3;
  focus?: THREE.Vector3;
}) {
  const [currentArgs, setCurrentArgs] = useState<TInitialSceneCard | null>(
    null
  );
  const cameraControlsRef = useRef<CameraControls>(null);
  const { scene } = useThree();

  const moveTo = (name: string) => {
    const active = scene.getObjectByName(name);

    if (active?.parent) {
      active.parent.localToWorld(position.set(0, 0, 1.5));
      active.parent.localToWorld(focus.set(0, 0, 0));
    }
    if (cameraControlsRef.current)
      cameraControlsRef.current.setLookAt(
        ...position.toArray(),
        ...focus.toArray(),
        true
      );
  };

  useEffect(() => {
    if (cameraControlsRef.current) {
      // disable mouse event
      cameraControlsRef.current.disconnect();
    }
  }, [cameraControlsRef]);

  // initial move
  useFrame((state, delta) => {
    if (cameraControlsRef.current && !currentArgs) {
      const speed = 1;
      const elapsedTime = state.clock.elapsedTime * speed;
      if (elapsedTime < 3)
        cameraControlsRef.current.setPosition(0, 0, elapsedTime);
    }
  });

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <Galary />
      <Init
        initialSceneCardList={initialSceneCardList}
        handleClickFrame={(args: TInitialSceneCard) => {
          setCurrentArgs(args);
          if (cameraControlsRef.current) {
            moveTo(args.id);
          }
        }}
        currentArgs={currentArgs}
      />
      <Hud>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <Text3D position={[-3, 8, -10]} font="/Inter_Bold.json"></Text3D>
      </Hud>
    </>
  );
}

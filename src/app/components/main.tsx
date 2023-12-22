"use client";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Galary from "./galary";
import Init from "./init";
import { TInitialSceneCard } from "./types";

export default function Main({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}: {
  position?: THREE.Vector3;
  focus?: THREE.Vector3;
}) {
  const [sceneName, setSceneName] = useState<string>("");
  const cameraControlsRef = useRef<CameraControls>(null);
  const { scene } = useThree();

  const moveTo = (name: string) => {
    const active = scene.getObjectByName(name);
    const position = new THREE.Vector3();
    const focus = new THREE.Vector3();

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

  // move to scene
  useEffect(() => {
    if (cameraControlsRef.current) {
      // disable mouse event
      cameraControlsRef.current.disconnect();

      // move to target scene
      moveTo(sceneName);

      cameraControlsRef.current.rotate;
    }
  }, [sceneName, cameraControlsRef]);

  // initial move
  useFrame((state, delta) => {
    if (cameraControlsRef.current && sceneName === "") {
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
        handleClickFrame={(args: TInitialSceneCard) => {
          // setSceneName(name);
          if (cameraControlsRef.current) {
            moveTo(args.name);
          }
        }}
      />
    </>
  );
}

"use client";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

export default function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
  sceneName = "",
}: {
  position?: THREE.Vector3;
  focus?: THREE.Vector3;
  sceneName: string;
}) {
  const { controls, scene, camera } = useThree();
  console.log(controls);
  useEffect(() => {
    const active = scene.getObjectByName(sceneName);
    if (active?.parent) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    // @ts-ignore
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, [sceneName]);
  return (
    <OrbitControls camera={camera} />
    // <CameraControls
    //   maxZoom={1}
    //   makeDefault
    //   minPolarAngle={0}
    //   maxPolarAngle={Math.PI / 2}
    // />
  );
}

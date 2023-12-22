"use client";
import React, { useRef } from "react";
import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";

export default function Basic() {
  const boxRef = useRef<THREE.Mesh>(null);
  const directionLightRef = useRef<THREE.DirectionalLight>(null);

  // show direction of light
  useHelper(
    directionLightRef as React.MutableRefObject<THREE.DirectionalLight>,
    THREE.DirectionalLightHelper,
    1,
    "red"
  );

  // control box mesh animation
  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    if (boxRef.current) {
      // move X
      boxRef.current.position.x = Math.sin(elapsedTime) + 1.5;
      // rotate Y
      boxRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <OrbitControls makeDefault />
      <Perf position="top-left" />
      <color args={["ivory"]} attach="background" />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        ref={directionLightRef}
        position={[1, 2, 3]}
        intensity={0.5}
        shadow-mapSize={[1024, 1024]}
      />
      <group position={[0, -1, 0]}>
        <mesh castShadow position={[-1, 0.6, 0]} scale={0.6}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position={[1, 0.5, 0]} ref={boxRef}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color="lightseagreen" />
        </mesh>
      </group>
    </>
  );
}

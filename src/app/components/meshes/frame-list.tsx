"use client";

import { TImage } from "../types";
import FrameItem from "./frame-item";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCamera } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { GOLDENRATIO } from "@/app/utils/three";
import { easing } from "maath";

export default function FrameList({ images }: { images: TImage[] }) {
  const frameRef = useRef<THREE.Group>(null);
  const clickRef = useRef<any>(null);
  const [select, setSelect] = useState("/");
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useEffect(() => {
    if (frameRef.current) {
      clickRef.current = frameRef.current.getObjectByName(select);

      if (clickRef.current) {
        const parent = clickRef.current.parent;
        parent.updateWorldMatrix(true, true);
        parent.localToWorld(targetPosition.set(0, GOLDENRATIO / 2, 2.2));
        parent.getWorldQuaternion(targetQuaternion);
      } else {
        targetPosition.set(0, 0, 4);
        targetQuaternion.identity();
      }
    }
  }, [select, targetPosition, targetQuaternion]);

  // useFrame((state, delta) => {
  //   easing.damp3(state.camera.position, targetPosition, 0.4, delta,undefined,);
  //   easing.dampQ(state.camera.quaternion, targetQuaternion, 0.4, delta);
  // });

  return (
    <group
      ref={frameRef}
      onClick={(e) => {
        e.stopPropagation();
        setSelect(e.object.name);
      }}
      onPointerMissed={() => setSelect("/")}
    >
      {images.map((data, index) => (
        <FrameItem key={index} data={data} />
      ))}
    </group>
  );
}

import * as THREE from "three";

export type TImage = {
  id: string;
  position: number[];
  image: string;
};

export type TInitialSceneCard = {
  id: string;
  src: string;
  targetSceneName: string;
  title: string;
  bg: THREE.ColorRepresentation | undefined;
  text: string;
  scale?: number;
  gltfPosition: THREE.Vector3;
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

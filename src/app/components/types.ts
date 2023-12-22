import * as THREE from "three";

export type TImage = {
  id: string;
  position: number[];
  image: string;
};

export type TInitialSceneCard = {
  name: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

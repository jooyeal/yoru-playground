"use client";
import { Gltf } from "@react-three/drei";
import * as THREE from "three";
import Frame from "./frame";
import { TInitialSceneCard } from "../types";

export default function Init({
  handleClickFrame,
  currentArgs,
  initialSceneCardList,
  handleDoubleClickFrame,
}: {
  handleClickFrame: (args: TInitialSceneCard) => void;
  currentArgs: TInitialSceneCard | null;
  initialSceneCardList: TInitialSceneCard[];
  handleDoubleClickFrame: (args: TInitialSceneCard) => void;
}) {
  return initialSceneCardList.map((sceneCard, index) => {
    return (
      <Frame
        key={index}
        {...sceneCard}
        handleClickFrame={handleClickFrame}
        handleDoubleClickFrame={handleDoubleClickFrame}
        currentArgs={currentArgs}
      />
    );
  });
}

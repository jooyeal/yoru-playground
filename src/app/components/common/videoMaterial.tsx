import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  src: string;
};

export default function VideoMaterial({ src }: Props) {
  const texture = useVideoTexture(src);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.offset.x = 1;

  return (
    <meshBasicMaterial
      side={THREE.DoubleSide}
      map={texture}
      toneMapped={false}
      transparent
      opacity={0.9}
    />
  );
}

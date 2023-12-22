"use client";
export default function Wall() {
  return (
    <mesh receiveShadow position={[0, 2, 0]} scale={[8, 4, 4]}>
      <planeGeometry />
      <meshStandardMaterial color="gray" metalness={0.1} roughness={0.1} />
    </mesh>
  );
}

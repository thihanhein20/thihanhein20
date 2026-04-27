import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

/* =========================
   Model
========================= */
const Model: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return <primitive object={scene} scale={4} position={[3, -12, -4]} />;
};

/* =========================
   Lights
========================= */

const KeyLight = () => {
  const ref = useRef<THREE.DirectionalLight>(null);

  return (
    <directionalLight
      ref={ref}
      position={[6, 12, 6]}
      intensity={0.4}
      castShadow
      shadow-mapSize-width={4048}
      shadow-mapSize-height={4048}
      shadow-camera-near={1}
      shadow-camera-far={40}
      shadow-camera-left={-15}
      shadow-camera-right={15}
      shadow-camera-top={15}
      shadow-camera-bottom={-15}
      shadow-bias={-0.0002}
    />
  );
};

const FillLight = () => {
  const ref = useRef<THREE.DirectionalLight>(null);

  return (
    <directionalLight
      ref={ref}
      position={[-6, 8, 6]}
      intensity={0.5}
      castShadow={false}
    />
  );
};

const RimLight = () => {
  const ref = useRef<THREE.DirectionalLight>(null);

  return (
    <directionalLight
      ref={ref}
      position={[0, 6, -8]}
      intensity={0.4}
      castShadow={false}
    />
  );
};

const AccentPointLight = () => {
  const ref = useRef<THREE.PointLight>(null);

  return (
    <pointLight
      ref={ref}
      position={[0, 5, 5]}
      intensity={20}
      distance={30}
      decay={2}
      castShadow={false}
    />
  );
};

/* =========================
   Viewer
========================= */
const ModelViewer: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  return (
    <Canvas
      shadows="soft"
      style={{  background: "linear-gradient(to right, #1e3a5f, #4a90c4, #8ec5ff)", }}
      camera={{ position: [2, 2, 6], fov: 45 }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      {/* Base light */}
      <ambientLight intensity={0} />

      {/* Lighting setup */}
      <KeyLight />
      <FillLight />
      <RimLight />
      <AccentPointLight />

      {/* Environment — low intensity so it adds subtle bounce without washing out colors */}
      <Environment preset="apartment" environmentIntensity={0.3} />

      {/* Model */}
      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 1.8}
        target={[0, 1, 0]}
      />
    </Canvas>
  );
};

export default ModelViewer;

useGLTF.preload("/model.glb");
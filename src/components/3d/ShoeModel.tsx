import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { Colorway } from '../../types';

interface ShoeModelProps {
  colorway: Colorway;
  scrollProgress?: number;
  autoRotate?: boolean;
}

export function ShoeModel({ colorway, scrollProgress = 0, autoRotate = false }: ShoeModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/models/shoe.glb');

  // Clone scene so materials can be modified dynamically
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Color change spin animation trigger
  const spinOffset = useRef(0);
  const [prevColorId, setPrevColorId] = useState(colorway.id);

  if (colorway.id !== prevColorId) {
    setPrevColorId(colorway.id);
    spinOffset.current += Math.PI * 2; // Smooth 360 spin flourish on color switch
  }

  // Center and normalize geometry so it fills the viewport with high definition
  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center); // Align center perfectly at origin
  }, [scene]);

  // Apply rich luxury PBR materials based on colorway selection
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material).clone() as THREE.MeshStandardMaterial;

          if (colorway.id === 'onyx-volt') {
            // Stealth Carbon: Pure dark obsidian with volt green rim emissive
            mat.color = new THREE.Color('#141418');
            mat.roughness = 0.35;
            mat.metalness = 0.55;
            mat.emissive = new THREE.Color('#bef264');
            mat.emissiveIntensity = 0.12;
            if (mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
            }
          } else if (colorway.id === 'chalk-titanium') {
            // Alabaster Chalk: Pristine warm off-white luxury finish
            mat.color = new THREE.Color('#f0ede6');
            mat.roughness = 0.75;
            mat.metalness = 0.15;
            mat.emissive = new THREE.Color('#c9b07a');
            mat.emissiveIntensity = 0.05;
          } else if (colorway.id === 'terra-dune') {
            // Basalt / Terra Dune: Rich organic earth bronze and charcoal
            mat.color = new THREE.Color('#8c6b4e');
            mat.roughness = 0.55;
            mat.metalness = 0.35;
            mat.emissive = new THREE.Color('#d4a373');
            mat.emissiveIntensity = 0.08;
          } else if (colorway.id === 'cyber-cyan') {
            // Eclipse / Deep Cyan: Dark navy technical weave with electric cyan glow
            mat.color = new THREE.Color('#0d1f2d');
            mat.roughness = 0.3;
            mat.metalness = 0.6;
            mat.emissive = new THREE.Color('#38bdf8');
            mat.emissiveIntensity = 0.2;
          }

          mesh.material = mat;
        }
      }
    });
  }, [scene, colorway]);

  // Smooth scroll interpolation & spring physics
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Keyframe targets based on scrollProgress (0 to 1)
    let targetRotX = 0.12;
    let targetRotY = 0.35; // 3/4 beauty hero angle
    let targetRotZ = -0.04;
    let targetPosX = 0;
    let targetPosY = -0.05;
    let targetScale = 1.95; // Large, impressive studio presence

    if (autoRotate) {
      targetRotY = time * 0.4;
    } else if (scrollProgress <= 0.3) {
      // Phase 1: Hero Floating 3/4 Angle
      const t = scrollProgress / 0.3;
      targetRotX = THREE.MathUtils.lerp(0.12, 0.05, t);
      targetRotY = THREE.MathUtils.lerp(0.35, 0.1, t);
      targetRotZ = -0.04;
      targetPosX = THREE.MathUtils.lerp(0, 0.15, t);
      targetPosY = THREE.MathUtils.lerp(-0.05, 0, t);
      targetScale = 1.95;
    } else if (scrollProgress <= 0.6) {
      // Phase 2: Lateral Profile (Carbon Shank focus)
      const t = (scrollProgress - 0.3) / 0.3;
      targetRotX = THREE.MathUtils.lerp(0.05, 0.02, t);
      targetRotY = THREE.MathUtils.lerp(0.1, 0.0, t); // True lateral profile facing camera
      targetRotZ = THREE.MathUtils.lerp(-0.04, 0.01, t);
      targetPosX = THREE.MathUtils.lerp(0.15, 0.5, t); // Comfortably on the right, text on left
      targetPosY = THREE.MathUtils.lerp(0, 0.02, t);
      targetScale = THREE.MathUtils.lerp(1.95, 2.1, t);
    } else if (scrollProgress <= 0.85) {
      // Phase 3: Outsole Pitch Up (Traction Lugs focus)
      const t = (scrollProgress - 0.6) / 0.25;
      targetRotX = THREE.MathUtils.lerp(0.02, Math.PI * 0.42, t); // Sole tilted up toward camera
      targetRotY = THREE.MathUtils.lerp(0.0, 0.15, t);
      targetRotZ = THREE.MathUtils.lerp(0.01, -0.22, t);
      targetPosX = THREE.MathUtils.lerp(0.5, -0.45, t); // Comfortably on the left, text on right
      targetPosY = THREE.MathUtils.lerp(0.02, -0.05, t);
      targetScale = THREE.MathUtils.lerp(2.1, 1.95, t);
    } else {
      // Phase 4: Top-Down Aerodynamic Entry (Knit Upper focus)
      const t = (scrollProgress - 0.85) / 0.15;
      targetRotX = THREE.MathUtils.lerp(Math.PI * 0.42, -Math.PI * 0.32, t); // Nose down toward camera
      targetRotY = THREE.MathUtils.lerp(0.15, 0.05, t);
      targetRotZ = THREE.MathUtils.lerp(-0.22, 0.0, t);
      targetPosX = THREE.MathUtils.lerp(-0.45, 0.45, t); // On the right, text on left
      targetPosY = THREE.MathUtils.lerp(-0.05, 0.05, t);
      targetScale = THREE.MathUtils.lerp(1.95, 1.9, t);
    }

    // Gentle organic breathing float
    const breath = Math.sin(time * 1.5) * 0.03;

    // Decay color switch spin offset smoothly
    spinOffset.current = THREE.MathUtils.damp(spinOffset.current, 0, 5, delta);

    // Smooth spring dampening (no frame jitter)
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY + spinOffset.current, 4.5, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 4.5, delta);

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetPosX, 4.5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetPosY + breath, 4.5, delta);

    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.5, delta)
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/shoe.glb');

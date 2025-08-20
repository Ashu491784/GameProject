import { useEffect, useRef } from "react";
import * as THREE from "three";

const GameStarts = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    scene.add(light);

    // Tree trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    scene.add(trunk);

    // Tree leaves
    const leavesGeometry = new THREE.SphereGeometry(2, 32, 32);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = 3;
    scene.add(leaves);

   
    // animal Body
    const bodyGeometry = new THREE.SphereGeometry(1.0, 32, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(4, 1.5, 0); // gahata ekka hitanna passe

    // White belly
    const bellyGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const bellyMaterial = new THREE.MeshStandardMaterial({ color: 0xfffff });
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
    belly.position.set(4, 1.5, 0.2);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(4, 2.5, 0);

    // Beak
    const beakGeometry = new THREE.ConeGeometry(0.15, 0.4, 32);
    const beakMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(4, 2.5, 0.5);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(3.85, 2.6, 0.3);
    rightEye.position.set(4.15, 2.6, 0.3);

    const pupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(3.85, 2.6, 0.35);
    rightPupil.position.set(4.15, 2.6, 0.35);

    // Add penguin parts
    scene.add(
      body,
      belly,
      head,
      beak,
      leftEye,
      rightEye,
      leftPupil,
      rightPupil
    );

    // Camera
    camera.position.z = 12;
    camera.position.y = 4;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      trunk.rotation.y += 0.01;
      leaves.rotation.y += 0.01;
      head.rotation.y += 0.02; // penguin head rotate
      body.rotation.y += 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect =
          mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-4">Game Start</h1>
      <p className="text-lg text-white">Welcome to the game!</p>
      <div
        ref={mountRef}
        className="w-full h-[500px] border border-white mt-4"
      />
    </div>
  );
};

export default GameStarts;

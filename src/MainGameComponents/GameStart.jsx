import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const GameStarts = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
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

    // 🌳 Load FBX model
    const loader = new FBXLoader();
    loader.load(
      "/models/Tree_test.fbx",
      (fbx) => {
        fbx.scale.set(0.01, 0.01, 0.01); // FBX files are usually HUGE
        fbx.position.set(0, 0, 0);
        scene.add(fbx);
      },
      undefined,
      (error) => {
        console.error("FBX loading error:", error);
      }
    );

    // Camera
    camera.position.z = 12;
    camera.position.y = 4;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
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

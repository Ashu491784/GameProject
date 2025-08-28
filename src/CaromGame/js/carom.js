import React, { useState, useEffect, useRef } from "react";
import * as THREE from 'three';

const CGameScreen = () => {
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [coinsLeft, setCoinsLeft] = useState(9);
  const [gameState, setGameState] = useState("Aiming");
  const [turn, setTurn] = useState("P1");
  const [power, setPower] = useState(0);

  const canvasRef = useRef(null);
  const game = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !game.current) {
      game.current = initCaromGame(canvasRef.current, {
        onUpdateScore: (p1, p2) => {
          setP1Score(p1);
          setP2Score(p2);
        },
        onUpdateCoins: (coins) => setCoinsLeft(coins),
        onUpdateState: (state) => setGameState(state),
        onUpdateTurn: (player) => setTurn(player),
        onUpdatePower: (p) => setPower(p * 100),
      });
    }

    return () => {
      // Cleanup when component unmounts
      if (game.current && game.current.cleanup) {
        game.current.cleanup();
      }
    };
  }, []);

  const initCaromGame = (container, callbacks) => {
    // Game constants
    const boardSize = 50;
    const half = boardSize / 2;
    const wallThickness = 3;
    const pocketR = 4.2;
    const coinR = 1.6;
    const queenR = 1.7;
    const strikerR = 2.1;
    const coinMass = 1;
    const queenMass = 1.05;
    const strikerMass = 2.2;
    const friction = 0.995;
    const minSpeed = 0.02;
    const dt = 1 / 60;
    const tableZ = 0;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      canvas: container
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b0f14');

    // Camera
    const viewH = 68;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.OrthographicCamera(
      -viewH * aspect / 2, 
      viewH * aspect / 2, 
      viewH / 2, 
      -viewH / 2, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.15);
    dirLight.position.set(50, 60, 80);
    scene.add(dirLight);

    // Create the carom board
    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    // Wooden base
    const woodGeometry = new THREE.PlaneGeometry(boardSize + 10, boardSize + 10);
    const woodMaterial = new THREE.MeshLambertMaterial({ color: 0xb88646 });
    const wood = new THREE.Mesh(woodGeometry, woodMaterial);
    wood.position.z = tableZ - 2;
    boardGroup.add(wood);

    // Playing surface
    const playGeometry = new THREE.PlaneGeometry(boardSize, boardSize);
    const playMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xf4e4c1,
      side: THREE.DoubleSide
    });
    const playSurface = new THREE.Mesh(playGeometry, playMaterial);
    playSurface.position.z = tableZ - 1;
    boardGroup.add(playSurface);

    // Board borders
    const borderMaterial = new THREE.MeshLambertMaterial({ color: 0x9a5b2b });
    const borderWidth = wallThickness;
    
    // Horizontal borders
    const hBorderGeometry = new THREE.BoxGeometry(boardSize + borderWidth, borderWidth, 2);
    const topBorder = new THREE.Mesh(hBorderGeometry, borderMaterial);
    topBorder.position.set(0, half, tableZ);
    
    const bottomBorder = new THREE.Mesh(hBorderGeometry, borderMaterial);
    bottomBorder.position.set(0, -half, tableZ);
    
    // Vertical borders
    const vBorderGeometry = new THREE.BoxGeometry(borderWidth, boardSize + borderWidth, 2);
    const leftBorder = new THREE.Mesh(vBorderGeometry, borderMaterial);
    leftBorder.position.set(-half, 0, tableZ);
    
    const rightBorder = new THREE.Mesh(vBorderGeometry, borderMaterial);
    rightBorder.position.set(half, 0, tableZ);
    
    boardGroup.add(topBorder, bottomBorder, leftBorder, rightBorder);

    // Create pockets (4 corners)
    const pockets = [
      new THREE.Vector2(-half + 1.2, half - 1.2),
      new THREE.Vector2(half - 1.2, half - 1.2),
      new THREE.Vector2(-half + 1.2, -half + 1.2),
      new THREE.Vector2(half - 1.2, -half + 1.2),
    ];
    
    const pocketMeshes = [];
    const pocketGeometry = new THREE.CircleGeometry(pocketR, 32);
    const pocketMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
    
    pockets.forEach(pocketPos => {
      const pocket = new THREE.Mesh(pocketGeometry, pocketMaterial);
      pocket.position.set(pocketPos.x, pocketPos.y, tableZ + 0.1);
      boardGroup.add(pocket);
      pocketMeshes.push(pocket);
    });

    // Create center circle
    const centerCircleGeometry = new THREE.RingGeometry(5, 5.5, 32);
    const centerCircleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x9a5b2b, 
      side: THREE.DoubleSide 
    });
    const centerCircle = new THREE.Mesh(centerCircleGeometry, centerCircleMaterial);
    centerCircle.position.set(0, 0, tableZ + 0.1);
    boardGroup.add(centerCircle);

    // Create foul lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9a5b2b });
    
    // Top foul line
    const topLinePoints = [
      new THREE.Vector3(-half + 10, half - 10, tableZ + 0.1),
      new THREE.Vector3(half - 10, half - 10, tableZ + 0.1)
    ];
    const topLineGeometry = new THREE.BufferGeometry().setFromPoints(topLinePoints);
    const topLine = new THREE.Line(topLineGeometry, lineMaterial);
    boardGroup.add(topLine);
    
    // Bottom foul line
    const bottomLinePoints = [
      new THREE.Vector3(-half + 10, -half + 10, tableZ + 0.1),
      new THREE.Vector3(half - 10, -half + 10, tableZ + 0.1)
    ];
    const bottomLineGeometry = new THREE.BufferGeometry().setFromPoints(bottomLinePoints);
    const bottomLine = new THREE.Line(bottomLineGeometry, lineMaterial);
    boardGroup.add(bottomLine);

    // Initial render
    renderer.render(scene, camera);

    // Handle window resize
    const handleResize = () => {
      const newAspect = container.clientWidth / container.clientHeight;
      camera.left = -viewH * newAspect / 2;
      camera.right = viewH * newAspect / 2;
      camera.top = viewH / 2;
      camera.bottom = -viewH / 2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    // Return cleanup function
    return {
      cleanup: () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      }
    };
  };

  return (
    <div className="relative w-full h-screen bg-[#0b0f14] overflow-hidden">
      {/* Game UI */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-gray-900 bg-opacity-80 text-white p-3 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Carom Board Game</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-700 p-2 rounded">
              <div className="text-xs">PLAYER 1</div>
              <div className="text-xl font-bold">{p1Score}</div>
            </div>
            <div className="bg-red-700 p-2 rounded">
              <div className="text-xs">PLAYER 2</div>
              <div className="text-xl font-bold">{p2Score}</div>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <div>Coins Left: {coinsLeft}</div>
            <div>Turn: <span className="font-bold">{turn}</span></div>
            <div>Status: <span className="font-bold">{gameState}</span></div>
          </div>
        </div>

        {/* Power indicator */}
        <div className="bg-gray-900 bg-opacity-80 text-white p-3 rounded-lg shadow-lg">
          <div className="text-sm mb-1">POWER</div>
          <div className="w-40 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-100"
              style={{ width: `${power}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 bg-gray-900 bg-opacity-80 text-white p-3 rounded-lg shadow-lg text-sm">
        <div className="font-bold mb-1">CONTROLS</div>
        <div>Click & drag to aim and shoot</div>
        <div>A/D or 1-4 keys: Change position</div>
        <div>R: Reset game | Space: Reset shot | P: Pause</div>
      </div>

      {/* Game canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
};

export default CGameScreen;
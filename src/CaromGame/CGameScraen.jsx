import { useState, useEffect, useRef } from "react";
import * as THREE from 'three';

const CGameScreen = ({ gameCode, playerName, onLeaveGame }) => {
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [coinsLeft, setCoinsLeft] = useState(30);
  const [state, setState] = useState("Aiming");
  const [turn, setTurn] = useState("P1");
  const [power, setPower] = useState(0);
  const [opponentName, setOpponentName] = useState("Waiting...");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const canvasRef = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !gameInstance.current) {
      // Clear any existing content in the container
      while (canvasRef.current.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
      
      // Create a new canvas element
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvasRef.current.appendChild(canvas);
      
      gameInstance.current = initCaromGame(canvas, {
        onUpdateScore: (p1, p2) => {
          setP1Score(p1);
          setP2Score(p2);
        },
        onUpdateCoins: (coins) => setCoinsLeft(coins),
        onUpdateState: (s) => setState(s),
        onUpdateTurn: (t) => setTurn(t),
        onUpdatePower: (p) => setPower(p * 100),
      });
    }

    return () => {
      if (gameInstance.current) {
        const { cleanup } = gameInstance.current;
        if (cleanup) cleanup();
        
        if (canvasRef.current) {
          while (canvasRef.current.firstChild) {
            canvasRef.current.removeChild(canvasRef.current.firstChild);
          }
        }
      }
    };
  }, []);

  const initCaromGame = (canvas, callbacks) => {
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

    // Renderer/Scene/Camera
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      canvas,
      alpha: true
    });
    
    const container = canvas.parentElement;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b0f14');

    const aspect = container.clientWidth / container.clientHeight;
    const viewSize = 68;
    const camera = new THREE.OrthographicCamera(
      -viewSize * aspect / 2,
      viewSize * aspect / 2,
      viewSize / 2,
      -viewSize / 2,
      0.1,
      1000
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 0.15);
    dir.position.set(50, 60, 80);
    scene.add(dir);

    // Board 
    const board = new THREE.Group(); 
    scene.add(board);

    const wood = new THREE.Mesh(
      new THREE.PlaneGeometry(boardSize + 10, boardSize + 10),
      new THREE.MeshLambertMaterial({ color: 0xb88646 })
    );
    wood.position.z = tableZ - 2;
    board.add(wood);

    const play = new THREE.Mesh(
      new THREE.PlaneGeometry(boardSize, boardSize),
      new THREE.MeshLambertMaterial({ color: 0xf4e4c1 })
    );
    play.position.z = tableZ - 1;
    board.add(play);

    // Borders
    const borderMat = new THREE.MeshLambertMaterial({ color: 0x9a5b2b });
    const borderW = wallThickness;
    const edgeGeomH = new THREE.BoxGeometry(boardSize + borderW, borderW, 2);
    const edgeGeomV = new THREE.BoxGeometry(borderW, boardSize + borderW, 2);
    const topEdge = new THREE.Mesh(edgeGeomH, borderMat);   topEdge.position.set(0,  half, tableZ);
    const botEdge = new THREE.Mesh(edgeGeomH, borderMat);   botEdge.position.set(0, -half, tableZ);
    const lefEdge = new THREE.Mesh(edgeGeomV, borderMat);   lefEdge.position.set(-half, 0, tableZ);
    const rigEdge = new THREE.Mesh(edgeGeomV, borderMat);   rigEdge.position.set( half, 0, tableZ);
    board.add(topEdge, botEdge, lefEdge, rigEdge);

    // Pockets 4
    const pockets = [
      new THREE.Vector2(-half + 1.2,  half - 1.2),
      new THREE.Vector2( half - 1.2,  half - 1.2),
      new THREE.Vector2(-half + 1.2, -half + 1.2),
      new THREE.Vector2( half - 1.2, -half + 1.2),
    ];
    const pocketMeshes = [];
    for (const p of pockets) {
      const m = new THREE.Mesh(
        new THREE.CircleGeometry(pocketR, 48),
        new THREE.MeshBasicMaterial({ color: 0x111111 })
      );
      m.position.set(p.x, p.y, tableZ + .1);
      board.add(m);
      pocketMeshes.push(m);
    }

    // Helpers
    function clamp(v, lo, hi){ return Math.max(lo, Math.min(hi, v)); }
    function resolveCircleCollision(a, b) {
      const dx = b.pos.x - a.pos.x;
      const dy = b.pos.y - a.pos.y;
      const dist2 = dx*dx + dy*dy;
      const r = a.r + b.r;
      if (dist2 >= r*r || dist2 === 0) return;

      const dist = Math.sqrt(dist2);
      const nx = dx / dist;
      const ny = dy / dist;

  
      const overlap = r - dist;
      const totalMass = a.m + b.m;
      a.pos.x -= nx * (overlap * (b.m / totalMass));
      a.pos.y -= ny * (overlap * (b.m / totalMass));
      b.pos.x += nx * (overlap * (a.m / totalMass));
      b.pos.y += ny * (overlap * (a.m / totalMass));

   
      const rvx = b.vel.x - a.vel.x;
      const rvy = b.vel.y - a.vel.y;
      const velAlongNorm = rvx * nx + rvy * ny;
      if (velAlongNorm > 0) return;

 
      const e = 0.94;
      const j = -(1 + e) * velAlongNorm / (1/a.m + 1/b.m);
      const impX = j * nx, impY = j * ny;
      a.vel.x -= impX / a.m; a.vel.y -= impY / a.m;
      b.vel.x += impX / b.m; b.vel.y += impY / b.m;
    }

    // Bodies
    const bodies = [];
    function makeDisc(radius, color, mass) {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, 1, 48),
        new THREE.MeshPhongMaterial({ color, shininess: 30 })
      );
      mesh.rotation.x = Math.PI / 2;
      mesh.position.z = tableZ + 0.5;
      scene.add(mesh);
      const body = {
        mesh,
        pos: new THREE.Vector2(0,0),
        vel: new THREE.Vector2(0,0),
        r: radius,
        m: mass,
        alive: true,
        isStriker: false,
        isQueen: false,
      };
      bodies.push(body);
      return body;
    }

    // Gameplay 
    let striker, scoreP1 = 0, scoreP2 = 0;
    let currentPlayer = 1;
    let selectedSpotIdx = 0;
    const spotX = [-20, -7, 7, 20];
    const spotMarkers = []; 
    let pocketedThisShot = false; 

    function createSpotMarkers(){
      for (const m of spotMarkers) scene.remove(m);
      spotMarkers.length = 0;
      const y = (currentPlayer === 1) ? (-half + 8) : (half - 8);
      for (let i=0;i<4;i++){
        const circ = new THREE.Mesh(
          new THREE.RingGeometry(1.9, 2.3, 32),
          new THREE.MeshBasicMaterial({ color: 0x1f2937, transparent:true, opacity:0.85 })
        );
        circ.position.set(spotX[i], y, tableZ + 1.8);
        scene.add(circ);
        spotMarkers.push(circ);
      }
      highlightSpot();
    }

    function highlightSpot(){
   
      spotMarkers.forEach((m, i) => {
        const mat = m.material;
        mat.opacity = (i === selectedSpotIdx) ? 1.0 : 0.45;
        mat.needsUpdate = true;
      });
    }

    function placeStrikerAtSpot(){
      const y = (currentPlayer === 1) ? (-half + 8) : (half - 8);
      const x = spotX[selectedSpotIdx];
      striker.vel.set(0,0);
      striker.pos.set(x, y);
      striker.mesh.position.set(x, y, striker.mesh.position.z);
    }

  
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    function getNdc(e){
      return new THREE.Vector2(
        (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -(e.clientY / renderer.domElement.clientHeight) * 2 + 1
      );
    }

    
    function rack() {
      // clear existing (except spot markers which we recreate)
      for (const b of bodies) scene.remove(b.mesh);
      bodies.length = 0;

      scoreP1 = 0; scoreP2 = 0;
      currentPlayer = 1;
      selectedSpotIdx = 0;

      
      callbacks.onUpdateScore(scoreP1, scoreP2);
      callbacks.onUpdateTurn('P1');

      const queen = makeDisc(queenR, 0xdb1f48, queenMass);
      queen.isQueen = true;

      const ringColors = [0x222222, 0xebe7e1];
      const ringR = coinR * 2.05;
      const ringPositions = [];
      for (let i=0;i<6;i++){
        const a = (i/6)*Math.PI*2;
        ringPositions.push(new THREE.Vector2(Math.cos(a)*ringR, Math.sin(a)*ringR));
      }
      for (let pass=0; pass<2; pass++){
        for (let i=0;i<6;i++){
          const c = makeDisc(coinR, ringColors[(i+pass)%2], coinMass);
          c.pos.copy(ringPositions[i].clone().multiplyScalar(1 + pass*1.05));
        }
      }

   
      for (const b of bodies) b.mesh.position.set(b.pos.x, b.pos.y, b.mesh.position.z);

      // striker
      striker = makeDisc(strikerR, 0x2b6cff, strikerMass);
      striker.isStriker = true;

      pocketedThisShot = false;
      state = 'Aiming';
      callbacks.onUpdateState(state);
      createSpotMarkers();
      placeStrikerAtSpot();
      updateHud();
    }

    function coinsLeft(){
      return bodies.filter(b => !b.isStriker && b.alive).length;
    }

    // Pockets
    function checkPockets(body){
      for (const p of pockets){
        const dx = body.pos.x - p.x;
        const dy = body.pos.y - p.y;
        if (dx*dx + dy*dy <= (pocketR-0.1)*(pocketR-0.1)) {
          // pocketed
          body.alive = false;
          body.mesh.visible = false;
          if (body.isStriker) {
            
            if (currentPlayer === 1) scoreP1 = Math.max(0, scoreP1 - 1);
            else scoreP2 = Math.max(0, scoreP2 - 1);
            pocketedThisShot = false; 
          
          } else if (body.isQueen) {
            if (currentPlayer === 1) scoreP1 += 3; else scoreP2 += 3;
            pocketedThisShot = true;
          } else {
            if (currentPlayer === 1) scoreP1 += 1; else scoreP2 += 1;
            pocketedThisShot = true;
          }
          callbacks.onUpdateScore(scoreP1, scoreP2);
          callbacks.onUpdateCoins(coinsLeft());
          updateHud();
          return;
        }
      }
    }

    // Physics step
    function stepPhysics(){
      // integrate + friction
      for (const b of bodies){
        if (!b.alive) continue;
        b.pos.x += b.vel.x * dt * 60;
        b.pos.y += b.vel.y * dt * 60;
        b.vel.multiplyScalar(friction);
        if (Math.hypot(b.vel.x,b.vel.y) < minSpeed) {
          b.vel.set(0,0);
        }
      }

   
      const limit = half - wallThickness*0.75;
      for (const b of bodies){
        if (!b.alive) continue;
        if (b.pos.x - b.r < -limit){ b.pos.x = -limit + b.r; b.vel.x *= -0.9; }
        if (b.pos.x + b.r >  limit){ b.pos.x =  limit - b.r; b.vel.x *= -0.9; }
        if (b.pos.y - b.r < -limit){ b.pos.y = -limit + b.r; b.vel.y *= -0.9; }
        if (b.pos.y + b.r >  limit){ b.pos.y =  limit - b.r; b.vel.y *= -0.9; }
      }

 
      for (let i=0;i<bodies.length;i++){
        for (let j=i+1;j<bodies.length;j++){
          const a = bodies[i], b = bodies[j];
          if (!a.alive || !b.alive) continue;
          resolveCircleCollision(a,b);
        }
      }

    
      for (const b of bodies){
        if (!b.alive) continue;
        checkPockets(b);
      }

    
      for (const b of bodies){
        b.mesh.position.x = b.pos.x;
        b.mesh.position.y = b.pos.y;
      }
    }

   //shot
    let isDragging = false;
    const aimStart = new THREE.Vector2();
    const aimEnd = new THREE.Vector2();
    const aimLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
      new THREE.LineBasicMaterial({ linewidth: 2, color: 0xffffff })
    );
    scene.add(aimLine); aimLine.visible = false;

    let state = 'Aiming';

    function screenToBoard(x, y){
      const ndc = new THREE.Vector2(
        (x / renderer.domElement.clientWidth) * 2 - 1,
        -(y / renderer.domElement.clientHeight) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const t = -raycaster.ray.origin.z / raycaster.ray.direction.z;
      const pos = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(t));
      return new THREE.Vector2(pos.x, pos.y);
    }

    function handleMouseDown(e) {
      if (state !== 'Aiming') return;

  
      const ndc = getNdc(e);
      raycaster.setFromCamera(ndc, camera);
      const intersects = raycaster.intersectObjects(spotMarkers, false);
      if (intersects.length){
        const idx = spotMarkers.indexOf(intersects[0].object);
        if (idx >= 0){
          selectedSpotIdx = idx;
          highlightSpot();
          placeStrikerAtSpot();
          updateHud();
          return; 
        }
      }

      isDragging = true;
      aimStart.copy(striker.pos);
      aimEnd.copy(aimStart);
      aimLine.visible = true;
      updateAimLine();
    }

    function handleMouseMove(e) {
      if (!isDragging) return;
      aimEnd.copy(screenToBoard(e.clientX, e.clientY));
      updateAimLine();
      updatePowerUi();
    }

    function updateAimLine(){
      const p1 = new THREE.Vector3(aimStart.x, aimStart.y, tableZ + 2);
      const p2 = new THREE.Vector3(aimEnd.x,   aimEnd.y,   tableZ + 2);
      aimLine.geometry.setFromPoints([p1, p2]);
    }

    function powerVec(){
      const v = new THREE.Vector2(aimStart.x - aimEnd.x, aimStart.y - aimEnd.y);
      const max = 30;
      if (v.length() > max) v.setLength(max);
      return v;
    }

    function updatePowerUi(){
      const p = clamp(powerVec().length() / 30, 0, 1);
      callbacks.onUpdatePower(p);
    }

    function handleMouseUp() {
      if (!isDragging) return;
      isDragging = false; aimLine.visible = false; updatePowerUi();
      const v = powerVec();
      if (v.length() < 0.5) return;
      striker.vel.add(v.multiplyScalar(0.18));
      pocketedThisShot = false; 
      state = 'Moving';
      callbacks.onUpdateState(state);
      updateHud();
    }

    function handleKeyDown(e) {
      if (e.key.toLowerCase() === 'r') {
        rack();
      } else if (e.code === 'Space') {
        
        for (const b of bodies){ b.vel.set(0,0); }
        state = 'Aiming';
        callbacks.onUpdateState(state);
        placeStrikerAtSpot();
        updateHud();
      } else if (e.key.toLowerCase() === 'p') {
        state = (state === 'Paused') ? 'Aiming' : 'Paused';
        callbacks.onUpdateState(state);
        updateHud();
      } else if (state === 'Aiming') {
        if (e.key === 'a' || e.key === 'A'){ selectedSpotIdx = (selectedSpotIdx + 3) % 4; highlightSpot(); placeStrikerAtSpot(); }
        if (e.key === 'd' || e.key === 'D'){ selectedSpotIdx = (selectedSpotIdx + 1) % 4; highlightSpot(); placeStrikerAtSpot(); }
        if (e.key >= '1' && e.key <= '4'){ selectedSpotIdx = (e.key.charCodeAt(0) - '1'.charCodeAt(0)) % 4; highlightSpot(); placeStrikerAtSpot(); }
      }
    }

    function updateHud() {
      callbacks.onUpdateScore(scoreP1, scoreP2);
      callbacks.onUpdateCoins(coinsLeft());
      callbacks.onUpdateState(state);
      callbacks.onUpdateTurn(currentPlayer === 1 ? 'P1' : 'P2');
    }

    function afterShotSettle(){
    
      if (!pocketedThisShot) {
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        callbacks.onUpdateTurn(currentPlayer === 1 ? 'P1' : 'P2');
      }
     
      createSpotMarkers();
      selectedSpotIdx = clamp(selectedSpotIdx, 0, 3);
      placeStrikerAtSpot();
      state = 'Aiming';
      callbacks.onUpdateState(state);
      updateHud();
    }

    // Main 
    rack();
    let acc = 0, last = performance.now();
    let animationId = null;
    
    function tick(now){
      const elapsed = (now - last) / 1000; last = now; acc += elapsed;
      while (acc >= dt){
        if (state === 'Moving') {
          stepPhysics();
          const moving = bodies.some(b => b.alive && (Math.abs(b.vel.x)>minSpeed || Math.abs(b.vel.y)>minSpeed));
          if (!moving) {
            afterShotSettle();
          }
        }
        acc -= dt;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    }
    animationId = requestAnimationFrame(tick);

    function onResize(){
      const container = canvas.parentElement;
      renderer.setSize(container.clientWidth, container.clientHeight);
      const aspect = container.clientWidth / container.clientHeight;
      const viewSize = 68;
      camera.left   = -viewSize * aspect / 2;
      camera.right  =  viewSize * aspect / 2;
      camera.top    =  viewSize / 2;
      camera.bottom = -viewSize / 2;
      camera.updateProjectionMatrix();
    }


    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', onResize);
    
    onResize();

    return {
      renderer,
      scene,
      cleanup: () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mouseup', handleMouseUp);
        if (renderer.domElement) {
          renderer.domElement.removeEventListener('mousedown', handleMouseDown);
          renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        }
        cancelAnimationFrame(animationId);
      }
    };
  };

  const sendChatMessage = () => {
    if (messageInput.trim()) {
      setChatMessages([...chatMessages, { sender: playerName, text: messageInput }]);
      setMessageInput("");
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#0b0f14] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20 bg-[#111827cc] p-3 flex justify-between items-center">
        <div className="text-white font-sans">
          <div className="text-lg font-bold">Carrom Game</div>
          <div className="text-sm">Game Code: <span className="font-mono">{gameCode}</span></div>
        </div>
        <div className="flex space-x-4">
          <div className="text-white bg-blue-600 px-3 py-1 rounded-md">
            You: <b>{playerName}</b>
          </div>
          <div className="text-white bg-green-600 px-3 py-1 rounded-md">
            Opponent: <b>{opponentName}</b>
          </div>
          <button 
            onClick={onLeaveGame}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
          >
            Leave Game
          </button>
        </div>
      </div>

      <div className="absolute top-16 left-3 z-10 p-2 bg-white/90 rounded-xl shadow-lg">
        <div className="text-xs font-bold text-center mb-1 text-gray-700">POWER</div>
        <div className="h-1.5 w-40 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-75"
            style={{ width: `${power}%` }}
          />
        </div>
      </div>

      <div className="absolute top-16 right-3 z-10 text-white font-sans space-y-2">
        <div className="bg-[#111827cc] px-3 py-2 rounded-xl">
          {playerName} (P1): <b>{p1Score}</b>
        </div>
        <div className="bg-[#111827cc] px-3 py-2 rounded-xl">
          {opponentName} (P2): <b>{p2Score}</b>
        </div>
        <div className="bg-[#111827cc] px-3 py-2 rounded-xl">
          Coins left: <b>{coinsLeft}</b>
        </div>
        <div className="bg-[#111827cc] px-3 py-2 rounded-xl">
          State: <b>{state}</b>
        </div>
        <div className="bg-[#111827cc] px-3 py-2 rounded-xl">
          Turn: <b>{turn}</b>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-10 w-80 bg-[#111827cc] rounded-xl overflow-hidden flex flex-col">
        <div className="p-3 bg-[#1f2937] text-white font-bold">Chat</div>
        <div className="flex-1 p-3 overflow-y-auto max-h-40">
          {chatMessages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold text-blue-300">{msg.sender}:</span> 
              <span className="text-white ml-1">{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-gray-700 flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white rounded-l-md px-3 py-2 focus:outline-none"
          />
          <button 
            onClick={sendChatMessage}
            className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 z-10 text-white font-sans opacity-80 bg-[#111827cc] p-2 rounded-xl">
        <p>💡 Click and drag to aim and shoot</p>
        <p>💡 Use A/D or 1-4 keys to change position</p>
        <p>💡 R: Reset game | Space: Reset shot | P: Pause</p>
      </div>

      <div 
        ref={canvasRef} 
        className="absolute top-16 left-0 w-full h-[calc(100%-4rem)]"
      />
    </div>
  );
};

const Lobby = ({ onJoinGame, onCreateGame }) => {
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle_at_20%_10%,rgba(243,0,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,212,255,.25),transparent_35%)] text-white">
        <div className="text-center mt-10 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 drop-shadow-lg">
         Online Carom Game 
        </h2>
        <p className="mt-2 text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
         \You can play with friends and invite more registerd players.Enjoy your round and play hardly...!!!
        </p>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full shadow-2xl overflow-hidden">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Carrom Game</h1>
        <p className="text-white/80 text-center mb-8">Play carrom online with friends</p>
        
        <div className="mb-6">
          <label className="block text-white mb-2">Your Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-white mb-2">Game Code</label>
          <input
            type="text"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter game code"
          />
          <p className="text-white/60 text-sm mt-2">Ask your friend for the game code to join</p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => onCreateGame(playerName)}
            disabled={!playerName}
            className="bg-gradient-to-r from-purple-600 to-pink-500 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Create New Game
          </button>
          
          <button
            onClick={() => onJoinGame(playerName, gameCode)}
            disabled={!playerName || !gameCode}
            className="bg-gradient-to-r from-red-700 to-pink-400 py-2 rounded-lg font-medium hover:from-red-700 hover:to-pink-600 transition-all"
          >
            Join Game
          </button>
        </div>
        
       <div className="bg-black/20 rounded-xl p-5 mt-3">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Play
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span className="text-white/80">Create a game and share the code with friends</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span className="text-white/80">Join an existing game with a code</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span className="text-white/80">Take turns to pocket coins and the queen</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span className="text-white/80">First to reach 21 points wins!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MultiplayerCarromGame = () => {
  const [gameState, setGameState] = useState("lobby"); 
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");

  const handleCreateGame = (name) => {
    setPlayerName(name);
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    setGameCode(code);
    setGameState("playing");
  };

  const handleJoinGame = (name, code) => {
    setPlayerName(name);
    setGameCode(code);
    setGameState("playing");
  };

  const handleLeaveGame = () => {
    setGameState("lobby");
    setGameCode("");
  };

  if (gameState === "lobby") {
    return <Lobby onJoinGame={handleJoinGame} onCreateGame={handleCreateGame} />;
  }

  return (
    <CGameScreen 
      gameCode={gameCode} 
      playerName={playerName} 
      onLeaveGame={handleLeaveGame}
    />
  );
};

export default MultiplayerCarromGame;
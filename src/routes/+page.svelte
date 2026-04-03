<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let w = 800;
  let h = 600;

  type Bullet = {
    x: number;
    y: number;
    speed: number;
    radius: number;
    color: string;
  };

  type Enemy = {
    x: number;
    y: number;
    w: number;
    h: number;
    speed: number;
    maxHealth: number;
    health: number;
    color: string;
  };

  type Particle = {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    life: number;
    maxLife: number;
    color: string;
    radius: number;
  };

  let player = {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    speed: 0.25, // units per ms (scaled by delta time)
  };

  let bullets: Bullet[] = [];
  let enemies: Enemy[] = [];
  let particles: Particle[] = [];

  let score = 0;
  let bestScore = 0;

  let isGameOver = false;
  let isRunning = false; // false = waiting on start screen or paused
  let isStarterPage = true;

  let lastShootTime = 0;
  let shootCooldown = 150;

  let lastTimestamp = 0;

  let keys: Record<string, boolean> = {};
  let isTouching = false;
  let touchTargetX = 0;
  let touchTargetY = 0;

  let t = {
    builtBy: "Built by",
    privacyPolicy: "Privacy Policy",
  };

  let gameLoopId: number;

  function createParticles(x: number, y: number, color: string, count: number) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x,
        y,
        speedX: (Math.random() - 0.5) * 8,
        speedY: (Math.random() - 0.5) * 8,
        life: Math.random() * 30 + 20,
        maxLife: 50,
        color,
        radius: Math.random() * 3 + 1,
      });
    }
  }

  function createBullet() {
    bullets.push({
      x: player.x + player.w / 2,
      y: player.y,
      speed: 0.7, // units per ms
      radius: 6,
      color: "#00ffff",
    });
  }

  function createEnemy() {
    const size = Math.random() * 20 + 20;
    const health = size > 30 ? 2 : 1;
    enemies.push({
      x: Math.random() * (w - size),
      y: -size,
      w: size,
      h: size,
      speed: 0.08 + Math.random() * 0.05 + score * 0.0003,
      maxHealth: health,
      health,
      color: `hsl(${Math.random() * 60 + 300}, 100%, 60%)`,
    });
  }

  function spawnEnemy(delta: number) {
    // delta-aware spawn chance
    const baseChance = 0.02 + score * 0.00005;
    const chance = baseChance * (delta / 16.67); // scale vs ~60fps baseline
    if (Math.random() < chance) {
      createEnemy();
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    keys[e.key] = true;

    if ((e.key === "r" || e.key === "R") && isGameOver) {
      resetGame();
      return;
    }

    if (e.key === " " && !isRunning && !isGameOver) {
      startGame();
      e.preventDefault();
      return;
    }

    if (e.key === "Escape" && !isGameOver) {
      isRunning = !isRunning;
      if (isRunning) resumeLoop();
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    keys[e.key] = false;
  }

  function handleTouchStart(e: TouchEvent) {
    e.preventDefault();

    if (isGameOver) {
      resetGame();
      return;
    }

    if (!isRunning) {
      startGame();
    }

    isTouching = true;
    updateTouchPos(e);
  }

  function handleTouchMove(e: TouchEvent) {
    if (isGameOver) return;
    e.preventDefault();
    updateTouchPos(e);
  }

  function handleTouchEnd() {
    isTouching = false;
  }

  function updateTouchPos(e: TouchEvent) {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const touchY = e.touches[0].clientY - rect.top;
      touchTargetX = touchX;
      touchTargetY = touchY - 60;
    }
  }

  function loadBestScore() {
    if (typeof localStorage === "undefined") return;
    const stored = localStorage.getItem("space-shooterx-best");
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!Number.isNaN(parsed)) bestScore = parsed;
    }
  }

  function saveBestScore() {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem("space-shooterx-best", String(bestScore));
  }

  function resetGame() {
    score = 0;
    isGameOver = false;
    isRunning = false;
    isStarterPage = true;
    lastShootTime = 0;
    lastTimestamp = 0;
    isTouching = false;

    bullets = [];
    enemies = [];
    particles = [];

    resizeCanvas();
    centerPlayer();
    resumeLoop();
  }

  function startGame() {
    isRunning = true;
    isStarterPage = false;
  }

  function endGame() {
    isGameOver = true;
    isRunning = false;
    if (score > bestScore) {
      bestScore = score;
      saveBestScore();
    }
  }

  function centerPlayer() {
    player.x = w / 2 - player.w / 2;
    player.y = h - 100;
  }

  function resizeCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function handleResize() {
    resizeCanvas();
    if (player.x + player.w > w) player.x = w - player.w;
    if (player.y + player.h > h) player.y = h - player.h;
    draw(0); // quick redraw
  }

  function update(delta: number, timestamp: number) {
    if (!isRunning || isGameOver) return;

    // Shooting
    if (
      (keys[" "] || keys["Space"] || isTouching) &&
      timestamp - lastShootTime > shootCooldown
    ) {
      createBullet();
      lastShootTime = timestamp;
    }

    // Player movement
    const moveAmount = player.speed * delta;

    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) player.x -= moveAmount;
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) player.x += moveAmount;
    if (keys["ArrowUp"] || keys["w"] || keys["W"]) player.y -= moveAmount;
    if (keys["ArrowDown"] || keys["s"] || keys["S"]) player.y += moveAmount;

    // Touch interpolation
    if (isTouching) {
      const dx = touchTargetX - (player.x + player.w / 2);
      const dy = touchTargetY - (player.y + player.h / 2);
      player.x += dx * 0.2;
      player.y += dy * 0.2;
    }

    // Constrain player
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > w) player.x = w - player.w;
    if (player.y < 0) player.y = 0;
    if (player.y + player.h > h) player.y = h - player.h;

    // Bullets
    bullets = bullets.filter((b) => {
      b.y -= b.speed * delta;
      return b.y + b.radius > 0;
    });

    // Particles
    particles = particles.filter((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.life--;
      return p.life > 0;
    });

    // Enemies
    enemies = enemies.filter((e) => {
      e.y += e.speed * delta;
      if (e.y > h) {
        endGame();
        return false;
      }
      return true;
    });

    // Bullet vs Enemy
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      const b = bullets[bi];
      let hit = false;

      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        const e = enemies[ei];
        if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
          hit = true;
          e.health--;
          createParticles(b.x, b.y, b.color, 5);
          if (e.health <= 0) {
            createParticles(e.x + e.w / 2, e.y + e.h / 2, e.color, 20);
            enemies.splice(ei, 1);
            score += Math.floor(e.maxHealth * 10);
          }
          break;
        }
      }

      if (hit) {
        bullets.splice(bi, 1);
      }
    }

    // Player vs Enemy
    for (const e of enemies) {
      if (
        player.x < e.x + e.w &&
        player.x + player.w > e.x &&
        player.y < e.y + e.h &&
        player.y + player.h > e.y
      ) {
        createParticles(
          player.x + player.w / 2,
          player.y + player.h / 2,
          "#fff",
          30,
        );
        endGame();
        break;
      }
    }

    spawnEnemy(delta);
  }

  function drawBackground() {
    if (isStarterPage) {
      ctx.clearRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "#0B0D17";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let i = 0; i < h; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
      }
    }
  }

  function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }

  function drawPlayer() {
    if (isGameOver) return;

    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ffff";
    ctx.fillStyle = "#ffffff";

    ctx.beginPath();
    ctx.moveTo(player.x + player.w / 2, player.y);
    ctx.lineTo(player.x + player.w, player.y + player.h);
    ctx.lineTo(player.x + player.w / 2, player.y + player.h - 10);
    ctx.lineTo(player.x, player.y + player.h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#00ffff";
    ctx.beginPath();
    ctx.moveTo(player.x + player.w / 2, player.y + 10);
    ctx.lineTo(player.x + player.w - 10, player.y + player.h - 5);
    ctx.lineTo(player.x + player.w / 2, player.y + player.h - 10);
    ctx.lineTo(player.x + 10, player.y + player.h - 5);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
  }

  function drawBullets() {
    bullets.forEach((b) => {
      ctx.shadowBlur = 10;
      ctx.shadowColor = b.color;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  }

  function drawEnemies() {
    enemies.forEach((e) => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = e.color;
      ctx.fillStyle = e.color;
      drawRoundedRect(ctx, e.x, e.y, e.w, e.h, 5);

      ctx.fillStyle = "#0B0D17";
      ctx.shadowBlur = 0;
      drawRoundedRect(ctx, e.x + 5, e.y + 5, e.w - 10, e.h - 10, 2);
    });
    ctx.shadowBlur = 0;
  }

  function drawParticles() {
    particles.forEach((p) => {
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawUI(delta: number) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE: ${score}`, 20, 40);
    ctx.fillText(`BEST: ${bestScore}`, 20, 70);

    ctx.textAlign = "center";

    if (isStarterPage) {
      ctx.fillStyle = "rgba(11, 13, 23, 0.3)";
      ctx.fillRect(0, 0, w, h);

      const titleSize = w < 400 ? 32 : 48;
      ctx.font = `bold ${titleSize}px Inter, sans-serif`;

      const gradient = ctx.createLinearGradient(w / 2 - 150, 0, w / 2 + 150, 0);
      gradient.addColorStop(0, "#00ffff");
      gradient.addColorStop(0.5, "#a200ff");
      gradient.addColorStop(1, "#ff00aa");

      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#a200ff";
      ctx.fillText("SPACE SHOOTER X", w / 2, h / 2 - 40);
      ctx.shadowBlur = 0;

      const subtitleSize = w < 400 ? 16 : 20;
      ctx.font = `${subtitleSize}px Inter, sans-serif`;
      ctx.fillStyle = "#aaaaaa";
      ctx.fillText("Press Space / Tap to Start", w / 2, h / 2 + 10);

      const instructionSize = w < 400 ? 13 : 20;
      ctx.font = `${instructionSize}px Inter, sans-serif`;
      ctx.fillText("Move: WASD / Arrows   Shoot: Space", w / 2, h / 2 + 50);
    } else if (!isGameOver && !isRunning) {
      ctx.fillStyle = "rgba(11, 13, 23, 0.6)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = "24px Inter, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("PAUSED", w / 2, h / 2 - 10);
      
      ctx.font = "16px Inter, sans-serif";
      ctx.fillStyle = "#aaaaaa";
      ctx.fillText("Esc to Resume", w / 2, h / 2 + 25);
    }

    if (isGameOver) {
      ctx.fillStyle = "rgba(11, 13, 23, 0.85)";
      ctx.fillRect(0, 0, w, h);

      const gameOverSize = w < 400 ? 46 : 64;
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${gameOverSize}px Inter, sans-serif`;

      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ff0055";
      ctx.fillText("GAME OVER", w / 2, h / 2 - 40);
      ctx.shadowBlur = 0;

      const scoreSize = w < 400 ? 18 : 24;
      ctx.font = `${scoreSize}px Inter, sans-serif`;
      ctx.fillStyle = "#aaaaaa";
      ctx.fillText(`Final Score: ${score}`, w / 2, h / 2 + 10);
      ctx.fillText(`Best: ${bestScore}`, w / 2, h / 2 + 45);

      const restartSize = w < 400 ? 16 : 24;
      ctx.font = `${restartSize}px Inter, sans-serif`;
      ctx.fillStyle = "#00ffff";
      ctx.fillText("Press [R] or Tap to Restart", w / 2, h / 2 + 90);
    }
  }

  function draw(delta: number) {
    drawBackground();
    drawParticles();
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawUI(delta);
  }

  function loop(timestamp: number) {
    const delta = lastTimestamp ? timestamp - lastTimestamp : 16.67;
    lastTimestamp = timestamp;

    update(delta, timestamp);
    draw(delta);

    if (!isGameOver) {
      gameLoopId = requestAnimationFrame(loop);
    } else {
      draw(delta);
    }
  }

  function resumeLoop() {
    cancelAnimationFrame(gameLoopId);
    lastTimestamp = 0;
    gameLoopId = requestAnimationFrame(loop);
  }

  function shareScore() {
    const text = `I just scored ${score} in Space Shooter X! My best is ${bestScore}. Can you beat me?`;
    if (navigator.share) {
      navigator.share({
        title: 'Space Shooter X',
        text: text,
      }).catch(console.error);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Score copied to clipboard!");
      });
    }
  }

  function saveScreenshot() {
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `space-shooter-x-${score}.png`;
    link.href = dataUrl;
    link.click();
  }

  onMount(() => {
    ctx = canvas.getContext("2d")!;
    resizeCanvas();
    centerPlayer();
    loadBestScore();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);

    canvas.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    canvas.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    gameLoopId = requestAnimationFrame(loop);
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(gameLoopId);
    }

    if (canvas) {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    }
  });
</script>

<svelte:head>
  <title>Space Shooter X</title>
</svelte:head>

<main class="game-container">
  {#if isStarterPage}
    <div class="video-container">
      <video autoplay loop muted playsinline class="bg-video">
        <source src="/x.mp4" type="video/mp4" />
      </video>
      <div class="video-overlay"></div>
    </div>
  {/if}

  <canvas bind:this={canvas}></canvas>

  {#if isGameOver}
    <div class="action-buttons">
      <button on:click={shareScore} class="action-btn share-btn">
        <svg viewBox="0 0 24 24" fill="none" class="icon"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Share
      </button>
      <button on:click={saveScreenshot} class="action-btn save-btn">
        <svg viewBox="0 0 24 24" fill="none" class="icon"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Save
      </button>
    </div>
  {/if}

  
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #4760dd;
    font-family: "Inter", sans-serif;
  }

  .game-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    touch-action: none;
  }

  .action-buttons {
    position: absolute;
    top: calc(50% + 140px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 15px;
    z-index: 20;
    pointer-events: auto;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 255, 255, 0.1);
    border: 1px solid #00ffff;
    color: #ffffff;
    font-family: inherit;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    text-shadow: 0 0 5px rgba(0,255,255,0.5);
  }

  .action-btn:hover {
    background: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(0,255,255,0.4);
  }

  .action-btn .icon {
    width: 18px;
    height: 18px;
  }

  .share-btn {
    border-color: #a200ff;
    background: rgba(162, 0, 255, 0.1);
    text-shadow: 0 0 5px rgba(162,0,255,0.5);
  }

  .share-btn:hover {
    background: rgba(162, 0, 255, 0.3);
    box-shadow: 0 0 15px rgba(162,0,255,0.4);
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }

  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }

  .bg-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.05); /* Slight zoom for a cinematic look */
    animation: fadeIn 2s ease-out;
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(11,13,23,0.8) 100%);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  
</style>

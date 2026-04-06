import { aa as ssr_context, h as head } from "../../chunks/renderer.js";
import "clsx";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let canvas;
    let ctx;
    let w = 800;
    let h = 600;
    let player = {
      x: 0,
      y: 0,
      w: 40,
      h: 40,
      speed: 0.25
      // units per ms (scaled by delta time)
    };
    let bullets = [];
    let enemies = [];
    let particles = [];
    let score = 0;
    let bestScore = 0;
    let isGameOver = false;
    let isRunning = false;
    let isStarterPage = true;
    let lastShootTime = 0;
    let shootCooldown = 150;
    let lastTimestamp = 0;
    let keys = {};
    let isTouching = false;
    let touchTargetX = 0;
    let touchTargetY = 0;
    let gameLoopId;
    function createParticles(x, y, color, count) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          speedX: (Math.random() - 0.5) * 8,
          speedY: (Math.random() - 0.5) * 8,
          life: Math.random() * 30 + 20,
          maxLife: 50,
          color,
          radius: Math.random() * 3 + 1
        });
      }
    }
    function createBullet() {
      bullets.push({
        x: player.x + player.w / 2,
        y: player.y,
        speed: 0.7,
        // units per ms
        radius: 6,
        color: "#00ffff"
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
        speed: 0.04 + Math.random() * 0.03 + score * 1e-4,
        maxHealth: health,
        health,
        color: `hsl(${Math.random() * 60 + 300}, 100%, 60%)`
      });
    }
    function spawnEnemy(delta) {
      const baseChance = 8e-3 + score * 2e-5;
      const chance = baseChance * (delta / 16.67);
      if (Math.random() < chance) {
        createEnemy();
      }
    }
    function handleKeyDown(e) {
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
    function handleKeyUp(e) {
      keys[e.key] = false;
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
      draw();
    }
    function update(delta, timestamp) {
      if (!isRunning || isGameOver) return;
      if ((keys[" "] || keys["Space"] || isTouching) && timestamp - lastShootTime > shootCooldown) {
        createBullet();
        lastShootTime = timestamp;
      }
      const moveAmount = player.speed * delta;
      if (keys["ArrowLeft"] || keys["a"] || keys["A"]) player.x -= moveAmount;
      if (keys["ArrowRight"] || keys["d"] || keys["D"]) player.x += moveAmount;
      if (keys["ArrowUp"] || keys["w"] || keys["W"]) player.y -= moveAmount;
      if (keys["ArrowDown"] || keys["s"] || keys["S"]) player.y += moveAmount;
      if (isTouching) {
        const dx = touchTargetX - (player.x + player.w / 2);
        const dy = touchTargetY - (player.y + player.h / 2);
        player.x += dx * 0.2;
        player.y += dy * 0.2;
      }
      if (player.x < 0) player.x = 0;
      if (player.x + player.w > w) player.x = w - player.w;
      if (player.y < 0) player.y = 0;
      if (player.y + player.h > h) player.y = h - player.h;
      bullets = bullets.filter((b) => {
        b.y -= b.speed * delta;
        return b.y + b.radius > 0;
      });
      particles = particles.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        return p.life > 0;
      });
      enemies = enemies.filter((e) => {
        e.y += e.speed * delta;
        if (e.y > h) {
          endGame();
          return false;
        }
        return true;
      });
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
      for (const e of enemies) {
        if (player.x < e.x + e.w && player.x + player.w > e.x && player.y < e.y + e.h && player.y + player.h > e.y) {
          createParticles(player.x + player.w / 2, player.y + player.h / 2, "#fff", 30);
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
      const time = Date.now() / 150;
      enemies.forEach((e) => {
        ctx.shadowBlur = 15;
        ctx.shadowColor = e.color;
        ctx.fillStyle = e.color;
        const legOffset = Math.sin(time + e.x) * (e.h * 0.15);
        ctx.beginPath();
        ctx.arc(e.x + e.w / 2, e.y + e.h * 0.4, e.w / 2, Math.PI, 0);
        ctx.lineTo(e.x + e.w, e.y + e.h);
        ctx.lineTo(e.x + e.w * 0.8, e.y + e.h * 0.8 + legOffset);
        ctx.lineTo(e.x + e.w * 0.5, e.y + e.h - legOffset);
        ctx.lineTo(e.x + e.w * 0.2, e.y + e.h * 0.8 + legOffset);
        ctx.lineTo(e.x, e.y + e.h);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#0B0D17";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.ellipse(e.x + e.w * 0.3, e.y + e.h * 0.45, e.w * 0.12, e.h * 0.15, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(e.x + e.w * 0.7, e.y + e.h * 0.45, e.w * 0.12, e.h * 0.15, 0.4, 0, Math.PI * 2);
        ctx.fill();
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
    function drawUI(delta) {
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
    function draw(delta) {
      drawBackground();
      drawParticles();
      drawPlayer();
      drawBullets();
      drawEnemies();
      drawUI();
    }
    function loop(timestamp) {
      const delta = lastTimestamp ? timestamp - lastTimestamp : 16.67;
      lastTimestamp = timestamp;
      update(delta, timestamp);
      draw();
      if (!isGameOver) {
        gameLoopId = requestAnimationFrame(loop);
      } else {
        draw();
      }
    }
    function resumeLoop() {
      cancelAnimationFrame(gameLoopId);
      lastTimestamp = 0;
      gameLoopId = requestAnimationFrame(loop);
    }
    onDestroy(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(gameLoopId);
      }
    });
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Space Shooter X</title>`);
      });
    });
    $$renderer2.push(`<main class="game-container svelte-1uha8ag">`);
    if (isStarterPage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="video-container svelte-1uha8ag"><video autoplay="" loop="" muted="" playsinline="" class="bg-video svelte-1uha8ag"><source src="/x.mp4" type="video/mp4"/></video> <div class="video-overlay svelte-1uha8ag"></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <canvas class="svelte-1uha8ag"></canvas> `);
    if (isGameOver) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="action-buttons svelte-1uha8ag"><button class="action-btn share-btn svelte-1uha8ag"><svg viewBox="0 0 24 24" fill="none" class="icon svelte-1uha8ag"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> Share</button> <button class="action-btn save-btn svelte-1uha8ag"><svg viewBox="0 0 24 24" fill="none" class="icon svelte-1uha8ag"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> Save</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};

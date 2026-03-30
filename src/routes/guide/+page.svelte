<script lang="ts">
</script>

<svelte:head>
  <title>Guide - Space Shooter X</title>
</svelte:head>

<div class="page-container">
  <header>
    <h1>How to Play</h1>
    <p>Master the cosmos with this quick guide</p>
  </header>

  <main>
    <section class="card">
      <div class="icon-wrap keys">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="16" height="8" rx="2" ry="2"></rect><line x1="8" y1="12" x2="8.01" y2="12"></line><line x1="12" y1="12" x2="12.01" y2="12"></line><line x1="16" y1="12" x2="16.01" y2="12"></line></svg>
      </div>
      <div class="info">
        <h3>Controls</h3>
        <p><strong>Desktop:</strong> Use <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or Arrow Keys to move your ship. Press <kbd>Space</kbd> or click to fire lasers.</p>
        <p><strong>Mobile:</strong> Touch and drag anywhere on the screen to move and shoot simultaneously.</p>
      </div>
    </section>

    <section class="card">
      <div class="icon-wrap enemies">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      </div>
      <div class="info">
        <h3>Enemies</h3>
        <p>Destroy falling enemies to increase your score. Be warned: more enemies spawn as you play. Larger enemies take more hits to destroy!</p>
      </div>
    </section>

    <section class="card">
      <div class="icon-wrap score">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </div>
      <div class="info">
        <h3>Scoring Strategy</h3>
        <p>Build up high scores by staying center, surviving longer, and wiping out incoming waves. Watch out for enemy collisions—one hit and it's Game Over!</p>
      </div>
    </section>
  </main>
</div>

<style>
  .page-container {
    min-height: 100vh;
    background-color: #0B0D17;
    color: #fff;
    padding: 2rem 1rem calc(80px + env(safe-area-inset-bottom, 20px));
    box-sizing: border-box;
  }
  header {
    text-align: center;
    margin-bottom: 2rem;
  }
  h1 {
    font-size: 2.5rem;
    margin: 0;
    background: linear-gradient(90deg, #00ffff, #a200ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  header p {
    color: #aaa;
    margin-top: 0.5rem;
  }
  main {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .icon-wrap {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
  }
  .icon-wrap svg {
    width: 24px;
    height: 24px;
    color: #00ffff;
  }
  .info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: #fff;
  }
  .info p {
    margin: 0 0 0.5rem 0;
    color: #cbd5e1;
    line-height: 1.5;
    font-size: 0.95rem;
  }
  kbd {
    background: rgba(255,255,255,0.2);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.85em;
  }
</style>

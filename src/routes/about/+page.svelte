<script lang="ts">
</script>

<svelte:head>
  <title>About - Space Shooter X</title>
</svelte:head>

<div class="page-container">
  <header>
    <h1>About Us</h1>
    <p>The story behind Space Shooter X</p>
  </header>

  <main>
    <div class="profile-card">
      <div class="avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </div>
      <h2>Developer Team</h2>
      <a href="https://uspekhi.web.app" class="studio-link" target="_blank">Built by USPEKHI</a>
    </div>

    <div class="content-panel">
      <h3>Version 1.0.0</h3>
      <p>Space Shooter X was built to provide an incredibly responsive, arcade-style experience right in your browser. With a simple tech stack and native Canvas rendering, it guarantees 60fps even on lower-end devices.</p>
      
      <h3>Technologies Used</h3>
      <ul>
        <li>SvelteKit / Svelte 5</li>
        <li>HTML5 Canvas API</li>
        <li>Modern Vanilla CSS</li>
      </ul>

      <h3>Privacy</h3>
      <p>We respect your privacy. Check out our <a href="/privacy-policy.html">Privacy Policy</a> to learn more about how we process data.</p>
    </div>
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
    background: linear-gradient(90deg, #a200ff, #00ffff);
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
    gap: 2rem;
  }
  .profile-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    background: #0B0D17;
    border-radius: 50%;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #00ffff;
    color: #00ffff;
  }
  .avatar svg {
    width: 40px;
    height: 40px;
  }
  .profile-card h2 {
    margin: 0 0 0.5rem 0;
  }
  .studio-link {
    color: #ff00aa;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .content-panel {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 12px;
  }
  .content-panel h3 {
    color: #00ffff;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  .content-panel p, .content-panel ul {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  .content-panel ul {
    padding-left: 1.5rem;
  }
  .content-panel li {
    margin-bottom: 0.5rem;
  }
  .content-panel a {
    color: #00ffff;
    text-decoration: underline;
  }
</style>

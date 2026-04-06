<script lang="ts">
</script>

<svelte:head>
  <title>Video - Space Shooter X</title>
</svelte:head>

<div class="page-container">
  <header>
    <h1>Gameplay Video</h1>
    <p>Watch the latest action</p>
  </header>

  <main>
    <div class="video-container">
      <iframe 
        src="https://www.youtube.com/embed/JGQ1BBUVN9U" 
        title="Space Shooter Gameplay Video" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    </div>
    <div class="description">
      <h3>Epic Space Battles!</h3>
      <p>Subscribe to our channel to get more updates, tips, and tricks to conquer the leaderboards.</p>
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
    background: linear-gradient(90deg, #ff0055, #a200ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  header p {
    color: #aaa;
    margin-top: 0.5rem;
  }
  main {
    max-width: 800px;
    margin: 0 auto;
  }
  .video-container {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    aspect-ratio: 9 / 16;
    background: #1a1e36;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  .description {
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 12px;
  }
  .description h3 {
    margin-top: 0;
    color: #00ffff;
  }
</style>

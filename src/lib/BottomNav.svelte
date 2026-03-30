<script lang="ts">
  import { page } from '$app/stores';
</script>

<nav class="bottom-nav">
  <a href="/" class="nav-item" class:active={$page.url.pathname === '/'}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
    <span>START</span>
  </a>

  <a href="/guide" class="nav-item" class:active={($page.url.pathname as string) === '/guide'}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
    <span>GUIDE</span>
  </a>

  <a href="/video" class="nav-item" class:active={($page.url.pathname as string) === '/video'}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
    <span>VIDEO</span>
  </a>

  <a href="/about" class="nav-item" class:active={($page.url.pathname as string) === '/about'}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>ABOUT</span>
  </a>
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
    z-index: 1000;
    /* Respect safe area for iOS */
    padding-bottom: env(safe-area-inset-bottom); 
    box-sizing: content-box;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #a0aabf; /* Light greyish color */
    width: 60px;
    height: 100%;
    position: relative;
    transition: color 0.2s;
    font-family: inherit;
  }

  .nav-item:hover, .nav-item:focus {
    color: #555;
  }

  .nav-item.active {
    color: #0088ff; /* Blue similar to screenshot */
  }

  .nav-item svg {
    width: 24px;
    height: 24px;
    margin-bottom: 6px;
  }

  .nav-item span {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .nav-item.active::after {
    content: '';
    position: absolute;
    bottom: 10px;
    width: 5px;
    height: 5px;
    background-color: currentColor;
    border-radius: 50%;
  }
</style>

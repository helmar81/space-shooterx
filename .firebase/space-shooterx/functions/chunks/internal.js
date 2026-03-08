import { r as root } from "./root.js";
import "./environment.js";
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
const options = {
  app_template_contains_nonce: false,
  async: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  csrf_trusted_origins: [],
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: true,
  service_worker_options: void 0,
  templates: {
    app: ({ head, body, assets, nonce, env }) => `<!doctype html>
<html lang="en">

<head>

	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-1HG6TMFN04"><\/script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		gtag('js', new Date());

		gtag('config', 'G-1HG6TMFN04');
	<\/script>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="theme-color" content="#0B0D17" />
	<meta name="description" content="A futuristic space shooter game built with Svelte." />
	<meta name="author" content="Helmar Baechle" />

	<!-- Open Graph -->
	<meta property="og:title" content="Space Shooter" />
	<meta property="og:description" content="A futuristic space shooter game built with Svelte." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://space-shooterx.web.app/" />
	<meta property="og:image" content="https://space-shooterx.web.app/icon-192.png" />
	<meta property="og:image:width" content="192" />
	<meta property="og:image:height" content="192" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Space Shooter" />
	<meta name="twitter:description" content="A futuristic space shooter game built with Svelte." />
	<meta name="twitter:image" content="https://space-shooterx.web.app/icon-192.png" />

	` + head + `
</head>

<body data-sveltekit-preload-data="hover">
	<div id="app-spinner"
		style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0B0D17;display:flex;justify-content:center;align-items:center;z-index:9999;transition:opacity 0.5s ease-out;">
		<div
			style="width:50px;height:50px;border:3px solid rgba(0,255,255,0.3);border-radius:50%;border-top-color:#00ffff;animation:spin 1s ease-in-out infinite;">
		</div>
		<style>
			@keyframes spin {
				100% {
					transform: rotate(360deg);
				}
			}
		</style>
	</div>
	<script>
		window.addEventListener('load', function () {
			var spinner = document.getElementById('app-spinner');
			if (spinner) {
				spinner.style.opacity = '0';
				setTimeout(function () { if (spinner.parentNode) spinner.parentNode.removeChild(spinner); }, 500);
			}

			// Service Worker registration
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('/service-worker.js')
					.then((reg) => console.log('Service Worker registered successfully!', reg))
					.catch((err) => console.error('Service Worker registration failed:', err));
			}
		});
	<\/script>
	<div style="display: contents">` + body + "</div>\n</body>\n\n</html>",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1rd8jqq"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    handleValidationError,
    init,
    reroute,
    transport
  };
}
export {
  set_public_env as a,
  set_read_implementation as b,
  set_manifest as c,
  get_hooks as g,
  options as o,
  public_env as p,
  read_implementation as r,
  set_private_env as s
};

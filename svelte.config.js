import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender: {
			handleHttpError: 'warn',
			handleUnseenRoutes: 'ignore'
		},
		adapter: adapter({
			// fallback: 'index.html' is required for SPA mode on Firebase/Bubblewrap
			fallback: 'index.html'
		})
	}
};

export default config;
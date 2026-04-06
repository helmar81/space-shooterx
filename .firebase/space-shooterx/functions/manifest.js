export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["1.2.mp4","icon-192.png","icon-192x.png","icon-512.png","icon-512x.png","llms.txt","manifest.json","me.webp","robots.txt","sitemap.xml","x.mp4","x2.mp4","service-worker.js"]),
	mimeTypes: {".mp4":"video/mp4",".png":"image/png",".txt":"text/plain",".json":"application/json",".webp":"image/webp",".xml":"text/xml"},
	_: {
		client: {start:"_app/immutable/entry/start.XUt0KPDS.js",app:"_app/immutable/entry/app.CACzf_gz.js",imports:["_app/immutable/entry/start.XUt0KPDS.js","_app/immutable/chunks/05akOdY8.js","_app/immutable/chunks/CUSsPt6d.js","_app/immutable/chunks/xk9hqTOc.js","_app/immutable/chunks/DYOJvpX7.js","_app/immutable/entry/app.CACzf_gz.js","_app/immutable/chunks/CUSsPt6d.js","_app/immutable/chunks/CNrh6GSa.js","_app/immutable/chunks/CEEVIZ23.js","_app/immutable/chunks/3QSRoAIy.js","_app/immutable/chunks/DYOJvpX7.js","_app/immutable/chunks/CX1Gm3An.js","_app/immutable/chunks/Bb0B6QM0.js","_app/immutable/chunks/CY5bn27k.js","_app/immutable/chunks/xk9hqTOc.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/guide",
				pattern: /^\/guide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/privacy-policy.html",
				pattern: /^\/privacy-policy\.html\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/privacy-policy",
				pattern: /^\/privacy-policy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/video",
				pattern: /^\/video\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

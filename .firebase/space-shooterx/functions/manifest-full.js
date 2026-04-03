export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["icon-192.png","icon-512.png","llms.txt","manifest.json","me.webp","robots.txt","sitemap.xml","x.mp4","service-worker.js"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".json":"application/json",".webp":"image/webp",".xml":"text/xml",".mp4":"video/mp4"},
	_: {
		client: {start:"_app/immutable/entry/start.B_bQPiao.js",app:"_app/immutable/entry/app.rpwgwcmc.js",imports:["_app/immutable/entry/start.B_bQPiao.js","_app/immutable/chunks/DaR00ErE.js","_app/immutable/chunks/C9Y_wHBP.js","_app/immutable/chunks/CI8F4t6e.js","_app/immutable/chunks/CqfnYVNL.js","_app/immutable/entry/app.rpwgwcmc.js","_app/immutable/chunks/C9Y_wHBP.js","_app/immutable/chunks/Zmer4ENH.js","_app/immutable/chunks/DDRtJ2XU.js","_app/immutable/chunks/sWu5AkWs.js","_app/immutable/chunks/CqfnYVNL.js","_app/immutable/chunks/C-JF4-kT.js","_app/immutable/chunks/rPyU6_Pw.js","_app/immutable/chunks/C2ShVVR2.js","_app/immutable/chunks/CI8F4t6e.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

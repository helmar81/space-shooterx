export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["icon-192.png","icon-512.png","llms.txt","manifest.json","privacy-policy.html","robots.txt","sitemap.xml","service-worker.js"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".json":"application/json",".html":"text/html",".xml":"text/xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BiFfY1l7.js",app:"_app/immutable/entry/app.7D1beZtI.js",imports:["_app/immutable/entry/start.BiFfY1l7.js","_app/immutable/chunks/Dq0eVpA5.js","_app/immutable/chunks/ireIc5hU.js","_app/immutable/chunks/hCORChy9.js","_app/immutable/entry/app.7D1beZtI.js","_app/immutable/chunks/ireIc5hU.js","_app/immutable/chunks/CaGVVGo7.js","_app/immutable/chunks/Is93vP2K.js","_app/immutable/chunks/hCORChy9.js","_app/immutable/chunks/CkaOX-eC.js","_app/immutable/chunks/DdHyZJ39.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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

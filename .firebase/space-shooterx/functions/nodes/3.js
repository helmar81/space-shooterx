

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.5VN9EziN.js","_app/immutable/chunks/3QSRoAIy.js","_app/immutable/chunks/CUSsPt6d.js","_app/immutable/chunks/CKfnzDAJ.js"];
export const stylesheets = ["_app/immutable/assets/3.CGrqjypU.css"];
export const fonts = [];



export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/video/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.BEkrr27V.js","_app/immutable/chunks/3QSRoAIy.js","_app/immutable/chunks/CUSsPt6d.js","_app/immutable/chunks/CKfnzDAJ.js"];
export const stylesheets = ["_app/immutable/assets/7.CT2u-whn.css"];
export const fonts = [];

import { g as getContext, a as attr_class, s as store_get, u as unsubscribe_stores, h as head } from "../../chunks/renderer.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function BottomNav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<nav class="bottom-nav svelte-1azti6v"><a href="/"${attr_class("nav-item svelte-1azti6v", void 0, {
      "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/"
    })}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1azti6v"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> <span class="svelte-1azti6v">START</span></a> <a href="/guide"${attr_class("nav-item svelte-1azti6v", void 0, {
      "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/guide"
    })}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1azti6v"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg> <span class="svelte-1azti6v">GUIDE</span></a> <a href="/video"${attr_class("nav-item svelte-1azti6v", void 0, {
      "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/video"
    })}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1azti6v"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg> <span class="svelte-1azti6v">VIDEO</span></a> <a href="/about"${attr_class("nav-item svelte-1azti6v", void 0, {
      "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/about"
    })}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1azti6v"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> <span class="svelte-1azti6v">ABOUT</span></a></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.push(`<link rel="icon" href="/icon-192.png" type="image/png"/>`);
  });
  children($$renderer);
  $$renderer.push(`<!----> `);
  BottomNav($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};

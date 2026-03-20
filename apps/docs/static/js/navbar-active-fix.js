(() => {
  const syncNavbarActive = () => {
    const path = window.location.pathname;
    const docsLink = document.querySelector('.navbar__link[href="/"]');
    const extractedLink = document.querySelector('.navbar__link[href="/extracted"]');

    if (!docsLink || !extractedLink) {
      return;
    }

    const isExtracted = path === "/extracted" || path.startsWith("/extracted/");

    const setActive = (node, active) => {
      node.classList.toggle("navbar__link--active", active);
      if (active) {
        node.setAttribute("aria-current", "page");
      } else {
        node.removeAttribute("aria-current");
      }
    };

    setActive(docsLink, !isExtracted);
    setActive(extractedLink, isExtracted);
  };

  const patchHistory = () => {
    const wrap = (methodName) => {
      const original = history[methodName];
      if (typeof original !== "function") {
        return;
      }
      history[methodName] = function (...args) {
        const result = original.apply(this, args);
        queueMicrotask(syncNavbarActive);
        return result;
      };
    };

    wrap("pushState");
    wrap("replaceState");
  };

  patchHistory();
  window.addEventListener("popstate", syncNavbarActive);
  window.addEventListener("load", syncNavbarActive);
  document.addEventListener("DOMContentLoaded", syncNavbarActive);
})();

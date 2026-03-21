import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../src/code.ts", import.meta.url), "utf8");

const rawUiMatch = source.match(/const rawUiHtml = `([\s\S]*?)`;\n\nconst uiHtml = rawUiHtml/);
if (!rawUiMatch) {
  throw new Error("rawUiHtml not found in code.ts");
}

const rawUiHtml = rawUiMatch[1];
const finalHtml = rawUiHtml
  .replace("__PREVIEW_OPTIONS_JSON__", "{}")
  .replace("__BRIDGE_URL_JSON__", JSON.stringify("http://localhost:8787"))
  .replace("__BUILD_STAMP_JSON__", JSON.stringify("test-build"));

const scriptMatch = finalHtml.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  throw new Error("inline UI script not found");
}

const inlineScript = scriptMatch[1];
new vm.Script(inlineScript, { filename: "maker-ui-inline.js" });

const ids = Array.from(finalHtml.matchAll(/id="([^"]+)"/g), (match) => match[1]);
const elements = new Map();

class FakeElement {
  constructor(id) {
    this.id = id;
    this.dataset = {};
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.disabled = false;
    this.scrollTop = 0;
    this.scrollHeight = 0;
    this.children = [];
    this.className = "";
    this._classes = new Set();
    this.classList = {
      toggle: (token, force) => {
        if (force === true) {
          this._classes.add(token);
          return true;
        }
        if (force === false) {
          this._classes.delete(token);
          return false;
        }
        if (this._classes.has(token)) {
          this._classes.delete(token);
          return false;
        }
        this._classes.add(token);
        return true;
      },
      add: (...tokens) => {
        for (const token of tokens) this._classes.add(token);
      },
      remove: (...tokens) => {
        for (const token of tokens) this._classes.delete(token);
      },
      contains: (token) => this._classes.has(token)
    };
    this.listeners = new Map();
    this.style = {};
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  addEventListener(type, handler) {
    const list = this.listeners.get(type) ?? [];
    list.push(handler);
    this.listeners.set(type, list);
  }
  dispatch(type) {
    const handlers = this.listeners.get(type) ?? [];
    for (const handler of handlers) {
      handler({
        preventDefault() {},
        stopPropagation() {}
      });
    }
  }
}

for (const id of ids) {
  const element = new FakeElement(id);
  const classMatch = finalHtml.match(new RegExp(`id="${id}"[^>]*class="([^"]+)"`));
  if (classMatch) {
    for (const token of classMatch[1].split(/\s+/).filter(Boolean)) {
      element.classList.add(token);
    }
  }
  elements.set(id, element);
}

const documentListeners = new Map();

const document = {
  getElementById(id) {
    return elements.get(id) ?? null;
  },
  createElement(tagName) {
    return new FakeElement(tagName);
  },
  body: {
    appendChild() {}
  },
  addEventListener(type, handler) {
    const list = documentListeners.get(type) ?? [];
    list.push(handler);
    documentListeners.set(type, list);
  }
};

const windowListeners = new Map();
const pluginMessages = [];

const context = {
  console,
  document,
  window: {
    addEventListener(type, handler) {
      const list = windowListeners.get(type) ?? [];
      list.push(handler);
      windowListeners.set(type, list);
    }
  },
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {}
  },
  fetch: async () => ({
    ok: true,
    async json() {
      return {};
    }
  }),
  parent: {
    postMessage(payload) {
      pluginMessages.push(payload);
    }
  },
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  Date,
  URL
};

context.window.window = context.window;
context.window.document = document;
context.window.parent = context.parent;
context.window.localStorage = context.localStorage;
context.window.fetch = context.fetch;
context.window.setTimeout = setTimeout;
context.window.clearTimeout = clearTimeout;
context.window.setInterval = setInterval;
context.window.clearInterval = clearInterval;
context.window.Date = Date;
context.window.URL = URL;

vm.createContext(context);
vm.runInContext(inlineScript, context, { filename: "maker-ui-inline.js" });

elements.get("makerPrompt").value = "로그인화면 생성";
elements.get("tabInspection")?.dispatch("click");
elements.get("makerSubmit")?.dispatch("click");

const hasReadyMessage = pluginMessages.some(
  (message) => message?.pluginMessage?.type === "pluginReady"
);
const hasMakerRunMessage = pluginMessages.some(
  (message) => message?.pluginMessage?.type === "requestMakerRun"
);
const inspectionPanelActive = elements.get("panelInspection")?.classList.contains("active");

if (!hasReadyMessage) {
  throw new Error("UI bootstrap did not send pluginReady");
}

if (!inspectionPanelActive) {
  throw new Error("Inspection tab did not activate panelInspection");
}

if (!hasMakerRunMessage) {
  throw new Error("Maker submit did not send requestMakerRun");
}

console.log("UI validation passed");

const withTimeout = async (promise, timeoutMs) => {
    return await Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`MCP request timeout after ${timeoutMs}ms`)), timeoutMs);
        })
    ]);
};
const parseSseMessage = (raw) => {
    const lines = raw.split("\n");
    const dataLine = lines.find((line) => line.startsWith("data:"));
    if (!dataLine) {
        throw new Error(`Invalid MCP SSE response: ${raw.slice(0, 200)}`);
    }
    const json = dataLine.replace(/^data:\s*/, "");
    return JSON.parse(json);
};
const asJsonRpc = (value) => value;
const assertJsonRpcSuccess = (response) => {
    if ("error" in response) {
        throw new Error(`MCP JSON-RPC error (${response.error.code}): ${response.error.message}`);
    }
    return response.result;
};
export const createMcpSession = (config) => {
    const timeoutMs = config.timeoutMs ?? 15000;
    const state = {
        endpoint: config.endpoint,
        sessionId: undefined,
        initialized: false
    };
    if (!config.endpoint) {
        throw new Error("MCP endpoint is required");
    }
    const request = async (method, params) => {
        const body = {
            jsonrpc: "2.0",
            id: Date.now(),
            method,
            ...(typeof params === "undefined" ? {} : { params })
        };
        const response = await withTimeout(fetch(config.endpoint, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json, text/event-stream",
                ...(state.sessionId ? { "mcp-session-id": state.sessionId } : {}),
                ...(config.token ? { authorization: `Bearer ${config.token}` } : {})
            },
            body: JSON.stringify(body)
        }), timeoutMs);
        const sessionId = response.headers.get("mcp-session-id");
        if (sessionId) {
            state.sessionId = sessionId;
        }
        const text = await response.text();
        if (!response.ok) {
            throw new Error(`MCP request failed (${response.status}): ${text}`);
        }
        const contentType = response.headers.get("content-type") ?? "";
        const parsed = contentType.includes("text/event-stream") ? parseSseMessage(text) : JSON.parse(text);
        const jsonRpc = asJsonRpc(parsed);
        return assertJsonRpcSuccess(jsonRpc);
    };
    return {
        getState() {
            return { ...state };
        },
        async initialize() {
            const result = await request("initialize", {
                protocolVersion: "2024-11-05",
                capabilities: {},
                clientInfo: {
                    name: "miterlab-figma-generator",
                    version: "0.1.0"
                }
            });
            state.initialized = true;
            return result;
        },
        async listTools() {
            if (!state.initialized) {
                await this.initialize();
            }
            return await request("tools/list", {});
        },
        async callTool(name, args = {}) {
            if (!state.initialized) {
                await this.initialize();
            }
            return await request("tools/call", { name, arguments: args });
        }
    };
};

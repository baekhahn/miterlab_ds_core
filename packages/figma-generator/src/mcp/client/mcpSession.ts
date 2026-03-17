import type {
  JsonRpcRequest,
  JsonRpcResponse,
  McpInitializeResult,
  McpToolCallResult,
  McpToolsListResult
} from "../contracts/jsonRpc";

export interface McpSessionConfig {
  endpoint: string;
  token?: string;
  timeoutMs?: number;
}

export interface McpSessionState {
  endpoint: string;
  sessionId?: string;
  initialized: boolean;
}

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(`MCP request timeout after ${timeoutMs}ms`)), timeoutMs);
    })
  ]);
};

const parseSseMessage = (raw: string): unknown => {
  const lines = raw.split("\n");
  const dataLine = lines.find((line) => line.startsWith("data:"));
  if (!dataLine) {
    throw new Error(`Invalid MCP SSE response: ${raw.slice(0, 200)}`);
  }
  const json = dataLine.replace(/^data:\s*/, "");
  return JSON.parse(json);
};

const asJsonRpc = <T>(value: unknown): JsonRpcResponse<T> => value as JsonRpcResponse<T>;

const assertJsonRpcSuccess = <T>(response: JsonRpcResponse<T>): T => {
  if ("error" in response) {
    throw new Error(`MCP JSON-RPC error (${response.error.code}): ${response.error.message}`);
  }
  return response.result;
};

export const createMcpSession = (config: McpSessionConfig) => {
  const timeoutMs = config.timeoutMs ?? 15000;
  const state: McpSessionState = {
    endpoint: config.endpoint,
    sessionId: undefined,
    initialized: false
  };

  if (!config.endpoint) {
    throw new Error("MCP endpoint is required");
  }

  const request = async <TResult, TParams = unknown>(method: string, params?: TParams): Promise<TResult> => {
    const body: JsonRpcRequest<TParams> = {
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      ...(typeof params === "undefined" ? {} : { params })
    };

    const response = await withTimeout(
      fetch(config.endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json, text/event-stream",
          ...(state.sessionId ? { "mcp-session-id": state.sessionId } : {}),
          ...(config.token ? { authorization: `Bearer ${config.token}` } : {})
        },
        body: JSON.stringify(body)
      }),
      timeoutMs
    );

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
    const jsonRpc = asJsonRpc<TResult>(parsed);

    return assertJsonRpcSuccess(jsonRpc);
  };

  return {
    getState(): McpSessionState {
      return { ...state };
    },

    async initialize() {
      const result = await request<McpInitializeResult, Record<string, unknown>>("initialize", {
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
      return await request<McpToolsListResult, Record<string, never>>("tools/list", {});
    },

    async callTool(name: string, args: Record<string, unknown> = {}) {
      if (!state.initialized) {
        await this.initialize();
      }
      return await request<McpToolCallResult, { name: string; arguments: Record<string, unknown> }>(
        "tools/call",
        { name, arguments: args }
      );
    }
  };
};

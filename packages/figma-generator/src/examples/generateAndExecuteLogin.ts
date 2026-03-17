import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildMcpPayloadFromPrompt } from "./buildMcpPayloadFromPrompt";
import { mockMcpClient } from "../mcp/client/mockMcpClient";
import type { DesignPrompt } from "../types/designPrompt";
import type { McpExecutionRequest } from "../mcp/contracts/executionRequest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readPrompt = (): DesignPrompt => {
  const filePath = path.resolve(__dirname, "prompts/login.prompt.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as DesignPrompt;
};

export const generateAndExecuteLogin = () => {
  const prompt = readPrompt();
  const payload = buildMcpPayloadFromPrompt(prompt);

  const request: McpExecutionRequest = {
    documentName: "Miterlab DS - Login",
    pageName: "Login",
    theme: payload.document.theme,
    payload,
    metadata: {
      purpose: "preview-login-screen"
    }
  };

  return mockMcpClient.execute(request);
};

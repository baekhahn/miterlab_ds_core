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
  const filePath = path.resolve(__dirname, "prompts/dashboard.prompt.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as DesignPrompt;
};

export const generateAndExecuteDashboard = () => {
  const prompt = readPrompt();
  const payload = buildMcpPayloadFromPrompt(prompt);

  const request: McpExecutionRequest = {
    documentName: "Miterlab DS - Dashboard",
    pageName: "Dashboard",
    theme: payload.document.theme,
    payload,
    metadata: {
      purpose: "preview-dashboard-screen"
    }
  };

  return mockMcpClient.execute(request);
};

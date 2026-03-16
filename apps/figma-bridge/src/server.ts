import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createPromptFromScreen } from "./promptLibrary";
import { generateFromPrompt } from "./generate";
import type { GenerateFromPromptRequest, GenerateScreenRequest } from "./contracts/generateScreenRequest";

const port = Number(process.env.PORT ?? 8787);
const host = process.env.HOST ?? "0.0.0.0";
const defaultTheme = process.env.BRIDGE_DEFAULT_THEME ?? "core";
const artifactsDir = path.resolve(process.cwd(), "artifacts/bridge");

const json = (status: number, payload: unknown) => {
  return {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type"
    },
    body: `${JSON.stringify(payload, null, 2)}\n`
  };
};

const readJsonBody = async <T>(req: http.IncomingMessage): Promise<T> => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf-8").trim();
  if (!raw) {
    return {} as T;
  }
  return JSON.parse(raw) as T;
};

const write = (res: http.ServerResponse, response: { status: number; headers: Record<string, string>; body: string }) => {
  res.writeHead(response.status, response.headers);
  res.end(response.body);
};

const writeArtifact = (name: string, data: unknown) => {
  fs.mkdirSync(artifactsDir, { recursive: true });
  fs.writeFileSync(path.resolve(artifactsDir, name), `${JSON.stringify(data, null, 2)}\n`, "utf-8");
};

const server = http.createServer(async (req, res) => {
  const method = req.method ?? "GET";
  const url = req.url ?? "/";

  if (method === "OPTIONS") {
    write(res, json(200, { ok: true }));
    return;
  }

  if (method === "GET" && url === "/health") {
    write(
      res,
      json(200, {
        ok: true,
        service: "miterlab-figma-bridge",
        time: new Date().toISOString()
      })
    );
    return;
  }

  if (method === "POST" && url === "/generate-screen") {
    try {
      const body = await readJsonBody<GenerateScreenRequest>(req);
      const screen = (body.screen ?? "login").trim();
      const theme = (body.theme ?? defaultTheme).trim();
      const prompt = createPromptFromScreen(screen, theme);
      const result = generateFromPrompt(prompt, body.project);
      writeArtifact("last-generate-screen.json", result);
      write(res, json(200, result));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/generate-from-prompt") {
    try {
      const body = await readJsonBody<GenerateFromPromptRequest>(req);
      if (!body.prompt) {
        write(res, json(400, { error: "prompt is required" }));
        return;
      }
      const result = generateFromPrompt(body.prompt);
      writeArtifact("last-generate-from-prompt.json", result);
      write(res, json(200, result));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  write(res, json(404, { error: "Not found" }));
});

server.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`[figma-bridge] listening on http://${host}:${port}`);
});

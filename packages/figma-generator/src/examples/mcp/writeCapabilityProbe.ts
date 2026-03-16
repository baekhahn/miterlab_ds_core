import path from "node:path";
import { createHttpMcpClient } from "../../mcp/client/httpMcpClient";

export const runWriteCapabilityProbe = async () => {
  const endpoint = process.env.MCP_ENDPOINT;
  const token = process.env.MCP_TOKEN;

  if (!endpoint) {
    throw new Error("MCP_ENDPOINT is not set");
  }

  const client = createHttpMcpClient({ endpoint, token });
  await client.initialize();
  const capabilities = await client.discoverCapabilities();

  const summary = {
    mode: capabilities.mode,
    writableTools: capabilities.tools.filter((tool) => tool.writable).map((tool) => tool.name),
    note:
      capabilities.mode === "readOnly"
        ? "No create/update tool is exposed by this MCP server. Write generation is unavailable in current endpoint."
        : "Writable-style tool(s) detected. Next step is mapping DS payload to those tool signatures."
  };

  const artifactPath = path.resolve(process.cwd(), "artifacts/mcp/write-capability-summary.json");
  await import("node:fs").then((fs) => {
    fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
    fs.writeFileSync(artifactPath, `${JSON.stringify(summary, null, 2)}\n`, "utf-8");
  });

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(summary, null, 2));

  return summary;
};

runWriteCapabilityProbe().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

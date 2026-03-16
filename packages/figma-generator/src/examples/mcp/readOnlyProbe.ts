import path from "node:path";
import { executeWithFallback } from "../../mcp/executeWithFallback";

export const runReadOnlyProbe = async () => {
  const endpoint = process.env.MCP_ENDPOINT;
  const token = process.env.MCP_TOKEN;

  if (!endpoint) {
    throw new Error("MCP_ENDPOINT is not set");
  }

  const result = await executeWithFallback({
    config: { endpoint, token },
    outputDir: path.resolve(process.cwd(), "artifacts/mcp")
  });

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result, null, 2));
  return result;
};

runReadOnlyProbe().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

import { createMcpSession } from "./mcpSession";
import { discoverCapabilities } from "../discoverCapabilities";
import { executeWithFallback } from "../executeWithFallback";
export const createHttpMcpClient = (config) => {
    const session = createMcpSession(config);
    return {
        session,
        async initialize() {
            return await session.initialize();
        },
        async listTools() {
            return await session.listTools();
        },
        async callTool(name, args = {}) {
            return await session.callTool(name, args);
        },
        async discoverCapabilities() {
            const tools = await session.listTools();
            return discoverCapabilities(tools.tools);
        },
        async executeWithFallback(payload, outputDir) {
            return await executeWithFallback({
                config,
                payload,
                outputDir
            });
        }
    };
};

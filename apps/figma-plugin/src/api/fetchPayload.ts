import type { FigmaWritePayload } from "../types";
import type { DesignPrompt } from "../types";

export const fetchPayload = async (bridgeUrl: string, screen: string, theme: string): Promise<FigmaWritePayload> => {
  const response = await fetch(`${bridgeUrl}/generate-screen`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ screen, theme })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Bridge request failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as { payload: FigmaWritePayload };
  if (!data.payload) {
    throw new Error("Invalid bridge response: payload is missing");
  }

  return data.payload;
};

export const fetchPayloadFromPrompt = async (bridgeUrl: string, prompt: DesignPrompt): Promise<FigmaWritePayload> => {
  const response = await fetch(`${bridgeUrl}/generate-from-prompt`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Bridge request failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as { payload: FigmaWritePayload };
  if (!data.payload) {
    throw new Error("Invalid bridge response: payload is missing");
  }

  return data.payload;
};

export const saveExtractionArtifact = async (
  bridgeUrl: string,
  body: {
    extractionKey: string;
    extractionName: string;
    snapshot: unknown;
    inputBlueprint?: unknown;
    rawComponent?: unknown;
  }
): Promise<{ saved: string[] }> => {
  const response = await fetch(`${bridgeUrl}/save-extraction`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Bridge request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as { saved: string[] };
};

export const loadExtractionArtifact = async (
  bridgeUrl: string,
  extractionKey: string
): Promise<{ key: string; raw: unknown }> => {
  const response = await fetch(`${bridgeUrl}/load-extraction`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ extractionKey })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Bridge request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as { key: string; raw: unknown };
};

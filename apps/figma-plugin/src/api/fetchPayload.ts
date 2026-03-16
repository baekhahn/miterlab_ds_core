import type { FigmaWritePayload } from "../types";

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

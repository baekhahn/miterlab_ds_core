import { evaluateScreen } from "../../evaluation/evaluateScreen";
import type { LayoutFrameNode } from "../../types/layout";
import type { McpPayload } from "../../mcp/types";

export const evaluateLoginBad = () => {
  const badLayout: LayoutFrameNode = {
    type: "frame",
    name: "Login Bad",
    width: 390,
    height: 844,
    children: [
      {
        type: "stack",
        name: "header-section",
        x: 24,
        y: 32,
        direction: "vertical",
        gap: 8,
        children: []
      },
      {
        type: "stack",
        name: "header-section",
        x: 24,
        y: 40,
        direction: "vertical",
        gap: 8,
        children: [
          {
            type: "component",
            name: "signin",
            component: "button",
            props: { variant: "main", size: "xl", state: "active", tone: "danger" }
          }
        ]
      }
    ]
  };

  const badPayload: McpPayload = {
    document: { name: "Bad", screen: "login", theme: "alpha" },
    nodes: [
      {
        id: "1",
        type: "INSTANCE",
        name: "signin",
        x: 0,
        y: 0,
        width: 100,
        height: 40,
        component: "button",
        variant: { variant: "main", size: "xl", state: "active", tone: "danger" }
      }
    ],
    frames: [],
    components: [
      { id: "1", name: "signin", component: "button", variant: { variant: "main", size: "xl", state: "active", tone: "danger" } }
    ],
    variables: { "1.container.background": "Foundation/color/blue500" },
    styles: {},
    modes: { brand: "", theme: "" },
    metadata: { source: "miterlab-figma-generator", version: "0.1.0", generatedAt: new Date().toISOString() }
  };

  return evaluateScreen({ screen: "login", layout: badLayout, payload: badPayload });
};

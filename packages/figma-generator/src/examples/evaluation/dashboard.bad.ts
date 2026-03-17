import { evaluateScreen } from "../../evaluation/evaluateScreen";
import type { LayoutFrameNode } from "../../types/layout";

export const evaluateDashboardBad = () => {
  const badLayout: LayoutFrameNode = {
    type: "frame",
    name: "Dashboard Bad",
    width: 390,
    height: 844,
    children: [
      {
        type: "stack",
        name: "action-section",
        x: 24,
        y: 20,
        direction: "vertical",
        gap: 4,
        children: [
          {
            type: "component",
            name: "newReport",
            component: "button",
            props: { variant: "primary", size: "md", state: "default" }
          },
          {
            type: "component",
            name: "secondary1",
            component: "button",
            props: { variant: "neutral", size: "md", state: "default" }
          },
          {
            type: "component",
            name: "secondary2",
            component: "button",
            props: { variant: "neutral", size: "md", state: "default" }
          },
          {
            type: "component",
            name: "secondary3",
            component: "button",
            props: { variant: "neutral", size: "md", state: "default" }
          }
        ]
      }
    ]
  };

  return evaluateScreen({ screen: "dashboard", layout: badLayout });
};

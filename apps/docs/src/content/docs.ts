import intro from "../../content/introduction/overview.md?raw";
import principles from "../../content/principles/principles.md?raw";
import tokens from "../../content/tokens/tokens.md?raw";
import themes from "../../content/themes/themes.md?raw";
import components from "../../content/components/components.md?raw";
import patterns from "../../content/patterns/patterns.md?raw";
import contribution from "../../content/contribution/contribution.md?raw";

export const docsMarkdownById: Record<string, string> = {
  introduction: intro,
  principles,
  tokens,
  themes,
  components,
  patterns,
  contribution
};

import type {
  MarkdownIt,
  MarkdownOptions,
  PluginSimple,
} from "npm:markdown-it@14.1.0";
// NOTE: import with `mjs` is needed
import Token from "npm:markdown-it@14.1.0/lib/token.mjs";

const replaceLink = (token: Token) => {
  if (token.type !== "inline") {
    return;
  }

  const children = token.children;

  if (children == null) {
    return;
  }

  if (!URL.canParse(token.content)) {
    return;
  }

  const newToken = new Token("html_inline", "", 0);
  newToken.content = "<a>I replaced this</a>";
  token.children = [
    newToken,
  ];
};

const linkifyToCard: PluginSimple = (
  md: MarkdownIt,
  options?: MarkdownOptions,
) => {
  md.core.ruler.after(
    "replacements",
    "linkly-to-card",
    ({ tokens }: { tokens: Token[] }) => {
      tokens.forEach(replaceLink);
      return true;
    },
  );
};

export default linkifyToCard;

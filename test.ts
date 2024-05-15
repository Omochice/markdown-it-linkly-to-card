import MarkdownIt from "npm:markdown-it@14.1.0";
import plugin from "./mod.ts";

const md = MarkdownIt({
  html: true,
}).use(plugin);

const txt = `
https://www.google.com

foo bar as https://www.google.com foo bar

- https://www.google.com
- foo https://www.google.com
`;

console.log(md.render(txt));

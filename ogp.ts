import { JSDOM } from "npm:jsdom@24.0.0";

export const fetchOgp = async (url: string): Promise<Ogp> => {
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error("Failed to fetch");
  }
  const dom = new JSDOM(await r.text());
  const metas = Array.from(
    dom.window.document.querySelectorAll("meta"),
  )
    .filter((m: HTMLMetaElement) =>
      (m.getAttribute("property") ?? "").startsWith("og:")
    );
  for (const meta of metas) {
    console.log(meta.getAttribute("property"));
  }
  // const t = await r.text();
  // console.log(t)
  // const parsed = parseFromString(t);
  // console.log(parsed.getElementsByTagName("meta"));
  //
  // return {
  //   url: url,
  //   title: "title",
  //   description: "description",
  //   image: "image",
  // };
};

await fetchOgp("https://zenn.dev");

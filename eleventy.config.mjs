// The public site: Markdown pages under `site/`, one Nunjucks layout set, built to `_site/`.
// PATH_PREFIX comes from the Pages workflow (`actions/configure-pages`); it is `/` on the custom
// domain edlc.tutelage.au, so nothing here hardcodes a repository name.

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Where a stage page's body splits: the opening above it, the page's own further sections below it.
// The stage template renders What happens, the artefact and gate, and At the gate, ask in between.
const STAGE_MARK = /<!-- stage-data\b[^>]*-->/;

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "site/CNAME": "CNAME" });

  // Stage pages carry `stage: <number>`; this finds the stage's record in `_data/stages.js`.
  eleventyConfig.addFilter("stageByNumber", (stages, n) => stages.find((s) => s.n === Number(n)));

  // A stage page's rendered body as [opening, rest]. Without the marker, the whole body is the opening.
  eleventyConfig.addFilter("stageBody", (html) => {
    const [opening, ...rest] = String(html).split(STAGE_MARK);
    return [opening, rest.join("")];
  });

  // The site's own Markdown library (so links, emphasis and heading ids behave as on every page).
  let md;
  eleventyConfig.amendLibrary("md", (lib) => {
    md = lib;
    // Every Markdown heading gets a slug id, so sections can be linked (`/paper/#6-cross-cutting-practices`).
    lib.core.ruler.push("heading_ids", (state) => {
      state.tokens.forEach((token, i) => {
        if (token.type !== "heading_open" || token.attrGet("id")) return;
        const text = state.tokens[i + 1].children.map((t) => t.content).join("");
        token.attrSet("id", slug(text));
      });
    });
  });
  // One line of inline Markdown from `_data` (a stage's `happens` and `ask` items), as HTML.
  eleventyConfig.addFilter("mdInline", (text) => md.renderInline(String(text)));

  // Main navigation: an item is current on its own URL and on the URLs it lists in `also`.
  eleventyConfig.addFilter("navCurrent", (item, url) =>
    [item.url, ...(item.also || [])].some((prefix) => String(url || "").startsWith(prefix)),
  );

  // "On this page": the page's <h2 id> headings as a list of links, for pages with `toc: true`.
  eleventyConfig.addFilter("toc", (html) =>
    [...String(html).matchAll(/<h2\b[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
      id: m[1],
      text: m[2].replace(/<[^>]+>/g, "").trim(),
    })),
  );

  // Wide tables scroll inside their own box at phone width, never the page.
  eleventyConfig.addTransform("table-wrap", (content, outputPath) =>
    outputPath?.endsWith(".html")
      ? content.replace(/<table>/g, '<div class="table"><table>').replace(/<\/table>/g, "</table></div>")
      : content,
  );

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: "site", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}

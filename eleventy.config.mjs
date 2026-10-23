// The public site: Markdown pages under `site/`, one Nunjucks layout set, built to `_site/`.
// PATH_PREFIX comes from the Pages workflow (`actions/configure-pages`); it is `/` on the custom
// domain edlc.tutelage.au, so nothing here hardcodes a repository name.

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "site/CNAME": "CNAME" });

  // Stage pages carry `stage: <number>`; this finds the stage's record in `_data/stages.js`.
  eleventyConfig.addFilter("stageByNumber", (stages, n) => stages.find((s) => s.n === Number(n)));

  // Every Markdown heading gets a slug id, so sections can be linked (`/paper/#6-cross-cutting-practices`).
  eleventyConfig.amendLibrary("md", (md) => {
    md.core.ruler.push("heading_ids", (state) => {
      state.tokens.forEach((token, i) => {
        if (token.type !== "heading_open" || token.attrGet("id")) return;
        const text = state.tokens[i + 1].children.map((t) => t.content).join("");
        token.attrSet("id", slug(text));
      });
    });
  });

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

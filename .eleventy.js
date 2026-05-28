const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
    // Prefix links with the repository name automatically
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPassthroughCopy("assets/");
    eleventyConfig.addPassthroughCopy("css/");
    eleventyConfig.addWatchTarget("css/");
    return {
        dir: {
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ["md","njk","html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
    };
}

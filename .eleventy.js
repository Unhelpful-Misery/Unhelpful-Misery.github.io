module.exports = function(eleventyConfig) {
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

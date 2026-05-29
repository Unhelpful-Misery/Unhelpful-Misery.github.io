module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets/");
    eleventyConfig.addPassthroughCopy("css/");
    eleventyConfig.addWatchTarget("css/");
    eleventyConfig.addPassthroughCopy("js/");
    eleventyConfig.addWatchTarget("js/");

    eleventyConfig.addShortcode("downloadables", function(names,files) {
        if(!Array.isArray(names)) { return ''; }
        if(!Array.isArray(files)) { return ''; }
        let content_blocks = "";
        for (let i = 0; i < names.length; i++) {
            content_blocks += `<div class="centered_content"> \n`;
            content_blocks += `<p><u>${names[i]}</u></p> <a href="${files[i]}" download="${names[i]}"><button class="button button1">Download</button></a> \n`;
            content_blocks += `</div> \n`;
        }
        return content_blocks;
    });

    eleventyConfig.addShortcode("multiple_centered_images", function(images, captions, alt_text = [""], widths = ["100%"], heights = ["100%"]) {
        if(!Array.isArray(images)) { return ''; }
        if(!Array.isArray(captions)) { return ''; }
        if(alt_text.length != images.length) { widths = new Array(images.length).fill(""); }
        if(widths.length != images.length) { widths = new Array(images.length).fill("100%"); }
        if(heights.length != images.length) { heights = new Array(images.length).fill("100%"); }
        let content_block = `<div class="centered_content"> <div class="multiple-images">`;
        for (let i = 0; i < images.length; i++) {
            content_block += `<figure> <img style="width:${widths[i]}; height:${heights[i]}" src="${images[i]}" alt="${alt_text[i]}"/> \n`;
            content_block += `<figcaption>${captions[i]}</figcaption> </figure> \n`;
        }
        content_block+= `</div> </div>`;
        return content_block;
    });

    eleventyConfig.addShortcode("centered_table", function(rows, cols) {
        if(!Array.isArray(rows)) { return ''; }
        let content_block = `<div class="centered_content"> <table>`;
        for (let i = 0; i < rows.length; i++) {
            content_block += `<tr> \n`;
            for (let j = 0; j < rows[0].length; j++) {
                content_block += `<td>${rows[i][j]}</td>`;
            }
            content_block += `</tr>`;
        }
        content_block += `</table> </div>`;
        return content_block;
    });

    eleventyConfig.addShortcode("YouTube_carousel", function(vidIDs, titles = [""], captions = [""]) {
        if(titles.length != vidIDS.length) { titles = new Array(vidIDS.length).fill(""); }
        if(captions.length != vidIDS.length) { captions = new Array(vidIDS.length).fill(""); }
        let content_block = `<div class="default_content"> <div class="component"> <button class="carousel_slide_button" onclick="goLeft()">⮜</button> <div class="carousel">`;
        for (let i = 0; i < vidIDS.length; i++) {
            content_block += `<div class="slide"> <figure class="carousel_figure">`;

        }
    });

    eleventyConfig.addShortcode("footnote", function(text, top_padding = "0px") {
        return `<div class="footnote_wrapper" style="padding-top: ${top_padding}">
        <p class="footnote">${text}</p>
        </div>`
    });

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

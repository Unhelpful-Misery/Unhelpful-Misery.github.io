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
        content_blocks += `<div class="centered_content"> \n`;
        for (let i = 0; i < names.length; i++) {
            content_blocks += `<a href="${files[i]}" download="${names[i]}"><button class="button button1">Download ${names[i]}</button></a> \n`;
        }
        content_blocks += `</div> \n`;
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

    eleventyConfig.addShortcode("YouTube_carousel", function(uniqueCarouselID, vidIDs, titles = [""], captions = [""], button_space="20vw") {
        if(titles.length != vidIDs.length) { titles = new Array(vidIDs.length).fill(""); }
        if(captions.length != vidIDs.length) { captions = new Array(vidIDs.length).fill(""); }
        if(!Array.isArray(vidIDs)) { return ''; }
        if(vidIDs.length === 0) { return ''; }
        //Add top content
        let content_block = `<style>.carousel_indicator.${"current-slide"+uniqueCarouselID} { background: rgb(236, 239, 235);} </style>`
        content_block += `<div class="carousel_surround_component">
        <button class="carousel_slide_left_button" id="${"carousel_slide_left_button"+uniqueCarouselID}" disabled style="left:${button_space};">⮜</button>
        <div class="carousel">
            <div class="carousel_track-container">
                <ul class="carousel_track" id="${"carousel_track"+uniqueCarouselID}">`;
        //Add first carousel element
        content_block += `<li class="carousel_slide ${"current-slide"+uniqueCarouselID}">
                        <p class="figureCaption">${titles[0]}</p>
                        <iframe
                        src="https://www.youtube.com/embed/${vidIDs[0]}">
                        </iframe>                    
                        <p class="figure_small_caption">${captions[0]}</p>
                    </li>`;
        for (let i = 1; i < vidIDs.length; i++) {
            content_block += `<li class="carousel_slide">
                        <p class="figureCaption">${titles[i]}</p>
                        <iframe 
                        src="https://www.youtube.com/embed/${vidIDs[i]}">
                        </iframe>
                        <p class="figure_small_caption">${captions[i]}</p>
                    </li>`;
        }
        content_block += `</ul></div><div class="carousel_nav" id="${"carousel_nav"+uniqueCarouselID}"> <button class="carousel_indicator ${"current-slide"+uniqueCarouselID}"></button>`;
        for (let i = 1; i < vidIDs.length; i++) {
            content_block += `<button class="carousel_indicator"></button>`;
        }
        content_block += `</div></div><button class="carousel_slide_right_button" id="${"carousel_slide_right_button"+uniqueCarouselID}" style="right:${button_space};"">⮞</button></div>`;
        content_block += `<script>
        /*Thank you to https://www.youtube.com/watch?v=gBzsE0oieio for providing a wonderful tutorial on how this code works! 
        I used to have this horrendous Frankenstein monster of a JS script based on a very bad understanding of JS, and this is much cleaner. 
        I only modified the code a little bit from what was shown in the tutorial*/
        const ${"track"+uniqueCarouselID} = ${"carousel_track"+uniqueCarouselID};
        const ${"slides"+uniqueCarouselID} = Array.from(${"track"+uniqueCarouselID}.children);
        const ${"nextButton"+uniqueCarouselID} = ${"carousel_slide_right_button"+uniqueCarouselID};
        const ${"prevButton"+uniqueCarouselID} = ${"carousel_slide_left_button"+uniqueCarouselID};
        const ${"dotsNav"+uniqueCarouselID} = ${"carousel_nav"+uniqueCarouselID};
        const ${"dots"+uniqueCarouselID} = Array.from(${"dotsNav"+uniqueCarouselID}.children);
        const ${"slideWidth"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}[0].getBoundingClientRect().width;
        

        //arrange the slides next to one another
        const ${"setSlidePosition"+uniqueCarouselID} = (slide, index) => {
            slide.style.left = ${"slideWidth"+uniqueCarouselID} * index + 'px';
        }
        ${"slides"+uniqueCarouselID}.forEach(${"setSlidePosition"+uniqueCarouselID});

        const ${"moveToSlide"+uniqueCarouselID} = (${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"targetSlide"+uniqueCarouselID}) => {
            ${"track"+uniqueCarouselID}.style.transform = 'translateX(-' + ${"targetSlide"+uniqueCarouselID}.style.left + ')';
            ${"currentSlide"+uniqueCarouselID}.classList.remove('${"current-slide"+uniqueCarouselID}');
            ${"targetSlide"+uniqueCarouselID}.classList.add('${"current-slide"+uniqueCarouselID}');
        }

        const ${"updateDots"+uniqueCarouselID} = (${"currentDot"+uniqueCarouselID}, ${"targetDot"+uniqueCarouselID}) => { 
            ${"currentDot"+uniqueCarouselID}.classList.remove('${"current-slide"+uniqueCarouselID}');
            ${"targetDot"+uniqueCarouselID}.classList.add('${"current-slide"+uniqueCarouselID}');
        }

        const ${"disableAppropriateArrows"+uniqueCarouselID} = (${"targetIndex"+uniqueCarouselID}) => {
            if (${"targetIndex"+uniqueCarouselID} === 0) {
                ${"prevButton"+uniqueCarouselID}.disabled = true;
                ${"nextButton"+uniqueCarouselID}.disabled = false;
            }
            else if (${"targetIndex"+uniqueCarouselID} === ${"slides"+uniqueCarouselID}.length-1) {
                ${"nextButton"+uniqueCarouselID}.disabled = true;
                ${"prevButton"+uniqueCarouselID}.disabled = false;
            }
            else {
                ${"nextButton"+uniqueCarouselID}.disabled = false;
                ${"prevButton"+uniqueCarouselID}.disabled = false;
            }
        }

        //when I click left, move slides to the left
        ${"prevButton"+uniqueCarouselID}.addEventListener('click', e=> {
            const ${"currentSlide"+uniqueCarouselID} = ${"track"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"prevSlide"+uniqueCarouselID} = ${"currentSlide"+uniqueCarouselID}.previousElementSibling;
            const ${"currentDot"+uniqueCarouselID} = ${"dotsNav"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"prevDot"+uniqueCarouselID} = ${"currentDot"+uniqueCarouselID}.previousElementSibling;
            const ${"prevIndex"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}.findIndex(slide => slide === ${"prevSlide"+uniqueCarouselID});

            ${"moveToSlide"+uniqueCarouselID}(${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"prevSlide"+uniqueCarouselID});
            ${"updateDots"+uniqueCarouselID}(${"currentDot"+uniqueCarouselID}, ${"prevDot"+uniqueCarouselID});
            ${"disableAppropriateArrows"+uniqueCarouselID}(${"prevIndex"+uniqueCarouselID});
        })

        //when I click right, move slides to the right
        ${"nextButton"+uniqueCarouselID}.addEventListener('click', e=> {
            const ${"currentSlide"+uniqueCarouselID} = ${"track"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"nextSlide"+uniqueCarouselID} = ${"currentSlide"+uniqueCarouselID}.nextElementSibling;
            const ${"currentDot"+uniqueCarouselID} = ${"dotsNav"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"nextDot"+uniqueCarouselID} = ${"currentDot"+uniqueCarouselID}.nextElementSibling;
            const ${"nextIndex"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}.findIndex(slide => slide === ${"nextSlide"+uniqueCarouselID});

            ${"moveToSlide"+uniqueCarouselID}(${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"nextSlide"+uniqueCarouselID});
            ${"updateDots"+uniqueCarouselID}(${"currentDot"+uniqueCarouselID}, ${"nextDot"+uniqueCarouselID});
            ${"disableAppropriateArrows"+uniqueCarouselID}(${"nextIndex"+uniqueCarouselID});
        })

        //when I click the nav indicators, move to that slide
        ${"dotsNav"+uniqueCarouselID}.addEventListener('click', e=> {
            //what indicator was clicked on?
            const ${"targetDot"+uniqueCarouselID} = e.target.closest('button');
            
            if (!${"targetDot"+uniqueCarouselID}) return;

            const ${"currentSlide"+uniqueCarouselID} = ${"track"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"currentDot"+uniqueCarouselID} = ${"dotsNav"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"targetIndex"+uniqueCarouselID} = ${"dots"+uniqueCarouselID}.findIndex(dot => dot === ${"targetDot"+uniqueCarouselID});
            const ${"targetSlide"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}[${"targetIndex"+uniqueCarouselID}];

            ${"moveToSlide"+uniqueCarouselID}(${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"targetSlide"+uniqueCarouselID});
            ${"updateDots"+uniqueCarouselID}(${"currentDot"+uniqueCarouselID}, ${"targetDot"+uniqueCarouselID});
            ${"disableAppropriateArrows"+uniqueCarouselID}(${"targetIndex"+uniqueCarouselID});
        })
    </script>`
        return content_block;
    });

    eleventyConfig.addShortcode("YouTube_carousel_lessCSS", function(vidIDs, titles=[""],captions=[""]) {
        if(titles.length != vidIDs.length) { titles = new Array(vidIDs.length).fill(""); }
        if(captions.length != vidIDs.length) { captions = new Array(vidIDs.length).fill(""); }
        if(!Array.isArray(vidIDs)) { return ''; }
        if(vidIDs.length === 0) { return ''; }
        let content_block = "";
        for (let i = 0; i < vidIDs.length; i++) {
            content_block += `<div class=""centered_content>
                <p class="figureCaption" id="${titles[i]}">${titles[i]}</p></br>
            </div>
            <div class="centered_content">
                <iframe style="width: 50vw; height: 29vw"
                src="https://www.youtube.com/embed/${vidIDs[i]}">
                </iframe>
            </div>
            <div class=""centered_content>
                <p class="figure_small_caption">${captions[i]}</p></br>
            </div>`;
        }
        return content_block;
    });

    eleventyConfig.addShortcode("footnote", function(text, top_padding = "0px") {
        return `<div class="footnote_wrapper" style="padding-top: ${top_padding}">
        <p class="footnote">${text}</p>
        </div>`
    });

    eleventyConfig.addShortcode("lessCSSBackButton", function(link, text="Go Back") {
        return `<hr>
        <p><a href="${link}" style="color:rgb(33, 86, 165)">← ${text}</p></a>
        <hr>`
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

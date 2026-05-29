/*Thank you to https://www.youtube.com/watch?v=gBzsE0oieio for providing a wonderful tutorial on how this code works! 
I used to have this horrendous Frankenstein monster of a JS script based on a very bad understanding of JS, and this is much cleaner*/
const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_slide_right_button');
const prevButton = document.querySelector('.carousel_slide_left_button');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => { 
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const disableAppropriateArrows = (targetIndex) => {
    if (targetIndex === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
    }
    else if (targetIndex === slides.length-1) {
        nextButton.disabled = true;
        prevButton.disabled = false;
    }
    else {
        nextButton.disabled = false;
        prevButton.disabled = false;
    }
}

//when I click left, move slides to the left
prevButton.addEventListener('click', e=> {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    disableAppropriateArrows(prevIndex);
})

//when I click right, move slides to the right
nextButton.addEventListener('click', e=> {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    disableAppropriateArrows(nextIndex);
})

//when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e=> {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button');
    
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    disableAppropriateArrows(targetIndex);
})
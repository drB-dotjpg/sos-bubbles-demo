const pwidth = 1920;
const pheight = 2700;
const numBubbles = 36;



const bubbleTemplate = '<div class="bubble"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><filter x="0" y="0" width="100%" height="100%"><feTurbulence class="sea-filter" numOctaves="1" seed="2" baseFrequency="0.02"></feTurbulence><feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap></filter><circle class="circle-svg" cx="40" cy="40" r="40" fill="#6E9AA3" fill-opacity="0.25""/></svg></div>'
const pageWrapper = document.querySelector(".page-wrapper");

pageWrapper.innerHTML = bubbleTemplate.repeat(numBubbles);

const bubbles = document.querySelectorAll(".bubble");



bubbles.forEach((bubble, num) => {
    bubble.id = "bubble-" + num;

    const filter = bubble.querySelector(".sea-filter");
    filter.id = "filter-" + num;

    const filterParent = bubble.querySelector("filter");
    filterParent.id = "filter-par-" + num;

    const circleSvg = bubble.querySelector(".circle-svg");
    circleSvg.setAttribute("filter", `url("#${filterParent.id}")`);

    initBubble(bubble.id, filter.id, num / 2);
});



function initBubble(id, filterId, overrideDelay = 0){
    const bubble = document.querySelector("#"+id);
    const filter = document.querySelector("#"+filterId);
    console.log(filter)

    filter.setAttribute("seed", getRandomNum(0, 999));

    bubble.style.transform = `translate3d(0px, 0px, 0px)`;
    bubble.style.left = `${getRandomNum(-50, pwidth+50)}px`
    bubble.style.opacity = getRandomNum(.6, 1);

    const duration = getRandomInt(8,13);
    const delay = overrideDelay == 0 ? getRandomNum(0,3) : overrideDelay;
    const scale = getRandomNum(.6, .9);
    const horMovement = getRandomInt(25,200);
    const horDuration = getRandomInt(3,5);

    const horTl = gsap.timeline({repeat: ((duration+delay)/horDuration)});
    horTl.fromTo(bubble, {x: -horMovement}, {duration: horDuration, x: horMovement, ease: 'sine.inOut'});
    horTl.to(bubble, {duration: horDuration, x: -horMovement, ease: 'sine.inOut'});

    gsap.fromTo(bubble, {y: pheight+100, scale: scale}, {y: -100, scale: scale, duration: duration, delay: delay, ease: 'none', onComplete: () => {
        initBubble(id, filterId);
    }});
    gsap.fromTo(filter, {attr:{"baseFrequency": 0.05}}, {attr:{"baseFrequency": 0.3}, duration: duration, delay: delay, ease: 'none'})
}

//min and max inclusive
function getRandomNum(min, max){
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max){
    return Math.floor(getRandomNum(min-1, max) + 1);
}
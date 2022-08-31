const pwidth = 1920;
const pheight = 2700;
const numBubbles = 36;



const bubbleTemplate = '<div class="bubble"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circle-svg" cx="40" cy="40" r="40" fill="#6E9AA3" fill-opacity="0.25""/></svg></div>'
const pageWrapper = document.querySelector(".page-wrapper");

pageWrapper.innerHTML = bubbleTemplate.repeat(numBubbles);

const bubbles = document.querySelectorAll(".bubble");



bubbles.forEach((bubble, num) => {
    bubble.id = "bubble-" + num;
    initBubble(bubble.id, num / 2);
});



function initBubble(id, overrideDelay = 0){
    const bubble = document.querySelector("#"+id);

    bubble.style.transform = `translate3d(0px, 0px, 0px)`;
    bubble.style.left = `${getRandomNum(-50, pwidth+50)}px`
    bubble.style.opacity = getRandomNum(.6, 1);

    const duration = getRandomInt(8,13);
    const delay = overrideDelay == 0 ? getRandomNum(0,3) : overrideDelay;
    const scale = getRandomNum(.4, .9);
    const horMovement = getRandomInt(25,200);
    const horDuration = getRandomInt(3,5);

    const horTl = gsap.timeline({repeat: ((duration+delay)/horDuration)});
    horTl.fromTo(bubble, {x: -horMovement}, {duration: horDuration, x: horMovement, ease: 'sine.inOut'});
    horTl.to(bubble, {duration: horDuration, x: -horMovement, ease: 'sine.inOut'});

    gsap.fromTo(bubble, {y: pheight+100, scale: scale}, {y: -100, scale: scale, duration: duration, delay: delay, ease: 'none', onComplete: () => {
        initBubble(id);
    }});
}

//min and max inclusive
function getRandomNum(min, max){
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max){
    return Math.floor(getRandomNum(min-1, max) + 1);
}


var isTranstioned = false;
document.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        gsap.to(".page-wrapper", {y: (isTranstioned ? 0 : -(1080+540)), duration: 2, ease: "Power2.easeInOut"});
        isTranstioned = !isTranstioned;
    }
})

const pwidth = 1920;
const pheight = 2700;
const numBubbles = 36;



const bubbleTemplate = '<div class="bubble"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circle-svg" cx="40" cy="40" r="40" fill="#6E9AA3" fill-opacity="0.25""/></svg></div>'
const bubblesWrapper = document.querySelector("#bubbles-wrapper");

bubblesWrapper.innerHTML = bubblesWrapper.innerHTML + bubbleTemplate.repeat(numBubbles);

const bubbles = document.querySelectorAll(".bubble");

// gsap.to("#sea-filter", {duration: 15, attr:{baseFrequency: 0.012}, repeat: -1, yoyo: true, ease: "Sine.easeInOut"});

bubbles.forEach((bubble, num) => {
    bubble.id = "bubble-" + num;
    initBubble(bubble.id, num / 2);
});



function initBubble(id, overrideDelay = 0){
    const bubble = document.querySelector("#"+id);

    bubble.style.left = `${getRandomNum(-50, pwidth+50)}px`

    const blur = getRandomInt(2,19);
    bubble.style.filter = `blur(${blur}px)`;

    const duration = getRandomInt(8,13);
    const delay = overrideDelay == 0 ? getRandomNum(0,6) : overrideDelay;
    const scale = getRandomNum(.3, .9);
    const opacity = getRandomNum(.7, 1);
    const horMovement = getRandomInt(15,140);
    const horDuration = getRandomInt(3,5);

    const horTl = gsap.timeline({repeat: ((duration+delay)/horDuration)});
    horTl.fromTo(bubble, {x: -horMovement}, {duration: horDuration, x: horMovement, ease: 'sine.inOut'});
    horTl.to(bubble, {duration: horDuration, x: -horMovement, ease: 'sine.inOut'});

    gsap.fromTo(bubble, {y: pheight+100, scale: scale, opacity: opacity}, {y: -100, scale: scale, opacity: getRandomNum(.1, .4), duration: duration, delay: delay, ease: 'none', onComplete: () => {
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
        const tl = gsap.timeline();
        if (isTranstioned){
            tl.to("#bottom-img", {scale:.8, opacity:0, webkitFilter:"blur(20px)", duration: .75, ease: "Power1.easeIn"});
            tl.to(".page-wrapper", {y: 0, duration: 2, ease: "Power2.easeInOut"});
            tl.fromTo("#top-img", {scale:.8, opacity:0, webkitFilter:"blur(20px)"}, {duration: .75, scale: 1, opacity: 1, webkitFilter:"blur(0px)", ease: "Power1.easeOut"});
        } else {
            tl.to("#top-img", {scale:.8, opacity:0, webkitFilter:"blur(20px)", duration: .75, ease: "Power1.easeIn"});
            tl.to(".page-wrapper", {y: -(1080+540), duration: 2, ease: "Power2.easeInOut"});
            tl.fromTo("#bottom-img", {scale:.8, opacity:0, webkitFilter:"blur(20px)"}, {duration: .75, scale: 1, opacity: 1, webkitFilter:"blur(0px)", ease: "Power1.easeOut"});
        }
        isTranstioned = !isTranstioned;
    }
    if (event.key === "h"){
        const topimg = document.getElementById("top-img");
        const bottomimg = document.getElementById("bottom-img");
        if (topimg.style.display != "none"){
            topimg.style.display = "none";
            bottomimg.style.display = "none";
        } else {
            topimg.style.display = "block";
            bottomimg.style.display = "block";
        }
    }
})

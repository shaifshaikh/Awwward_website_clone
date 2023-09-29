//ye cdn code hai locomotive js github
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//mouse bekar ho jaa rha haoi skew ke baad wapas circle nhi hora
var timeout;

// scroll mouse follower
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        // console.log(dets.clientX,dets.clientY);
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`
    })
}

//animation using gsap 
function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
        .to(".boundingelem", {
            y: "0",

            duration: 1.5,
            ease: Expo.easeInOut,
            //stagger delay dalega aage ke element me
            stagger: .2,
            delay: -1
        })
        .from("#hero-footer", {
            y: "-10",
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
            delay: -.1
        })
}

//jab mouse move ho to wo pointer skew ho jaye...max and min skew define kar paye
function cursorSkew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timeout);

        //define defalut scale value
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        // var xdiff = dets.clientX - xprev;
        // var ydiff = dets.clientY - yprev;
        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(xscale, yscale)
        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`


        }, 100);


    });

}

document.querySelectorAll(".elem").forEach(function (elem) {
        var rotate =0;
        var diffrot = 0;
    elem.addEventListener("mousemove", function (dets) {
        console.log(dets.clientX,dets.clientY);
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
     
        var diff = -30;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot),
            
        });

    });
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
        })

    })
});

// var datentime = document.querySelector(".dt");
// datentime.addEventListener("click",function(){
//     let today = new Date();
//     let month = today.getMonth() + 1;
//     let year = today.getFullYear();
//     let date = today.getDate();
// })


cursorSkew();
circleMouseFollower();
firstPageAnim();


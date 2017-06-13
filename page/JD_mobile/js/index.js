window.onload= function () {
    header();
    ckTimer();
    move();
}
function header() {
    var header=document.querySelector(".header");
    var banner=document.querySelector(".banner");
    var bannerHeight=banner.offsetHeight;
    window.onscroll= function () {
        var sTop= document.body.scrollTop;
        if(sTop<bannerHeight) {
            var bili=sTop/bannerHeight;
            header.style.backgroundColor="rgba(235,35,34,"+bili+")";
        } else if (sTop>=bannerHeight) {
            header.style.backgroundColor="rgba(235,35,34,1)";
        }
    }
}
function ckTimer() {
    var timer=document.querySelector(".timer");
    var spans=document.querySelectorAll(".timer span");
    var total=3700;
    var timerId=setInterval(function () {
        total--
        if(total<0) {
            clearInterval(timerId);
            return;
        }
        var hour=Math.floor(total/3600);
        hour=hour<10?"0"+hour:hour;
        var minute=Math.floor(total%3600/60);
        minute=minute<10?"0"+minute:minute;
        var second=Math.floor(total%60);
        second=second<10?"0"+second:second;
        spans[0].innerText=Math.floor(hour/10);
        spans[1].innerText=Math.floor(hour%10);
        spans[3].innerText=Math.floor(minute/10);
        spans[4].innerText=Math.floor(minute%10);
        spans[6].innerText=Math.floor(second/10);
        spans[7].innerText=Math.floor(second%10);
    },1000)
}
function move() {
    var banner=document.querySelector(".banner");
    var bannerWidth=banner.offsetWidth;
    var imgBox=document.querySelector(".banner ul");
    var firstImg=imgBox.querySelector("li:first-of-type");
    var lastImg=imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(firstImg.cloneNode(true));
    imgBox.insertBefore(lastImg.cloneNode(true),firstImg);
    var lis=imgBox.querySelectorAll("li");
    var currentWidth=bannerWidth*lis.length;
    imgBox.style.width=currentWidth+"px";
    for(var i=0;i<lis.length;i++) {
        lis[i].style.width=bannerWidth+"px";
    }
    imgBox.style.left=-bannerWidth+"px";
    window.onresize= function () {
        bannerWidth=banner.offsetWidth;
        currentWidth=bannerWidth*lis.length;
        imgBox.style.width=currentWidth+"px";
        for(var i=0;i<lis.length;i++) {
            lis[i].style.width=bannerWidth+"px";
        }
        imgBox.style.left=-(index*bannerWidth)+"px";
    }
    var index=1;
    var timer;
    var circleBox=banner.querySelector("ul:last-of-type");
    var li=circleBox.querySelectorAll("li");
    function timeMove() {
        timer=setInterval(function () {
            index++;
            var current=index*bannerWidth*-1;
            imgBox.style.transition="left 0.5s";
            imgBox.style.left=current+"px";
            setTimeout(function () {
                if(index==lis.length-1) {
                    console.log(lis.length);
                    index=1;
                    imgBox.style.transition="none";
                    imgBox.style.left=-(index*bannerWidth)+"px";
                }
            },500)
            for(var i=0;i<li.length;i++) {
                li[i].removeAttribute("class");
            } if(index==lis.length-1) {
                li[0].className="active";
            } else {
                li[index-1].className="active";
            }
        },2000)
    }
    timeMove();
//实现手动轮播
    var startX= 0,moveX= 0,distanceX= 0,flag=true;
    imgBox.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX= e.targetTouches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function (e) {
        if(flag) {
            moveX= e.targetTouches[0].clientX;
            distanceX=moveX-startX;
            imgBox.style.transition="none";
            imgBox.style.left=-(index*bannerWidth)+distanceX+"px";
        }
    })
    imgBox.addEventListener("touchend", function (e) {
        flag=false;
        if(Math.abs(distanceX)>=100) {
            if(distanceX>0) {
                index--;
                imgBox.style.transition="left 0.5s";
                imgBox.style.left=-(index*bannerWidth)+"px";
                for(var i=0;i<li.length;i++) {
                    li[i].removeAttribute("class");
                } if(index==0) {
                    li[li.length-1].className="active";
                } else {
                    li[index-1].className="active";
                }
            } else if (distanceX<0) {
                index++;
                imgBox.style.transition="left 0.5s";
                imgBox.style.left=-(index*bannerWidth)+"px";
                for(var i=0;i<li.length;i++) {
                    li[i].removeAttribute("class");
                } if(index==lis.length-1) {
                    li[0].className="active";
                } else {
                    li[index-1].className="active";
                }
            }
        } else if (Math.abs(distanceX)>=0) {
            imgBox.style.transition="left 0.5s";
            imgBox.style.left=-(index*bannerWidth)+"px";
        }
        startX=0;
        moveX=0;
        distanceX=0;
        timeMove();
    })
    imgBox.addEventListener("webkitTransitionEnd", function () {
        if(index==lis.length-1) {
            index=1;
            imgBox.style.transition="none";
            imgBox.style.left=-(index*bannerWidth)+"px";
        } else if(index==0) {
            index=lis.length-2;
            imgBox.style.transition="none";
            imgBox.style.left=-(index*bannerWidth)+"px";
        }
        setTimeout(function () {
            flag=true;
        },100)
    });
}

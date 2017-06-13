window.onload= function () {
    var cloud=$id("cloud");
    var ul=$id("navBar");
    var lis=ul.children;
    for(var i=0;i<lis.length;i++) {
        lis[i].onmouseover=onMouseoverHandle;
        lis[i].onmouseout=onmouseoutHandle
        lis[i].onclick=onclickHandle
    }
    function onMouseoverHandle () {
        var current=this.offsetLeft;
        animate_v1(cloud,current);
    }
    var index=0;
    function onmouseoutHandle () {
        animate_v1(cloud,index);
    }
    function onclickHandle () {
        index=this.offsetLeft;
    }
}
function $id(id) {
    return document.getElementById(id);
};
function animate_v1(element, target) {
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        var currentLeft = element.offsetLeft;
        var step = (target - currentLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        currentLeft += step;
        element.style.left = currentLeft + "px";
        if (currentLeft == target) {
            clearInterval(element.timer);
        }
    }, 20)
}
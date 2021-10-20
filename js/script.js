//const {storage} = require('./index.html');

const hideTopBarOffset = 80;

function closeMenu() {
    document.getElementById("main-wrapper-div").classList.remove("menu-open");
    document.getElementById("main-wrapper-div").classList.remove("icon-bar-hide");
}

function openMenu(target) {
    document.querySelectorAll("#menu-formbox-div form").forEach(element => {
        element.classList.remove("form-visible");
    });
    document.getElementById(target).classList.add("form-visible");
    document.getElementById("menu-submit-button").innerHTML = document.getElementById(target).getAttribute("data-submit-label");
    document.getElementById("menu-submit-button").setAttribute("form", target);
    document.getElementById("main-wrapper-div").classList.add("menu-open");
    document.getElementById("main-wrapper-div").classList.add("icon-bar-hide");
}

function openTopbar() {
    document.getElementById("main-wrapper-div").classList.add("top-bar-open");
}

function toggleDisplayStyle() {
    document.getElementById("main-wrapper-div").classList.toggle("display-as-tiles");
}

function drawDirectories() {
    var fileSystem = "";
    storage.forEach(element => {
        var dir = '<button class="dir-box" style="--dir-color:' + element.color + '" data-dir-id="' + element.id + '" onclick=openDir(this)>' + element.name + '</button>';
        fileSystem += dir;
    });
    document.getElementById("blank-canvas").innerHTML = fileSystem;
}

function closeDir() {
    blankCanvas = document.getElementById("blank-canvas");

blankCanvas.classList.add("blank-canvas");

setTimeout(() => {
    drawDirectories();
    blankCanvas.classList.remove("blank-canvas");
}, 400);

}

function openDir(target) {
    id = target.getAttribute("data-dir-id");
    style = target.getAttribute("style");
    var viewportOffset = target.getBoundingClientRect();

    blankCanvas = document.getElementById("blank-canvas");
    
    animatedDir=document.createElement("div");
    animatedDir.innerHTML=target.innerHTML;
    animatedDir.classList.add("dir-box-animated");
    animatedDir.style=style;
    animatedDir.style.left = viewportOffset.left + "px";
    animatedDir.style.top = viewportOffset.top + "px";
    animatedDir.style.width = target.offsetWidth + "px";
    animatedDir.style.height = target.offsetHeight + "px";
    animatedDirReturn=document.createElement("button");
    animatedDirReturn.className="dir-box-return";
    animatedDirReturn.innerHTML="< return";
    animatedDirReturn.setAttribute("onClick","closeDir()");
    animatedDir.prepend(animatedDirReturn);

    document.getElementById("window-scroll-div").append(animatedDir);

    blankCanvas.classList.add("blank-canvas");

    setTimeout(() => {
        animatedDir.classList.add("dir-box-expanded");
        animatedDir.style.left = "";
        animatedDir.style.top = "";
        animatedDir.style.width = "";
        animatedDir.style.height = "";

        setTimeout(() => {
            drawFiles(id);
            headerDir = animatedDir.cloneNode(true);
            headerDir.className="dir-header";
            headerSpacer=document.createElement("div");
            headerSpacer.className = "dir-header-spacer";
            blankCanvas.prepend(headerSpacer);
            blankCanvas.prepend(headerDir);

            blankCanvas.classList.remove("blank-canvas");

            setTimeout(() => {
                animatedDir.remove();
            }, 400);
        }, 400);
    }, 100);
}

function drawFiles(dirID) {
    console.log(dirID);
    var filesList = storage.find(function (post, index) {
        if (post.id == dirID)
            return true;
    });
    console.log(FileList);

    var fileSystem = "";
    filesList.content.forEach(element => {
        var dir = '<button class="file-box">' + element.name + '</button>';
        fileSystem += dir;
    });

    document.getElementById("blank-canvas").innerHTML = fileSystem;
}


function initialize() {
    drawDirectories();

    var scrollYLast = 0;
    var scrollYDistance = 0;
    var topBarOffsetSum = 0;

    document.body.addEventListener("scroll", (e) => {
        var scrollY = e.target.scrollTop;

        if (Math.sign(scrollYDistance) == Math.sign(scrollYLast - scrollY)) {
            scrollYDistance += scrollYLast - scrollY;
        } else {
            scrollYDistance = scrollYLast - scrollY;
        }

        if (scrollYDistance > hideTopBarOffset) {
            document.getElementById("main-wrapper-div").classList.add("top-bar-open");
        } else if (scrollYDistance < (-1) * hideTopBarOffset) {
            document.getElementById("main-wrapper-div").classList.remove("top-bar-open");
        }

        /*
        if (topBarOffsetSum > 0) {
            document.getElementById("main-wrapper-div").classList.add("top-bar-open");
        } else if (scrollY >= hideTopBarOffset) {
            document.getElementById("main-wrapper-div").classList.remove("top-bar-open");
        }

        if ((scrollYLast - scrollY) > 0) {
            scrollYDistance += scrollYLast - scrollY;
        } else {
            scrollYDistance = 0;
        }
        
        console.log(scrollYDistance);
        */

        scrollYLast = scrollY;
    });
}

initialize();
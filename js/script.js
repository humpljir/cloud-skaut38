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

function drawDirectories() {
    var fileSystem = "";
    storage.forEach(element => {
        var dir = '<button class="dir-box" style="--dir-color:' + element.color + '" data-dir-id="' + element.id + '" onclick=drawFiles(this.getAttribute("data-dir-id"))>' + element.name + '</button>';
        fileSystem += dir;
    });
    document.getElementById("blank-canvas").innerHTML = fileSystem;
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

    document.getElementById("window-scroll-div").addEventListener("scroll", (e) => {
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
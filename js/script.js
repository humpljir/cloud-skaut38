//const {storage} = require('./index.html');

function closeMenu() {
    document.getElementById("main-wrapper-div").classList.remove("menu-open");
}

function openMenu(target) {
    document.querySelectorAll("#menu-formbox-div form").forEach(element => {
        element.classList.remove("form-visible");
    });
    document.getElementById(target).classList.add("form-visible");
    document.getElementById("menu-submit-button").innerHTML = document.getElementById(target).getAttribute("data-submit-label");
    document.getElementById("menu-submit-button").setAttribute("form",target);
    document.getElementById("main-wrapper-div").classList.add("menu-open");
}

function drawDirectories() {
    var fileSystem = "";
    storage.forEach(element => {
        var dir = '<button class="dir-box" style="--dir-color:' + element.color + '" data-dir-id="'+element.id+'" onclick=drawFiles(this.getAttribute("data-dir-id"))>' + element.name + '</button>';
       fileSystem+=dir;
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
console.log("test");
console.log(storage);
}

initialize();
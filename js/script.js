//const {storage} = require('./index.html');

const hideTopBarOffset = 80;
const alwaysTopBarOffset = 20;

function closeMenu() {
  document.getElementById("main-wrapper-div").classList.remove("menu-open");
}

function openMenu(target) {
  document.querySelectorAll("#menu-formbox-div form").forEach((element) => {
    element.classList.remove("form-visible");
  });
  document.getElementById(target).classList.add("form-visible");
  document.getElementById("menu-submit-button").innerHTML = document
    .getElementById(target)
    .getAttribute("data-submit-label");
  document.getElementById("menu-submit-button").setAttribute("form", target);
  document.getElementById("main-wrapper-div").classList.add("menu-open");
}

function openSide() {
  document.documentElement.scrollTop = 0;
  document.getElementById("main-wrapper-div").classList.add("side-open");
  document.getElementById("main-wrapper-div").classList.add("top-bar-hide");
  document.getElementById("main-wrapper-div").classList.add("icon-bar-hide");

  setTimeout(() => {
    document.getElementById("main-wrapper-div").classList.add("side-enable");
  }, 1000);
}

function closeSide() {
  document.documentElement.scrollTop = 0;
  document.getElementById("main-wrapper-div").classList.remove("side-enable");
  document.getElementById("main-wrapper-div").classList.remove("side-open");
  document.getElementById("main-wrapper-div").classList.remove("top-bar-hide");
  document.getElementById("main-wrapper-div").classList.remove("icon-bar-hide");
}

function openTopbar() {
  document.getElementById("main-wrapper-div").classList.add("top-bar-open");
}

function toggleDisplayStyle() {
  document
    .getElementById("main-wrapper-div")
    .classList.toggle("display-as-tiles");
}

function generateSubmenu(targettype, fileid, options) {
  var submenu = document.createElement("div");
  submenu.className = "submenu-wrapper fluent-bg";
  options.forEach((option) => {
    var line = document.createElement("a");
    line.href =
      "?fileaction=" + option + "&typy=" + targettype + "&fileid=" + fileid;
    line.innerHTML = option;
    submenu.append(line);
  });
  return submenu;
}

function drawDirectories() {
  const canvas = document.getElementById("blank-canvas");
  canvas.innerHTML = "";
  storage.forEach((element) => {
    var dir = document.createElement("button");
    dir.className = "dir-box";
    dir.style = "--dir-color:" + element.color;
    dir.setAttribute("data-dir-id", element.id);
    dir.setAttribute("onclick", "openDir(this)");
    dir.innerHTML = element.name;
    var submenu = generateSubmenu("dir", element.id, [
      "share",
      "edit",
      "rename",
      "delete",
      "lorem",
      "ipsum",
    ]);

    const contextMenu = submenu;
    const scope = dir;

    scope.addEventListener("contextmenu", (event) => {
      
      document.querySelectorAll(".submenu-wrapper.visible").forEach(element => {
        element.classList.remove("visible");
      });


      var rect = event.target.getBoundingClientRect();
      var x = event.clientX - rect.left; //x position within the element.
      var y = event.clientY - rect.top;  //y position within the element.


      contextMenu.style.top = y+`px`;
      contextMenu.style.left = x+`px`;

      contextMenu.classList.add("visible");
    });

    document.addEventListener("click", (e) => {
      if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
      }
    });

    dir.append(submenu);
    canvas.append(dir);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "dir-box");
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

  animatedDir = document.createElement("div");
  animatedDir.innerHTML = target.innerHTML;
  animatedDir.classList.add("dir-box-animated");
  animatedDir.style = style;
  animatedDir.style.left = viewportOffset.left + "px";
  animatedDir.style.top = viewportOffset.top + "px";
  animatedDir.style.width = target.offsetWidth + "px";
  animatedDir.style.height = target.offsetHeight + "px";
  animatedDirReturn = document.createElement("button");
  animatedDirReturn.className = "dir-box-return";
  animatedDirReturn.innerHTML = "< return";
  animatedDirReturn.setAttribute("onClick", "closeDir()");
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
      document.documentElement.scrollTop = 0;

      drawFiles(id);

      headerDir = animatedDir.cloneNode(true);
      headerDir.className = "dir-header";
      headerSpacer = document.createElement("div");
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
    if (post.id == dirID) return true;
  });
  console.log(FileList);

  var fileSystem = "";
  filesList.content.forEach((element) => {
    var dir =
      '<div class="file-box-flex"><button class="file-box"><div class="file-icon"></div><div class="file-label">' +
      element.name +
      "</div></button></div>";
    fileSystem += dir;
  });

  document.getElementById("blank-canvas").innerHTML = fileSystem;
  appendEmptyElements(20, document.getElementById("blank-canvas"), "file-box");
}

function appendEmptyElements(n, target, chameleonClass) {
  for (let index = 0; index < n; index++) {
    emptyEl = document.createElement("div");
    emptyEl.className = chameleonClass + " empty-flex-element";
    target.append(emptyEl);
  }
}

function initialize() {
  drawDirectories();

  var scrollYLast = 0;
  var scrollYDistance = 0;
  //var topBarOffsetSum = 0;

  
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  document.addEventListener("scroll", (e) => {
    var scrollY = document.documentElement.scrollTop;

    if (Math.sign(scrollYDistance) == Math.sign(scrollYLast - scrollY)) {
      scrollYDistance += scrollYLast - scrollY;
    } else {
      scrollYDistance = scrollYLast - scrollY;
    }

    if (scrollYDistance > hideTopBarOffset || scrollY < alwaysTopBarOffset) {
      document.getElementById("main-wrapper-div").classList.add("top-bar-open");
    } else if (scrollYDistance < -1 * hideTopBarOffset) {
      document
        .getElementById("main-wrapper-div")
        .classList.remove("top-bar-open");
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

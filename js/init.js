//const {storage} = require('./index.html');

const hideTopBarOffset = 80;
const alwaysTopBarOffset = 20;
const colorsInPalette = 12;
const toolbarIconCount = 4;

function generateSubmenu(scope, targettype, fileid, options) {
  let submenu = document.createElement("div");
  submenu.className = "submenu-wrapper fluent-bg";
  options.forEach((option) => {
    let line = document.createElement("a");
    line.href =
      "?fileaction=" + option + "&typy=" + targettype + "&fileid=" + fileid;
    line.innerHTML = option;
    submenu.append(line);
  });

  function normalizeValue(val, maxVal, offset) {
    if (val + offset > maxVal) {
      return val - offset;
    } else {
      return val;
    }
  }

  function openSubmenu(x, y, target) {
    target.style.top = y + `px`;
    target.style.left = x + `px`;
    target.classList.add("visible");
    document.getElementById("main-wrapper-div").classList.add("toolbar-hide");
  }

  scope.addEventListener("contextmenu", (event) => {
    closeAllSubmenus();

    let rect = event.target.getBoundingClientRect();
    let x =
      normalizeValue(
        event.clientX,
        document.body.offsetWidth,
        submenu.offsetWidth
      ) - rect.left;
    let y =
      normalizeValue(
        event.clientY,
        document.body.offsetHeight,
        submenu.offsetHeight
      ) - rect.top;

    openSubmenu(x, y, submenu);
  });

  let submenuDots = document.createElement("img");
  submenuDots.src = "img/submenu_dots.svg";
  submenuDots.className = "submenu-dots";
  submenuDots.addEventListener("click", (e) => {
    closeAllSubmenus();
    let rect = e.target.parentNode.getBoundingClientRect();
    let x =
      normalizeValue(
        event.clientX,
        document.body.offsetWidth,
        submenu.offsetWidth
      ) - rect.left;
    let y =
      normalizeValue(
        event.clientY,
        document.body.offsetHeight,
        submenu.offsetHeight
      ) - rect.top;
    openSubmenu(x, y, submenu);
    e.stopPropagation();
  });
  scope.append(submenuDots);
  return submenu;
}

function drawDirectories() {
  const canvas = document.getElementById("blank-canvas");
  canvas.innerHTML = "";
  storage.forEach((element) => {
    let dir = document.createElement("button");
    dir.className = "dir-box";
    dir.style =
      "--dir-bg-color:" +
      element.color +
      "; --dir-color:" +
      element.colorComplementary +
      ";";
    dir.setAttribute("data-dir-id", element.id);
    dir.setAttribute("onclick", "openDir(this)");
    dir.innerHTML = element.name;
    let submenu = generateSubmenu(dir, "dir", element.id, [
      "share",
      "edit",
      "rename",
      "delete",
      "lorem",
      "ipsum",
    ]);

    dir.append(submenu);
    canvas.append(dir);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "dir-box");
}

function drawFiles(dirID) {
  const canvas = document.getElementById("blank-canvas");
  canvas.innerHTML = "";

  let filesList = storage.find(function (post, index) {
    if (post.id == dirID) return true;
  });

  filesList.content.forEach((element) => {
    let filelabel = document.createElement("div");
    filelabel.className = "file-label";
    filelabel.innerHTML = element.name;

    let fileicon = document.createElement("div");
    fileicon.className = "file-icon";

    let filebox = document.createElement("button");
    filebox.className = "file-box";
    filebox.append(fileicon);
    filebox.append(filelabel);
    filebox.append(
      generateSubmenu(filebox, "file", element.id, [
        "share",
        "edit",
        "rename",
        "delete",
        "lorem",
        "ipsum",
      ])
    );

    let fileboxflex = document.createElement("div");
    fileboxflex.className = "file-box-flex";
    fileboxflex.append(filebox);

    canvas.append(fileboxflex);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "file-box");
}

function appendEmptyElements(n, target, chameleonClass) {
  for (let index = 0; index < n; index++) {
    emptyEl = document.createElement("div");
    emptyEl.className = chameleonClass + " empty-flex-element";
    target.append(emptyEl);
  }
}

function drawToolbar() {
  target = document.getElementById("toolbar-div");
  target.innerHTML = "";
  for (let index = 0; index < toolbarIconCount; index++) {
    let indexReorder = session.toolbar.reorder[index];
    if (session.toolbar.display[indexReorder]) {
      let toolbarIconDOM = document.createElement("button");
      toolbarIconDOM.className = "toolbar-button";
      toolbarIconDOM.setAttribute("type", "button");
      toolbarIconDOM.setAttribute(
        "onclick",
        session.toolbar.onclick[indexReorder]
      );
      toolbarIconDOM.setAttribute(
        "style",
        "background-color: var(--toolbar-color-" + indexReorder + ");"
      );
      toolbarIconDOM.innerHTML =
        session.toolbar["button" + indexReorder + "svg"];
      target.append(toolbarIconDOM);
    }
  }
}

function drawSVGAll() {
  session.style.svgAll.forEach((svg) => {
    document.querySelectorAll("." + svg[0]).forEach((element) => {
      element.innerHTML = svg[1];
      element.classList.remove(svg[0]);
    });
  });
}

function loadThemeColors() {
  for (let index = 0; index < colorsInPalette; index++) {
    document.documentElement.style.setProperty(
      "--theme-color-" + index,
      session.style.palettes[session.style.activePalette].colors[index]
    );
    document.documentElement.style.setProperty(
      "--theme-color-" + index + "-complementary",
      session.style.palettes[session.style.activePalette].colorComplementary[
        index
      ]
    );
  }

  for (let index = 0; index < toolbarIconCount; index++) {
    document.documentElement.style.setProperty(
      "--toolbar-color-" + index,
      session.toolbar.colors[index]
    );
    document.documentElement.style.setProperty(
      "--toolbar-color-" + index + "-complementary",
      session.toolbar.colorsComplementary[index]
    );
  }
}

function initialize() {
  loadThemeColors();
  drawDirectories();
  drawToolbar();

  let scrollYLast = 0;
  let scrollYDistance = 0;
  //let topBarOffsetSum = 0;

  document.addEventListener("resize", (e) => {
    closeAllSubmenus();
  });

  document.addEventListener("click", (e) => {
    closeAllSubmenus();
  });

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  document.addEventListener("scroll", (e) => {
    closeAllSubmenus();

    let scrollY = document.documentElement.scrollTop;

    if (Math.sign(scrollYDistance) == Math.sign(scrollYLast - scrollY)) {
      scrollYDistance += scrollYLast - scrollY;
    } else {
      scrollYDistance = scrollYLast - scrollY;
    }

    if (scrollYDistance > hideTopBarOffset || scrollY < alwaysTopBarOffset) {
      document.getElementById("main-wrapper-div").classList.add("top-bar-open");
    } else if (
      scrollYDistance < -1 * hideTopBarOffset &&
      session.settings.topbarAutoHeight
    ) {
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

  sideInit();
  drawSVGAll();
}

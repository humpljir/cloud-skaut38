/*

************************************
init.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  Main file responsible for initializing app and all components.
*/

//const {storage} = require('./index.html');

const hideTopBarOffset = 80;
const alwaysTopBarOffset = 20;
const colorsInPalette = 12;
const toolbarIconCount = 4;

let loadingTimeout=setTimeout(() => {
  errorHandler(0);
}, 10000);

function loadingLoaded() {
  clearTimeout(loadingTimeout);
  setTimeout(() => {
    document.getElementById("main-wrapper-div").classList.remove("loading");
    document.getElementById("main-wrapper-div").classList.add("loading-loaded");
    document.getElementById("loading-wrapper-div").classList.add("loading-loaded");    
  }, 1000);
}

function generateSubmenu(scope, targettype, fileid, options) {
  let submenu = document.createElement("div");
  submenu.className = "submenu-wrapper fluent-bg";
  options.forEach((option) => {
    let line = document.createElement("a");
    if(option.function=="default") {
    line.href =
      "?fileaction=" + option.label + "&typy=" + targettype + "&fileid=" + fileid;
    }
    else {
      line.setAttribute("onclick",option.function);
    }
    line.innerHTML = option.label;
    submenu.append(line);
  });

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

  let submenuDots = document.createElement("div");
  submenuDots.className = "three-dots-icon-generate submenu-dots";
  submenuDots.addEventListener("click", (e) => {
    closeAllSubmenus();
    let rect = e.target.parentNode.parentNode.getBoundingClientRect();
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
    dir.className = "dir-box searchable";
    dir.setAttribute("data-name",element.name);
    dir.setAttribute("data-date",element.date);
    dir.setAttribute("data-size",element.size);
    dir.setAttribute("data-keyword","");
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
      {"label":"Share","function":"default"},
      {"label":"Edit","function":"openMenu('form-4',event)"},
      {"label":"Duplicate","function":"default"},
      {"label":"Move","function":"default"},
      {"label":"Convert","function":"default"},
      {"label":"Delete","function":"default"},
    ]);

    dir.append(submenu);
    canvas.append(dir);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "dir-box");
  drawSVGAll();
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

    let fileiconextension = document.createElement("div");
    fileiconextension.innerHTML = "."+element.extension;
    fileiconextension.className = "file-icon-extension";

    let fileicon = document.createElement("div");
    fileicon.className = "file-icon";
    fileicon.append(fileiconextension);

    let filebox = document.createElement("a");
    filebox.href=element.link;
    filebox.className = "file-box";
    filebox.append(fileicon);
    filebox.append(filelabel);
    filebox.append(
      generateSubmenu(filebox, "file", element.id, [
        {"label":"Share","function":"default"},
        {"label":"Edit","function":"openMenu('form-3',event)"},
        {"label":"Duplicate","function":"default"},
        {"label":"Move","function":"default"},
        {"label":"Convert","function":"default"},
        {"label":"Delete","function":"default"},
      ])
    );

    let fileboxflex = document.createElement("div");
    fileboxflex.className = "file-box-flex searchable";
    fileboxflex.setAttribute("data-name",element.name);
    fileboxflex.setAttribute("data-date",element.date);
    fileboxflex.setAttribute("data-size",element.size);
    fileboxflex.setAttribute("data-keyword",element.link);
    fileboxflex.append(filebox);

    canvas.append(fileboxflex);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "file-box");
  drawSVGAll();
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
      session.style.palettes[session.style.activePalette].colorComplementary[index]
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
  if (document.getElementById("blank-canvas")) {
    drawDirectories();
    drawToolbar();
  }

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

  if (document.getElementById("blank-canvas")) {
  sideInit();
  }
  drawSVGAll();
  initCustomNotifications();
  loadingLoaded();

  onloadFromPHP();
}


console.log("✅ init.js successfully loaded!");
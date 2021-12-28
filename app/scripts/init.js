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

const linkToStorage = "data/storage/";
const linkToStorageThumbnails = "data/storage/thumbnails/";

let loadingTimeout = setTimeout(() => {
  errorHandler(0,true);
}, 15000);

function loadingLoaded() {
  clearTimeout(loadingTimeout);
  setTimeout(() => {
    document.getElementById("main-wrapper-div").classList.remove("loading");
    document.getElementById("main-wrapper-div").classList.add("loading-loaded");
    document
      .getElementById("loading-wrapper-div")
      .classList.add("loading-loaded");
    setTimeout(() => {
      document.getElementById("loading-wrapper-div").remove();
    }, 1000);
  }, 1000);
}

function generateSubmenu(scope, targettype, fileid, options) {
  let submenu = document.createElement("div");
  submenu.className = "submenu-wrapper fluent-bg";
  options.forEach((option) => {
    let line = document.createElement("a");
    if (option.function == "default") {
      line.href =
        "?fileaction=" +
        option.label +
        "&typy=" +
        targettype +
        "&fileid=" +
        fileid;
    }
    else if (option.function == "download") {
      line.href = scope.parentNode.href;
      line.setAttribute("download",'');
    } else {
      /*      line.setAttribute("onclick", "(event)=>{event.stopPropagation();"+option.function+";}");*/
      line.setAttribute("onclick", option.function);
      // line.addEventListener("click", option.function);
    }
    line.innerHTML = option.label;
    line.addEventListener("click", (event) => {
      event.stopPropagation();
      closeAllSubmenus();
    });
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
  submenuDots.addEventListener("click", (event) => {
    event.stopPropagation();
    closeAllSubmenus();
    let rect = event.target.parentNode.parentNode.getBoundingClientRect();
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
  scope.append(submenuDots);
  return submenu;
}

function drawDirectories() {
  const canvas = document.getElementById("blank-canvas");
  canvas.innerHTML = "";
  storage.forEach((element) => {
    let dir = document.createElement("button");
    dir.className = "dir-box resize-hover searchable";
    dir.setAttribute("data-name", element.name);
    dir.setAttribute("data-date", element.date);
    dir.setAttribute("data-size", element.size);
    dir.setAttribute("data-keyword", "");
    dir.style =
      "--dir-bg-color:" +
      element.color +
      "; --dir-color:" +
      element.colorComplementary +
      ";";
    dir.setAttribute("data-dir-id", element.id);
    // dir.setAttribute("onclick", "openDir(this)");
    dir.addEventListener("click", () => {
      openDir(dir);
    });
    dir.innerHTML = element.name;
    let submenu = generateSubmenu(dir, "dir", element.id, [
      { label: "Share", function: "default" },
      { label: "Edit", function: "openMenu('form-4',event)" },
      { label: "Duplicate", function: "default" },
      { label: "Convert", function: "default" },
      { label: "Delete", function: "default" },
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
    let fileboxflex = document.createElement("a");

    let filelabel = document.createElement("div");
    filelabel.className = "file-label";
    filelabel.innerHTML = element.name;

    let fileiconextension = document.createElement("div");
    fileiconextension.innerHTML = "." + element.extension;
    fileiconextension.className = "file-icon-extension";

    let fileicon = document.createElement("div");
    fileicon.className = "file-icon";
    fileicon.append(fileiconextension);

    let filebox = document.createElement("div");
    fileboxflex.href = linkToStorage+element.link;
    fileboxflex.setAttribute("download",'');
    fileboxflex.className = "file-box-flex resize-hover searchable";
    fileboxflex.setAttribute("data-name", element.name);
    fileboxflex.setAttribute("data-date", element.date);
    fileboxflex.setAttribute("data-size", element.size);
    fileboxflex.setAttribute("data-keyword", element.link);
    fileboxflex.append(filebox);
    // filebox.setAttribute("onclick","window.location.href='"+linkToStorage+element.link+"'");

    if (element.type == "image") {
      fileicon.style.background =
        "url(" + linkToStorageThumbnails + element.link + ")";
      fileicon.classList.add("icon-thumbnail");
      filebox.setAttribute("data-image", linkToStorage + element.link);
      filebox.setAttribute("data-name", element.name);
      // filebox.setAttribute("onclick","openGallery(this)");
      filebox.addEventListener("click", (e) => {
        e.preventDefault();
        openGallery(filebox);
      });
    }
    filebox.className = "file-box";
    filebox.append(fileicon);
    filebox.append(filelabel);
    filebox.append(
      generateSubmenu(filebox, "file", element.id, [
        {
          label: "Open",
          function:
            "openGallery(this.parentNode.parentNode);",
        },
        { label: "Download", function: "download" },
        { label: "Share", function: "default" },
        { label: "Edit", function: "openMenu('form-3',event)" },
        { label: "Duplicate", function: "default" },
        { label: "Move", function: "default" },
        { label: "Convert", function: "default" },
        { label: "Delete", function: "default" },
      ])
    );

    canvas.append(fileboxflex);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "file-box");
  drawSVGAll();
}

function openDir(target) {
  // animated opening of directory

  if (!document.querySelector(".submenu-wrapper.visible")) {
    // open dir only if there is no sbmenu open

    changeHTMLTheme(target.style.getPropertyValue("--dir-bg-color"));
    // change theme color for browser to dir color

    id = target.getAttribute("data-dir-id");
    style = target.getAttribute("style");
    let viewportOffset = target.getBoundingClientRect();

    blankCanvas = document.getElementById("blank-canvas");

    animatedDir = document.createElement("div");
    animatedDir.innerHTML = target.innerHTML;
    animatedDir.classList.add("dir-box-animated");
    animatedDir.style = style;
    animatedDir.style.left = viewportOffset.left + "px";
    animatedDir.style.top = viewportOffset.top + "px";
    animatedDir.style.width = target.offsetWidth + "px";
    animatedDir.style.height = target.offsetHeight + "px";
    animatedDirReturnArrow = document.createElement("div");
    animatedDirReturnArrow.className =
      "arrow-icon arrow-icon-generate dir-box-return-icon";
    animatedDirReturn = document.createElement("button");
    animatedDirReturn.className = "dir-box-return resize-hover";
    animatedDirReturn.innerHTML = "return";
    animatedDirReturn.id="dir-return-button";
    // animatedDirReturn.setAttribute("onClick", "closeDir()");
    animatedDirReturn.prepend(animatedDirReturnArrow);
    animatedDir.prepend(animatedDirReturn);
    // duplicate dir element to animatedDir, hide all elements on canvas
    // (transition), then remove them, redraw canvas with content of dir, after
    // timeout show canvas and switch animatedDir with absolute postion to
    // regular dir colorful header and remove animatedDir

    document.getElementById("window-scroll-div").append(animatedDir);

    blankCanvas.classList.add("blank-canvas");

    drawSVGAll();

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
          document.getElementById("dir-return-button").addEventListener("click", closeDir);
        }, 400);
      }, 400);
    }, 100);
  }
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
  // target.setAttribute("onclick", "openToolbar()");
  target.addEventListener("click",openToolbar);
  let toolbarAutohideArrow = document.createElement("div");
  toolbarAutohideArrow.className = "arrow-toolbar-autohide arrow-icon-generate";
  let toolbarAutohideBar = document.createElement("div");
  toolbarAutohideBar.className = "toolbar-autohide-bar";
  toolbarAutohideBar.append(toolbarAutohideArrow);
  target.append(toolbarAutohideBar);

  let toolbarIconWrapper = document.createElement("div");
  toolbarIconWrapper.className = "toolbar-icon-wrapper";
  target.append(toolbarIconWrapper);

  for (let index = 0; index < toolbarIconCount; index++) {
    let indexReorder = session.settings.toolbarReorder[index];
    if (session.settings.toolbarDisplayIcon[indexReorder]) {
      let toolbarIconDOM = document.createElement("button");
      toolbarIconDOM.className = "toolbar-button highlight-hover";
      toolbarIconDOM.setAttribute("type", "button");
      toolbarIconDOM.setAttribute(
        "onclick",
        static.toolbarOnclick[indexReorder]
      );
      toolbarIconDOM.setAttribute(
        "style",
        "background-color: var(--toolbar-color-" + indexReorder + ");"
      );
      toolbarIconDOM.innerHTML =
        static.svg["button" + indexReorder + "svg"];
      toolbarIconWrapper.append(toolbarIconDOM);
    }
  }
}

function drawSVGAll() {
  static.svg.svgAll.forEach((svg) => {
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
      static.palettes[session.settings.activePalette].colors[index]
    );
    document.documentElement.style.setProperty(
      "--theme-color-" + index + "-complementary",
      static.palettes[session.settings.activePalette].colorComplementary[
        index
      ]
    );
  }

  for (let index = 0; index < toolbarIconCount; index++) {
    document.documentElement.style.setProperty(
      "--toolbar-color-" + index,
      session.settings.toolbarColors[index]
    );
    document.documentElement.style.setProperty(
      "--toolbar-color-" + index + "-complementary",
      session.settings.toolbarColorsComplementary[index]
    );
  }
}

function initInputValidator() {
  document.querySelectorAll("[data-validate]").forEach((element) => {
    /*
    element.closest("form").setAttribute("data-valid", true);
    element.closest("form").setAttribute("onsubmit", "return this.getAttribute('data-valid')");
    */
    element.setAttribute("data-valid-input", true);
    let type = element.getAttribute("data-validate");
    element.setAttribute("oninput", "inputValidator(this,'" + type + "')");
    let validateWarning = document.createElement("div");
    validateWarning.className = "validate-warning warning-hide";
    element.after(validateWarning);

    element
      .closest("form")
      .setAttribute("onsubmit", "return formValidator(this,event)");
  });
}

function initialize() {
  loadThemeColors();

  if (document.getElementById("blank-canvas")) {
    drawDirectories();
    drawToolbar();
  }

  document.documentElement.scrollTop = 0;
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

    // auto hide top bar
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

    // autohide bottom toolbar
    if (scrollYDistance > hideTopBarOffset || scrollY < alwaysTopBarOffset) {
      document
        .getElementById("main-wrapper-div")
        .classList.remove("toolbar-autohide-hidden");
    } else if (
      scrollYDistance < -1 * hideTopBarOffset &&
      session.settings.toolbarAutoHeight
    ) {
      document
        .getElementById("main-wrapper-div")
        .classList.add("toolbar-autohide");
      document
        .getElementById("main-wrapper-div")
        .classList.add("toolbar-autohide-hidden");
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
  initInputValidator();
  drawSVGAll();
  initApp();
  initCustomNotifications();
  loadingLoaded();

  onloadFromPHP();
}

console.log("✅ init.js successfully loaded!");

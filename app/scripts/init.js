/*

************************************
init.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  Main file responsible for initializing app and all components.
*/


let loadingTimeout = setTimeout(() => {
  try {
  errorHandler(0,true);
  }
  catch {
    loadingLoaded();
  }
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

        try {
        document.getElementById("file_upload_select").value=id;
        document.getElementById("picture_upload_select").value=id;
        }
        catch {
          errorHandler(1,false);
        }

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

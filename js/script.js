/*

************************************
script.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  Main file for all global js functions.
*/

function errorHandler(code) {
  // function for handling with errors, in the future, they should probably be
  // sent to server

  //#code 0 -> loading timeout

  pushCustomNotifications(
    "ERROR! Appication run into problem. CODE #" + code,
    "var(--notifications-error-color)"
  );
  console.log("error nr. " + code);

  if (code == 0) {
    // when webapp doesn't load properly, try refresh the window without caching
    // - hopping problem was only with network - otherwise this will lead to app
    //   refreshing all the time - better handler for this error should be
    //   created in the future

    window.location.reload(true);
  }
}

function changeHTMLTheme(color) {
  // function for changing html5 theme color used by browser

  var metaThemeColor = document.querySelector("meta[name=theme-color]");
  metaThemeColor.setAttribute("content", color);
}

function normalizeValue(val, maxVal, offset) {
  if (val + offset > maxVal) {
    return val - offset;
  } else {
    return val;
  }
}

function closeMenu() {
  // close menu form and show toolbar

  document.getElementById("main-wrapper-div").classList.remove("menu-open");
}

function openMenu(target, event) {
  // hide bottom toolbar and show menu form defined by target variable

  closeAllSubmenus();
  event.stopPropagation();
  document.querySelectorAll("#menu-formbox-div form").forEach((element) => {
    // hide all opened menu forms, if there are any

    element.classList.remove("form-visible");
  });
  document.getElementById(target).classList.add("form-visible");
  document.getElementById("menu-submit-button").innerHTML = document
    .getElementById(target)
    .getAttribute("data-submit-label");
  document.getElementById("menu-submit-button").setAttribute("form", target);
  document.getElementById("main-wrapper-div").classList.add("menu-open");
}

function openSubsortMenumenu(event) {
  event.stopPropagation();
  closeAllSubmenus();
  let rect = event.target.closest(".window").getBoundingClientRect();
  let submenu = document.getElementById("sort-submenu-div");
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
}

function search(keyword) {
  document.querySelectorAll(".searchable").forEach((element) => {
    let keywordmix =
      element.getAttribute("data-name").toLowerCase() +
      ";" +
      element.getAttribute("data-keyword").toLowerCase();
    if (!keywordmix.includes(keyword.toLowerCase())) {
      element.classList.add("search-hide");
    } else {
      element.classList.remove("search-hide");
    }
  });
}

function searchCancel() {
  topbarSearch();
  document.querySelector(".search-box input").value = "";
  document.querySelectorAll(".search-hide").forEach((element) => {
    element.classList.remove("search-hide");
  });
}

function sort(parameter) {
  var list = [];
  document.querySelectorAll(".searchable").forEach((element) => {
    list.push(element.cloneNode(true));
  });
  document.getElementById("blank-canvas").innerHTML = "";
  list.sort(function (a, b) {
    if (parameter == 0) {
      return a
        .getAttribute("data-name")
        .localeCompare(b.getAttribute("data-name"));
    } else if (parameter == 1) {
      return b
        .getAttribute("data-name")
        .localeCompare(a.getAttribute("data-name"));
    } else if (parameter == 2) {
      return a.getAttribute("data-date") - b.getAttribute("data-date");
    } else if (parameter == 3) {
      return b.getAttribute("data-date") - a.getAttribute("data-date");
    } else if (parameter == 4) {
      return a.getAttribute("data-size") - b.getAttribute("data-size");
    } else if (parameter == 5) {
      return b.getAttribute("data-size") - a.getAttribute("data-size");
    }
  });
  list.forEach((element) => {
    document.getElementById("blank-canvas").append(element);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "dir-box");
}

function openSubmenu(x, y, target) {
  // open submenu specified at target variable and move it to specified position

  target.style.top = y + `px`;
  target.style.left = x + `px`;
  target.classList.add("visible");
  document.getElementById("main-wrapper-div").classList.add("toolbar-hide");

  // hide toolbar to prevent any visual problems
}

function closeAllSubmenus() {
  // make sure no submenu stays open when it shouldn't

  if (session.settings.toolbarVisible) {
    document
      .getElementById("main-wrapper-div")
      .classList.remove("toolbar-hide");
  }

  document.querySelectorAll(".submenu-wrapper.visible").forEach((element) => {
    element.classList.remove("visible");
  });
}

function openSide() {
  // go to side page of app

  changeHTMLTheme(
    document.documentElement.style.getPropertyValue("--side-grey-bg")
  );
  document.documentElement.scrollTop = 0;
  document.getElementById("main-wrapper-div").classList.add("side-open");
  document.getElementById("main-wrapper-div").classList.add("top-bar-hide");
  document.getElementById("main-wrapper-div").classList.add("toolbar-hide");
  clearCustomNotifications();

  setTimeout(() => {
    document.getElementById("main-wrapper-div").classList.add("side-enable");
  }, 1000);
}

function closeSide() {
  // go back to main page of app

  changeHTMLTheme(
    document.documentElement.style.getPropertyValue("--main-bg-color")
  );
  document.documentElement.scrollTop = 0;
  document.getElementById("main-wrapper-div").classList.remove("side-enable");
  document.getElementById("main-wrapper-div").classList.remove("side-open");
  document.getElementById("main-wrapper-div").classList.remove("top-bar-hide");
  if (session.settings.toolbarVisible) {
    console.log("visible toolbar");
    document
      .getElementById("main-wrapper-div")
      .classList.remove("toolbar-hide");
  } else {
    console.log("unvisible toolbar");
    document.getElementById("main-wrapper-div").classList.add("toolbar-hide");
  }
  clearCustomNotifications();
}

function openTopbar() {
  // expand top-bar

  document.getElementById("main-wrapper-div").classList.add("top-bar-open");
}

function toggleDisplayStyle() {
  // change style of displaying directories and files

  document
    .getElementById("main-wrapper-div")
    .classList.toggle("display-as-tiles");
}

function topbarSearch() {
  // toggle search bar

  closeAllSubmenus();
  document.getElementById("top-bar-div").classList.toggle("top-bar-search");
}

function topbarSort() {
  // toggle sort submenu

  document.getElementById("top-bar-div").classList.add("top-bar-sort");
}

function closeDir() {
  // close opened directory and go back to their list

  changeHTMLTheme(
    document.documentElement.style.getPropertyValue("--main-bg-color")
  );
  blankCanvas = document.getElementById("blank-canvas");

  blankCanvas.classList.add("blank-canvas");

  setTimeout(() => {
    drawDirectories();
    blankCanvas.classList.remove("blank-canvas");
  }, 400);
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
    animatedDirReturn.className = "dir-box-return";
    animatedDirReturn.innerHTML = "return";
    animatedDirReturn.setAttribute("onClick", "closeDir()");
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
        }, 400);
      }, 400);
    }, 100);
  }
}

console.log("✅ script.js successfully loaded!");

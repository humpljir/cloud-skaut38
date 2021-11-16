function changeHTMLTheme(color) {
  var metaThemeColor = document.querySelector("meta[name=theme-color]");
  metaThemeColor.setAttribute("content", color);
}

function closeMenu() {
  document.getElementById("main-wrapper-div").classList.remove("menu-open");
}

function openMenu(target) {
  if (!document.querySelector(".submenu-wrapper.visible")) {
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
}

function closeAllSubmenus() {
  if (session.settings.toolbarVisible) {
    document
      .getElementById("main-wrapper-div")
      .classList.remove("toolbar-hide");
  }

  document.querySelectorAll(".submenu-wrapper.visible").forEach((element) => {
    element.classList.remove("visible");
  });
}

function openTopbar() {
  document.getElementById("main-wrapper-div").classList.add("top-bar-open");
}

function toggleDisplayStyle() {
  document
    .getElementById("main-wrapper-div")
    .classList.toggle("display-as-tiles");
}

function closeDir() {
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
  if (!document.querySelector(".submenu-wrapper.visible")) {
    changeHTMLTheme(target.style.getPropertyValue("--dir-bg-color"));
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
    animatedDirReturnArrow.className="arrow-icon arrow-icon-generate dir-box-return-icon";
    animatedDirReturn = document.createElement("button");
    animatedDirReturn.className = "dir-box-return";
    animatedDirReturn.innerHTML = "return";
    animatedDirReturn.setAttribute("onClick", "closeDir()");
    animatedDirReturn.prepend(animatedDirReturnArrow);
    animatedDir.prepend(animatedDirReturn);

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

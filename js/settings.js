function sideNotifications(val) {
  if (val) {
    initNotifications();
  }
}

function openSide() {
  changeHTMLTheme(
    document.documentElement.style.getPropertyValue("--side-grey-bg")
  );
  document.documentElement.scrollTop = 0;
  document.getElementById("main-wrapper-div").classList.add("side-open");
  document.getElementById("main-wrapper-div").classList.add("top-bar-hide");
  document.getElementById("main-wrapper-div").classList.add("toolbar-hide");

  setTimeout(() => {
    document.getElementById("main-wrapper-div").classList.add("side-enable");
  }, 1000);
}

function closeSide() {
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
  }
  else {
    console.log("unvisible toolbar");
    document.getElementById("main-wrapper-div").classList.add("toolbar-hide");
  }
}

function switchSessionVal(name, val) {
  session.settings[name] = val;
}

function toolbarEditOpen(target) {
  document.querySelectorAll(".icon-open").forEach((element) => {
    element.classList.remove("icon-open");
  });
  target.classList.add("icon-open");
}

function toolbarEditColor(index, color, colorComplementary) {
  document.documentElement.style.setProperty("--toolbar-color-" + index, color);
  document.documentElement.style.setProperty(
    "--toolbar-color-" + index + "-complementary",
    colorComplementary
  );
}

function toggleDarkTheme() {
  session.style.darkTheme = !session.style.darkTheme;
  if (session.style.darkTheme) {
    document.body.classList.add("dark-theme");
    document.documentElement.style.setProperty("--main-bg-color", "#000");
    document.documentElement.style.setProperty("--main-fg-color", "#fff");
    document.documentElement.style.setProperty(
      "--main-line-color",
      "#ffffff20"
    );
    document.documentElement.style.setProperty("--menu-bg-color", "#2d2d2dc7");
    document.documentElement.style.setProperty("--side-bg-color", "#000");
    document.documentElement.style.setProperty("--side-bg-color-2", "#282828");
    document.documentElement.style.setProperty("--side-grey-light", "#4f4f4f");
    document.documentElement.style.setProperty(
      "--fluent-border-light",
      "#ffffff24"
    );
    document.documentElement.style.setProperty(
      "--fluent-border-dark",
      "#00000084"
    );
    document.documentElement.style.setProperty("--hyperlink-color", "#3e74ff");
  } else {
    document.body.classList.remove("dark-theme");
    document.documentElement.style.setProperty("--main-bg-color", "#fff");
    document.documentElement.style.setProperty("--main-fg-color", "#000");
    document.documentElement.style.setProperty(
      "--main-line-color",
      "#00000020"
    );
    document.documentElement.style.setProperty("--menu-bg-color", "#ffffffb8");
    document.documentElement.style.setProperty("--side-bg-color", "#ededed");
    document.documentElement.style.setProperty("--side-bg-color-2", "#ffffff");
    document.documentElement.style.setProperty("--side-grey-light", "#f2f2f2");
    document.documentElement.style.setProperty(
      "--fluent-border-light",
      "#ffffff99"
    );
    document.documentElement.style.setProperty(
      "--fluent-border-dark",
      "#00000020"
    );
    document.documentElement.style.setProperty("--hyperlink-color", "#1a4ed2");
  }
}

function toggleToolbarEditMode() {
  document
    .getElementById("toolbar-edit-mode-div")
    .classList.toggle("toggle-edit");
}

function changeHighlightColor(color, colorComplementary) {
  document.documentElement.style.setProperty("--interactive-color", color);
  document.documentElement.style.setProperty(
    "--interactive-color-complementary",
    colorComplementary
  );
}

function swapToolbarColor(index) {
  let toolbarColor = document.documentElement.style.getPropertyValue(
    "--toolbar-color-" + index
  );
  console.log("toolbar color " + toolbarColor);
  document.documentElement.style.setProperty(
    "--toolbar-color-" + index,
    document.documentElement.style.getPropertyValue(
      "--toolbar-color-" + index + "-complementary"
    )
  );
  document.documentElement.style.setProperty(
    "--toolbar-color-" + index + "-complementary",
    toolbarColor
  );
}

function hideToolbarIcon(index, target) {
  console.log(session.toolbar.display[index]);
  console.log(!session.toolbar.display[index]);
  session.toolbar.display[index] = !session.toolbar.display[index];
  target.classList.toggle("hidden-toolbar-icon");
  drawToolbar();
}

function drawToolbarEditMode(target) {
  target.innerHTML = "";
  for (let index = 0; index < toolbarIconCount; index++) {
    let indexReorder = session.toolbar.reorder[index];
    let toolbarIconDOM = document.createElement("div");
    toolbarIconDOM.className = "side-toolbar-button";
    toolbarIconDOM.setAttribute("onclick", "toolbarEditOpen(this.parentNode)");
    toolbarIconDOM.setAttribute(
      "style",
      "background-color: var(--toolbar-color-" + indexReorder + ");"
    );
    toolbarIconDOM.innerHTML = session.toolbar["button" + indexReorder + "svg"];

    let toolbarIconOptionsSwapDOM = document.createElement("img");
    toolbarIconOptionsSwapDOM.className = "side-toolbar-edit-swap";
    toolbarIconOptionsSwapDOM.setAttribute(
      "onclick",
      "swapToolbarColor(" + index + ")"
    );
    toolbarIconOptionsSwapDOM.src = "img/swap-icon.svg";

    let toolbarIconOptionsDeleteDOM = document.createElement("img");
    toolbarIconOptionsDeleteDOM.className = "side-toolbar-edit-delete";
    toolbarIconOptionsDeleteDOM.setAttribute(
      "onclick",
      "hideToolbarIcon(" + index + ",this.parentNode.parentNode.parentNode)"
    );
    toolbarIconOptionsDeleteDOM.src = "img/delete-icon.svg";

    let toolbarIconOptionsReorderDOM = document.createElement("img");
    toolbarIconOptionsReorderDOM.className = "side-toolbar-edit-reorder";
    toolbarIconOptionsReorderDOM.src = "img/reorder-icon.svg";

    let toolbarIconLineOptionsDOM = document.createElement("div");
    toolbarIconLineOptionsDOM.className = "side-icon-options";
    toolbarIconLineOptionsDOM.append(toolbarIconOptionsSwapDOM);
    toolbarIconLineOptionsDOM.append(toolbarIconOptionsDeleteDOM);
    toolbarIconLineOptionsDOM.append(toolbarIconOptionsReorderDOM);

    let toolbarIconLineWrapperDOM = document.createElement("div");
    toolbarIconLineWrapperDOM.className = "side-icon-line-wrapper";
    toolbarIconLineWrapperDOM.append(toolbarIconDOM);
    toolbarIconLineWrapperDOM.append(toolbarIconLineOptionsDOM);

    let toolbarIconPaletteDOM = document.createElement("div");
    toolbarIconPaletteDOM.className = "side-icon-palette";

    for (let index2 = 0; index2 < colorsInPalette; index2++) {
      let toolbarIconColorOptionDOM = document.createElement("label");
      toolbarIconColorOptionDOM.setAttribute(
        "onclick",
        "toolbarEditColor(" +
          index +
          ",'var(--theme-color-" +
          index2 +
          ")','var(--theme-color-" +
          index2 +
          "-complementary)')"
      );
      let toolbarIconColorOptionInputDOM = document.createElement("input");
      if (
        "var(--theme-color-" + index2 + ")" ==
          document.documentElement.style.getPropertyValue(
            "--toolbar-color-" + index
          ) ||
        "var(--theme-color-" + index2 + "-complementary)" ==
          document.documentElement.style.getPropertyValue(
            "--toolbar-color-" + index
          )
      ) {
        toolbarIconColorOptionInputDOM.checked = "checked";
      }
      toolbarIconColorOptionInputDOM.type = "radio";
      toolbarIconColorOptionInputDOM.id = "icon" + index + "color"+index2;
      toolbarIconColorOptionInputDOM.name = "icon" + index + "color";
      let toolbarIconColorOptionDivDOM = document.createElement("div");
      toolbarIconColorOptionDivDOM.style =
        "--circle-color:var(--theme-color-" + index2 + ");";

      toolbarIconColorOptionDOM.append(toolbarIconColorOptionInputDOM);
      toolbarIconColorOptionDOM.append(toolbarIconColorOptionDivDOM);

      toolbarIconPaletteDOM.append(toolbarIconColorOptionDOM);
    }

    let toolbarIconWrapperDOM = document.createElement("div");
    toolbarIconWrapperDOM.className = "side-icon-wrapper";
    toolbarIconWrapperDOM.setAttribute("draggable", "true");
    toolbarIconWrapperDOM.append(toolbarIconLineWrapperDOM);
    toolbarIconWrapperDOM.append(toolbarIconPaletteDOM);
    target.append(toolbarIconWrapperDOM);
  }
}

function sideInit() {
  document.querySelectorAll(".side-form input").forEach((element) => {
    element.addEventListener("input", () => {
      element.closest(".side-form").classList.add("form-changed");
    });
  });
  drawToolbarEditMode(document.getElementById("toolbar-edit-mode-div"));
}

function changePalette(nr) {
  for (let index = 0; index < colorsInPalette; index++) {
    document.documentElement.style.setProperty(
      "--theme-color-" + index,
      session.style.palettes[nr].colors[index]
    );
    document.documentElement.style.setProperty(
      "--theme-color-" + index + "-complementary",
      session.style.palettes[nr].colorComplementary[index]
    );
  }
}

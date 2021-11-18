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
      toolbarIconColorOptionInputDOM.id = "icon" + index + "color";
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
document.getElementById("window-side-div").innerHTML='                <button class="side-return" onclick="closeSide()"> <div class="arrow-icon arrow-icon-generate rotated-return-icon"></div>return </button> <div class="side-title">SETTINGS</div> <div class="side-box"> <div class="side-user"> <div class="side-user-picture" style="background-image: url('img/profile_pic.jpg');"></div> <div class="side-user-name">Jiří Humpl</div> <div class="side-user-nick">@humpljir</div> </div> </div> <div class="side-box"> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Account Settings <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <form class="side-form" id="form-userchange" data-submit-label="USERCHANGE"> <input class="text-box" type="text" id="fullname" name="fullname" value="Jiří Humpl" placeholder="Full Name"> <input class="text-box" type="text" id="username" name="username" value="humpljir" placeholder="Username"> <label class="side-form-img-upload"> <div class="img-upload-icon"></div>Change Profile Picture <input type="file" id="upload" name="upload" placeholder="upload"> </label> <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div> </form> </div> </div> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Change Password <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <form class="side-form" id="form-changepass" data-submit-label="CHANGEPASS"> <input class="text-box" type="password" id="password" name="password" placeholder="new password"> <input class="text-box" type="password" id="password_check" name="password_check" placeholder="password again"> <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div> </form> </div> </div> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Appearance & Colors <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <form class="side-form" id="create-dir" data-submit-label="CREATE"> <label class="side-form-switch-wrapper"> <span class="side-form-switch-label">Turn On Dark Theme</span><input onclick="toggleDarkTheme()" type="checkbox" class="side-form-switch"> </label> <label class="side-form-switch-wrapper"> <span class="side-form-switch-label">Minimize Top Bar When Scrolling</span><input type="checkbox" checked onchange="switchSessionVal('topbarAutoHeight',this.checked)" class="side-form-switch"> </label> <div class="side-form-title-div"> <span class="side-form-title">Select Global Theme</span> <span class="side-form-line"></span> </div> <div class="side-theme-selector"> <label> <input type="radio" id="#78412C" name="palette" data-palette-nr=0 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label> <label> <input type="radio" id="#AB5530" name="palette" checked data-palette-nr=1 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #E63946;--theme-palette:#457B9D 0%, #457B9D 20%, #1D3557 20%, #1D3557 40%,#A8DADC 40%, #A8DADC 60%,#F1FAEE 60%, #F1FAEE 80%,#8b2c33 80%, #8b2c33 100%;"> </div> </label> <label> <input type="radio" id="#D46025" name="palette" data-palette-nr=2 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label> <label> <input type="radio" id="#F17F29" name="palette" data-palette-nr=3 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label> <label> <input type="radio" id="#8C9496" name="palette" data-palette-nr=4 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label> <label> <input type="radio" id="#A4778B" name="palette" data-palette-nr=5 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label><label> <input type="radio" id="#6D4E62" name="palette" data-palette-nr=6 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label> <label> <input type="radio" id="#40433F" name="palette" data-palette-nr=7 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label> <label> <input type="radio" id="#537E49" name="palette" data-palette-nr=8 onclick="changePalette(this.getAttribute('data-palette-nr'))"> <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;"> </div> </label> </div> <div class="side-form-title-div"> <span class="side-form-title">Select Primary Color</span> <span class="side-form-line"></span> </div> <div class="side-color-palette"><label onclick="changeHighlightColor('var(--theme-color-0)','var(--theme-color-0-complementary)')"><input type="radio" id="blabla0" name="color"> <div style="--circle-color:var(--theme-color-0);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-1)','var(--theme-color-1-complementary)')"><input type="radio" id="blabla1" name="color"> <div style="--circle-color:var(--theme-color-1);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-2)','var(--theme-color-2-complementary)')"><input type="radio" id="blabla2" name="color"> <div style="--circle-color:var(--theme-color-2);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-3)','var(--theme-color-3-complementary)')"><input type="radio" checked id="blabla3" name="color"> <div style="--circle-color:var(--theme-color-3);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-4)','var(--theme-color-4-complementary)')"><input type="radio" id="blabla4" name="color"> <div style="--circle-color:var(--theme-color-4);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-5)','var(--theme-color-5-complementary)')"><input type="radio" id="blabla5" name="color"> <div style="--circle-color:var(--theme-color-5);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-6)','var(--theme-color-6-complementary)')"><input type="radio" id="blabla6" name="color"> <div style="--circle-color:var(--theme-color-6);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-7)','var(--theme-color-7-complementary)')"><input type="radio" id="blabla7" name="color"> <div style="--circle-color:var(--theme-color-7);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-8)','var(--theme-color-8-complementary)')"><input type="radio" id="blabla8" name="color"> <div style="--circle-color:var(--theme-color-8);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-9)','var(--theme-color-9-complementary)')"><input type="radio" id="blabla9" name="color"> <div style="--circle-color:var(--theme-color-9);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-10)','var(--theme-color-10-complementary)')"><input type="radio" id="blabla10" name="color"> <div style="--circle-color:var(--theme-color-10);"></div> </label><label onclick="changeHighlightColor('var(--theme-color-11)','var(--theme-color-11-complementary)')"><input type="radio" id="blabla11" name="color"> <div style="--circle-color:var(--theme-color-11);"></div> </label></div> <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div> </form> </div> </div> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Custom Toolbar <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <form class="side-form" id="form-userchange" data-submit-label="USERCHANGE"> <label class="side-form-switch-wrapper"> <span class="side-form-switch-label">Show Toolbar</span><input type="checkbox" onchange="switchSessionVal('toolbarVisible',this.checked)" checked class="side-form-switch"> </label> <label class="side-form-switch-wrapper"> <span class="side-form-switch-label">Advanced Customization</span><input onchange="toggleToolbarEditMode()" type="checkbox" class="side-form-switch"> </label> <div class="side-form-title-div"> <span class="side-form-title">Edit Toolbar</span> <span class="side-form-line"></span> </div> <div class="toolbar-edit-mode" id="toolbar-edit-mode-div"></div> <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div> </form> </div> </div> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Notifications <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <form class="side-form" id="form-userchange" data-submit-label="USERCHANGE"><label class="side-form-switch-wrapper"> <span class="side-form-switch-label">Turn On PWA Notifications</span><input type="checkbox" class="side-form-switch" onchange="sideNotifications(this.checked)"> </label> <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div> </form> </div> </div> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Storage <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <div class="side-storage">3.29 GB used of unlimited storage</div> </div> </div> </div> <div class="side-box"> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Log Out</button> <div class="arrow-icon arrow-icon-generate side-category-label-arrow"> </div></button> <div class="side-category-content"> <a href="">Switch User</a> <a href="">Log Out</a> </div> </div> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">Help & Feedback <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <a href="mailto:humpljir@fel.cvut.cz">Send Feedback</a> <a href="">Terms and Conditions</a> </div> </div> </div> <div class="side-box"> <div class="side-category"> <button class="side-category-label" onclick="this.parentNode.classList.toggle('side-category-open')">About <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button> <div class="side-category-content"> <a href="https://github.com/humpljir/cloud-skaut38/issues">Report a Bug</a> <a href="https://github.com/humpljir/cloud-skaut38">See GIT Repository</a> <a href="mailto:humpljir@fel.cvut.cz">Contact Us</a> </div> </div> </div>';
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

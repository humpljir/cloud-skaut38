<?php
include_once("modules/error.php");
include_once("modules/config.php");
include_once("modules/filesystem.php");

// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}

if (isset($_GET['fileaction']) && isset($_GET['typy']) && isset($_GET['fileid'])) {
    if ($_GET['typy'] == 'file') {
        if ($_GET['fileaction'] == 'Delete') {
            file_delete($_GET['fileid']);
        } elseif ($_GET['fileaction'] == 'Move') {
        } elseif ($_GET['fileaction'] == 'Duplicate') {
        }
    }
}

if (isset($_POST['file_upload_name']) && isset($_POST['file_upload_select'])) {
    file_new($_POST['file_upload_name'], $_POST['file_upload_select']);
}

if (isset($_POST['dir-name'])) {
    directory_new($_POST['dir-name'], $_POST['dir-color']);
}

$sql = " SELECT * FROM users WHERE username='$_SESSION[username]'";
$result = $mysqli->query($sql);
if ($user = $result->fetch_assoc()) {
?>
    <!DOCTYPE html>
    <html lang="cs">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <meta name="theme-color" content="#fff">
        <title>cloud.skaut38</title>
        <link rel="stylesheet" href="styles/basic.css">
        <link rel="stylesheet" href="styles/animations.css">
        <link rel="stylesheet" href="styles/loading.css">
        <link rel="stylesheet" href="styles/gallery.css">
        <link rel="stylesheet" href="styles/customNotifications.css">
        <link rel="stylesheet" href="styles/style.css">
        <link rel="stylesheet" href="styles/responsive.css">
        <link rel="stylesheet" href="styles/hover.css">
        <link rel="icon" href="data/icons/favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="data/icons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="data/icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="192x192" href="data/icons/android-chrome-192x192.png">
        <link rel="icon" type="image/png" sizes="16x16" href="data/icons/favicon-16x16.png">
        <link rel="manifest" href="data/site.webmanifest">
        <link rel="mask-icon" href="data/icons/safari-pinned-tab.svg" color="#457b9d">
        <meta name="apple-mobile-web-app-title" content="cloud.skaut38">
        <meta name="application-name" content="cloud.skaut38">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="theme-color" content="#1d3557">
        <link href="data/splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="data/splashscreens/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <?php
        include_once("modules/palettes.php");
        include_once("modules/storage.php");
        ?>
        <script>
            var session = {
                user: {
                    name: "<?= $user['fullname'] ?>",
                    nick: "<?= $user['username'] ?>",
                    img: "img/<?= $user['img'] ?>",
                },
                settings: {
                    darkTheme: <?= ($user['darktheme'] == 1) ? "true" : "false" ?>,
                    activePalette: <?= $user['activePalette'] ?>,
                    colorHighlight: <?= $user['colorHighlight'] ?>,
                    topbarAutoHeight: <?= ($user['topbarAutoHeight'] == 1) ? "true" : "false" ?>,
                    toolbarAutoHeight: <?= ($user['toolbarAutoHeight'] == 1) ? "true" : "false" ?>,
                    toolbarVisible: <?= ($user['toolbarVisible'] == 1) ? "true" : "false" ?>,
                    toolbarCustom: <?= ($user['toolbarCustom'] == 1) ? "true" : "false" ?>,
                    toolbarReorder: <?= $user['toolbarReorder'] ?>,
                    toolbarDisplayIcon: <?= $user['toolbarDisplayIcon'] ?>,
                    toolbarColors: <?= $user['toolbarColors'] ?>,
                    toolbarColorsComplementary: <?= $user['toolbarColorsComplementary'] ?>,
                    notifications: <?= ($user['notifications'] == 1) ? "true" : "false" ?>,
                    customNotificationsTimeout: <?= $user['customNotificationsTimeout'] ?>,
                },
            };

            function onloadFromPHP() {
                console.log("onloadFromPHP funtion is running");
                <?= ($user['darktheme'] == 1) ? "toggleDarkTheme();" : "" ?>
                <?= ($user['toolbarCustom'] == 1) ? "toggleToolbarEditMode();" : "" ?>
                <?= $global_error ?>
            }
        </script>
    </head>

    <body onload="initialize()">
        <div class="main-wrapper top-bar-open display-as-tiles loading" id="main-wrapper-div">
            <div class="window" id="window-div" onclick="closeMenu()">
                <div class="window-scroll" id="window-scroll-div">
                    <div class="window-inner" id="blank-canvas">
                    </div>
                </div>
                <div id="window-side-div" class="window-side">
                    <button class="side-return bright-hover" onclick="closeSide()">
                        <div class="arrow-icon arrow-icon-generate rotated-return-icon"></div>return
                    </button>
                    <div class="side-title">SETTINGS</div>
                    <div class="side-box">
                        <div class="side-user">
                            <div class="side-user-picture" style="background-image: url('img/<?= $user['img'] ?>');"></div>
                            <div class="side-user-name"><?= $user['fullname'] ?></div>
                            <div class="side-user-nick">@<?= $user['username'] ?></div>
                        </div>
                    </div>
                    <div class="side-box">
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Account Settings <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>
                            <div class="side-category-content">
                                <form class="side-form" id="form-userchange" method="PUT" data-submit-label="USERCHANGE">
                                    <input class="text-box" type="text" data-validate="label" id="fullname" name="fullname" value="<?= $user['fullname'] ?>" placeholder="Full Name">
                                    <input class="text-box" type="text" data-validate="username" id="nick" name="nickname" value="<?= $user['username'] ?>" placeholder="Username">
                                    <label class="side-form-img-upload">
                                        <div class="img-upload-icon"></div>Profile Picture
                                        <input type="file" id="pic_upload" name="upload">
                                    </label>
                                    <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div>
                                </form>
                            </div>
                        </div>
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Change Password <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>
                            <div class="side-category-content">
                                <form class="side-form" id="form-changepass" method="PUT" data-submit-label="CHANGEPASS">
                                    <input class="text-box" type="password" data-validate="password" id="change-password" name="password" placeholder="new password">
                                    <input class="text-box" type="password" data-validate="match" data-validate-match-id="change-password" id="change-password-check" name="password-check" placeholder="password again">
                                    <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div>
                                </form>
                            </div>
                        </div>
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Appearance & Colors <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>
                            <div class="side-category-content">
                                <form class="side-form" id="form-appearence" method="PUT" data-submit-label="CREATE">
                                    <label class="side-form-switch-wrapper">
                                        <span class="side-form-switch-label">Turn On Dark Theme</span><input onclick="toggleDarkTheme()" type="checkbox" class="side-form-switch" <?= ($user['darktheme'] == 1) ? " checked" : "" ?>>
                                    </label>
                                    <label class="side-form-switch-wrapper">
                                        <span class="side-form-switch-label">Auto Resize Top Bar</span><input type="checkbox" <?= ($user['topbarAutoHeight'] == 1) ? " checked" : "" ?> onchange="switchSessionVal('topbarAutoHeight',this.checked)" class="side-form-switch">
                                    </label>
                                    <div class="side-form-title-div">
                                        <span class="side-form-title">Select Global Theme</span>
                                        <span class="side-form-line"></span>
                                    </div>
                                    <div class="side-theme-selector">
                                        <label>
                                            <input type="radio" id="theme-0" name="palette" data-palette-nr=0 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 0) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label> <label>
                                            <input type="radio" id="theme-1" name="palette" checked data-palette-nr=1 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 1) ? " checked" : "" ?>>
                                            <div style="--inner-color: #E63946;--theme-palette:#457B9D 0%, #457B9D 20%, #1D3557 20%, #1D3557 40%,#A8DADC 40%, #A8DADC 60%,#F1FAEE 60%, #F1FAEE 80%,#8b2c33 80%, #8b2c33 100%;">
                                            </div>
                                        </label> <label>
                                            <input type="radio" id="theme-2" name="palette" data-palette-nr=2 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 2) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label> <label>
                                            <input type="radio" id="theme-3" name="palette" data-palette-nr=3 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 3) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label> <label>
                                            <input type="radio" id="theme-4" name="palette" data-palette-nr=4 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 4) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label> <label>
                                            <input type="radio" id="theme-5" name="palette" data-palette-nr=5 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 5) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label><label>
                                            <input type="radio" id="theme-6" name="palette" data-palette-nr=6 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 6) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label> <label>
                                            <input type="radio" id="theme-7" name="palette" data-palette-nr=7 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 7) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label> <label>
                                            <input type="radio" id="theme-8" name="palette" data-palette-nr=8 onclick="changePalette(this.getAttribute('data-palette-nr'))" <?= ($user['activePalette'] == 8) ? " checked" : "" ?>>
                                            <div style="--inner-color: #AB5530;--theme-palette:#6D4E62 0%, #6D4E62 20%, #8C9496 20%, #8C9496 40%,#40433F 40%, #40433F 60%,#537E49 60%, #537E49 80%,#1E1800 80%, #1E1800 100%;">
                                            </div>
                                        </label>
                                    </div>
                                    <div class="side-form-title-div">
                                        <span class="side-form-title">Select Primary Color</span>
                                        <span class="side-form-line"></span>
                                    </div>
                                    <div class="side-color-palette">
                                        <label onclick="changeHighlightColor('var(--theme-color-0)','var(--theme-color-0-complementary)')"><input type="radio" id="blabla0" name="color" <?= ($user['colorHighlight'] == 0) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-0);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-1)','var(--theme-color-1-complementary)')"><input type="radio" id="blabla1" name="color" <?= ($user['colorHighlight'] == 1) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-1);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-2)','var(--theme-color-2-complementary)')"><input type="radio" id="blabla2" name="color" <?= ($user['colorHighlight'] == 2) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-2);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-3)','var(--theme-color-3-complementary)')"><input type="radio" id="blabla3" name="color" <?= ($user['colorHighlight'] == 3) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-3);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-4)','var(--theme-color-4-complementary)')"><input type="radio" id="blabla4" name="color" <?= ($user['colorHighlight'] == 4) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-4);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-5)','var(--theme-color-5-complementary)')"><input type="radio" id="blabla5" name="color" <?= ($user['colorHighlight'] == 5) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-5);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-6)','var(--theme-color-6-complementary)')"><input type="radio" id="blabla6" name="color" <?= ($user['colorHighlight'] == 6) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-6);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-7)','var(--theme-color-7-complementary)')"><input type="radio" id="blabla7" name="color" <?= ($user['colorHighlight'] == 7) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-7);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-8)','var(--theme-color-8-complementary)')"><input type="radio" id="blabla8" name="color" <?= ($user['colorHighlight'] == 8) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-8);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-9)','var(--theme-color-9-complementary)')"><input type="radio" id="blabla9" name="color" <?= ($user['colorHighlight'] == 9) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-9);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-10)','var(--theme-color-10-complementary)')"><input type="radio" id="blabla10" name="color" <?= ($user['colorHighlight'] == 10) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-10);"></div>
                                        </label><label onclick="changeHighlightColor('var(--theme-color-11)','var(--theme-color-11-complementary)')"><input type="radio" id="blabla11" name="color" <?= ($user['colorHighlight'] == 11) ? " checked" : "" ?>>
                                            <div style="--circle-color:var(--theme-color-11);"></div>
                                        </label>
                                    </div>
                                    <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div>
                                </form>
                            </div>
                        </div>
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Custom Toolbar <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>

                            <div class="side-category-content">
                                <form class="side-form" id="form-toolbar-edit" method="PUT" data-submit-label="USERCHANGE">
                                    <label class="side-form-switch-wrapper">
                                        <span class="side-form-switch-label">Enable Toolbar</span><input type="checkbox" onchange="switchSessionVal('toolbarVisible',this.checked)" class="side-form-switch" <?= ($user['toolbarVisible'] == 1) ? " checked" : "" ?>>
                                    </label>
                                    <label class="side-form-switch-wrapper">
                                        <span class="side-form-switch-label">Auto Hide Toolbar</span><input type="checkbox" onchange="switchSessionVal('toolbarAutoHeight',this.checked)" class="side-form-switch" <?= ($user['toolbarAutoHeight'] == 1) ? " checked" : "" ?>>
                                    </label>
                                    <label class="side-form-switch-wrapper">
                                        <span class="side-form-switch-label">Advanced Customization</span><input onchange="toggleToolbarEditMode()" type="checkbox" class="side-form-switch" <?= ($user['toolbarCustom'] == 1) ? " checked" : "" ?>>
                                    </label>
                                    <div class="side-form-title-div">
                                        <span class="side-form-title">Edit Toolbar</span>
                                        <span class="side-form-line"></span>
                                    </div>
                                    <div class="toolbar-edit-mode" id="toolbar-edit-mode-div"></div>
                                    <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div>
                                </form>
                            </div>
                        </div>
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Notifications <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>
                            <div class="side-category-content">
                                <form class="side-form" id="form-notifications" method="PUT" data-submit-label="USERCHANGE"><label class="side-form-switch-wrapper">
                                        <span class="side-form-switch-label">Turn On PWA Notifications</span><input type="checkbox" class="side-form-switch" onchange="sideNotifications(this.checked)" <?= ($user['notifications'] == 1) ? " checked" : "" ?>>
                                    </label>
                                    <div class="side-form-buttons"><input type="reset" onclick="this.closest('.side-form').classList.remove('form-changed')" value="RESET"><input type="submit" class="side-form-submit" value="SAVE"></div>
                                </form>
                            </div>
                        </div>
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Storage <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>
                            <div class="side-category-content">
                                <div class="side-storage">3.29 GB used of unlimited storage</div>
                            </div>
                        </div>
                    </div>
                    <div class="side-box">
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Log Out</button>
                            <div class="arrow-icon arrow-icon-generate side-category-label-arrow">
                            </div></button>
                            <div class="side-category-content">
                                <a href="modules/logout.php">Switch User</a>
                                <a href="modules/logout.php">Log Out</a>
                            </div>
                        </div>
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">Help & Feedback <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>
                            <div class="side-category-content">
                                <a href="mailto:humpljir@fel.cvut.cz">Send Feedback</a>
                                <a href="">Terms and Conditions</a>
                            </div>
                        </div>
                    </div>

                    <div class="side-box">
                        <div class="side-category">
                            <button class="side-category-label bright-hover" onclick="this.parentNode.classList.toggle('side-category-open')">About <div class="arrow-icon arrow-icon-generate side-category-label-arrow"></div></button>
                            <div class="side-category-content">
                                <a href="https://github.com/humpljir/cloud-skaut38/issues">Report a Bug</a>
                                <a href="https://github.com/humpljir/cloud-skaut38">See GIT Repository</a>
                                <a href="mailto:humpljir@fel.cvut.cz">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top-bar fluent-bg" id="top-bar-div">
                    <div class="top-bar-line"><a class="top-bar-title" href=""><svg width="100%" height="100%" viewBox="0 0 72.431946 8.3819732" version="1.1">
                                <g id="layer1" transform="translate(38.365964,-164.94903)">
                                    <path id="path840" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-size:10.5833px;line-height:1.25;font-family:Diavlo;-inkscape-font-specification:'Diavlo Heavy';fill:var(--main-fg-color);fill-opacity:1;stroke:none;stroke-width:0.999999" d="M 21.160156 0 L 21.160156 24.560547 C 21.160156 28.160547 22.879701 31.320312 26.679688 31.320312 C 27.839685 31.320312 29.280319 31.119529 30.320312 29.439453 C 27.92032 29.239516 27.878906 25.479284 27.878906 23.279297 L 27.878906 3.0800781 C 27.878906 0.040090723 21.600154 0 21.160156 0 z M 136.47852 0 L 136.47852 28.240234 C 136.47852 31.320209 143.19922 31.320312 143.19922 31.320312 L 143.19922 22.199219 C 150.0392 23.959194 146.87916 31.320312 153.11914 31.320312 C 154.07914 31.320312 157.03906 30.640625 157.03906 30.640625 C 153.99907 24.92065 154.07944 21.879441 148.43945 19.439453 C 152.27944 17.399453 152.95962 13.759297 155.59961 10.279297 C 154.35961 9.8793095 152.91851 9.6796875 151.47852 9.6796875 C 150.59852 9.6796875 148.39929 9.7208972 147.2793 11.880859 C 145.7193 14.800847 144.59921 16.519141 143.19922 17.119141 L 143.19922 3.0800781 C 143.19922 0.00010332185 136.47852 0 136.47852 0 z M 93.279297 0.080078125 L 93.279297 8.640625 C 93.279297 9.4406376 93.558594 10.720703 93.558594 10.720703 C 93.558594 10.720703 91.600228 9.4804688 89.240234 9.4804688 C 84.520251 9.4804688 80.439453 12.280872 80.439453 16.880859 L 80.439453 24.080078 C 80.439453 28.840091 84.040252 31.519531 90.240234 31.519531 C 91.680227 31.519531 93.959459 30.839844 96.439453 30.839844 C 97.799448 30.839844 98.840003 30.879582 100 31.519531 L 100 3.5605469 C 100 0.12057207 93.959294 0.080078125 93.279297 0.080078125 z M 234.75781 1.4804688 C 224.99784 1.4804688 221.55814 6.920247 227.07812 12.240234 C 227.07812 7.3602218 231.51782 6.5605469 234.75781 6.5605469 C 237.8378 6.5605469 239.11914 7.8390751 239.11914 10.039062 C 239.11914 12.719088 238.07811 13.519531 235.07812 13.519531 L 233.03906 13.519531 L 233.03906 14.080078 C 233.03906 18.04004 235.03906 18.359441 236.03906 18.439453 C 239.75905 18.759579 239.51953 21.000481 239.51953 22.480469 C 239.51953 24.760469 238.1178 26.480469 234.75781 26.480469 C 231.19783 26.480469 226.87953 25.640665 226.51953 20.720703 C 221.75955 25.800653 224.31785 31.519531 234.75781 31.519531 C 241.71779 31.519531 246.39844 28.200053 246.39844 23.080078 L 246.39844 21.880859 C 246.39844 19.520885 244.8396 16.558984 242.59961 15.958984 C 244.4796 15.358984 245.99805 12.719453 245.99805 10.439453 L 245.99805 9.4394531 C 245.99805 4.3994531 241.31779 1.4804688 234.75781 1.4804688 z M 262.19922 1.4804688 C 255.63924 1.4804688 250.95898 4.280819 250.95898 9.8007812 L 250.95898 10.439453 C 250.95898 12.759441 252.75852 15.679297 254.47852 16.279297 C 252.03852 16.879297 250.55859 19.6003 250.55859 22.320312 L 250.55859 23.199219 C 250.55859 28.759206 255.23924 31.519531 262.19922 31.519531 C 269.0792 31.519531 273.75781 28.640066 273.75781 23.080078 L 273.75781 22.320312 C 273.75781 19.6003 272.2789 16.879297 269.87891 16.279297 C 271.6389 15.679297 273.35938 12.759441 273.35938 10.439453 L 273.35938 9.8007812 C 273.35938 4.280819 268.6792 1.4804688 262.19922 1.4804688 z M 262.19922 6.359375 C 265.07921 6.359375 266.47852 7.2791658 266.47852 10.119141 C 266.47852 12.919128 265.43952 13.839844 262.51953 13.839844 L 261.87891 13.839844 C 258.87891 13.839844 257.83789 12.919128 257.83789 10.119141 C 257.83789 7.2791658 259.23923 6.359375 262.19922 6.359375 z M 206.60938 6.7460938 C 205.97938 6.7317168 205.55859 6.7597656 205.55859 6.7597656 L 205.55859 24 C 205.55859 28.719987 208.71877 31.519531 214.71875 31.519531 C 220.75873 31.519531 222.31836 28.759544 222.31836 26.519531 C 222.31836 24.959569 221.4782 23.759556 220.1582 22.519531 C 220.1582 26.079544 217.71976 26.679688 215.75977 26.679688 C 212.83977 26.679688 212.2793 25.360872 212.2793 22.880859 L 212.2793 16.039062 L 216.51953 16.039062 C 220.19952 16.039062 220.23828 11.160156 220.23828 11.160156 L 212.2793 11.160156 L 212.2793 9.8808594 C 212.2793 7.2108783 208.49937 6.7892247 206.60938 6.7460938 z M 9.640625 9.4804688 C 3.4406464 9.4804688 0 12.32 0 17 L 0 24 C 0 28.719987 3.8790827 31.519531 10.039062 31.519531 C 15.159045 31.519531 18.199219 29.200247 18.199219 26.240234 C 18.199219 25.20026 17.600702 23.919675 16.720703 22.679688 C 16.680716 24.679662 14.359908 26.640625 10.919922 26.640625 C 8.0799282 26.640625 6.7207031 25.560509 6.7207031 22.560547 L 6.7207031 18.320312 C 6.7207031 14.560325 8.9200857 14.240234 11.080078 14.240234 C 13.320072 14.240234 15.880859 15.639244 15.880859 19.199219 C 17.200856 17.279219 17.759766 15.640312 17.759766 14.320312 C 17.759766 10.240313 12.320616 9.4804688 9.640625 9.4804688 z M 42.519531 9.4804688 C 35.399555 9.4804688 32.080078 12.32 32.080078 17 L 32.080078 24 C 32.080078 28.719987 35.399555 31.519531 42.519531 31.519531 C 49.55951 31.519531 52.878906 28.719987 52.878906 24 L 52.878906 17 C 52.878906 12.32 49.55951 9.4804688 42.519531 9.4804688 z M 123.32031 9.4804688 C 117.12033 9.4804688 113.67969 11.679478 113.67969 16.439453 C 113.67969 25.279428 126.67969 21.080585 126.67969 24.560547 C 126.67969 26.560559 124.60031 26.759766 123.32031 26.759766 C 121.16032 26.759766 116.79867 26.520612 116.63867 22.640625 C 114.91868 24.200625 114.11914 25.639909 114.11914 26.919922 C 114.11914 29.639897 117.56033 31.519531 123.32031 31.519531 C 129.96029 31.519531 133.2793 28.999753 133.2793 24.759766 C 133.2793 15.039803 120.2793 19.159987 120.2793 16 C 120.2793 14.8 121.92001 14.320312 124 14.320312 C 126.75999 14.320312 130.16016 15.279622 130.16016 17.599609 C 131.44015 16.119622 132.03906 14.760612 132.03906 13.640625 C 132.03906 11.000625 128.76029 9.4804688 123.32031 9.4804688 z M 167.43945 9.4804688 C 164.67946 9.4804688 159 10.2803 159 14.320312 C 159 15.5603 159.35985 16.998997 160.83984 18.958984 C 160.83984 15.15901 164.27939 14.240234 167.35938 14.240234 C 169.95937 14.240234 170.67969 15.360313 170.67969 16.320312 C 168.83969 19.0003 158.43945 17.638984 158.43945 24.958984 C 158.43945 29.998947 162.7583 31.519531 167.23828 31.519531 C 169.59827 31.519531 171.83899 30.800781 173.95898 30.800781 C 175.07898 30.800781 176.27844 30.919342 177.39844 31.519531 L 177.39844 16.640625 C 177.39844 12.00065 173.95943 9.4804688 167.43945 9.4804688 z M 56.878906 9.6796875 L 56.878906 24.439453 C 56.878906 29.999441 61.680169 31.519531 66.160156 31.519531 C 68.200149 31.519531 70.079148 30.679688 72.119141 30.679688 C 74.639133 30.679688 76.439453 31.679688 76.439453 31.679688 L 76.439453 12.759766 C 76.439453 9.679753 69.71875 9.6796875 69.71875 9.6796875 L 69.71875 26.359375 C 69.71875 26.359375 68.078745 26.759766 66.71875 26.759766 C 64.398759 26.759766 63.599609 25.719856 63.599609 23.839844 L 63.599609 12.759766 C 63.599609 9.8397782 56.878906 9.6796875 56.878906 9.6796875 z M 181.59961 9.6796875 L 181.59961 24.439453 C 181.59961 29.999441 186.39892 31.519531 190.87891 31.519531 C 192.9189 31.519531 194.79985 30.679688 196.83984 30.679688 C 199.35984 30.679688 201.1582 31.679688 201.1582 31.679688 L 201.1582 12.759766 C 201.1582 9.679753 194.43945 9.6796875 194.43945 9.6796875 L 194.43945 26.359375 C 194.43945 26.359375 192.79945 26.759766 191.43945 26.759766 C 189.11946 26.759766 188.31836 25.719856 188.31836 23.839844 L 188.31836 12.759766 C 188.31836 9.8397782 181.59961 9.6796875 181.59961 9.6796875 z M 42.519531 14.199219 C 45.519524 14.199219 46.160156 15.399622 46.160156 17.599609 L 46.160156 23.400391 C 46.160156 25.600378 45.519524 26.839844 42.519531 26.839844 C 39.439541 26.839844 38.798828 25.600378 38.798828 23.400391 L 38.798828 17.599609 C 38.798828 15.399622 39.439541 14.199219 42.519531 14.199219 z M 89.759766 14.199219 C 91.559758 14.199219 93.279297 15.360053 93.279297 17.080078 L 93.279297 26.720703 C 93.279297 26.720703 91.838749 26.958984 90.71875 26.958984 C 87.99876 26.958984 87.160156 25.720481 87.160156 23.480469 L 87.160156 17.480469 C 87.160156 15.200469 88.239772 14.199219 89.759766 14.199219 z M 262.19922 18.720703 C 265.47921 18.720703 266.87891 19.840703 266.87891 22.720703 C 266.87891 25.640691 265.47921 26.679688 262.19922 26.679688 C 258.83923 26.679688 257.43945 25.639831 257.43945 22.839844 C 257.43945 19.839844 258.83923 18.720703 262.19922 18.720703 z M 170.79883 21.119141 L 170.79883 26.560547 C 170.79883 26.560547 169.3189 27 167.87891 27 C 166.51891 27 165.1582 26.600678 165.1582 24.720703 C 165.1582 22.160678 169.71883 22.799141 170.79883 21.119141 z M 104.47852 24.958984 L 104.47852 29.439453 C 104.47852 30.319478 105.51977 31.039062 106.75977 31.039062 L 110.40039 31.039062 L 110.40039 26.560547 C 110.40039 25.800522 109.39921 24.958984 108.19922 24.958984 L 104.47852 24.958984 z " transform="matrix(0.26458333,0,0,0.26458333,-38.365964,164.94903)" />
                                </g>
                            </svg></a>
                        <button type="button" class="top-bar-button" onclick="openTopbar()">
                            <div class="arrow-icon arrow-icon-generate"></div>
                        </button>
                    </div>
                    <div class="top-bar-line">
                        <button type="button" class="top-bar-display bright-hover" onclick="toggleDisplayStyle()">
                            <div><svg width="100%" height="100%" viewBox="0 0 2656.0052 743.00734" version="1.1" id="svg8">
                                    <path id="rect2361-7-5-9-28-3" style="opacity:0.99813;fill:var(--main-fg-color);fill-opacity:1;stroke:none;stroke-width:408.472;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:408.472, 408.472;stroke-dashoffset:0;stroke-opacity:1" d="M 0 0 L 0 1297.2598 L 1297.2617 1297.2598 L 1297.2617 0 L 0 0 z M 1490.957 0 L 1490.957 1297.2598 L 2788.2168 1297.2598 L 2788.2168 0 L 1490.957 0 z M 7250.2363 20 L 7250.2363 571.7832 L 7802.0176 571.7832 L 7802.0176 20 L 7250.2363 20 z M 7995.707 20 L 7995.707 571.7832 L 10038.445 571.7832 L 10038.445 20 L 7995.707 20 z M 7250.2363 765.47852 L 7250.2363 1317.2598 L 7802.0176 1317.2598 L 7802.0176 765.47852 L 7250.2363 765.47852 z M 7995.707 765.47852 L 7995.707 1317.2617 L 10038.445 1317.2617 L 10038.445 765.47852 L 7995.707 765.47852 z M 0 1490.9551 L 0 2788.2168 L 1297.2617 2788.2168 L 1297.2617 1490.9551 L 0 1490.9551 z M 1490.957 1490.9551 L 1490.957 2788.2168 L 2788.2168 2788.2168 L 2788.2168 1490.9551 L 1490.957 1490.9551 z M 7250.2363 1510.9551 L 7250.2363 2062.7383 L 7802.0176 2062.7383 L 7802.0176 1510.9551 L 7250.2363 1510.9551 z M 7995.707 1510.957 L 7995.707 2062.7383 L 10038.445 2062.7383 L 10038.445 1510.957 L 7995.707 1510.957 z M 7250.2363 2256.4336 L 7250.2363 2808.2168 L 7802.0176 2808.2168 L 7802.0176 2256.4336 L 7250.2363 2256.4336 z M 7995.707 2256.4336 L 7995.707 2808.2168 L 10038.445 2808.2168 L 10038.445 2256.4336 L 7995.707 2256.4336 z " transform="scale(0.26458335)" />
                                </svg></div>
                        </button>
                        <div class="search-box"><input type="text" placeholder="search" oninput="search(this.value)"><button onclick="searchCancel()">Cancel</button></div>
                        <div class="top-bar-absolute-right">
                            <button onclick="topbarSearch()" class="top-bar-icon grey-box-hover top-bar-icon-search search-icon-generate"></button>
                            <button onclick="openSubsortMenumenu(event)" class="top-bar-icon grey-box-hover top-bar-icon-sort sort-icon-generate"></button>
                            <button onclick="openSide()" class="top-bar-icon grey-box-hover top-bar-icon-settings settings-icon-generate"></button>
                        </div>
                    </div>
                </div>
                <div class="submenu-wrapper fluent-bg" id="sort-submenu-div"><a onclick="sort(0)">Name Ascending</a><a onclick="sort(1)">Name Descending</a><a onclick="sort(2)">Date Ascending</a><a onclick="sort(3)">Date Descending</a><a onclick="sort(4)">Size Ascending</a><a onclick="sort(5)">Size Descending</a></div>
            </div>
            <div class="menu-wrapper" id="menu-wrapper-div">
                <div class="formbox-title" id="formbox-title-div"></div>
                <div class="menu-formbox fluent-bg" id="menu-formbox-div">
                    <form class="" id="form-0" data-form-title="Upload file" data-submit-label="UPLOAD" method="post" enctype="multipart/form-data">
                        <input type="text" id="file_upload_name" name="file_upload_name" data-validate="label" placeholder="File name">
                        <select id="file_upload_select" name="file_upload_select" required>
                            <option disabled selected value>Target directory:</option>
                            <?php
                            $dir_sql = "SELECT * FROM directories";
                            $dir_result = $mysqli->query($dir_sql);
                            while ($dir = $dir_result->fetch_assoc()) {
                            ?><option value="<?= $dir['id'] ?>"><?= $dir['name'] ?></option><?php } ?>
                        </select>
                        <label class="file-upload">
                            <div>select file</div>
                            <input type="file" id="file_upload" name="file_upload" required>
                        </label>
                    </form>
                    <form class="" id="form-1" data-form-title="Upload picture" data-submit-label="UPLOAD" method="post">
                        <input type="text" id="picture_upload_name" name="picture_upload_name" data-validate="label" placeholder="Picture name">
                        <select id="picture_upload_select" name="picture_upload_select" required>
                            <option disabled selected value>Target directory:</option>
                            <?php
                            $dir_sql = "SELECT * FROM directories";
                            $dir_result = $mysqli->query($dir_sql);
                            while ($dir = $dir_result->fetch_assoc()) {
                            ?><option value="<?= $dir['id'] ?>"><?= $dir['name'] ?></option><?php } ?>
                        </select>
                        <label class="file-upload">
                            <div>select picture</div>
                            <input type="file" id="picture_upload" name="picture_upload" required>
                        </label>
                    </form>
                    <form class="" id="form-2" data-form-title="New directory" data-submit-label="CREATE" method="post">
                        <input type="text" id="dir-name" name="dir-name" data-validate="label" data-validate="label" placeholder="directory name">
                        <div class="color-selector">
                            <label class="resize-hover">
                                <input type="radio" id="dir-color-0" name="dir-color" value="0" checked>
                                <div style="--circle-color: var(--theme-color-0);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-1" name="dir-color" value="1">
                                <div style="--circle-color: var(--theme-color-1);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-2" name="dir-color" value="2">
                                <div style="--circle-color: var(--theme-color-2);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-3" name="dir-color" value="3">
                                <div style="--circle-color: var(--theme-color-3);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-4" name="dir-color" value="4">
                                <div style="--circle-color: var(--theme-color-4);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-5" name="dir-color" value="5">
                                <div style="--circle-color: var(--theme-color-5);"></div>
                            </label class="resize-hover"><label>
                                <input type="radio" id="dir-color-6" name="dir-color" value="6">
                                <div style="--circle-color: var(--theme-color-6);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-7" name="dir-color" value="7">
                                <div style="--circle-color: var(--theme-color-7);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-8" name="dir-color" value="8">
                                <div style="--circle-color: var(--theme-color-8);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-9" name="dir-color" value="9">
                                <div style="--circle-color: var(--theme-color-9);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-10" name="dir-color" value="10">
                                <div style="--circle-color: var(--theme-color-10);"></div>
                            </label class="resize-hover"> <label>
                                <input type="radio" id="dir-color-11" name="dir-color" value="11">
                                <div style="--circle-color: var(--theme-color-11);"></div>
                            </label>

                        </div>
                    </form>
                    <form class="" id="form-3" method="POST" data-submit-label="SAVE">
                        <input type="text" id="file-name" name="file-name" data-validate="label" placeholder="file name">
                        <label class="form-text">You're editting filename of selected file. Click SAVE to confirm changes.</label>
                    </form>
                    <form class="" id="form-4" method="POST" data-submit-label="SAVE">
                        <input type="text" id="dir-name" name="dir-name" data-validate="label" placeholder="directory name">
                        <div class="color-selector">
                            <label>
                                <input type="radio" id="dir-color-0" name="dir-color" checked>
                                <div style="--circle-color: var(--theme-color-0);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-1" name="dir-color">
                                <div style="--circle-color: var(--theme-color-1);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-2" name="dir-color">
                                <div style="--circle-color: var(--theme-color-2);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-3" name="dir-color">
                                <div style="--circle-color: var(--theme-color-3);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-4" name="dir-color">
                                <div style="--circle-color: var(--theme-color-4);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-5" name="dir-color">
                                <div style="--circle-color: var(--theme-color-5);"></div>
                            </label><label>
                                <input type="radio" id="dir-color-6" name="dir-color">
                                <div style="--circle-color: var(--theme-color-6);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-7" name="dir-color">
                                <div style="--circle-color: var(--theme-color-7);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-8" name="dir-color">
                                <div style="--circle-color: var(--theme-color-8);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-9" name="dir-color">
                                <div style="--circle-color: var(--theme-color-9);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-10" name="dir-color">
                                <div style="--circle-color: var(--theme-color-10);"></div>
                            </label> <label>
                                <input type="radio" id="dir-color-11" name="dir-color">
                                <div style="--circle-color: var(--theme-color-11);"></div>
                            </label>
                        </div>
                        <label class="form-text">You can edit name or color of existing directory. Save all changes by clicking on SAVE button.</label>
                    </form>
                </div>
                <div class="menu-spacer"></div>
                <div class="menu-button-wrapper">
                    <button type="button" class="menu-button fluent-bg" onclick="closeMenu()">CANCEL</button>
                    <div class="menu-spacer"></div>
                    <button type="submit" class="menu-button menu-button-submit" id="menu-submit-button">SUBMIT</button>
                </div>
            </div>
            <div class="toolbar-wrapper">
                <div class="toolbar fluent-bg" id="toolbar-div">
                </div>
            </div>
        </div>
        <div class="loading-wrapper" id="loading-wrapper-div">
            <div class="loading-logo">
                <div class="box-particle-wrapper particle-logo">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <svg width="100%" height="100%" viewBox="0 0 72.431946 8.3819732" version="1.1">
                    <g id="layer1" transform="translate(38.365964,-164.94903)">
                        <path id="path840" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-size:10.5833px;line-height:1.25;font-family:Diavlo;-inkscape-font-specification:'Diavlo Heavy';fill:var(--main-fg-color);fill-opacity:1;stroke:none;stroke-width:0.999999" d="M 21.160156 0 L 21.160156 24.560547 C 21.160156 28.160547 22.879701 31.320312 26.679688 31.320312 C 27.839685 31.320312 29.280319 31.119529 30.320312 29.439453 C 27.92032 29.239516 27.878906 25.479284 27.878906 23.279297 L 27.878906 3.0800781 C 27.878906 0.040090723 21.600154 0 21.160156 0 z M 136.47852 0 L 136.47852 28.240234 C 136.47852 31.320209 143.19922 31.320312 143.19922 31.320312 L 143.19922 22.199219 C 150.0392 23.959194 146.87916 31.320312 153.11914 31.320312 C 154.07914 31.320312 157.03906 30.640625 157.03906 30.640625 C 153.99907 24.92065 154.07944 21.879441 148.43945 19.439453 C 152.27944 17.399453 152.95962 13.759297 155.59961 10.279297 C 154.35961 9.8793095 152.91851 9.6796875 151.47852 9.6796875 C 150.59852 9.6796875 148.39929 9.7208972 147.2793 11.880859 C 145.7193 14.800847 144.59921 16.519141 143.19922 17.119141 L 143.19922 3.0800781 C 143.19922 0.00010332185 136.47852 0 136.47852 0 z M 93.279297 0.080078125 L 93.279297 8.640625 C 93.279297 9.4406376 93.558594 10.720703 93.558594 10.720703 C 93.558594 10.720703 91.600228 9.4804688 89.240234 9.4804688 C 84.520251 9.4804688 80.439453 12.280872 80.439453 16.880859 L 80.439453 24.080078 C 80.439453 28.840091 84.040252 31.519531 90.240234 31.519531 C 91.680227 31.519531 93.959459 30.839844 96.439453 30.839844 C 97.799448 30.839844 98.840003 30.879582 100 31.519531 L 100 3.5605469 C 100 0.12057207 93.959294 0.080078125 93.279297 0.080078125 z M 234.75781 1.4804688 C 224.99784 1.4804688 221.55814 6.920247 227.07812 12.240234 C 227.07812 7.3602218 231.51782 6.5605469 234.75781 6.5605469 C 237.8378 6.5605469 239.11914 7.8390751 239.11914 10.039062 C 239.11914 12.719088 238.07811 13.519531 235.07812 13.519531 L 233.03906 13.519531 L 233.03906 14.080078 C 233.03906 18.04004 235.03906 18.359441 236.03906 18.439453 C 239.75905 18.759579 239.51953 21.000481 239.51953 22.480469 C 239.51953 24.760469 238.1178 26.480469 234.75781 26.480469 C 231.19783 26.480469 226.87953 25.640665 226.51953 20.720703 C 221.75955 25.800653 224.31785 31.519531 234.75781 31.519531 C 241.71779 31.519531 246.39844 28.200053 246.39844 23.080078 L 246.39844 21.880859 C 246.39844 19.520885 244.8396 16.558984 242.59961 15.958984 C 244.4796 15.358984 245.99805 12.719453 245.99805 10.439453 L 245.99805 9.4394531 C 245.99805 4.3994531 241.31779 1.4804688 234.75781 1.4804688 z M 262.19922 1.4804688 C 255.63924 1.4804688 250.95898 4.280819 250.95898 9.8007812 L 250.95898 10.439453 C 250.95898 12.759441 252.75852 15.679297 254.47852 16.279297 C 252.03852 16.879297 250.55859 19.6003 250.55859 22.320312 L 250.55859 23.199219 C 250.55859 28.759206 255.23924 31.519531 262.19922 31.519531 C 269.0792 31.519531 273.75781 28.640066 273.75781 23.080078 L 273.75781 22.320312 C 273.75781 19.6003 272.2789 16.879297 269.87891 16.279297 C 271.6389 15.679297 273.35938 12.759441 273.35938 10.439453 L 273.35938 9.8007812 C 273.35938 4.280819 268.6792 1.4804688 262.19922 1.4804688 z M 262.19922 6.359375 C 265.07921 6.359375 266.47852 7.2791658 266.47852 10.119141 C 266.47852 12.919128 265.43952 13.839844 262.51953 13.839844 L 261.87891 13.839844 C 258.87891 13.839844 257.83789 12.919128 257.83789 10.119141 C 257.83789 7.2791658 259.23923 6.359375 262.19922 6.359375 z M 206.60938 6.7460938 C 205.97938 6.7317168 205.55859 6.7597656 205.55859 6.7597656 L 205.55859 24 C 205.55859 28.719987 208.71877 31.519531 214.71875 31.519531 C 220.75873 31.519531 222.31836 28.759544 222.31836 26.519531 C 222.31836 24.959569 221.4782 23.759556 220.1582 22.519531 C 220.1582 26.079544 217.71976 26.679688 215.75977 26.679688 C 212.83977 26.679688 212.2793 25.360872 212.2793 22.880859 L 212.2793 16.039062 L 216.51953 16.039062 C 220.19952 16.039062 220.23828 11.160156 220.23828 11.160156 L 212.2793 11.160156 L 212.2793 9.8808594 C 212.2793 7.2108783 208.49937 6.7892247 206.60938 6.7460938 z M 9.640625 9.4804688 C 3.4406464 9.4804688 0 12.32 0 17 L 0 24 C 0 28.719987 3.8790827 31.519531 10.039062 31.519531 C 15.159045 31.519531 18.199219 29.200247 18.199219 26.240234 C 18.199219 25.20026 17.600702 23.919675 16.720703 22.679688 C 16.680716 24.679662 14.359908 26.640625 10.919922 26.640625 C 8.0799282 26.640625 6.7207031 25.560509 6.7207031 22.560547 L 6.7207031 18.320312 C 6.7207031 14.560325 8.9200857 14.240234 11.080078 14.240234 C 13.320072 14.240234 15.880859 15.639244 15.880859 19.199219 C 17.200856 17.279219 17.759766 15.640312 17.759766 14.320312 C 17.759766 10.240313 12.320616 9.4804688 9.640625 9.4804688 z M 42.519531 9.4804688 C 35.399555 9.4804688 32.080078 12.32 32.080078 17 L 32.080078 24 C 32.080078 28.719987 35.399555 31.519531 42.519531 31.519531 C 49.55951 31.519531 52.878906 28.719987 52.878906 24 L 52.878906 17 C 52.878906 12.32 49.55951 9.4804688 42.519531 9.4804688 z M 123.32031 9.4804688 C 117.12033 9.4804688 113.67969 11.679478 113.67969 16.439453 C 113.67969 25.279428 126.67969 21.080585 126.67969 24.560547 C 126.67969 26.560559 124.60031 26.759766 123.32031 26.759766 C 121.16032 26.759766 116.79867 26.520612 116.63867 22.640625 C 114.91868 24.200625 114.11914 25.639909 114.11914 26.919922 C 114.11914 29.639897 117.56033 31.519531 123.32031 31.519531 C 129.96029 31.519531 133.2793 28.999753 133.2793 24.759766 C 133.2793 15.039803 120.2793 19.159987 120.2793 16 C 120.2793 14.8 121.92001 14.320312 124 14.320312 C 126.75999 14.320312 130.16016 15.279622 130.16016 17.599609 C 131.44015 16.119622 132.03906 14.760612 132.03906 13.640625 C 132.03906 11.000625 128.76029 9.4804688 123.32031 9.4804688 z M 167.43945 9.4804688 C 164.67946 9.4804688 159 10.2803 159 14.320312 C 159 15.5603 159.35985 16.998997 160.83984 18.958984 C 160.83984 15.15901 164.27939 14.240234 167.35938 14.240234 C 169.95937 14.240234 170.67969 15.360313 170.67969 16.320312 C 168.83969 19.0003 158.43945 17.638984 158.43945 24.958984 C 158.43945 29.998947 162.7583 31.519531 167.23828 31.519531 C 169.59827 31.519531 171.83899 30.800781 173.95898 30.800781 C 175.07898 30.800781 176.27844 30.919342 177.39844 31.519531 L 177.39844 16.640625 C 177.39844 12.00065 173.95943 9.4804688 167.43945 9.4804688 z M 56.878906 9.6796875 L 56.878906 24.439453 C 56.878906 29.999441 61.680169 31.519531 66.160156 31.519531 C 68.200149 31.519531 70.079148 30.679688 72.119141 30.679688 C 74.639133 30.679688 76.439453 31.679688 76.439453 31.679688 L 76.439453 12.759766 C 76.439453 9.679753 69.71875 9.6796875 69.71875 9.6796875 L 69.71875 26.359375 C 69.71875 26.359375 68.078745 26.759766 66.71875 26.759766 C 64.398759 26.759766 63.599609 25.719856 63.599609 23.839844 L 63.599609 12.759766 C 63.599609 9.8397782 56.878906 9.6796875 56.878906 9.6796875 z M 181.59961 9.6796875 L 181.59961 24.439453 C 181.59961 29.999441 186.39892 31.519531 190.87891 31.519531 C 192.9189 31.519531 194.79985 30.679688 196.83984 30.679688 C 199.35984 30.679688 201.1582 31.679688 201.1582 31.679688 L 201.1582 12.759766 C 201.1582 9.679753 194.43945 9.6796875 194.43945 9.6796875 L 194.43945 26.359375 C 194.43945 26.359375 192.79945 26.759766 191.43945 26.759766 C 189.11946 26.759766 188.31836 25.719856 188.31836 23.839844 L 188.31836 12.759766 C 188.31836 9.8397782 181.59961 9.6796875 181.59961 9.6796875 z M 42.519531 14.199219 C 45.519524 14.199219 46.160156 15.399622 46.160156 17.599609 L 46.160156 23.400391 C 46.160156 25.600378 45.519524 26.839844 42.519531 26.839844 C 39.439541 26.839844 38.798828 25.600378 38.798828 23.400391 L 38.798828 17.599609 C 38.798828 15.399622 39.439541 14.199219 42.519531 14.199219 z M 89.759766 14.199219 C 91.559758 14.199219 93.279297 15.360053 93.279297 17.080078 L 93.279297 26.720703 C 93.279297 26.720703 91.838749 26.958984 90.71875 26.958984 C 87.99876 26.958984 87.160156 25.720481 87.160156 23.480469 L 87.160156 17.480469 C 87.160156 15.200469 88.239772 14.199219 89.759766 14.199219 z M 262.19922 18.720703 C 265.47921 18.720703 266.87891 19.840703 266.87891 22.720703 C 266.87891 25.640691 265.47921 26.679688 262.19922 26.679688 C 258.83923 26.679688 257.43945 25.639831 257.43945 22.839844 C 257.43945 19.839844 258.83923 18.720703 262.19922 18.720703 z M 170.79883 21.119141 L 170.79883 26.560547 C 170.79883 26.560547 169.3189 27 167.87891 27 C 166.51891 27 165.1582 26.600678 165.1582 24.720703 C 165.1582 22.160678 169.71883 22.799141 170.79883 21.119141 z M 104.47852 24.958984 L 104.47852 29.439453 C 104.47852 30.319478 105.51977 31.039062 106.75977 31.039062 L 110.40039 31.039062 L 110.40039 26.560547 C 110.40039 25.800522 109.39921 24.958984 108.19922 24.958984 L 104.47852 24.958984 z " transform="matrix(0.26458333,0,0,0.26458333,-38.365964,164.94903)" />
                    </g>
                </svg>
            </div>
        </div>

        <div class="screen-size-error">
            <div class="screen-size-error-box">
                <img class="screen-size-error-icon" src="img/aspect-ratio.svg">
                <div class="screen-size-error-text">
                    This aspect ration or screen size is not allowed. Please, resize window or open app on other device.
                </div>
            </div>
        </div>

        <script type="text/javascript" src="scripts/static.js">
        </script>
        <script type="text/javascript" src="scripts/data.js">
        </script>
        <script type="text/javascript" src="scripts/customNotifications.js">
        </script>
        <script type="text/javascript" src="scripts/init.js">
        </script>
        <script type="text/javascript" src="scripts/app.js">
        </script>
        <script type="text/javascript" src="scripts/settings.js">
        </script>
        <script type="text/javascript" src="scripts/gallery.js">
        </script>
        <script type="text/javascript" src="scripts/script.js">
        </script>
        <script>
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('sw.js')
                    .then(function() {
                        console.log("Service Worker Registered");
                    });
            }
        </script>
    </body>

    </html>
<?php
}
?>
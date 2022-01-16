<!--

************************************
theme.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
-->

<style>        <?php
        $id = $user['activePalette'];
        $active_palette_sql = "SELECT * FROM palette WHERE id='$id' LIMIT 1";
        $active_palette_result = $mysqli->query($active_palette_sql);
        $active_palette = $active_palette_result->fetch_assoc();
        
        ?>
    :root {

  --interactive-color: var(--theme-color-<?= $user['colorHighlight'] ?>);
  --interactive-color-complementary: var(--theme-color-<?= $user['colorHighlight'] ?>-complementary);
        --theme-color-0: #<?= $active_palette['color0'] ?>;
        --theme-color-1: #<?= $active_palette['color1'] ?>;
        --theme-color-2: #<?= $active_palette['color2'] ?>;
        --theme-color-3: #<?= $active_palette['color3'] ?>;
        --theme-color-4: #<?= $active_palette['color4'] ?>;
        --theme-color-5: #<?= $active_palette['color5'] ?>;
        --theme-color-6: #<?= $active_palette['color6'] ?>;
        --theme-color-7: #<?= $active_palette['color7'] ?>;
        --theme-color-8: #<?= $active_palette['color8'] ?>;
        --theme-color-9: #<?= $active_palette['color9'] ?>;
        --theme-color-10: #<?= $active_palette['color10'] ?>;
        --theme-color-11: #<?= $active_palette['color11'] ?>;
        --theme-color-0-complementary: #<?= $active_palette['colorComplementary0'] ?>;
        --theme-color-1-complementary: #<?= $active_palette['colorComplementary1'] ?>;
        --theme-color-2-complementary: #<?= $active_palette['colorComplementary2'] ?>;
        --theme-color-3-complementary: #<?= $active_palette['colorComplementary3'] ?>;
        --theme-color-4-complementary: #<?= $active_palette['colorComplementary4'] ?>;
        --theme-color-5-complementary: #<?= $active_palette['colorComplementary5'] ?>;
        --theme-color-6-complementary: #<?= $active_palette['colorComplementary6'] ?>;
        --theme-color-7-complementary: #<?= $active_palette['colorComplementary7'] ?>;
        --theme-color-8-complementary: #<?= $active_palette['colorComplementary8'] ?>;
        --theme-color-9-complementary: #<?= $active_palette['colorComplementary9'] ?>;
        --theme-color-10-complementary: #<?= $active_palette['colorComplementary10'] ?>;
        --theme-color-11-complementary: #<?= $active_palette['colorComplementary11'] ?>;
    }

    <?php
    if ($user['darktheme'] == 0) {
    ?>:root {
        --main-bg-color: #fff;
        --main-fg-color: #000;
        --main-line-color: #00000020;
        --menu-bg-color: #ffffffb8;
        --side-bg-color: #ededed;
        --side-bg-color-2: #ffffff;
        --side-grey-light: #f2f2f2;
        --fluent-border-light: #ffffff99;
        --fluent-border-dark: #00000020;
        --hyperlink-color: #1a4ed2;
        --notifications-error-color: #ff9e9e;
        --notifications-warning-color: #ffe16d;
        --notifications-confirm-color: #9eff7a;
    }

    <?php
    } else {
    ?>:root {
        --main-bg-color: #000;
        --main-fg-color: #fff;
        --main-line-color: #ffffff20;
        --menu-bg-color: #2d2d2dc7;
        --side-bg-color: #000;
        --side-bg-color-2: #282828;
        --side-grey-light: #4f4f4f;
        --fluent-border-light: #ffffff24;
        --fluent-border-dark: #00000084;
        --hyperlink-color: #1a4ed2;
        --notifications-error-color: #700000;
        --notifications-warning-color: #9a7b00;
        --notifications-confirm-color: #568559;
    }

    <?php
    }
    ?>
</style>
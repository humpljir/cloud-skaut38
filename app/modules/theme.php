<style>
    :root {
        <?php
        if ($user['darktheme'] == 0) {
        ?>--main-bg-color: #fff;
        --main-fg-color: #000;
        --main-line-color: #00000020;
        --menu-bg-color: #ffffffb8;
        --side-bg-color: #ededed;
        --side-bg-color-2: #ffffff;
        --side-grey-light: #f2f2f2;
        --fluent-border-light: #ffffff99;
        --fluent-border-dark: #00000020;
        --hyperlink-color: #1a4ed2;
        --notifications-error-color: #ff9e9ecf;
        --notifications-warning-color: #ffe16dbf;
        --notifications-confirm-color: #9eff7ab8;
    }

    <?php
        } else {
    ?>--main-bg-color:#000;
    --main-fg-color:#fff;
    --main-line-color:#ffffff20;
    --menu-bg-color:#2d2d2dc7;
    --side-bg-color:#000;
    --side-bg-color-2:#282828;
    --side-grey-light:#4f4f4f;
    --fluent-border-light:#ffffff24;
    --fluent-border-dark:#00000084;
    --hyperlink-color:#1a4ed2;
    --notifications-error-color:#700000cf;
    --notifications-warning-color:#9a7b00c7;
    --notifications-confirm-color:#c8eabcb8;
    }

    <?php
        }
    ?>
</style>
<?php
            $username = htmlspecialchars($_POST['register_username']);
            $password = htmlspecialchars($_POST['register_password']);
            $fullname = htmlspecialchars($_POST['register_fullname']);
            $email = htmlspecialchars($_POST['register_email']);

            $username_check = " SELECT * FROM users WHERE username='$username'";
            $username_check_results = $mysqli->query($username_check);
            if (!(($username_check_results) && ($username_check_results->num_rows !== 0))) {

            $param_password = password_hash($password, PASSWORD_DEFAULT);
            $img = 'default.svg';
            $toolbarReorder = '0,1,2,3';
            $toolbarDisplayIcon = 'true, true, true, true';
            $toolbarColors = '"var(--theme-color-1),var(--theme-color-3),var(--theme-color-4),var(--theme-color-5)';
            $toolbarColorsComplementary = 'var(--theme-color-1-complementary),var(--theme-color-3-complementary),var(--theme-color-4-complementary),var(--theme-color-5-complementary)';

            $sql = "INSERT INTO users (username, password, fullname, email, img, toolbarReorder, toolbarDisplayIcon, toolbarColors, toolbarColorsComplementary)
    VALUES ('$username','$param_password', '$fullname', '$email', '$img', '$toolbarReorder', '$toolbarDisplayIcon', '$toolbarColors', '$toolbarColorsComplementary')";
            if ($mysqli->query($sql) == TRUE) {
                add_global_error("Registration requested!", "var(--notifications-regular-color)");
            } else {
                add_global_error("Error requesting registration: " . $mysqli->error, "var(--notifications-warning-color)");
            }
        }else {
            add_global_error("This username already exists, try something else.", "var(--notifications-error-color)");
        }
?>
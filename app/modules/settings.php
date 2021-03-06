<?php
/*

************************************
settings.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
*/

$profile_pix_maxsize = 10485760;
$profile_pic_dir = 'data/users/profile_img/';

function settingsAccount($fullname, $nickname, $email)
{
    // updating account informations

    global $mysqli;

    $username_check = " SELECT * FROM users WHERE username='$nickname' AND id<>'$_SESSION[id]'";
    $username_check_results = $mysqli->query($username_check);
    if (!(($username_check_results) && ($username_check_results->num_rows !== 0))) {
        $sql = "UPDATE users SET username='$nickname', fullname='$fullname', email='$email' WHERE id='$_SESSION[id]'";
        if ($mysqli->query($sql) !== TRUE) {
            add_global_error("Error updating user: " . $mysqli->error, "var(--notifications-error-color)");
        } else {
            add_global_error("User updated.", "var(--notifications-regular-color)");
        }
    } else {
        add_global_error("This username is already used. Try something else!", "var(--notifications-error-color)");
    }
}

function chaneProfilePic()
{
    // changing profile pic

    global $mysqli;

    global $user;
    global $profile_pix_maxsize;
    global $profile_pic_dir;

    $fileExtension = strtolower(pathinfo(basename($_FILES["profile_pic"]["name"]), PATHINFO_EXTENSION));
    $tmpname = generate_name($profile_pic_dir, $fileExtension);
    $target_file = $profile_pic_dir . $tmpname;

    if($fileExtension != 'jpg' && $fileExtension != 'jpeg' && $fileExtension != 'png' && $fileExtension != 'gif') {
        add_global_error("Only jpg, jpeg, png & gif files are allowed.", "var(--notifications-error-color)");
        return;
    }

    if ($_FILES["profile_pic"]["size"] > $profile_pix_maxsize) {
        add_global_error("Sorry, your file is too big. Max size of an profile image is 10 MB.", "var(--notifications-error-color)");
        return;
      }

    if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $profile_pic_dir . $tmpname)) {
            createThumbnail($target_file, $target_file, 60, 60);
            // trying to simply overwrite original file - cannot verify if that works
            
            $del_path = mysqli_query($mysqli, "SELECT img FROM users WHERE id='$_SESSION[id]' LIMIT 1");
            while ($path = mysqli_fetch_array($del_path)) {
                if (!unlink($profile_pic_dir . $path['link'])) {
                    add_global_error("ERROR deleting old profile pic.","var(--notifications-error-color)");
                }
            }

        $sql = "UPDATE users SET img='$tmpname' WHERE id='$_SESSION[id]'";
        if ($mysqli->query($sql) !== TRUE) {
            add_global_error("Error uplaoding file: " . $mysqli->error, "var(--notifications-warning-color)");
        }
    } else {
        add_global_error("Sorry, there was an error uploading your file.", "var(--notifications-error-color)");
    }
}

function settingsPassword($password)
{
    // updating password - maybe request old one before that?

    global $mysqli;
    $param_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "UPDATE users SET password='$param_password' WHERE id='$_SESSION[id]'";
    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating password: " . $mysqli->error, "var(--notifications-error-color)");
    } else {
        add_global_error("Password updated.", "var(--notifications-regular-color)");
    }
}

function settingsTheme($palette,$color)
{
    // updating theme settings

    global $mysqli;
    $dark=(int)isset($_POST['switch-dark']);
    $topBar=(int)isset($_POST['switch-top-bar']);

    $sql = "UPDATE users SET darktheme='$dark', activePalette='$palette', colorHighlight='$color', topbarAutoHeight='$topBar' WHERE id='$_SESSION[id]'";
    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating theme: " . $mysqli->error, "var(--notifications-error-color)");
    } else {
        add_global_error("Theme updated.", "var(--notifications-regular-color)");
    }
}

function settingsToolbar($colors,$colorsComplementary,$delete,$reorder)
{
    // update toolbar settings

    global $mysqli;
    $visible=(int)isset($_POST['switch-toolbar-enable']);
    $autohide=(int)isset($_POST['switch-toolbar-autohide']);
    $custom=(int)isset($_POST['switch-toolbar-custom']);

    $sql = "UPDATE users SET toolbarVisible='$visible', toolbarAutoHeight='$autohide', toolbarCustom='$custom', toolbarColors='$colors', toolbarColorsComplementary='$colorsComplementary', toolbarDisplayIcon='$delete', toolbarReorder='$reorder' WHERE id='$_SESSION[id]'";
    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating toolbar: " . $mysqli->error, "var(--notifications-error-color)");
    } else {
        add_global_error("Toolbar updated.", "var(--notifications-regular-color)");
    } 
}

function settingsPWANotifications()
{
    // update pwa notifications settings

    global $mysqli;
    $notifications=(int)isset($_POST['pwa-notifications-on']);

    $sql = "UPDATE users SET notifications='$notifications' WHERE id='$_SESSION[id]'";
    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating settings: " . $mysqli->error, "var(--notifications-error-color)");
    } else {
        add_global_error("Settings updated.", "var(--notifications-regular-color)");
    } 
}
?>
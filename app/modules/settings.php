<?php
$profile_pix_maxsize = 10485760;
$profile_pic_dir = 'data/users/profile_img/';

function settingsAccount($fullname, $nickname, $email)
{
    global $mysqli;

    $username_check = " SELECT * FROM users WHERE username='$nickname'";
    $username_check_results = $mysqli->query($username_check);
    if (($username_check_results) && ($username_check_results->num_rows !== 0)) {
        $sql = "UPDATE users SET username='$nickname', fullname='$fullname', email='$email' WHERE id='$_SESSION[id]'";
        if ($mysqli->query($sql) !== TRUE) {
            add_global_error("Error updating user: " . $mysqli->error, "var(--notifications-error-color)");
        } else {
            add_global_error("User updated.", "var(--notifications-regular-color)");
        }
    }
}

function chaneProfilePic() {
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
    global $mysqli;
    $param_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "UPDATE users SET password='$param_password' WHERE id='$_SESSION[id]'";
    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating password: " . $mysqli->error, "var(--notifications-error-color)");
    } else {
        add_global_error("Password updated.", "var(--notifications-regular-color)");
    }
}

function settingsTheme()
{
    global $mysqli;
    $palette= $_POST['palette'];
    $color= $_POST['color'];
    $dark=isset($_POST['switch-dark']);
    $topBar=isset($_POST['switch-top-bar']);

    add_global_error("Values are: ".$palette."/".$color."/".$dark."/".$topBar, "var(--notifications-regular-color)");

    $sql = "UPDATE users SET darktheme='$dark', activePalette=' str_replace(, , $palette)', colorHighlight='$color', topbarAutoHeight='$topBar' WHERE id='$_SESSION[id]'";
    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating password: " . $mysqli->error, "var(--notifications-error-color)");
    } else {
        add_global_error("Password updated.", "var(--notifications-regular-color)");
    }
}

function settingsToolbar() {

}
?>
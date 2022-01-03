<?php
include_once("name_generator.php");
include_once("image_resize.php");
$target_dir = "data/storage/";

function file_delete($id)
{
    global $mysqli;
    global $target_dir;

    $del_path = mysqli_query($mysqli, "SELECT link FROM files WHERE id='$id'");
    while ($path = mysqli_fetch_array($del_path)) {
        if (unlink($target_dir . $path['link'])) {
            add_global_error("Soubor byl odstraněn!", "var(--notifications-regular-color)");
            $sql = "DELETE FROM files WHERE id='$id'";
            if ($mysqli->query($sql) === TRUE) {
                add_global_error("Záznam v databázi byl odstraněn!", "var(--notifications-regular-color)");
            } else {
                add_global_error("Error v databázi: " . $mysqli->error, "var(--notifications-error-color)");
            }
        } else {
            add_global_error("Error mazání souboru. ID='" . $id . " url= " . $path['link'], "var(--notifications-error-color)");
        }
    }
}

function file_new($name, $target)
{
    global $mysqli;
    global $user;
    global $target_dir;
    $now = new DateTime();

    $uploadError = 0;
    $filename = basename($_FILES["file_upload"]["name"]);
    $target_file = $target_dir . $filename;
    $fileExtension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $tmpname = generate_name($target_dir, $fileExtension);

    // Check if $uploadOk is set to 0 by an error
    if ($uploadError == 1) {
        add_global_error("Error uploading file!", "var(--notifications-error-color)");
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["file_upload"]["tmp_name"], $target_dir . $tmpname)) {
            if (filesize($target_dir.$tmpname) == TRUE) {
                $fileSize = filesize($target_dir.$tmpname);
            } else {
                $fileSize = 0;
                add_global_error("Error determining size of file " . $target_dir . $tmpname, "var(--notifications-warning-color)");
            }

            if (
                $fileExtension == "jpg" || $fileExtension == "png" || $fileExtension == "jpeg"
                || $fileExtension == "gif"
            ) {
                createThumbnail($target_dir . $tmpname, $target_dir . "thumbnails/" . $tmpname, 120);
                $fileType = "image";
                /*
                if(createThumbnail($target_file, $target_dir . "thumbnails/" . $tmpname, 80, 120)){
                    $fileType = "image";
                }
                else {
                    $fileType = "unknown";
                    add_global_error("Error creating thumbnail, preview of this picture is disabled", "var(--notifications-error-color)");
                }*/
            } else if ($fileExtension == "pdf" || $fileExtension == "docx" || $fileExtension == "odt") {
                $fileType = "document";
            } else {
                $fileType = "unknown";
            }

            $sql = "INSERT INTO files (name, date, extension, link, legacylink, type, size, dirid, author)
        VALUES ('$name', '$now->getTimestamp()', '$fileExtension', '$tmpname', '$filename', '$fileType', '$fileSize', '$target', '$user[username]')";

            if ($mysqli->query($sql) !== TRUE) {
                add_global_error("Error uplaoding file: " . $mysqli->error, "var(--notifications-warning-color)");
            }
        } else {
            add_global_error("Sorry, there was an error uploading your file.", "var(--notifications-error-color)");
        }
    }
}

function directory_new($name, $color)
{
    global $mysqli;
    global $user;
    $now = new DateTime();

    $sql = "INSERT INTO directories (name, date, color, author)
    VALUES ('$name',UTC_TIMESTAMP(), '$color', '$user[username]')";
    if ($mysqli->query($sql) == TRUE) {
        add_global_error("Directory created!", "var(--notifications-regular-color)");
    } else {
        add_global_error("Error creating directory: " . $mysqli->error, "var(--notifications-warning-color)");
    }
}

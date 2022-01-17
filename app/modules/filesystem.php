<?php
/*

************************************
filesystem.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
*/

include_once("name_generator.php");
include_once("image_resize.php");
$target_dir = "data/storage/";

function dir_delete($id)
{
    // delete all files from directory and the directory itself

    global $mysqli;

    $del_path = mysqli_query($mysqli, "SELECT id FROM files WHERE dirid='$id'");
    while ($path = mysqli_fetch_array($del_path)) {
        file_delete($path['id']);
    }

    $sql = "DELETE FROM directories WHERE id='$id'";
    if ($mysqli->query($sql) === TRUE) {
        add_global_error("Záznam v databázi byl odstraněn!", "var(--notifications-regular-color)");
    } else {
        add_global_error("Error v databázi: " . $mysqli->error, "var(--notifications-error-color)");
    }
}

function file_delete($id)
{
    // delete file (file & mysql row) by given id

    global $mysqli;
    global $target_dir;

    $del_path = mysqli_query($mysqli, "SELECT link, type FROM files WHERE id='$id'");
    while ($path = mysqli_fetch_array($del_path)) {
        if (unlink($target_dir . $path['link'])) {
            add_global_error("File deleted!", "var(--notifications-regular-color)");

            if ($path['type'] == 'image') {
                if (unlink($target_dir . "thumbnails/" . $path['link'])) {
                    add_global_error("Thumbnail deleted!", "var(--notifications-regular-color)");
                } else {
                    add_global_error("ERROR deleting thumbnail of file. ID='" . $id . " url= " . $path['link'], "var(--notifications-error-color)");
                }
            }

            $sql = "DELETE FROM files WHERE id='$id'";
            if ($mysqli->query($sql) === TRUE) {
                add_global_error("MySQL line deleted!", "var(--notifications-regular-color)");
            } else {
                add_global_error("MySQL deleting error: " . $mysqli->error, "var(--notifications-error-color)");
            }
        } else {
            add_global_error("ERROR deleting file. ID='" . $id . " url= " . $path['link'], "var(--notifications-error-color)");
        }
    }

    calculateSize();
}

function file_new($name, $target)
{
    // upload new file

    global $mysqli;
    global $user;
    global $target_dir;

    $filename = basename($_FILES["file_upload"]["name"]);
    $target_file = $target_dir . $filename;
    $fileExtension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $tmpname = generate_name($target_dir, $fileExtension);

    if (move_uploaded_file($_FILES["file_upload"]["tmp_name"], $target_dir . $tmpname)) {

        if (filesize($target_dir . $tmpname) == TRUE) {
            $fileSize = filesize($target_dir . $tmpname);
        } else {
            $fileSize = 0;
            add_global_error("Error determining size of file " . $target_dir . $tmpname, "var(--notifications-warning-color)");
        }

        if (
            $fileExtension == "jpg" || $fileExtension == "png" || $fileExtension == "jpeg"
            || $fileExtension == "gif"
        ) {
            // for images - create preview thumbnail

            createThumbnail($target_dir . $tmpname, $target_dir . "thumbnails/" . $tmpname, 120, 80);
            $fileType = "image";
        } else if ($fileExtension == "pdf" || $fileExtension == "docx" || $fileExtension == "odt") {
            $fileType = "document";
        } else {
            $fileType = "unknown";
        }

        $sql = "INSERT INTO files (name, extension, link, legacylink, type, size, dirid, author)
        VALUES ('$name', '$fileExtension', '$tmpname', '$filename', '$fileType', '$fileSize', '$target', '$user[username]')";

        if ($mysqli->query($sql) !== TRUE) {
            add_global_error("Error uplaoding file: " . $mysqli->error, "var(--notifications-warning-color)");
        }
    } else {
        add_global_error("Sorry, there was an error uploading your file.", "var(--notifications-error-color)");
    }

    calculateSize();
}

function file_edit($id, $name)
{
    // edit file informations - needs to add folder selector as well

    global $mysqli;

    $sql = "UPDATE files SET name='$name' WHERE id='$id'";

    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating file: " . $mysqli->error, "var(--notifications-error-color)");
    } else {
        add_global_error("File updated.", "var(--notifications-regular-color)");
    }
}

function dir_edit($id, $name, $color)
{
    // edit directory info

    global $mysqli;

    $sql = "UPDATE directories SET name='$name', color='$color' WHERE id='$id'";

    if ($mysqli->query($sql) !== TRUE) {
        add_global_error("Error updating file: " . $mysqli->error, "var(--notifications-warning-color)");
    } else {
        add_global_error("File updated.", "var(--notifications-regular-color)");
    }
}

function directory_new($name, $color)
{
    // create a new directory - in the future, each dir should have own table of files

    global $mysqli;
    global $user;

    $sql = "INSERT INTO directories (name, date, color, size, author)
    VALUES ('$name',UTC_TIMESTAMP(), '$color',0 , '$user[id]')";
    if ($mysqli->query($sql) == TRUE) {
        add_global_error("Directory created!", "var(--notifications-regular-color)");
    } else {
        add_global_error("Error creating directory: " . $mysqli->error, "var(--notifications-error-color)");
    }
}

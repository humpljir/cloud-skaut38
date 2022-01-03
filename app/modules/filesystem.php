<?php
include_once("name_generator.php");

function file_delete($id)
{
    global $mysqli;
    $del_path = mysqli_query($mysqli, "SELECT url FROM files WHERE id='$id'");
    while ($path = mysqli_fetch_array($del_path)) {
        if (unlink("../files/uploads/" . $path['link'])) {
            add_global_error("Soubor byl odstraněn!", "var(--notifications-regular-color)");
            $sql = "DELETE FROM soubory WHERE id='$id'";
            if ($mysqli->query($sql) === TRUE) {
                add_global_error("Záznam v databázi byl odstraněn!", "var(--notifications-regular-color)");
            } else {
                add_global_error("Error v databázi: " . $mysqli->error, "var(--notifications-error-color)");
            }
        } else {
            add_global_error("Error mazání souboru. ID='" . $id . " url= " . $path['url'], "var(--notifications-error-color)");
        }
    }
}

function file_new($name,$target)
{
    global $mysqli;
    global $user;
    $now = new DateTime();

    echo "<script>console.log('uploading file')</script>";
    $target_dir = "data/storage/";
    $uploadError = 0;
    $filename = basename($_FILES["file_upload"]["name"]);
    $target_file = $target_dir . $filename;
    $fileExtension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $tmpname = generate_name($target_dir,$fileExtension);

    if (
        $fileExtension == "jpg" || $fileExtension == "png" || $fileExtension == "jpeg"
        || $fileExtension == "gif"
    ) {
        $fileType = "image";
    } else if ($fileExtension == "pdf" || $fileExtension == "docx" || $fileExtension == "odt") {
        $fileType = "document";
    } else {
        $fileType = "unknown";
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadError == 1) {
        add_global_error("Soubor nebyl nahrán!", "var(--notifications-error-color)");
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["file_upload"]["tmp_name"], $target_dir.$tmpname)) {
            if (filesize($target_file) == TRUE) {
                $fileSize = filesize($target_file);
            } else {
                $fileSize = 0;
                add_global_error("Error determining size of file " . $target_file, "var(--notifications-warning-color)");
            }

            $sql = "INSERT INTO files (name, date, extension, link, legacylink, type, size, dirid, author)
        VALUES ('$name', '$now->getTimestamp()', '$fileExtension', '$tmpname', 'basename($_FILES[file_upload][name])', '$fileType', '$fileSize', '$target', '$user[username]')";

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

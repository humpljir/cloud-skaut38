<?php
function file_delete($id) {
    global $mysqli;
    echo "<script>console.log('deleting file')</script>";
    $del_path = mysqli_query($mysqli, "SELECT url FROM files WHERE id='$id'");
    while ($path = mysqli_fetch_array($del_path)) {
        if (unlink("../files/uploads/" . $path['link'])) {
            add_global_error("Soubor byl odstraněn!","var(--notifications-regular-color)");
            $sql = "DELETE FROM soubory WHERE id='$id'";
            if ($mysqli->query($sql) === TRUE) {
                add_global_error("Záznam v databázi byl odstraněn!","var(--notifications-regular-color)");
            } else {
                add_global_error("Error v databázi: " . $mysqli->error,"var(--notifications-error-color)");
            }
        } else {
            add_global_error("Error mazání souboru. ID='" . $id . " url= " . $path['url'],"var(--notifications-error-color)");
        }
    }
}

function file_new($name) {
    global $mysqli;
    echo "<script>console.log('uploading file')</script>";
    $target_dir = "data/storage/";
    $target_file = $target_dir.basename($_FILES["file_upload"]["name"]);
    $uploadError = 0;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if file already exists
    if (file_exists($target_file)) {
        add_global_error("Tento soubor už jednou nahrán byl.","var(--notifications-warning-color)");
        $uploadError = 1;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadError == 1) {
        add_global_error("Soubor nebyl nahrán!","var(--notifications-error-color)");
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["file_upload"]["tmp_name"], $target_file)) {
            $sql = "INSERT INTO files (name, date, extension, link, type, size, dirid)
        VALUES ('$name', '1640867409', 'unknown', '$target_file', 'unknown', '1000', '0')";

            if ($mysqli->query($sql) !== TRUE) {
                add_global_error("Error uplaoding file: " . $mysqli->error,"var(--notifications-warning-color)");
            }
        } else {
            add_global_error("Sorry, there was an error uploading your file.","var(--notifications-error-color)");
        }
    }
}

function directory_new($name,$color) {
    global $mysqli;
    $sql = "INSERT INTO directories (name, date, color)
    VALUES ('$name', '1640867409', '$color')";
                if ($mysqli->query($sql) == TRUE) {
                    add_global_error("Directory created!","var(--notifications-regular-color)");
                }
                else {
                    add_global_error("Error creating directory: " . $mysqli->error,"var(--notifications-warning-color)");
                }
}

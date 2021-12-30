<?php
function file_delete($id) {
    echo "<script>console.log('deleting file')</script>";
    $del_path = mysqli_query($mysqli, "SELECT url FROM files WHERE id='$id'");
    while ($path = mysqli_fetch_array($del_path)) {
        if (unlink("../files/uploads/" . $path['link'])) {
            echo "<script type='text/javascript'>alert('Soubor byl odstraněn!');</script>";
            $sql = "DELETE FROM soubory WHERE id='$id'";
            if ($mysqli->query($sql) === TRUE) {
                echo "<script type='text/javascript'>alert('Záznam v databázi byl odstraněn!');</script>";
            } else {
                echo "<script type='text/javascript'>alert('Error v databázi: " . $mysqli->error;
                "');</script>";
            }
        } else {
            echo "<script type='text/javascript'>alert('Error mazání souboru. ID='" . $id . "url=" . $path['url'] . ");</script>";
        }
    }
}

function file_upload($name) {
    echo "<script>console.log('uploading file')</script>";
    $target_dir = "../files/uploads/";
    $target_file = $target_dir . basename($_FILES["file-upload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "<script type='text/javascript'>alert('Tento soubor už jednou nahrán byl.');</script>";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "<script type='text/javascript'>alert('Soubor nebyl nahrán!');</script>";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["file-upload"]["tmp_name"], $target_file)) {
            $sql = "INSERT INTO files (name, date, extension, link, type, size, dirid)
        VALUES ('$name', '1640867409', 'unknown', '$target_file', 'unknown', '1000', '0')";

            if ($mysqli->query($sql) !== TRUE) {
                echo "<script type='text/javascript'>alert('Error uplaoding file: " . $mysqli->error;
                "');</script>";
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}

?>
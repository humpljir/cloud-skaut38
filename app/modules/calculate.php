<?php
$max_size = -1;

function calculateSize()
{
    global $mysqli;
    global $max_size;
    $dir_size = $global_size = 0;

    $dir_sql = "SELECT id FROM directories";
    $dir_result = $mysqli->query($dir_sql);
    while ($dir = $dir_result->fetch_assoc()) {

        $file_sql = "SELECT size FROM files WHERE dirid='$dir[id]'";
        $file_result = $mysqli->query($file_sql);
        while ($size = $file_result->fetch_assoc()) {
            $dir_size += $size['size'];
        }

        $sql = "UPDATE directories SET size='$dir_size' WHERE id='$dir[id]'";
        if ($mysqli->query($sql) !== TRUE) {
            add_global_error("Error updating dir size: " . $mysqli->error, "var(--notifications-error-color)");
        }

        $global_size += $dir_size;
        $dir_size = 0;
    }
    $sql = "INSERT INTO data (size, sizeAll)
    VALUES ('$global_size', '$max_size')";

        if ($mysqli->query($sql) !== TRUE) {
            add_global_error("Error uplaoding file: " . $mysqli->error, "var(--notifications-warning-color)");
        }
}

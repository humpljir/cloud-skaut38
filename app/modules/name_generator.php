<?php
function generate_name($place,$extension) {
    while (true) {
        $filename = uniqid('cloud_skaut38_', true) . '.' . $extension;
        if (!file_exists($place . $filename)) break;
       }
       return $filename;
}
?>
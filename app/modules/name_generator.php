<?php
/*

************************************
name_generator.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
*/

function generate_name($place,$extension) {
    //generate new and uniqe name - it's harder to accidentally find the url of file

    while (true) {
        $filename = uniqid('cloud_skaut38_', true) . '.' . $extension;
        if (!file_exists($place . $filename)) break;
       }
       return $filename;
}
?>
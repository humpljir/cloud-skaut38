<?php
/*

************************************
error.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
*/

$global_error = '';

function add_global_error($error_msg,$color)
{
    // function for handling errors and notifications in php, probably merge it with clinet-side js error handler in the future and add error logging into db

    global $global_error;
    $global_error .= 'pushCustomNotifications("' . $error_msg . '","'.$color.'");';
}

function custom_error($errno, $errstr, $errfile, $errline)
{
    // using custom error handler for system errors in php

    add_global_error("[$errno] $errstr<br>Error on line $errline in $errfile","var(--notifications-error-color)");
}

set_error_handler("custom_error");
?>
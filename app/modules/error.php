<?php
$global_error = '';

function add_global_error($error_msg)
{
    global $global_error;
    $global_error .= 'pushCustomNotifications("' . $error_msg . '","var(--notifications-confirm-color)");';
}
?>
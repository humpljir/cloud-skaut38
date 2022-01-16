<?php
/*

************************************
logout.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
*/

// Initialize the session
session_start();
 
// Unset all of the session variables
$_SESSION = array();
 
// Destroy the session.
session_destroy();
 
// Redirect to login page
header("location: ../login.php?why=logout");
exit;
?>
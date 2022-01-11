<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'humpljir');
define('DB_PASSWORD', 'webove aplikace');
define('DB_NAME', 'humpljir');
 
/* Attempt to connect to MySQL database */
$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($mysqli === false){
    die("ERROR: Could not connect. " . $mysqli->connect_error);
}
?>
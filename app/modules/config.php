<?php
$servername = "localhost";
$username = "humpljir";
$password = "webove aplikace";

$db_conn = new mysqli($servername, $username, $password);

if ($db_conn->connect_error) {
echo "<script>console.log('connection error')</script>";
  die("Connection failed: " . $db_conn->connect_error);
}
echo "<script>console.log('connected to db')</script>";
?>  
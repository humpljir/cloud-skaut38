<?php
$servername = "localhost";
$username = "humpljir";
$password = "webove aplikace";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
echo "<script>console.log('connection error')</script>";
  die("Connection failed: " . $conn->connect_error);
}
echo "<script>console.log('connected to db')</script>";
?>  
<?php
$servername = "localhost";
$username = "username";
$password = "password";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
echo "<script>console.log('connection error')</script>";
  die("Connection failed: " . $conn->connect_error);
}
echo "<script>console.log('connected')</script>";
?>  
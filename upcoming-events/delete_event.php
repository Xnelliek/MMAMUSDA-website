<?php

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mamusdac_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

// Get the event ID from the URL
$id = $_GET["id"];

// Delete the event from the database
$sql = "DELETE FROM church_events WHERE id=$id";
$result = $conn->query($sql);

if ($result) {
echo "Event deleted successfully.";
} else {
echo "Error deleting event: " . $conn->error;
}

$conn->close();

?>

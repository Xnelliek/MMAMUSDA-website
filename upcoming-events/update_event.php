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

// Get the event data from the database
$sql = "SELECT * FROM church_events WHERE id=$id";
$result = $conn->query($sql);

// Display the event data in a form
if ($result->num_rows > 0) {
$row = $result->fetch_assoc();

echo "<h2>Update Event</h2>";
echo "<form action=\"update_event.php?id=$id\" method=\"post\">";
echo "<input type=\"text\" name=\"name\" value=\"" . $row["name"] . "\">";
echo "<input type=\"text\" name=\"description\" value=\"" . $row["description"] . "\">";
echo "<input type=\"date\" name=\"start_date\" value=\"" . $row["start_date"] . "\">";
echo "<input type=\"date\" name=\"end_date\" value=\"" . $row["end_date"] . "\">";
echo "<input type=\"text\" name=\"location\" value=\"" . $row["location"] . "\">";
echo "<input type=\"submit\" name=\"submit\" value=\"Update\">";
echo "</form>";
} else {
echo "Event not found.";
}

// Validate the updated event data and prevent SQL injection
// ...

// Update the event data in the database
// ...


?>

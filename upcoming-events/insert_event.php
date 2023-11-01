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

// Get the event data from the HTML form
$name = $_POST["name"];
$description = $_POST["description"];
$start_date = $_POST["start_date"];
$end_date = $_POST["end_date"];
$location = $_POST["location"];

// Insert the event data into the database
$sql = "INSERT INTO church_events (name, description, start_date, end_date, location) VALUES ('$name', '$description', '$start_date', '$end_date', '$location')";
$result = $conn->query($sql);

if ($result) {
echo "Event saved successfully.";
} else {
echo "Error saving event: " . $conn->error;
}

// Get all events from the database
$sql = "SELECT * FROM church_events";
$result = $conn->query($sql);

// Display the events in a table
if ($result->num_rows > 0) {
echo "<h2>Saved Events</h2>";
echo "<table border=\"1\">";
echo "<tr>";
echo "<th>ID</th>";
echo "<th>Name</th>";
echo "<th>Description</th>";
echo "<th>Start Date</th>";
echo "<th>End Date</th>";
echo "<th>Location</th>";
echo "<th>Delete</th>";
echo "<th>Update</th>";
echo "</tr>";

while($row = $result->fetch_assoc()) {
echo "<tr>";
echo "<td>" . $row["id"] . "</td>";
echo "<td>" . $row["name"] . "</td>";
echo "<td>" . $row["description"] . "</td>";
echo "<td>" . $row["start_date"] . "</td>";
echo "<td>" . $row["end_date"] . "</td>";
echo "<td>" . $row["location"] . "</td>";
echo "<td><a href=\"delete_event.php?id=" . $row["id"] . "\">Delete</a></td>";
echo "<td><a href=\"update_event.php?id=" . $row["id"] . "\">Update</a></td>";
echo "</tr>";
}

echo "</table>";
} else {
echo "No events found.";
}

$conn->close();
?>

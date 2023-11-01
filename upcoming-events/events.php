<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "mamusdac_db";

$mysqli = new mysqli($servername, $username, $password, $database);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $startTime = $_POST['startTime'];
    $endTime = $_POST['endTime'];
    $location = $_POST['location'];
    
    // Insert data into the database
    $sql = "INSERT INTO church_events (name, description, start_time, end_time, location) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("sssss", $name, $description, $startTime, $endTime, $location);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $stmt->close();
}

// Retrieve list of registered events
$result = $mysqli->query("SELECT * FROM church_events");
$events = array();
while ($row = $result->fetch_assoc()) {
    $events[] = $row;
}

$mysqli->close();

// Return the list as JSON
header('Content-Type: application/json');
echo json_encode($events);
?>
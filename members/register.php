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
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $role = $_POST['role'];
    $is_leader = isset($_POST['is_leader']) ? 1 : 0;

    // Insert data into the database
    $sql = "INSERT INTO church_members (name, email, phone, address, role, is_leader) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("sssssi", $name, $email, $phone, $address, $role, $is_leader);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $stmt->close();
}

// Retrieve list of registered members
$result = $mysqli->query("SELECT * FROM church_members");
$members = array();
while ($row = $result->fetch_assoc()) {
    $members[] = $row;
}

$mysqli->close();

// Return the list as JSON
header('Content-Type: application/json');
echo json_encode($members);
?>

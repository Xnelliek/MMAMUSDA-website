<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "mamusdac_db"; // Update with your database name

$mysqli = new mysqli($servername, $username, $password, $database);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $contact = $_POST['contact'];
    $email = $_POST['email'];
    $academic_year = $_POST['academic_year'];
    $role = $_POST['role'];

    // Insert data into the 'church_mission2023' table
    $sql = "INSERT INTO church_mission2023 (name, contact, email, academic_year, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("sssss", $name, $contact, $email, $academic_year, $role);

    if ($stmt->execute()) {
        echo "Registration successful!";
        echo '<a href="index.html">Go back to the homepage</a>';
    } else {
        echo "Registration failed.";
    }

    $stmt->close();
}

// Retrieve list of registered members from the 'church_mission2023' table
$result = $mysqli->query("SELECT * FROM church_mission2023");

// Create an HTML table to display the data
echo '<table border="1">';
echo '<tr><th>ID</th><th>Name</th><th>Contact</th><th>Email</th><th>Academic Year</th><th>Role</th><th>Created At</th><th>Updated At</th></tr>';
while ($row = $result->fetch_assoc()) {
    echo '<tr>';
    echo '<td>' . $row['id'] . '</td>';
    echo '<td>' . $row['name'] . '</td>';
    echo '<td>' . $row['contact'] . '</td>';
    echo '<td>' . $row['email'] . '</td>';
    echo '<td>' . $row['academic_year'] . '</td>';
    echo '<td>' . $row['role'] . '</td>';
    echo '<td>' . $row['created_at'] . '</td>';
    echo '<td>' . $row['updated_at'] . '</td>';
    echo '</tr>';
}
echo '</table>';

$mysqli->close();
echo '<a href="download.php">Download as Excel</a>';
?>

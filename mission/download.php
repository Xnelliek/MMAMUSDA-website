<?php
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=church_mission2023.xls");

$servername = "localhost";
$username = "root";
$password = "";
$database = "mamusdac_db";

$mysqli = new mysqli($servername, $username, $password, $database);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Retrieve list of registered members from the 'church_mission2023' table
$result = $mysqli->query("SELECT * FROM church_mission2023");

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
?>

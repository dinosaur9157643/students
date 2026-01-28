<?php
include 'db.php';

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}


// JSON header
header('Content-Type: application/json');

// Fetch students
$query = "SELECT * FROM students";
$result = mysqli_query($conn, $query);

$students = [];
while ($row = mysqli_fetch_assoc($result)) {
    $students[] = $row;
}

echo json_encode($students);


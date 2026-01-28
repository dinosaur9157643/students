<?php
include  'db.php';

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}


// JSON header
header('Content-Type: application/json');

// Get input
$data = json_decode(file_get_contents("php://input"), true);

$name = mysqli_real_escape_string($conn, $data['name']);
$age = (int)$data['age'];
$course = mysqli_real_escape_string($conn, $data['course']);

$query = "INSERT INTO students (name, age, course) VALUES ('$name', $age, '$course')";
if (mysqli_query($conn, $query)) {
    echo json_encode(["success" => true, "id" => mysqli_insert_id($conn)]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}


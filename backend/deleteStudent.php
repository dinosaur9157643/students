<?php
include 'db.php';

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

$id = (int)$data['id'];

$query = "DELETE FROM students WHERE id=$id";
if (mysqli_query($conn, $query)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}

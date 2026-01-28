<?php
$servername = "localhost"; // usually localhost
$username = "root";        // your DB username
$password = "";            // your DB password
$dbname = "students_db";   // your database name

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die(json_encode(["error" => "Database connection failed"]));
}


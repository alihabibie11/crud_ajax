<?php
include 'connection.php';

$sql = mysqli_query($connection, "SELECT * FROM product");
$result = array();

while ($data = mysqli_fetch_array($sql)) {
    $result[] = $data;
}

echo json_encode($result);

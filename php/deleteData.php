<?php
include 'connection.php';

$id = $_POST['id'];

$sql = mysqli_query($connection, "DELETE FROM product WHERE id='$id' ");

if ($sql) {
    $result['status'] = '1';
    $result['msg'] = 'Berhasil Hapus Data!';
} else {
    $result['status'] = '0';
    $result['msg'] = 'Gagal Hapus Data!';
}

echo json_encode($result);

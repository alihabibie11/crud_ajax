<?php
include 'connection.php';

$nama_barang = $_POST['nama_barang'];
$harga_barang = $_POST['harga_barang'];
$stok = $_POST['stok'];

$sql = mysqli_query($connection, "INSERT INTO product VALUES(null, '$nama_barang', '$harga_barang', '$stok')");

if ($sql) {
    $result['status'] = '1';
    $result['msg'] = 'Berhasil Tambah Data!';
} else {
    $result['status'] = '0';
    $result['msg'] = 'Gagal Tambah Data!';
}

echo json_encode($result);

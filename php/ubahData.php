<?php
include 'connection.php';

$nama_barang = $_POST['nama_barang'];
$harga_barang = $_POST['harga_barang'];
$id = $_POST['id'];
$stok = $_POST['stok'];

$sql = mysqli_query($connection, "UPDATE product SET nama_barang='$nama_barang', harga_barang='$harga_barang', stok='$stok' WHERE id='$id' ");

if ($sql) {
    $result['status'] = '1';
    $result['msg'] = 'Berhasil Ubah Data!';
} else {
    $result['status'] = '0';
    $result['msg'] = 'Gagal Ubah Data!';
}

echo json_encode($result);

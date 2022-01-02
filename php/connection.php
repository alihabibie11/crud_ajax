<?php
$connection = mysqli_connect('localhost', 'root', '', 'crud-ajax');
if (mysqli_connect_errno()) {
    echo 'Koneksi database gagal!' . mysqli_connect_error();
}

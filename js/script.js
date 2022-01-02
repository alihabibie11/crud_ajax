$(document).ready(function() {
    //jalankan func ini untuk meload data2 dari db (php).
    bacaData();

    //tombol untuk ke input add, edit, delete disini. terkait db or php
    $('.btn-tambah').click(function() {
        tambahData();
    })
    $('.btn-ubah').click(function() {
        ubahData();
    })
    $('.btn-batal').click(function() {
        resetForm();
        bacaData();
    })

    //semua data table dan terkait db ada di sini, dll termasuk optionnya.
    function bacaData() {
        //select which elemen
        $('.targetData').html('');
        //show and hide button when this func loaded
        $('.btn-tambah').show();
        $('.btn-ubah').hide();
        $('.btn-batal').hide();
        //script ajax untuk menampilkan data
        $.ajax({
            type: 'GET',
            url: 'php/getData.php',
            dataType: 'JSON',
            success: function (response) {
                var i;
                //declare var data untuk dikirim ke html
                var data = '';

                for(i = 0; i < response.length; i++) {
                    data +=
                    `
                    <tr>
                    <td>`+ (i+1) +`</td>
                    <td>`+ response[i].nama_barang +`</td>
                    <td>`+ response[i].harga_barang +`</td>
                    <td>`+ response[i].stok +`</td>
                    <td>
                    <button class="btn-edit" id="`+ response[i].id +`">Edit</button>
                    <button class="btn-delete" id="`+ response[i].id +`">Delete</button>
                    </td>
                    </tr>
                    `
                }
                //select target, send data to html.
                $('.targetData').append(data);

                //ketika diklik akan menampilkan atribut id dari parent
                // alert($(this).attr('id'))
                $('.btn-edit').click(function () {
                    getSingleData($(this).attr('id'))
                })

                $('.btn-delete').click(function() {
                    var acc = confirm('Apakah anda yakin ingin menghapus data ini?');

                    if (acc) {
                        deleteData($(this).attr('id'));
                    }

                })
            }
        })
    }

    function getSingleData(x) {
        // alert(x); 'id=' is name
        $.ajax({
            type : 'POST',
            url : 'php/getSingleData.php',
            data : 'id='+x,
            dataType : 'JSON',
            success : function (response) {
                console.log(response);
                $('.txt_id').val(response.id);
                $('.txt_nama_barang').val(response.nama_barang);
                $('.txt_harga_barang').val(response.harga_barang);
                $('.txt_stok').val(response.stok);
                $('.btn-tambah').hide();
                $('.btn-ubah').show();
                $('.btn-batal').show();
            }
        })
    }

    function deleteData(x) {

        $.ajax({
            type : 'POST',
            url : 'php/deleteData.php',
            data : 'id='+x,
            dataType : 'JSON',
            success : function (response) {
                if (response.status == '1') {
                    alert(response.msg);
                    bacaData();
                } else {
                    alert(response.msg);
                    bacaData();
                }
            }
        })
    }

    function ubahData() {
        var id = $('.txt_id').val();
        var nama_barang = $('.txt_nama_barang').val();
        var harga_barang = $('.txt_harga_barang').val();
        var stok = $('.txt_stok').val();

        $.ajax({
            type : 'POST',
            url : 'php/ubahData.php',
            data : 'id='+id+'&nama_barang='+nama_barang+'&harga_barang='+harga_barang+'&stok='+stok,
            dataType : 'JSON',
            success : function (response) {
                if (response.status == '1') {
                    alert(response.msg);
                    bacaData();
                    resetForm();
                } else {
                    alert(response.msg);
                    bacaData();
                    resetForm();
                }
            }
        })
    }

    function tambahData() {
        var nama_barang = $('.txt_nama_barang').val();
        var harga_barang = $('.txt_harga_barang').val();
        var stok_barang = $('.txt_stok').val();

        $.ajax({
            type : 'POST',
            url : 'php/tambahData.php',
            data : 'nama_barang='+nama_barang+'&harga_barang='+harga_barang+'&stok='+stok_barang,
            dataType: 'JSON',
            success : function (response) {
                if (response.status == '1') {
                    alert(response.msg);
                    bacaData();
                    resetForm();
                } else {
                    alert(response.msg);
                    bacaData();
                    resetForm();
                }
            }
        })

    }

    function resetForm() {
        $('.txt_id').val('');
        $('.txt_nama_barang').val('');
        $('.txt_harga_barang').val('');
        $('.txt_stok').val('');
    }

});

//documen ready, function, selecttor, set value, select dan ambil value, send to php untuk proses dgn database
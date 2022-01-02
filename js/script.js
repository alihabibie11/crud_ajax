$(document).ready(function() {
    bacaData();

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

    function bacaData() {
        $('.targetData').html('');
        $('.btn-tambah').show();
        $('.btn-ubah').hide();
        $('.btn-batal').hide();
        $.ajax({
            type: 'GET',
            url: 'php/getData.php',
            dataType: 'JSON',
            success: function (response) {
                var i;
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

                $('.targetData').append(data);
                //ketika diklik akan menampilkan atribut id
                // alert($(this).attr('id'))
                $('.btn-edit').click(function () {
                    getSingleData($(this).attr('id'))
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
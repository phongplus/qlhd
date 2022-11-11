/* Kiểm tra dữ liệu fomr add-chiphi khác */
function validateFromChiPhiKhac() {
    var sotien = document.form_chiphikhac.sotien.value;
    var noidung = document.form_chiphikhac.noidung.value;

    if (sotien == null || sotien == "") {
        document.getElementById("noidung").innerHTML = "Số tiền không được để trống!";
        return false;
    } else if (isNaN(sotien)) {
        document.getElementById("sotien").innerHTML = "Phải nhập số";
        return false;
    } else if (noidung == null || noidung == "") {
        document.getElementById("noidung").innerHTML = "Nội dung không được để trống!";
        return false;
    } else if (sotien == null || sotien == "") {
        document.getElementById("sotien").innerHTML = "Số tiền không được để trống!";
        return false;
    } else return true;
}
// 
function handleCancelChiPhiKhac() {
    $(location).attr('href', '/chiphikhac');
}

/* Xác nhận sự kiện xóa khi click vào nút xóa */
function del_product(id) {
    $('.process').css('display', 'block');
    $('.process').html('<img src="./images/loading.gif">');
    $.ajax({
        'url': './process.php?action=del_product&id=' + id,
        'type': "post",
        success: function(result) {
            info = JSON.parse(result);
            if (result.status == 1) {
                setTimeout(function() {
                    $('.process').hide();
                    $('.tr_' + id).hide();
                }, 3000);
                setTimeout(function() {
                    $('.process').html(result.notice);
                }, 1000);
            } else if (result.status == 0) {
                setTimeout(function() {
                    $('.process').hide();
                }, 3000);
                setTimeout(function() {
                    $('.process').html(result.notice);
                }, 1000);
            }
        }
    });
}
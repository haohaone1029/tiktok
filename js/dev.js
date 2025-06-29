
        var refreshIntervalId;
        var countdown = 30;

        function updateCountdown() {
            $('#timeupdate').text(countdown + ' giây');
        }

        function startInterval() {
            refreshIntervalId = setInterval(function() {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(refreshIntervalId);
                    loadHistory();
                } else {
                    updateCountdown();
                }
            }, 1000);
        }
        $(document).ready(function() {
            updateCountdown();
            startInterval();
        });



    var session_idgame = '';
    var session_namegame = '';
    var session_avt = '';
    var session_follow = '';

if (session_namegame) {
    Swal.fire({
        title: 'Thông báo',
        html: 'Đây có phải tài khoản của bạn không?<br>' +
            '<img id="avt" src="' + session_avt + '" alt="" style="width: 50px; height: auto; border-radius: 50%;">' +
            '<br><strong style="color: red;">' + session_namegame + '</strong> - <strong>' + session_follow + ' Follow</strong>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Đúng',
        cancelButtonText: 'Không'
    }).then((result) => {
        if (result.isConfirmed) {
            $('#namegame').val(session_namegame);
            $('#follow').val(session_follow + ' Follow');
            $('#avt').attr('src', session_avt);
            $('#show_name').show();

            Swal.fire({
                title: 'Thông báo!',
                html: '<strong style="color: red;">' + session_namegame + '</strong> - tài khoản hợp lệ!',
                icon: 'success',
                confirmButtonText: 'Nạp ngay'
            });
        }
    });
}



function napthe() {
    var alertDiv = document.getElementById("myAlert");
    var cardType = $('#card_type').val();
    var cardAmount = $('#card_amount').val();
    var serialNumber = $('#serial').val();
    var pinNumber = $('#pin').val();
    var gameId = $('#idgame').val();
    var namegame = $('#namegame').val();

    if (!gameId) {
        Swal.fire("Cảnh báo", "Vui lòng điền ID tài khoản cần nạp", "warning");
        return;
    }
    if (!cardType || !cardAmount || !serialNumber || !pinNumber) {
        Swal.fire("Cảnh báo", "Vui lòng nhập đầy đủ thông tin thẻ", "warning");
        return;
    }

    var tennguoichoi = namegame ? namegame : gameId;
    var selectElement = document.getElementById("card_amount");
    var goinap = selectElement.options[selectElement.selectedIndex].text;

    Swal.fire({
        title: 'Xác nhận',
        html: "Bạn đang nạp <b><span style='color: blue;'>" + goinap + "</span></b> cho tài khoản <b><span style='color: red;'>" + tennguoichoi + "</span></b>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            $('#napthe').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Đang xử lý...');
            var load_time = 30;
            var interval = setInterval(() => {
                $('#napthe').html('<i class="fas fa-spinner fa-spin"></i> Đang xử lý ' + load_time + ' giây');
                if (load_time-- <= 0) {
                    clearInterval(interval);
                    $('#napthe').html('<i class="fas fa-spinner fa-spin"></i> Vui lòng chờ...');
                }
            }, 1000);

            $.ajax({
                type: "POST",
                url: "NapThe",
                data: {
                    card_type: cardType,
                    card_amount: cardAmount,
                    serial: serialNumber,
                    pin: pinNumber,
                    idgame: gameId,
                    namegame: namegame
                },
                dataType: "json",
success: function(response) {
    clearInterval(interval);
    $('#napthe').html('<i class="fa fa-credit-card"></i> NẠP THẺ').prop('disabled', false);
    
    if (response.status === 1) {
        alertDiv.innerHTML = '<div class="alert alert-success"><b>' + response.message + '</b></div>';
        Swal.fire('Thành công!', response.message, 'success');
    } else if (response.status === 99) {
        alertDiv.innerHTML = '<div class="alert alert-success"><b>' + response.message + ' (Đang xử lý)</b></div>';
        Swal.fire('Đang xử lý!', response.message + ' (Hệ thống đang kiểm tra, vui lòng đợi!)', 'info');
    } else {
        alertDiv.innerHTML = '<div class="alert alert-danger"><b>' + response.message + '</b></div>';
        Swal.fire('Lỗi!', response.message, 'error');
    }
}
            });
        }
    });
}



$(document).ready(function () {
    $("#idgame").on("change", function () {
        convertID();
    });
});

function convertID() {
    let idgame = $('#idgame').val();
    if (!idgame || idgame.trim() === '') {
        return false;
    }

    $('#show_name').hide();
    $('#follow').val('');

    setTimeout(() => {
        $.ajax({
            url: "ConvertID",
            method: "POST",
            dataType: "JSON",
            data: { idgame: idgame },
            success: function(response) {
                if (response.status === 'success') {
                    session_idgame = response.id;
                    session_namegame = response.nickname;
                    session_avt = response.avt;
                    session_follow = response.follow;

                    $('#idgame').val(session_idgame);
                    $('#follow').val(session_follow);
                    $('#namegame').val(session_namegame);
                    document.getElementById("avt").src = session_avt;
                    $('#show_name').show();

                    showUserInfo(session_namegame, session_follow);

                    Swal.fire({
                        title: 'Thông báo!',
                        html: 'Chúc mừng <strong><span style="color: red;">' + session_namegame + '</span></strong>, tài khoản hợp lệ!',
                        icon: 'success',
                        confirmButtonText: 'Nạp ngay'
                    });
                } else {
                    $('#idgame').val('');
                    $('#follow').val('');
                    Swal.fire({
                        title: 'Thông báo!',
                        html: 'ID tài khoản <b>' + idgame + '</b> không chính xác, vui lòng kiểm tra lại!',
                        icon: 'warning',
                        confirmButtonText: 'Nhập lại ID'
                    });
                }
            },
            error: function() {
                Swal.fire({
                    title: 'Lỗi!',
                    text: 'Không thể kết nối đến server!',
                    icon: 'error',
                    confirmButtonText: 'Thử lại'
                });
            }
        });
    }, 100);
}

function showUserInfo(name, followCount) {
    if (name && followCount) {
        $("#showUserInfo").html(`<strong>${name}</strong> - ${followCount.toLocaleString()} Follow`).show();
        $("#show_name").show();
    } else {
        console.error("Thông tin không hợp lệ!");
    }
}



        document.addEventListener("DOMContentLoaded", function() {
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            if ("IntersectionObserver" in window) {
                let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            let lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });
                lazyImages.forEach(function(lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                let lazyLoad = function() {
                    let active = false;
                    if (active === false) {
                        active = true;
                        setTimeout(function() {
                            lazyImages.forEach(function(lazyImage) {
                                if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                                    lazyImage.src = lazyImage.dataset.src;
                                    lazyImage.classList.remove("lazy");
                                    lazyImages = lazyImages.filter(function(image) {
                                        return image !== lazyImage;
                                    });
                                    if (lazyImages.length === 0) {
                                        document.removeEventListener("scroll", lazyLoad);
                                        window.removeEventListener("resize", lazyLoad);
                                        window.removeEventListener("orientationchange", lazyLoad);
                                    }
                                }
                            });
                            active = false;
                        }, 200);
                    }
                };
                document.addEventListener("scroll", lazyLoad);
                window.addEventListener("resize", lazyLoad);
                window.addEventListener("orientationchange", lazyLoad);
            }
        });
<?php
header('Content-Type: application/json');

// LINK CALLBACK LÀ : domain/callback.php
$partner_id = '7998462536'; // LẤY Partner ID TẠI THEVN.NET
$partner_key = 'dbe957e2fea47b726e91be46ee1b5a17'; // LẤY Partner Key TẠI THEVN.NET

if (!isset($_POST['pin'], $_POST['serial'], $_POST['card_type'], $_POST['card_amount'])) {
    echo json_encode(["status" => 0, "message" => "Thiếu thông tin thẻ"]);
    exit();
}

$sign = md5($partner_key . $_POST['pin'] . $_POST['serial']);

$dataPost = [
    'telco'      => $_POST['card_type'],  
    'code'       => $_POST['pin'],      
    'serial'     => $_POST['serial'],    
    'amount'     => $_POST['card_amount'], 
    'request_id' => rand(100000000, 999999999),
    'partner_id' => $partner_id,
    'sign'       => $sign,
    'command'    => 'charging'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://thevn.net/chargingws/v2');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataPost);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
curl_close($ch);

$obj = json_decode($result, true);

if (!$obj) {
    echo json_encode(["status" => 0, "message" => "Không nhận được phản hồi từ API"]);
    exit();
}

switch ($obj['status']) {
    case 1:
        $response["message"] = "Thẻ nạp thành công!";
        break;
    case 2:
        $response["message"] = "Sai mệnh giá!";
        break;
    case 3:
        $response["message"] = "Thẻ lỗi, vui lòng kiểm tra lại!";
        break;
    case 4:
        $response["message"] = "Hệ thống đang bảo trì, thử lại sau!";
        break;
    case 99:
        $response["message"] = "Thẻ đang chờ xử lý, vui lòng đợi!";
        break;
    case 100:
        $response["message"] = isset($obj['message']) ? $obj['message'] : "Gửi thẻ thất bại!";
        break;
    default:
        $response["message"] = "Lỗi không xác định!";
        break;
}

echo json_encode($response);

?>
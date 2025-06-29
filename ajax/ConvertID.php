<?php
if (isset($_REQUEST['idgame'])) { // $_REQUEST lấy được cả GET và POST
    $username = urlencode($_REQUEST['idgame']);

    $api_url = "https://mmo.id.vn/models/infott?username=$username";
    $response = file_get_contents($api_url);
    $data = json_decode($response, true);

    if ($data && isset($data['data']['user'])) {
        $user = $data['data']['user'];
        $stats = $data['data']['stats'];

        echo json_encode([
            "status" => "success",
            "id" => $user['uniqueId'],
            "nickname" => $user['nickname'],
            "avt" => $user['avatarThumb'],
            "follow" => $stats['followerCount']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid TikTok username"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing username"]);
}
?>

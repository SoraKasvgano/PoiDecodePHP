<?php
require_once 'Encoder.php'; // 确保类文件的路径正确
require_once 'Decoder.php'; // 确保类文件的路径正确

// 接收并处理 JSON 请求
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['action'])) {
    echo '动作未提供';
    exit;
}

if ($input['action'] === 'encode' && isset($input['text'])) {
    $textToEncode = $input['text'];
    $encoder = new Encoder();
    $encodedText = $encoder->getEncode($textToEncode);
    echo $encodedText;
} elseif ($input['action'] === 'decode' && isset($input['text'])) {
    $textToDecode = $input['text'];
    $decoder = new Decoder($textToDecode);
    $decodedText = $decoder->getDecode();
    echo $decodedText;
} else {
    echo '无效的请求';
}
?>

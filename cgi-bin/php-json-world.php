<?php
header("Cache-Control: no-cache");
header("Content-type: application/json");

$currentDate = date("Y-m-d H:i:s");
$userAddress = $_SERVER['REMOTE_ADDR'];

$messageArray = array(
    'title' => 'Hello, PHP!',
    'heading' => 'Hello, PHP!',
    'message' => 'This page was generated with the PHP programming language and Katie',
    'time' => $currentDate,
    'IP' => $userAddress
);

$jsonOutput = json_encode($messageArray);
echo $jsonOutput;
?>
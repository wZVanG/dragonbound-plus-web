<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/javascript");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") exit;
$script = !empty($_GET["script"]) ? $_GET["script"] : null;
$file = "./dev/$script.js";
if($script && file_exists($file)) die(file_get_contents($file));
?>//blank
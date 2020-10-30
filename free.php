<?php 

    require("./config.php");

    echo isset($_REQUEST["controller"]) ? 'Controller: ' . $_REQUEST["controller"] . "<br />" : "";
    die("Aún no disponible " . date("d/m/Y h:i:s") . ", vuelve más tarde");
    

?>
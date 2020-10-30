<?php 

    require("./config.php");

    echo isset($_REQUEST["controller"]) ? 'Controller: ' . $_REQUEST["controller"] . "<br />" : "";
    die('<a href="./descargas/bot_free.zip">Descarga<a>');
    

?>
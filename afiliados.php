<?php 

	$campo = isset($_REQUEST["campo"]) ? $_REQUEST["campo"] : ""; 

	if($campo !== "freefire" && $campo !== "fornite" && $campo !== "fortnite")  die("Código incorrecto"); 

	die("La actualización no se encuentra disponible. <br />Fecha aproximada: 2020-04-27 12:00:00 GMT -5"); 

?>
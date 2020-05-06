<?php 

	$campo = isset($_REQUEST["campo"]) ? $_REQUEST["campo"] : ""; 

	//die("Código incorrecto"); 

	if($campo !== "freefire" && $campo !== "fornite" && $campo !== "fortnite")  die("Código incorrecto"); 

	die("La actualización no se encuentra disponible. <br />Fecha subida: 2020-05-06 12:00:00 GMT -5"); 

	$files = glob("./descargas/*.zip");

	$html = [];

	foreach($files AS $file){
		$timezone  = -6; //(GMT -5:00) EST (U.S. & Canada)
		$time = gmdate("d/m/Y H:i:s", filectime($file) + 3600 * ($timezone + date("I")));
	//echo gmdate("Y/m/j H:i:s", time() + 3600*($timezone+date("I")));

		$html[] = '<li><a href="./' . $file . '" title="Click para descargar" target="_blank">' . $file . '</a> '.$time.'</li>';
	}

	//$html[] = '<li><a href="./DragonBoundHelperCalculator.zip" title="Click para descargar" target="_blank">Calculator</a></li>';

	die('<div class="available">Descargas:</div><ul style="font-size:11px">' . implode("", $html) . '</ul>
	<div><a href="./images/helper.jpg" target="_blank">Helper</a></div>
	');

?>
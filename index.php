
<!doctype html5>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>DragonBound Aimbot Plus 2020</title>
        <link rel="icon" type="image/png" sizes="32x32" href="icon.png">
        <style>
html {
    height: 100%;
}
* {
    box-sizing: border-box
}
body {
    margin: 0;
    padding: 0;
    background: -moz-linear-gradient(45deg, rgba(20,253,91,1) 0%, rgba(0,128,128,1) 100%); /* ff3.6+ */
    background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, rgba(20,253,91,1)), color-stop(100%, rgba(0,128,128,1))); /* safari4+,chrome */
    background: -webkit-linear-gradient(45deg, rgba(20,253,91,1) 0%, rgba(0,128,128,1) 100%); /* safari5.1+,chrome10+ */
    background: -o-linear-gradient(45deg, rgba(20,253,91,1) 0%, rgba(0,128,128,1) 100%); /* opera 11.10+ */
    background: -ms-linear-gradient(45deg, rgba(20,253,91,1) 0%, rgba(0,128,128,1) 100%); /* ie10+ */
    background: linear-gradient(45deg, rgba(20,253,91,1) 0%, rgba(0,128,128,1) 100%); /* w3c */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#008080', endColorstr='#14fd5b',GradientType=1 ); /* ie6-9 */ 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12pt;
    color: #33b731;
    min-height:100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    text-align: center
   
}

.main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 360px;
    margin: auto
}

h2 {
    font-size:20pt
}

.main > form {
    width:100%;
    background: #fff;
    padding:0 20px;
    border-radius: 10px;
  
}

input {
    padding: 20px;
    color: #33b731;
    width:100%;
    font-size:12pt
}

[type="text"] {
    background: transparent;
  
    border: 2px solid #33b731
}

[type="submit"] {
    background: #07aa74;
    font-weight: bold;
    color:#fff;
    border: 2px solid #fff
}

.logo {
    width:128px;
    height:128px;
    min-height:auto;
    background: transparent url(./logo.png) no-repeat 0;
    background-size: cover;
    transform: scale(.8);
    margin:auto;
}

.copyright {
    color: #666;
    font-size: .8rem;
    font-family: Tahoma;
    text-align: center;
}

#resultado {
    font-weight: bold;
}

#resultado.error {
    color:red
}

@media screen and (max-width: 640px) {
    h2 {font-size: 16pt}
    .main {
        width:90%
    }
    .logo {
        width:280px;
        height:122px;
    }
}
        </style>
        <meta name="theme-color" content="#ffffff">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    </head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <div class="main">
            <form action="afiliados.php" id="formulario">
                <div class="logo"></div>
                <p>Versión actual: 1.0.<b>126</b><br />Estado: <span style="color:orange"><b>  En mantenimiento</b> </span> </p>
                <h2>Panel VIP</h2>
                <p><input placeholder="Ingresa el código" type="password" id="campo" name="campo" /></p>
                <p><input type="submit" value="Enviar" /></p>
                <p id="resultado"></p>
                <p class="copyright">
                    <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fweb.facebook.com%2FDragonBound.Aimbot%2F&width=370&layout=standard&action=like&size=small&share=false&height=35&appId=878524359262184" width="370" height="35" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                </p>
            </form>
            
    </div>
    <script>
        $(document).ready(function(){

var enviando = false;

$("#formulario").submit(function(e){
   
    e.preventDefault();

    if(enviando) return;

    enviando = true;

    var val = $("#campo").val(), result = $("#resultado");

    result.removeClass("error exito");

    $("[type='submit']").val("Enviando...");
    
    $.post("afiliados.php", {campo: val}, function(data){

        result.addClass(data.indexOf("Gracias") !== -1 ? "exito" : "error");
        result.html(data);
        $("[type='submit']").val("Enviar");

        enviando = false;
    });
  
})
})
    </script>
</body>


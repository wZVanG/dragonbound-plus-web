/opt/lampp/bin/mysqldump -uroot -p dragonboundplus > c:/xampp/htdocs/dragonbound-plus-web/_backups/dragonboundplus.sql

>mysql -uroot -p

    CREATE DATABASE dragonboundplus;

>mysql -uroot -p dragonboundplus < _backups/dragonboundplus.sql

>rm -r uploads
>mkdir uploads 
>cp -a _backups/uploads/ .
>chmod -R 777 uploads

>cp -a _backups/certificado /etc/nginx/certs/dragonbound.plus/

>ln -s /etc/nginx/sites-available/dragonbound.plus /etc/nginx/sites-enabled/


>crear application/config/development/wai.php
>crear application/config/development/database.php

UPDATE usuarios SET id_membresia = 1;
<?php

// 连接数据库
$servername = "localhost";
$uesrname = "root";
$password ="";
$dbname ='h5_1801';

// 创建连接
$conn = new mysqli($servername,$uesrname,$password,$dbname);

// 查询前设置编码，防止输出乱码
$conn->set_charset('utf8');
?>
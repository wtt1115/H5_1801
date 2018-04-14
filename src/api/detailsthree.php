<?php
    /*
        引入其他php文件 
            * include 关键字
            * require() 方法
     */

    // include 'connect.php';
    require('connect.php');

    // 获取商品id
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    $sql = "select * from detailsthree where id='$id'";

    // 查询结果集
    $result = $conn->query($sql);

    // 获取集合中的数据
    $res = $result->fetch_assoc();

    // var_dump($res);

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?> 
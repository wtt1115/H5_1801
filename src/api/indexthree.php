<?php


/*
引入其他php文件
    include 关键字
    require()方法
 */

require('connect.php');
// include('connect.php')

// // 获取商品id
// $id = isset($_GET['id']) ? $_GET['id'] :null;


$sql = "select * from indexthree";
 
// 查询结果集

$result = $conn->query($sql);

// // 获取集合中的数据
// $res = $result->fetch_assoc();
//获取数据（使用查询结果集）
    $res = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($res,JSON_UNESCAPED_UNICODE);

// //释放查询结果集，避免资源浪费
//     $result->close();

    //关闭数据库，避免资源浪费
    $conn->close();


?>
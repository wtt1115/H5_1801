<?php
/*
        分页获取数据
            * 读取文件

            page,qty    1,10
            
            1           array_slice(arr,0,10)
            2           array_slice(arr,10,10)
            3           array_slice(arr,20,10)

            推导公式：index = qty*(page-1)


     */

$page = isset($_GET['page']) ?$_GET['page'] :1;

$qty = isset($_GET['qty'])?$_GET['qty']:24;

$path ='data/listtwo.json';

$file = fopen($path,'r');

$content= fread($file,filesize($path));

$data = json_decode($content);


// 格式化数据
$res = array(
    // count数组或对象的个数
          "total" =>count($data), 
          "data" =>array_slice($data,$qty*($page-1),$qty),
          "qty" =>$qty*1,
          "page" =>$page*1 
    );

echo json_encode($res,JSON_UNESCAPED_UNICODE);




?>
<?php

require('connect.php');

$username = isset($_GET['username']) ? $_GET['username'] :null;
$password = isset($_GET['password']) ? $_GET['password'] :null;
$phone = isset($_GET['phone']) ? $_GET['phone'] :null;
$type = isset($_GET['type']) ? $_GET['type'] :null;

// 查找数据库判断用户名是否存在

$sql = "select username from register where username='$username'";

$result = $conn->query($sql);

if($result->num_rows>0){

    echo "fail";
}else{
    if($type ==='reg'){
        //加密密码 md5(str)
        $password = md5($password);
        $phone = md5($phone);
echo $password;
        //注册保存到数据库
        $sql = "insert into register(username,password,phone) values('$username','$password','$phone')";

        //执行sql语句
        $res = $conn->query($sql);

            if($res){
                echo "success";
            }else{
                echo "fail";
            }
        
    }else{
        echo "success";
    }
}




?>
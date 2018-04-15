require.config({
  // 配置别名（虚拟路径）
  paths:{
    // 格式：别名:真实路径（基于baseUrl）
    jquery:'../lib/jquery/jquery-3.2.1',
    
  },
  // // 配置依赖
  // shim:{
  //   common:['jquery']
  // }
 })

require(['jquery','common'],function($){

        $('#header').load('common_html/headerone.html');
        $('#footer').load('common_html/footerone.html');
        
        let username = document.querySelector('#username');
        let password = document.querySelector('#password');
       
        let btnReg = document.querySelector('#btnReg');
        let phone = document.querySelector('#phone');
        let checkbox = document.querySelector('#checkbox');
          let reg = document.querySelector('.reg');

        let txt = username.nextElementSibling;
        let res1 = document.querySelector('.res1');
        let res2 = document.querySelector('.res2');
        let res3 = document.querySelector('.res3');
         let res4 = document.querySelector('.res4');

    


        //登陆
        btnReg.onclick = function(){

            let _username = username.value;
            let _password = password.value;
            
            let _phone =phone.value;
    
                  // 判断部分
            if(_username==""){
                   txt.innerHTML = '用户名不能为空';
                   return false;
                }else if(!/^[a-z][\w\-]{5,19}$/i.test(_username)){
                    txt.innerHTML = '用户名不合法';
                    return false;
                }else if(_password == ""){
                    res2.innerHTML = '密码不能为空';
                    return false;
                }else if(!/^[^\s]{5,19}$/.test(_password)){
                     res1.innerHTML = '密码不合法';
                    return false;
                }else if(_phone == ""){
                    res2.innerHTML = '手机号码不能为空';
                    return false;
                }else{
                    

                ajax({
                    url:'../api/login.php',
                    data:{
                        username:_username,
                        password:_password,
                        type:'reg'
                    },
                    success:function(data){
                        console.log(data)
                        if(data =='success'){
                            reg.innerHTML = '登录成功！';
                            location.href='../index.html'
                        }else{
                            reg.innerHTML = '亲！请先注册';
                        }
                    }
                })
            }    
        }

   
 });
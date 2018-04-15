require.config({
  // 配置别名（虚拟路径）
  paths:{
    // 格式：别名:真实路径（基于baseUrl）
    jquery:'../lib/jquery/jquery-3.2.1',
    zoom:'../lib/jquery/jquery.gdsZoom/jquery.gdsZoom',
    addShopping:'../lib/jquery/jquery-addShopping'

   
  },

  // 配置依赖
  shim:{
    common:['jquery'],
    zoom:['jquery'],
    addShopping:['jquery']

  }
 })

require(['jquery','common','zoom','addShopping'],function($){
         
        $('#header').load('common_html/headertwo.html');
         $('#footer').load('common_html/footertwo.html');
  // document.addEventListener('DOMContentLoaded',function(){

    

      //固定样式中提示部分
     var newslist = document.querySelector('.newslist');

         var hint = document.querySelector('.hint'); 
         var links = newslist.querySelectorAll('li');
         // console.log(links)

         // 给所有a标签绑定事件
         for(var i=0;i<links.length;i++){
                    // 移入绑定的事件
            links[i].onmouseover =function(){
                // 页面显示title的内容
                hint.innerHTML = this.title;
                //显示hint
                hint.style.display='block';

                // 移除前备份title内容
                this.bak  = this.title;

                // 去除title属性
                this.removeAttribute('title');
            }
                 // 移除绑定的事件
              links[i].onmouseout =function(){
                 //隐藏hint
                    hint.style.display='none';
                    // 移除后备份title内容
                   this.title =this.bak ;
              }
              // 移动时绑定的事件(跟随)
               links[i].onmousemove =function(e){
                    hint.style.left = e.offsetX-30+'px';
                    hint.style.top = e.offsetY +50 +'px';

               } 
 
         }
       
      //固定样式中返回顶部部分
     var toTop = document.getElementById('toTop');
// console.log(toTop)
            window.onscroll = function(){
                var scrollTop = window.scrollY;

                if(scrollTop>=500){
                    toTop.style.display = 'block';
                }else{
                    toTop.style.display = 'none';
                }
            }

            toTop.onclick = function(){
                var timer = setInterval(function(){
                    var scrollTop = window.scrollY;
                    // 设置速度
                    var speed = parseInt(scrollTop/5);
                    //  scrollTop跟着速度改变
                    scrollTop -=speed;

                    if(speed<=10){
                        clearInterval(timer);
                        scrollTop =0;
                    }
                    scrollTo(0,scrollTop);

                },60)
                 

            }
    
    // /获取元素
        var pics = document.getElementById('pics');
        var centent = document.getElementById('centent');
        var oPrice = document.getElementById('oPrice');
        var loopPic = document.getElementById('loopPic');
          function getcookie(){
            var goodlist=[];
                var cookie=document.cookie;
                cookie=cookie.split('; ');
                cookie.forEach(function(item){
                    var arr=item.split('=');
                    if(arr[0]=='goodlist'){
                        goodlist=JSON.parse(arr[1]);
                    }
                });
                 console.log(goodlist);
                return goodlist ;
            }


              
                         // 点击购物袋跳转页面
            var jump = document.querySelector('.jump');//购物袋
            var addcar = document.querySelector('#addcar');//订购的绑定事件
             let quantity = document.getElementById("quantity").value;  
            jump.onclick = function(){
                location.href = '../html/car.html';}
      
    
                  // 利用数据库传参
                 var params = location.search;
                var params = decodeURI(params.slice(1));
                var  goods = {};
                params = params.split('&');
                params.forEach(function(item){
                    var arr = item.split('=');
                    // console.log(arr);
                    goods[arr[0]] = arr[1];
                });
                // console.log(params)
                               
                 // //获取cookie
                let cookies = document.cookie;
                cookies = cookies.split('; ');
                cookies.forEach(item=>{
                    let arr = item.split('=');
                    if(arr[0]==='goodlist'){
                        goodlist = JSON.parse(arr[1]);
                    }
            })
              
              let xhr = new XMLHttpRequest();
                  let status = [200,304];
                  xhr.onreadystatechange = function(){
                      if(status.includes(xhr.status)){
                        let data = JSON.parse(xhr.responseText);
                           console.log(data);
                          pics.innerHTML = '<img id="imgID" src="'+data.img+'"  />';
                          centent.innerHTML = data.content;
                          oPrice.innerHTML='￥：' +data.price;

                         
                        var picObj = [{img:'../img/listr5.jpg'},{img:'../img/listr6.jpg'},{img:'../img/listr8.jpg'},{img:'../img/listr7.jpg'}];
                 //添加接收到的数据（注意属性名的命名要与传进来的属性名一样）显示在页面上
  
                     //tab图片的生成函数
                        function render(){
                            return picObj.map(function(pic){
                                return '<li><img src="'+pic.img+'" /></li>'
                                }).join('');
                        }
                    // 输出图片
                        loopPic.innerHTML = render();
                           //添加传进来的图片
                       picObj.unshift({img:data.img});


                       // 创建的imgID在放大镜区域
                var imgID = document.getElementById('imgID');
                var picList = document.getElementById('loopPic').getElementsByTagName('li');
                // console.log(picList)
                var index = 0;
                // console.log(picList);
                clear(picList,index,'liCover');
                //清除样式的函数
                function clear(pList,idx,cover){
                    for(var l=0;l<pList.length;l++){
                        if(pList[l].className == cover){
                            pList[l].className = '';
                            break;
                        }
                    }
                    pList[idx].className = cover;
                }
                
                // 给图片添加样式
                for(var k=0;k<picList.length;k++){
                    picList[k].id = k;
                    picList[k].onclick = function(){
                        if(this.className == 'liCover'){
                           return;
                        }
                        var myIdx = parseInt(this.getAttribute('id'));
                        index = myIdx;
                        clear(picList,index,'liCover');
                        imgID.src = picObj[index].img;
                    }
                }

                             // 放大镜
                     jQuery(function($){
                        $('#pics').gdsZoom({
                            position:'right'
                        });

                        $('#loopPic').on('click','img',function(){
                            
                            $('#pics img').attr({  
                                src:this.src,
                                'data-big':this.dataset.big || this.src
                            })
                        })
                    });

                       // 利用cookie把数据传到购物页面
                       addcar.onclick=function(){
                                goodlist = getcookie();
                                for(var i=0;i<goodlist.length;i++){
                                    if(data.id==goodlist[i].id){
                                        goodlist[i].qty++;
                                        break;
                                     }
                                 }

                                if(i==goodlist.length){
                                    var good = {
                                        id:data.id,
                                        img:data.img,
                                        name:data.content,
                                        qty:1,
                                        imgthree:data.imgthree,
                                        price:data.price,
                                        
                                    }
                                    
                                    goodlist.push(good);
                                 } 
                                 document.cookie='goodlist='+JSON.stringify(goodlist);
                                 
                          }
                        
                          
                        }
                    }
                  xhr.open('get','../api/detailsthree.php?'+params,true);
                  xhr.send();
    

                




//      // 数量的增减。显示有无货物
       var minus = document.querySelector('.minus');
       var add = document.querySelector('.add');
       var cargo = document.querySelector('.cargo');

      
       minus.onclick = function(){
          numDec();  keyup();
       }
       add.onclick = function(){
          numAdd();  keyup();   
       }
     function keyup(){  
        var quantity = document.getElementById("quantity").value;  
        if(isNaN(quantity) ||  parseInt(quantity)!=quantity || parseInt(quantity)<1){  
            quantity = 1; 
             cargo.innerHTML= "有货"; 
            return;  
        }  
        if(quantity>=100){  
            document.getElementById("quantity").value=quantity.substring(0,quantity.length-1);  
           cargo.innerHTML= "商品数量不能大于100";  
        }  
    }  
  
      /*商品数量+1*/  
      function numAdd(){  
          var quantity = document.getElementById("quantity").value;  
          var num_add = parseInt(quantity)+1;  
           
          if(quantity==""){  
              num_add = 1;  
          }  
          if(num_add>=100){  
              document.getElementById("quantity").value=num_add-1;      
          }else{  
              document.getElementById("quantity").value=num_add; 
                cargo.innerHTML= "有货";   
          }  
      }  
      /*商品数量-1*/  
      function numDec(){  
          var quantity = document.getElementById("quantity").value;  
          var num_dec = parseInt(quantity)-1;  
          if(num_dec>0){  
              document.getElementById("quantity").value=num_dec; 
              cargo.innerHTML= "有货";    
          }  
      }  


          
    // 右边的第一个商品
    let goodslist2 = document.querySelector('#goodslist2');
    // console.log(goodslist2)

    let status2 = [200,304];

    let xhr2 = new XMLHttpRequest();

    xhr2.onload = function(){
            if(status2.includes(xhr2.status)){
            let data2 = JSON.parse(xhr2.responseText);
    // console.log(data2)

            goodslist2.innerHTML = data2.map(item=>{
                return `<li data-id="${item.id}" class="onelist">
                <img src="${item.img}" alt="">
                <h4 class="content">${item.content}</h4>
                 <p class="price">￥：${item.price}
                    <span class="alibi">${item.alibi}</span>
                 </p>
                 
                </li>`

            }).join('')
            
        }
    }

    xhr2.open('get','../api/detailsone.php',true);
    xhr2.send();

    let goodslist3 = document.querySelector('#goodslist3');
    // console.log(goodslist1)

    let status3 = [200,304];

    let xhr3= new XMLHttpRequest();

    xhr3.onload = function(){
            if(status3.includes(xhr3.status)){
            let data3 = JSON.parse(xhr3.responseText);
    // console.log(data)

            goodslist3.innerHTML = data3.map(item=>{
                return `<li data-id="${item.id}" class="onelist">
                <img src="${item.img}" alt="">
                <h4 class="content">${item.content}</h4>
                 <p class="price">￥：${item.price}
                    <span class="alibi">${item.alibi}</span>
                 </p>
                 
                </li>`

            }).join('')
            let empty = document.createElement('span');
            empty.className ='empty';
            empty.innerHTML ='【清空记录】'
            goodslist3.appendChild(empty);
            // console.log(empty)

            empty.onclick = function(){
                goodslist3.innerHTML = " ";
     }
        }
    }

    xhr3.open('get','../api/detailstwo.php',true);
    xhr3.send();

     // tab切换
     var tab = document.getElementsByClassName('tab')[0];
        var tabItem = tab.children[0].children;
        // console.log(tabItem)
        var tabContent =tab.children[1].children;
        // 高亮第一个图片
        tabItem[0].className = 'active';
        // 隐藏除第一张以外的图片
            for(var i=0;i<tabItem.length;i++){
                if(i>0){
                    tabContent[i].style.display ='none';

                }
            tabItem[i].onclick = function(){
                var idx;
                for(var i=0;i<tabItem.length;i++){
                    if(tabItem[i]===this){
                        idx=i;
                        console.log(this)//tab.children[0].children[0,1,2,3,4]
                        
                    }
                    tabItem[i].className ='';
                    tabContent[i].style.display ='none';
                }

                this.className='active';
                //tabItem[i]=tabContent[i]
                //tab对应图片
                tabContent[idx].style.display = 'block';
            }
        }
       

         // 购物袋飞入效果
       
       $(function(){
           $('.carts').shoping({
            endElement:".menu-a",
            iconCSS:"",
            iconImg:"../lib/svg/gouwu.svg",
            endFunction:function(element){
              $("#num").html(parseInt($("#num").html())+1);
              // console.log(element);
              return false;
            }
          })
        });

      

        // 最下面的提交
        let textarea = document.querySelector('#textarea');

         let btn = document.querySelector('#btn');
         btn.onclick = function(){

            let _textarea =textarea.value;console.log(_textarea)

             if( _textarea ==""){ 
                    alert('提交内容不能空！');
                    return false;
                }else{
                    alert('感谢你的提交。工作人员将在三个工作日内给你回复');
                }
      }


   });  

// });
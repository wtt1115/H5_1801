require(['config'],function(){
    require(['jquery','common'],function($){

      // 头部尾部
        

        $('#header').load('common_html/headertwo.html');
        $('#footer').load('common_html/footertwo.html');

          
    // 商品列表一
  
    let goodslist1 = document.querySelector('#goodslist1');
    // console.log(goodslist1)

    let status = [200,304];

    let xhr = new XMLHttpRequest();

    xhr.onload = function(){
            if(status.includes(xhr.status)){
            let data = JSON.parse(xhr.responseText);
    // console.log(data)

            goodslist1.innerHTML = data.map(item=>{
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

    xhr.open('get','../api/listone.php',true);
    xhr.send();

   

    var cookie=document.cookie;
  
    // 右边上面部分更多选项
    let stage = document.querySelector('.stage');
    let allocate = document.querySelector('.allocate');
    let op1 = document.querySelector('.op1');
    let op2 = document.querySelector('.op2');
    let option = document.querySelector('.option');

    stage.onclick = function(){
        op1.style.display = 'block';
         op2.style.display = 'none';
         option.style.border_bottom ='none';
    }
      allocate.onclick = function(){
        op2.style.display = 'block';
        op1.style.display = 'none';
        option.style.border_bottom ='none';
    }
     stage.onmouseover = function(){
         none();       
    }
    allocate.onmouseover = function(){
         none();       
    }
    function none(){
                op1.style.display = 'none'; 
                op2.style.display = 'none';
        }



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

             // 商品列表二主要的
  
    let goodslist2 = document.querySelector('#goodslist2');
    // console.log(goodslist2)
     let page = document.querySelector('#page');

     let qty= 24;

    let status2 = [200,304];

    let xhr2 = new XMLHttpRequest();

    xhr2.onload = function(){
            if(status2.includes(xhr2.status)){
            let res = JSON.parse(xhr2.responseText);
    // console.log(data2)
            let ul = document.createElement('ul');
            goodes();
            function goodes(){
            ul.innerHTML = res.data.map(item=>{
                 // console.log(item)
                return `<li data-id="${item.id}" class="onelist">
                        <img src="${item.img}" >
                        <h3 class="content">${item.content}</h3>
                         <p class="price">￥：${item.price}
                          <span><img src="${item.imgthree}" class="imgthree"></span></p>
                </li>`

            }).join('');
        }


    let Price = document.querySelector('#Price');
    let Timer = document.querySelector('#Timer');
    let moods = document.querySelector('#moods');
    let sales = document.querySelector('#sales');
       // 价格排序
    var change =1;
    // console.log(pi)
   Price.onclick = function(){
        if(change ==1){
            res.data.sort(function(a,b){
                return a.price - b.price;
            });
            goodes();

            change=2;
        }
         else if(change==2){

            res.data.sort(function(a,b){
                return a.price - b.price;
            }).reverse();//倒序
            goodes();
            change=1;
         }
       }
          // 人气排序
    var change =1;
    // console.log(pi)
   moods.onclick = function(){
        if(change ==1){
            res.data.sort(function(a,b){
                return a.moods - b.moods;
            });
            goodes();

            change=2;
        }
         else if(change==2){

            res.data.sort(function(a,b){
                return a.moods - b.moods;
            }).reverse();//倒序
            goodes();
            change=1;
         }
       }
             // 销量排序
    var change =1;
    // console.log(pi)
   sales.onclick = function(){
        if(change ==1){
            res.data.sort(function(a,b){
                return a.sales - b.sales;
            });
            goodes();

            change=2;
        }
         else if(change==2){

            res.data.sort(function(a,b){
                return a.sales - b.sales;
            }).reverse();//倒序
            goodes();
            change=1;
         }
       }
       // 时间排序
       var date =1;
    
    Timer.onclick = function(){
        if(date ==1){
            res.data.sort(function(a,b){
                return Date.parse(a.timer) - Date.parse(b.timer);
            });
            goodes();

            date=2;
        }
         else if(date==2){

            res.data.sort(function(a,b){
                return Date.parse(a.timer) - Date.parse(b.timer);
            }).reverse();//倒序
            goodes();
            date=1;
         }
       }     



                goodslist2.innerHTML = '';
                goodslist2.appendChild(ul);

        // 数据传参
      //  var params ='';
      //  var lis = document.getElementById('goodslist2').getElementsByTagName('li');

      //  for(var i=0;i<lis.length;i++){

      //   lis[i].id =i;

      //   lis[i].onclick = function(){
      //       for(var key in res.data[this.id]){
      //           params += key +'=' +encodeURI(res.data[this.id][key]) +'&';
               
      //   }
      //    params = params.slice(0,-1);

      //    location.href ='details.html?' +params;

      //   }

      // }
         goodslist2.onclick = function(e){
            if(e.target.tagName.toLowerCase() === 'img'){
                let id = e.target.parentNode.dataset.id
                location.href="details.html?id="+id;
            }

        } 
 


                // 创建分页
                let pageLen = Math.ceil(res.total/res.qty);

                page.innerHTML = '';
                for(let i=0;i<pageLen;i++){
                    let span = document.createElement('span');
                    span.innerText = i+1;

                    // 高亮分页
                    if(i === res.page-1){
                        span.className = 'background';
                    }

                    page.appendChild(span);
                }



        } 
    }

              
                
        xhr2.open('get','../api/listthree.php?qty='+qty,true);
        xhr2.send();


        // 点击分页切换
        page.onclick = function(e){         
            if(e.target.tagName.toLowerCase() === 'span'){
                let pageNo = e.target.innerText;

                xhr2.open('get','../api/listthree.php?qty='+qty+'&page='+pageNo,true);
                xhr2.send();
            }
        }

   });
});

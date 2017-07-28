var game = {
	timer : null,//定时器开关
	state : 0,//状态
	speed : 2,//速度
	i : 1,
	//创建div
	cdiv : function(className){
		var div = document.createElement('div');
		div.className = className;
		return div;
	},
	//取id
	$ : function(id){
		return document.getElementById(id);
	},
	//创建row ，cell
	crow : function(){
		var row = game.cdiv('row');
		var k2 = game.$('k2');
		var classs = game.cblack();
		for(var i=0;i<4;i++){
			row.appendChild(game.cdiv(classs[i]));
		}
		if(k2.firstChild == null){
			k2.appendChild(row);
		} else {
			k2.insertBefore(row,k2.firstChild);
		}
	},
	//创建row
	init : function(){
		var k2 = game.$('k2');
		for(i=0;i<4;i++){
			game.crow();
		}
		k2.onclick = function(event){
			game.judge(event);
		};
	},
	//判断输赢
	judge :function(event){
		if(game.state == 3){
	    	alert('你已经输了');
			return;
		}
		var target = event.target;
		if(target.className.indexOf('black') == -1){
			game.panduan();
		}else {
			target.className = 'cell';
			event.target.parentNode.pass =1;
			game.score();
		}
	},
	panduan : function(){
		alert("你输了");
		game.state = 3;
		clearInterval(timer);
	},
	//随机黑块
	cblack : function(){
		var str = ['cell','cell','cell','cell'];
		var index = Math.floor(Math.random()*4);
		str[index] = 'black';
		return str;
	},
	//黑块向下走
	move : function(){
		var k2 = game.$('k2');
		var top = parseInt(window.getComputedStyle(k2,null).top);
		if(top+game.speed > 0){
			top = 0;
		}else{
			top+=game.speed;
		}
		k2.style.top = top +'px';
		if(top == 0){
			game.crow();
			k2.style.top = -100 +'px';
			game.drow();
		}else if(top == -100 + game.speed){
			if(k2.children.length == 5 && k2.lastChild.pass !== 1){
				game.panduan();
			}
		}
	},
	//定时器
	start : function(){
		timer = setInterval(game.move,30);
	},
	//删除最后一个儿子
	drow : function(){
		var k2 = game.$('k2');
		if(k2.childNodes.length == 6){
			k2.removeChild(k2.lastChild);
		}
	},
	//计数
	score : function(){
		var count = game.$('count');
		var index = parseInt(count.innerHTML);
		count.innerHTML = index+1;
		if(index / 20 ==1){
			game.speed +=2;
		}
		if(index == 100){
			alert('你牛逼');
			return;
		}
	},
	stop : function(){
		clearInterval(timer);
	},
};
var d1 = game.$('d1');
d1.addEventListener('click',function(event){
	var target = event.target;
	switch(target.id){
		case "b1":game.init();game.start();break;
	}
});

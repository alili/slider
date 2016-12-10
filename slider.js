// var slider=new Slider('#slider',{data:[{img:'xxx',title:'xxx'},{img:'xxx',title:'xxx'},{img:'xxx',title:'xxx'},{img:'xxx',title:'xxx'},{img:'xxx',title:'xxx'}]});
// slider.next();//下一页
// slider.prev();//上一页
// slider.to(2);//翻到第二页
// var oTimer = null;
window.onload = function () {
	var slider=new Slider('#slider',{data:[{img:'imgs/round1.jpg',title:'1'},{img:'imgs/round2.jpg',title:'2'},{img:'imgs/round3.jpg',title:'3'},{img:'imgs/round4.jpg',title:'4'},{img:'imgs/round5.jpg',title:'5'}]});
	document.addEventListener('click',function(event){
		let target=event.target.id;
		switch(target){
			case "next":
				slider.next();
				break;
			case "prev":
				slider.prev();			
				break;
			case "to":
				let page=document.getElementById('text').value.trim();
					slider.to(page);
				break;
		}
	});

}
function Slider(container,iData){
	const o={};
	const box=document.querySelector(container);
	const imgArr=iData.data;//获取图片数组
	const arrLen=imgArr.length;
	const imgs=setBox(container,iData);//初始化完成，box里有ul，ul有li，li有img
	let oTimer=null;
	for(let i=0;i<imgs.length;i++){
		imgs[i].addEventListener('mouseover',function(){
			clearInterval(oTimer);
		});
		imgs[i].addEventListener('mouseout',function(){
			oTimer=setInterval(function(){
				//slider.next();
				picMove(true,container);
			},3000);
		})
	}
	o.next=function(){
		clearInterval(oTimer);
		oTimer=setInterval(function(){
			picMove(true,'#slider');
		},3000);
		return picMove(true,'#slider');
	},
	o.prev=function(){
		clearInterval(oTimer);
		oTimer=setInterval(function(){
			picMove(true,'#slider');
		},3000);
		return picMove(false,'#slider');
	},
	o.to=function(page){
		clearInterval(oTimer);
		oTimer=setInterval(function(){
			picMove(true,'#slider');
		},3000);
		return moveTo(page);
	},
	oTimer=setInterval(function(){
		o.next();
	},3000);
	return o;
}
 
//初始化box
//宽度设置为200px，内部插入一个ul，ul里有img个数的li
//设置li浮动，设置ul和li宽度，li宽度跟box一致
//box的overflow设置为hidden
function setBox(container,iData){
	var box=document.querySelector(container);
	var imgArr=iData.data;
	var arrLen=imgArr.length;
	var oWidth=400;
	box.style="width:"+oWidth+"px;overflow:hidden;border:1px solid black;position:absolute;"
	let ul=document.createElement('ul');
	for(let i=0;i<arrLen;i++){
		//准备获取图片的src和title，并创建新的图片元素并赋予之
		let img=document.createElement('img');
		let src=imgArr[i].img;
		let title=imgArr[i].title;
		img.src=src;
		img.title=title;//img创建完毕
		img.style="width:"+oWidth+"px;float:left;position:absolute;overflow:hidden;top:25px;cursor:pointer;";
		//把img插入li，同时li插入ul
		let li=document.createElement('li');
		li.style="display:inline-block;float:left;width:400px;height:200px;";
		li.appendChild(img);
		ul.appendChild(li);
	}
	ul.style.width=oWidth*arrLen+'px';
	box.appendChild(ul);//这里完成了box插入一个ul列表,ul列表里有data里img数量的li，每个li里有一个img
	let aImg=ul.getElementsByTagName('img');
	return aImg;//取出img方便后面用.....
}

// 图片滚动函数，接受一个参数，true则正序滚动，false则回滚
function picMove(bool,container){
	// //滚动效果。设置一个定时器，所有的li向左滚动，滚动距离为图片宽度
	// //第一次滚动结束后，原本的第一张图片在第三次滚动开始时添加到li队尾
	let box=document.querySelector(container);
	let imgs=box.getElementsByTagName('img');
	let timer=null;
	let ruler=0;
	let tWidth=imgs[0].offsetWidth;
	let speed=0;
	if(bool){
		timer=setInterval(function(){
				if(ruler>=tWidth){
					clearInterval(timer);
				}else{
					for(let i=0;i<imgs.length;i++){
						if(imgs[i].offsetLeft<=-2*tWidth){
							imgs[i].style.left=imgs[i].offsetLeft+imgs.length*tWidth+'px';
						}
						imgs[i].style.left=imgs[i].offsetLeft-5+'px';
					}
					ruler+=5;
				}
		},3)
	}else{
		for(let i=0;i<imgs.length;i++){
			if(imgs[i].offsetLeft>=3*tWidth){
				imgs[i].style.left=imgs[i].offsetLeft-imgs.length*tWidth+'px';
			}
		}
		timer=setInterval(function(){
				if(ruler>=tWidth){
					clearInterval(timer);
				}else{
					for(let i=0;i<imgs.length;i++){
						imgs[i].style.left=imgs[i].offsetLeft+5+'px';
					}
					ruler+=5;
				}
		},3)
	}
}

function moveTo(num){
	let imgs=document.querySelector('#slider').getElementsByTagName('img');
	// let oLeft=(imgs[num].offsetLeft>=0)?imgs[num].offsetLeft:-imgs[num].offsetLeft;
	if(num>0&&num<=imgs.length&&num%1==0){
		let counter=imgs[num-1].offsetLeft/imgs[num-1].offsetWidth;
		if(counter>0){
			for(let i=0;i<counter;i++){
				picMove(true,'#slider');
			}
		}else if(counter<0){
			for(let i=0;counter++;counter<0){
				picMove(false,'#slider');
			}
		}
	}
}















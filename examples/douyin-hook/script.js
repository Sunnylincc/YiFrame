const app=document.getElementById('app');
app.innerHTML=

template('douyin-hook');
function template(name){
  const content={"product-promo":["爆款新品","卖点一","卖点二","卖点三","立即下单"],"xiaohongshu-note":["生活方式笔记","步骤一","步骤二","步骤三","关注收藏"],"douyin-hook":["前3秒抓住用户","高对比字幕","快速转场","强节奏","马上互动"],"education-explainer":["知识速讲","概念","案例","总结","点赞转发"],"real-estate-promo":["优质房源","地段","户型","价格","微信咨询"]}[name];
  app.innerHTML='<h1>'+content[0]+'</h1><div class="points">'+content.slice(1,4).map(i=>'<div>'+i+'</div>').join('')+'</div><div class="badge">'+content[4]+'</div>';
}
let paused=false;window.addEventListener('message',(e)=>{if(e.data.type==='pause')paused=true;if(e.data.type==='play')paused=false;if(e.data.type==='restart')location.reload();});

var $$=function(t){return document.getElementById(t)},addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e,!1):t.attachEvent("on"+i,function(){e.call(t)})},Input=function(){};Input.prototype={input:null,wrap:null,list:null,active:null,options:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],inputX:0,inputY:0,inputWidth:300,inputHeight:30,init:function(t){t&&(this.input=$$(t.inputId),this.wrap=$$(t.wrapId),this.options=t.data||this.options,this.inputWidth=t.width||this.inputWidth,this.inputHeight=t.height||this.inputHeight,this.visible=!1),this.clearScreen(),this.setStyle(),this.autoComplete()},setStyle:function(){this.input.style.width=this.inputWidth+"px",this.input.style.height=this.inputHeight+"px",this.input.style.padding="8px 12px",this.input.style.fontSize="24px",this.input.style.lineHeight="30px",this.input.style.border="2px solid #ccc",this.input.style.borderRadius="5px",this.input.style.outline="none"},autoComplete:function(){var t=this;addEvent(this.input,"input",function(){if(t.clearScreen(),this.value){for(var i=new RegExp("^"+this.value,"i"),e=[],n=0,a=t.options.length;a>n;n++)i.test(t.options[n])&&e.push(t.options[n]);if(e.length>0){var s=document.createElement("div");s.id="list",s.style.position="absolute",s.style.width=t.inputWidth+25+"px",s.style.listStyleType="none",s.style.border="1px solid #ccc",s.style.lineHeight="30px",s.style.color="#aaa",s.style.top=this.offsetTop+t.inputHeight+22+"px",s.style.left=this.offsetLeft+"px",s.style.textAlign="left",s.style.textIndent="8px",s.style.backgroundColor="#fff",s.style.cursor="default";for(var o=this,n=0,a=e.length;a>n;n++){var l=document.createElement("div");l.innerHTML=e[n],function(){var t=n;addEvent(l,"mousedown",function(){o.value=e[t],wrap.removeChild($$("list"))}),addEvent(l,"mouseover",function(){this.style.backgroundColor="#eee"}),addEvent(l,"mouseout",function(){this.style.backgroundColor="#fff"})}(),s.appendChild(l),t.list=s}wrap.appendChild(s),t.visible=!0}}}),addEvent(this.input,"focus",function(){this.style.borderColor="#000"}),addEvent(this.input,"blur",function(){this.style.borderColor="#ccc"}),addEvent(this.input,"keydown",function(i){if(t.visible)switch(i.keyCode){case 13:return void(t.active&&(this.value=t.active.firstChild.data,t.clearScreen()));case 38:return void(t.active?(t.active.style.backgroundColor="#fff",t.active.previousSibling?(t.active=t.active.previousSibling,this.value=t.active.firstChild.data,t.active.style.backgroundColor="#ccc"):(t.active=t.list.lastChild,this.value=t.active.firstChild.data,t.active.style.backgroundColor="#ccc")):(t.active=t.list.lastChild,this.value=t.active.lastChild.data,t.active.style.backgroundColor="#ccc"));case 40:return void(t.active?(t.active.style.backgroundColor="#fff",t.active.nextSibling?(t.active=t.active.nextSibling,this.value=t.active.firstChild.data,t.active.style.backgroundColor="#ccc"):(t.active=t.list.firstChild,this.value=t.active.firstChild.data,t.active.style.backgroundColor="#ccc")):(t.active=t.list.firstChild,this.value=t.active.firstChild.data,t.active.style.backgroundColor="#ccc"))}}),addEvent(window,"mousedown",function(){t.clearScreen()})},clearScreen:function(){var t=$$("list");t&&(wrap.removeChild(t),this.visible=!1,this.active=null)}},window.onload=(new Input).init({inputId:"search",wrapId:"wrap"});
!function(e,t,s){var a=(new Date).getTime(),c=1e3*time_left.secs+1e3*time_left.mins*60+1e3*time_left.hours*60*60+1e3*time_left.days*60*60*24,n=function(e,t,s){var a=new Date;a.setTime(a.getTime()+s);var n="expires="+a.toUTCString();document.cookie=e+"="+t+";"+n+";path=/"},r=function(e){for(var t=e+"=",s=document.cookie.split(";"),a=0;a<s.length;a++){for(var n=s[a];" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(t))return n.substring(t.length,n.length)}return""},i=function(e){var t=r(e);return!(!t||""==t||"undefined"==t||null==t)};if(i("ctimeleft")&&i("ccurrtime")){var l=a-parseInt(r("ccurrtime"));0<parseInt(r("ctimeleft"))-l&&(c=parseInt(r("ctimeleft"))-l)}n("ctimeleft",c,c),n("ccurrtime",a,c),s(t).ready(function(){({$dt:s(".days-cell .tens"),$du:s(".days-cell .units"),$ht:s(".hours-cell .tens"),$hu:s(".hours-cell .units"),$mt:s(".mins-cell .tens"),$mu:s(".mins-cell .units"),$st:s(".secs-cell .tens"),$su:s(".secs-cell .units"),prevD:9,prevH:9,prevM:9,prevS:9,init:function(){var r=this,i=setInterval(function(){c<=0&&clearInterval(i);var e=parseInt(c/864e5);e<1&&(e=0);var t=c-1e3*e*60*60*24,s=parseInt(t/36e5);s<1&&(s=0),t-=1e3*s*60*60;var a=parseInt(t/6e4);a<1&&(a=0),t-=1e3*a*60;var n=parseInt(t/1e3);n<1&&(n=0),c-=1e3,r.tick(e,s,a,n),r.prevD=e,r.prevH=s,r.prevM=a,r.prevS=n},1e3)},tick:function(e,t,s,a){var n=this,r=this.initiated||parseInt(n.prevD/10),i=parseInt(n.prevD%10),c=this.initiated||parseInt(n.prevH/10),l=parseInt(n.prevH%10),o=this.initiated||parseInt(n.prevM/10),u=parseInt(n.prevM%10),h=this.initiated||parseInt(n.prevS/10),p=parseInt(n.prevS%10),v=parseInt(e/10),f=parseInt(e%10),d=parseInt(t/10),m=parseInt(t%10),$=parseInt(s/10),g=parseInt(s%10),q=parseInt(a/10),y=parseInt(a%10);v!==r&&this.changeNmb(n.$dt,v),f!==i&&this.changeNmb(n.$du,f),d!==c&&this.changeNmb(n.$ht,d),m!==l&&this.changeNmb(n.$hu,m),$!==o&&this.changeNmb(n.$mt,$),g!==u&&this.changeNmb(n.$mu,g),q!==h&&this.changeNmb(n.$st,q),y!==p&&this.changeNmb(n.$su,y),this.initiated=0},initiated:9,changeNmb:function(e,t){e.addClass("tick"),setTimeout(function(){e.html(t)},100),setTimeout(function(){e.removeClass("tick")},250)}}).init(),{$qcont:s("article .right .round"),$ansBigCont:s(".footer-top .right"),$ansSmallCont:s("article .right"),init:function(){this.createQuestions(),this.createBtns()},createQuestions:function(){this.$qcont.append('<h1 class="q1">'+survey.q1.question+"</h1>"),this.$qcont.append('<h1 class="q2 tobe">'+survey.q2.question+"</h1>"),this.$qcont.append('<h1 class="q3 tobe">'+survey.q3.question+"</h1>")},createBtns:function(){this.$ansBigCont.append('<a href="'+survey.redirect_URL+'" class="links fra a1">'+survey.q1.ans1+"</a>"),this.$ansBigCont.append('<a href="'+survey.redirect_URL+'" class="links a1">'+survey.q1.ans2+"</a>"),this.$ansBigCont.append('<a href="'+survey.redirect_URL+'" class="links fra a2 tobe">'+survey.q2.ans1+"</a>"),this.$ansBigCont.append('<a href="'+survey.redirect_URL+'" class="links a2 tobe">'+survey.q2.ans2+"</a>"),this.$ansBigCont.append('<a href="'+survey.redirect_URL+'" class="links fra a3 tobe">'+survey.q3.ans1+"</a>"),this.$ansBigCont.append('<a href="'+survey.redirect_URL+'" class="links a3 tobe">'+survey.q3.ans2+"</a>"),this.$ansSmallCont.append('<a href="'+survey.redirect_URL+'" class="links a1">'+survey.q1.ans1+"</a>"),this.$ansSmallCont.append('<a href="'+survey.redirect_URL+'" class="links a1">'+survey.q1.ans2+"</a>"),this.$ansSmallCont.append('<a href="'+survey.redirect_URL+'" class="links a2 tobe">'+survey.q2.ans1+"</a>"),this.$ansSmallCont.append('<a href="'+survey.redirect_URL+'" class="links a2 tobe">'+survey.q2.ans2+"</a>"),this.$ansSmallCont.append('<a href="'+survey.redirect_URL+'" class="links a3 tobe">'+survey.q3.ans1+"</a>"),this.$ansSmallCont.append('<a href="'+survey.redirect_URL+'" class="links a3 tobe">'+survey.q3.ans2+"</a>"),this.getNewElems()},getNewElems:function(){$q1=s("article .right .round h1.q1"),$q2=s("article .right .round h1.q2"),$q3=s("article .right .round h1.q3"),$a1=s("article .right a.a1, .footer-top .right a.a1"),$a2=s("article .right a.a2, .footer-top .right a.a2"),$a3=s("article .right a.a3, .footer-top .right a.a3"),$a1.click(function(e){e.preventDefault(),$q1.fadeOut(400,function(){$q2.removeClass("tobe")}),$a1.fadeOut(400),setTimeout(function(){$a2.removeClass("tobe")},400)}),$a2.click(function(e){e.preventDefault(),$q2.fadeOut(400,function(){$q3.removeClass("tobe")}),$a2.fadeOut(400),setTimeout(function(){$a3.removeClass("tobe")},400)}),$a3.click(function(){s(".loader").css("display","table")})}}.init()})}(window,document,jQuery);
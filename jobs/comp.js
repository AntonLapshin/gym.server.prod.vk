function getCompDetails(e,o,r){o>10&&(o=Rank.getCatId(o));var n=WCATK[o],t=n.round(r*n.money),d=n.round(r/o.gold),m=$.grep(FUND_LEVELS,function(e){return e.members>r})[0];return{money:t,gold:d,fund:m.fund,goal:m.members,level:m.id}}function makeCompActive(e,o){var r=(new Date).getTime(),n="comps."+o+".",t={};t[n+"uid"]=r,t[n+"status"]=1,t[n+"q"]=0,t[n+"members"]=[],t[n+"last"]=r;var d=$.getComp(e).comps[o];d.uid=r,d.status=1,d.q=0,d.members=[],d.last=r,Db.update("comp",e,{$set:t})}var Db=require("../db"),$=require("jquery-deferred"),Curve=require("../controllers/curve"),Rank=require("../controllers/rank"),WCATK=[{id:0,gold:70,money:1,round:Math.floor},{id:1,gold:50,money:1.2,round:Math.floor},{id:2,gold:35,money:1.5,round:Math.floor},{id:3,gold:25,money:1.8,round:Math.ceil},{id:4,gold:20,money:2,round:Math.ceil},{id:5,gold:15,money:2.3,round:Math.ceil},{id:6,gold:10,money:2.6,round:Math.ceil},{id:7,gold:7,money:3,round:Math.ceil},{id:8,gold:5,money:3.5,round:Math.ceil}],FUND_LEVELS=[{id:0,members:10,fund:[.6,.4]},{id:1,members:20,fund:[.5,.3,.2]},{id:2,members:40,fund:[.4,.27,.19,.14]},{id:3,members:80,fund:[.36,.25,.175,.128,.087]},{id:4,members:150,fund:[.34,.23,.165,.119,.08,.06]},{id:5,members:300,fund:[.317,.207,.153,.108,.072,.058,.046,.039]},{id:6,members:500,fund:[.305,.195,.137,.1,.067,.054,.042,.037,.033,.03]},{id:7,members:1e3,fund:[.29,.187,.135,.095,.065,.052,.04,.034,.029,.026,.024,.023]},{id:8,members:2e3,fund:[.28,.18,.13,.093,.063,.05,.039,.033,.029,.0255,.0225,.02,.018,.017]}];$.getComp=function(e){return $.grep(GLOBAL.GYM.COMPS,function(o){return o._id==e})[0]},module.exports={init:function(){Db.getColl("comp").find({}).toArray(function(e,o){GLOBAL.GYM.COMPS=o})},run:function(){console.log("************* Comp Job is running ************");for(var e=0;e<GLOBAL.GYM.COMPS.length;e++)for(var o=$.getComp(e).comps,r=0;r<o.length;r++){var n=o[r];if(!n.disabled)if(0!==n.status){if(!(n.q<GLOBAL.GYM.COMP_MIN_Q)){var t=Curve.getCompDelay(n.q),d=(new Date).getTime();if(!(n.last+60*t*1e3*GLOBAL.GYM.COMP_TIME_COEFF>d)){for(var m=n.members.sort(function(e,o){var r=o.sum-e.sum;return 0===r&&(r=e.mass-o.mass),r}),u=getCompDetails(0,r,n.q),i=[],s=0;s<m.length;s++){var a=m[s],l=s+1,f=null,c=null;if(u.fund[s]){i.push(a);var g=u.fund[s];f=Math.round(g*u.gold),c=Math.round(g*u.money)}var p="public.comp."+r+".",M={};M[p+"place"]=l,M[p+"status"]="results",3>=l&&(M[p+"award"]="{0}-{1}-{2}-{3}-{4}".f(l,n.q,e,a.sum,r)),f&&(M[p+"gold"]=f),c&&(M[p+"money"]=c),Db.update("players",a.id,{$set:M}),GLOBAL.GYM.force[a.id]=!0}var d=(new Date).getTime(),b={};b["comps."+r+".res"]=i,b["comps."+r+".resQ"]=m.length,b["comps."+r+".status"]=0,$.getComp(e).comps[0].status=0,Db.update("comp",e,{$set:b})}}}else makeCompActive(e,r)}}};
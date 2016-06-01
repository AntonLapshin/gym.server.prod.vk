function getCat(n){return $.grep(WCATS,function(t){return t>n})[0]}function getRank(n,t){if(!T[n])return null;var e=$.grep(T[n],function(n){return t>=n});return 0===e.length?null:e.length-1}function getRanks(n){for(var t=[],e=[].concat(n["public"].ranks||[]),r=0;r<WCATS.length;r++){var u=e.pop();if(!u)break;t[parseInt(u[0])]=parseInt(u[1])}return t}function setRanks(n,t){for(var e=[],r=0;r<t.length;r++){var u=t[r];void 0!=u&&e.push(""+r+u)}n["public"].ranks=e}function hasRank(n,t,e){return(n[t]||-1)>=e}function getSum(n){var t=[];n["public"].exercises.forEach(function(n){2!==n._id&&3!==n._id&&4!==n._id||t.push(n?n.pr||0:0)});var e=$.sum(t);return e}var $=require("jquery-deferred"),WCATS=[53,59,66,74,83,93,105,120,200],T=[[260,282.5,325,410],[290,315,362.5,455,570,625],[320,350,402.5,510,635,700],[352.5,385,440,537.5,695,770],[387.5,422,482.5,582.5,747.5,835],[412.5,465,520,610,787.5,880],[460,500,552.5,645,815,920],[497.5,530,600,687.5,835,955],[510,545,617.5,735,860,980]],PRIZE=[["0,1","0,3","0,6","0,8"],["0,1","0,4","0,8","0,12","0,14","1,2"],["0,2","0,5","0,10","0,15","0,20","1,8"],["0,2","0,6","0,12","0,18","0,24","1,14"],["0,3","0,7","0,14","0,21","0,28","1,20"],["0,3","0,8","0,16","0,24","0,32","1,24"],["0,4","0,9","0,18","0,27","0,36","1,28"],["0,4","0,10","0,20","0,30","1,12","1,32"],["0,5","0,11","0,22","0,33","1,20","2,25"]];module.exports={getCatData:function(n){var t=WCATS.indexOf(n);return{max:n,min:t>0?WCATS[t-1]:0}},update:function(n){var t=getCat(n["public"].mass),e=WCATS.indexOf(t),r=getSum(n),u=getRank(e,r);if(null===u)return null;var a=getRanks(n);return hasRank(a,e,u)?void 0:(a[e]=u,setRanks(n,a),u)},getRank:function(n){var t=getCat(n["public"].mass),e=WCATS.indexOf(t),r=getSum(n);return getRank(e,r)},getSum:getSum,getSalary:function(n){var t=getCat(n["public"].mass),e=WCATS.indexOf(t),r=getSum(n),u=getRank(e,r);if(null===u)return null;var a=PRIZE[e][u];return null==a?null:(a=a.split(","),{gold:parseInt(a[0]),money:parseInt(a[1])})}};
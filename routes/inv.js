function set(e,r,s){var t=e.player["public"][r+"s"];return s=parseInt(s),!t||-1==t.indexOf(s)&&0!=s?!1:(e.player["public"][r]=s,e.isDirty=!0,!0)}var Db=require("../db"),$=require("jquery-deferred");module.exports={"default":{params:{type:{required:!0},id:{required:!0,parseMethod:parseInt}},handler:function(e,r){var s=r.type,t=r.id,a={success:!0};if("hs"===s||"bd"===s||"gl"===s||"sh"===s||"ts"===s||"sn"===s){var u=set(e,s,t);u||(a.success=!1)}var i=$.Deferred();return i.resolve(a),i}},bulk:{params:{statement:{required:!0}},handler:function(e,r){for(var s=r.statement,t=s.split(","),a=0;a<t.length;a++){var u=t[a].split("="),i=u[0],n=u[1];set(e,i,n)}var d={success:!0},l=$.Deferred();return l.resolve(d),l}}};
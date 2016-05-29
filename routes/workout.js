function setFrazzle(e,r,t){var a=e["private"].frazzle,s=e["private"].stress,i=e["private"].tonus;r.body.forEach(function(e,r){var n=a[e._id]+e.stress*t;n>1&&(n=1);var u=s[e._id]+(e.stress<.5?e.stress/5:e.stress)*t;u>1&&(u=1);var p=e._id,o=.025*u;o-=o*(i[p]/TONUS_MAX),i[p]+=$.round(o),i[p]>TONUS_MAX&&(i[p]=TONUS_MAX),a[p]=$.round(n),s[p]=$.round(u)})}var Db=require("../db"),$=require("jquery-deferred"),Curve=require("../controllers/curve"),Coach=require("../controllers/coach"),Rank=require("../controllers/rank"),Stimul=require("../controllers/stimul"),WEIGHT_MIN=0,REPEATS_MIN=0,REPEATS_MAX=200,COEFF_POWER=7,COEFF_FRAZZLE=10,TONUS_MAX=10;module.exports={getTotalWeightMax:function(e,r){for(var t=e["public"].level,a=e["private"].tonus,s=Db.getRefs().exercises[r],i=Curve.getWeightMax(t,r),n=Stimul.getPower(e),u=0,p=0,o=0,f=0;f<s.body.length;f++){var c=s.body[f],v=Db.getRefs().muscles[c._id],d=a?a[c._id]:0,l=v.power*c.stress,E=l*e["private"].frazzle[c._id],M=l*d;u+=l,p+=E,o+=M}var g=p/u,a=o/u,_=i+.1*i*n-.1*i*g+.1*i*a;return _},getRepeatsAndEff:function(e,r,t,a){var s=Curve.getRepeatsMax(e["public"].level,r,t,a),i=Curve.getRepeatsEffect(s);return{repeatsMax:s,weightEffect:i}},auto:{params:{rate:{required:!0,parseMethod:parseInt},eff:{required:!0,parseMethod:parseFloat}},handler:function(e,r){var t=$.Deferred(),a=e.player,s=r.rate,i=r.eff;if(a["private"].money<s)return t.resolve({success:!1}),t;var n={success:!0},u=a["private"].energy/a["private"].energyMax;i=u*i;for(var p=a["private"].frazzle,o=a["private"].stress,f=a["private"].tonus,c=0;15>=c;c++){p[c]+=$.round(i),o[c]+=$.round(i),p[c]>1&&(p[c]=1),o[c]>1&&(o[c]=1);var v=.01*i;v-=v*(f[c]/TONUS_MAX),f[c]+=$.round(v),f[c]>TONUS_MAX&&(f[c]=TONUS_MAX)}return e.isDirty=!0,n.effect=i,n.energy=-a["private"].energy,n.money=-s,a["private"].energy=0,Coach.earn(a["private"].coach,s),t.resolve(n),t}},execute:{params:{gymId:{required:!0,parseMethod:parseInt},exerciseId:{required:!0,parseMethod:parseInt},weight:{required:!0,parseMethod:parseFloat},repeats:{required:!0,parseMethod:parseInt}},handler:function(e,r){var t=e.player,a=r.gymId,s=r.exerciseId,i=r.weight,n=r.repeats,u=$.Deferred(),p=Db.getRefs().gyms[a];if(-1==p.exercises.indexOf(s))return u.reject("MES_EXERCISE"),u;var o=$.grep(t["public"].exercises,function(e){return e._id===s});if(0===o.length)return u.reject("MES_EXERCISE"),u;o=o[0];var f=Db.getRefs().exercises[s],c=f.max*p.weight;if(WEIGHT_MIN>i||i>c)return u.reject("MES_WEIGHT"),u;if(REPEATS_MIN>n)return u.reject("MES_REPEATS_MIN"),u;if(n>REPEATS_MAX)return u.reject("MES_REPEATS_MAX"),u;var v={success:!0,id:s,weight:i,plan:n},d=module.exports.getTotalWeightMax(t,s);if(i>d&&f.energy>t["private"].energy)return u.reject("MES_ENERGY"),u;var l,E,M=module.exports.getRepeatsAndEff(t,s,i,d),g=n>0?n:M.repeatsMax,_=Math.floor(g<M.repeatsMax?g:M.repeatsMax);if(i>d)E=.5,l=f.energy;else if(E=Curve.getRepeatsEffect(g),l=Math.ceil(_/M.repeatsMax*f.energy),l>t["private"].energy)return u.reject("MES_ENERGY"),u;var h=M.weightEffect*E*.3*(_/M.repeatsMax);if(v.effect=h,v.fact=M.repeatsMax,v.energy=-l,_>=1){var x=o.pr||0;if(i>x){o&&(o.pr=i);var y=Rank.update(t);null!==y&&(v.rank=y),v.pr=!0}var S=f.wr;i>(S?S.value:0)&&(f.wr={value:i,_id:t._id},Db.update("exercises",s,{$set:{wr:f.wr}}),v.wr=!0)}return t["private"].energy-=l,setFrazzle(t,f,h),e.isDirty=!0,u.resolve(v),u}}};
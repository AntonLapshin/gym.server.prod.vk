function addExercise(e,r,n){0===$.grep(e["public"].exercises,function(e){return e._id===r}).length&&(e["public"].exercises.push({_id:r}),n.purchase={success:!0,type:"exercises",id:r})}function addGym(e,r,n){-1===e["private"].gyms.indexOf(r)&&(e["private"].gyms.push(r),n.purchase={success:!0,type:"gyms",id:r})}function round(e){return Math.round(100*e)/100}var Db=require("../db"),Player=require("./player"),$=require("jquery-deferred"),achList=[function(e,r){var n=e["private"].coach;return n&&(e["private"].gold+=1,r.gold=1),n},function(e,r){var n=r.player&&254444141==r.player._id;return n&&addGym(e,0,r),n},function(e,r){var n=1===r.id&&r.fact>=1&&r.weight>=0;return n&&(e["private"].money+=3,r.money=3),n},function(e,r){var n=2===r.id&&r.fact>=1&&r.weight>=40;return n&&(e["private"].gold+=1,r.gold=1),n},function(e,r){var n="success"===r.job;return n&&addExercise(e,3,r),n},function(e,r){var n=r.purchase;if(!n)return!1;var t="food"===n.type&&n.success===!0;return t&&(e["private"].money+=3,r.money=3),t},function(e,r){var n=r.purchase;if(!n)return!1;var t="rest"===n.type&&n.success===!0;return t&&(e["private"].money+=5,r.money=5),t},function(e,r){var n=1==r.levelChange;return n&&addExercise(e,4,r),n},function(e,r){var n=0===r.id&&r.fact>=1&&r.weight>=0;return n&&(e["private"].money+=5,r.money=5),n},function(e,r,n){var t=(n.query.garb,0===e["private"].garb);return t&&(e["private"].money+=10,r.money=10),t},function(e,r){var n=!0;return e["private"].body.forEach(function(e){return 1!=e.stress?(n=!1,!1):void 0}),n&&(e["private"].gold+=1,r.gold=1),n},function(e,r){var n=e["public"].level>=7;return n&&addGym(e,1,r),n},function(e,r){var n=0===r.exerciseId&&r.weight>=0&&r.fact>=10;return n&&(e["private"].gold+=1,r.gold=1),n},function(e,r){var n=4===r.exerciseId&&r.weight>=90&&r.fact>=1;return n&&addExercise(e,5,r),n},function(e,r){var n=3===r.exerciseId&&r.weight>=100&&r.fact>=1;return n&&(e["private"].gold+=1,r.gold=1),n},function(e,r){var n=e["public"].level>=14;return n&&addExercise(e,6,r),n},function(e,r){var n=6===r.exerciseId&&r.weight>=40&&r.fact>=1;return n&&addExercise(e,7,r),n},function(e,r){var n=e["public"].level>=19;return n&&(e["private"].money+=20,r.money=20,e["private"].gold+=2,r.gold=2),n},function(e,r){var n=e["public"].level>=23;return n&&(e["private"].money+=30,r.money=30,e["private"].gold+=3,r.gold=3),n},function(e,r){var n=e["public"].level>=28;return n&&addGym(e,2,r),n},function(e,r){var n=e["public"].level>=34;return n&&(e["private"].money+=40,r.money=40,e["private"].gold+=4,r.gold=4),n},function(e,r){var n=1===r.exerciseId&&r.weight>=0&&r.fact>=10;return n&&(e["private"].money+=5,r.money=5),n},function(e,r){var n=2===r.id&&r.fact>=1&&r.weight>=60;return n&&(e["private"].gold+=1,r.gold=1),n},function(e,r){var n=!0,n=1==e["private"].body[6].stress;return n&&(e["private"].money+=3,r.money=3),n},function(e,r){var n=!0,n=1==e["private"].body[13].stress;return n&&(e["private"].money+=5,r.money=5),n},function(e,r){var n=r.purchase;if(!n)return!1;var t="stimul"===n.type&&n.success===!0;return t&&(e["private"].money+=8,r.money=8),t},function(e,r){var n=r.purchase;if(!n)return!1;var t=e["public"].level>=30;return t&&(e["private"].gold+=1,r.gold=1,r.coach=!0),t}];module.exports={handler:function(e,r,n){var t=e.player;if("object"==typeof r&&r!==t){var i=[],a=t["private"].achievements;achList.forEach(function(e,u){-1===a.indexOf(u)&&e(t,r,n)&&(i.push(u),a.push(u))}),i.length>0&&(r.newAchievements=i,e.isDirty=!0)}}};
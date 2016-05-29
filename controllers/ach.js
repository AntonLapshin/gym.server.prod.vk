function checkAchGroup(r,t){var e=r["private"].achievements,n=!0;return t.forEach(function(r){return-1===e.indexOf(r)?(n=!1,!1):void 0}),n}function getPr(r,t){var e=r["public"].exercises,n=$.grep(e,function(r){return r._id==t});return 0===n.length?null:n[0].pr}function checkRank(r,t){if(!r["public"].ranks)return!1;for(var e=0;e<r["public"].ranks.length;e++){var n=r["public"].ranks[e];if(parseInt(n[1])>=t)return!0}}function addExercise(r,t,e){0===$.grep(r["public"].exercises,function(r){return r._id===t}).length&&(r["public"].exercises.push({_id:t}),e.purchase={success:!0,type:"exercises",id:t})}function addGym(r,t,e){-1===r["private"].gyms.indexOf(t)&&(r["private"].gyms.push(t),e.purchase={success:!0,type:"gyms",id:t})}function round(r){return Math.round(100*r)/100}var Db=require("../db"),Player=require("./player"),Coach=require("./coach"),$=require("jquery-deferred"),achList={100:function(r,t){return checkAchGroup(r,[101,102,103,104,105,106,107,108,109])},101:function(r,t){return t.player&&t.player["public"].coach||r["public"].level>0},102:function(r,t){return r["private"].coach||r["public"].level>0},103:function(r,t){return 1===t.id&&t.fact>=1&&t.weight>=0||r["public"].level>0},104:function(r,t){return 2===t.id&&t.fact>=1&&t.weight>=40||r["public"].level>0},105:function(r,t){return"success"===t.job||r["public"].level>0},106:function(r,t,e){return 0===r["private"].garb||r["public"].level>0},107:function(r,t){if(r["public"].level>0)return!0;var e=t.purchase;return e?"food"===e.type&&e.success===!0:!1},108:function(r,t){if(r["public"].level>0)return!0;var e=t.purchase;return e?"rest"===e.type&&e.success===!0:!1},109:function(r,t){return 1==t.levelChange||r["public"].level>0},200:function(r,t){return checkAchGroup(r,[201,202,203,204,205,206,207,208])},201:function(r,t){return r["public"].level>1||0===t.id&&t.fact>=1&&t.weight>=0},202:function(r,t){return r["public"].level>1||1===t.id&&t.fact>=2&&t.weight>=0},203:function(r,t){var e=t.purchase;return e?"stimul"===e.type&&e.success===!0&&2===e.id:!1},204:function(r,t){var e=t.purchase;return e?"stimul"===e.type&&e.success===!0&&0===e.id:!1},205:function(r,t){if(r["public"].hss&&r["public"].hss.length>0)return!0;var e=t.purchase;return e?"hs"===e.type&&e.success===!0:!1},206:function(r,t){if(r["public"].gls&&r["public"].gls.length>0)return!0;var e=t.purchase;return e?"gl"===e.type&&e.success===!0:!1},207:function(r,t){if(r["public"].bds&&r["public"].bds.length>0)return!0;var e=t.purchase;return e?"bd"===e.type&&e.success===!0:!1},208:function(r,t){return r["private"].friends>=3},300:function(r,t){return checkAchGroup(r,[301,302,303,304,305,306,307,308])},301:function(r,t){return r["public"].level>5||1===t.id&&t.fact>=5&&t.weight>=0},302:function(r,t){var e=t.purchase;return e?"stimul"===e.type&&e.success===!0&&1===e.id:!1},303:function(r,t){var e=t.purchase;return e?"stimul"===e.type&&e.success===!0&&3===e.id:!1},304:function(r,t){if(r["public"].shs&&r["public"].shs.length>0)return!0;var e=t.purchase;return e?"sh"===e.type&&e.success===!0:!1},305:function(r,t){if(r["public"].tss&&r["public"].tss.length>0)return!0;var e=t.purchase;return e?"ts"===e.type&&e.success===!0:!1},306:function(r,t){if(r["public"].sns&&r["public"].sns.length>0)return!0;var e=t.purchase;return e?"sn"===e.type&&e.success===!0:!1},307:function(r,t){return checkRank(r,0)?!0:t.rank>=0},308:function(r,t){return r["private"].friends>=5},400:function(r,t){return checkAchGroup(r,[401,402,403,404,405,406])},401:function(r,t){return 2===t.id&&t.fact>=10&&t.weight>=80},402:function(r,t){return 3===t.id&&t.fact>=10&&t.weight>=115},403:function(r,t){return 4===t.id&&t.fact>=10&&t.weight>=125},404:function(r,t){var e=r["public"].level>=15;return e&&(r["public"].coach||(t.coach=!0,r["public"].coach=Coach.create(r._id))),e},405:function(r,t){return r["private"].friends>=8},406:function(r,t){return checkRank(r,2)?!0:t.rank>=2},500:function(r,t){return checkAchGroup(r,[501,502,503,504,505,506])},501:function(r,t){return 2===t.id&&t.fact>=10&&t.weight>=105},502:function(r,t){return 3===t.id&&t.fact>=10&&t.weight>=180},503:function(r,t){return 4===t.id&&t.fact>=10&&t.weight>=200},504:function(r,t){return r["public"].coach&&r["public"].coach.q>=20},505:function(r,t){return r["private"].friends>=12},506:function(r,t){return checkRank(r,3)?!0:t.rank>=3},600:function(r,t){return checkAchGroup(r,[601,602,603,604,605,606])},601:function(r,t){return 0===t.id&&t.fact>=10&&t.weight>=80},602:function(r,t){return 7===t.id&&t.fact>=10&&t.weight>=170},603:function(r,t){return 5===t.id&&t.fact>=10&&t.weight>=115},604:function(r,t){return r["public"].coach&&r["public"].coach.q>=40},605:function(r,t){return r["private"].friends>=15},606:function(r,t){return checkRank(r,4)?!0:t.rank>=4},700:function(r,t){return checkAchGroup(r,[701,702,703,704,705,706])},701:function(r,t){return 10===t.id&&t.fact>=10&&t.weight>=500},702:function(r,t){return 6===t.id&&t.fact>=20&&t.weight>=90},703:function(r,t){return 1===t.id&&t.fact>=15&&t.weight>=75},704:function(r,t){return r["public"].coach&&r["public"].coach.q>=70},705:function(r,t){return r["private"].friends>=20},706:function(r,t){return checkRank(r,5)?!0:t.rank>=5},800:function(r,t){return checkAchGroup(r,[801,802,803,804,805,806,807,808,809,810,811,812,813])},801:function(r,t){return 1==r["private"].stress[0]},802:function(r,t){return 1==r["private"].stress[1]},803:function(r,t){return 1==r["private"].stress[2]},804:function(r,t){return 1==r["private"].stress[3]},805:function(r,t){return 1==r["private"].stress[4]},806:function(r,t){return 1==r["private"].stress[5]},807:function(r,t){return 1==r["private"].stress[6]},808:function(r,t){return 1==r["private"].stress[7]},809:function(r,t){return 1==r["private"].stress[8]},810:function(r,t){return 1==r["private"].stress[9]},811:function(r,t){return 1==r["private"].stress[10]},812:function(r,t){return 1==r["private"].stress[13]},813:function(r){var t=!0;return r["private"].stress.forEach(function(r){return 1!=r?(t=!1,!1):void 0}),t},900:function(r,t){return checkAchGroup(r,[901,902,903,904,905,906,907,908,909,910])},901:function(r,t){return r["public"].mass&&r["public"].mass>=53},902:function(r,t){return r["public"].mass&&r["public"].mass>=59},903:function(r,t){return r["public"].mass&&r["public"].mass>=66},904:function(r,t){return r["public"].mass&&r["public"].mass>=74},905:function(r,t){return r["public"].mass&&r["public"].mass>=83},906:function(r,t){return r["public"].mass&&r["public"].mass>=93},907:function(r,t){return r["public"].mass&&r["public"].mass>=105},908:function(r,t){return r["public"].mass&&r["public"].mass>=120},909:function(r,t){return r["public"].mass&&r["public"].mass>=130},910:function(r,t){return r["public"].mass&&r["public"].mass>=140},1e3:function(r,t){return checkAchGroup(r,[1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020])},1001:function(r,t){var e=getPr(r,4);return e&&e>=180?!0:4===t.id&&t.fact>=1&&t.weight>=180},1002:function(r,t){var e=getPr(r,6);return e&&e>=60?!0:6===t.id&&t.fact>=1&&t.weight>=60},1003:function(r,t){var e=getPr(r,7);return e&&e>=120?!0:7===t.id&&t.fact>=1&&t.weight>=120},1004:function(r,t){var e=getPr(r,5);return e&&e>=110?!0:5===t.id&&t.fact>=1&&t.weight>=110},1005:function(r,t){var e=getPr(r,0);return e&&e>=100?!0:0===t.id&&t.fact>=1&&t.weight>=100},1006:function(r,t){var e=getPr(r,1);return e&&e>=100?!0:1===t.id&&t.fact>=1&&t.weight>=100},1007:function(r,t){var e=getPr(r,2);return e&&e>=170?!0:2===t.id&&t.fact>=1&&t.weight>=170},1008:function(r,t){var e=getPr(r,3);return e&&e>=250?!0:3===t.id&&t.fact>=1&&t.weight>=250},1009:function(r,t){var e=getPr(r,4);return e&&e>=280?!0:4===t.id&&t.fact>=1&&t.weight>=280},1010:function(r,t){var e=getPr(r,6);return e&&e>=120?!0:6===t.id&&t.fact>=1&&t.weight>=120},1011:function(r,t){var e=getPr(r,7);return e&&e>=200?!0:7===t.id&&t.fact>=1&&t.weight>=200},1012:function(r,t){var e=getPr(r,5);return e&&e>=150?!0:5===t.id&&t.fact>=1&&t.weight>=150},1013:function(r,t){var e=getPr(r,0);return e&&e>=160?!0:0===t.id&&t.fact>=1&&t.weight>=160},1014:function(r,t){var e=getPr(r,1);return e&&e>=160?!0:1===t.id&&t.fact>=1&&t.weight>=160},1015:function(r,t){var e=getPr(r,2);return e&&e>=230?!0:2===t.id&&t.fact>=1&&t.weight>=230},1016:function(r,t){var e=getPr(r,3);return e&&e>=360?!0:3===t.id&&t.fact>=1&&t.weight>=260},1017:function(r,t){var e=getPr(r,4);return e&&e>=390?!0:4===t.id&&t.fact>=1&&t.weight>=390},1018:function(r,t){var e=getPr(r,6);return e&&e>=180?!0:6===t.id&&t.fact>=1&&t.weight>=180},1019:function(r,t){var e=getPr(r,7);return e&&e>=330?!0:7===t.id&&t.fact>=1&&t.weight>=330},1020:function(r,t){var e=getPr(r,5);return e&&e>=220?!0:5===t.id&&t.fact>=1&&t.weight>=220}};module.exports={handler:function(r,t,e){var n=r.player;if("object"==typeof t&&t!==n){var u=[],i=n["private"].achievements;for(var c in achList){var s=achList[c];if(c=parseInt(c),-1===i.indexOf(c)&&s(n,t,e)){var a=$.grep(Db.getRefs().achievements,function(r){return r._id==c})[0],f=a.oldId?-1!==i.indexOf(a.oldId):!1;u.push(c),i.push(c),f||(a.prize.money&&(n["private"].money+=a.prize.money,t.money||(t.money=0),t.money+=a.prize.money),a.prize.gold&&(n["private"].gold+=a.prize.gold,t.gold||(t.gold=0),t.gold+=a.prize.gold),"exercises"===a.prize.type&&addExercise(n,a.prize.id,t),"gyms"===a.prize.type&&addGym(n,a.prize.id,t))}}u.length>0&&(t.newAchievements=u,r.isDirty=!0)}}};
function reloadSession(e){var r=$.Deferred();return e.sessionStore.sessions[e.sessionID]?(e.session.reload(function(){r.resolve()}),r):(r.resolve(),r)}function handler(e,r,s,n){function o(s){var n=s.message||s,o={error:n,url:e.url};s.stack&&(console.log(s.stack),Db.insert("errors",{_id:(new Date).getTime(),playerId:e.session.player._id,side:"server",message:n,stack:s.stack})),r.jsonp(JSON.stringify(o))}function t(s){var n={data:s||!0,url:e.url};r.jsonp(JSON.stringify(n))}reloadSession(e).then(function(){try{var r=require("./routes/auth"),i=e.session;if(s!==r&&!i.player)throw"ERR_UNAUTH";var a=getMethodName(e,s),u=s[a];if(!u)return void o("Method "+a+" is not exists");var l=i.player;l&&(PlayersCollection.initStress(i.player),PlayersCollection.initFrazzle(i.player),PlayersCollection.initTonus(i.player));var c=getParams(e,u);u.handler(i,c).then(function(r){"refs"!==n&&require("./controllers/ach").handler(i,r,e),i.isDirty?(i.isDirty=!1,i.save(function(){t(r)}),Player.update(i.player._id,i.player)):t(r)},o)}catch(y){o(y)}})}function getMethodName(e,r){for(var s in e.query)if("method"===s)return e.query[s];return"default"}function getParams(e,r){var s={};if(!r.params)return s;for(var n in r.params){var o=r.params[n],t=e.query[n];if(o.required&&void 0===t)throw ERR_PARAMS;o.parseMethod&&(t=o.parseMethod(t)),s[n]=t}return s}var Express=require("express"),Db=require("./db"),Compression=require("compression"),Session=require("express-session"),GymDb=require("./gymdb/gymdb"),$=require("jquery-deferred"),Player=require("./controllers/player"),Coach=require("./controllers/coach"),PlayersCollection=require("./gymdb/collections/players");exports.start=function(e){var r=Express();r.use(Compression()),r.use(Session({genid:function(e){var r=e.query.playerId;return r},secret:"iuBviX21"}));var s=["auth","refs","workout","job","self","top","coach","buy","real","god","payment","inv","error"];return $.Deferred(function(n){try{GymDb.init(GLOBAL.GYM.instance).then(function(){s.forEach(function(e){var s=require("./routes/"+e);r.get("/"+e,function(r,n){handler(r,n,s,e)})}),r.listen(e),n.resolve()},n.reject)}catch(o){n.reject(o)}})};
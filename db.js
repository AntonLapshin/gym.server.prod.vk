function auth(e){return $.Deferred(function(n){_db.authenticate(e.username,e.password,function(e,t){$.handle(e,t,n)})})}function loadReference(e){return getAllValues(e).then(function(n){_references[e]=n})}function loadReferences(e){var n=[];return e.forEach(function(e){n.push(loadReference(e))}),$.when.apply($,n)}function getCollection(e){return $.Deferred(function(n){_db.collection(e,function(t,o){t?n.reject(t):(_collections[e]=o,n.resolve(o))})})}function getAllValues(e){return"string"==typeof e&&(e=_collections[e]),$.Deferred(function(n){e.find({}).toArray(function(e,t){$.handle(e,t,n)})})}function clearCollection(e){return"string"==typeof e&&(e=_collections[e]),$.Deferred(function(n){return void 0===e?void n.resolve():void e.remove(function(e,t){$.handle(e,t,n)})})}var Mongo=require("mongodb"),$=require("jquery-deferred"),_db=null,_collections={},_references={};String.prototype.f=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(n,t){return"undefined"!=typeof e[t]?e[t]:n})},$.handle=function(e,n,t){e?t.reject(e):t.resolve(n)},$.grep=function(e,n){var t=[];return e.forEach(function(e){n(e)&&t.push(e)}),t},$.round=function(e){return Math.round(1e5*e)/1e5},$.random=function(e,n){return Math.random()*(n-e)+e|0},$.sum=function(e){var n=0;return e.forEach(function(e){n+=e}),n},module.exports={init:function(e,n,t){return this.connect(e).then(function(){return module.exports.getCollections(n)}).then(function(){return loadReferences(t)})},connect:function(e){var n=new Mongo.Db(e.database,new Mongo.Server(e.host,e.port,{auto_reconnect:!0},{}));return $.Deferred(function(t){n.open(function(n,o){n?t.reject(n):(_db=o,auth(e).then(function(){t.resolve()},t.reject))})})},clearCollections:function(e){var n=[];return e.forEach(function(e){n.push(clearCollection(e))}),$.when.apply($,n)},clearCollection:clearCollection,getCollections:function(e){var n=[];return e.forEach(function(e){n.push(getCollection(e))}),$.when.apply($,n)},insert:function(e,n){return"string"==typeof e&&(e=_collections[e]),$.Deferred(function(t){return void 0===n||null===n||0===n.length?void t.resolve():void e.insert(n,function(e){$.handle(e,n,t)})})},update:function(e,n,t){return"string"==typeof e&&(e=_collections[e]),$.Deferred(function(o){e.update({_id:n},t,function(e,n){$.handle(e,n,o)})})},remove:function(e,n){return"string"==typeof e&&(e=_collections[e]),$.Deferred(function(t){e.remove({_id:n},function(e,n){$.handle(e,n,t)})})},exists:function(e,n){return"string"==typeof e&&(e=_collections[e]),$.Deferred(function(t){e.findOne({_id:n},{_id:1},function(e,n){$.handle(e,n,t)})})},find:function(e,n,t){"string"==typeof e&&(e=_collections[e]);var o=t;"string"==typeof t&&(t=[t]);for(var r={},c=0;c<t.length;c++)r[t[c]]=1;return $.Deferred(function(t){e.findOne({_id:n},r,function(e,n){e?t.reject(e):null==n?t.resolve(null):"string"==typeof o?t.resolve(n[o]):t.resolve(n)})})},ensureIndex:function(e,n){return"string"==typeof e&&(e=_collections[e]),$.Deferred(function(t){return void 0==n?void t.resolve():void e.ensureIndex(n,function(e,n){$.handle(e,n,t)})})},getRefs:function(){return _references},getDb:function(){return _db},getColl:function(e){return _collections[e]}};
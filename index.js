var instances=require("./gymdb/instances");GLOBAL.GYM={test:!1,instance:instances.GYMPRODVK,UPDATE_PERIOD:2,CHECK_LEVELUP_PERIOD:2,REG_ENERGY_SLOW:.33,REG_ENERGY:.66,REG_FRAZZLE_SLOW:.33,REG_FRAZZLE:.66,REG_TONUS:.001,REG_GARB:30,VK_APP_SECRET:"rR2DPdtMG6vNj2PfiTVx",VK_APP_ID:"5415485",JOBS:{comp:6e5},COMP_TIME_COEFF:1,COMP_MIN_Q:7,force:{}};var port=Number(process.env.PORT||8081);require("./server").start(port).then(function(){console.log("Listening port "+port)},function(E){throw E});
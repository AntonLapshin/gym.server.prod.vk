var instances = require('./gymdb/instances');

GLOBAL.GYM = {

  test: false,
  instance: instances.GYMPRODVK,

  // Minutes
  UPDATE_PERIOD: 2,

  // Hours
  CHECK_LEVELUP_PERIOD: 2, // each 2 hours

  // Percent per hour
  REG_ENERGY_SLOW: 0.33,
  REG_ENERGY: 0.66,
  REG_FRAZZLE_SLOW: 0.33,
  REG_FRAZZLE: 0.66,
  REG_TONUS: 0.001,

  // Items per hour
  REG_GARB: 30,

  VK_APP_SECRET: "rR2DPdtMG6vNj2PfiTVx",
  VK_APP_ID: "5415485"

  JOBS: {
    comp: 10 * 60 * 1000
  },

  COMP_TIME_COEFF: 1,
  COMP_MIN_Q: 7,
  force: {}
}

var port = Number(process.env.PORT || 8081);
require('./server').start(port).then(function() {
  console.log('Listening port ' + port);
}, function(err) {
  throw err;
});
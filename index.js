var port = Number(process.env.PORT || 8081);

require('./server').start(port, {
        host: 'ds041831.mlab.com',
        port: 41831,
        database: 'gymprodvk',
        username: 'gymadmin',
        password: '24547294'
    }, {
        VK_APP_SECRET: "rR2DPdtMG6vNj2PfiTVx",
        VK_APP_ID: "5415485";
    })
    .then(function () {
        console.log('Listening port ' + port);
    }, function (err) {
        throw err;
    });
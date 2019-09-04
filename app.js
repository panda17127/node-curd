var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var router = require('./router.js');

var app = express();

app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

// 模板引擎和 bodyParser 要在路由前面
app.engine('html', require('express-art-template'));

// 配置 body-parser, 专门用来获取 post 数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// 把路由容器挂载到 app 服务中
app.use(router);

app.listen(3000, function() {
	console.log('express is running...');
})

module.exports = app;
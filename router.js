
// 这样也不方便
// module.exports = function (app) {

	// app.get('/students', function(req, res) {
	// 	fs.readFile('./db.json', 'utf8', function(err, data) {
	// 		if (err) {
	// 			return res.status(500).send('Server error.');
	// 		}
	// 		res.render('index.html', {
	// 			fruits: ['apple', 'pear', 'banner', 'peach'],
	// 			students: JSON.parse(data).students
	// 		});
	// 	})
	// })

// }
// 

//express 提供一种更好的方式
//专门用来包装路由的

var express = require('express');
var Student = require('./student');


Student.updateById({
	id: 1,
	name: '修改hou'
}, function (err, data) {
	if (err) {
		console.log('保存失败');
	}
})
// 1. 创建一个路由容器
var router = express.Router();

// 2. 把路由都挂载到容器中
router.get('/', function (req, res) {
	Student.find(function (err, data) {
		if (err) {
			return res.status(500).send('Server error.');
		}
		res.render('index.html', {
			fruits: [
				'apple', 
				'pear', 
				'banner', 
				'peach'
			],
			students: data
		});
	})
})

router.get('/students', function(req, res) {
	Student.find(function (err, data) {
		if (err) {
			return res.status(500).send('Server error.');
		}
		res.render('index.html', {
			fruits: [
				'apple', 
				'pear', 
				'banner', 
				'peach'
			],
			students: data
		});
	})
})

router.get('/students/new', function(req, res) {
	res.render('new.html');
})

router.post('/students/new', function(req, res) {
	Student.save(req.body, function (err, data) {
		if (err) {
			return res.status(500).send('Server error.');
		}
	})
	res.redirect('/students');
})

// 渲染编辑页面
router.get('/students/edit', function (req, res) {
	
	Student.findById(parseInt(req.query.id), function (err, student) {
		if (err) {
			return res.status(500).send('Server error.');
		}
		res.render('edit.html', {
			student: student
		})
	})
})

// 3. 把 router 导出
module.exports = router;
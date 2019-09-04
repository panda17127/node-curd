
var fs = require('fs');
var dbPath = './db.json'; // 这个是路径，并不是引入

/**
 * 获取所有学生信息列表
 */
exports.find = function (callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		callback(null, JSON.parse(data).students);
	});
} 

/**
 * 保存学生信息
 */
exports.save = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		var students = JSON.parse(data).students;
		student.id = students[students.length - 1].id + 1;
		students.push(student);
		var fileData = JSON.stringify({
			students: students
		});
		fs.writeFile(dbPath, fileData, function(err, data) {
			if (err) {
				return callback(err);
			}
			callback(null);
		})
	});
}

/**
 * 更新学生信息
 */
exports.updateById = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		var students = JSON.parse(data).students;
		var stu = students.find((item) => {
			return item.id === student.id;
		})
		for (var key in student) {
			stu[key] = student[key];
		}
		var fileData = JSON.stringify({
			students: students
		});
		fs.writeFile(dbPath, fileData, function(err, data) {
			if (err) {
				return callback(err);
			}
			callback(null);
		})
	})
}

/**
 * 删除学生信息
 */
exports.delete = function () {

}

/**
 * 根据 id 查询
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.findById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		var students = JSON.parse(data).students;
		var ret = students.find((item) => {
			return item.id === id;
		})
		callback(null, ret);
	})
}
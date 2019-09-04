
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
exports.update = function () {

}

/**
 * 删除学生信息
 */
exports.delete = function () {

}
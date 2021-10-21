
const Fs = require('fs');
const Path = require('path');
const { copyTemplate, checkDirectory, consoleCommon, checkCreateDirectory, } = require('../../utils/tools')
function createDefault(presets) {
	const runtimePath = process.cwd() // 命令行执行的路径
	const projectName = presets.name[0] // 项目名称
	console.log(`${runtimePath}\\${projectName}`)
	let projectRes = checkCreateDirectory(`${runtimePath}\\${projectName}`, true)
	console.log(projectRes)
	if (projectRes) {
		let buildRes = checkCreateDirectory(`${runtimePath}\\${projectName}\\build`, true)
		let publicRes = checkCreateDirectory(`${runtimePath}\\${projectName}\\public`, true)
		let srcRes = checkCreateDirectory(`${runtimePath}\\${projectName}\\src`, true)
	}
	console.log(123)
	// 创建 webpack.base.config.js 文件
	Fs.writeFile('webpack.base.config.js', "const Path = require('path')", (err) => {
		if (err) throw err;
		console.log('webpack.base.config.js create complete...');
	});
}
module.exports = {
	createDefaultVue2: createDefault
}

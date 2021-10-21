
const Fs = require('fs')
const chalk = require('chalk')

/**
 * 解析命令
 * @command -开头的命令
 */
let helpCommand = function (command) {
	// 查看帮助
	if (['-h', 'ls', '--help'].indexOf(command) > -1) {
		console.log(`-h | --help            查看命令列表`)
		console.log(`-v | -V | --version    查看当前版本`)
		console.log(`-i | --info            作者信息`)
		return
	}
	// 查看版本号
	if (['-v', '-V', '--version'].indexOf(command) > -1) {
		let res = Fs.readFileSync(Path.resolve(__dirname, '../../package.json'), 'utf8')
		console.log(`v${JSON.parse(res).version}`)
		return
	}
}

/**
 * 复制文件夹
 * @src 目标文件夹路径
 * @dist 递归复制时上一层路径
*/
function copyTemplate(src, dist) {
	let paths = Fs.readdirSync(src); //同步读取当前目录
	paths.forEach(async function (path) {
		const _src = src + '/' + path;
		const _dist = dist + '/' + path;
		await Fs.stat(_src, async function (err, stats) { //stats 该对象 包含文件属性
			if (err) throw err;
			//获取文件类型
			if (stats.isFile()) {
				let readable = Fs.createReadStream(_src);//创建读取流
				let writable = Fs.createWriteStream(_dist);//创建写入流
				await readable.pipe(writable);
			} else if (stats.isDirectory() && path !== 'node_modules') { //是目录则 递归
				await checkDirectory(_src, _dist, copyTemplate);
			}
		});
	});
}
/**
 * 检查文件夹是否存在同名
 * @src 目标文件夹路径
 * @dist 递归复制时上一层路径
 * @cb 检查之后的回调
*/
function checkDirectory(src, dist, cb) {
	Fs.access(dist, Fs.constants.F_OK, async (err) => {
		if (err) {
			await Fs.mkdirSync(dist);
			cb(src, dist);
		} else {
			cb(src, dist);
		}
	});
};
/**
 * 打印命令报错信息
*/
function consoleCommon(obj) {
	let type = obj.type.toLocaleLowerCase()
	let command = obj.command
	let msg = obj.msg
	if (type) {
		if (['error', 'err'].indexOf(type) > -1) {
			if (command) {
				console.error(`[${chalk.red('ERROR')}]: command '${command}' error , ${msg}`);
			} else {
				console.error(`[ERROR]: ${msg}`);
			}
		} else if (['warning'].indexOf(type) > -1) {
			console.warn(`[${chalk.yellow('WARNING')}]: ${msg}`);
		} else {
			console.log(chalk.green(`project init success...`));
		}
	} else {
		console.error(chalk.red(`something wrong...`));
	}
}
function checkCreateDirectory() {

}
module.exports = {
	copyTemplate,
	checkDirectory,
	consoleCommon,
	checkCreateDirectory
}

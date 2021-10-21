
const Fs = require('fs');
const Path = require('path');
const { copyTemplate, checkDirectory, consoleCommon } = require('../../utils/tools')
function createProject(configFile) {
  const templatePath = Path.resolve(__dirname, `../../template/spa2`); // 获取到相对应的模板路径
  const projectName = configFile.name[0]
  Fs.stat(templatePath, (err, stats) => {
    if (err) {
      consoleCommon({
        type: 'error',
        msg: 'failed read template file...'
      });
      return;
    }
    if (stats.isDirectory()) {
      checkDirectory(templatePath, projectName, copyTemplate);
    } else {

    }
    console.log(`template creation complete...`)
  })
}
module.exports = {
  createSpa2: createProject
}

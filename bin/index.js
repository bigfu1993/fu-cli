#! /usr/bin/env node
/**
 * step : 1
 * 导入模块
*/
const Fs = require('fs')
const Path = require('path')
const Inquirer = require('inquirer')

const { consoleCommon } = require('../utils/tools')
const { commandOpts, presetOpts, platOpts, uiOpts, cssOpts, jsOpts, extendOpts } = require('./static')

const { createSpa3 } = require('./template/spa3')
const { createSpa2 } = require('./template/spa2')
const { createSsr } = require('./template/ssr')
const { createDesign } = require('./template/design')

/**
 * step : 2
 * 获取命令行参数【bin被执行时，process的前2个参数是 node ， bin/index.js ，第三个参数就是模板的传递参数】
 * @process 运行环境参数
*/
// 命令行参数列表
const commandParams = process.argv
//获取用户输入的命令
const [runtimeEnv, entryPath, userAction, ...userProject] = commandParams
// 初始化创建命令
const initAction = userAction || 'init'
const initProject = userProject.length ? userProject : ['mumuxili']

// 检查命令是否合法
if (commandOpts.indexOf(initAction) < 0) {
  consoleCommon({
    type: 'error',
    command: initAction,
  })
  console.log(`where <command> is one of: ${commandOpts.join()}`)
  console.log(`Use '-h'  quick help on <command> or Use 'init' instead to create project...`)
} else {
  if (initAction.trim().indexOf('-') > -1) {
    // 查看帮助
    if (['-h', 'ls', '--help'].indexOf(initAction) > -1) {
      console.log(`-h | --help            查看命令列表`)
      console.log(`-v | -V | --version    查看当前版本`)
      console.log(`-i | --info            作者信息`)
      return
    }
    // 查看版本号
    if (['-v', '-V', '--version'].indexOf(initAction) > -1) {
      let res = Fs.readFileSync(Path.resolve(__dirname, '../package.json'), 'utf8')
      console.log(`v${JSON.parse(res).version}`)
      return
    }
  } else {
    // 校验项目名称是否合法
    if (initProject.length > 1) {
      consoleCommon({
        type: 'error',
        command: initProject.join(' '),
        msg: `Project name error...`
      })
      return;
    }
    // 执行命令
    if (['init', 'create'].indexOf(initAction) > -1) {
      const configFile = {}; // 创建项目工程配置表
      Inquirer.prompt([
        {
          type: 'list',
          name: 'preset',
          message: "Choose a preset to build your project... ",
          choices: presetOpts
        }]).then(res => {
          Object.assign(configFile, {
            preset: res.preset.substring(0, res.preset.indexOf('[') + 1),
            name: initProject
          })
          switch (res.preset) {
            case 'spa3[webpack5+vue3+ts]':
              createSpa3(configFile)
              break;
            case 'spa2[webpack4+vue2]':
              createSpa2(configFile)
              break;
            case 'ssr3[webpack5+vue3+ts]':
              createSsr(configFile)
              break;
            case 'design':
              Inquirer.prompt([
                {
                  type: 'list',
                  name: 'plat',
                  message: 'Choose a development template : ',
                  choices: platOpts
                },
                {
                  type: 'list',
                  name: 'js',
                  message: 'Choose a js framework : ',
                  choices: jsOpts
                },
                {
                  type: 'checkbox',
                  name: 'extends',
                  message: 'Choose need config : ',
                  pageSize: 15,
                  choices: [
                    new Inquirer.Separator('---- ui library ----'),
                    ...uiOpts,
                    new Inquirer.Separator('---- css library  ----'),
                    ...cssOpts,
                    new Inquirer.Separator('---- extensions ----'),
                    ...extendOpts
                  ]
                },
              ])
                .then(answers => {
                  console.log(answers)
                })
                .catch(error => {
                  if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                  } else {
                    // Something else went wrong
                  }
                });
              break;
          }
        })
    }

  }
}

// 命令列表
let commandOpts = [
	'-v', '-V', '--version', '-h', '-H', '--help', 'init', 'create'
]
// 模板类型
let presetOpts = [
	'spa3[webpack5+vue3+ts]',
	'spa2[webpack4+vue2]',
	'ssr3[webpack5+vue3+ts]',
	'design'
]
// 平台类型
let platOpts = [
	{ name: 'web', checked: true },
	{ name: 'h5' },
	{ name: 'uni' }
]
// ui库
let uiOpts = [
	{ name: 'mumu-design', checked: true },
	{ name: 'ant-design' },
	{ name: 'element' }
]
// css预编译
let cssOpts = [
	{ name: 'less', checked: true },
	{ name: 'scss' },
	{ name: 'stylus' }
]
// js框架
let jsOpts = [
	{ name: 'vue', checked: true },
	{ name: 'react' }
]
// 扩展选项
let extendOpts = [
	{ name: "typescript" },
	{ name: "router" },
	{ name: "vuex" },
	{ name: "babel" }
]
let vueVersionOpts = [
	{ name: '2.x' },
	{ name: '3.x' }
]

module.exports = {
	commandOpts, presetOpts, platOpts, uiOpts, cssOpts, jsOpts, extendOpts, vueVersionOpts
}

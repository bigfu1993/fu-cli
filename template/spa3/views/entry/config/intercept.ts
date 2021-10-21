
export function intercept(to:any, from:any, next:Function) {
	/* 路由发生变化修改页面meta */
	if (to.meta.content) {
		let head = document.getElementsByTagName('head');
		let meta = document.createElement('meta');
		meta.content = to.meta.content;
		head[0].appendChild(meta)
	}
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next()
}

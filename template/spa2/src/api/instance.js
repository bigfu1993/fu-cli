import axios from 'axios'
axios.default.timeout = 10000
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest' //请求头
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest' //请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //请求头
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
// import Router from '../router/index'
// let router = Router();
// console.log(router.path)
// import Store from '../store/index'
// let store = Store();
// 请求拦截器
axios.interceptors.request.use(
  conf => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.getters.token
    // token && (conf.headers.Authorization = token);
    // if (conf.url.indexOf(mumuDomain.recommend) > 0) {
    //     axios.defaults.withCredentials = false;
    // } else {
    //     axios.defaults.withCredentials = true;
    // }
    // conf.headers.Referrer = location.href; // 每次请求设置referrer
    return conf
  },
  err => {
    return Promise.error(err)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  res => {
    // 如果返回的状态码为200，说明接口请求成功, 否则的话抛出错误
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.resolve({
        success: false,
        data: res.data,
        msg: res.data.msg || res.data.error || 'NET ERR！！！'
      })
    }
  },
  // 服务器状态码不是2开头的的情况,然后根据返回的状态码进行一些操作
  err => {
    let status = err.response.status
    let text = err.response.statusText
    return Promise.resolve({
      success: false,
      data: err.response,
      msg: `状态码${status}，状态信息${text}`
    })
  }
)
export default axios

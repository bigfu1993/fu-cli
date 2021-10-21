const BUILD_ENV = process.env.BUILD_ENV;
const DOMAIN = {
	runtime: {
		mApi: 'https://mdev.mumuxili.com', //商城手机站
		iApi: 'https://idev.mumuxili.com', //商城个人中心
		sApi: 'https://sdev.mumuxili.com', //商城搜索
		gApi: 'https://gdev.mumuxili.com', //全球代购
		passportApi: 'https://passportdev.mumuxili.com', //商城登陆注册
		accountApi: 'https://accountdev.mumuxili.com', //商城第三方快捷登陆
		apiApi: 'https://apidev.mumuxili.com', //商城老接口， 有需必应小程序登陆注册
		loginApi: 'https://login-apidev.mumuxili.com', //登陆注册： PC、 小程序
		cmsloginApi: 'https://cmslogindev.mumuxili.com', //cms登录
		mallapiApi: 'https://mall-apidev.mumuxili.com', //商城新接口， 店铺等部分公共接口
		mallApi: 'https://malldev.mumuxili.com', //商城主站
		mallnewApi: 'https://mallnewdev.mumuxili.com', //商城主站
		vipApi: 'https://vipdev.mumuxili.com', //有需必应
		yqjApi: 'https://yqjdev.mumuxili.com', //仪器+
		yqjNewApi: 'https://yqjdev-api.mumuxili.com', //新仪器+
		gysApi: 'https://gysdev.mumuxili.com', //供应商招募
		listApi: 'https://listdev.mumuxili.com', //商城产品列表页
		jpApi: 'https://jpdev.mumuxili.com', //极品商城
		actApi: 'https://actdev.mumuxili.com', //活动站
		planApi: 'https://plandev.mumuxili.com', // 方案馆
		cmsApi: 'https://cmsdev.mumuxili.com', //cms
		yqmmApi: 'https://yqmm-apidev.mumuxili.com', //仪器买卖
		zmyApi: 'https://apidev.zhimyan.com', //芝麻研
		shopApi: 'https://shopdev.mumuxili.com', //商城店铺前台
		sellerApi: 'https://sellerdev.mumuxili.com', //商城店铺中台
		cmsnewApi: 'https://cmsnewdev.mumuxili.com', //新cms
		saasApi: 'https://saasdev.17m17.com', //saas中台
		misApi: 'https://misdev.mumuxili.com', //mis
		misServiceApi: 'https://mis-servicedev.mumuxili.com', //mis新系统
		misServiceNewApi:'https://yqmm-servicedev.mumuxili.com',
		misAppApi: 'https://mis-appdev.mumuxili.com', //mis新系统
	},
	dev: {
		mApi: 'https://mdev.mumuxili.com', //商城手机站
		iApi: 'https://idev.mumuxili.com', //商城个人中心
		sApi: 'https://sdev.mumuxili.com', //商城搜索
		gApi: 'https://gdev.mumuxili.com', //全球代购
		passportApi: 'https://passportdev.mumuxili.com', //商城登陆注册
		accountApi: 'https://accountdev.mumuxili.com', //商城第三方快捷登陆
		apiApi: 'https://apidev.mumuxili.com', //商城老接口， 有需必应小程序登陆注册
		loginApi: 'https://login-apidev.mumuxili.com', //登陆注册： PC、 小程序
		cmsloginApi: 'https://cmslogindev.mumuxili.com', //cms登录
		mallapiApi: 'https://mall-apidev.mumuxili.com', //商城新接口， 店铺等部分公共接口
		mallApi: 'https://malldev.mumuxili.com', //商城主站
		mallnewApi: 'https://mallnewdev.mumuxili.com', //商城主站
		vipApi: 'https://vipdev.mumuxili.com', //有需必应
		yqjApi: 'https://yqjdev.mumuxili.com', //仪器+
		yqjNewApi: 'https://yqjdev-api.mumuxili.com', //新仪器+
		gysApi: 'https://gysdev.mumuxili.com', //供应商招募
		listApi: 'https://listdev.mumuxili.com', //商城产品列表页
		jpApi: 'https://jpdev.mumuxili.com', //极品商城
		actApi: 'https://actdev.mumuxili.com', //活动站
		planApi: 'https://plandev.mumuxili.com', // 方案馆
		cmsApi: 'https://cmsdev.mumuxili.com', //cms
		yqmmApi: 'https://yqmm-apidev.mumuxili.com', //仪器买卖
		zmyApi: 'https://apidev.zhimyan.com', //芝麻研
		shopApi: 'https://shopdev.mumuxili.com', //商城店铺前台
		sellerApi: 'https://sellerdev.mumuxili.com', //商城店铺中台
		cmsnewApi: 'https://cmsnewdev.mumuxili.com', //新cms
		misApi: 'https://misdev.mumuxili.com', //mis
		saasApi: 'https://saasdev.17m17.com', //saas中台
		misServiceApi: 'https://mis-servicedev.mumuxili.com', //mis新系统
		misServiceNewApi:'https://yqmm-servicedev.mumuxili.com',
		misAppApi: 'https://mis-appdev.mumuxili.com', //mis新系统
	},
	test: {
		mApi: 'https://mtest.mumuxili.com', //商城手机站
		iApi: 'https://itest.mumuxili.com', //商城个人中心
		sApi: 'https://stest.mumuxili.com', //商城搜索
		gApi: 'https://gtest.mumuxili.com', //全球代购
		passportApi: 'https://passporttest.mumuxili.com', //商城登陆注册
		accountApi: 'https://accounttest.mumuxili.com', //商城第三方快捷登陆
		apiApi: 'https://apitest.mumuxili.com', //商城老接口， 有需必应小程序登陆注册
		loginApi: 'https://login-apitest.mumuxili.com', //登陆注册： PC、 小程序
		cmsloginApi: 'https://cmslogintest.mumuxili.com', //cms登录
		mallapiApi: 'https://mall-apitest.mumuxili.com', //商城新接口， 店铺等部分公共接口
		mallApi: 'https://malltest.mumuxili.com', //商城主站
		mallnewApi: 'https://mallnewtest.mumuxili.com', //商城主站
		vipApi: 'https://viptest.mumuxili.com', //有需必应
		yqjApi: 'https://yqjtest.mumuxili.com', //仪器+
		yqjNewApi: 'https://yqjtest-api.mumuxili.com', //新仪器+
		gysApi: 'https://gystest.mumuxili.com', //供应商招募
		listApi: 'https://listtest.mumuxili.com', //商城产品列表页
		jpApi: 'https://jptest.mumuxili.com', //极品商城
		actApi: 'https://acttest.mumuxili.com', //活动站
		planApi: 'https://plantest.mumuxili.com', // 方案馆
		cmsApi: 'https://cmstest.mumuxili.com', //cms
		yqmmApi: 'https://yqmm-apitest.mumuxili.com', //仪器买卖
		zmyApi: 'https://apitest.zhimyan.com', //芝麻研
		shopApi: 'https://shoptest.mumuxili.com', //商城店铺前台
		sellerApi: 'https://sellertest.mumuxili.com', //商城店铺中台
		cmsnewApi: 'https://cmsnewtest.mumuxili.com', //新cms
		misApi: 'https://mistest.mumuxili.com', //mis
		saasApi: 'https://saastest.17m17.com', //saas中台
		misServiceApi: 'https://mis-servicetest.mumuxili.com', //mis新系统
		misServiceNewApi:'https://yqmm-servicetest.mumuxili.com',
		misAppApi: 'https://mis-apptest.mumuxili.com', //mis新系统
	},
	pre: {
		mApi: 'https://mpre.mumuxili.com', //商城手机站
		iApi: 'https://ipre.mumuxili.com', //商城个人中心
		sApi: 'https://spre.mumuxili.com', //商城搜索
		gApi: 'https://gpre.mumuxili.com', //全球代购
		passportApi: 'https://passportpre.mumuxili.com', //商城登陆注册
		accountApi: 'https://accountpre.mumuxili.com', //商城第三方快捷登陆
		apiApi: 'https://apipre.mumuxili.com', //商城老接口， 有需必应小程序登陆注册
		loginApi: 'https://login-apipre.mumuxili.com', //登陆注册： PC、 小程序
		cmsloginApi: 'https://cmsloginpre.mumuxili.com', //cms登录
		mallapiApi: 'https://mall-apipre.mumuxili.com', //商城新接口， 店铺等部分公共接口
		mallApi: 'https://mallpre.mumuxili.com', //商城主站
		mallnewApi: 'https://mallnewpre.mumuxili.com', //商城主站
		vipApi: 'https://vippre.mumuxili.com', //有需必应
		yqjApi: 'https://yqjpre.mumuxili.com', //仪器+
		yqjNewApi: 'https://yqjpre-api.mumuxili.com', //新仪器+
		gysApi: 'https://gyspre.mumuxili.com', //供应商招募
		listApi: 'https://listpre.mumuxili.com', //商城产品列表页
		jpApi: 'https://jppre.mumuxili.com', //极品商城
		actApi: 'https://actpre.mumuxili.com', //活动站
		planApi: 'https://planpre.mumuxili.com', // 方案馆
		cmsApi: 'https://cmspre.mumuxili.com', //cms
		yqmmApi: 'https://yqmm-apipre.mumuxili.com', //仪器买卖
		zmyApi: 'https://apipre.zhimyan.com', //芝麻研
		shopApi: 'https://shoppre.mumuxili.com', //商城店铺前台
		sellerApi: 'https://sellerpre.mumuxili.com', //商城店铺中台
		cmsnewApi: 'https://cmsnewpre.mumuxili.com', //新cms
		misApi: 'https://mispre.mumuxili.com', //mis
		saasApi: 'https://saaspre.17m17.com', //saas中台
		misServiceApi: 'https://mis-servicepre.mumuxili.com', //mis新系统
		misServiceNewApi:'https://yqmm-servicepre.mumuxili.com',
		misAppApi: 'https://mis-apppre.mumuxili.com', //mis新系统
	},
	prod: {
		cms: "https://cms.mumuxili.com",
		yqmm: "https://yqmm-api.mumuxili.com",
		mall: "https://mall-api.mumuxili.com",
		mall: 'https://mall.mumuxili.com',
		mApi: 'https://m.mumuxili.com', //商城手机站
		iApi: 'https://i.mumuxili.com', //商城个人中心
		sApi: 'https://s.mumuxili.com', //商城搜索
		gApi: 'https://g.mumuxili.com', //全球代购
		passportApi: 'https://passport.mumuxili.com', //商城登陆注册
		accountApi: 'https://account.mumuxili.com', //商城第三方快捷登陆
		apiApi: 'https://api.mumuxili.com', //商城老接口， 有需必应小程序登陆注册
		loginApi: 'https://login-api.mumuxili.com', //登陆注册： PC、 小程序
		cmsloginApi: 'https://cmslogin.mumuxili.com', //cms登录
		mallapiApi: 'https://mall-api.mumuxili.com', //商城新接口， 店铺等部分公共接口
		mallApi: 'https://mall.mumuxili.com', //商城主站
		mallnewApi: 'https://mallnew.mumuxili.com', //商城主站
		vipApi: 'https://vip.mumuxili.com', //有需必应
		yqjApi: 'https://yqj.mumuxili.com', //仪器+
		yqjNewApi: 'https://yqj-api.mumuxili.com', //新仪器+
		gysApi: 'https://gys.mumuxili.com', //供应商招募
		listApi: 'https://list.mumuxili.com', //商城产品列表页
		jpApi: 'https://jp.mumuxili.com', //极品商城
		actApi: 'https://act.mumuxili.com', //活动站
		planApi: 'https://plan.mumuxili.com', // 方案馆
		cmsApi: 'https://cms.mumuxili.com', //cms
		yqmmApi: 'https://yqmm-api.mumuxili.com', //仪器买卖
		zmyApi: 'https://api.zhimyan.com', //芝麻研
		shopApi: 'https://shop.mumuxili.com', //商城店铺前台
		sellerApi: 'https://seller.mumuxili.com', //商城店铺中台
		cmsnewApi: 'https://cmsnew.mumuxili.com', //新cms
		misApi: 'https://mis.mumuxili.com', //mis
		saasApi: 'https://saas.17m17.com', //saas中台
		misServiceApi: 'https://mis-service.mumuxili.com', //mis新系统
		misServiceNewApi:'https://yqmm-service.mumuxili.com',
		misAppApi: 'https://mis-app.mumuxili.com', //mis新系统
	}
}
export default DOMAIN[BUILD_ENV];

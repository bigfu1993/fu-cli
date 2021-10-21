
// vue-router entry
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import env from '../config/env'
import routes from '@/routes'
interface optsType {
  env: string
}
export class routerModel {
  router: any
  constructor(opts: optsType) {
    let { env } = opts
    this.router = createRouter({
      history: env == 'prod' ? createWebHistory() : createWebHashHistory(),
      routes: routes
    })
  }
  getRouter() {
    return this.router
  }
}

export default new routerModel({ env: env }).getRouter()


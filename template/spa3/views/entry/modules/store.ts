// vuex entry
import { createStore } from 'vuex'
import { storeOpts, storeOptsType } from '@/store'

export class storeModel {
  store: any
  constructor(opts: storeOptsType) {
    this.store = createStore(opts)
  }
  getStore() {
    return this.store
  }
}

export default new storeModel(storeOpts).getStore()

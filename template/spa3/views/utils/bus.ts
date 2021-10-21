
class Bus {
  list: any = {}
  constructor() {
    // 收集订阅信息,调度中心
    this.list = {};
  }

  // 订阅
  $on(name: string, fn: any) {
    this.list[name] = this.list[name] || [];
    this.list[name].push(fn);
  }

  // 发布
  $emit(name: string, data: any) {
    if (this.list[name]) {
      this.list[name].forEach((fn: any) => {
        fn(data);
      });
    }
  }

  // 取消订阅
  $off(name: string) {
    if (this.list[name]) {
      delete this.list[name];
    }
  }
}
class busModel {
  bus: any
  constructor() {
    this.bus = new Bus()
  }
  getBus() {
    return this.bus
  }
}
export let bus = new busModel().getBus();

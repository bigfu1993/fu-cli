
/**
 * 将对象转成地址字符串
 */

export interface obj2StrType {
  [key: string]: any;
}
export function obj2Str(obj: obj2StrType): string {
  let temp = obj
  if (Object.keys(temp).length !== 0) {
    let result = ''
    for (let k in temp) {
      result += `${k}=${temp[k] == null ? '' : (encodeURIComponent(temp[k]) || '')}&`
    }
    return result.substring(0, result.length - 1)
  } else {
    return ''
  }
}

/**
 * 清除对象的字符串value前后空格
 */
export interface trimObjType {
  [key: string]: any;
}
export function trimObj(obj: trimObjType): trimObjType {
  let temp = obj
  for (let k in temp) {
    if (Object.prototype.toString.call(temp[k]) === '[object Object]') {
      trimObj(temp[k])
    } else if (typeof temp[k] == 'string') {
      temp[k] = temp[k].trim()
    } else {
      temp[k] = temp[k]
    }
  }
  return temp
}

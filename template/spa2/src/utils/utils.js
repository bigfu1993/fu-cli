import Html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
export function obj2Str(obj) {
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
export function trimObj(obj) {
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
// 页面滚动
export function scrollTo(targetTop) {
    let timer = setInterval(function () {
        let currentTop = document.documentElement.scrollTop || document.body.scrollTop

        let step = Math.floor((targetTop - currentTop) / 5)
        document.documentElement.scrollTop = document.body.scrollTop = currentTop + step
        if (Math.abs(step) < 4) {
            document.documentElement.scrollTop = document.body.scrollTop = targetTop
            clearInterval(timer)
        }
    }, 30)
}
export function PDF(id, name) {
    Html2canvas(document.getElementById(id), { scale: 2 }).then(canvas => {
        var contentWidth = canvas.width
        var contentHeight = canvas.height
        var pageHeight = (contentWidth / 592.28) * 841.89
        var leftHeight = contentHeight
        //页面偏移
        var position = 0
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28
        var imgHeight = (595.28 / contentWidth) * contentHeight

        var pageData = canvas.toDataURL('image/jpeg', 1.0)
        var pdf = new jsPDF('', 'pt', 'a4')

        //放大会清晰一点
        pdf.internal.scaleFactor = 1.33
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight)
        } else {
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 20, position + 40, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                //避免添加空白页
                if (leftHeight > 0) {
                    pdf.addPage()
                }
            }
        }
        pdf.save(`${name}.pdf`)
    })
}

// 防抖
export function debounce(fn, time) {
    let _arguments = arguments
    let timeout = null
    return function () {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fn.call(this, _arguments)
        }, time)
    }
}

/**
 * @desc 封装了一些项目常用方法.
 */

/**
 * 时间戳转化日期
 * @param timestamp
 * @returns {string}
 */
export function timestampToTime(timestamp) {
    if (!timestamp) {
        return ''
    }
    const addZero = s => (+s < 10 ? `0${s}` : s)
    const date = new Date(timestamp),
        Y = date.getFullYear() + '-',
        M = addZero(date.getMonth() + 1) + '-',
        D = addZero(date.getDate()) + ' ',
        h = addZero(date.getHours()) + ':',
        m = addZero(date.getMinutes()) + ':',
        s = addZero(date.getSeconds())
    return Y + M + D + h + m + s
}

export function tampTime(timestamp) {
    if (!timestamp) {
        return ''
    }
    let timeString = '2020-12-00' + '' + timestamp
    const addZero = s => (+s < 10 ? `0${s}` : s)

    const date = new Date(timeString),
        Y = date.getFullYear() + '-',
        M = addZero(date.getMonth() + 1) + '-',
        D = addZero(date.getDate()) + ' ',
        h = addZero(date.getHours()) + ':',
        m = addZero(date.getMinutes()) + ':',
        s = addZero(date.getSeconds())
    return h + m + s
}

// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1]
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array'
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string'
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date'
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object'
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number'
}

export function isFunction(obj) {
    return _getClass(obj).toLowerCase() === 'function'
}

export function isFormData(obj) {
    try {
        if (obj instanceof FormData) {
            return true
        }
    } catch (e) {
        return false
    }
    return false
}

export function isIE() {
    var userAgent = navigator.userAgent
    if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
        return true
    }
    return false
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false

    if (obj === null || obj === undefined) {
        // null and undefined
        empty = true
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true
    } else if (isObject(obj)) {
        var hasProp = false
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                hasProp = true
                break
            }
        }
        if (!hasProp) {
            empty = true
        }
    } else if (isNumber(obj) && isNaN(obj)) {
        empty = true
    }
    return empty
}

/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj)
}

/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中全是空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true
    } else if (isString(str) && str.trim().length === 0) {
        return true
    }
    return false
}

/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj)
}

/**
 * @desc 根据传递的对象, 以及嵌套对象的属性名, 来获取属性值
 * @param {object} obj 需要遍历的对象,
 * @param {string} props 需要遍历的对象属性名, 可传递一个到多个.
 * @param {string/number} defaultValue 默认属性值为空时返回的值.
 */
export function getValueByProps(obj) {
    if (arguments.length < 2) {
        return
    }

    var currentObj = obj
    var props = Array.prototype.slice.call(arguments, 1)
    var defaultVal = props.pop()
    for (let i = 0; i < props.length; i++) {
        let prop = props[i]
        currentObj = currentObj[prop]
        if (isEmpty(currentObj)) {
            return defaultVal
        }

        if (i === props.length - 1) {
            if (isObject(currentObj) && isNotEmpty(currentObj[defaultVal])) {
                return currentObj[defaultVal]
            }
            return currentObj
        }
    }
}

// 深克隆
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {}
                targetObj[keys] = deepClone(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        }
    }
    return targetObj
}

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * 设置服务
 *
 * @export
 * @class SettingsService
 */
@Injectable({ providedIn: 'root' })
export class SettingService {

  constructor() { }

  /**
   * 获取本地值
   *
   * @param {string} key 关键字
   * @returns
   * @memberof SettingsService
   */
  getLocal(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null') || null;
  }

  /**
   * 设置本地值
   *
   * @param {string} key 关键字
   * @param {*} value 值
   * @memberof SettingsService
   */
  setLocal(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取当前会话的值
   *
   * @param {string} key 关键字
   * @returns
   * @memberof SettingsService
   */
  getSession(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || 'null') || null;
  }

  /**
   * 设置当前会话值
   *
   * @param {string} key 关键字
   * @param {*} value 值
   * @memberof SettingsService
   */
  setSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 移除本地值
   *
   * @param {string} key 关键字
   * @memberof SettingsService
   */
  removeLocal(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * 移除当前会话
   *
   * @param {string} key 关键字
   * @memberof SettingsService
   */
  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }

  /**
   * 设置表单中只定key的值
   * @param form
   * @param key
   * @param value
   */
  setFormValue(form: FormGroup, key: string, value: any) {
    const form_value = {};
    form_value[key] = value;
    form.patchValue(form_value);
  }

  /**
   * 初始化值替换
   * @param from
   * @param to
   */
  mapToObject(from: object, to: object) {
    for (const key in from) {
      if (typeof (to[key]) === "undefined") to[key] = from[key];
    }
  }

  /**
   * 生成guid
   */
  guid() {
    const S4 = () => {
      return ( ( (1 + Math.random() ) * 0x10000 ) || 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  /**
   * 替换值
   * @param str 需要做替换处理的字符串
   * @param obj 替换的对象 key-value
   * @param prop 对象属性模块， 默认 '$[prop]'
   */
  replace(str: string, obj: object, tpl: string = '$[prop]') {
    if (str && obj) {
      for (const key in obj) {
        if(key !== null){
          const replaceStr = tpl.replace('prop', key);
          str = str.replace(replaceStr, obj[key]);
        }
      }
      return str;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { SettingService } from './setting.service';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


/**
 * http请求
 *
 * @export
 * @class HttpService
 */

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(
    public http: HttpClient,
    public setting: SettingService,
    public toastService: ToastService,
    private router: Router
  ) {
  }

  private session_key = environment.session_key;

  /**
   * get请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  get<T>(url: string, params?) {
    return this.request("GET", url, params)
  }

  /**
   * get请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  post<T>(url: string, params?): Observable<any> {
    return this.request("POST", url, params)
  }

  /**
   * put请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  put<T>(url: string, params?): Observable<any> {
    return this.request("PUT", url, params)
  }

  /**
   * delete请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  delete<T>(url: string, params?): Observable<any> {
    return this.request("DELETE", url, params)
  }

  /**
   * request通用请求
   *
   * @private
   * @param {string} method 请求类型
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  request(method: string, url: string, params?): Observable<any> {
    let option = {};
    method = method.toUpperCase();
    if (['POST', 'PUT', 'DELETE'].indexOf(method) > -1) {
      option = { body: params };
    } else if (['GET'].indexOf(method) > -1) {
      option = { params: params };
    }
    this.addHeader(option);
    return new Observable((observer: Observer<any>) => {
      this.http.request(method, url, option)
        .subscribe(
          (data: any) => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.error(error);
            this.handleError(error);
            observer.complete();
          }
        )
    })
  }

  /**
   * 错误处理
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof HttpService
   */
  handleError(error: HttpErrorResponse) {
    // console.log(error.error);
    if(401 === error.error.statusCode){
      this.logout();
    }else if (error.error) {
      this.toastService.open(`${error.error.message}`, `${error.error.statusCode}`);
      return throwError(error.error);
    }

  }

  logout(){
    this.setting.removeLocal(this.session_key);
    this.setting.removeSession(this.session_key);
    location.reload();
  }

  /**
   * 添加头部信息
   *
   * @private
   * @param {*} option
   * @memberof HttpService
   */
  private addHeader(option) {
    const auth = this.setting.getSession('Auth');
    if (auth && auth['token']) {
      option["headers"] = {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${auth['token']}`
      };
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { interval, Observable, Observer, of, pipe, throwError } from 'rxjs';
import { SettingService } from './setting.service';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';
import { flatMap, retryWhen, tap } from 'rxjs/operators';


/**
 * http请求
 *
 * @export
 * @class HttpService
 */

@Injectable({ providedIn: 'root' })
export class HttpService {

  private _refresh_data = 0;
  private _header_option = {};
  private _retry_count = 0;

  constructor(
    public http: HttpClient,
    public setting: SettingService,
    public toastService: ToastService,
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
    method = method.toUpperCase();
    if (['POST', 'PUT', 'DELETE'].indexOf(method) > -1) {
      this._header_option = { body: params };
    } else if (['GET'].indexOf(method) > -1) {
      this._header_option = { params: params };
    }
    this.addHeader();
    return new Observable((observer: Observer<any>) => {
      this.http.request(method, url, this._header_option)
        .pipe(this.http_retry())
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
      if('undefined' === typeof error.error.statusCode){
        this.toastService.open(`${error.statusText}`, `${error.status}`);
        if('undefined' === typeof error.status){
          this.toastService.open(`${error.error}`, '10000');
        }
      }else{
        this.toastService.open(`${error.error.message}`, `${error.error.statusCode}`);
      }
      return throwError(error.error);
    }

  }

  /**
   * Token到期后自动刷新
   */
  refreshToken(): Observable<any>{
    const session = this.setting.getSession(this.session_key);
    const local = this.setting.getLocal(this.session_key);
    const auth = session ? session : local;
    if('undefined' === typeof auth.tokenRef) return null;
    const tokenRef = auth.tokenRef;
    return this.http.post<any>('/api/auth/re-token', {tokenRef}).pipe(
      tap(
        val => {
          if(val){
            this.setting.setSession(this.session_key, val);
            if (local) this.setting.setLocal(this.session_key, val);
            this._refresh_data = 1;
            this.addHeader();
            return true;
          }
          return false;
        }
      )
    );
  }

  /**
   * 重试请求
   * @param maxRetry
   * @param delayMs
   */
  http_retry(maxRetry: number = 3, delayMs: number = 2000) {
    const that = this;
    return (src: Observable<any>) => src.pipe(
      retryWhen(_ => {
        return interval(delayMs).pipe(
          tap(x => {
            that._retry_count ++ ;
            if(that._retry_count > maxRetry){
              this.toastService.open('请求超时', '10000');
            }
            if(!that._refresh_data){
              that.refreshToken().subscribe(
                ()=> {
                  console.log(x);
                }
              );
            }
          }),
          flatMap(count => count >= maxRetry ? throwError("请求次数超限") : of(count))
        )
      })
    )
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
  private addHeader() {
    const auth = this.setting.getSession('Auth');
    console.log(auth['token']);
    if (auth && auth['token']) {
      this._header_option["headers"] = {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${auth['token']}`
      };
    }
  }


}

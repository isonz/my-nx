export class HttpEnum {

  static get TIMEOUT(){
    return {statusCode:-1, message:'系统繁忙'};
  }

  static get SUCCESS(){
    return {statusCode:0, message:'成功'};
  }

  static get UNKNOWN(){
    return {statusCode:10000, message:'未知错误'};
  }

  static get USER_ID_INVALID(){
    return {statusCode:10001, message:'用户ID无效'};
  }

  static get USER_ACCOUNT_INVALID(){
    return {statusCode:10002, message:'账号无效'};
  }

  static get USER_PASSWORD_INVALID(){
    return {statusCode:10003, message:'密码无效'};
  }

  static get USER_NAME_INVALID(){
    return {statusCode:10004, message:'姓名无效'};
  }

  static get USER_EMAIL_INVALID(){
    return {statusCode:10005, message:'邮箱无效'};
  }

  static get USER_PHONE_INVALID(){
    return {statusCode:10006, message:'电话无效'};
  }

  static get USER_ACCOUNT_PASSWORD_INVALID(){
    return {statusCode:10007, message:'账号或密码无效'};
  }

}

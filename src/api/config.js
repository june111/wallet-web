export default {
  // 自定义的请求头
  headers: {
    post: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    // 'X-Requested-With': 'XMLHttpRequest'
  },
  // prefix: '/api/',

  // 超时设置 5秒
  timeout: 5000,
  // baseURL: '/test',

  // 设置全局的请求次数，请求的间隙
  retry: 4,
  retryDelay: 1000,
  // 跨域是否带Token
  // withCredentials: true,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: 'json',
  // XSRF 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'

}

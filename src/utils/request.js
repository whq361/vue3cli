import axios from 'axios'
import { Notify } from 'vant';
import { getToken } from '@/utils/auth'
const service = axios.create({
  baseURL:'', // url = base url + request url
  timeout: 5000, // request timeout
  withCredentials: true,
  parseJson: true,
})
service.interceptors.request.use(
  config => {
    if(config.domain){
      config.baseURL=`${config.domain}`
    }
    if (getToken()) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      Notify({
        message: res.message || 'Error',
        type: 'danger',
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break;
        case 401:
          error.message = '未授权，请重新登录'
          break;
        case 403:
          error.message = '拒绝访问'
          break;
        case 404:
          error.message = '请求错误,未找到该资源'
          // window.location.href = "/NotFound"
          break;
        case 405:
          error.message = '请求方法未允许'
          break;
        case 408:
          error.message = '请求超时'
          break;
        case 500:
          error.message = '服务器端出错'
          break;
        case 501:
          error.message = '网络未实现'
          break;
        case 502:
          error.message = '网络错误'
          break;
        case 503:
          error.message = '服务不可用'
          break;
        case 504:
          error.message = '网络超时'
          break;
        case 505:
          error.message = 'http版本不支持该请求'
          break;
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        Notify({ type: 'danger', message: '服务器响应超时，请刷新当前页' })
      }
      error.message = '连接服务器失败'
    }
    Notify({ type: 'danger', message: error.message })
    return Promise.reject(error)
  }
)

export default service

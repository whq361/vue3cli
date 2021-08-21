import request from '@/utils/request'
const SCRIPT_ENV = process.env.SCRIPT_ENV;
let baidu=''
let sina=''
if(SCRIPT_ENV==='dev'){
   baidu='https://www.baidu.com'
   sina='https://www.sina.com'
}
export function fetchList(query) {
  return request({
    url: '/test/list',
    method: 'get',
    params: query,
    domain:''
  })
}
export function baiduList(query) {
  return request({
    url: '/test/list',
    method: 'get',
    params: query,
    domain:baidu
  })
}
export function sinaList(query) {
  return request({
    url: '/test/list',
    method: 'get',
    params: query,
    domain:sina
  })
}
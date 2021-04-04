import axios from 'axios'
export const instance = axios.create({
    baseURL: 'https://conduit.productionready.io',
    headers: { 'Authorization': '' }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const get = (url, data) => { 
   return instance({
        method: 'get',
        url: url,
        data
      });
}

export const post = (url, data) => { 
   return instance({
        method: 'post',
        url: url,
        data
      });
}
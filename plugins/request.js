import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://conduit.productionready.io',
});


export default ({store,redirect}) => {
    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
        // 在发送请求之前做些什么
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
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
    console.log(error)
    if(error.response.status == 401){
        redirect('/login')
    }

    return Promise.reject(error);
  });
}
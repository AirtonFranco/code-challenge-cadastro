import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'https://crud-vue-mp.firebaseio.com/'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'http://localhost:3001'
        })
        //Interceptar o metodo que esta sendo enviado
        // Vue.prototype.$http.interceptors.request.use(config => {
        //     console.log(config.method)
        //     return config
        // })
    }
})

// API KEY MAPS = AIzaSyC4ytUWVC5tXOiiqhP56ZbWYtI99ntONn4
import { createRouter,createWebHashHistory } from "vue-router";

import MainPage from './components/MainPage.vue'
import PrewievPage from './components/PrewievPage.vue'


export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/',component:MainPage},
        {path:'/pre',component:PrewievPage},
    ] 
})
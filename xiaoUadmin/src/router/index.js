import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
        path: "/",
        redirect: "/home"
    }, {
        path: "/home",
        component: () => import("@/pages/home/Home")
    }, {
        path: "/menu",
        component: () => import("@/pages/Menu/Menu")
    }, {
        path: "/menu/add",
        component: () => import("@/pages/Menu/Menuadd")
    }, {
        path: "/menu/edit",
        component: () => import("@/pages/Menu/Menuadd")
    }, {
        path: "/role",
        component: () => import("@/pages/Role/Role")
    }, {
        path: "/role/add",
        component: () => import("@/pages/Role/Roleadd")
    }, {
        path: "/role/edit",
        component: () => import("@/pages/Role/Roleadd")
    }, {
        path: "/user",
        component: () => import("@/pages/User/User")
    }, {
        path: "/user/add",
        component: () => import("@/pages/User/Useradd")
    }, {
        path: "/user/edit",
        component: () => import("@/pages/User/Useradd")
    }, {
        path: "/login",
        component: () => import("@/pages/Login/Login")
    }, {
        path: "/category",
        component: () => import("@/pages/Category/Category")
    }, {
        path: "/category/add",
        component: () => import("@/pages/Category/Cateadd")
    }, {
        path: "/category/edit",
        component: () => import("@/pages/Category/Cateadd")
    }, {
        path: "/specs",
        component: () => import("@/pages/Specs/Specs")
    }, {
        path: "/specs/add",
        component: () => import("@/pages/Specs/Specsadd")
    }, {
        path: "/specs/edit",
        component: () => import("@/pages/Specs/Specsadd")
    }
    ]
})

import Vue from "vue"
import Router from "vue-router"
//import Login from "@/components/Login"
import Main from "@/components/Main"
import Pay from "@/components/Pay"


Vue.use(Router)
export default new Router({
  routes: [
    /*
    {
      path: "/login",
     name: "Login",
      component: Login
    },
    */
    {
      path: "/",
      name: "Main",
      component: Main
    },
    {
      path: "/pay",
      name: "Pay",
      component: Pay
    }
  ]
})

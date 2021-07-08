import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
	if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
		var id = window.sessionStorage.getItem('userId');
		console.log(id)
		if (id) { // 查询本地存储信息是否已经登陆
			next();
		} else {
			next({
				path: '/login', // 未登录则跳转至login页面
				query: {
					redirect: (to.fullPath)// 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
				}
			});
		}
	} else {
		next();
	}
})
new Vue({
	vuetify,
	router,
	render: h => h(App)
}).$mount('#app')

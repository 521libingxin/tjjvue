// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//导入路由自动引入router里的index文件
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './my-theme/index.less';
import ECharts from 'vue-echarts/components/ECharts.vue';
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.use(iView);
Vue.use(ECharts);
Vue.component('chart', ECharts);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

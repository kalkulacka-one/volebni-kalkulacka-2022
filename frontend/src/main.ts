import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

import './assets/main.css';
//routes
import GuidePageVue from './routes/guide/GuidePage.vue';
import IndexPageVue from './routes/index/IndexPage.vue';
import QuestionPageVue from './routes/question/QuestionPage.vue';
import ResultPageVue from './routes/result/ResultPage.vue';
import SummaryPageVue from './routes/summary/SummaryPage.vue';

const routes = [
  { path: '/', component: IndexPageVue },
  { path: '/guide/:nr', component: GuidePageVue },
  { path: '/question/:nr', component: QuestionPageVue },
  { path: '/summary', component: SummaryPageVue },
  { path: '/result', component: ResultPageVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount('#app');

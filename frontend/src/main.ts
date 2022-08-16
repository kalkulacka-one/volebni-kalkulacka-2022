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
import ComparisonPageVue from './routes/comparison/ComparisonPage.vue';

const routes = [
  {
    name: 'index',
    path: '/',
    component: IndexPageVue,
  },
  {
    name: 'guide',
    path: '/:election/:district/guide/:nr',
    component: GuidePageVue,
  },
  {
    name: 'question',
    path: '/:election/:district/question/:nr',
    component: QuestionPageVue,
  },
  {
    name: 'summary',
    path: '/:election/:district/summary',
    component: SummaryPageVue,
  },
  {
    name: 'result',
    path: '/:election/:district/result',
    component: ResultPageVue,
  },
  {
    name: 'comparison',
    path: '/:election/:district/comparison',
    component: ComparisonPageVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount('#app');

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

import './assets/main.css';

//routes
import GuidePageVue from './routes/guide/GuidePage.vue';
import IndexPageVue from './routes/index/IndexPage.vue';
import QuestionPageVue from './routes/question/QuestionPage.vue';
import ResultPageVue from './routes/result/ResultPage.vue';
import RecapPageVue from './routes/recap/RecapPage.vue';
import ComparisonPageVue from './routes/comparison/ComparisonPage.vue';
import DistrictSelectionPageVue from './routes/district-selection/DistrictSelectionPage.vue';

export const appRoutes = {
  index: {
    name: 'index', //only for testing purposes
    path: '/',
    component: IndexPageVue,
  },
  districtSelection: {
    name: 'district-selection',
    path: '/:election',
    alias: '/:election/district-selection',
    component: DistrictSelectionPageVue,
  },
  guide: {
    name: 'guide',
    path: '/:election/:district/guide/:nr?',
    component: GuidePageVue,
  },
  question: {
    name: 'question',
    path: '/:election/:district/question/:nr',
    component: QuestionPageVue,
  },
  recap: {
    name: 'recap',
    path: '/:election/:district/recap',
    component: RecapPageVue,
  },
  result: {
    name: 'result',
    path: '/:election/:district/result',
    component: ResultPageVue,
  },
  comparison: {
    name: 'comparison',
    path: '/:election/:district/comparison',
    component: ComparisonPageVue,
  },
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: Object.values(appRoutes),
});

const app = createApp(App);
app.use(router);

app.mount('#app');

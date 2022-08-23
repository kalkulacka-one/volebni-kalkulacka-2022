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
    meta: {
      title: 'Index Page - Test',
      metaTags: [
        {
          name: 'description',
          content: 'The index page.',
        },
        {
          property: 'og:description',
          content: 'The index page.',
        },
      ],
    },
  },
  districtSelection: {
    name: 'district-selection',
    path: '/:election',
    component: DistrictSelectionPageVue,
    meta: {
      title: 'Volebni kalkulacka',
      metaTags: [
        {
          name: 'description',
          content: 'Pospis Volebni kalkulacka',
        },
        {
          property: 'og:description',
          content: 'Pospis Volebni kalkulacka',
        },
      ],
    },
  },
  guide: {
    name: 'guide',
    path: '/:election/:district/napoveda/:nr?',
    component: GuidePageVue,
    meta: {
      title: 'Napoveda - Volebni kalkulacka',
      metaTags: [
        {
          name: 'description',
          content: 'Popis - Napoveda - Volebni kalkulacka.',
        },
        {
          property: 'og:description',
          content: 'Popis - Napoveda - Volebni kalkulacka.',
        },
      ],
    },
  },
  question: {
    name: 'question',
    path: '/:election/:district/otazka/:nr',
    component: QuestionPageVue,
    meta: {
      title: 'Otazka $$ - Volebni kalkulacka',
      hasNumber: true,
      metaTags: [
        {
          name: 'description',
          content: 'Popis - Otazka - Volebni kalkulacka.',
        },
        {
          property: 'og:description',
          content: 'Popis - Otazka - Volebni kalkulacka.',
        },
      ],
    },
  },
  recap: {
    name: 'recap',
    path: '/:election/:district/rekapitulace',
    component: RecapPageVue,
    meta: {
      title: 'Rekapitulace - Volebni kalkulacka',
      metaTags: [
        {
          name: 'description',
          content: 'Popis - Rekapitulace - Volebni kalkulacka.',
        },
        {
          property: 'og:description',
          content: 'Popis - Rekapitulace - Volebni kalkulacka.',
        },
      ],
    },
  },
  result: {
    name: 'result',
    path: '/:election/:district/vysledek',
    component: ResultPageVue,
    meta: {
      title: 'Vysledky - Volebni kalkulacka',
      metaTags: [
        {
          name: 'description',
          content: 'Popis - Vysledky - Volebni kalkulacka.',
        },
        {
          property: 'og:description',
          content: 'Popis - Vysledky - Volebni kalkulacka.',
        },
      ],
    },
  },
  comparison: {
    name: 'comparison',
    path: '/:election/:district/srovnani',
    component: ComparisonPageVue,
    meta: {
      title: 'Porovnani - Volebni kalkulacka',
      metaTags: [
        {
          name: 'description',
          content: 'Popis - Porovnani - Volebni kalkulacka.',
        },
        {
          property: 'og:description',
          content: 'Popis - Porovnani - Volebni kalkulacka.',
        },
      ],
    },
  },
  fallback: { path: '/:catchAll(.*)', redirect: '/' },
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: Object.values(appRoutes),
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title as string;
    if (nearestWithTitle.meta.hasNumber) {
      document.title = document.title.replace('$$', to.params.nr as string);
    }
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title as string;
    if (previousNearestWithMeta.meta.hasNumber) {
      document.title = document.title.replace('$$', to.params.nr as string);
    }
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
    (el) => el.parentNode?.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  (nearestWithMeta.meta.metaTags as [])
    .map((tagDef) => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

const app = createApp(App);
app.use(router);

app.mount('#app');

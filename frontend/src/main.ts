import { createApp } from 'vue';
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import App from './App.vue';

import './assets/main.css';

import EmbedProviderWrapper from '@/components/EmbedProviderWrapper.vue';

//routes
import GuidePageVue from './routes/guide/GuidePage.vue';
import IndexPageVue from './routes/index/IndexPage.vue';
import QuestionPageVue from './routes/question/QuestionPage.vue';
import ResultPageVue from './routes/result/ResultPage.vue';
import RecapPageVue from './routes/recap/RecapPage.vue';
import ComparisonPageVue from './routes/comparison/ComparisonPage.vue';
import DistrictSelectionPageVue from './routes/district-selection/DistrictSelectionPage.vue';
import { fetchCalculator, fetchElectionData } from './common/dataFetch';
import { useElectionStore, UserAnswerEnum } from './stores/electionStore';
import { createPinia } from 'pinia';
import ErrorPageVue from './routes/error/ErrorPage.vue';
import { decodeResults, encodeResults } from './common/resultParser';
import { ThemeEnum, useThemeStore } from './stores/themeStore';

const RESULT_QUERY_NAME = 'result';

export const questionGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
) => {
  const store = useElectionStore();
  if (to.params.nr === 'first') {
    to.params.nr = '1';
    return to;
  } else if (to.params.nr === 'last') {
    to.params.nr = `${store.answerProgress + 1}`;
    return to;
  }
  const questionNr = parseInt(to.params.nr as string);
  if (isNaN(questionNr) || questionNr < 1 || questionNr > store.questionCount) {
    console.warn(`Wrong question route ${to.path}`);
    return false;
  }
};

const resultsProcessor = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
) => {
  if (to.query[RESULT_QUERY_NAME] === undefined) {
    const store = useElectionStore();
    const resultHex = encodeResults(store.answers);
    to.query[RESULT_QUERY_NAME] = resultHex;
    return to;
  }
};

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
  error: {
    name: 'error',
    path: '/error/:case',
    props: true,
    component: ErrorPageVue,
    meta: {
      title: 'Error - Volebni kalkulacka',
      metaTags: [
        {
          name: 'description',
          content: 'Error',
        },
        {
          property: 'og:description',
          content: 'Error',
        },
      ],
    },
  },
  districtSelection: {
    name: 'district-selection',
    path: '/kalkulacka/:theme/:election/vyber',
    alias: '/kalkulacka/:theme/:election',
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
    path: '/kalkulacka/:theme/:election/:district/navod/:step?',
    alias: '/kalkulacka/:theme/:election/:district/navod',
    component: GuidePageVue,
    meta: {
      title: 'Návod - Volebni kalkulacka',
      metaTags: [
        {
          name: 'description',
          content: 'Popis - Návod - Volebni kalkulacka.',
        },
        {
          property: 'og:description',
          content: 'Popis - Návod - Volebni kalkulacka.',
        },
      ],
    },
  },
  question: {
    name: 'question',
    path: '/kalkulacka/:theme/:election/:district/otazka/:nr',
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
    beforeEnter: questionGuard,
  },
  recap: {
    name: 'recap',
    path: '/kalkulacka/:theme/:election/:district/rekapitulace',
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
    path: '/kalkulacka/:theme/:election/:district/vysledek',
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
    beforeEnter: resultsProcessor,
  },
  comparison: {
    name: 'comparison',
    path: '/kalkulacka/:theme/:election/:district/srovnani',
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

export const wrappedRoutes = [
  {
    path: '/',
    component: EmbedProviderWrapper,
    children: Object.values(appRoutes),
  },
];

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const router = createRouter({
  history: createWebHistory(),
  routes: wrappedRoutes,
});

//handles title and metadata
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

//handles changing of election and district and fetching data
router.beforeEach(async (to, from) => {
  console.debug(
    `From: ${String(from.name)} ${Object.values(to.params)}, To: ${String(
      to.name
    )} ${Object.values(to.params)}`
  );
  const store = useElectionStore();
  //load election if different
  if (from.params.election !== to.params.election) {
    if (to.params.election !== undefined) {
      store.districts = [];
      store.election = undefined;
      store.init();
      let electionData = undefined;
      try {
        electionData = await fetchElectionData(to.params.election as string);
      } catch (error) {
        console.error(error);
      }
      if (electionData?.election === undefined) {
        return {
          name: appRoutes.error.name,
          params: { case: 'api-error-election' },
        };
      }
      console.debug('Election fetch complete!');
      store.districts = electionData.districts;
      store.election = electionData.election;
    }
  }
  //load district if different
  if (from.params.district !== to.params.district) {
    if (to.params.district !== undefined) {
      store.calculator = undefined;
      store.init();
      let calculator = undefined;
      try {
        calculator = await fetchCalculator(
          to.params.election as string,
          to.params.district as string
        );
      } catch (error) {
        console.error(error);
      }
      if (calculator === undefined) {
        return {
          name: appRoutes.error.name,
          params: { case: 'api-error-district' },
        };
      }
      console.debug('District fetch complete!');
      store.calculator = calculator;
      store.answers = calculator.questions.map((x) => {
        return {
          answer: UserAnswerEnum.undefined,
          flag: false,
          id: x.id as string,
        };
      });
    }
  }
  //load results if hex string present
  let hasResultQuery = false;
  if (
    to.query[RESULT_QUERY_NAME] !== undefined &&
    typeof to.query[RESULT_QUERY_NAME] === 'string'
  ) {
    const answers = decodeResults(to.query[RESULT_QUERY_NAME] as string);
    if (answers.length === store.calculator?.questions.length) {
      answers.forEach((x, i) => {
        x.id = store.calculator?.questions[i].id as string;
      });
      store.answers = answers;
      store.answerProgress = store.answers.length - 1;
      hasResultQuery = true;
    }
  }

  if (hasResultQuery) {
    return true;
  } else if (
    from.params.election !== to.params.election &&
    to.params.district === undefined &&
    to.params.election !== undefined &&
    to.name !== appRoutes.districtSelection.name
  ) {
    // route to district selection only if district not specified
    console.debug(
      `Re-routing to district selection: ${Object.values(to.params)}`
    );
    return {
      name: appRoutes.districtSelection.name,
      params: { ...to.params },
    };
  } else if (
    // route to guide if district and election specified
    from.params.district !== to.params.district &&
    to.params.election !== undefined &&
    to.params.district !== undefined &&
    //to.name !== appRoutes.question.name &&
    to.name !== appRoutes.guide.name
  ) {
    console.debug(`Re-routing to guide: ${Object.values(to.params)}`);
    return {
      name: appRoutes.guide.name,
      params: { ...to.params },
    };
  } else {
    return true;
  }
});

app.use(router);

app.mount('body');

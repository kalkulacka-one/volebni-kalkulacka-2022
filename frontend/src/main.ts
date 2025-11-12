import { createApp } from 'vue';
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import App from './App.vue';

import './assets/main.css';

import EmbedProviderWrapper from '@/components/utilities/embedding/EmbedProviderWrapper.vue';

//routes
import GuidePageVue from './routes/guide/GuidePage.vue';
import IndexPageVue from './routes/index/IndexPage.vue';
import QuestionPageVue from './routes/question/QuestionPage.vue';
import PreferredCandidatePageVue from './routes/preferred-candidate/PreferredCandidatePage.vue';
import ResultPageVue from './routes/result/ResultPage.vue';
import RecapPageVue from './routes/recap/RecapPage.vue';
import ComparisonPageVue from './routes/comparison/ComparisonPage.vue';
import DistrictSelectionPageVue from './routes/district-selection/DistrictSelectionPage.vue';
import EmailCollectionPageVue from './routes/email-collection/EmailCollectionPage.vue';
import QuestionsMethodologyPageVue from './routes/questions-methodology/QuestionsMethodologyPageVue.vue';
import { useElectionStore } from './stores/electionStore';
import { createPinia } from 'pinia';
import ErrorPageVue, { ErrorPageEnum } from './routes/error/ErrorPage.vue';
import { decodeResults, encodeResults } from './common/resultParser';
import SharePageVue from './routes/share/SharePage.vue';
import AboutUsPageVue from './routes/about-us/AboutUsPage.vue';
import AboutElectionsPageVue from './routes/about-elections/AboutElectionsPage.vue';
import DataProtectionPageVue from './routes/data-protection/DataProtectionPage.vue';
import { getDistrictCode } from './common/utils';
import VueSocialSharing from 'vue-social-sharing';

const RESULT_QUERY_NAME = 'result';

export const questionGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
) => {
  const store = useElectionStore();

  //assign one if nr is missing
  if (!to.params.nr || to.params.nr === 'first') {
    to.params.nr = '1';
    return to;
  } else if (to.params.nr === 'last') {
    to.params.nr = `${store.questionCount}`;
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
      title: 'TestVot Arhivă 2025',
    },
  },
  gdpr: {
    name: '/data-protection',
    path: '/protectia-datelor',
    component: DataProtectionPageVue,
    meta: {
      title: 'Protecţia datelor - TestVot Arhivă 2025',
    },
  },
  error: {
    name: 'error',
    path: '/error/:case',
    props: true,
    component: ErrorPageVue,
    meta: {
      title: 'Error - TestVot Arhivă 2025',
    },
  },
  districtSelection: {
    name: 'district-selection',
    path: '/optiuni/:election/selectie',
    alias: '/optiuni/:election',
    component: DistrictSelectionPageVue,
    meta: {
      title: 'TestVot Arhivă 2025',
    },
  },
  emailCollection: {
    name: 'email-collection',
    path: '/optiuni/:election/:district/email',
    component: EmailCollectionPageVue,
    meta: {
      title: 'TestVot Arhivă 2025',
    },
  },
  guide: {
    name: 'guide',
    path: '/optiuni/:election/:district/intructiuni/:step?',
    alias: '/optiuni/:election/:district',
    component: GuidePageVue,
    meta: {
      title: 'Instrucţiuni - TestVot Arhivă 2025',
    },
  },
  question: {
    name: 'question',
    path: '/optiuni/:election/:district/intrebare/:nr?',
    component: QuestionPageVue,
    meta: {
      title: 'Întrebare $$ - TestVot Arhivă 2025',
      hasNumber: true,
    },
    beforeEnter: questionGuard,
  },
  preferredCandidate: {
    name: 'preferred-candidate',
    path: '/optiuni/:election/:district/intrebare/candidat',
    component: PreferredCandidatePageVue,
    meta: {
      title: 'Întrebare $$ - TestVot Arhivă 2025',
    },
  },
  recap: {
    name: 'recap',
    path: '/optiuni/:election/:district/recapitulare',
    component: RecapPageVue,
    meta: {
      title: 'Recapitulare - TestVot Arhivă 2025',
    },
  },
  result: {
    name: 'result',
    path: '/optiuni/:election/:district/rezultat',
    component: ResultPageVue,
    meta: {
      title: 'Rezultat - TestVot Arhivă 2025',
    },
  },
  comparison: {
    name: 'comparison',
    path: '/optiuni/:election/:district/comparatie',
    component: ComparisonPageVue,
    meta: {
      title: 'Comparație - TestVot Arhivă 2025',
    },
  },
  fallback: {
    path: '/:catchAll(.*)',
    redirect: '/error/not-found',
  },
};

export const wrappedRoutes = [
  {
    path: '/',
    component: EmbedProviderWrapper,
    children: Object.values(appRoutes),
  },
];

//APP creation
const app = createApp(App);
//social sharing
app.use(VueSocialSharing, {
  /* optional options */
});

const pinia = createPinia();
app.use(pinia);

const router = createRouter({
  history: createWebHistory(),
  routes: wrappedRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // This ensures that if hash is provided to router.push it works as expected.
      //  & since we have used "behavior: 'smooth'" the browser will slowly come to this hash position.
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    return { top: 0 };
  },
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

  //load election if election in store is different
  if (
    to.params.election !== undefined &&
    to.params.election !== store.election?.id
  ) {
    console.debug(
      `Election IDs ${to.params.election} !== ${store.election?.id}. Fetching ...`
    );
    await store.loadElection(to.params.election as string);
    if (store?.election === undefined) {
      return {
        name: appRoutes.error.name,
        params: {
          case: ErrorPageEnum.NotFound,
        },
        state: {
          extraInfo: `Election fetch failed. Election: ${to.params.election}`,
        },
      };
    }
  }
  //load calculator data if district in store different
  if (to.params.district !== undefined) {
    const districtNr = getDistrictCode(to.params.district as string);
    if (districtNr !== store.calculator?.district_code) {
      console.debug(
        `District codes ${districtNr} !== ${store.calculator?.district_code}. Fetching ...`
      );
      await store.loadCalculator(to.params.election as string, districtNr);
      if (store?.calculator === undefined) {
        return {
          name: appRoutes.error.name,
          params: {
            case: ErrorPageEnum.NotFound,
          },
          state: {
            extraInfo: `Calculator fetch failed. Election: ${to.params.election}, districtNr: ${districtNr}`,
          },
        };
      }
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
      hasResultQuery = true;
    } else {
      console.warn(
        `Result hex answer count mismatch ${answers.length} vs ${store.calculator?.questions.length}`
      );
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
  } else {
    return true;
  }
});

app.use(router);

app.mount('#app');

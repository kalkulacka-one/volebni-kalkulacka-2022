import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { i18n, switchLanguage } from '@/i18n';
import VueSocialSharing from 'vue-social-sharing';

import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteParams,
} from 'vue-router';
import App from './App.vue';
import { getDistrictCode } from './common/utils';
import { decodeResults, encodeResults } from './common/resultParser';
import { useElectionStore } from './stores/electionStore';
import { useUserStore } from '@/stores/userStore';
import EmbedProviderWrapper from '@/components/utilities/embedding/EmbedProviderWrapper.vue';
import './assets/main.css';

//routes
import GuidePageVue from './routes/guide/GuidePage.vue';
import IndexPageVue from './routes/index/IndexPage.vue';
import QuestionPageVue from './routes/question/QuestionPage.vue';
import ResultPageVue from './routes/result/ResultPage.vue';
import RecapPageVue from './routes/recap/RecapPage.vue';
import ComparisonPageVue from './routes/comparison/ComparisonPage.vue';
import DistrictSelectionPageVue from './routes/district-selection/DistrictSelectionPage.vue';
import QuestionsMethodologyPageVue from './routes/questions-methodology/QuestionsMethodologyPageVue.vue';
import ErrorPageVue, { ErrorPageEnum } from './routes/error/ErrorPage.vue';
import SharePageVue from './routes/share/SharePage.vue';
import AboutUsPageVue from './routes/about-us/AboutUsPage.vue';
import AboutElectionsPageVue from './routes/about-elections/AboutElectionsPage.vue';
import DataProtectionPageVue from './routes/data-protection/DataProtectionPage.vue';
import AuthPageVue from './routes/profile/AuthPageVue.vue';
import EmailFormPageVue from './routes/profile/EmailFormPageVue.vue';
import ProfilePageVue from './routes/profile/ProfilePage.vue';
import ProfileSettingsPageVue from './routes/profile/ProfileSettingsPage.vue';

const RESULT_QUERY_NAME = 'result';

export const questionGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
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

export const authGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const userStore = useUserStore();
  await userStore.fetchUser();
  if (userStore.user) next();
  else next(appRoutes.login);
};

const resultsProcessor = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
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
      title: 'Voksmonitor',
    },
  },
  aboutUs: {
    name: 'a-voksmonitorrol',
    path: '/a-voksmonitorrol',
    component: AboutUsPageVue,
    meta: {
      title: 'A Voksmonitorról',
    },
  },
  aboutElections: {
    name: 'o-volbach',
    path: '/o-volbach',
    component: AboutElectionsPageVue,
    meta: {
      title: 'O volbách',
    },
  },
  dataProtection: {
    name: 'adatvedelem',
    path: '/adatvedelem',
    component: DataProtectionPageVue,
    meta: {
      title: 'Adat védelem',
    },
  },
  questionsMethodology: {
    name: 'a-voksmonitor-modszertana',
    path: '/a-voksmonitor-modszertana',
    component: QuestionsMethodologyPageVue,
    meta: {
      title: 'A Voksmonitor módszertana',
    },
  },
  error: {
    name: 'error',
    path: '/error/:case',
    props: true,
    component: ErrorPageVue,
    meta: {
      title: 'Error - Voksmonitor',
    },
  },
  districtSelection: {
    name: 'district-selection',
    path: '/valasztasok/:election/vyber',
    alias: '/valasztasok/:election',
    component: DistrictSelectionPageVue,
    meta: {
      title: 'Voksmonitor',
    },
  },
  guide: {
    name: 'guide',
    path: `/:type(${'kalkulacka'}|${'valasztasok'})/:first/:second?/:third?/:fourth?/${'utmutato'}/:step(\\d+)?`,
    component: GuidePageVue,
    meta: {
      title: 'Útmutató - Voksmonitor',
    },
  },
  question: {
    name: 'question',
    path: `/:type(${'kalkulacka'}|${'valasztasok'})/:first/:second?/:third?/:fourth?/${'kerdes'}/:nr(\\d+)?`,
    component: QuestionPageVue,
    meta: {
      title: 'Kérdés $$ - Voksmonitor',
      hasNumber: true,
    },
    beforeEnter: questionGuard,
  },
  recap: {
    name: 'recap',
    path: `/:type(${'kalkulacka'}|${'valasztasok'})/:first/:second?/:third?/:fourth?/${'osszegzes'}/:nr(\\d+)?`,
    component: RecapPageVue,
    meta: {
      title: 'Összegzés - Voksmonitor',
    },
  },
  result: {
    name: 'result',
    path: `/:type(${'kalkulacka'}|${'valasztasok'})/:first/:second?/:third?/:fourth?/${'egyezeseim'}`,
    component: ResultPageVue,
    meta: {
      title: 'Egyezéseim - Voksmonitor',
    },
  },
  comparison: {
    name: 'comparison',
    path: `/:type(${'kalkulacka'}|${'valasztasok'})/:first/:second?/:third?/:fourth?/${'osszehasonlitas'}`,
    component: ComparisonPageVue,
    meta: {
      title: 'Összehasonlítás - Voksmonitor',
    },
  },
  share: {
    name: 'share',
    path: '/share/:uuid',
    component: SharePageVue,
    meta: {
      title: 'Egyezéseim - Voksmonitor',
    },
  },
  login: {
    name: 'login',
    path: '/prihlaseni',
    component: AuthPageVue,
    props: { type: 'login' },
    meta: {
      title: 'Přihlášení - Voksmonitor',
    },
  },
  loginForm: {
    name: 'login-form',
    path: '/prihlaseni-emailem',
    component: EmailFormPageVue,
    props: { type: 'login' },
    meta: {
      title: 'Přihlášení - Voksmonitor',
    },
  },

  register: {
    name: 'register',
    path: '/registrace',
    component: AuthPageVue,
    props: { type: 'registration' },
    meta: {
      title: 'Registrace - Voksmonitor',
    },
  },
  registerForm: {
    name: 'register-form',
    path: '/registracni-formular',
    component: EmailFormPageVue,
    props: { type: 'registration' },
    meta: {
      title: 'Registrační formulář - Voksmonitor',
    },
  },

  profile: {
    name: 'profile',
    path: '/muj-profil',
    component: ProfilePageVue,
    meta: {
      title: 'Můj profil - Voksmonitor',
    },
    beforeEnter: authGuard,
  },
  profileSettings: {
    name: 'profile-settings',
    path: '/nastaveni-profilu',
    component: ProfileSettingsPageVue,
    meta: {
      title: 'Nastavení profilu - Voksmonitor',
    },
    beforeEnter: authGuard,
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

//vue-i18n
app.use(i18n);

//pinia
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
    (el) => el.parentNode?.removeChild(el),
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
  const calculatorKeyFromParams = (params: RouteParams) => {
    const { first, second, third, fourth } = params;
    const keyParts = [first, second, third, fourth].filter(
      (x) => x !== '' && x !== undefined,
    );
    const key = keyParts.join('/');
    return key;
  };

  console.debug(
    `From: ${String(from.name)} ${Object.values(to.params)}, To: ${String(
      to.name,
    )} ${Object.values(to.params)}`,
  );
  const store = useElectionStore();

  //load election if election in store is different
  if (
    to.params.first !== undefined &&
    to.params.first !== store.election?.key
  ) {
    console.debug(
      `Election IDs ${to.params.first} !== ${store.election?.key}. Fetching ...`,
    );
    await store.loadElection(to.params.first as string);
    await store.loadCalculator(calculatorKeyFromParams(to.params));
    if (store?.election === undefined) {
      return {
        name: appRoutes.error.name,
        params: {
          case: ErrorPageEnum.NotFound,
        },
        state: {
          extraInfo: `Election fetch failed. Election: ${to.params.first}`,
        },
      };
    }
  }
  //load calculator data if district in store different
  if (
    to.params.second !== undefined &&
    getDistrictCode(to.params.second as string) !==
      store.calculator?.district_code
  ) {
    console.debug(
      `District codes ${getDistrictCode(to.params.second as string)} !== ${store.calculator?.district_code}. Fetching ...`,
    );
    await store.loadCalculator(calculatorKeyFromParams(to.params));
    if (store?.calculator === undefined) {
      return {
        name: appRoutes.error.name,
        params: {
          case: ErrorPageEnum.NotFound,
        },
        state: {
          extraInfo: `Calculator fetch failed. Election: ${to.params.first}, districtNr: ${getDistrictCode(to.params.second as string)}`,
        },
      };
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
        `Result hex answer count mismatch ${answers.length} vs ${store.calculator?.questions.length}`,
      );
    }
  }

  if (hasResultQuery) {
    return true;
  } else if (
    from.params.first !== to.params.first &&
    to.params.second === undefined &&
    to.params.first !== undefined &&
    to.name !== appRoutes.districtSelection.name
  ) {
    // route to district selection only if district not specified
    console.debug(
      `Re-routing to district selection: ${Object.values(to.params)}`,
    );
    return {
      name: appRoutes.districtSelection.name,
      params: { ...to.params },
    };
  } else {
    return true;
  }
});

//debug
router.beforeEach((to, _from, next) => {
  const lang = to.query['lang'];
  if (lang && (lang === 'cs' || lang === 'sk')) {
    switchLanguage(lang);
  }
  next();
});

app.use(router);

app.mount('#app');

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import {
  calculateRelativeAgreement,
  encodeResults,
} from '@/common/resultParser';
import type { CandidateAnswer } from '@/types/candidate-answer';

import AvatarComponent from '@/components/design-system/other/AvatarComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import ResultShareModal from '@/routes/result/ResultShareModal.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import SimpleProgress from '@/components/design-system/indicators/SimpleProgress.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import {
  mdiArrowRight,
  mdiPlusBoxOutline,
  mdiReload,
  mdiShareVariantOutline,
} from '@mdi/js';
export interface Props {
  // TODO
  candidates?: any;
  electionName?: string | null;
  electionDateFrom?: string | null;
  electionDateTo?: string | null;
  updated?: string | null;
  district?: string | null;
  election?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  candidates: null,
  electionDateFrom: null,
  electionDateTo: null,
  updated: null,
});

const router = useRouter();
const route = useRoute();

const handleResultsClick = () => {
  router.push({
    name: appRoutes.result.name,
    params: {
      ...route.params,
      election: props.election,
      district: props.district,
    },
    query: { ...route.query },
  });
};

const handleVoteClick = () => {
  router.push({
    name: appRoutes.guide.name,
    params: {
      ...route.params,
      election: props.election,
      district: props.district,
    },
    query: { ...route.query },
  });
};

const electionStore = useElectionStore();

const candidateAnswers: CandidateAnswer[] =
  electionStore.calculator?.answers || [];

const filteredCandidateAnswers: Ref<CandidateAnswer[]> = ref(candidateAnswers);

const handleShareClick = () => {
  shareModal.value?.open();
};
const resultsGeneral = computed(() => {
  const ra = calculateRelativeAgreement(
    filteredCandidateAnswers.value,
    electionStore.answers
  );
  return ra;
});

const shareModal = ref<InstanceType<typeof ResultShareModal> | null>(null);
</script>

<template>
  <CardComponent padding="large" border shadow corner="bottom-right">
    <StackComponent spacing="medium">
      <div>
        <TitleText tag="h4" size="small">{{ electionName }}</TitleText>
        <BodyText size="small" v-if="electionDateFrom && electionDateTo">
          {{ electionDateFrom }} - {{ electionDateTo }}
        </BodyText>
      </div>

      <hr v-if="!candidates" class="ruler" />

      <ResponsiveWrapper extra-small small>
        <ButtonComponent
          kind="outlined"
          color="neutral"
          size="small"
          class="full-width"
          @click.prevent="handleResultsClick"
        >
          Celé výsledky kalkulačky
          <template #iconAfter>
            <IconComponent
              :icon="mdiArrowRight"
              color="rgb(var(--color-neutral-fg))"
            />
          </template>
        </ButtonComponent>
      </ResponsiveWrapper>

      <ResponsiveWrapper medium large extra-large huge>
        <StackComponent horizontal spacing="medium" centered class="full-width">
          <ButtonComponent
            v-if="candidates"
            kind="outlined"
            color="neutral"
            size="medium"
            @click.prevent="handleResultsClick"
          >
            Celé výsledky kalkulačky
            <template #iconAfter>
              <IconComponent
                :icon="mdiArrowRight"
                color="rgb(var(--color-neutral-fg))"
              />
            </template>
          </ButtonComponent>
          <ButtonComponent
            v-else
            kind="filled"
            color="primary"
            size="medium"
            @click.prevent="handleVoteClick"
          >
            Vyplnit kalkulačku
            <template #iconAfter>
              <IconComponent
                :icon="mdiArrowRight"
                color="rgb(var(--palette-neutral-100))"
              />
            </template>
          </ButtonComponent>

          <CardComponent
            v-if="false"
            padding="medium"
            border
            corner="bottom-left"
            borderRadius="medium"
            class="full-width"
          >
            <StackComponent horizontal spacing="medium" centered>
              <BodyText size="small">Moje preference</BodyText>
              <div class="stretch" />
              <ButtonComponent kind="link">
                Přidat
                <template #iconAfter>
                  <IconComponent
                    :icon="mdiPlusBoxOutline"
                    color="rgb(var(--color-neutral-fg))"
                  />
                </template>
              </ButtonComponent>
            </StackComponent>
          </CardComponent>
        </StackComponent>
      </ResponsiveWrapper>

      <StackComponent
        v-if="candidates"
        horizontal
        spacing="medium"
        centered
        class="full-width"
      >
        <ButtonComponent
          kind="link"
          size="small"
          @click.prevent="handleVoteClick"
        >
          Vyplnit znova
          <template #iconAfter>
            <IconComponent
              :icon="mdiReload"
              color="rgb(var(--color-neutral-fg))"
            />
          </template>
        </ButtonComponent>
        <ResponsiveWrapper extra-small small>
          <div class="stretch" />
        </ResponsiveWrapper>
        <ButtonComponent
          kind="link"
          color="primary"
          size="small"
          @click.prevent="handleShareClick"
        >
          Sdílet shodu
          <template #iconAfter>
            <IconComponent :icon="mdiShareVariantOutline" />
          </template>
        </ButtonComponent>
      </StackComponent>

      <hr v-if="false" class="ruler" />

      <ResponsiveWrapper extra-small small>
        <CardComponent
          v-if="false"
          padding="medium"
          border
          corner="bottom-left"
          borderRadius="medium"
          class="full-width"
        >
          <StackComponent horizontal spacing="medium" centered>
            <BodyText size="small">Moje preference</BodyText>
            <div class="stretch" />
            <ButtonComponent kind="link">
              Přidat
              <template #iconAfter>
                <IconComponent
                  :icon="mdiPlusBoxOutline"
                  color="rgb(var(--color-neutral-fg))"
                />
              </template>
            </ButtonComponent>
          </StackComponent>
        </CardComponent>

        <BodyText
          v-if="updated"
          size="extra-small"
          color="rgb(var(--color-neutral-fg-muted))"
        >
          ULOŽENO {{ updated }}
        </BodyText>
      </ResponsiveWrapper>

      <ResponsiveWrapper v-if="updated" medium large extra-large huge>
        <BodyText
          size="extra-small"
          color="rgb(var(--color-neutral-fg-muted))"
          class="full-width centered"
        >
          ULOŽENO {{ updated }}
        </BodyText>
      </ResponsiveWrapper>
    </StackComponent>
  </CardComponent>
  <ResultShareModal
    v-if="electionStore.resultsId"
    ref="shareModal"
    :relative-agreement="resultsGeneral"
  />
</template>

<style scoped lang="scss">
.stretch {
  flex: 1;
}
.ruler {
  width: 100%;
  margin: 0;
  border: 1px solid rgb(var(--palette-neutral-90));
}
.full-width {
  width: 100%;
  width: -webkit-fill-available;
}
.centered {
  text-align: center;
}
</style>

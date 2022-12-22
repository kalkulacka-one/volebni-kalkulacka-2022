<script setup lang="ts">
import AvatarComponent from '@/components/design-system/other/AvatarComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
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
  candidates?: object | null;
  electionName?: string;
  electionDateFrom?: string;
  electionDateTo?: string;
  updated?: string;
}

const props = withDefaults(defineProps<Props>(), {
  candidates: null,
  electionDateFrom: null,
  electionDateTo: null,
  updated: null,
});
</script>

<template>
  <CardComponent padding="large" border shadow>
    <StackComponent spacing="medium">
      <div>
        <TitleText tag="h4" size="small">{{ electionName }}</TitleText>
        <BodyText size="small"
          >{{ electionDateFrom }} - {{ electionDateTo }}</BodyText
        >
      </div>

      <hr v-if="!candidates" class="ruler" />

      <template v-if="candidates">
        <StackComponent
          v-for="(candidate, idx) in candidates"
          horizontal
          spacing="small"
          centered
          :key="idx"
          class="full-width"
        >
          <AvatarComponent
            :backgroundImage="candidate.image"
            :backgroundColor="
              idx == 0
                ? 'rgb(var(--color-primary-bg-strong))'
                : 'rgb(var(--color-primary-bg))'
            "
          >
            <BodyText
              size="small"
              :color="
                idx === 0
                  ? 'rgb(var(--palette-neutral-100))'
                  : 'rgb(var(--color-primary-fg-strong))'
              "
              >{{ idx + 1 }}</BodyText
            >
          </AvatarComponent>

          <StackComponent spacing="extra-small" class="full-width">
            <TitleText size="small" tag="h5">{{ candidate.name }}</TitleText>

            <SimpleProgress
              :value="candidate.percentage"
              color-primary="rgb(var(--palette-primary-50))"
              color-secondary="rgb(var(--color-neutral-bg))"
              :max="100"
              height="2px"
            />
            <BodyText size="extra-small">{{ candidate.party }}</BodyText>
          </StackComponent>

          <TitleText size="medium" tag="h2"
            >{{ candidate.percentage }}&nbsp;%</TitleText
          >
        </StackComponent>
      </template>

      <ResponsiveWrapper extra-small small>
        <ButtonComponent
          kind="outlined"
          color="neutral"
          size="small"
          class="full-width"
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

      <ResponsiveWrapper medium large extra-large>
        <StackComponent horizontal spacing="medium" centered class="full-width">
          <ButtonComponent
            v-if="candidates"
            kind="outlined"
            color="neutral"
            size="medium"
            class="full-width"
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
            class="full-width"
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
        <ButtonComponent kind="link" size="small">
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
        <ButtonComponent kind="link" color="primary" size="small">
          Sdílet shodu
          <template #iconAfter>
            <IconComponent :icon="mdiShareVariantOutline" />
          </template>
        </ButtonComponent>
      </StackComponent>

      <hr v-if="candidates" class="ruler" />

      <ResponsiveWrapper extra-small small>
        <CardComponent
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

      <ResponsiveWrapper v-if="updated" medium large extra-large>
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

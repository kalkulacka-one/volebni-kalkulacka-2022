<script setup lang="ts">
import { computed } from 'vue';
import {
  vkiLogoAgainst,
  vkiLogoInFavour,
  vkiLogoNeutral,
  vkiLogoCircle,
} from '../icons';
import IconComponent from '../icons/IconComponent.vue';

export interface Props {
  monochromatic?: string;
  text?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  monochromatic: undefined,
  text: true,
});

const classes = computed(() => ({
  'logo--monochromatic': props.monochromatic,
}));
</script>

<template>
  <div class="logo">
    <IconComponent
      :icon="vkiLogoInFavour"
      :size="'extra-huge'"
      :color="props.monochromatic || 'rgb(var(--color-primary-fg))'"
    />
    <IconComponent
      :icon="vkiLogoNeutral"
      :size="'extra-huge'"
      :color="props.monochromatic || 'rgb(var(--color-neutral-fg-strong))'"
    />
    <IconComponent
      :icon="vkiLogoAgainst"
      :size="'extra-huge'"
      :color="props.monochromatic || 'rgb(var(--color-secondary-fg))'"
    />
    <div class="logo--icon-wrapper">
      <IconComponent
        :icon="vkiLogoNeutral"
        :size="'extra-huge'"
        :color="props.monochromatic || 'rgb(var(--color-neutral-fg-strong))'"
      />
      <IconComponent
        :icon="vkiLogoCircle"
        :size="'extra-large'"
        :color="props.monochromatic || 'rgb(var(--color-primary-fg))'"
        class="icon-circle-left"
      />
      <IconComponent
        :icon="vkiLogoCircle"
        :size="'extra-large'"
        :color="props.monochromatic || 'rgb(var(--color-secondary-fg))'"
        class="icon-circle-right"
      />
    </div>
    <div v-if="props.text" :class="['logo--text', classes]">
      Volební kalkulačka
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  &--text {
    font-size: 1.75rem;
    text-transform: uppercase;
    font-family: var(--typography-title-family);
    color: rgb(var(--color-neutral-fg-strong));
    margin-left: calc(var(--spacing-medium) - var(--spacing-tiny));
    word-wrap: break-word;
  }

  &--monochromatic {
    color: rgb(var(--color-neutral-fg));
  }

  &--icon-wrapper {
    position: relative;
  }

  .icon-circle-left {
    position: absolute;
    top: calc(var(--spacing-extra-small) * -1);
    left: calc(var(--spacing-extra-small) * -1);
  }

  .icon-circle-right {
    position: absolute;
    bottom: calc(var(--spacing-extra-small) * -1);
    right: calc(var(--spacing-extra-small) * -1);
  }
}
</style>

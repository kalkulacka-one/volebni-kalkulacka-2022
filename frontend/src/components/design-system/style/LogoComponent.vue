<script setup lang="ts">
import { computed } from 'vue';
import {
  vkiLogoAgainst,
  vkiLogoInFavour,
  vkiLogoNeutral,
  vkiLogoDotLeft,
  vkiLogoDotRight,
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
        :icon="vkiLogoDotLeft"
        :size="'extra-huge'"
        :color="props.monochromatic || 'rgb(var(--color-secondary-fg))'"
        class="iconDot"
      />
      <IconComponent
        :icon="vkiLogoDotRight"
        :size="'extra-huge'"
        :color="props.monochromatic || 'rgb(var(--color-secondary-fg))'"
        class="iconDot"
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
    margin-left: 28px;
  }

  &--monochromatic {
    color: rgb(var(--color-neutral-fg));
  }

  &--icon-wrapper {
    position: relative;
  }

  .iconDot {
    position: absolute;
    top: 0;
    left: 0;
    align-self: flex-start;
  }
}
</style>

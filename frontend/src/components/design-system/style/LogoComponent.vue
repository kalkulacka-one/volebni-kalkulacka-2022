<script setup lang="ts">
import { useRouter } from 'vue-router';
import { appRoutes } from '@/main';

import { computed } from 'vue';

export interface Props {
  monochromatic?: string;
  text?: boolean;
  size?: 'small' | 'medium' | 'large' | 'extra-large' | 'extra-huge';
  responsive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  monochromatic: undefined,
  text: true,
  size: 'small',
  responsive: false,
});

const router = useRouter();

const classes = computed(() => ({
  [`logo--${props.size}`]: props.size,
}));

const logoMonochromatic = computed(() => ({
  'logo--monochromatic': props.monochromatic,
}));

const responsive = computed(() => ({
  'logo-wrapper--responsive': props.responsive,
}));
</script>

<template>
  <div
    :class="['logo-wrapper', responsive]"
    @click="router.push({ name: appRoutes.index.name })"
  >
    <div :class="['logo', classes, logoMonochromatic]">
      <svg viewBox="0 0 300 65" role="img" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M65.9601 0.28401L77.9054 12.248L37.9138 52.3008L25.9684 64.2647L0 38.2562L11.9454 26.2923L25.9684 40.337L65.9601 0.28401Z"
          :fill="props.monochromatic || 'rgb(var(--color-primary-fg))'"
        />
        <path
          d="M126.768 0.283997L74.8308 52.3007L86.7762 64.2647L138.713 12.248L126.768 0.283997Z"
          :fill="props.monochromatic || 'rgb(var(--color-neutral-fg-strong))'"
        />
        <path
          d="M207.144 0.000134698L219.089 11.9641L199.093 31.9906L219.089 52.0171L207.143 63.981L187.148 43.9544L167.152 63.9809L155.207 52.0169L175.202 31.9905L155.207 11.9639L167.152 1.38557e-05L187.148 20.0267L207.144 0.000134698Z"
          :fill="props.monochromatic || 'rgb(var(--color-secondary-fg))'"
        />
        <path
          d="M255.196 9.84723C255.196 15.1288 250.921 19.4104 245.647 19.4104C240.374 19.4104 236.099 15.1288 236.099 9.84723C236.099 4.56561 240.374 0.28401 245.647 0.28401C250.921 0.28401 255.196 4.56561 255.196 9.84723Z"
          :fill="props.monochromatic || 'rgb(var(--color-primary-fg))'"
        />
        <path
          d="M288.036 0.28401L236.099 52.3007L248.044 64.2647L299.981 12.248L288.036 0.28401Z"
          :fill="props.monochromatic || 'rgb(var(--color-neutral-fg-strong))'"
        />
        <path
          d="M300 54.4368C300 59.7184 295.725 64 290.452 64C285.178 64 280.903 59.7184 280.903 54.4368C280.903 49.1552 285.178 44.8736 290.452 44.8736C295.725 44.8736 300 49.1552 300 54.4368Z"
          :fill="props.monochromatic || 'rgb(var(--color-secondary-fg))'"
        />
      </svg>
    </div>
    <div
      v-if="props.text"
      :class="['logo--text', `logo--text-${props.size}`, logoMonochromatic]"
    >
      Volební kalkulačka
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;

  &--responsive {
    @media (max-width: 700px) {
      .logo--text {
        display: none;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
}
.logo {
  &--small {
    width: 5.953rem;
    height: 1.25rem;
  }

  &--medium {
    width: 18.75rem;
    height: 4rem;
  }

  &--text {
    text-transform: uppercase;
    font-family: var(--typography-title-family);
    color: rgb(var(--color-neutral-fg-strong));

    &-medium {
      font-size: 1.75rem;
      margin-left: calc(var(--spacing-medium) - var(--spacing-tiny));
    }

    &-small {
      font-size: var(--typography-body-small-size);
      margin-left: 0.563rem;
    }

    &:hover {
      color: rgb(var(--color-neutral-fg));
      transition: color 0.3s ease-in;
    }
  }

  &--monochromatic {
    color: rgb(var(--color-neutral-fg));
  }

  svg:hover * {
    fill: rgb(var(--color-neutral-fg));
    transition: fill 0.3s ease-in;
  }
}
</style>

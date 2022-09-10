<script setup lang="ts">
import { computed } from 'vue';

import ButtonText from '@/components/design-system/typography/ButtonText.vue';

export interface Props {
  tag?: 'button' | 'a';
  href?: string;
  kind: 'link' | 'outlined' | 'filled' | 'answer';
  size?: 'medium' | 'small';
  color?: 'neutral' | 'primary' | 'secondary';
  selected?: boolean;
  responsive?: boolean;
  readOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  href: undefined,
  size: 'medium',
  color: 'neutral',
  selected: false,
  responsive: false,
  readOnly: false,
});

const classes = computed(() => ({
  [`button--${props.kind}`]: props.kind,
  [`button--${props.size}`]: props.size,
  [`button--${props.color}`]: props.color,
  'button--selected': props.selected,
  'button--responsive': props.responsive,
  'button--read-only': props.readOnly,
}));

const computedTag = computed(() => (props.href ? 'a' : props.tag));

const computedSize = computed(() =>
  props.kind === 'link' ? props.size : 'medium'
);
</script>

<template>
  <component :is="computedTag" :href="href" :class="['button', classes]">
    <span
      v-if="$slots.icon"
      :class="['icon', $slots.default ? 'icon--before' : 'icon--only']"
    >
      <slot name="icon" :size="computedSize" />
    </span>
    <ButtonText v-if="$slots.default" class="text" :size="computedSize">
      <slot />
    </ButtonText>
    <span v-if="$slots.iconAfter" :class="['icon', 'icon--after']">
      <slot name="iconAfter" :size="computedSize" />
    </span>
  </component>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  line-height: 0;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  text-decoration: none;

  &:disabled {
    cursor: not-allowed;
  }

  &.button--read-only {
    cursor: default;
  }

  &--link {
    &.button--neutral {
      color: rgb(var(--color-neutral-fg));
      border: none;

      &:not(.button--read-only):hover {
        color: rgb(var(--color-neutral-fg-hover));
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-neutral-fg-active));
      }
    }

    &.button--primary {
      color: rgb(var(--color-primary-fg));
      border: none;

      &:not(.button--read-only):hover {
        color: rgb(var(--color-primary-fg-hover));
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-primary-fg-active));
      }
    }

    &.button--secondary {
      color: rgb(var(--color-secondary-fg));
      border: none;

      &:not(.button--read-only):hover {
        color: rgb(var(--color-secondary-fg-hover));
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-secondary-fg-active));
      }
    }

    &:disabled {
      color: rgb(var(--color-neutral-fg-disabled));
      border-color: rgb(var(--color-neutral-fg-disabled));
    }

    .icon {
      &--before {
        margin-right: var(--spacing-extra-small);
      }

      &--after {
        margin-left: var(--spacing-extra-small);
      }
    }
  }

  &--outlined,
  &--filled,
  &--answer {
    border-style: solid;
    border-width: var(--spacing-nano);
    border-radius: var(--radius-small);
    border-top-right-radius: 0;

    &.button--medium {
      padding: calc(var(--spacing-small) - var(--spacing-nano));
    }

    &.button--small {
      padding-left: calc(var(--spacing-small) - var(--spacing-nano));
      padding-right: calc(var(--spacing-small) - var(--spacing-nano));
      padding-top: calc(var(--spacing-extra-small) - var(--spacing-nano));
      padding-bottom: calc(var(--spacing-extra-small) - var(--spacing-nano));
    }

    .icon {
      &--before {
        margin-right: var(--spacing-small);
      }

      &--after {
        margin-left: var(--spacing-small);
      }
    }
  }

  &--outlined {
    &.button--neutral {
      color: rgb(var(--color-neutral-fg));
      background-color: transparent;
      border-color: rgb(var(--color-neutral-border-strong));

      &:not(.button--read-only):hover {
        background-color: rgba(
          var(--color-neutral-fg-hover),
          var(--transparency-10)
        );
      }

      .button--selected,
      &:not(.button--read-only):active {
        background-color: rgba(
          var(--color-neutral-fg-active),
          var(--transparency-10)
        );
      }
    }

    &.button--primary {
      color: rgb(var(--color-primary-fg));
      background-color: transparent;
      border-color: rgb(var(--color-primary-border-strong));

      &:not(.button--read-only):hover {
        background-color: rgba(
          var(--color-primary-fg-hover),
          var(--transparency-10)
        );
      }

      .button--selected,
      &:not(.button--read-only):active {
        background-color: rgba(
          var(--color-primary-fg-active),
          var(--transparency-10)
        );
      }
    }

    &.button--secondary {
      color: rgb(var(--color-secondary-fg));
      background-color: transparent;
      border-color: rgb(var(--color-secondary-border-strong));

      &:not(.button--read-only):hover {
        background-color: rgba(
          var(--color-secondary-fg-hover),
          var(--transparency-10)
        );
      }

      .button--selected,
      &:not(.button--read-only):active {
        background-color: rgba(
          var(--color-secondary-fg-active),
          var(--transparency-10)
        );
      }
    }

    &:disabled {
      background-color: transparent;
      color: rgb(var(--color-neutral-fg-disabled));
      border-color: rgb(var(--color-neutral-border-disabled));
    }
  }

  &--filled,
  &--answer {
    &:disabled {
      color: rgb(var(--color-primary-fg-inverse)) !important;
      background-color: rgb(var(--color-neutral-bg-disabled)) !important;
      border-color: transparent !important;
    }
  }

  &--filled {
    &.button--primary {
      color: rgb(var(--color-primary-fg-inverse));
      background-color: rgb(var(--color-primary-bg-strong));
      border-color: transparent;

      &:not(.button--read-only):hover {
        background-color: rgb(var(--color-primary-bg-strong-hover));
      }

      .button--selected,
      &:not(.button--read-only):active {
        background-color: rgb(var(--color-primary-bg-strong-active));
      }
    }

    &.button--neutral {
      color: rgb(var(--color-neutral-fg-inverse));
      background-color: rgb(var(--color-neutral-bg-strong));
      border-color: transparent;

      &:not(.button--read-only):hover {
        color: rgb(var(--color-neutral-fg-inverse));
        background-color: rgb(var(--color-neutral-bg-strong-hover));
      }

      &.button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-neutral-fg-inverse));
        background-color: rgb(var(--color-neutral-bg-strong-active));
      }
    }

    &.button--secondary {
      color: rgb(var(--color-secondary-fg-inverse));
      background-color: rgb(var(--color-secondary-bg-strong));
      border-color: transparent;

      &:not(.button--read-only):hover {
        color: rgb(var(--color-secondary-fg-inverse));
        background-color: rgb(var(--color-secondary-bg-strong-hover));
      }

      &.button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-secondary-fg-inverse));
        background-color: rgb(var(--color-secondary-bg-strong));
      }
    }
  }

  &--answer {
    &.button--medium {
      padding-left: calc(var(--spacing-medium) - var(--spacing-nano));
      padding-right: calc(var(--spacing-medium) - var(--spacing-nano));
      padding-top: calc(var(--spacing-small) - var(--spacing-nano));
      padding-bottom: calc(var(--spacing-small) - var(--spacing-nano));
    }

    &.button--small {
      padding-left: calc(var(--spacing-medium) - var(--spacing-nano));
      padding-right: calc(var(--spacing-medium) - var(--spacing-nano));
      padding-top: calc(var(--spacing-extra-small) - var(--spacing-nano));
      padding-bottom: calc(var(--spacing-extra-small) - var(--spacing-nano));
    }

    .icon {
      &--before {
        margin-right: var(--spacing-medium);
      }

      &--after {
        margin-left: var(--spacing-medium);
      }
    }

    &.button--neutral {
      color: rgb(var(--color-neutral-fg));
      background-color: transparent;
      border-color: rgb(var(--color-neutral-border-strong));

      &:not(.button--read-only):hover {
        color: rgb(var(--color-neutral-fg-inverse));
        background-color: rgb(var(--color-neutral-bg-strong-hover));
        border-color: transparent;
      }

      &.button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-neutral-fg-inverse));
        background-color: rgb(var(--color-neutral-bg-strong-active));
        border-color: transparent;
      }
    }

    &.button--primary {
      color: rgb(var(--color-primary-fg));
      background-color: transparent;
      border-color: rgb(var(--color-primary-border-strong));

      &:not(.button--read-only):hover {
        color: rgb(var(--color-primary-fg-inverse));
        background-color: rgb(var(--color-primary-bg-strong-hover));
        border-color: transparent;
      }

      &.button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-primary-fg-inverse));
        background-color: rgb(var(--color-primary-bg-strong));
        border-color: transparent;
      }
    }

    &.button--secondary {
      color: rgb(var(--color-secondary-fg));
      background-color: transparent;
      border-color: rgb(var(--color-secondary-border-strong));

      &:not(.button--read-only):hover {
        color: rgb(var(--color-secondary-fg-inverse));
        background-color: rgb(var(--color-secondary-bg-strong-hover));
        border-color: transparent;
      }

      &.button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-secondary-fg-inverse));
        background-color: rgb(var(--color-secondary-bg-strong));
        border-color: transparent;
      }
    }
  }

  &--responsive {
    @media (max-width: 700px) {
      .text {
        display: none;
      }

      .icon {
        &--before {
          margin-right: 0;
        }

        &--after {
          margin-left: 0;
        }
      }

      &.button--answer {
        &.button--medium {
          padding: calc(var(--spacing-small) - var(--spacing-nano));
        }

        &.button--small {
          padding: calc(var(--spacing-extra-small) - var(--spacing-nano));
        }
      }
    }
  }
}

.text {
  text-align: left;
}

.icon {
  &--only {
    margin: auto;
  }
}
</style>

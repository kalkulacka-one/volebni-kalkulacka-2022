<script setup lang="ts">
import { computed } from 'vue';

import ButtonText from '@/components/design-system/typography/ButtonText.vue';

export interface Props {
  tag?: 'button' | 'a';
  href?: string;
  kind: 'link' | 'outlined' | 'filled' | 'answer';
  size?: 'medium' | 'small';
  color?: 'neutral' | 'primary' | 'secondary' | 'white' | 'facebook';
  selected?: boolean;
  readOnly?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  href: undefined,
  size: 'medium',
  color: 'neutral',
  selected: false,
  readOnly: false,
  loading: false,
});

const classes = computed(() => ({
  [`button--${props.kind}`]: props.kind,
  [`button--${props.size}`]: props.size,
  [`button--${props.color}`]: props.color,
  'button--selected': props.selected,
  'button--read-only': props.readOnly,
  'button--loading': props.loading,
}));

const computedTag = computed(() => (props.href ? 'a' : props.tag));

const computedSize = computed(() =>
  props.kind === 'link' ? props.size : 'medium',
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
  line-height: 0;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  text-decoration: none;
  touch-action: manipulation;
  color: inherit;
  width: max-content;

  &:disabled {
    cursor: not-allowed;
  }

  &.button--loading {
    cursor: wait;
  }

  &.button--read-only {
    cursor: default;
  }

  &--link {
    &.button--neutral {
      color: rgb(var(--color-neutral-fg));
      border: none;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-neutral-fg-hover));
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-neutral-fg-active));
      }
    }

    &.button--primary {
      color: rgb(var(--color-primary-fg));
      border: none;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-primary-fg-hover));
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-primary-fg-active));
      }
    }

    &.button--secondary {
      color: rgb(var(--color-secondary-fg));
      border: none;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-secondary-fg-hover));
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-secondary-fg-active));
      }
    }

    &.button--facebook {
      color: #1877f2;
      border: none;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: #166fe5;
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: #1877f2;
      }
    }

    &.button--white {
      color: white;
      border: none;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: white;
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: white;
      }
    }

    &:disabled,
    &.button--loading {
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
    border-radius: var(--radius-medium);
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          background-color: rgba(
            var(--color-neutral-fg-hover),
            var(--transparency-10)
          );
        }
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          background-color: rgba(
            var(--color-primary-fg-hover),
            var(--transparency-10)
          );
        }
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          background-color: rgba(
            var(--color-secondary-fg-hover),
            var(--transparency-10)
          );
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        background-color: rgba(
          var(--color-secondary-fg-active),
          var(--transparency-10)
        );
      }
    }

    &.button--facebook {
      color: #1877f2;
      background-color: transparent;
      border-color: #1877f2;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: #166fe5;
          border-color: #166fe5;
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: #1877f2;
        border-color: #1877f2;
      }
    }

    &.button--white {
      color: white;
      background-color: transparent;
      border-color: white;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: white;
          border-color: white;
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: white;
        border-color: white;
      }
    }

    &:disabled,
    &.button--loading {
      background-color: transparent;
      color: rgb(var(--color-neutral-fg-disabled));
      border-color: rgb(var(--color-neutral-border-disabled));
    }
  }

  &--filled,
  &--answer {
    &:disabled,
    &.button--loading {
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          background-color: rgb(var(--color-primary-bg-strong-hover));
        }
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-neutral-fg-inverse));
          background-color: rgb(var(--color-neutral-bg-strong-hover));
        }
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-secondary-fg-inverse));
          background-color: rgb(var(--color-secondary-bg-strong-hover));
        }
      }

      &.button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-secondary-fg-inverse));
        background-color: rgb(var(--color-secondary-bg-strong));
      }
    }

    &.button--facebook {
      background-color: #1877f2;
      color: white;
      border-color: transparent;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: white;
          background-color: #166fe5;
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        color: white;
        background-color: #1877f2;
      }
    }

    &.button--white {
      background-color: white;
      color: rgb(var(--palette-neutral-40));
      border-color: transparent;

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          background-color: white;
          color: rgb(var(--palette-neutral-30));
        }
      }

      .button--selected,
      &:not(.button--read-only):active {
        background-color: white;
        color: rgb(var(--palette-neutral-10));
      }
    }
  }

  &--answer {
    &.button--medium {
      padding-left: calc(
        var(--responsive-spacing-medium) - var(--spacing-nano)
      );
      padding-right: calc(
        var(--responsive-spacing-medium) - var(--spacing-nano)
      );
      padding-top: calc(var(--spacing-small) - var(--spacing-nano));
      padding-bottom: calc(var(--spacing-small) - var(--spacing-nano));
    }

    &.button--small {
      padding-left: calc(
        var(--responsive-spacing-medium) - var(--spacing-nano)
      );
      padding-right: calc(
        var(--responsive-spacing-medium) - var(--spacing-nano)
      );
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-neutral-fg-inverse));
          background-color: rgb(var(--color-neutral-bg-strong-hover));
          border-color: transparent;
        }
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-primary-fg-inverse));
          background-color: rgb(var(--color-primary-bg-strong-hover));
          border-color: transparent;
        }
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

      @media (hover: hover) {
        &:not(.button--read-only):hover {
          color: rgb(var(--color-secondary-fg-inverse));
          background-color: rgb(var(--color-secondary-bg-strong-hover));
          border-color: transparent;
        }
      }

      &.button--selected,
      &:not(.button--read-only):active {
        color: rgb(var(--color-secondary-fg-inverse));
        background-color: rgb(var(--color-secondary-bg-strong));
        border-color: transparent;
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

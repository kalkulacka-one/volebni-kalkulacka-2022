<script setup lang="ts">
import { computed, useSlots } from 'vue';

import BodyText from '@/components/design-system/typography/BodyText.vue';
import FilledCircle from '@/components/design-system/containers/FilledCircle.vue';
import type { Props as FilledCircleProps } from '@/components/design-system/containers/FilledCircle.vue';

export interface Props {
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  backgroundColor?: string;
  backgroundImage?: string;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  backgroundColor: 'rgb(var(--color-neutral-bg-strong))',
  backgroundImage: undefined,
  name: undefined,
});

const slots = useSlots();

const sizePairs = {
  small: {
    avatar: 'small' as FilledCircleProps['size'],
    badge: 'extra-small' as FilledCircleProps['size'],
  },
  medium: {
    avatar: 'medium' as FilledCircleProps['size'],
    badge: 'extra-small' as FilledCircleProps['size'],
  },
  large: {
    avatar: 'large' as FilledCircleProps['size'],
    badge: 'small' as FilledCircleProps['size'],
  },
  'extra-large': {
    avatar: 'extra-large' as FilledCircleProps['size'],
    badge: 'medium' as FilledCircleProps['size'],
  },
};

const hasBadge = computed(() => slots.default && props.backgroundImage);

const classes = computed(() => ({
  [`avatar--size-${props.size}`]: props.size,
  'avatar--has-badge': hasBadge.value,
}));

const badgeMasks = {
  small:
    'path("M4.68628 18.6863C12.4183 18.6863 18.6863 12.4183 18.6863 4.68629C18.6863 3.08533 18.4176 1.54713 17.9228 0.114346C25.8528 1.0641 32 7.81416 32 16C32 24.8366 24.8365 32 16 32C7.81418 32 1.06412 25.8527 0.114349 17.9228C1.54712 18.4176 3.08533 18.6863 4.68628 18.6863Z"',
  medium:
    'path("M5.85786 19.8579C13.5898 19.8579 19.8579 13.5899 19.8579 5.85786C19.8579 3.78531 19.4075 1.81794 18.5993 0.0482874C19.062 0.0162735 19.5291 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 19.5291 0.0162811 19.0621 0.0482941 18.5993C1.81795 19.4075 3.78531 19.8579 5.85786 19.8579Z")',
  large:
    'path("M8.20101 26.201C18.1421 26.201 26.201 18.1421 26.201 8.20101C26.201 5.34126 25.5341 2.63727 24.3474 0.236075C25.5428 0.0803337 26.762 -1.990735e-06 27.9999 -1.990735e-06C43.4639 -1.990735e-06 55.9999 12.536 55.9999 28C55.9999 43.464 43.4639 56 27.9999 56C12.5359 56 -9.15527e-05 43.464 -9.15527e-05 28C-9.15527e-05 26.762 0.0802498 25.5428 0.236003 24.3473C2.63721 25.5341 5.34123 26.201 8.20101 26.201Z")',
  'extra-large':
    'path("M10.5442 32.5442C22.6945 32.5442 32.5442 22.6944 32.5442 10.5442C32.5442 6.91723 31.6666 3.49529 30.112 0.47914C32.028 0.163939 33.9948 0 36 0C55.8823 0 72 16.1177 72 36C72 55.8822 55.8823 72 36 72C16.1177 72 0 55.8822 0 36C0 33.9948 0.163946 32.0279 0.479161 30.1119C3.49533 31.6665 6.91729 32.5442 10.5442 32.5442Z")',
};

const badgeMask = computed(() => badgeMasks[props.size]);

const initials = computed(() => {
  if (props.name) {
    const parts = props.name.split(' ');
    let letters = '';
    parts.forEach((part) => {
      if (part.length > 0 && part !== '') {
        letters += part[0];
      }
    });
    return letters;
  }
  return null;
});
</script>

<template>
  <div :class="['avatar', classes]">
    <FilledCircle
      class="circle"
      :size="sizePairs[props.size].avatar"
      background-color="#fff"
    >
      <template v-if="backgroundImage">
        <img class="image" :src="backgroundImage" />
      </template>
      <template v-if="!hasBadge">
        <slot />
      </template>
      <template v-if="!backgroundImage && name">
        <BodyText size="small" class="initials">
          {{ initials }}
        </BodyText>
      </template>
    </FilledCircle>
    <FilledCircle
      v-if="hasBadge"
      class="badge"
      :background-color="props.backgroundColor"
      :size="sizePairs[props.size].badge"
    >
      <slot />
    </FilledCircle>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  --clip-path: v-bind(badgeMask);
  --sin-45deg: 0.70710678118;

  .circle {
    grid-area: 1 / 1 / 1 / 1;
  }

  &--has-badge .circle {
    clip-path: var(--clip-path);
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .badge {
    grid-area: 1 / 1 / 1 / 1;
    position: relative;
  }

  &--size-small {
    .badge {
      top: calc(var(--sin-45deg) * (2 * var(--sizing-small)) / -1.99);
      left: calc(var(--sin-45deg) * (2 * var(--sizing-small)) / -1.99);
    }
  }

  &--size-medium {
    .badge {
      top: calc(var(--sin-45deg) * var(--sizing-large) / -1.99);
      left: calc(var(--sin-45deg) * var(--sizing-large) / -1.99);
    }
  }

  &--size-large {
    .badge {
      top: calc(var(--sin-45deg) * var(--sizing-extra-large) / -1.99);
      left: calc(var(--sin-45deg) * var(--sizing-extra-large) / -1.99);
    }
  }

  &--size-extra-large {
    .badge {
      top: calc(var(--sin-45deg) * (3 * var(--spacing-medium)) / -1.99);
      left: calc(var(--sin-45deg) * (3 * var(--spacing-medium)) / -1.99);
    }
  }

  .initials {
    text-transform: uppercase;
  }
}
</style>

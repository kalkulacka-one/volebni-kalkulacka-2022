<script setup lang="ts">
import type { TSingleAvatarOrder } from './design-system/configurations/avatars-configuration';
import AvatarComponent from './AvatarComponent.vue';
import MatchOrderComponent from './MatchOrderComponent.vue';

const props = defineProps<{
  sizeAvatar: 'small' | 'medium' | 'large';
  imageUrl: string;
  alt: string;
  sizeOrderMatch: 'small' | 'medium' | 'large';
  order: number;
  configuration: TSingleAvatarOrder;
}>();
</script>

<template>
  <div class="result-avatar">
    <AvatarComponent
      :size="props.sizeAvatar"
      :image-url="props.imageUrl"
      :alt="props.alt"
    />
    <div
      :class="`result-order ${
        props.sizeAvatar === 'large' ? 'shift-large' : 'shift-medium'
      }`"
    >
      <MatchOrderComponent
        :order="props.order"
        :size="props.sizeOrderMatch"
        :configuration="props.configuration"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.result-avatar {
  position: relative;
  margin: var(--spacing-small);
}

.result-order {
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
}

.shift-large {
  // TODO: set correct breakpoint
  @media (min-width: 700px) {
    top: -0.5rem;
    left: -0.75rem;
  }
}

.shift-medium {
  // TODO: set correct breakpoint
  @media (min-width: 700px) {
    top: -1rem;
    left: -0.75rem;
  }
}
</style>

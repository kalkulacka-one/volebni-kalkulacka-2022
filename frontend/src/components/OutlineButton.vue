<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import ButtonText from './design-system/typography/ButtonText.vue';
import IconArrowForward from './icons/IconArrowForward.vue';
import IconArrowBack from './icons/IconArrowBack.vue';

type PropsType = {
  title: string;
  type?: 'normal' | 'disabled';
  icon?: 'left' | 'right' | null;
  dense?: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  title: 'Outlined',
  type: 'normal',
  icon: null,
  dense: false,
});

const buttonType = ref<string>('button');

const buttonHeight = computed(() => {
  return props.dense ? 'dense' : null;
});

onMounted(() => {
  if (props.type === 'disabled') {
    buttonType.value = 'buttonDisabled';
  }
});
</script>

<template>
  <button :class="[buttonType, buttonHeight]">
    <IconArrowBack v-if="props.icon === 'left'" class="button__icon-left" />
    <ButtonText class="button__title">{{ props.title }}</ButtonText>
    <IconArrowForward
      v-if="props.icon === 'right'"
      class="button__icon-right"
    />
  </button>
</template>

<style lang="scss" scoped>
@import './styles/colors.scss';

@mixin button {
  padding: 0;
  border-radius: 16px 0 16px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 103px;
}
.button {
  @include button;

  color: $neutral-30;
  background-color: $neutral-100;
  border: 2px solid $neutral-30;
  cursor: pointer;

  &:hover {
    color: $neutral-30;
    background-color: rgba(218, 216, 215, 0.2);
    border: 2px solid $neutral-30;
    transition: ease-out background-color 0.5s;
  }

  &:active {
    color: $neutral-10;
    background-color: $neutral-70;
    border: 2px solid $neutral-10;
  }

  &__title {
    padding: 16px;
    white-space: nowrap;
  }

  .dense &__title {
    padding-block: 8px;
  }

  &__icon-right {
    padding-right: 20px;
    height: 24px;
  }

  &__icon-left {
    padding-left: 20px;
    height: 24px;
  }
}

.buttonDisabled {
  @include button;

  color: $neutral-70;
  background-color: $neutral-100;
  border: 2px solid $neutral-70;
}
</style>

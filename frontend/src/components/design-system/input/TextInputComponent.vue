<script setup lang="ts">
import BodyText from '@/components/design-system/typography/BodyText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import { mdiAlertOutline } from '@mdi/js';

export interface Props {
  disabled: boolean;
  groupName: string;
  icon: string;
  label: string | null;
  modelValue: string | null;
  placeholder: string;
  value: string;
  error: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  error: null,
});

defineEmits(['update:modelValue']);
</script>

<template>
  <label
    class="input-wrapper"
    :class="{
      'has-icon': icon,
      'has-error': error,
      'is-disabled': disabled,
    }"
  >
    <BodyText size="small" class="label">
      <span>
        {{ label }}
      </span>
    </BodyText>

    <IconComponent
      v-if="icon"
      :icon="icon"
      class="input-icon"
      color="rgb(var(--color-neutral-fg-muted))"
    />

    <input
      type="text"
      :value="value"
      :name="props.groupName"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />

    <StackComponent v-if="error" horizontal centered class="error">
      <BodyText size="small" color="rgb(var(--color-secondary-fg-strong))">
        {{ error }}
      </BodyText>

      <IconComponent :icon="mdiAlertOutline" size="small" />
    </StackComponent>
  </label>
</template>

<style scoped lang="scss">
// TODO remove white bgr input color
.input-wrapper {
  position: relative;
  display: grid;

  .label,
  .error {
    position: absolute;
    padding: 0 4px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      background-color: white;
    }

    & > * {
      position: relative;
      z-index: 50;
    }
  }

  .label {
    top: calc((var(--base-small) / 2) * -1);
    left: calc(var(--base-medium) / 2);
    text-transform: uppercase;
    font-size: var(--typography-body-extra-small-size);
    line-height: var(--typography-body-extra-small-line-height);
    font-weight: 700;
    color: rgb(var(--color-neutral-fg));

    &::before {
      bottom: 0;
    }
  }

  .error {
    right: calc(var(--base-medium) / 2);
    bottom: calc((var(--base-small) / 2) * -1);
    font-size: var(--typography-body-small-size);
    color: rgb(var(--color-secondary-fg-strong));

    &::before {
      top: 0;
    }

    .icon {
      margin-left: calc(var(--base-small) / 4);
    }
  }

  input {
    display: block;
    padding: var(--base-small);
    border-style: solid;
    border-width: var(--border-thin);
    border-color: rgb(var(--color-neutral-border));
    border-radius: var(--radius-medium);
    border-bottom-right-radius: 0;
    font-size: var(--typography-body-medium-size);
    line-height: var(--base-medium);

    &:hover {
      border-color: rgb(var(--color-neutral-border-hover));
    }
    &:active {
      border-color: rgb(var(--color-neutral-border-active));
    }
    &:disabled {
      background-color: white;
      border-color: rgb(var(--color-neutral-border-disabled));
    }
  }
}

.has-icon input {
  padding-left: var(--base-extra-large);
}

.input-icon {
  display: flex;
  position: absolute;
  left: 1rem;
  height: 100%;
}

.has-error {
  input {
    border-color: rgb(var(--color-secondary-border-strong));
  }

  .icon,
  .label {
    color: rgb(var(--color-secondary-fg-strong));
  }
}

.is-disabled {
  .input-icon,
  .label {
    color: rgb(var(--color-neutral-fg-disabled));
  }

  input,
  input::placeholder {
    color: rgb(var(--color-neutral-fg-muted));
  }

  .error {
  }
}
</style>

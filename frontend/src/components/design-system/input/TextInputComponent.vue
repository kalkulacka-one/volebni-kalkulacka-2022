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
      {{ label }}
    </BodyText>

    <IconComponent :icon="icon" class="input-icon" v-if="icon" />

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

    <StackComponent horizontal centered class="error" v-if="error">
      <BodyText size="small" color="rgb(var(--color-secondary-fg-strong))">
        {{ error }}
      </BodyText>

      <IconComponent :icon="mdiAlertOutline" size="small" />
    </StackComponent>
  </label>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  display: grid;

  .label,
  .error {
    position: absolute;
    background-color: white;
    padding: 0 4px;
  }

  .label {
    top: calc((var(--base-small) / 2) * -1);
    left: calc(var(--base-medium) / 2);
    text-transform: uppercase;
    font-size: var(--typography-body-extra-small-size);
    line-height: var(--typography-body-extra-small-line-height);
    font-weight: 700;
    color: rgb(var(--color-neutral-fg));
  }

  .error {
    right: calc(var(--base-medium) / 2);
    bottom: calc((var(--base-small) / 2) * -1);
    font-size: var(--typography-body-small-size);
    color: rgb(var(--color-secondary-fg-strong));

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
    &:disabled {
      background-color: white;
      border-color: rgb(var(--color-neutral-border-disabled));
    }
    &:active {
      border-color: rgb(var(--color-neutral-border-active));
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
